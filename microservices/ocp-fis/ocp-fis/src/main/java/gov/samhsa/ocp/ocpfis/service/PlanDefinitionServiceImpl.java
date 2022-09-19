package gov.samhsa.ocp.ocpfis.service;

import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.gclient.IQuery;
import ca.uhn.fhir.validation.FhirValidator;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.service.dto.*;
import gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding;
import gov.samhsa.ocp.ocpfis.util.FhirOperationUtil;
import gov.samhsa.ocp.ocpfis.util.pagination.PaginationRepository;
import gov.samhsa.ocp.ocpfis.util.ProvenanceUtil;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.PlanDefinition;
import org.hl7.fhir.r4.model.PrimitiveType;
import org.hl7.fhir.r4.model.ResourceType;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
@Slf4j
public class PlanDefinitionServiceImpl implements PlanDefinitionService{
    private final ModelMapper modelMapper;
    private final IGenericClient fhirClient;
    private final FisProperties fisProperties;
    private final FhirValidator fhirValidator;
    private final LookUpService lookUpService;
    private final ProvenanceUtil provenanceUtil;

    private final PaginationRepository paginationProxy;
    private final PaginationRepository paginationHapi;

    private final PaginationRepository paginationGcp;

    public PlanDefinitionServiceImpl(ModelMapper modelMapper, IGenericClient fhirClient, FisProperties fisProperties, FhirValidator fhirValidator, LookUpService lookUpService, ProvenanceUtil provenanceUtil, @Qualifier("PaginationProxyImpl") PaginationRepository paginationProxy, @Qualifier("PaginationHapiFhirImpl") PaginationRepository paginationHapi, @Qualifier("PaginationGcpImpl") PaginationRepository paginationGcp) {
        this.modelMapper = modelMapper;
        this.fhirClient = fhirClient;
        this.fisProperties = fisProperties;
        this.fhirValidator = fhirValidator;
        this.lookUpService = lookUpService;
        this.provenanceUtil = provenanceUtil;
        this.paginationProxy = paginationProxy;
        this.paginationHapi = paginationHapi;
        this.paginationGcp = paginationGcp;
    }

