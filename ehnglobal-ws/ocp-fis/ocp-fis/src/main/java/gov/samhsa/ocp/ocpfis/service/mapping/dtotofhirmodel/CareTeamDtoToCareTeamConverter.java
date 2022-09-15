package gov.samhsa.ocp.ocpfis.service.mapping.dtotofhirmodel;

import gov.samhsa.ocp.ocpfis.constants.CareTeamConstants;
import gov.samhsa.ocp.ocpfis.domain.ParticipantTypeEnum;
import gov.samhsa.ocp.ocpfis.service.dto.CareTeamDto;
import gov.samhsa.ocp.ocpfis.service.dto.ParticipantDto;
import gov.samhsa.ocp.ocpfis.util.DateUtil;
import gov.samhsa.ocp.ocpfis.util.FhirResourceUtil;
import org.hl7.fhir.exceptions.FHIRException;
import org.hl7.fhir.r4.model.CareTeam;
import org.hl7.fhir.r4.model.CodeableConcept;
import org.hl7.fhir.r4.model.Coding;
import org.hl7.fhir.r4.model.Period;
import org.hl7.fhir.r4.model.Reference;
import org.hl7.fhir.r4.model.ResourceType;
import lombok.extern.slf4j.Slf4j;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Slf4j
public class CareTeamDtoToCareTeamConverter {

    public static CareTeam map(CareTeamDto careTeamDto) throws FHIRException, ParseException {
        CareTeam careTeam = new CareTeam();
        //id
        careTeam.setId(careTeamDto.getId());

        //name
        careTeam.setName(careTeamDto.getName());

        //status
        if (careTeamDto.getStatusCode() != null && !careTeamDto.getStatusCode().trim().isEmpty()) {
            CareTeam.CareTeamStatus careTeamStatus = CareTeam.CareTeamStatus.fromCode(careTeamDto.getStatusCode());
            careTeam.setStatus(careTeamStatus);
        } else {
            CareTeam.CareTeamStatus careTeamStatus = CareTeam.CareTeamStatus.fromCode(CareTeamConstants.STATUS_ACTIVE);
            careTeam.setStatus(careTeamStatus);
        }

        //categories
        Coding coding = new Coding();
        if (FhirResourceUtil.isStringNotNullAndNotEmpty(careTeamDto.getCategoryCode())) {
            coding.setCode(careTeamDto.getCategoryCode());
        }
        if (FhirResourceUtil.isStringNotNullAndNotEmpty(careTeamDto.getCategoryDisplay())) {
            coding.setDisplay(careTeamDto.getCategoryDisplay());
        }
        if (FhirResourceUtil.isStringNotNullAndNotEmpty(careTeamDto.getCategorySystem())) {
            coding.setSystem(careTeamDto.getCategorySystem());
        }
        CodeableConcept codeableConcept = new CodeableConcept().addCoding(coding);
        careTeam.addCategory(codeableConcept);

        //subject
        careTeam.getSubject().setReference("Patient/" + careTeamDto.getSubjectId());

        //start and end date
        Period period = new Period();
        period.setStart(DateUtil.convertStringToDate(careTeamDto.getStartDate()));
        period.setEnd(DateUtil.convertStringToDate(careTeamDto.getEndDate()));
        careTeam.setPeriod(period);

        //ReasonCode
        Coding codingReasonCode = new Coding();
        if (FhirResourceUtil.isStringNotNullAndNotEmpty(careTeamDto.getReasonCode())) {
            codingReasonCode.setCode(careTeamDto.getReasonCode());
        }
        if (FhirResourceUtil.isStringNotNullAndNotEmpty(careTeamDto.getReasonDisplay())) {
            codingReasonCode.setDisplay(careTeamDto.getReasonDisplay());
        }
        if (FhirResourceUtil.isStringNotNullAndNotEmpty(careTeamDto.getReasonSystem())) {
            codingReasonCode.setSystem(careTeamDto.getReasonSystem());
        }
        CodeableConcept codeableConceptReasonCode = new CodeableConcept().addCoding(codingReasonCode);
        careTeam.setReasonCode(Collections.singletonList(codeableConceptReasonCode));

        //participants
        List<ParticipantDto> participantDtoList = careTeamDto.getParticipants();
        List<CareTeam.CareTeamParticipantComponent> participantsList = new ArrayList<>();

        for (ParticipantDto participantDto : participantDtoList) {
            CareTeam.CareTeamParticipantComponent careTeamParticipant = new CareTeam.CareTeamParticipantComponent();

            String memberType = participantDto.getMemberType();

            if (memberType.equalsIgnoreCase(ParticipantTypeEnum.practitioner.getCode())) {
                careTeamParticipant.getMember().setReference(ParticipantTypeEnum.practitioner.getName() + "/" + participantDto.getMemberId());

            } else if (memberType.equalsIgnoreCase(ParticipantTypeEnum.patient.getCode())) {
                careTeamParticipant.getMember().setReference(ParticipantTypeEnum.patient.getName() + "/" + participantDto.getMemberId());

            } else if (memberType.equalsIgnoreCase(ParticipantTypeEnum.organization.getCode())) {
                careTeamParticipant.getMember().setReference(ParticipantTypeEnum.organization.getName() + "/" + participantDto.getMemberId());

            } else if (memberType.equalsIgnoreCase(ParticipantTypeEnum.relatedPerson.getCode())) {
                careTeamParticipant.getMember().setReference(ParticipantTypeEnum.relatedPerson.getName() + "/" + participantDto.getMemberId());
            }

            Coding codingRoleCode = new Coding();
            if (FhirResourceUtil.isStringNotNullAndNotEmpty(participantDto.getRoleCode())) {
                codingRoleCode.setCode(participantDto.getRoleCode());
            }
            if (FhirResourceUtil.isStringNotNullAndNotEmpty(participantDto.getRoleDisplay())) {
                codingRoleCode.setDisplay(participantDto.getRoleDisplay());
            }
            if (FhirResourceUtil.isStringNotNullAndNotEmpty(participantDto.getRoleSystem())) {
                codingRoleCode.setSystem(participantDto.getRoleSystem());
            }
            CodeableConcept codeableConceptRoleCode = new CodeableConcept().addCoding(codingRoleCode);
            careTeamParticipant.setRole(Arrays.asList(codeableConceptRoleCode));

            Period participantPeriod = new Period();
            participantPeriod.setStart(DateUtil.convertStringToDate(participantDto.getStartDate()));
            participantPeriod.setEnd(DateUtil.convertStringToDate(participantDto.getEndDate()));
            careTeamParticipant.setPeriod(participantPeriod);

            participantsList.add(careTeamParticipant);
        }

        careTeam.setParticipant(participantsList);

        //managingOrganization
        Reference reference = new Reference();
        reference.setReference(ResourceType.Organization + "/" + careTeamDto.getManagingOrganization());
        careTeam.setManagingOrganization(Collections.singletonList(reference));

        //episodeOfCare
        
        if (careTeamDto.getEpisodeOfCareCode() != null) {
            Reference eocReference = new Reference();
            eocReference.setReference(careTeamDto.getEpisodeOfCareCode());
            eocReference.setDisplay(careTeamDto.getEpisodeOfCareType());
            careTeam.setEncounter(eocReference);
            log.info("does have episode of care");
        } else {
            log.info("does not have episode of care");
        }

        return careTeam;
    }
}
