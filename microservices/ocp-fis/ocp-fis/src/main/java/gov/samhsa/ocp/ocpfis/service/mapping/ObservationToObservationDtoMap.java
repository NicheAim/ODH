package gov.samhsa.ocp.ocpfis.service.mapping;

import org.hl7.fhir.r4.model.IntegerType;
import org.hl7.fhir.r4.model.Observation;

import gov.samhsa.ocp.ocpfis.service.dto.CodeDto;
import gov.samhsa.ocp.ocpfis.service.dto.ObservationDto;

import gov.samhsa.ocp.ocpfis.service.dto.PatientDto;
import gov.samhsa.ocp.ocpfis.service.dto.ValueCodeableConceptDto;
import gov.samhsa.ocp.ocpfis.service.dto.valueset.Subject;
import gov.samhsa.ocp.ocpfis.util.DateUtil;
import gov.samhsa.ocp.ocpfis.util.FhirDtoUtil;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;
import static java.util.stream.Collectors.toList;
import java.util.Date;
import java.time.format.DateTimeFormatter;
import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;
import java.time.LocalDateTime;

public class ObservationToObservationDtoMap {
    public static void mapObservationcodings(ObservationDto observationDto, Observation observation,
            ValueCodeableConceptDto valueCodeableConceptDto) {
        List<gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding> codeablecodes = observation.getValueCodeableConcept()
                .getCoding().stream().map(values -> {
                    gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding coding = new gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding();
                    coding.setDisplay(values.getDisplay());
                    coding.setCode(values.getCode());
                    coding.setSystem(values.getSystem());
                    return coding;
                }).collect(toList());
        valueCodeableConceptDto.setCoding(codeablecodes);
        valueCodeableConceptDto.setText(observation.getValueCodeableConcept().getText());
        observationDto.setValueCodeableConcept(valueCodeableConceptDto);
    }

    public static ObservationDto map(Observation observation) {
        ObservationDto observationDto = new ObservationDto();
        CodeDto codeDto = new CodeDto();
        ValueCodeableConceptDto valueCodeableConceptDto = new ValueCodeableConceptDto();

        // Code
        List<gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding> getcodes = observation.getCode().getCoding().stream()
                .map(code -> {
                    gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding coding = new gov.samhsa.ocp.ocpfis.service.dto.valueset.Coding();
                    coding.setDisplay(code.getDisplay());
                    coding.setCode(code.getCode());
                    coding.setSystem(code.getSystem());
                    return coding;
                }).collect(toList());

        codeDto.setCoding(getcodes);
        observationDto.setCode(codeDto);

        // Status
        observationDto.setStatus(observation.getStatus().getDisplay());

        // Subject
        Subject subject = new Subject();
        subject.setReference(observation.getSubject().getReference());
        observationDto.setSubject(subject);

        if (observation.getValue() instanceof IntegerType) {
            if (observation.getValueIntegerType().hasValue()) {
                observationDto.setValueInteger(observation.getValueIntegerType().getValue());
            }
        } else {
            // ValueCodeableConcept
            if(observation.hasValueCodeableConcept()) {
                mapObservationcodings(observationDto, observation, valueCodeableConceptDto);
            }
//            mapObservationcodings(observationDto, observation, valueCodeableConceptDto);
        }

        // LogicalId
        observationDto.setId(observation.getIdElement().getIdPart());

        // Issued
        if (observation.getIssued() != null) {
            // DateTimeFormatter formatter =
            // DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT)
            // .withLocale(Locale.US)
            // .withZone(ZoneId.systemDefault());

            LocalDateTime issuedLocalDateTime = observation.getIssued().toInstant().atZone(ZoneId.systemDefault())
                    .toLocalDateTime();
            // String issuedDatetimeString = issuedLocalDateTime.toString();
            String issuedDatetimeString = DateUtil.convertLocalDateTimeToString(issuedLocalDateTime);
            observationDto.setIssued(Optional.of(issuedDatetimeString));
        }

        return observationDto;
    }

    public Stream<PatientDto> map(Object observation) {
        return null;
    }
}
