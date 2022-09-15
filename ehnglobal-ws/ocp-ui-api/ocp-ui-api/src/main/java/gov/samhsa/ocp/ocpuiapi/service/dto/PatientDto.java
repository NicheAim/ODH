package gov.samhsa.ocp.ocpuiapi.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotEmpty;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PatientDto {
    private String id;

    private String resourceURL;

    @Valid
    private List<IdentifierDto> identifier;

    private Optional<String> mrn;

    private boolean active;

    // Human Name (family, given name)
    private List<NameDto> name;

    @NotEmpty
    private String genderCode;
    private String genderDisplayString;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
    private LocalDate birthDate;

    private String locale;

    private String race;

    private String ethnicity;

    private String birthSex;

    private List<AddressDto> addresses;

    private List<TelecomDto> telecoms;

    private String language;
    private String languageDisplayString;

    private List<EpisodeOfCareDto> episodeOfCares;

    private Optional<List<FlagDto>> flags;

    private Optional<List<CoverageDto>> coverages;

    Optional<String> organizationId;

    Optional<ReferenceDto> organization;

    Optional<List<ReferenceDto>> organizations;

    Optional<String> practitionerId;

    Optional<List<String>> activityTypes;

    Optional<Boolean> canViewPatientDetail;

    private String uaaId;

    private Optional<List<RelatedPersonDto>> emergencyContacts;

    private Optional<String> createdOnCode;

    private Optional<ObservationDto> sil;
}
