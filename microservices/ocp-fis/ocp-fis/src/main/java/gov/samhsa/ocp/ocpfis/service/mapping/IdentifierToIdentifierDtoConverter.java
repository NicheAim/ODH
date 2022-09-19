package gov.samhsa.ocp.ocpfis.service.mapping;

import gov.samhsa.ocp.ocpfis.constants.IdentifierConstants;
import gov.samhsa.ocp.ocpfis.domain.KnownIdentifierSystemEnum;
import gov.samhsa.ocp.ocpfis.service.dto.IdentifierDto;
import gov.samhsa.ocp.ocpfis.service.exception.IdentifierSystemNotFoundException;
import org.hl7.fhir.r4.model.Identifier;
import org.modelmapper.AbstractConverter;
import org.springframework.stereotype.Component;

@Component
public class IdentifierToIdentifierDtoConverter extends AbstractConverter<Identifier, IdentifierDto> {

    IdentifierDto identifierDto;

    @Override
    protected IdentifierDto convert(Identifier identifier) {

        if (identifier != null) {
            String systemOid = identifier.getSystem() != null ? identifier.getSystem() : "";
            String systemDisplay = null;

            try {
                if (systemOid.startsWith(IdentifierConstants.URN_OID_TEXT) || systemOid.startsWith(IdentifierConstants.HTTP_TEXT)) {
                    systemDisplay = KnownIdentifierSystemEnum.fromUri(systemOid).getDisplay();
                } else if (systemOid.startsWith(IdentifierConstants.OID_NUMBER_STARTING_WITH)) {
                    systemDisplay = KnownIdentifierSystemEnum.fromOid(systemOid).getDisplay();
                } else
                    systemDisplay = systemOid;
            } catch (IdentifierSystemNotFoundException e) {
                systemDisplay = systemOid;
            }

            identifierDto = IdentifierDto.builder()
                    .system(systemOid)
                    .oid(systemOid.startsWith(IdentifierConstants.URN_OID_TEXT)
                            ? systemOid.replace(IdentifierConstants.URN_OID_TEXT, "")
                            : "")
                    .systemDisplay(systemDisplay)
                    .value(identifier.getValue())
                    .display(identifier.getValue())
                    .build();
        }
        return identifierDto;
    }

}