    @Override
    public PageDto<PlanDefinitionDto> getAllPlans(Optional<Boolean> showInactive, Optional<Integer> page, Optional<Integer> size) {
        int numberofPlansPerPage = PaginationRepository.getValidPageSize(fisProperties, size, ResourceType.PlanDefinition.name());
        IQuery plandefinitionIQuery = fhirClient.search().forResource(PlanDefinition.class);
        plandefinitionIQuery = FhirOperationUtil.setLastUpdatedTimeSortOrder(plandefinitionIQuery, true);
        Bundle firstPagePlanSearchBundle;
        Bundle otherPagePlanSearchBundle;
        boolean firstPage = true;

        firstPagePlanSearchBundle = PaginationRepository.getSearchBundleFirstPage(plandefinitionIQuery, numberofPlansPerPage, Optional.empty());

        if(firstPagePlanSearchBundle == null || firstPagePlanSearchBundle.getEntry().size() < 1){
            log.info("No PlanDefinition References were found for the given criteria");
            return new PageDto<>(new ArrayList<>(), numberofPlansPerPage, 0,0,0,0);
        }

        otherPagePlanSearchBundle = firstPagePlanSearchBundle.copy();

        if(page.isPresent() && page.get() > 1 && otherPagePlanSearchBundle.getLink(Bundle.LINK_NEXT) != null) {
            firstPage = false;
            if (fisProperties.getFhir().getData_store_tech().equals("gcp")) {
                otherPagePlanSearchBundle = paginationGcp.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPagePlanSearchBundle, page.get(), numberofPlansPerPage);

            } else if (fisProperties.getFhir().getData_store_tech().equals("hapi")) {
                otherPagePlanSearchBundle = paginationHapi.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPagePlanSearchBundle, page.get(), numberofPlansPerPage);

            } else {
                otherPagePlanSearchBundle = paginationProxy.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPagePlanSearchBundle, page.get(), numberofPlansPerPage);

            }
        }

        List<Bundle.BundleEntryComponent> retrieveplans = otherPagePlanSearchBundle.getEntry();

        List<PlanDefinitionDto> plandefinitionlistbundle = converListtoPlanDefinitions(retrieveplans);

        double totalPages = Math.ceil((double) otherPagePlanSearchBundle.getTotal() / numberofPlansPerPage);
        int currentPage = firstPage ? 1 : page.get();


        return new PageDto<>(plandefinitionlistbundle, numberofPlansPerPage, totalPages, currentPage, plandefinitionlistbundle.size(), otherPagePlanSearchBundle.getTotal());
    }

    private List<PlanDefinitionDto> converListtoPlanDefinitions(List<Bundle.BundleEntryComponent> plandefinitionlistbundle){
        return plandefinitionlistbundle.stream().filter(plan -> {
            PlanDefinition planDefinition = (PlanDefinition) plan.getResource();
            return planDefinition.hasType();
        }).filter(plan -> {
            PlanDefinition planDefinition = (PlanDefinition) plan.getResource();
            return planDefinition.getType().getCoding().get(0).getCode().equalsIgnoreCase("goal-definition");
        }).map(this::mapbundletoDto).collect(toList());
    }

    private PlanDefinitionDto mapbundletoDto(Bundle.BundleEntryComponent plandefinitionbundle) {
        PlanDefinitionDto planDefinitionDto = new PlanDefinitionDto();
        PlanDefinition planDefinition = (PlanDefinition) plandefinitionbundle.getResource();

        // ID
        planDefinitionDto.setLogicalId(planDefinition.getIdElement().getIdPart());

        // Resource URL
        planDefinitionDto.setResourceURL(planDefinition.getIdElement().getBaseUrl());

        // Status
        planDefinitionDto.setStatus(planDefinition.getStatusElement().getCode());

        // Name
        planDefinitionDto.setName(planDefinition.getName());

        // Date
        planDefinitionDto.setDate(planDefinition.getDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());

        // SubjectCodeableConcept
        ValueCodeableConceptDto valueCodeableConceptsubject = new ValueCodeableConceptDto();

        List<Coding> codingssubect = planDefinition.getSubjectCodeableConcept().getCoding().stream().map(coding -> {
            Coding codingsubject = new Coding();
            codingsubject.setCode(coding.getCode());
            codingsubject.setSystem(coding.getSystem());
            return codingsubject;
        }).collect(toList());

        valueCodeableConceptsubject.setCoding(codingssubect);
        valueCodeableConceptsubject.setText(planDefinition.getSubjectCodeableConcept().getText());
        planDefinitionDto.setSubjectCodeableConcept(valueCodeableConceptsubject);

        // Name
        planDefinitionDto.setName(planDefinition.getName());

        // Title
        planDefinitionDto.setTitle(planDefinition.getTitle());

        // Version
        planDefinitionDto.setVersion(planDefinition.getVersion());

        // Description
        planDefinitionDto.setDescription(planDefinition.getDescription());

        // UseContext
        List<UsageContextDto> usageContextlist = planDefinition.getUseContext().stream().map(context -> {
            UsageContextDto usageContextDto = new UsageContextDto();
            Coding codingcontext = new Coding();

            codingcontext.setCode(context.getCode().getCode());
            codingcontext.setSystem(context.getCode().getSystem());
            codingcontext.setDisplay(context.getCode().getDisplay());

//            SubjectReferenceDto contextreference = new SubjectReferenceDto();
//            contextreference.setReference(context.getValueReference().getReference());

            List<Coding> codingvalues =   context.getValueCodeableConcept().getCoding().stream().map(codingvalue ->{
                Coding coding = new Coding();
                coding.setSystem(codingvalue.getSystem());
                coding.setCode(codingvalue.getCode());
                coding.setDisplay(codingvalue.getDisplay());
                return coding;
            }).collect(toList());

            ValueCodeableConceptDto valueCodeableConceptDto = new ValueCodeableConceptDto();
            valueCodeableConceptDto.setCoding(codingvalues);

            usageContextDto.setValueCodeableConcept(valueCodeableConceptDto);

            usageContextDto.setCode(codingcontext);
            //usageContextDto.setValueReference(contextreference);

            return usageContextDto;
        }).collect(toList());

        planDefinitionDto.setUseContext(usageContextlist);

        // Type
        ValueCodeableConceptDto typedto = new ValueCodeableConceptDto();

        List<Coding> codingtypes = planDefinition.getType().getCoding().stream().map(coding -> {
            Coding coding1 = new Coding();
            coding1.setSystem(coding.getSystem());
            coding1.setCode(coding.getCode());
            return coding1;
        }).collect(toList());

        typedto.setText(planDefinition.getType().getText());
        typedto.setCoding(codingtypes);
        planDefinitionDto.setType(typedto);

        // Topic
        List<ValueCodeableConceptDto> conceptopics = planDefinition.getTopic().stream().map(topic -> {
            ValueCodeableConceptDto conceptopic = new ValueCodeableConceptDto();

            List<Coding> codingstops = topic.getCoding().stream().map(coding -> {
                Coding codingtopic = new Coding();
                codingtopic.setCode(coding.getCode());
                codingtopic.setSystem(coding.getSystem());
                return codingtopic;
            }).collect(toList());

            conceptopic.setCoding(codingstops);
            conceptopic.setText(topic.getText());

            return conceptopic;
        }).collect(toList());

        planDefinitionDto.setTopic(conceptopics);

        // Goal
        List<PlanDefinitionGoalDto> goallist = planDefinition.getGoal().stream().map(goalplan -> {
            PlanDefinitionGoalDto planDefinitionGoalDto = new PlanDefinitionGoalDto();
            ValueCodeableConceptDto categories = new ValueCodeableConceptDto();
            ValueCodeableConceptDto descriptions = new ValueCodeableConceptDto();
            ValueCodeableConceptDto start = new ValueCodeableConceptDto();

            List<PlanDefinitionGoalTargetDto> planDefinitionGoalTargetDtos = goalplan.getTarget().stream().map(plantarget -> {
                PlanDefinitionGoalTargetDto planDefinitionGoalTargetDto = new PlanDefinitionGoalTargetDto();
                DurationDto durationDto = new DurationDto();

                durationDto.setValue(plantarget.getDue().getValue());
                durationDto.setUnit(plantarget.getDue().getUnit());

                planDefinitionGoalTargetDto.setDue(durationDto);

                return planDefinitionGoalTargetDto;

            }).collect(toList());

            planDefinitionGoalDto.setTarget(planDefinitionGoalTargetDtos);

            List<Coding> codingscategories = goalplan.getCategory().getCoding().stream().map(coding -> {
                Coding coding1 = new Coding();
                coding1.setSystem(coding.getSystem());
                coding1.setCode(coding.getCode());
                return coding1;
            }).collect(toList());

            categories.setCoding(codingscategories);
            categories.setText(goalplan.getCategory().getText());

            planDefinitionGoalDto.setCategory(categories);

            List<Coding> codingdescription = goalplan.getDescription().getCoding().stream().map(codedescription -> {
                Coding coding = new Coding();
                coding.setCode(codedescription.getCode());
                coding.setSystem(codedescription.getSystem());
                return coding;
            }).collect(toList());

            descriptions.setText(goalplan.getDescription().getText());
            descriptions.setCoding(codingdescription);
            planDefinitionGoalDto.setDescription(descriptions);

            List<Coding> startcodingList = goalplan.getStart().getCoding().stream().map(startcode ->{
                Coding coding = new Coding();
                coding.setSystem(startcode.getSystem());
                coding.setCode(startcode.getCode());
                return coding;
            }).collect(toList());

            start.setCoding(startcodingList);
            start.setText(goalplan.getStart().getText());

            planDefinitionGoalDto.setStart(start);

            return planDefinitionGoalDto;

        }).collect(toList());

        planDefinitionDto.setGoal(goallist);


        // Action
        List<ActionPlanDefinitionDto> actionPlanDefinitionDtos = planDefinition.getAction().stream().map(action -> {
            ActionPlanDefinitionDto actionPlanDefinitionDto = new ActionPlanDefinitionDto();
            DurationDto durationDto = new DurationDto();

            actionPlanDefinitionDto.setTitle(action.getTitle());
            durationDto.setUnit(action.getTimingDuration().getUnit());
            durationDto.setValue(action.getTimingDuration().getValue());

            List<String> goalids = action.getGoalId().stream().map(PrimitiveType::getValueAsString).collect(toList());

            actionPlanDefinitionDto.setGoalId(goalids);
            actionPlanDefinitionDto.setTimingDuration(durationDto);

            return actionPlanDefinitionDto;

        }).collect(toList());

        planDefinitionDto.setAction(actionPlanDefinitionDtos);

        return planDefinitionDto;
    }

}
