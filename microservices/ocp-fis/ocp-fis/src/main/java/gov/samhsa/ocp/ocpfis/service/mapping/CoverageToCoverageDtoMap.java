package gov.samhsa.ocp.ocpfis.service.mapping;

import gov.samhsa.ocp.ocpfis.service.dto.CoverageDto;
import gov.samhsa.ocp.ocpfis.service.dto.PatientDto;
import gov.samhsa.ocp.ocpfis.util.DateUtil;
import gov.samhsa.ocp.ocpfis.util.FhirDtoUtil;
import org.hl7.fhir.r4.model.Coverage;

import java.util.Optional;
import java.util.stream.Stream;

public class CoverageToCoverageDtoMap {
    public static CoverageDto map(Coverage coverage) {
        CoverageDto coverageDto = new CoverageDto();
        coverageDto.setLogicalId(coverage.getIdElement().getIdPart());
        coverageDto.setStatus(coverage.getStatus().toCode());
        coverageDto.setStatusDisplay(Optional.of(coverage.getStatus().getDisplay()));
        coverage.getType().getCoding().stream().findAny().ifPresent(coding -> {
            coverageDto.setType(coding.getCode());
            coverageDto.setTypeDisplay(Optional.ofNullable(coding.getDisplay()));
        });

        coverageDto.setSubscriber(FhirDtoUtil.convertReferenceToReferenceDto(coverage.getSubscriber()));
        coverageDto.setSubscriberId(coverage.getSubscriberId());
        coverageDto.setBeneficiary(FhirDtoUtil.convertReferenceToReferenceDto(coverage.getBeneficiary()));
        coverage.getRelationship().getCoding().stream().findAny().ifPresent(coding -> {
            coverageDto.setRelationship(coding.getCode());
            coverageDto.setRelationshipDisplay(Optional.ofNullable(coding.getDisplay()));
        });

        /*
         * Coverage.GroupComponent groupComponent = coverage.getGrouping();
         * if (groupComponent != null) {
         * coverageDto.setGroupingPlanDisplay(groupComponent.getPlanDisplay());
         * }
         */
        if (coverage.getType() != null && !coverage.getType().isEmpty()) {
            if (coverage.getType().getCoding() != null && !coverage.getType().getCoding().isEmpty()) {
                coverageDto.setGroupingPlanDisplay(coverage.getType().getCoding().get(0).getDisplay());
            }
        }

        coverageDto.setStartDate(DateUtil.convertDateToString(coverage.getPeriod().getStart()));
        coverageDto.setEndDate(DateUtil.convertDateToString(coverage.getPeriod().getEnd()));

        coverageDto.setNetwork(coverage.getNetwork());

        return coverageDto;
    }

    public Stream<PatientDto> map(Object coverage) {
        return null;
    }
}
