package gov.samhsa.ocp.ocpfis.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CarePlanDto  extends NameLogicalIdIdentifiersDto{
    private List<String> instantiatesCanonical;
    private String status;
    private String intent;
    private List<CodeDto> category;
    private String title;
    private String description;
    private SubjectReferenceDto subject;
    private PeriodDto period;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate created;
    private AuthorDto author;
    private List<SubjectReferenceDto> contributor;
    private List<SubjectReferenceDto> careTeam;
    private List<ActivityCarePlanDto> activity;
//    private List<SubjectReferenceDto> addresses;
//    private List<SubjectReferenceDto> goal;
}
