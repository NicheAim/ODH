package gov.samhsa.ocp.ocpuiapi.service;

import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.FHIRUaaUserDto;
import gov.samhsa.ocp.ocpuiapi.infrastructure.dto.ManageUserDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PageDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PractitionerDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PractitionerRoleDto;
import gov.samhsa.ocp.ocpuiapi.web.PractitionerController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PractitionerServiceImpl implements PractitionerService {

    @Autowired
    FisClient fisClient;

    @Autowired
    UaaUsersService uaaUsersService;

    @Override
    public PageDto<FHIRUaaUserDto> searchPractitioners(PractitionerController.SearchType searchType, String searchValue, String organization, Boolean showInactive, Integer page, Integer size, Boolean showAll, Optional<Boolean> showUser) {
        PageDto<PractitionerDto> practitioners = fisClient.searchPractitioners(searchType, searchValue, organization, showInactive, page, size, showAll);
        PageDto<FHIRUaaUserDto> fhirUaaPractitioners = new PageDto<>();
        fhirUaaPractitioners.setSize(practitioners.getSize());
        fhirUaaPractitioners.setTotalNumberOfPages(practitioners.getTotalNumberOfPages());
        fhirUaaPractitioners.setCurrentPage(practitioners.getCurrentPage());
        fhirUaaPractitioners.setCurrentPageSize(practitioners.getCurrentPageSize());
        fhirUaaPractitioners.setHasNextPage(practitioners.isHasNextPage());
        fhirUaaPractitioners.setHasPreviousPage(practitioners.isHasPreviousPage());
        fhirUaaPractitioners.setFirstPage(practitioners.isFirstPage());
        fhirUaaPractitioners.setLastPage(practitioners.isLastPage());
        fhirUaaPractitioners.setTotalElements(practitioners.getTotalElements());
        fhirUaaPractitioners.setHasElements(practitioners.isHasElements());

        List<FHIRUaaUserDto> fhirUaaUserDtos = practitioners.getElements().stream().map(fp -> {
            FHIRUaaUserDto fhirUaaUserDto = new FHIRUaaUserDto();
            fhirUaaUserDto.setLogicalId(fp.getLogicalId());
            fp.getName().stream().findAny().ifPresent(n -> {
                fhirUaaUserDto.setName(Arrays.asList(n));
            });
            fhirUaaUserDto.setAddresses(fp.getAddresses());
            fhirUaaUserDto.setIdentifiers(fp.getIdentifiers());
            fhirUaaUserDto.setActive(fp.isActive());
            fhirUaaUserDto.setTelecoms(fp.getTelecoms());

            if (showUser.isPresent()) {
                if (showUser.get()) {
                    fhirUaaUserDto.setUserId(Optional.of("N/A"));
                    fhirUaaUserDto.setUserName(Optional.of("N/A"));
                    fhirUaaUserDto.setUserRoleDisplayName(Optional.of("N/A"));
                    fhirUaaUserDto.setUserRoleDescription(Optional.of("N/A"));

                    if (organization != null) {
                        uaaPractitionerInOrganization(organization, "Practitioner", fp.getLogicalId()).ifPresent(user -> {
                            fhirUaaUserDto.setUserName(Optional.ofNullable(user.getUsername()));
                            fhirUaaUserDto.setUserId(Optional.ofNullable(user.getId()));
                            fhirUaaUserDto.setUserRoleDisplayName(Optional.ofNullable(user.getDisplayName()));
                            fhirUaaUserDto.setUserRoleDescription(Optional.ofNullable(user.getDescription()));
                        });
                    }
                }
            }

            List<PractitionerRoleDto> roles = fp.getPractitionerRoles().stream().map(f -> {
                        uaaPractitionerInOrganization(f.getOrganization().getReference().split("/")[1], "Practitioner", fp.getLogicalId()).ifPresent(user -> {
                            f.setUaaRoleDescription(Optional.ofNullable(user.getDescription()));
                            f.setUaaRoleDisplayName(Optional.ofNullable(user.getDisplayName()));
                        });
                        return f;
                    }
            ).collect(Collectors.toList());
            fhirUaaUserDto.setPractitionerRoles(roles);
            return fhirUaaUserDto;
        }).collect(Collectors.toList());
        fhirUaaPractitioners.setElements(fhirUaaUserDtos);
        return fhirUaaPractitioners;

    }

    private Optional<ManageUserDto> uaaPractitionerInOrganization(String organizationId, String resource, String practitionerId) {
        return uaaUsersService.getAllUsersByOrganizationId(organizationId, resource).stream()
                .filter(user -> {
                    String id = user.getId();
                    return uaaUsersService.getUserByFhirResouce(practitionerId, resource)
                            .stream()
                            .map(ManageUserDto::getId)
                            .distinct()
                            .collect(Collectors.toList())
                            .contains(id);
                }).findAny();
    }
}
