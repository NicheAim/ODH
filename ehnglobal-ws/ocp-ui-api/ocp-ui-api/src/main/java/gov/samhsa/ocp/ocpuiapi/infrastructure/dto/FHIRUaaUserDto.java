package gov.samhsa.ocp.ocpuiapi.infrastructure.dto;


import gov.samhsa.ocp.ocpuiapi.service.dto.AddressDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.IdentifierDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.NameDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PractitionerDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PractitionerRoleDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.TelecomDto;
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
public class FHIRUaaUserDto {
     private String logicalId;

     private Optional<String> userId;

     private Optional<String> userName;

     private Optional<String> userRoleDisplayName;

     private Optional<String> userRoleDescription;

     private List<NameDto> name;

     private List<IdentifierDto> identifiers;

     private boolean active;

     private List<TelecomDto> telecoms;

     private List<AddressDto> addresses;

     private List<PractitionerRoleDto>  practitionerRoles;
}
