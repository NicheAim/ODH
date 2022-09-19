package gov.samhsa.ocp.ocpuiapi.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ActivityDefinitionDto {
    private String logicalId;
    private String version;
    private String name;
    private String title;
    private ValueSetDto status;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/YYYY")
    private String date;
    private String publisher;
    private String description;

    private PeriodActivityDto effectivePeriod;
    private ValueSetDto topic;
    private List<RelatedArtifactDto> relatedArtifact;
    private ValueSetDto kind;

    private TimingDto timing;
    private ValueSetDto actionParticipantType;
    private ValueSetDto actionParticipantRole;

}
