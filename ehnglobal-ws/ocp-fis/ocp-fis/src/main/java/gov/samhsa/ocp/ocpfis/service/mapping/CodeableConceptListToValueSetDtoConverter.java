package gov.samhsa.ocp.ocpfis.service.mapping;

import gov.samhsa.ocp.ocpfis.service.dto.ValueSetDto;
import org.hl7.fhir.r4.model.CodeableConcept;
import org.modelmapper.AbstractConverter;
import org.springframework.stereotype.Component;

import java.util.List;

@Component

public class CodeableConceptListToValueSetDtoConverter extends AbstractConverter<List<CodeableConcept>, ValueSetDto> {

    @Override
    protected ValueSetDto convert(List<CodeableConcept> source) {
        ValueSetDto valueSetDto = new ValueSetDto();

        if (!source.isEmpty()) {
            int sourceSize = source.get(0).getCoding().size();
            if (sourceSize > 0) {
                source.get(0).getCoding().stream().findAny().ifPresent(coding -> {
                    valueSetDto.setSystem(coding.getSystem());
                    valueSetDto.setDisplay(coding.getDisplay());
                    valueSetDto.setCode(coding.getCode());
                });
            }
        }
        return valueSetDto;

    }

}
