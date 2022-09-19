package gov.samhsa.ocp.ocpfis.config;

import ca.uhn.fhir.rest.api.EncodingEnum;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Configuration
@ConfigurationProperties(prefix = "ocp-fis")
@Data
public class FisProperties {

    @NotNull
    @Valid
    private Fhir fhir;

    @NotNull
    private String defaultOrganization;

    @NotNull
    private String defaultPractitioner;

    @NotNull
    private int defaultEndPeriod;

    @NotNull
    private int defaultMaxDuration;

    @NotNull
    @Min(1)
    @Max(1000)
    private int ResourceSinglePageLimit;

    @NotNull
    @Valid
    private ActivityDefinition activityDefinition;

    @NotNull
    @Valid
    private Appointment appointment;

    @NotNull
    @Valid
    private Communication communication;

    @NotNull
    @Valid
    private HealthcareService healthcareService;

    @NotNull
    @Valid
    private Location location;

    @NotNull
    @Valid
    private Practitioner practitioner;

    @NotNull
    @Valid
    private Organization organization;

    @NotNull
    @Valid
    private Patient patient;

    @NotNull
    @Valid
    private RelatedPerson relatedPerson;

    @NotNull
    @Valid
    private CareTeam careTeam;

    @NotNull
    @Valid
    private Coverage coverage;

    @NotNull
    private boolean provenanceEnabled;

    @NotNull
    private boolean mintEnabled;

    @NotNull
    private boolean validationEnabled;

    @Data
    public static class Fhir {

        @NotBlank
        private String serverUrl;
        @NotNull
        private boolean serverSecurityEnabled;
        @NotBlank
        private String clientSocketTimeoutInMs;
        @NotNull
        private EncodingEnum encoding = EncodingEnum.JSON;
        @NotNull
        private int defaultResourceBundlePageSize;
        @NotNull
        private boolean gcp;
        @NotNull
        private int expiration_token;
        @NotNull
        private String jwt_issuer;
        @NotNull
        private String jwt_audience;
        @NotNull
        private String jwt_secret;
        @NotNull
        private String jwt_subject;
        @NotNull
        private int number_bundle_per_page_patients_max;

        @NotNull
        private String data_store_tech;
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ActivityDefinition {

        @NotNull
        private String version;

        @Valid
        private Pagination pagination = new Pagination();

        @Data
        public static class Pagination {
            @Min(1)
            @Max(500)
            private int defaultSize = 10;
            @Min(1)
            @Max(500)
            private int maxSize = 50;
        }
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Appointment {

        @Valid
        private Pagination pagination = new Pagination();

        @Data
        public static class Pagination {
            @Min(1)
            @Max(500)
            private int defaultSize = 10;
            @Min(1)
            @Max(500)
            private int maxSize = 50;
        }
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Communication {

        @Valid
        private Pagination pagination = new Pagination();

        @Data
        public static class Pagination {
            @Min(1)
            @Max(500)
            private int defaultSize = 10;
            @Min(1)
            @Max(500)
            private int maxSize = 50;
        }
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class HealthcareService {
        @Valid
        private Pagination pagination = new Pagination();

        @Data
        public static class Pagination {
            @Min(1)
            @Max(500)
            private int defaultSize = 10;
            @Min(1)
            @Max(500)
            private int maxSize = 50;
        }
    }


    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Location {
        @Valid
        private Pagination pagination = new Pagination();

        @Data
        public static class Pagination {
            @Min(1)
            @Max(500)
            private int defaultSize = 10;
            @Min(1)
            @Max(500)
            private int maxSize = 50;
        }
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Practitioner {
        @Valid
        private Pagination pagination = new Pagination();

        @Data
        public static class Pagination {
            @Min(1)
            @Max(500)
            private int defaultSize = 10;
            @Min(1)
            @Max(500)
            private int maxSize = 50;
        }
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Organization {
        @Valid
        private Pagination pagination = new Pagination();

        @Data
        public static class Pagination {
            @Min(1)
            @Max(500)
            private int defaultSize = 10;
            @Min(1)
            @Max(500)
            private int maxSize = 50;
        }
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patient {
        @Valid
        private Pagination pagination = new Pagination();

        @Valid
        private Mrn mrn = new Mrn();

        @Data
        public static class Pagination {
            @Min(1)
            @Max(500)
            private int defaultSize = 10;
            @Min(1)
            @Max(500)
            private int maxSize = 50;
        }

        @Data
        public static class Mrn {
            private String codeSystem;
            private String codeSystemOID;
            private String displayName;
            private String prefix;
            private int length;
        }
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class RelatedPerson {
        @Valid
        private Pagination pagination = new Pagination();

        @Data
        public static class Pagination {
            @Min(1)
            @Max(500)
            private int defaultSize = 10;
            @Min(1)
            @Max(500)
            private int maxSize = 50;
        }
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CareTeam {
        @Valid
        private Pagination pagination = new Pagination();

        @Data
        public static class Pagination {
            @Min(1)
            @Max(500)
            private int defaultSize = 10;
            @Min(1)
            @Max(500)
            private int maxSize = 50;
        }
    }

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Coverage {
        @Valid
        private Pagination pagination = new Pagination();

        @Data
        public static class Pagination {
            @Min(1)
            @Max(500)
            private int defaultSize = 10;
            @Min(1)
            @Max(500)
            private int maxSize = 50;
        }
    }

}

