package gov.samhsa.ocp.ocpfis.service;

import gov.samhsa.ocp.ocpfis.service.dto.BinaryDto;
import gov.samhsa.ocp.ocpfis.service.dto.DocumentReferenceDto;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

public interface DocumentReferenceService {
    DocumentReferenceDto getDocumentById(String id);
    PageDto<DocumentReferenceDto> getAllDocuments(Optional<Boolean> showInactive, Optional<Integer> page, Optional<Integer> size);
    PageDto<DocumentReferenceDto> getDocumentbyPatientId(String patientId, Optional<String> searchKey, Optional<String> searchValue, Optional<Boolean> showInactive, Optional<Integer> pageNumber, Optional<Integer> pageSize, Optional<Boolean> showAll);
    void createDocumentReference(DocumentReferenceDto documentReferenceDto);
//    void getBinaryById(String id);

    BinaryDto getBinaryById(String id);

}
