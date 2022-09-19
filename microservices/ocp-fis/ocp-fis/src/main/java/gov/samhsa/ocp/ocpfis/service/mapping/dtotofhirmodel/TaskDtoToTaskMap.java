package gov.samhsa.ocp.ocpfis.service.mapping.dtotofhirmodel;

import static gov.samhsa.ocp.ocpfis.util.FhirDtoUtil.mapReferenceDtoToReference;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.hl7.fhir.exceptions.FHIRException;
import org.hl7.fhir.r4.model.Annotation;
import org.hl7.fhir.r4.model.CodeableConcept;
import org.hl7.fhir.r4.model.Identifier;
import org.hl7.fhir.r4.model.Reference;
import org.hl7.fhir.r4.model.Task;
import org.hl7.fhir.r4.model.codesystems.TaskStatus;

import gov.samhsa.ocp.ocpfis.service.dto.IdentifierDto;
import gov.samhsa.ocp.ocpfis.service.dto.TaskDto;
import gov.samhsa.ocp.ocpfis.util.FhirDtoUtil;

public class TaskDtoToTaskMap {

    public static Task map(TaskDto taskDto) throws FHIRException {
        Task task = new Task();
        task.setFocus(FhirDtoUtil.mapReferenceDtoToReference(taskDto.getDefinition()));

        if (taskDto.getPartOf() != null) {
            List<Reference> partOfReferences = new ArrayList<>();
            partOfReferences.add(mapReferenceDtoToReference(taskDto.getPartOf()));
            task.setPartOf(partOfReferences);
        }

        if (taskDto.getIdentifier() != null) {
            List<Identifier> identifierList = new ArrayList<>();

            if (taskDto.getIdentifier().isPresent()) {
                List<IdentifierDto> source = taskDto.getIdentifier().get();
                if (source != null && source.size() > 0) {
                    for (IdentifierDto tempIdentifierDto : source) {
                        Identifier tempIdentifier = new Identifier();
                        if (tempIdentifierDto.getSystem() != null)
                            tempIdentifier.setSystem(tempIdentifierDto.getSystem());
                        if (tempIdentifierDto.getValue() != null)
                            tempIdentifier.setValue(tempIdentifierDto.getValue());
                        // TODO: Set identifier type and use
                        identifierList.add(tempIdentifier);
                    }
                }
                task.setIdentifier(identifierList);
            }

        }

        task.setStatus(Task.TaskStatus.fromCode(taskDto.getStatus().getCode()));
        task.setIntent(Task.TaskIntent.PLAN);
        // task.setIntent(Task.TaskIntent.valueOf(taskDto.getIntent().getDisplay().replaceAll("\\s",
        // "").toUpperCase()));
        task.setPriority(
                Task.TaskPriority.valueOf(taskDto.getPriority().getDisplay().replaceAll("\\s", "").toUpperCase()));

        if (taskDto.getDescription() != null && !taskDto.getDescription().isEmpty()) {
            task.setDescription(taskDto.getDescription());
        }

        task.setFor(mapReferenceDtoToReference(taskDto.getBeneficiary()));

        // Set execution Period
        if (taskDto.getExecutionPeriod() != null) {
            if (taskDto.getExecutionPeriod().getStart() != null)
                task.getExecutionPeriod().setStart(java.sql.Date.valueOf(taskDto.getExecutionPeriod().getStart()));
        } else if (taskDto.getStatus().getCode().equalsIgnoreCase(TaskStatus.INPROGRESS.toCode()))
            task.getExecutionPeriod().setStart(java.sql.Date.valueOf(LocalDate.now()));

        if (taskDto.getExecutionPeriod() != null) {
            if (taskDto.getExecutionPeriod().getEnd() != null)
                task.getExecutionPeriod().setEnd(java.sql.Date.valueOf(taskDto.getExecutionPeriod().getEnd()));
        } else if (taskDto.getStatus().getCode().equalsIgnoreCase(TaskStatus.COMPLETED.toCode()))
            task.getExecutionPeriod().setEnd(java.sql.Date.valueOf(LocalDate.now()));

        // Set agent
        task.setRequester(mapReferenceDtoToReference(taskDto.getAgent()));

        // Set on Behalf of
        if (taskDto.getOrganization() != null) {
            task.setReasonReference(mapReferenceDtoToReference(taskDto.getOrganization()));
        }

        // Set Context
        if (taskDto.getContext() != null) {
            // task.setEncounter(mapReferenceDtoToReference(taskDto.getContext()));
        }

        // Set PerformerType
        if (taskDto.getPerformerType() != null) {
            List<CodeableConcept> codeableConcepts = new ArrayList<>();
            CodeableConcept codeableConcept = new CodeableConcept();
            codeableConcept.addCoding().setCode(taskDto.getPerformerType().getCode())
                    .setDisplay(taskDto.getPerformerType().getDisplay())
                    .setSystem(taskDto.getPerformerType().getSystem());
            codeableConcepts.add(codeableConcept);
            task.setPerformerType(codeableConcepts);
        }

        // Set last Modified
        // task.setLastModified(java.sql.Date.valueOf(LocalDate.now()));

        task.setOwner(mapReferenceDtoToReference(taskDto.getOwner()));

        Annotation annotation = new Annotation();
        annotation.setText(taskDto.getNote());
        List<Annotation> annotations = new ArrayList<>();
        annotations.add(annotation);
        task.setNote(annotations);

        return task;
    }
}
