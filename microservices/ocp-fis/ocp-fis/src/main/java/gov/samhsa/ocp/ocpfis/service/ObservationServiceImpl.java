package gov.samhsa.ocp.ocpfis.service;

import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.gclient.IQuery;
import ca.uhn.fhir.rest.gclient.ReferenceClientParam;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.service.dto.CodeDto;
import gov.samhsa.ocp.ocpfis.service.dto.ObservationDto;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import gov.samhsa.ocp.ocpfis.service.dto.ValueCodeableConceptDto;
import gov.samhsa.ocp.ocpfis.service.dto.valueset.Subject;
import gov.samhsa.ocp.ocpfis.util.DateUtil;
import gov.samhsa.ocp.ocpfis.util.FhirOperationUtil;
import gov.samhsa.ocp.ocpfis.util.pagination.PaginationRepository;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.r4.model.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
@Slf4j
public class ObservationServiceImpl implements ObservationService {

    private final ModelMapper modelMapper;
    private final IGenericClient fhirClient;
    private final FisProperties fisProperties;

    private final PaginationRepository paginationProxy;
    private final PaginationRepository paginationHapi;

    private final PaginationRepository paginationGcp;

    public ObservationServiceImpl(ModelMapper modelMapper, IGenericClient fhirClient, FisProperties fisProperties, @Qualifier("PaginationProxyImpl") PaginationRepository paginationProxy, @Qualifier("PaginationHapiFhirImpl") PaginationRepository paginationHapi, @Qualifier("PaginationGcpImpl") PaginationRepository paginationGcp) {
        this.modelMapper = modelMapper;
        this.fhirClient = fhirClient;
        this.fisProperties = fisProperties;
        this.paginationProxy = paginationProxy;
        this.paginationHapi = paginationHapi;
        this.paginationGcp = paginationGcp;
    }

    @Override
    public ObservationDto getObservationId(String id) {
        Observation observation = fhirClient.read().resource(Observation.class).withId(id).execute();
        if (observation == null || observation.isEmpty()) {
            log.info("No observation found for Id: " + id);
            return null;
        }
        ObservationDto observationDto = mapsingleObservation(observation);
        return observationDto;
    }

