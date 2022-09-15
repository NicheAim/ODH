package gov.samhsa.ocp.ocpfis.web;

import gov.samhsa.ocp.ocpfis.service.DocumentReferenceService;
import gov.samhsa.ocp.ocpfis.service.dto.BinaryDto;
import gov.samhsa.ocp.ocpfis.service.dto.DocumentReferenceDto;
import gov.samhsa.ocp.ocpfis.service.dto.PageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/attachments")
public class DocumentReferenceController {

    @Autowired
    DocumentReferenceService documentReferenceService;

    @GetMapping
    public PageDto<DocumentReferenceDto> getAllDocuments(@RequestParam Optional<Boolean> showInactive, @RequestParam Optional<Integer> page, @RequestParam Optional<Integer> size){
        return documentReferenceService.getAllDocuments(showInactive, page, size);
    }

    @GetMapping("/{documentId}")
    public DocumentReferenceDto getDocumentById(@PathVariable String documentId) {
        return documentReferenceService.getDocumentById(documentId);
    }

    @GetMapping("/search")
    public PageDto<DocumentReferenceDto> getDocumentbyPatientId(
            @RequestParam String patientId,
            @RequestParam Optional<String> searchKey,
            @RequestParam Optional<String> searchValue,
            @RequestParam Optional<Boolean> showInActive,
            @RequestParam Optional<Integer> pageNumber,
            @RequestParam Optional<Integer> pageSize,
            @RequestParam Optional<Boolean> showAll){
        return documentReferenceService.getDocumentbyPatientId(patientId, searchKey, searchValue, showInActive, pageNumber, pageSize,showAll);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createDocumentReference(@Valid @RequestBody DocumentReferenceDto documentReferenceDto) {
        documentReferenceService.createDocumentReference(documentReferenceDto);
    }

    @GetMapping(value = "/binary/{binaryId}")
    public BinaryDto getBinaryById(@PathVariable("binaryId") String binaryId)  {
         return documentReferenceService.getBinaryById(binaryId);
    }


}
