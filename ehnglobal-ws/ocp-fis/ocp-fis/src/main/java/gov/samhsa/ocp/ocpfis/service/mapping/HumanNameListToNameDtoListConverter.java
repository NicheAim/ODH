package gov.samhsa.ocp.ocpfis.service.mapping;

import gov.samhsa.ocp.ocpfis.service.dto.IdentifierDto;
import gov.samhsa.ocp.ocpfis.service.dto.NameDto;
import org.hl7.fhir.r4.model.HumanName;
import org.hl7.fhir.r4.model.Identifier;
import org.hl7.fhir.r4.model.StringType;
import org.modelmapper.AbstractConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class HumanNameListToNameDtoListConverter extends AbstractConverter<List<HumanName>, List<NameDto>> {

    @Override
    protected List<NameDto> convert(List<HumanName> source) {
        List<NameDto> nameDtos = new ArrayList<>();
        if (source != null && source.size() > 0) {
            for (HumanName humanName : source) {
                 nameDtos.add(
                        NameDto.builder()
                                .firstName(humanName.getGiven().stream().findFirst().orElse(new StringType("")).toString().trim())
                                .lastName(humanName.getFamily() != null ? humanName.getFamily().toString().trim() : "")
                                .build()
                );
            }
        }
        return nameDtos;
    }
}
