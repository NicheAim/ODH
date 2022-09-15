package gov.samhsa.ocp.ocpfis.service;

import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.gclient.IQuery;
import ca.uhn.fhir.rest.gclient.ReferenceClientParam;
import ca.uhn.fhir.validation.FhirValidator;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.service.dto.ConditionDto;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import gov.samhsa.ocp.ocpfis.service.dto.SubjectReferenceDto;
import gov.samhsa.ocp.ocpfis.service.dto.ValueCodeableConceptDto;
import gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding;
import gov.samhsa.ocp.ocpfis.service.exception.NoDataFoundException;
import gov.samhsa.ocp.ocpfis.util.FhirOperationUtil;
import gov.samhsa.ocp.ocpfis.util.pagination.PaginationRepository;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.r4.model.*;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

import static java.util.stream.Collectors.toList;

@Slf4j
@Service
public class ConditionServiceImpl implements ConditionService {

    private final IGenericClient client;
    private final FisProperties fisProperties;
    private final FhirValidator fhirValidator;

    private final PaginationRepository paginationProxy;
    private final PaginationRepository paginationHapi;

    private final PaginationRepository paginationGcp;

    public ConditionServiceImpl(IGenericClient client, FisProperties fisProperties, FhirValidator fhirValidator, @Qualifier("PaginationProxyImpl") PaginationRepository paginationProxy, @Qualifier("PaginationHapiFhirImpl") PaginationRepository paginationHapi, @Qualifier("PaginationGcpImpl") PaginationRepository paginationGcp) {
        this.client = client;
        this.fisProperties = fisProperties;
        this.fhirValidator = fhirValidator;
        this.paginationProxy = paginationProxy;
        this.paginationHapi = paginationHapi;
        this.paginationGcp = paginationGcp;
    }

    @Override
    public PageDto<ConditionDto> getConditionsforPatient(String patient, Optional<Integer> pagesize, Optional<Integer> pagenumber) {
        int numberperpage = PaginationRepository.getValidPageSize(fisProperties, pagesize, ResourceType.Condition.name());

        IQuery query = client.search().forResource(Condition.class).where(new ReferenceClientParam("subject").hasId("Patient/" + patient));

        query = FhirOperationUtil.setLastUpdatedTimeSortOrder(query, true);
        Bundle firstpage;
        Bundle otherpage;
        boolean first = true;

        firstpage = (Bundle) query.count(numberperpage).returnBundle(Bundle.class).execute();

        if (firstpage.isEmpty()) {
            log.info("No Condition for patient");
            return new PageDto<>(new ArrayList<>(), numberperpage, 0, 0, 0, 0);
        }

        otherpage = firstpage.copy();

        if (pagenumber.isPresent() && pagenumber.get() > 1 && otherpage.getLink(Bundle.LINK_NEXT) != null) {
            first = false;
            if (fisProperties.getFhir().getData_store_tech().equals("gcp")) {
                otherpage = paginationGcp.getSearchBundleAfterFirstPage(client, fisProperties, firstpage, pagenumber.get(), numberperpage);

            } else if (fisProperties.getFhir().getData_store_tech().equals("hapi")) {
                otherpage = paginationHapi.getSearchBundleAfterFirstPage(client, fisProperties, firstpage, pagenumber.get(), numberperpage);

            } else {
                otherpage = paginationProxy.getSearchBundleAfterFirstPage(client, fisProperties, firstpage, pagenumber.get(), numberperpage);

            }
        }

        List<Bundle.BundleEntryComponent> retrieveconditions = otherpage.getEntry();
        List<ConditionDto> conditionDtos = convertBundleToDto(retrieveconditions);

        double totalpages = Math.ceil((double) otherpage.getTotal() / numberperpage);
        int currentpage = first ? 1 : pagenumber.get();


        return new PageDto<>(conditionDtos, numberperpage, totalpages, currentpage, conditionDtos.size(), otherpage.getTotal());
    }

    @Override
    public ConditionDto getConditionById(String conditionid) {
        Condition condition = client.read().resource(Condition.class).withId(conditionid).execute();

        if (condition == null || condition.isEmpty()) {
            log.info("No Condition Found");
            throw new NoDataFoundException("No Condition Found with ID: " + conditionid);
        }

        ConditionDto conditionDto = mapsinglecondition(condition);

        return conditionDto;
    }

