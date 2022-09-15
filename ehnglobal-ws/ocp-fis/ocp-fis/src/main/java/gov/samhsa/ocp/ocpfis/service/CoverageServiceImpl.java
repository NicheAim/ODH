package gov.samhsa.ocp.ocpfis.service;

import ca.uhn.fhir.rest.api.MethodOutcome;
import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.gclient.IQuery;
import ca.uhn.fhir.rest.gclient.ReferenceClientParam;
import ca.uhn.fhir.validation.FhirValidator;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.domain.ProvenanceActivityEnum;
import gov.samhsa.ocp.ocpfis.service.dto.CoverageDto;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import gov.samhsa.ocp.ocpfis.service.dto.PatientDto;
import gov.samhsa.ocp.ocpfis.service.dto.ReferenceDto;
import gov.samhsa.ocp.ocpfis.service.exception.DuplicateResourceFoundException;
import gov.samhsa.ocp.ocpfis.service.exception.ResourceNotFoundException;
import gov.samhsa.ocp.ocpfis.service.mapping.CoverageToCoverageDtoMap;
import gov.samhsa.ocp.ocpfis.service.mapping.dtotofhirmodel.CoverageDtoToCoverageMap;
import gov.samhsa.ocp.ocpfis.util.FhirOperationUtil;
import gov.samhsa.ocp.ocpfis.util.FhirProfileUtil;
import gov.samhsa.ocp.ocpfis.util.pagination.PaginationRepository;
import gov.samhsa.ocp.ocpfis.util.ProvenanceUtil;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Coverage;
import org.hl7.fhir.r4.model.Patient;
import org.hl7.fhir.r4.model.ResourceType;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CoverageServiceImpl implements CoverageService {

    private final IGenericClient fhirClient;

    private final FhirValidator fhirValidator;

    private final LookUpService lookUpService;

    private final FisProperties fisProperties;

    private final ModelMapper modelMapper;

    private final RelatedPersonService relatedPersonService;

    private final ProvenanceUtil provenanceUtil;

    private final PaginationRepository paginationProxy;
    private final PaginationRepository paginationHapi;

    private final PaginationRepository paginationGcp;

    @Autowired
    public CoverageServiceImpl(IGenericClient fhirClient, FhirValidator fhirValidator, LookUpService lookUpService, FisProperties fisProperties, ModelMapper modelMapper, RelatedPersonService relatedPersonService, ProvenanceUtil provenanceUtil, @Qualifier("PaginationProxyImpl") PaginationRepository paginationProxy, @Qualifier("PaginationHapiFhirImpl") PaginationRepository paginationHapi, @Qualifier("PaginationGcpImpl") PaginationRepository paginationGcp) {
        this.fhirClient = fhirClient;
        this.fhirValidator = fhirValidator;
        this.lookUpService = lookUpService;
        this.fisProperties = fisProperties;
        this.modelMapper = modelMapper;
        this.relatedPersonService = relatedPersonService;
        this.provenanceUtil = provenanceUtil;
        this.paginationProxy = paginationProxy;
        this.paginationHapi = paginationHapi;
        this.paginationGcp = paginationGcp;
    }

    @Override
    public void createCoverage(CoverageDto coverageDto, Optional<String> loggedInUser) {
        if (!isDuplicateWhileCreate(coverageDto)) {
            List<String> idList = new ArrayList<>();

            Coverage coverage = CoverageDtoToCoverageMap.map(coverageDto, lookUpService);

            //Set Profile Meta Data
            FhirProfileUtil.setCoverageProfileMetaData(fhirClient, coverage);
            //Validate
            FhirOperationUtil.validateFhirResource(fhirValidator, coverage, Optional.empty(), ResourceType.Coverage.name(), "Create Coverage");
            //Create
            MethodOutcome methodOutcome = FhirOperationUtil.createFhirResource(fhirClient, coverage, ResourceType.Coverage.name());
            idList.add(ResourceType.Coverage.name() + "/" + FhirOperationUtil.getFhirId(methodOutcome));

            if (fisProperties.isProvenanceEnabled() && loggedInUser.isPresent()) {
                provenanceUtil.createProvenance(idList, ProvenanceActivityEnum.CREATE, loggedInUser);
            }
        } else {
            throw new DuplicateResourceFoundException("Coverage already exists for given subscriber id and beneficiary.");
        }
    }

    @Override
    public void updateCoverage(String id, CoverageDto coverageDto, Optional<String> loggedInUser) {
        List<String> idList = new ArrayList<>();

        Coverage coverage = CoverageDtoToCoverageMap.map(coverageDto, lookUpService);
        coverage.setId(id);
        //Set Profile Meta Data
        FhirProfileUtil.setCoverageProfileMetaData(fhirClient, coverage);
        //Validate
        FhirOperationUtil.validateFhirResource(fhirValidator, coverage, Optional.empty(), ResourceType.Coverage.name(), "Update Coverage");
        //Update
        MethodOutcome methodOutcome = FhirOperationUtil.updateFhirResource(fhirClient, coverage, ResourceType.Coverage.name());
        idList.add(ResourceType.Coverage.name() + "/" + FhirOperationUtil.getFhirId(methodOutcome));

        if (fisProperties.isProvenanceEnabled() && loggedInUser.isPresent()) {
            provenanceUtil.createProvenance(idList, ProvenanceActivityEnum.UPDATE, loggedInUser);
        }
    }

    @Override
    public List<ReferenceDto> getSubscriberOptions(String patientId) {
        List<ReferenceDto> referenceDtoList = new ArrayList<>();

        Patient patient = fhirClient.read().resource(Patient.class).withId(patientId).execute();

        ReferenceDto patientReference = new ReferenceDto();
        patientReference.setReference(ResourceType.Patient + "/" + patientId);
        patientReference.setDisplay(modelMapper.map(patient, PatientDto.class).getName().stream().findAny().get().getFirstName() + " " + modelMapper.map(patient, PatientDto.class).getName().stream().findAny().get().getLastName());
        referenceDtoList.add(patientReference);

        referenceDtoList.addAll(relatedPersonService.searchRelatedPersons(patientId, Optional.empty(), Optional.empty(), Optional.empty(), Optional.empty(), Optional.empty(), Optional.of(true)).getElements().stream()
                .map(relPer -> {
                    ReferenceDto relatedPersonReference = new ReferenceDto();
                    relatedPersonReference.setDisplay(relPer.getFirstName() + " " + relPer.getLastName());
                    relatedPersonReference.setReference(ResourceType.RelatedPerson + "/" + relPer.getRelatedPersonId());
                    return relatedPersonReference;
                }).collect(Collectors.toList()));

        return referenceDtoList;
    }

    @Override
    public PageDto<CoverageDto> getCoverages(String patientId, Optional<Integer> pageNumber, Optional<Integer> pageSize) {
        int numberOfCoveragePerPage = PaginationRepository.getValidPageSize(fisProperties, pageSize, ResourceType.Coverage.name());
        Bundle firstPageCoverageBundle;
        Bundle otherPageCoverageBundle;
        boolean firstPage = true;

        //Getting list of coverages
        IQuery iQuery = FhirOperationUtil.searchNoCache(fhirClient, Coverage.class, Optional.empty());

        iQuery.where(new ReferenceClientParam("beneficiary").hasId(patientId));


        firstPageCoverageBundle = PaginationRepository.getSearchBundleFirstPage(iQuery, numberOfCoveragePerPage, Optional.empty());

        if (firstPageCoverageBundle == null || firstPageCoverageBundle.getEntry().isEmpty()) {
            throw new ResourceNotFoundException("No Coverages were found in the FHIR server.");
        }

        otherPageCoverageBundle = firstPageCoverageBundle;

        if (pageNumber.isPresent() && pageNumber.get() > 1 && otherPageCoverageBundle.getLink(Bundle.LINK_NEXT) != null) {
            firstPage = false;
            if (fisProperties.getFhir().getData_store_tech().equals("gcp")) {
                otherPageCoverageBundle = paginationGcp.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageCoverageBundle, pageNumber.get(), numberOfCoveragePerPage);

            } else if (fisProperties.getFhir().getData_store_tech().equals("hapi")) {
                otherPageCoverageBundle = paginationHapi.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageCoverageBundle, pageNumber.get(), numberOfCoveragePerPage);

            } else {
                otherPageCoverageBundle = paginationProxy.getSearchBundleAfterFirstPage(fhirClient, fisProperties, firstPageCoverageBundle, pageNumber.get(), numberOfCoveragePerPage);

            }
        }

        List<Bundle.BundleEntryComponent> retrievedCoverages = otherPageCoverageBundle.getEntry();

        List<CoverageDto> coverageDtos = retrievedCoverages.stream().map(cov -> {
            Coverage coverage = (Coverage) cov.getResource();
            return CoverageToCoverageDtoMap.map(coverage);
        }).collect(Collectors.toList());

        double totalPages = Math.ceil((double) otherPageCoverageBundle.getTotal() / numberOfCoveragePerPage);
        int currentPage = firstPage ? 1 : pageNumber.get();

        return new PageDto<>(coverageDtos, numberOfCoveragePerPage, totalPages, currentPage, coverageDtos.size(), otherPageCoverageBundle.getTotal());
    }

    private boolean isDuplicateWhileCreate(CoverageDto coverageDto) {
        Bundle bundle = (Bundle) FhirOperationUtil.setNoCacheControlDirective(fhirClient.search().forResource(Coverage.class)
                .where(new ReferenceClientParam("beneficiary").hasId(coverageDto.getBeneficiary().getReference())))
                .returnBundle(Bundle.class).execute();
        return !bundle.getEntry().stream().map(bundleEntryComponent -> {
            Coverage coverage = (Coverage) bundleEntryComponent.getResource();
            return coverage.getSubscriberId();
        }).filter(id -> id.equalsIgnoreCase(coverageDto.getSubscriberId().trim())).collect(Collectors.toList()).isEmpty();

    }

    @Override
    public CoverageDto getCoverageById(String id) {
        final Coverage retrievedCoverage = fhirClient.read().resource(Coverage.class).withId(id).execute();
        if (retrievedCoverage == null || retrievedCoverage.isEmpty()) {
            log.info("No coverages were found in the FHIR server.");
        }
        final CoverageDto coverageDto = CoverageToCoverageDtoMap.map(retrievedCoverage);
        return coverageDto;
    }

}
