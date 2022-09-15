package gov.samhsa.ocp.smartcore.infrastructure.dto;

import lombok.Data;

import java.util.List;

@Data
public class ListClientDto {
    private List<ClientDto> resources;
}
