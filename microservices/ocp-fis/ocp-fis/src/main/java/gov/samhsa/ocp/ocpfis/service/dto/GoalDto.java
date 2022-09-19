package gov.samhsa.ocp.ocpfis.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import gov.samhsa.ocp.ocpfis.service.dto.valueset.Target;
import lombok.*;

import java.util.Date;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class GoalDto extends NameLogicalIdIdentifiersDto {
    private String id;
    private String lifecycleStatus;
    private GoalCodeDto achievementStatus;
    private List<GoalCodeDto> category;
    private GoalCodeDto description;
    private SubjectReferenceDto subject;
    private List<Target> target;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private Date statusDate;
    private String statusReason;
}
