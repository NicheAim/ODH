package gov.samhsa.ocp.ocpfis.service.mapping.dtotofhirmodel;

import gov.samhsa.ocp.ocpfis.service.dto.HealthcareServiceDto;
import gov.samhsa.ocp.ocpfis.service.dto.ValueSetDto;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.r4.model.HealthcareService;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;


@Component
@Slf4j
public class HealthcareServiceDtoToHealthcareServiceMap extends PropertyMap<HealthcareServiceDto, HealthcareService> {

    @Autowired
    private IdentifierDtoListToIdentifierListConverter identifierDtoListToIdentifierListConverter;

    @Autowired
    private TelecomDtoListToTelecomListConverter telecomDtoListToTelecomListConverter;

    @Autowired
    private ValuesetDtoListToCodeableConceptListConverter valuesetDtoListToCodeableConceptListConverter;

    @Autowired
    private ValuesetDtoToCodeableConceptConverter valuesetDtoToCodeableConceptConverter;

    @Autowired
    private StringListToCodeConceptListConverter stringListToStringTypeListConverter;
    @Autowired
    private ValuesetDtoToCodeableConceptListConverter valuesetDtoToCodeableConceptListConverter;

    @Override
    protected void configure() {
        map().setName(source.getName());
        using(identifierDtoListToIdentifierListConverter).map(source.getIdentifiers()).setIdentifier(null);
        using(telecomDtoListToTelecomListConverter).map(source.getTelecom()).setTelecom(null);
        using(valuesetDtoListToCodeableConceptListConverter).map(source.getType()).setType(null);
        using(valuesetDtoListToCodeableConceptListConverter).map(source.getSpecialty()).setSpecialty(null);
        using(valuesetDtoListToCodeableConceptListConverter).map(source.getReferralMethod()).setReferralMethod(null);
        using(valuesetDtoToCodeableConceptListConverter).map(source.getCategory()).setCategory(null);
        using(stringListToStringTypeListConverter).map(source.getProgramName()).setProgram(null);
    }

}