    @Override
    public PageDto<ObservationDto> getAllObservations(Optional<Boolean> showInactive, Optional<Integer> page, Optional<Integer> size) {
        int numberOfObservationsPerPage = PaginationRepository.getValidPageSize(fisProperties, size, ResourceType.Observation.name());
        IQuery observationIQuery = fhirClient.search().forResource(Observation.class);
        //Set Sort order
        observationIQuery = FhirOperationUtil.setLastUpdatedTimeSortOrder(observationIQuery, true);
        Bundle firstPageObservationSearchBundle;
        Bundle otherPageObservationSearchBundle;
        boolean firstPage = true;

        firstPageObservationSearchBundle = PaginationRepository.getSearchBundleFirstPage(observationIQuery, numberOfObservationsPerPage, Optional.empty());

        if (firstPageObservationSearchBundle == null || firstPageObservationSearchBundle.getEntry().size() < 1) {
            log.info("No observations were found for the given criteria.");
            return new PageDto<>(new ArrayList<>(), numberOfObservationsPerPage, 0, 0, 0, 0);
        }

        otherPageObservationSearchBundle = firstPageObservationSearchBundle.copy();

        if (page.isPresent() && page.get() > 1 && otherPageObservationSearchBundle.getLink(Bundle.LINK_NEXT) != null) {
            firstPage = false;
            // Load the required page
            if (fisProperties.getFhir().getData_store_tech().equals("gcp")) {
                otherPageObservationSearchBundle = paginationGcp.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageObservationSearchBundle, page.get(), numberOfObservationsPerPage);

            } else if (fisProperties.getFhir().getData_store_tech().equals("hapi")) {
                otherPageObservationSearchBundle = paginationHapi.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageObservationSearchBundle, page.get(), numberOfObservationsPerPage);

            } else {
                otherPageObservationSearchBundle = paginationProxy.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageObservationSearchBundle, page.get(), numberOfObservationsPerPage);

            }
        }

        List<Bundle.BundleEntryComponent> retrievedObservations = otherPageObservationSearchBundle.getEntry();

        List<ObservationDto> observationsList = convertToObservationDto(retrievedObservations);

        double totalPages = Math.ceil((double) otherPageObservationSearchBundle.getTotal() / numberOfObservationsPerPage);
        int currentPage = firstPage ? 1 : page.get();

        return new PageDto<>(observationsList, numberOfObservationsPerPage, totalPages, currentPage, observationsList.size(), otherPageObservationSearchBundle.getTotal());

    }

    @Override
    public void createObservation(ObservationDto observationDto) {
        Observation fhirObservation = converDtoToObservation(observationDto);
        MethodOutcome methodOutcome = FhirOperationUtil.createFhirResource(fhirClient, fhirObservation, ResourceType.Observation.name());
        log.info("Observation created: " + FhirOperationUtil.getFhirId(methodOutcome));
    }

    @Override
    public void updateObservation(ObservationDto observationDto, String id) {
        Observation observation = convertToObservation(observationDto, id);

        MethodOutcome methodOutcome = FhirOperationUtil.updateFhirResource(fhirClient, observation, ResourceType.Observation.name());
        log.info("Observation Updated: " + FhirOperationUtil.getFhirId(methodOutcome));
    }

    @Override
    public PageDto<ObservationDto> getRelatedObservations(String patient, Optional<Boolean> showInactive, Optional<Integer> page, Optional<Integer> size) {
        int numberPage = PaginationRepository.getValidPageSize(fisProperties, page, ResourceType.Observation.name());
        IQuery observationquery = fhirClient.search().forResource(Observation.class).where(new ReferenceClientParam("patient").hasId("Patient/" + patient));
        observationquery = FhirOperationUtil.setLastUpdatedTimeSortOrder(observationquery, true);
        Bundle firstPageBundle;
        Bundle otherPageBundle;
        boolean firstPage = true;

        firstPageBundle = (Bundle) observationquery.count(numberPage).returnBundle(Bundle.class).execute();

        if (firstPageBundle == null || firstPageBundle.isEmpty()) {
            log.info("No Observations found for this given criteria");
            return new PageDto<>(new ArrayList<>(), numberPage, 0, 0, 0, 0);
        }

        otherPageBundle = firstPageBundle.copy();

        if (page.isPresent() && page.get() > 1 && otherPageBundle.getLink(Bundle.LINK_NEXT) != null) {
            firstPage = false;
            if (fisProperties.getFhir().getData_store_tech().equals("gcp")) {
                otherPageBundle = paginationGcp.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageBundle, page.get(), numberPage);

            } else if (fisProperties.getFhir().getData_store_tech().equals("hapi")) {
                otherPageBundle = paginationHapi.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageBundle, page.get(), numberPage);

            } else {
                otherPageBundle = paginationProxy.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageBundle, page.get(), numberPage);

            }
        }

        List<Bundle.BundleEntryComponent> retrieveobservations = otherPageBundle.getEntry();
        List<ObservationDto> observationDtos = convertToObservationDto(retrieveobservations);

        double totalPages = Math.ceil((double) otherPageBundle.getTotal() / numberPage);
        int currentPage = firstPage ? 1 : page.get();
        return new PageDto<>(observationDtos, numberPage, totalPages, currentPage, observationDtos.size(), otherPageBundle.getTotal());
    }

    public List<ObservationDto> convertToObservationDto(List<Bundle.BundleEntryComponent> retrieveobservations) {
        return retrieveobservations.stream().map(this::mapmultipleobservations).collect(toList());
    }

    public ObservationDto mapmultipleobservations(Bundle.BundleEntryComponent observations) {
        ObservationDto observationDto = new ObservationDto();
        Observation observation = (Observation) observations.getResource();
        CodeDto codeDto = new CodeDto();
        ValueCodeableConceptDto valueCodeableConceptDto = new ValueCodeableConceptDto();

        //Code
        List<gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding> getcodes = observation.getCode().getCoding().stream().map(code -> {
            gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding coding = new gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding();
            coding.setDisplay(code.getDisplay());
            coding.setCode(code.getCode());
            coding.setSystem(code.getSystem());
            return coding;
        }).collect(toList());

        codeDto.setCoding(getcodes);
        observationDto.setCode(codeDto);

        //Issued
        if (observation.getIssued() != null && !observation.getIssued().toString().isEmpty()) {
            observationDto.setIssued(Optional.of(observation.getIssued().toString()));
        }

        //Status
        if (observation.getStatus() != null && observation.getStatus().getDisplay() != null) {
            observationDto.setStatus(observation.getStatus().getDisplay());
        }

        //ValueCodeableConcept
        if (observation.hasValueCodeableConcept()) {
            mapObservationcodings(observationDto, observation, valueCodeableConceptDto);
        }

        //Subject
        Subject subject = new Subject();
        subject.setReference(observation.getSubject().getReference());
        observationDto.setSubject(subject);

        if (observation.getValue() instanceof IntegerType) {
            if (observation.getValueIntegerType().hasValue()) {
                observationDto.setValueInteger(observation.getValueIntegerType().getValue());
            }
        }

        //LogicalId
        observationDto.setId(observation.getIdElement().getIdPart());

        return observationDto;
    }

    public void mapObservationcodings(ObservationDto observationDto, Observation observation, ValueCodeableConceptDto valueCodeableConceptDto) {
        List<gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding> codeablecodes = observation.getValueCodeableConcept().getCoding().stream().map(values -> {
            gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding coding = new gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding();
            coding.setDisplay(values.getDisplay());
            coding.setCode(values.getCode());
            coding.setSystem(values.getSystem());
            return coding;
        }).collect(toList());
        valueCodeableConceptDto.setCoding(codeablecodes);
        valueCodeableConceptDto.setText(observation.getValueCodeableConcept().getText());
        observationDto.setValueCodeableConcept(valueCodeableConceptDto);
    }

    public ObservationDto mapsingleObservation(Observation observation) {
        ObservationDto observationDto = new ObservationDto();
        CodeDto codeDto = new CodeDto();
        ValueCodeableConceptDto valueCodeableConceptDto = new ValueCodeableConceptDto();

        //Code
        List<gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding> getcodes = observation.getCode().getCoding().stream().map(code -> {
            gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding coding = new gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding();
            coding.setDisplay(code.getDisplay());
            coding.setCode(code.getCode());
            coding.setSystem(code.getSystem());
            return coding;
        }).collect(toList());

        codeDto.setCoding(getcodes);
        observationDto.setCode(codeDto);

        //Status
        observationDto.setStatus(observation.getStatus().getDisplay());


        //Subject
        Subject subject = new Subject();
        subject.setReference(observation.getSubject().getReference());
        observationDto.setSubject(subject);

        if (observation.getValue() instanceof IntegerType) {
            if (observation.getValueIntegerType().hasValue()) {
                observationDto.setValueInteger(observation.getValueIntegerType().getValue());
            }
        } else {
            //ValueCodeableConcept
            mapObservationcodings(observationDto, observation, valueCodeableConceptDto);
        }

        //LogicalId
        observationDto.setId(observation.getIdElement().getIdPart());

        return observationDto;
    }

    public Observation convertToObservation(ObservationDto observationDto, String id) {
        Observation observation = new Observation();

        //Observation Id
        observation.setId(id);

        if (observationDto.getValueCodeableConcept() != null && !observationDto.getValueCodeableConcept().getCoding().isEmpty()) {
            //ValueCodeableConcept
            CodeableConcept codeableConcept_value = new CodeableConcept();
            List<Coding> codingList = observationDto.getValueCodeableConcept().getCoding().stream().map(coding -> {
                Coding codingvalues = new Coding();
                codingvalues.setCode(coding.getCode());
                codingvalues.setDisplay(coding.getDisplay());
                codingvalues.setSystem(coding.getSystem());
                return codingvalues;
            }).collect(toList());
            codeableConcept_value.setCoding(codingList);
            codeableConcept_value.setText(observationDto.getValueCodeableConcept().getText());
            observation.setValue(codeableConcept_value);
        }

        if (observationDto.getValueInteger() != null) {
            IntegerType integerType = new IntegerType();
            integerType.setValue(observationDto.getValueInteger());
            observation.setValue(integerType);
        }

        //Status
        observation.setStatus(Observation.ObservationStatus.AMENDED);

        if (observationDto.getIssued().isPresent()) {
            try {
                String stringDateIssued = observationDto.getIssued().get();
                Date dateConverted = DateUtil.convertIsoStringToDate(stringDateIssued);
                // Issued
                observation.setIssued(dateConverted);
            } catch (DateTimeParseException parseException) {
                log.info("Cant parse string to date in observation issued");
            }
        }

        //Code
        CodeableConcept codeableConcept_code = new CodeableConcept();
        List<Coding> codingList_codes = observationDto.getCode().getCoding().stream().map(coding -> {
            Coding coding_code = new Coding();
            coding_code.setSystem(coding.getSystem());
            coding_code.setCode(coding.getCode());
            coding_code.setDisplay(coding.getDisplay());
            return coding_code;
        }).collect(toList());
        codeableConcept_code.setCoding(codingList_codes);
        observation.setCode(codeableConcept_code);

        //Subject
        Reference reference = new Reference();
        reference.setReference(observationDto.getSubject().getReference());
        observation.setSubject(reference);

        return observation;
    }

    public Observation converDtoToObservation(ObservationDto observationDto) {
        Observation observation = new Observation();

        if (observationDto.getValueCodeableConcept() != null && !observationDto.getValueCodeableConcept().getCoding().isEmpty()) {
            //ValueCodeableConcept
            CodeableConcept codeableConcept_value = new CodeableConcept();
            List<Coding> codingList = observationDto.getValueCodeableConcept().getCoding().stream().map(coding -> {
                Coding codingvalues = new Coding();
                codingvalues.setCode(coding.getCode());
                codingvalues.setDisplay(coding.getDisplay());
                codingvalues.setSystem(coding.getSystem());
                return codingvalues;
            }).collect(toList());
            codeableConcept_value.setCoding(codingList);
            codeableConcept_value.setText(observationDto.getValueCodeableConcept().getText());
            observation.setValue(codeableConcept_value);
        }

        if (observationDto.getValueInteger() != null) {
            IntegerType integerType = new IntegerType();
            integerType.setValue(observationDto.getValueInteger());
            observation.setValue(integerType);
        }

        //Status
        observation.setStatus(Observation.ObservationStatus.REGISTERED);

        if (observationDto.getIssued().isPresent()) {
            try {
                String stringDateIssued = observationDto.getIssued().get();
                Date dateConverted = DateUtil.convertIsoStringToDate(stringDateIssued);
                // Issued
                observation.setIssued(dateConverted);
            } catch (DateTimeParseException parseException) {
                log.info("Cant parse string to date in observation issued");
            }
        }

        //Code
        CodeableConcept codeableConcept_code = new CodeableConcept();
        List<Coding> codingList_codes = observationDto.getCode().getCoding().stream().map(coding -> {
            Coding coding_code = new Coding();
            coding_code.setSystem(coding.getSystem());
            coding_code.setCode(coding.getCode());
            coding_code.setDisplay(coding.getDisplay());
            return coding_code;
        }).collect(toList());
        codeableConcept_code.setCoding(codingList_codes);
        observation.setCode(codeableConcept_code);

        //Subject
        Reference reference = new Reference();
        reference.setReference(observationDto.getSubject().getReference());
        observation.setSubject(reference);

        return observation;
    }

}
