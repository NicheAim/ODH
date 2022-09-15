package gov.samhsa.ocp.ocpfis.util.pagination;

import ca.uhn.fhir.rest.client.api.IGenericClient;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.service.exception.ResourceNotFoundException;
import org.hl7.fhir.r4.model.Bundle;
import org.springframework.stereotype.Component;

import static ca.uhn.fhir.rest.api.Constants.*;

@Component("PaginationHapiFhirImpl")
public class PaginationHapiFhirImpl implements PaginationRepository {
    @Override
    public Bundle getSearchBundleAfterFirstPage(IGenericClient fhirClient, FisProperties fisProperties, Bundle SearchBundle, int pageNumber, int pageSize) {
        if (SearchBundle.getLink(Bundle.LINK_NEXT) != null) {
            //Assuming page number starts with 1
            int offset = ((pageNumber >= 1 ? pageNumber : 1) - 1) * pageSize;

            if (offset >= SearchBundle.getTotal()) {
                throw new ResourceNotFoundException("No resources were found in the FHIR server for the page number: " + pageNumber);
            }

            String pageUrl = fisProperties.getFhir().getServerUrl() + "?" + PARAM_PAGINGACTION + "=" + SearchBundle.getId() + "&" + PARAM_PAGINGOFFSET + "=" + offset + "&" + PARAM_COUNT + "=" + pageSize + "&_bundletype=searchset";

            // Load the required page
            return fhirClient.search().byUrl(pageUrl).returnBundle(Bundle.class).execute();
        } else {
            throw new ResourceNotFoundException("No resources were found in the FHIR server for the page number: " + pageNumber);
        }
    }
}
