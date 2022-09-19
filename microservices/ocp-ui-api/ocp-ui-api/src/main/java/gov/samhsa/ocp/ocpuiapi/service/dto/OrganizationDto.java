package gov.samhsa.ocp.ocpuiapi.service.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Optional;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrganizationDto {
    private String logicalId;
    private List<IdentifierDto> identifiers;
    private boolean active;
    private String name;
    private List<AddressDto> addresses;
    private List<TelecomDto> telecoms;
    private Optional<List<ContactDto>> contacts;
}