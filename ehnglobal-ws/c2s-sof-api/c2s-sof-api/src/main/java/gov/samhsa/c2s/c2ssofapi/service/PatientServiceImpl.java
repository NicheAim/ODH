package gov.samhsa.c2s.c2ssofapi.service;

import ca.uhn.fhir.rest.client.api.IGenericClient;
import ca.uhn.fhir.rest.gclient.TokenClientParam;
import gov.samhsa.c2s.c2ssofapi.config.ConfigProperties;
import gov.samhsa.c2s.c2ssofapi.service.dto.IdentifierDto;
import gov.samhsa.c2s.c2ssofapi.service.dto.NameDto;
import gov.samhsa.c2s.c2ssofapi.service.dto.PatientDto;
import gov.samhsa.c2s.c2ssofapi.service.dto.TypeDto;
import gov.samhsa.c2s.c2ssofapi.service.exception.ResourceNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.r4.model.Bundle;
import org.hl7.fhir.r4.model.Flag;
import org.hl7.fhir.r4.model.Patient;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import static java.util.stream.Collectors.toList;

@Service
@Slf4j
public class PatientServiceImpl implements PatientService {

    private final IGenericClient fhirClient;

    private final ModelMapper modelMapper;

    private final ConfigProperties configProperties;

    @Autowired
    public PatientServiceImpl(IGenericClient fhirClient, ModelMapper modelMapper, ConfigProperties configProperties) {
        this.fhirClient = fhirClient;
        this.modelMapper = modelMapper;
        this.configProperties = configProperties;
    }

    @Override
    public PatientDto getPatientById(String patientId, Optional<String> token) {
        System.out.println("Searching patient by id");
        Bundle patientBundle = fhirClient.search().forResource(Patient.class)
                .where(new TokenClientParam("_id").exactly().code(patientId))
                .revInclude(Flag.INCLUDE_PATIENT)
                .returnBundle(Bundle.class)
                .execute();
        System.out.println("Validating Bundle");
        if (patientBundle == null || patientBundle.getEntry().size() < 1) {
            throw new ResourceNotFoundException("No patient was found for the given patientID : " + patientId);
        }

        Bundle.BundleEntryComponent patientBundleEntry = patientBundle.getEntry().get(0);
        Patient patient = (Patient) patientBundleEntry.getResource();
        System.out.println("PArsing Data");
        PatientDto patientDto = modelMapper.map(patient, PatientDto.class);

        NameDto nameDto = new NameDto();
        nameDto.setFirstName(patient.getName().get(0).getGiven().get(0).getValue());
        nameDto.setLastName(patient.getName().get(0).getFamily());

        List<NameDto> nameDtos = new ArrayList<>();
        nameDtos.add(nameDto);

        patientDto.setName(nameDtos);
        patientDto.setId(patient.getIdElement().getIdPart());
        patientDto.setBirthDate(patient.getBirthDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate());
        patientDto.setGenderCode(patient.getGender().toCode());
        patientDto.setMrn(patientDto.getIdentifier().stream()
                .filter(Objects::nonNull)
                .filter(identifierDto -> identifierDto.getType() != null && identifierDto.getType().getText().equalsIgnoreCase("MRN"))
                .findFirst().map(IdentifierDto::getValue));

        if(!patientDto.getMrn().isPresent()) {
            patientDto.setMrn(patientDto.getIdentifier().stream()
                    .filter(Objects::nonNull)
                    .filter(identifierDto -> identifierDto.getSystem().equalsIgnoreCase(configProperties.getPatient().getMrn().getCodeSystem()))
                    .findFirst().map(IdentifierDto::getValue));
        }
        //patientDto.setMrn(patientDto.getIdentifier().stream().filter(iden -> iden.getOid().equalsIgnoreCase(configProperties.getPatient().getMrn().getCodeSystemOID()) || iden.getSystemDisplay().equalsIgnoreCase(configProperties.getPatient().getMrn().getDisplayName())).findFirst().map(IdentifierDto::getValue));
        //patientDto.setIdentifier(patientDto.getIdentifier().stream().filter(iden -> !iden.getSystem().equalsIgnoreCase(configProperties.getPatient().getMrn().getCodeSystemOID())).collect(toList()));

        List<IdentifierDto> identifierDtos = patient.getIdentifier().stream().map(identifier -> {
            IdentifierDto identifierDto = new IdentifierDto();
            TypeDto typeDto = new TypeDto();
            if(identifier.hasType()) {
                identifierDto.setDisplay(identifier.getType().getText());
                typeDto.setText(identifier.getType().getText());
                identifierDto.setType(typeDto);
            } else if (identifier.getSystem().equalsIgnoreCase(configProperties.getPatient().getSsn().getCodeSystem())) {
                identifierDto.setDisplay(configProperties.getPatient().getSsn().getDisplayName());
                identifierDto.setSystem(configProperties.getPatient().getSsn().getCodeSystem());
                identifierDto.setValue(identifier.getValue());
                identifierDto.setSystemDisplay(configProperties.getPatient().getSsn().getDisplayName());
            } else if (identifier.getSystem().equalsIgnoreCase(configProperties.getPatient().getLicense().getCodeSystem())) {
                identifierDto.setDisplay(configProperties.getPatient().getLicense().getCodeSystem());
                identifierDto.setSystem(configProperties.getPatient().getLicense().getCodeSystem());
                identifierDto.setValue(identifier.getValue());
                identifierDto.setSystemDisplay(configProperties.getPatient().getLicense().getDisplayName());
            } else if (identifier.getSystem().equalsIgnoreCase(configProperties.getPatient().getMrn().getCodeSystem())) {
                identifierDto.setDisplay(configProperties.getPatient().getMrn().getCodeSystem());
                identifierDto.setSystem(configProperties.getPatient().getMrn().getCodeSystem());
                identifierDto.setValue(identifier.getValue());
                identifierDto.setSystemDisplay(configProperties.getPatient().getMrn().getDisplayName());
            } else {
                identifierDto.setSystem(identifier.getSystem());
                identifierDto.setValue(identifier.getValue());
                identifierDto.setDisplay("N/D");
            }
            return identifierDto;
        }).collect(toList());

        patientDto.setIdentifier(identifierDtos);
        //patientDto.setIdentifier(patientDto.getIdentifier().stream().filter(Objects::nonNull).collect(toList()));
        //patientDto.setIdentifier(patientDto.getIdentifier().stream().filter(identifierDto -> identifierDto.getSystem().equalsIgnoreCase("https://bhits.github.io/consent2share")).collect(toList()));
        System.out.println("DONE LOADING PATIENT DATA");
        System.out.println(patientDto.getName().get(0));
        return patientDto;
    }
}


