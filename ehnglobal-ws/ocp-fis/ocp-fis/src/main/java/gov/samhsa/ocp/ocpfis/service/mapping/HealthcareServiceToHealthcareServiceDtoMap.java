package gov.samhsa.ocp.ocpfis.service.mapping;

import gov.samhsa.ocp.ocpfis.service.dto.HealthcareServiceDto;
import org.hl7.fhir.r4.model.HealthcareService;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class HealthcareServiceToHealthcareServiceDtoMap extends PropertyMap<HealthcareService, HealthcareServiceDto> {

    private final TelecomListToTelecomDtoListConverter telecomListToTelecomDtoListConverter;

    private final IdentifierListToIdentifierDtoListConverter identifierListToIdentifierDtoListConverter;

    private final CodeableConceptListToValueSetDtoListConverter codeableConceptListToValueSetDtoListConverter;

    private final CodeableConceptToValueSetDtoConverter codeableConceptToValueSetDtoConverter;

    private final CodeConceptListToStringListConverter stringTypeListToStringListConverter;
    private final CodeableConceptListToValueSetDtoSingleConverter codeableConceptListToValueSetDtoSingleConverter;



    @Autowired
    public HealthcareServiceToHealthcareServiceDtoMap(TelecomListToTelecomDtoListConverter telecomListToTelecomDtoListConverter, IdentifierListToIdentifierDtoListConverter identifierListToIdentifierDtoListConverter, CodeableConceptListToValueSetDtoListConverter codeableConceptListToValueSetDtoListConverter, CodeableConceptToValueSetDtoConverter codeableConceptToValueSetDtoConverter, CodeConceptListToStringListConverter stringTypeListToStringListConverter, CodeableConceptListToValueSetDtoSingleConverter codeableConceptListToValueSetDtoSingleConverter) {
        this.telecomListToTelecomDtoListConverter = telecomListToTelecomDtoListConverter;
        this.identifierListToIdentifierDtoListConverter = identifierListToIdentifierDtoListConverter;
        this.codeableConceptListToValueSetDtoListConverter = codeableConceptListToValueSetDtoListConverter;
        this.codeableConceptToValueSetDtoConverter = codeableConceptToValueSetDtoConverter;
        this.codeableConceptListToValueSetDtoSingleConverter = codeableConceptListToValueSetDtoSingleConverter;
        this.stringTypeListToStringListConverter = stringTypeListToStringListConverter;
    }
    @Override
    protected void configure() {
        map().setResourceURL(source.getId());
        map().setName(source.getName());
        map().setActive(source.getActive());
        map().setOrganizationId(source.getProvidedBy().getReference());
        map().setOrganizationName(source.getProvidedBy().getDisplay());
        using(stringTypeListToStringListConverter).map(source.getProgram()).setProgramName(null);
        using(telecomListToTelecomDtoListConverter).map(source.getTelecom()).setTelecom(null);
        using(identifierListToIdentifierDtoListConverter).map(source.getIdentifier()).setIdentifiers(null);
        using(codeableConceptListToValueSetDtoListConverter).map(source.getType()).setType(null);
        using(codeableConceptListToValueSetDtoListConverter).map(source.getSpecialty()).setSpecialty(null);
        using(codeableConceptListToValueSetDtoListConverter).map(source.getReferralMethod()).setReferralMethod(null);
        using(codeableConceptListToValueSetDtoSingleConverter).map(source.getCategory()).setCategory(null);
    }
}

