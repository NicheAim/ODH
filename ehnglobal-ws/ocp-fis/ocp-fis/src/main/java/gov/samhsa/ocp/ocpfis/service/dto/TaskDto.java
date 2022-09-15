package gov.samhsa.ocp.ocpfis.service.dto;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonFormat;

import gov.samhsa.ocp.ocpfis.domain.TaskDueEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto implements Comparable<TaskDto> {
    private TaskDueEnum taskDue;

    private String logicalId;

    Optional<List<IdentifierDto>> identifier;

    // Reference to activity definition
    private ReferenceDto definition;

    // Parent task
    private ReferenceDto partOf;

    /*
     * Task Status.
     * Eg:draft, requested, received, accepted
     */
    private ValueSetDto status;

    /*
     * Proposal intent.
     * Eg:proposal,plan,order
     */
    private ValueSetDto intent;

    /*
     * Request Priority.
     * Eg: normal, urgent, asap, stat
     */
    private ValueSetDto priority;

    private String description;

    // Patient who benefits from the task
    private ReferenceDto beneficiary;

    /*
     * Health care event during the task creation.
     * Assign episodeOf care when ActivityDefinition name="enrollment"
     */
    private ReferenceDto context;

    /*
     * Start and end time of execution.
     * Start date when status is changed to "in-progress"
     * End date when status is changed to "Completed"
     */
    private PeriodDto executionPeriod;

    // Task Creation Date
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
    private LocalDate authoredOn;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
    private LocalDate lastModified;

    // Creator Practitioner of the task
    private ReferenceDto agent;

    /*
     * TaskPerformerType.
     * Eg:requester | dispatcher | scheduler | performer | monitor | manager |
     * acquirer | reviewer
     */
    private ValueSetDto performerType;

    // Practitioner who perform the task
    private ReferenceDto owner;

    /*
     * Comments about task. Generally entered by the owner who is assigned to
     * complete the task
     */
    private String note;

    // managingOrganization - Organization the agent is acting for
    private ReferenceDto organization;

    int dateDiff;

    private int totalSubtasks;

    private int remainingSubtasks;

    @Override
    public int compareTo(TaskDto taskDto) {
        if (endDateAvailable(this) && endDateAvailable(taskDto)) {
            return this.getExecutionPeriod().getEnd().compareTo(taskDto.getExecutionPeriod().getEnd());
        }
        return 0;
    }

    private boolean endDateAvailable(TaskDto taskDto) {
        if (taskDto.getExecutionPeriod() != null && taskDto.getExecutionPeriod().getEnd() != null) {
            return true;
        }
        return false;
    }

    public int calDateDiff() {
        LocalDate now = LocalDate.now();
        if (getExecutionPeriod() != null && getExecutionPeriod().getEnd() != null) {
            return (int) now.until(getExecutionPeriod().getEnd(), ChronoUnit.DAYS);
        }
        // exceptional data where execution period is not available for a task
        return -100;
    }

    public void displayTaskDue() {
        if (!getStatus().getCode().equalsIgnoreCase("completed")) {
            if (dateDiff == 0)
                setTaskDue(TaskDueEnum.DUE_TODAY);
            else if (dateDiff > 0)
                setTaskDue(TaskDueEnum.UPCOMING);
            else if (dateDiff < 0 && dateDiff != -100)
                setTaskDue(TaskDueEnum.OVER_DUE);
            else if (dateDiff == -100)
                setTaskDue(TaskDueEnum.DATA_ERROR);
        }
    }

}
