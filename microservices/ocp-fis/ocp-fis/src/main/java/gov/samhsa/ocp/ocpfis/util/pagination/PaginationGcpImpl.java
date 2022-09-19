package gov.samhsa.ocp.ocpfis.util.pagination;

import ca.uhn.fhir.rest.client.api.IGenericClient;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.service.exception.ResourceNotFoundException;
import org.hl7.fhir.r4.model.Bundle;
import org.springframework.stereotype.Component;

@Component("PaginationGcpImpl")
public class PaginationGcpImpl implements PaginationRepository {
    @Override
    public Bundle getSearchBundleAfterFirstPage(IGenericClient fhirClient, FisProperties fisProperties, Bundle SearchBundle, int pageNumber, int pageSize) {
        if (SearchBundle.getLink(Bundle.LINK_NEXT) != null) {
            Bundle.BundleLinkComponent nextPage = SearchBundle.getLink(Bundle.LINK_NEXT);
            String urlNext = nextPage.getUrl();
            // Load the required page
            return fhirClient.search().byUrl(urlNext).returnBundle(Bundle.class).execute();
        } else {
            throw new ResourceNotFoundException("No resources were found in the FHIR server for the page number: " + pageNumber);
        }
    }
}
