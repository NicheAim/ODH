package gov.samhsa.ocp.ocpuiapi.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GoalDto {
    private String id;
    private String name;
    private String logicalId;
    private String lifecycleStatus;
    private GoalCodeDto achievementStatus;
    private List<GoalCodeDto> category;
    private GoalCodeDto description;
    private SubjectReferencedto subject;
    private List<DueDateDto> target;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date statusDate;
    private String statusReason;
}
