package gov.samhsa.ocp.smartcore.service.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserDto {
    private String id;
    private Attributes attributes;
}
