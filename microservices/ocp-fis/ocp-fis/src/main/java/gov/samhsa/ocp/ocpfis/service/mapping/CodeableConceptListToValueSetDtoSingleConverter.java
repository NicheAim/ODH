package gov.samhsa.ocp.ocpfis.service.mapping;

import gov.samhsa.ocp.ocpfis.service.dto.ValueSetDto;
import org.hl7.fhir.r4.model.CodeableConcept;
import org.modelmapper.AbstractConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;


@Component
public class CodeableConceptListToValueSetDtoSingleConverter extends AbstractConverter<List<CodeableConcept>, ValueSetDto> {


    @Override
    protected ValueSetDto convert(List<CodeableConcept> source) {
        ValueSetDto valueSetDto = new ValueSetDto();
        List<ValueSetDto> valueSetDtos = new ArrayList<>();

        if (source != null && source.size() > 0) {
            int numberOfCategories = source.get(0).getCoding().size();
            if (numberOfCategories > 0) {
                source.get(0).getCoding().forEach(coding -> {
                    valueSetDto.setSystem(coding.getSystem());
                    valueSetDto.setDisplay(coding.getDisplay());
                    valueSetDto.setCode(coding.getCode());
                    valueSetDtos.add(valueSetDto);
                });
            }
        }
        return valueSetDtos.get(0);

    }
}
