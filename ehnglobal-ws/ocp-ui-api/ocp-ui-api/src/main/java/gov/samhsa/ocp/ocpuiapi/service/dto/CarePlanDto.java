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
public class CarePlanDto{
    private String logicalId;
    private List<String> instantiatesCanonical;
    private String status;
    private String intent;
    private List<CodeDto> category;
    private String title;
    private String description;
    private SubjectReferencedto subject;
    private PeriodDto period;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate created;
    private AuthorDto author;
    private List<SubjectReferencedto> contributor;
    private List<SubjectReferencedto> careTeam;
    private List<ActivityCarePlanDto> activity;
//    private List<SubjectReferencedto> addresses;
//    private List<SubjectReferencedto> goal;
}