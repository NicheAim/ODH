package gov.samhsa.ocp.ocpuiapi.service.dto;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TaskDto {

  private enum TaskDueEnum {
    OVER_DUE,
    DUE_TODAY,
    UPCOMING,
    DATA_ERROR
  }

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
}
