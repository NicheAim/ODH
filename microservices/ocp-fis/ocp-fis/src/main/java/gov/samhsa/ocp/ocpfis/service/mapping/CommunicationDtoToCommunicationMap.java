package gov.samhsa.ocp.ocpfis.service.mapping;

import gov.samhsa.ocp.ocpfis.service.LookUpService;
import gov.samhsa.ocp.ocpfis.service.dto.CommunicationDto;
import gov.samhsa.ocp.ocpfis.service.dto.ValueSetDto;
import gov.samhsa.ocp.ocpfis.util.DateUtil;
import gov.samhsa.ocp.ocpfis.util.FhirDtoUtil;
import gov.samhsa.ocp.ocpfis.util.FhirOperationUtil;
import org.hl7.fhir.r4.model.Annotation;
import org.hl7.fhir.r4.model.CodeableConcept;
import org.hl7.fhir.r4.model.Coding;
import org.hl7.fhir.r4.model.Communication;
import org.hl7.fhir.r4.model.Reference;
import org.hl7.fhir.r4.model.StringType;
import org.hl7.fhir.r4.model.Type;
import org.hl7.fhir.dstu2.model.Communication.CommunicationStatus;
import org.hl7.fhir.exceptions.FHIRException;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class CommunicationDtoToCommunicationMap {

    public static final String AUTHOR_STRING = "authorString";

    public static Communication map(CommunicationDto communicationDto, LookUpService lookUpService) throws ParseException, FHIRException {
        Communication communication = new Communication();

        if (communicationDto.getStatusValue().equals("ocurred")) {
            communication.setStatus(Communication.CommunicationStatus.COMPLETED);
        } else {
            communication.setStatus(Communication.CommunicationStatus.NOTDONE);
        }

        //Set Subject
        if (communicationDto.getSubject() != null && FhirOperationUtil.isStringNotNullAndNotEmpty(communicationDto.getSubject().getReference())) {
            communication.setSubject(FhirDtoUtil.mapReferenceDtoToReference(communicationDto.getSubject()));
        }

        //Set Sender
        if (communicationDto.getSender() != null && FhirOperationUtil.isStringNotNullAndNotEmpty(communicationDto.getSender().getReference())) {
            communication.setSender(FhirDtoUtil.mapReferenceDtoToReference(communicationDto.getSender()));
        }

        //Set Status
        if (communicationDto.getStatusCode() != null && FhirOperationUtil.isStringNotNullAndNotEmpty(communicationDto.getStatusCode())) {
            communication.setStatus(Communication.CommunicationStatus.valueOf(communicationDto.getStatusCode().toUpperCase().replaceAll("-", "")));
        }

        //Set Category
        if (communicationDto.getCategoryCode() != null && FhirOperationUtil.isStringNotNullAndNotEmpty(communicationDto.getCategoryCode())) {
            ValueSetDto category = FhirDtoUtil.convertCodeToValueSetDto(communicationDto.getCategoryCode(), lookUpService.getCommunicationCategory());
            List<CodeableConcept> categories = new ArrayList<>();
            categories.add(FhirDtoUtil.convertValuesetDtoToCodeableConcept(category));
            communication.setCategory(categories);
        }

        //Set Medium
        if (communicationDto.getMediumCode() != null && FhirOperationUtil.isStringNotNullAndNotEmpty(communicationDto.getMediumCode())) {
            ValueSetDto medium = FhirDtoUtil.convertCodeToValueSetDto(communicationDto.getMediumCode(), lookUpService.getCommunicationMedium());
            List<CodeableConcept> mediums = new ArrayList<>();
            mediums.add(FhirDtoUtil.convertValuesetDtoToCodeableConcept(medium));
            communication.setMedium(mediums);
        }

        //Set Not Done Reason
        if (communicationDto.getNotDoneReasonCode() != null && communicationDto.getNotDoneReasonValue() != null) {
            CodeableConcept statusReason = new CodeableConcept();
            Coding coding = new Coding();

            coding.setCode(communicationDto.getNotDoneReasonCode());
            coding.setDisplay(communicationDto.getNotDoneReasonValue());

            statusReason.addCoding(coding);
            communication.setStatusReason(statusReason);
        }

        //Set subject
        if (communicationDto.getSubject() != null) {
            communication.setSubject(FhirDtoUtil.mapReferenceDtoToReference(communicationDto.getSubject()));
        }

        //Set recipients
        if (communicationDto.getRecipient() != null) {
            communication.setRecipient(communicationDto.getRecipient().stream().map(FhirDtoUtil::mapReferenceDtoToReference).collect(Collectors.toList()));
        }

        //Set topic
        // if (communicationDto.getTopic() != null) {
        //     List<Reference> topics = new ArrayList<>();
        //     topics.add(FhirDtoUtil.mapReferenceDtoToReference(communicationDto.getTopic()));
        //     communication.setTopic((CodeableConcept) topics);
        // }

        //Set definitions
        if (communicationDto.getDefinition() != null) {
            List<Reference> definitions = new ArrayList<>();
            definitions.add(FhirDtoUtil.mapReferenceDtoToReference(communicationDto.getDefinition()));
            communication.setAbout(definitions);
        }

        //Set Sent and Received Dates
        if (communicationDto.getSent() != null && FhirOperationUtil.isStringNotNullAndNotEmpty(communicationDto.getSent())) {
            communication.setSent(DateUtil.convertStringToDateTime(communicationDto.getSent()));
        }

        if (communicationDto.getReceived() != null && FhirOperationUtil.isStringNotNullAndNotEmpty(communicationDto.getReceived()))
            communication.setReceived(DateUtil.convertStringToDateTime(communicationDto.getReceived()));

        //Set Note
        List<Annotation> annotations = new ArrayList<>();

        if (FhirOperationUtil.isStringNotNullAndNotEmpty(communicationDto.getNote())) {
            Annotation annotation = new Annotation();
            StringType stringType = (StringType) annotation.addChild(AUTHOR_STRING);
            stringType.setValue("note");

            annotation.setText(communicationDto.getNote());

            annotations.add(annotation);

        }

        //set duration
        if(FhirOperationUtil.isStringNotNullAndNotEmpty(communicationDto.getDuration())) {
            Annotation annotation = new Annotation();
            StringType stringType = (StringType) annotation.addChild(AUTHOR_STRING);
            stringType.setValue("duration");

            annotation.setText(communicationDto.getDuration());

            annotations.add(annotation);

        }

        if(annotations.size() > 0) {
            communication.setNote(annotations);
        }

        //Set Message
        if (communicationDto.getPayloadContent() != null && FhirOperationUtil.isStringNotNullAndNotEmpty(communicationDto.getPayloadContent())) {
            StringType newType = new StringType(communicationDto.getPayloadContent());
            Communication.CommunicationPayloadComponent messagePayload = new Communication.CommunicationPayloadComponent(newType);
            List<Communication.CommunicationPayloadComponent> payloads = new ArrayList<>();
            payloads.add(messagePayload);
            communication.setPayload(payloads);
        }

        return communication;
    }
}
