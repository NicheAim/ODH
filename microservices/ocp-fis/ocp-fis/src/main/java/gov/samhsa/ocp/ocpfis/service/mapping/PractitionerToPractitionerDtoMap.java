package gov.samhsa.ocp.ocpfis.service.mapping;

import gov.samhsa.ocp.ocpfis.service.dto.PractitionerDto;
import org.hl7.fhir.r4.model.Practitioner;
import org.modelmapper.PropertyMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PractitionerToPractitionerDtoMap extends PropertyMap<Practitioner,PractitionerDto> {

    @Autowired
    private TelecomListToTelecomDtoListConverter telecomListToTelecomDtoListConverter;

    @Autowired
    private IdentifierListToIdentifierDtoListConverter identifierListToIdentifierDtoListConverter;

    @Autowired
    private HumanNameListToNameDtoListConverter humanNameListToNameDtoListConverter;

    @Autowired
    private AddressListToAddressDtoListConverter addressListToAddressDtoListConverter;

    @Override
    protected void configure() {
        map().setActive(source.getActive());
        using(telecomListToTelecomDtoListConverter).map(source.getTelecom()).setTelecoms(null);
        using(identifierListToIdentifierDtoListConverter).map(source.getIdentifier()).setIdentifiers(null);
        using(humanNameListToNameDtoListConverter).map(source.getName()).setName(null);
        using(addressListToAddressDtoListConverter).map(source.getAddress()).setAddresses(null);
    }
}
