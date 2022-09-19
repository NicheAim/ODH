package gov.samhsa.ocp.ocpfis.service.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class DurationDto {
    private BigDecimal value;
    private String unit;
}