    @Override
    public ConditionDto saveconditionforpatient(ConditionDto conditionDto) {
        ValueSet valueSet = client.read().resource(ValueSet.class).withId("diagnosis").execute();

        if (valueSet == null || valueSet.isEmpty()) {
            log.info("No value set found");
            throw new NoDataFoundException("Value Set not Found");
        }

        Optional<ValueSet.ValueSetExpansionContainsComponent> valueset_contains = valueSet.getExpansion().getContains().stream().filter((v) -> v.getCode().equalsIgnoreCase(conditionDto.getConditioncode())).findAny();

        if (!valueset_contains.isPresent()) {
            log.info("No code in value set found");
            throw new NoDataFoundException("No code in valueset expansion found");
        }

        ValueSet priorities = client.read().resource(ValueSet.class).withId("condition-priority").execute();

        if (priorities == null || priorities.isEmpty()) {
            log.info("Value Set for priorities not Found");
            throw new NoDataFoundException("Value Set for priorities not Found");
        }

        Optional<ValueSet.ValueSetExpansionContainsComponent> valueset_contains_priorities = priorities.getExpansion().getContains().stream().filter((v) -> v.getCode().equalsIgnoreCase(conditionDto.getPriority())).findAny();

        if (!valueset_contains_priorities.isPresent()) {
            log.info("No code in valueset priorities expansion found");
            throw new NoDataFoundException("No code in valueset priorities expansion found");
        }

        String code = valueset_contains.get().getCode();
        String system = valueset_contains.get().getSystem();
        String display = valueset_contains.get().getDisplay();
        String patient_id = conditionDto.getPatientid();
        String recorded_date_str = conditionDto.getRecordedDate();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy", Locale.ENGLISH);
        LocalDate recorded_date = LocalDate.parse(recorded_date_str, formatter);

        String priority_code = valueset_contains_priorities.get().getCode();
        String priority_system = valueset_contains_priorities.get().getSystem();
        String priority_display = valueset_contains_priorities.get().getDisplay();

        Condition condition = convertDto(code, system, display, patient_id, recorded_date, priority_code, priority_system, priority_display);

        //Validate
        FhirOperationUtil.validateFhirResource(fhirValidator, condition, Optional.empty(), ResourceType.Condition.name(), "Create Condition");

        //Create
        MethodOutcome methodOutcome = FhirOperationUtil.createFhirResource(client, condition, ResourceType.Condition.name());

        String fhirid = methodOutcome.getId().getIdPart();

        ConditionDto conditionDto_saved = new ConditionDto();
        conditionDto_saved.setConditionid(fhirid);
        SubjectReferenceDto subjectReferenceDto = new SubjectReferenceDto();
        subjectReferenceDto.setReference("Patient/" + patient_id);
        conditionDto_saved.setSubject(subjectReferenceDto);

        return conditionDto_saved;
    }

    @Override
    public ConditionDto updateCondition(ConditionDto conditionDto, String conditionid) {
        ValueSet valueSet = client.read().resource(ValueSet.class).withId("diagnosis").execute();

        if (valueSet == null || valueSet.isEmpty()) {
            log.info("No value set found");
            throw new NoDataFoundException("Value Set not Found");
        }

        Optional<ValueSet.ValueSetExpansionContainsComponent> valueset_contains = valueSet.getExpansion().getContains().stream().filter((v) -> v.getCode().equalsIgnoreCase(conditionDto.getConditioncode())).findAny();

        if (!valueset_contains.isPresent()) {
            log.info("No code in value set found");
            throw new NoDataFoundException("No code in valueset expansion found");
        }

        ValueSet priorities = client.read().resource(ValueSet.class).withId("condition-priority").execute();

        if (priorities == null || priorities.isEmpty()) {
            log.info("Value Set for priorities not Found");
            throw new NoDataFoundException("Value Set for priorities not Found");
        }

        Optional<ValueSet.ValueSetExpansionContainsComponent> valueset_contains_priorities = priorities.getExpansion().getContains().stream().filter((v) -> v.getCode().equalsIgnoreCase(conditionDto.getPriority())).findAny();

        if (!valueset_contains_priorities.isPresent()) {
            log.info("No code in valueset priorities expansion found");
            throw new NoDataFoundException("No code in valueset priorities expansion found");
        }

        String code = valueset_contains.get().getCode();
        String system = valueset_contains.get().getSystem();
        String display = valueset_contains.get().getDisplay();
        String patient_id = conditionDto.getPatientid();
        String recorded_date_str = conditionDto.getRecordedDate();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy", Locale.ENGLISH);
        LocalDate recorded_date = LocalDate.parse(recorded_date_str, formatter);

        String priority_code = valueset_contains_priorities.get().getCode();
        String priority_system = valueset_contains_priorities.get().getSystem();
        String priority_display = valueset_contains_priorities.get().getDisplay();

        Condition condition = convertUpdateDto(code, system, display, patient_id, recorded_date, priority_code, priority_system, priority_display, conditionid);

        //Validate
        FhirOperationUtil.validateFhirResource(fhirValidator, condition, Optional.empty(), ResourceType.Condition.name(), "Create Condition");

        //Create
        MethodOutcome methodOutcome = FhirOperationUtil.updateFhirResource(client, condition, ResourceType.Condition.name());

        String fhirid = methodOutcome.getId().getIdPart();

        ConditionDto conditionDto_updated = new ConditionDto();
        conditionDto_updated.setConditionid(fhirid);
        SubjectReferenceDto subjectReferenceDto = new SubjectReferenceDto();
        subjectReferenceDto.setReference("Patient/" + patient_id);
        conditionDto_updated.setSubject(subjectReferenceDto);

        return conditionDto_updated;
    }

