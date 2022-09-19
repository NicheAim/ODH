package gov.samhsa.ocp.ocpuiapi.web;

import feign.FeignException;
import gov.samhsa.ocp.ocpuiapi.infrastructure.FisClient;
import gov.samhsa.ocp.ocpuiapi.service.UserContextService;
import gov.samhsa.ocp.ocpuiapi.service.dto.BinaryDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.DocumentReferenceDto;
import gov.samhsa.ocp.ocpuiapi.service.dto.PageDto;
import gov.samhsa.ocp.ocpuiapi.util.ExceptionUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Slf4j
@RequestMapping("ocp-fis/attachments")
public class DocumentReferenceController {
    private final FisClient fisClient;

    @Autowired
    public DocumentReferenceController(FisClient fisClient){this.fisClient = fisClient;}

    @Autowired
    UserContextService userContextService;

    @GetMapping
    public PageDto<DocumentReferenceDto> getAllDocuments(){
        return  fisClient.getAllDocuments(false, 1, 100);
    }

    @GetMapping("/{documentId}")
    @ResponseStatus(HttpStatus.OK)
    public DocumentReferenceDto getDocumentById(@PathVariable("documentId") String documentId) {
        return fisClient.getDocumentById(documentId);
    }

    @GetMapping("/search")
    public PageDto<DocumentReferenceDto> getDocumentbyPatientId(
            @RequestParam(value = "patientId") String patientId,
            @RequestParam(value = "searchKey", required = false) String searchKey,
            @RequestParam(value = "searchValue", required = false) String searchValue,
            @RequestParam(value = "showInActive", required = false) Boolean showInActive,
            @RequestParam(value = "pageNumber", required = false) Integer pageNumber,
            @RequestParam(value = "pageSize", required = false) Integer pageSize,
            @RequestParam(value="showAll",required=false) Boolean showAll){
        return fisClient.getDocumentbyPatientId(patientId, searchKey, searchValue, showInActive, pageNumber, pageSize,showAll);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createDocumentReference(@Valid @RequestBody DocumentReferenceDto documentReferenceDto) {
        log.info("About to create a DocumentReference");
        try {
            fisClient.createDocumentReference(documentReferenceDto);
            log.info("Successfully created the DocumentReference");
        }catch (FeignException e){
            ExceptionUtil.handleFeignException(e, "that the DocumentReference was not created");
        }
    }

    @GetMapping(value = "/binary/{binaryId}")
    @ResponseStatus(HttpStatus.OK)
    public BinaryDto getBinaryById(@PathVariable("binaryId") String binaryId) {
        return fisClient.getBinaryById(binaryId);
    }
}
