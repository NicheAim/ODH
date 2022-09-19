package gov.samhsa.ocp.ocpfis.service.mapping;

import org.hl7.fhir.r4.model.CodeableConcept;
import org.hl7.fhir.r4.model.StringType;
import org.modelmapper.AbstractConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CodeConceptListToStringListConverter extends AbstractConverter<List<CodeableConcept>, List<String>> {

    @Override
    protected List<String> convert(List<CodeableConcept> source) {
        List<String> strings = new ArrayList<>();

        if (source != null && source.size() > 0) {
            for (CodeableConcept tempStringType : source) {
                String tempString = tempStringType.getId();
                strings.add(tempString);
            }
        }
        return strings;
    }
}
