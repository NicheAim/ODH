package gov.samhsa.ocp.ocpfis.service.mapping.dtotofhirmodel;

import gov.samhsa.ocp.ocpfis.service.LookUpService;
import gov.samhsa.ocp.ocpfis.service.dto.CoverageDto;
import gov.samhsa.ocp.ocpfis.service.exception.ResourceNotFoundException;
import gov.samhsa.ocp.ocpfis.util.DateUtil;
import gov.samhsa.ocp.ocpfis.util.FhirDtoUtil;
import org.hl7.fhir.r4.model.*;
import org.hl7.fhir.exceptions.FHIRException;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

public class CoverageDtoToCoverageMap {


    public static Coverage map(CoverageDto coverageDto, LookUpService lookUpService) {
        Coverage coverage = new Coverage();
        try {
            coverage.setStatus(Coverage.CoverageStatus.fromCode(coverageDto.getStatus()));
        } catch (FHIRException e) {
            throw new ResourceNotFoundException("Status code not found");
        }
        coverage.setType(FhirDtoUtil.convertValuesetDtoToCodeableConcept(FhirDtoUtil.convertCodeToValueSetDto(coverageDto.getType(), lookUpService.getCoverageType())));
        coverage.setSubscriber(FhirDtoUtil.mapReferenceDtoToReference(coverageDto.getSubscriber()));
        coverage.setSubscriberId(coverageDto.getSubscriberId());
        coverage.setBeneficiary(FhirDtoUtil.mapReferenceDtoToReference(coverageDto.getBeneficiary()));
        coverage.setRelationship(FhirDtoUtil.convertValuesetDtoToCodeableConcept(FhirDtoUtil.convertCodeToValueSetDto(coverageDto.getRelationship(), lookUpService.getPolicyholderRelationship())));

        List<Reference> references = new ArrayList<>();
        references.add(FhirDtoUtil.mapReferenceDtoToReference(coverageDto.getSubscriber()));

        coverage.setPayor(references);

        if (coverageDto.getGroupingPlanDisplay() != null) {
            CodeableConcept codeableConcept = new CodeableConcept();
            Coding coding = new Coding();
            coding.setCode("group");
            coding.setDisplay(coverageDto.getGroupingPlanDisplay());
            codeableConcept.getCoding().add(coding);
            coverage.setType(codeableConcept);
        }

        Period period = new Period();
        try {
            period.setStart((coverageDto.getStartDate() != null) ? DateUtil.convertStringToDate(coverageDto.getStartDate()) : null);
            period.setEnd((coverageDto.getEndDate() != null) ? DateUtil.convertStringToDate(coverageDto.getEndDate()) : null);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        coverage.setPeriod(period);

        coverage.setNetwork(coverageDto.getNetwork());

        return coverage;
    }
}
