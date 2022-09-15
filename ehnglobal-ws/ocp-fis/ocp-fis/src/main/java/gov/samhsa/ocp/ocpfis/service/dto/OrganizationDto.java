package gov.samhsa.ocp.ocpfis.service.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Optional;

@EqualsAndHashCode(callSuper = true)
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrganizationDto extends NameLogicalIdIdentifiersDto {
    private boolean active;
    private List<AddressDto> addresses;
    private List<TelecomDto> telecoms;
    private Optional<List<ContactDto>> contacts;
}