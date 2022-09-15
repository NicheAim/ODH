package gov.samhsa.ocp.ocpfis.service.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import gov.samhsa.ocp.ocpfis.service.validation.AdministrativeGenderConstraint;
import gov.samhsa.ocp.ocpfis.service.validation.BirthsexConstraint;
import gov.samhsa.ocp.ocpfis.service.validation.EthnicityConstraint;
import gov.samhsa.ocp.ocpfis.service.validation.LanguageConstraint;
import gov.samhsa.ocp.ocpfis.service.validation.RaceConstraint;
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
    @AdministrativeGenderConstraint
    private String genderCode;
    private String genderDisplayString;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
    private LocalDate birthDate;

    @RaceConstraint
    private String race;

    @EthnicityConstraint
    private String ethnicity;

    @BirthsexConstraint
    private String birthSex;

    private List<AddressDto> addresses;

    private List<TelecomDto> telecoms;

    @LanguageConstraint
    private String language;
    private String languageDisplayString;

    private List<EpisodeOfCareDto> episodeOfCares;

    private Optional<List<CoverageDto>> coverages;

    private Optional<List<FlagDto>> flags;

    Optional<String> organizationId;

    Optional<ReferenceDto> organization;

    Optional<List<ReferenceDto>> organizations;

    Optional<String> practitionerId;

    Optional<List<String>> activityTypes;

    Optional<Boolean> canViewPatientDetail;

    private Optional<List<RelatedPersonDto>> emergencyContacts;

    // private Optional<MetaDto> meta;

    private Optional<String> createdOnCode;

    private Optional<ObservationDto> sil;

}
