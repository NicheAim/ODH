package gov.samhsa.ocp.ocpfis.service.mapping.dtotofhirmodel;

import org.hl7.fhir.r4.model.CodeableConcept;
import org.hl7.fhir.r4.model.StringType;
import org.modelmapper.AbstractConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class StringListToCodeConceptListConverter extends AbstractConverter <List<String>, List<CodeableConcept> > {
    @Override
    protected List<CodeableConcept> convert(List<String> source) {
        List<CodeableConcept> stringTypes = new ArrayList<>();

        if (source != null && source.size() > 0) {
            for (String tempString : source) {
                CodeableConcept tempStringType = new CodeableConcept();
                tempStringType.setId(tempString);
                stringTypes.add(tempStringType);
            }
        }
        return stringTypes;
    }
}
