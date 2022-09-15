package gov.samhsa.ocp.ocpuiapi.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EpisodeOfCareDto {
    String id;

    String status;

    Optional<String> statusDisplay;

    String type;

    Optional<String> typeDisplay;

    ReferenceDto patient;

    ReferenceDto managingOrganization;

    String startDate;

    String endDate;

    ReferenceDto careManager;
}