    private ConditionDto mapsinglecondition(Condition condition) {
        ConditionDto conditionDto = new ConditionDto();

        //Resourcetype
        conditionDto.setResourcetype(condition.getResourceType().name());

        //ID
        conditionDto.setConditionid(condition.getIdElement().getIdPart());

        //Code
        Coding coding = new Coding();
        coding.setSystem(condition.getCode().getCoding().get(0).getSystem());
        coding.setCode(condition.getCode().getCoding().get(0).getCode());
        coding.setDisplay(condition.getCode().getCoding().get(0).getDisplay());

        List<Coding> codingList = new ArrayList<>();
        codingList.add(coding);

        ValueCodeableConceptDto codeableConceptDto = new ValueCodeableConceptDto();
        codeableConceptDto.setText(condition.getCode().getText());
        codeableConceptDto.setCoding(codingList);

        conditionDto.setCode(codeableConceptDto);

        //Subject
        SubjectReferenceDto subjectReferenceDto = new SubjectReferenceDto();
        subjectReferenceDto.setReference(condition.getSubject().getReference());
        conditionDto.setSubject(subjectReferenceDto);

        //Category
        if (condition.hasCategory()) {
            List<ValueCodeableConceptDto> categories = condition.getCategory().stream().map((v) -> {
                ValueCodeableConceptDto valueCodeableConceptDto = new ValueCodeableConceptDto();
                List<Coding> codings = v.getCoding().stream().map((c) -> {
                    Coding coding_in = new Coding();
                    coding_in.setSystem(c.getSystem());
                    coding_in.setCode(c.getCode());
                    coding_in.setDisplay(c.getDisplay());
                    return coding_in;
                }).collect(toList());
                valueCodeableConceptDto.setCoding(codings);
                valueCodeableConceptDto.setText(v.getText());
                return valueCodeableConceptDto;
            }).collect(toList());

            conditionDto.setCategory(categories);
        }

        //RecordedDate
        if (condition.hasRecordedDate()) {
            Date r_date = new Date(condition.getRecordedDate().toString());
            SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
            conditionDto.setRecordedDate(format.format(r_date));
        }

        return conditionDto;
    }

