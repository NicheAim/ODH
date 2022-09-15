package gov.samhsa.ocp.ocpfis.service.mapping.dtotofhirmodel;

import gov.samhsa.ocp.ocpfis.service.dto.ValueSetDto;
import org.hl7.fhir.r4.model.CodeableConcept;
import org.hl7.fhir.r4.model.Coding;
import org.modelmapper.AbstractConverter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ValuesetDtoToCodeableConceptListConverter extends AbstractConverter<ValueSetDto, List<CodeableConcept>> {


    @Override
    protected List<CodeableConcept> convert(ValueSetDto source) {
        List<CodeableConcept> codeableConceptList = new ArrayList<>();

        if (source != null ) {

                CodeableConcept tempCodeableConcept = new CodeableConcept();
                if (source.getCode() != null){
                    Coding tempCoding = new Coding();
                    tempCoding.setCode(source.getCode());
                    tempCoding.setSystem(source.getSystem());
                    tempCoding.setDisplay(source.getDisplay());
                    tempCodeableConcept.addCoding(tempCoding);
                }
                codeableConceptList.add(tempCodeableConcept);

        }
        return codeableConceptList;
    }
}