    public Condition convertUpdateDto(String code, String system, String display, String patient_id, LocalDate recorded_date, String priority_code, String priority_system, String priority_display, String conditionid) {

        Condition condition = new Condition();

        condition.setId(conditionid);

        //Code
        org.hl7.fhir.r4.model.Coding coding = new org.hl7.fhir.r4.model.Coding();
        coding.setDisplay(display);
        coding.setCode(code);
        coding.setSystem(system);

        List<org.hl7.fhir.r4.model.Coding> codingList = new ArrayList<>();
        codingList.add(coding);

        CodeableConcept codeableConcept = new CodeableConcept();
        codeableConcept.setCoding(codingList);
        codeableConcept.setText(display);

        condition.setCode(codeableConcept);

        //Subject
        Reference reference = new Reference();
        reference.setReference("Patient/" + patient_id);
        condition.setSubject(reference);

        //Recorded Date
//        ZoneId.getAvailableZoneIds().stream().map((z) -> {
//            System.out.println(z);
//            return null;
//        }).collect(Collectors.toList());

        // New Jersey -> America/New_York

        Date recorded = Date.from(recorded_date.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
        condition.setRecordedDate(recorded);

        //Priority
        List<CodeableConcept> concepts = new ArrayList<>();
        List<org.hl7.fhir.r4.model.Coding> codings = new ArrayList<>();

        org.hl7.fhir.r4.model.Coding coding_priority = new org.hl7.fhir.r4.model.Coding();
        coding_priority.setDisplay(priority_display);
        coding_priority.setCode(priority_code);
        coding_priority.setSystem(priority_system);
        codings.add(coding_priority);

        CodeableConcept concept = new CodeableConcept();
        concept.setText(priority_display);
        concept.setCoding(codings);
        concepts.add(concept);

        condition.setCategory(concepts);

        return condition;
    }

    private Condition convertDto(String code, String system, String display, String patient_id, LocalDate recorded_date, String priority_code, String priority_system, String priority_display) {

        Condition condition = new Condition();

        //Code
        org.hl7.fhir.r4.model.Coding coding = new org.hl7.fhir.r4.model.Coding();
        coding.setDisplay(display);
        coding.setCode(code);
        coding.setSystem(system);

        List<org.hl7.fhir.r4.model.Coding> codingList = new ArrayList<>();
        codingList.add(coding);

        CodeableConcept codeableConcept = new CodeableConcept();
        codeableConcept.setCoding(codingList);
        codeableConcept.setText(display);

        condition.setCode(codeableConcept);

        //Subject
        Reference reference = new Reference();
        reference.setReference("Patient/" + patient_id);
        condition.setSubject(reference);

        //Recorded Date
//        ZoneId.getAvailableZoneIds().stream().map((z) -> {
//            System.out.println(z);
//            return null;
//        }).collect(Collectors.toList());

        // New Jersey -> America/New_York

        Date recorded = Date.from(recorded_date.atStartOfDay().atZone(ZoneId.systemDefault()).toInstant());
        condition.setRecordedDate(recorded);

        //Priority
        List<CodeableConcept> concepts = new ArrayList<>();
        List<org.hl7.fhir.r4.model.Coding> codings = new ArrayList<>();

        org.hl7.fhir.r4.model.Coding coding_priority = new org.hl7.fhir.r4.model.Coding();
        coding_priority.setDisplay(priority_display);
        coding_priority.setCode(priority_code);
        coding_priority.setSystem(priority_system);
        codings.add(coding_priority);

        CodeableConcept concept = new CodeableConcept();
        concept.setText(priority_display);
        concept.setCoding(codings);
        concepts.add(concept);

        condition.setCategory(concepts);

        return condition;
    }


    private List<ConditionDto> convertBundleToDto(List<Bundle.BundleEntryComponent> retrieveconditions) {
        return retrieveconditions.stream().map(this::mappercondtion).collect(toList());
    }

    private ConditionDto mappercondtion(Bundle.BundleEntryComponent condition_bundle) {
        ConditionDto conditionDto = new ConditionDto();
        Condition condition = (Condition) condition_bundle.getResource();

        //Resourcetype
        conditionDto.setResourcetype(condition.getResourceType().name());

        //ID
        conditionDto.setConditionid(condition.getIdElement().getIdPart());

        //Code
        Coding coding = new Coding();
        coding.setSystem(condition.getCode().getCoding().get(0).getSystem());
        coding.setCode(condition.getCode().getCoding().get(0).getCode());
        coding.setDisplay(condition.getCode().getCoding().get(0).getDisplay());

        List<Coding> codingList = new ArrayList<>();
        codingList.add(coding);

        ValueCodeableConceptDto codeableConceptDto = new ValueCodeableConceptDto();
        codeableConceptDto.setText(condition.getCode().getText());
        codeableConceptDto.setCoding(codingList);

        conditionDto.setCode(codeableConceptDto);

        //Subject
        SubjectReferenceDto subjectReferenceDto = new SubjectReferenceDto();
        subjectReferenceDto.setReference(condition.getSubject().getReference());
        conditionDto.setSubject(subjectReferenceDto);

        //Category
        if (condition.hasCategory()) {
            List<ValueCodeableConceptDto> categories = condition.getCategory().stream().map((v) -> {
                ValueCodeableConceptDto valueCodeableConceptDto = new ValueCodeableConceptDto();
                List<Coding> codings = v.getCoding().stream().map((c) -> {
                    Coding coding_in = new Coding();
                    coding_in.setSystem(c.getSystem());
                    coding_in.setCode(c.getCode());
                    coding_in.setDisplay(c.getDisplay());
                    return coding_in;
                }).collect(toList());
                valueCodeableConceptDto.setCoding(codings);
                valueCodeableConceptDto.setText(v.getText());
                return valueCodeableConceptDto;
            }).collect(toList());

            conditionDto.setCategory(categories);
        }

        //RecordedDate
        if (condition.hasRecordedDate()) {
            Date r_date = new Date(condition.getRecordedDate().toString());
            SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
            conditionDto.setRecordedDate(format.format(r_date));
        }


        return conditionDto;
    }

}
