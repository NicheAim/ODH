package gov.samhsa.ocp.ocpfis.service;

import ca.uhn.fhir.rest.client.api.IGenericClient;
import gov.samhsa.ocp.ocpfis.config.FisProperties;
import gov.samhsa.ocp.ocpfis.domain.CodeSystemEnum;
import gov.samhsa.ocp.ocpfis.domain.DateRangeEnum;
import gov.samhsa.ocp.ocpfis.domain.IdentifierTypeEnum;
import gov.samhsa.ocp.ocpfis.domain.KnownIdentifierSystemEnum;
import gov.samhsa.ocp.ocpfis.domain.LookupPathUrls;
import gov.samhsa.ocp.ocpfis.domain.ParticipantTypeEnum;
import gov.samhsa.ocp.ocpfis.service.dto.DateRangeDto;
import gov.samhsa.ocp.ocpfis.service.dto.IdentifierSystemDto;
import gov.samhsa.ocp.ocpfis.service.dto.StatusBooleanValuesDto;
import gov.samhsa.ocp.ocpfis.service.dto.ValueSetDto;
import gov.samhsa.ocp.ocpfis.service.exception.ResourceNotFoundException;
import gov.samhsa.ocp.ocpfis.util.LookUpUtil;
import lombok.extern.slf4j.Slf4j;
import org.hl7.fhir.r4.model.Enumerations;
import org.hl7.fhir.r4.model.ValueSet;
import org.hl7.fhir.r4.model.codesystems.ContactentityType;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static java.util.stream.Collectors.toList;


@Service
@Slf4j
public class LookUpServiceImpl implements LookUpService {

    private final IGenericClient fhirClient;

    private final FisProperties fisProperties;

    public LookUpServiceImpl(IGenericClient fhirClient, FisProperties fisProperties) {
        this.fhirClient = fhirClient;
        this.fisProperties = fisProperties;
    }

    @Override
    public List<DateRangeDto> getDateRanges() {
        List<DateRangeDto> dateRanges = Arrays.asList(new DateRangeDto(DateRangeEnum.ONE_DAY, "1 Day"), new DateRangeDto(DateRangeEnum.ONE_WEEK, "1 Week"), new DateRangeDto(DateRangeEnum.ONE_MONTH, "1 Month"), new DateRangeDto(DateRangeEnum.ALL, "All"));
        log.info("Found " + dateRanges.size() + " Date Ranges.");
        return dateRanges;
    }


    @Override
    public List<ValueSetDto> getUspsStates() {
        List<ValueSetDto> stateCodes = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.US_STATE.getUrlPath(), LookupPathUrls.US_STATE.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.US_STATE.getType())) {

            List<ValueSet.ConceptReferenceComponent> statesList = response.getCompose().getInclude().get(0).getConcept();
            String codingSystemUrl = ""; // TODO: Set appropriate coding system
            stateCodes = statesList.stream().map(s -> LookUpUtil.convertConceptReferenceToValueSetDto(s, codingSystemUrl)).collect(toList());
        }
        LookUpUtil.sortValueSets(stateCodes);
        log.info("Found " + stateCodes.size() + " USPS states.");
        return stateCodes;
    }

    @Override
    public List<ValueSetDto> getIdentifierTypes(Optional<String> resourceType) {
        List<ValueSetDto> identifierTypes = new ArrayList<>();
        List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = new ArrayList<>();

        final List<String> allowedLocationIdentifierTypes = Arrays.asList("EN", "TAX", "NIIP", "PRN");
        final List<String> allowedOrganizationIdentifierTypes = Arrays.asList("EN", "TAX", "NIIP", "PRN");
        final List<String> allowedPatientIdentifierTypes = Arrays.asList("DL", "PPN", "TAX", "MR", "DR", "SB");
        final List<String> allowedPractitionerIdentifierTypes = Arrays.asList("PRN", "TAX", "MD", "SB");

        ValueSet response = getValueSets(LookupPathUrls.IDENTIFIER_TYPE.getUrlPath(), LookupPathUrls.IDENTIFIER_TYPE.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.IDENTIFIER_TYPE.getType())) {
            valueSetList = response.getExpansion().getContains();
        }

        if (resourceType.isPresent() && (resourceType.get().trim().equalsIgnoreCase(Enumerations.ResourceType.LOCATION.name()))) {
            log.info("Fetching IdentifierTypes for resource = " + resourceType.get().trim());
            for (ValueSet.ValueSetExpansionContainsComponent type : valueSetList) {
                if (allowedLocationIdentifierTypes.contains(type.getCode().toUpperCase())) {
                    identifierTypes.add(LookUpUtil.convertExpansionComponentToValueSetDto(type));
                }
            }
        } else if (resourceType.isPresent() && (resourceType.get().trim().equalsIgnoreCase(Enumerations.ResourceType.ORGANIZATION.name()))) {
            log.info("Fetching IdentifierTypes for resource = " + resourceType.get().trim());
            for (ValueSet.ValueSetExpansionContainsComponent type : valueSetList) {
                if (allowedOrganizationIdentifierTypes.contains(type.getCode().toUpperCase())) {
                    identifierTypes.add(LookUpUtil.convertExpansionComponentToValueSetDto(type));
                }
            }
        } else if (resourceType.isPresent() && (resourceType.get().trim().equalsIgnoreCase(Enumerations.ResourceType.PATIENT.name()))) {
            log.info("Fetching IdentifierTypes for resource = " + resourceType.get().trim());
            for (ValueSet.ValueSetExpansionContainsComponent type : valueSetList) {
                if (allowedPatientIdentifierTypes.contains(type.getCode().toUpperCase())) {
                    identifierTypes.add(LookUpUtil.convertExpansionComponentToValueSetDto(type));
                }
            }
        } else if (resourceType.isPresent() && (resourceType.get().trim().equalsIgnoreCase(Enumerations.ResourceType.PRACTITIONER.name()))) {
            log.info("Fetching IdentifierTypes for resource = " + resourceType.get().trim());
            for (ValueSet.ValueSetExpansionContainsComponent type : valueSetList) {
                if (allowedPractitionerIdentifierTypes.contains(type.getCode().toUpperCase())) {
                    identifierTypes.add(LookUpUtil.convertExpansionComponentToValueSetDto(type));
                }
            }
        } else {
            log.info("Fetching ALL IdentifierTypes");
            identifierTypes = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(identifierTypes);
        log.info("Found " + identifierTypes.size() + " identifier types.");
        return identifierTypes;
    }

    @Override
    public List<IdentifierSystemDto> getIdentifierSystems(Optional<List<String>> identifierTypeList) {
        // No FHIR-API or ENUMS available. Creating our own ENUMS instead
        List<IdentifierSystemDto> identifierSystemList = new ArrayList<>();
        List<KnownIdentifierSystemEnum> identifierSystemsByIdentifierTypeEnum = new ArrayList<>();

        if (!identifierTypeList.isPresent() || identifierTypeList.get().size() == 0) {
            log.info("Fetching ALL IdentifierSystems");
            identifierSystemsByIdentifierTypeEnum = Arrays.asList(KnownIdentifierSystemEnum.values());
        } else {
            log.info("Fetching IdentifierSystems for identifierType(s): ");
            identifierTypeList.get().forEach(log::info);

            for (String tempIdentifierType : identifierTypeList.get()) {
                List<KnownIdentifierSystemEnum> tempList = KnownIdentifierSystemEnum.identifierSystemsByIdentifierTypeEnum(IdentifierTypeEnum.valueOf(tempIdentifierType.toUpperCase()));
                identifierSystemsByIdentifierTypeEnum.addAll(tempList);
            }
        }

        if (identifierSystemsByIdentifierTypeEnum.size() < 1) {
            log.error("No Identifier Systems found");
            throw new ResourceNotFoundException("Query was successful, but found no identifier systems found in the configured FHIR server");
        }
        identifierSystemsByIdentifierTypeEnum.forEach(system -> {
            IdentifierSystemDto temp = new IdentifierSystemDto();
            temp.setDisplay(system.getDisplay());
            temp.setOid(system.getOid());
            temp.setUri(system.getUri());
            identifierSystemList.add(temp);
        });
        //TODO: Sort
        log.info("Found " + identifierSystemList.size() + " identifier systems.");
        return identifierSystemList;
    }

    @Override
    public List<ValueSetDto> getIdentifierUses() {
        List<ValueSetDto> identifierUses = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.IDENTIFIER_USE.getUrlPath(), LookupPathUrls.IDENTIFIER_USE.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.IDENTIFIER_USE.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            identifierUses = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(identifierUses);
        log.info("Found " + identifierUses.size() + " identifier uses.");
        return identifierUses;
    }

    @Override
    public List<ValueSetDto> getLocationModes() {
        List<ValueSetDto> locationModes = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.LOCATION_MODE.getUrlPath(), LookupPathUrls.LOCATION_MODE.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.LOCATION_MODE.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            locationModes = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(locationModes);
        log.info("Found " + locationModes.size() + " location modes.");
        return locationModes;
    }

    @Override
    public List<ValueSetDto> getLocationStatuses() {
        List<ValueSetDto> locationStatuses = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.LOCATION_STATUS.getUrlPath(), LookupPathUrls.LOCATION_STATUS.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.LOCATION_STATUS.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            locationStatuses = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(locationStatuses);
        log.info("Found " + locationStatuses.size() + " location statuses.");
        return locationStatuses;
    }

    @Override
    public List<StatusBooleanValuesDto> getOrganizationStatuses() {
        List<StatusBooleanValuesDto> organizationStatuses = Arrays.asList(new StatusBooleanValuesDto(true, "Active"), new StatusBooleanValuesDto(false, "Inactive"));
        log.info("Found " + organizationStatuses.size() + " organization statuses.");
        return organizationStatuses;
    }

    @Override
    public List<ValueSetDto> getLocationPhysicalTypes() {
        List<ValueSetDto> physicalLocationTypes = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.LOCATION_PHYSICAL_TYPE.getUrlPath(), LookupPathUrls.LOCATION_PHYSICAL_TYPE.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.LOCATION_PHYSICAL_TYPE.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            physicalLocationTypes = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(physicalLocationTypes);
        log.info("Found " + physicalLocationTypes.size() + " physical location types.");
        return physicalLocationTypes;

    }

    @Override
    public List<ValueSetDto> getAddressTypes() {
        List<ValueSetDto> addressTypes = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.ADDRESS_TYPE.getUrlPath(), LookupPathUrls.ADDRESS_TYPE.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.ADDRESS_TYPE.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            addressTypes = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(addressTypes);
        log.info("Found " + addressTypes.size() + " address types.");
        return addressTypes;
    }

    @Override
    public List<ValueSetDto> getAddressUses() {
        List<ValueSetDto> addressUses = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.ADDRESS_USE.getUrlPath(), LookupPathUrls.ADDRESS_USE.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.ADDRESS_USE.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            addressUses = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(addressUses);
        log.info("Found " + addressUses.size() + " address uses.");
        return addressUses;
    }

    @Override
    public List<ValueSetDto> getTelecomUses() {
        List<ValueSetDto> telecomUses = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.TELECOM_USE.getUrlPath(), LookupPathUrls.TELECOM_USE.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.TELECOM_USE.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            telecomUses = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        //Temporary remove other use for mint integration
        // telecomUses.removeIf(g -> !(g.getCode().equalsIgnoreCase("home") || g.getCode().equalsIgnoreCase("work")));
        LookUpUtil.sortValueSets(telecomUses);
        log.info("Found " + telecomUses.size() + " telecom uses.");
        return telecomUses;
    }

    @Override
    public List<ValueSetDto> getTelecomSystems() {
        List<ValueSetDto> telecomSystems = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.TELECOM_SYSTEM.getUrlPath(), LookupPathUrls.TELECOM_SYSTEM.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.TELECOM_SYSTEM.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            telecomSystems = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(telecomSystems);
        log.info("Found " + telecomSystems.size() + " telecom systems.");
        return telecomSystems;
    }

    @Override
    public List<ValueSetDto> getPractitionerRoles() {
        List<ValueSetDto> practitionerRoles = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.PRACTITIONER_ROLE.getUrlPath(), LookupPathUrls.PRACTITIONER_ROLE.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.PRACTITIONER_ROLE.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            practitionerRoles = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(practitionerRoles);
        log.info("Found " + practitionerRoles.size() + " practitioner roles.");
        return practitionerRoles;
    }

    @Override
    public List<ValueSetDto> getAdministrativeGenders() {
        List<Enumerations.AdministrativeGender> administrativeGenderEnums = Arrays.asList(Enumerations.AdministrativeGender.values());

        List<ValueSetDto> administrativeGenders = administrativeGenderEnums.stream().map(gender -> {
            ValueSetDto temp = new ValueSetDto();
            temp.setDefinition(gender.getDefinition());
            temp.setDisplay(gender.getDisplay());
            temp.setSystem(gender.getSystem());
            temp.setCode(gender.toCode());
            return temp;
        }).collect(toList());
        administrativeGenders.removeIf(g -> (g.getCode() == null || g.getCode().equalsIgnoreCase("?")));
        LookUpUtil.sortValueSets(administrativeGenders);
        log.info("Found " + administrativeGenders.size() + " administrative genders.");
        return administrativeGenders;
    }

    @Override
    public List<ValueSetDto> getUSCoreRace() {
        List<ValueSetDto> usCoreRaces = new ArrayList<>();
        ValueSet response = null;
        String url = fisProperties.getFhir().getServerUrl() + "/ValueSet/$expand?url=http://hl7.org/fhir/us/core/ValueSet/omb-race-category";

        try {
            response = (ValueSet) fhirClient.search().byUrl(url).execute();
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            usCoreRaces = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        } catch (Exception e) {
            log.debug("Query was unsuccessful - Could not find any omb-race-category", e.getMessage());
        }

        if (response == null) {
            url = fisProperties.getFhir().getServerUrl() + "/ValueSet/omb-race-category";
            try {
                response = (ValueSet) fhirClient.search().byUrl(url).execute();
                List<ValueSet.ConceptSetComponent> valueSetList = response.getCompose().getInclude();
                String codingSystemUrl = CodeSystemEnum.RACE.getUrl();
                usCoreRaces = valueSetList.stream().flatMap(obj -> obj.getConcept().stream()).map(s -> LookUpUtil.convertConceptReferenceToValueSetDto(s, codingSystemUrl)).collect(toList());
            } catch (ResourceNotFoundException e) {
                log.error("Query was unsuccessful - Could not find any omb-race-category", e.getMessage());
                throw new ResourceNotFoundException("Query was unsuccessful - Could not find any omb-race-category", e);
            }
        }
        LookUpUtil.sortValueSets(usCoreRaces);
        log.info("Found " + usCoreRaces.size() + " US Core races.");
        return usCoreRaces;
    }

    @Override
    public List<ValueSetDto> getUSCoreEthnicity() {
        List<ValueSetDto> usCoreEthnicities = new ArrayList<>();
        ValueSet response = null;
        String url = fisProperties.getFhir().getServerUrl() + "/ValueSet/$expand?url=http://hl7.org/fhir/us/core/ValueSet/omb-ethnicity-category";

        try {
            response = (ValueSet) fhirClient.search().byUrl(url).execute();
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            usCoreEthnicities = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        } catch (Exception e) {
            log.debug("Query was unsuccessful - Could not find any omb-ethnicity-category", e.getMessage());
        }

        if (response == null) {
            url = fisProperties.getFhir().getServerUrl() + "/ValueSet/omb-ethnicity-category";
            try {
                response = (ValueSet) fhirClient.search().byUrl(url).execute();
                List<ValueSet.ConceptSetComponent> valueSetList = response.getCompose().getInclude();
                String codingSystemUrl = CodeSystemEnum.ETHNICITY.getUrl();
                usCoreEthnicities = valueSetList.stream().flatMap(obj -> obj.getConcept().stream()).map(s -> LookUpUtil.convertConceptReferenceToValueSetDto(s, codingSystemUrl)).collect(toList());
            } catch (ResourceNotFoundException e) {
                log.error("Query was unsuccessful - Could not find any omb-ethnicity-category", e.getMessage());
                throw new ResourceNotFoundException("Query was unsuccessful - Could not find any omb-ethnicity-category", e);
            }
        }
        LookUpUtil.sortValueSets(usCoreEthnicities);
        log.info("Found " + usCoreEthnicities.size() + " US Core ethnicities.");
        return usCoreEthnicities;

    }

    @Override
    public List<ValueSetDto> getUSCoreBirthSex() {
        List<ValueSetDto> birthSexList;
        ValueSet response = getValueSets(LookupPathUrls.BIRTH_SEX.getUrlPath(), LookupPathUrls.BIRTH_SEX.getType());
        List<ValueSet.ConceptSetComponent> valueSetList = response.getCompose().getInclude();
        String codingSystemUrl = CodeSystemEnum.ADMINISTRATIVE_GENDER.getUrl();
        birthSexList = valueSetList.stream().flatMap(obj -> obj.getConcept().stream()).map(s -> LookUpUtil.convertConceptReferenceToValueSetDto(s, codingSystemUrl)).collect(toList());
        log.info("Found " + birthSexList.size() + " birth sex.");
        LookUpUtil.sortValueSets(birthSexList);
        return birthSexList;

    }

    @Override
    public List<ValueSetDto> getLanguages() {
        List<ValueSetDto> languageList;
        ValueSet response = getValueSets(LookupPathUrls.SIMPLE_LANGUAGE.getUrlPath(), LookupPathUrls.SIMPLE_LANGUAGE.getType());
        List<ValueSet.ConceptSetComponent> valueSetList = response.getCompose().getInclude();
        String codingSystemUrl = CodeSystemEnum.LANGUAGE.getUrl();
        languageList = valueSetList.stream().flatMap(obj -> obj.getConcept().stream()).map(s -> LookUpUtil.convertConceptReferenceToValueSetDto(s, codingSystemUrl)).collect(toList());
        log.info("Found " + languageList.size() + " languages.");
        LookUpUtil.sortValueSets(languageList);
        return languageList;
    }

    @Override
    public List<ValueSetDto> getHealthcareServiceTypes() {
        List<ValueSetDto> healthcareServiceTypeCodes = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.HEALTHCARE_SERVICE_TYPE.getUrlPath(), LookupPathUrls.HEALTHCARE_SERVICE_TYPE.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.HEALTHCARE_SERVICE_TYPE.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> healthcareServiceTypeList = response.getExpansion().getContains();
            healthcareServiceTypeCodes = healthcareServiceTypeList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        log.info("Found " + healthcareServiceTypeCodes.size() + " healthcare service types.");
        LookUpUtil.sortValueSets(healthcareServiceTypeCodes);
        return displayPatientAsClient(healthcareServiceTypeCodes);
    }

    @Override
    public List<ValueSetDto> getHealthcareServiceCategories() {
        List<ValueSetDto> healthcareServiceCategoryCodes = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.HEALTHCARE_SERVICE_CATEGORY.getUrlPath(), LookupPathUrls.HEALTHCARE_SERVICE_CATEGORY.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.HEALTHCARE_SERVICE_CATEGORY.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> healthcareServiceCategoryList = response.getExpansion().getContains();
            healthcareServiceCategoryCodes = healthcareServiceCategoryList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        log.info("Found " + healthcareServiceCategoryCodes.size() + " healthcare service categories.");
        LookUpUtil.sortValueSets(healthcareServiceCategoryCodes);
        return healthcareServiceCategoryCodes;
    }

    @Override
    public List<ValueSetDto> getHealthcareServiceSpecialities() {
        List<ValueSetDto> healthcareServiceSpecialitiesCodes = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.HEALTHCARE_SERVICE_SPECIALITY_2.getUrlPath(), LookupPathUrls.HEALTHCARE_SERVICE_SPECIALITY_2.getType());

        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.HEALTHCARE_SERVICE_SPECIALITY_2.getType())) {
            List<ValueSet.ConceptSetComponent> valueSetList = response.getCompose().getInclude();
            for (ValueSet.ConceptSetComponent conceptComponent : valueSetList) {
                String codingSystemUrl = conceptComponent.getSystem();
                List<ValueSet.ConceptReferenceComponent> conceptCodesList = conceptComponent.getConcept();
                List<ValueSetDto> conceptCodeValueSetList = conceptCodesList.stream().map(c -> LookUpUtil.convertConceptReferenceToValueSetDto(c, codingSystemUrl)).collect(toList());
                healthcareServiceSpecialitiesCodes.addAll(conceptCodeValueSetList);
            }
        }
        LookUpUtil.sortValueSets(healthcareServiceSpecialitiesCodes);
        log.info("Found " + healthcareServiceSpecialitiesCodes.size() + " healthcare service specialities.");
        return healthcareServiceSpecialitiesCodes;
    }

    @Override
    public List<StatusBooleanValuesDto> getHealthcareServiceStatuses() {
        List<StatusBooleanValuesDto> healthcareServiceStatuses = Arrays.asList(new StatusBooleanValuesDto(true, "Active"), new StatusBooleanValuesDto(false, "Inactive"));
        log.info("Found " + healthcareServiceStatuses.size() + " healthcare service statuses.");
        //TODO: Sort
        return healthcareServiceStatuses;
    }


    @Override
    public List<ValueSetDto> getHealthcareServiceReferralMethods() {
        List<ValueSetDto> healthcareServiceReferralMethodCodes = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.HEALTHCARE_SERVICE_REFERRAL_METHOD.getUrlPath(), LookupPathUrls.HEALTHCARE_SERVICE_REFERRAL_METHOD.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.HEALTHCARE_SERVICE_REFERRAL_METHOD.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> healthcareServiceCategoryList = response.getExpansion().getContains();
            healthcareServiceReferralMethodCodes = healthcareServiceCategoryList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        log.info("Found " + healthcareServiceReferralMethodCodes.size() + " healthcare service referral methods.");
        LookUpUtil.sortValueSets(healthcareServiceReferralMethodCodes);
        return healthcareServiceReferralMethodCodes;
    }

    @Override
    public List<ValueSetDto> getCareTeamCategories() {
        List<ValueSetDto> careTeamCategory;
        ValueSet response = getValueSets(LookupPathUrls.CARE_TEAM_CATEGORY.getUrlPath(), LookupPathUrls.CARE_TEAM_CATEGORY.getType());
        List<ValueSet.ConceptSetComponent> valueSetList = response.getCompose().getInclude();
        String codingSystemUrl = CodeSystemEnum.CARETEAM_CATEGORY.getUrl();
        careTeamCategory = valueSetList.stream().flatMap(obj -> obj.getConcept().stream()).map(s -> LookUpUtil.convertConceptReferenceToValueSetDto(s, codingSystemUrl)).collect(toList());
        log.info("Found " + careTeamCategory.size() + " care team categories.");
        LookUpUtil.sortValueSets(careTeamCategory);
        return careTeamCategory;
    }

    @Override
    public List<ValueSetDto> getCareTeamStatuses() {
        List<ValueSetDto> careTeamStatusList;
        ValueSet response = getValueSets(LookupPathUrls.CARE_TEAM_STATUS.getUrlPath(), LookupPathUrls.CARE_TEAM_STATUS.getType());
        List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
        careTeamStatusList = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        log.info("Found " + careTeamStatusList.size() + " care team statuses.");
        return careTeamStatusList;
    }

    @Override
    public List<ValueSetDto> getParticipantTypes() {
        List<ValueSetDto> participantTypeList;
        final List<String> allowedCareTeamParticipantType = Arrays.asList("practitioner", "relatedPerson", "patient", "organization");
        List<ParticipantTypeEnum> allParticipantTypeEnums = Arrays.asList(ParticipantTypeEnum.values());
        List<ParticipantTypeEnum> participantTypeEnums = allParticipantTypeEnums.stream().filter(p -> allowedCareTeamParticipantType.contains(p.getCode())).collect(toList());

        participantTypeList = participantTypeEnums.stream().map(object -> {
            ValueSetDto temp = new ValueSetDto();
            temp.setCode(object.getCode());
            temp.setDisplay(object.getName());
            return temp;
        }).collect(toList());
        log.info("Found " + participantTypeList.size() + " care team participant types.");
        LookUpUtil.sortValueSets(participantTypeList);
        return displayPatientAsClient(participantTypeList);
    }

    @Override
    public List<ValueSetDto> getParticipantRoles() {
        //CareTeam Participant Role
        List<ValueSetDto> participantRolesList;
        ValueSet response = getValueSets(LookupPathUrls.PARTICIPANT_ROLE.getUrlPath(), LookupPathUrls.PARTICIPANT_ROLE.getType());
        List<ValueSet.ConceptSetComponent> valueSetList = response.getCompose().getInclude();
        String codingSystemUrl = CodeSystemEnum.CARETEAM_PARTICIPANT.getUrl();
        participantRolesList = valueSetList.stream().flatMap(obj -> obj.getConcept().stream()).map(s -> LookUpUtil.convertConceptReferenceToValueSetDto(s, codingSystemUrl)).collect(toList());
        log.info("Found " + participantRolesList.size() + " care team participant roles.");
        LookUpUtil.sortValueSets(participantRolesList);
        return participantRolesList;
    }

    @Override
    public List<ValueSetDto> getCareTeamReasons() {
        List<ValueSetDto> reasonCodes;
        ValueSet response = getValueSets(LookupPathUrls.CARE_TEAM_REASON_CODE.getUrlPath(), LookupPathUrls.CARE_TEAM_REASON_CODE.getType());
        List<ValueSet.ConceptSetComponent> valueSetList = response.getCompose().getInclude();
        String codingSystemUrl = CodeSystemEnum.CARETEAM_REASON.getUrl();
        reasonCodes = valueSetList.stream().flatMap(obj -> obj.getConcept().stream()).map(s -> LookUpUtil.convertConceptReferenceToValueSetDto(s, codingSystemUrl)).collect(toList());
        log.info("Found " + reasonCodes.size() + " care team reason codes.");
        LookUpUtil.sortValueSets(reasonCodes);
        return reasonCodes;
    }

    @Override
    public List<ValueSetDto> getRelatedPersonPatientRelationshipTypes() {
        List<ValueSetDto> relationshipTypesList = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.RELATED_PERSON_PATIENT_RELATIONSHIPTYPES.getUrlPath(), LookupPathUrls.RELATED_PERSON_PATIENT_RELATIONSHIPTYPES.getType());
        List<ValueSet.ConceptSetComponent> valueSetList = response.getCompose().getInclude();
        for (ValueSet.ConceptSetComponent conceptComponent : valueSetList) {
            String codingSystemUrl = conceptComponent.getSystem();
            List<ValueSet.ConceptReferenceComponent> conceptCodesList = conceptComponent.getConcept();
            List<ValueSetDto> conceptCodeValueSetList = conceptCodesList.stream().map(c -> LookUpUtil.convertConceptReferenceToValueSetDto(c, codingSystemUrl)).collect(toList());
            relationshipTypesList.addAll(conceptCodeValueSetList);
        }

        LookUpUtil.sortValueSets(relationshipTypesList);
        log.info("Found " + relationshipTypesList.size() + " relationship types.");
        return relationshipTypesList;
    }

    @Override
    public List<ValueSetDto> getTaskStatus() {
        List<ValueSetDto> taskStatusList = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.TASK_STATUS.getUrlPath(), LookupPathUrls.TASK_STATUS.getType());
        List<ValueSet.ConceptSetComponent> valueSetList = response.getCompose().getInclude();
        for (ValueSet.ConceptSetComponent conceptComponent : valueSetList) {
            String codingSystemUrl = conceptComponent.getSystem();
            List<ValueSet.ConceptReferenceComponent> conceptCodesList = conceptComponent.getConcept();
            List<ValueSetDto> conceptCodeValueSetList = conceptCodesList.stream().map(c -> LookUpUtil.convertConceptReferenceToValueSetDto(c, codingSystemUrl)).collect(toList());
            taskStatusList.addAll(conceptCodeValueSetList);
        }

        LookUpUtil.sortValueSets(taskStatusList);
        log.info("Found " + taskStatusList.size() + " task statuses.");
        return taskStatusList;
    }


    @Override
    public List<ValueSetDto> getRequestPriority() {
        List<ValueSetDto> requestPriority;
        ValueSet response = getValueSets(LookupPathUrls.REQUEST_PRIORITY.getUrlPath(), LookupPathUrls.REQUEST_PRIORITY.getType());
        List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
        requestPriority = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        log.info("Found " + requestPriority.size() + " request priorities.");
        LookUpUtil.sortValueSets(requestPriority);
        return requestPriority;
    }

    @Override
    public List<ValueSetDto> getTaskPerformerType() {
        List<ValueSetDto> taskPerformerTypeList = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.TASK_PERFORMER_TYPE.getUrlPath(), LookupPathUrls.TASK_PERFORMER_TYPE.getType());
        List<ValueSet.ConceptSetComponent> valueSetList = response.getCompose().getInclude();
        for (ValueSet.ConceptSetComponent conceptComponent : valueSetList) {
            String codingSystemUrl = conceptComponent.getSystem();
            List<ValueSet.ConceptReferenceComponent> conceptCodesList = conceptComponent.getConcept();
            List<ValueSetDto> conceptCodeValueSetList = conceptCodesList.stream().map(c -> LookUpUtil.convertConceptReferenceToValueSetDto(c, codingSystemUrl)).collect(toList());
            taskPerformerTypeList.addAll(conceptCodeValueSetList);
        }

        LookUpUtil.sortValueSets(taskPerformerTypeList);
        log.info("Found " + taskPerformerTypeList.size() + " task performer types.");
        return taskPerformerTypeList;
    }

    @Override
    public List<ValueSetDto> getRequestIntent() {
        List<ValueSetDto> requestIntent;
        ValueSet response = getValueSets(LookupPathUrls.REQUEST_INTENT.getUrlPath(), LookupPathUrls.REQUEST_INTENT.getType());
        List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
        requestIntent = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        log.info("Found " + requestIntent.size() + " request intents.");
        LookUpUtil.sortValueSets(requestIntent);
        return requestIntent;
    }


    @Override
    public List<ValueSetDto> getPublicationStatus() {
        List<ValueSetDto> publicationStatuses = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.PUBLICATION_STATUS.getUrlPath(), LookupPathUrls.PUBLICATION_STATUS.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.PUBLICATION_STATUS.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            publicationStatuses = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        log.info("Found " + publicationStatuses.size() + " publication Statuses.");
        LookUpUtil.sortValueSets(publicationStatuses);
        return publicationStatuses;
    }

    @Override
    public List<ValueSetDto> getDefinitionTopic() {
        List<ValueSetDto> definitionTopics = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.DEFINITION_TOPIC.getUrlPath(), LookupPathUrls.DEFINITION_TOPIC.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.DEFINITION_TOPIC.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            definitionTopics = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        log.info("Found " + definitionTopics.size() + " definition topics.");
        LookUpUtil.sortValueSets(definitionTopics);
        return definitionTopics;
    }

    @Override
    public List<ValueSetDto> getResourceType() {
        List<ValueSetDto> resourceTypes = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.RESOURCE_TYPE.getUrlPath(), LookupPathUrls.RESOURCE_TYPE.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.RESOURCE_TYPE.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            resourceTypes = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(resourceTypes);
        log.info("Found " + resourceTypes.size() + " resource types.");
        return displayPatientAsClient(resourceTypes);
    }

    @Override
    public List<ValueSetDto> getActionParticipantRole() {
        List<ValueSetDto> resourceTypes = new ArrayList<>();
        ValueSet practitionerRoleResponse = getValueSets(LookupPathUrls.PRACTITIONER_ROLE.getUrlPath(), LookupPathUrls.PRACTITIONER_ROLE.getType());
        if (LookUpUtil.isValueSetAvailableInServer(practitionerRoleResponse, LookupPathUrls.PRACTITIONER_ROLE.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = practitionerRoleResponse.getExpansion().getContains();
            resourceTypes = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }

        List<ValueSetDto> relatedPersonRelatedTypesList = new ArrayList<>();
        ValueSet relatedPersonRelationshipTypeResponse = getValueSets(LookupPathUrls.RELATED_PERSON_PATIENT_RELATIONSHIPTYPES.getUrlPath(), LookupPathUrls.RELATED_PERSON_PATIENT_RELATIONSHIPTYPES.getType());
        List<ValueSet.ConceptSetComponent> valueSetList = relatedPersonRelationshipTypeResponse.getCompose().getInclude();
        for (ValueSet.ConceptSetComponent conceptComponent : valueSetList) {
            String codingSystemUrl = CodeSystemEnum.RELATED_PERSON_PATIENT_RELATIONSHIP_PATH_1.getUrl();
            String codingSystemUrl2 = CodeSystemEnum.RELATED_PERSON_PATIENT_RELATIONSHIP_PATH_2.getUrl();
            List<ValueSet.ConceptReferenceComponent> conceptCodesList = conceptComponent.getConcept();
            //List<ValueSetDto> relatedPersonRelatedTypes1List = conceptCodesList.stream().map(c -> LookUpUtil.convertConceptReferenceToValueSetDto(c, codingSystemUrl)).collect(toList());
            if (conceptComponent.getSystem().equalsIgnoreCase(codingSystemUrl)
                    || conceptComponent.getSystem().equalsIgnoreCase(codingSystemUrl2)) {
                resourceTypes.addAll(conceptCodesList.stream().map(s -> LookUpUtil.convertConceptReferenceToValueSetDto(s, conceptComponent.getSystem())).collect(toList()));
            }
        }
        LookUpUtil.sortValueSets(resourceTypes);
        log.info("Found " + resourceTypes.size() + " action participation roles.");
        return resourceTypes;
    }

    @Override
    public List<ValueSetDto> getActionParticipantType() {
        List<ValueSetDto> actionParticipantTypes = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.ACTION_PARTICIPATION_TYPE.getUrlPath(), LookupPathUrls.ACTION_PARTICIPATION_TYPE.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.ACTION_PARTICIPATION_TYPE.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            actionParticipantTypes = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(actionParticipantTypes);
        log.info("Found " + actionParticipantTypes.size() + " action participation types.");
        return displayPatientAsClient(actionParticipantTypes);
    }

    @Override
    public List<ValueSetDto> getActivityDefinitionRelatedArtifactTypes() {
        List<ValueSetDto> relatedArtifactTypes = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.ACTIVITY_DEFINITION_RELATED_ARTIFACT_TYPES.getUrlPath(), LookupPathUrls.ACTIVITY_DEFINITION_RELATED_ARTIFACT_TYPES.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.ACTIVITY_DEFINITION_RELATED_ARTIFACT_TYPES.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            relatedArtifactTypes = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(relatedArtifactTypes);
        log.info("Found " + relatedArtifactTypes.size() + " activity definition related-artifact-types.");
        return relatedArtifactTypes;
    }

    @Override
    public List<ValueSetDto> getCommunicationStatus() {
        List<ValueSetDto> communicationStatuses = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.COMMUNICATION_STATUS.getUrlPath(), LookupPathUrls.COMMUNICATION_STATUS.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.COMMUNICATION_STATUS.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            communicationStatuses = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(communicationStatuses);
        log.info("Found " + communicationStatuses.size() + " communication event statuses.");
        return communicationStatuses;
    }

    @Override
    public List<ValueSetDto> getCommunicationCategory() {
        List<ValueSetDto> communicationCategoryList = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.COMMUNICATION_CATEGORY.getUrlPath(), LookupPathUrls.COMMUNICATION_CATEGORY.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.COMMUNICATION_CATEGORY.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            communicationCategoryList = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(communicationCategoryList);
        log.info("Found " + communicationCategoryList.size() + " communication categories.");
        return communicationCategoryList;
    }

    @Override
    public List<ValueSetDto> getCommunicationNotDoneReason() {
        List<ValueSetDto> resourceTypes = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.COMMUNICATION_NOT_DONE_REASON.getUrlPath(), LookupPathUrls.COMMUNICATION_NOT_DONE_REASON.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.COMMUNICATION_NOT_DONE_REASON.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            resourceTypes = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        log.info("Found " + resourceTypes.size() + " communication not done reasons.");
        return resourceTypes;
    }

    @Override
    public List<ValueSetDto> getCommunicationMedium() {
        List<ValueSetDto> communicationMedium = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.COMMUNICATION_MEDIUM.getUrlPath(), LookupPathUrls.COMMUNICATION_MEDIUM.getType());
        log.info("Searching lookup communication codes");
//        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.COMMUNICATION_MEDIUM.getType())) {
//
//        }
        List<ValueSet.ConceptReferenceComponent> conceptReferenceComponents = response.getCompose().getInclude().get(0).getConcept();
        communicationMedium = conceptReferenceComponents.stream().map(a -> {
            ValueSetDto valueSetDto = new ValueSetDto();
            valueSetDto.setCode(a.getCode());
            valueSetDto.setDisplay(a.getCode());
            return valueSetDto;
        }).collect(toList());
        LookUpUtil.sortValueSets(communicationMedium);
        log.info("Found " + communicationMedium.size() + " communication medium.");
        return communicationMedium;
    }

    @Override
    public List<ValueSetDto> getAppointmentStatus() {
        List<ValueSetDto> appointmentStatusList = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.APPOINTMENT_STATUS.getUrlPath(), LookupPathUrls.APPOINTMENT_STATUS.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.APPOINTMENT_STATUS.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            appointmentStatusList = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(appointmentStatusList);
        log.info("Found " + appointmentStatusList.size() + " appointment statuses.");
        return appointmentStatusList;
    }

    @Override
    public List<ValueSetDto> getAppointmentType() {
        List<ValueSetDto> appointmentTypeList = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.APPOINTMENT_TYPE.getUrlPath(), LookupPathUrls.APPOINTMENT_TYPE.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.APPOINTMENT_TYPE.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            appointmentTypeList = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(appointmentTypeList);
        log.info("Found " + appointmentTypeList.size() + " appointment types.");
        return appointmentTypeList;
    }

    @Override
    public List<ValueSetDto> getAppointmentParticipationStatus() {
        List<ValueSetDto> participationStatusList = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.PARTICIPATION_STATUS.getUrlPath(), LookupPathUrls.PARTICIPATION_STATUS.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.PARTICIPATION_STATUS.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            participationStatusList = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(participationStatusList);
        log.info("Found " + participationStatusList.size() + " appointment participation statuses.");
        return participationStatusList;
    }

    @Override
    public List<ValueSetDto> getAppointmentParticipantType() {
        List<ValueSetDto> appointmentParticipantTypeList;
        final List<String> allowedAppointmentParticipantType = Arrays.asList("practitioner", "relatedPerson", "patient", "location", "healthcareService");
        List<ParticipantTypeEnum> allParticipantTypeEnums = Arrays.asList(ParticipantTypeEnum.values());
        List<ParticipantTypeEnum> participantTypeEnums = allParticipantTypeEnums.stream().filter(p -> allowedAppointmentParticipantType.contains(p.getCode())).collect(toList());

        appointmentParticipantTypeList = participantTypeEnums.stream().map(object -> {
            ValueSetDto temp = new ValueSetDto();
            temp.setCode(object.getCode());
            temp.setDisplay(object.getName());
            return temp;
        }).collect(toList());

        LookUpUtil.sortValueSets(appointmentParticipantTypeList);
        log.info("Found " + appointmentParticipantTypeList.size() + " appointment participant types.");
        return appointmentParticipantTypeList;
    }

    @Override
    public List<ValueSetDto> getAppointmentParticipationType() {
        List<ValueSetDto> participationTypeList = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.PARTICIPATION_TYPE.getUrlPath(), LookupPathUrls.PARTICIPATION_TYPE.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.PARTICIPATION_TYPE.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            participationTypeList = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }

        LookUpUtil.sortValueSets(participationTypeList);
        log.info("Found " + participationTypeList.size() + " appointment participation types.");
        return participationTypeList;
    }

    @Override
    public List<ValueSetDto> getAppointmentParticipantRequired() {
        List<ValueSetDto> participantRequiredList = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.PARTICIPANT_REQUIRED.getUrlPath(), LookupPathUrls.PARTICIPANT_REQUIRED.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.PARTICIPANT_REQUIRED.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            participantRequiredList = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }

        LookUpUtil.sortValueSets(participantRequiredList);
        log.info("Found " + participantRequiredList.size() + " appointment participant required.");
        return participantRequiredList;
    }

    @Override
    public List<ValueSetDto> getProviderRole() {
        List<ValueSetDto> providerRoleList;
        ValueSet response = getValueSets(LookupPathUrls.PROVIDER_ROLE.getUrlPath(), LookupPathUrls.PROVIDER_ROLE.getType());
        List<ValueSet.ConceptReferenceComponent> valueSetList = response.getCompose().getInclude().get(0).getConcept();
        String codingSystemUrl = CodeSystemEnum.PROVIDER_ROLE.getUrl();
        providerRoleList = valueSetList.stream().map(s -> LookUpUtil.convertConceptReferenceToValueSetDto(s, codingSystemUrl)).collect(toList());

        LookUpUtil.sortValueSets(providerRoleList);
        log.info("Found " + providerRoleList.size() + " provider role.");
        return providerRoleList;
    }

    @Override
    public List<ValueSetDto> getProviderSpecialty() {
        List<ValueSetDto> providerSpecialtyList;
        ValueSet response = getValueSets(LookupPathUrls.PROVIDER_SPECIALTY.getUrlPath(), LookupPathUrls.PROVIDER_SPECIALTY.getType());
        List<ValueSet.ConceptReferenceComponent> valueSetList = response.getCompose().getInclude().get(0).getConcept();
        String codingSystemUrl = CodeSystemEnum.PROVIDER_SPECIALTY.getUrl();
        providerSpecialtyList = valueSetList.stream().map(s -> LookUpUtil.convertConceptReferenceToValueSetDto(s, codingSystemUrl)).collect(toList());

        LookUpUtil.sortValueSets(providerSpecialtyList);
        log.info("Found " + providerSpecialtyList.size() + " provider specialty.");
        return providerSpecialtyList;
    }

    @Override
    public List<ValueSetDto> getFlagStatus() {
        List<ValueSetDto> flagStatusList = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.FLAG_STATUS.getUrlPath(), LookupPathUrls.FLAG_STATUS.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.FLAG_STATUS.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            flagStatusList = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }

        LookUpUtil.sortValueSets(flagStatusList);
        log.info("Found " + flagStatusList.size() + " flag statuses.");
        return flagStatusList;
    }

    @Override
    public List<ValueSetDto> getFlagCategory() {
        List<ValueSetDto> flagCategoryList = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.FLAG_CATEGORY.getUrlPath(), LookupPathUrls.FLAG_CATEGORY.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.FLAG_CATEGORY.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            flagCategoryList = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }

        LookUpUtil.sortValueSets(flagCategoryList);
        log.info("Found " + flagCategoryList.size() + " flag category.");
        return flagCategoryList;
    }

    @Override
    public List<ValueSetDto> getSecurityLabel() {
        List<ValueSetDto> securityLabelList = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.SECURITY_LABEL.getUrlPath(), LookupPathUrls.SECURITY_LABEL.getType());
        List<ValueSet.ConceptSetComponent> valueSetList = response.getCompose().getInclude();
        for (ValueSet.ConceptSetComponent conceptComponent : valueSetList) {
            String codingSystemUrl = conceptComponent.getSystem();
            List<ValueSet.ConceptReferenceComponent> conceptCodesList = conceptComponent.getConcept();
            List<ValueSetDto> conceptCodeValueSetList = conceptCodesList.stream().map(c -> LookUpUtil.convertConceptReferenceToValueSetDto(c, codingSystemUrl)).collect(toList());
            securityLabelList.addAll(conceptCodeValueSetList);
        }

        LookUpUtil.sortValueSets(securityLabelList);
        log.info("Found " + securityLabelList.size() + " security labels.");
        return securityLabelList;
    }

    @Override
    public List<ValueSetDto> getPolicyholderRelationship() {
        List<ValueSetDto> policyholderRelationshipList = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.POLICYHOLDER_RELATIONSHIP.getUrlPath(), LookupPathUrls.POLICYHOLDER_RELATIONSHIP.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.POLICYHOLDER_RELATIONSHIP.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            policyholderRelationshipList = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }

        LookUpUtil.sortValueSets(policyholderRelationshipList);
        log.info("Found " + policyholderRelationshipList.size() + " policy holder relationship.");
        return policyholderRelationshipList;
    }

    @Override
    public List<ValueSetDto> getFmStatus() {
        List<ValueSetDto> fmStatusList = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.FM_STATUS.getUrlPath(), LookupPathUrls.FM_STATUS.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.FM_STATUS.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            fmStatusList = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }

        LookUpUtil.sortValueSets(fmStatusList);
        log.info("Found " + fmStatusList.size() + " coverage Status.");
        return fmStatusList;
    }

    @Override
    public List<ValueSetDto> getCoverageType() {
        List<ValueSetDto> coverageTypeList;
        ValueSet response = getValueSets(LookupPathUrls.COVERAGE_TYPE.getUrlPath(), LookupPathUrls.COVERAGE_TYPE.getType());
        List<ValueSet.ConceptSetComponent> valueSetList = response.getCompose().getInclude();
        String codingSystemUrl = CodeSystemEnum.COVERAGE_TYPE.getUrl();
        coverageTypeList = valueSetList.stream().flatMap(obj -> obj.getConcept().stream()).map(s -> LookUpUtil.convertConceptReferenceToValueSetDto(s, codingSystemUrl)).collect(toList());
        log.info("Found " + coverageTypeList.size() + " coverage types.");
        LookUpUtil.sortValueSets(coverageTypeList);
        return coverageTypeList;
    }


    @Override
    public List<ValueSetDto> getEocStatus() {
        List<ValueSetDto> eocStatusList = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.EOC_STATUS.getUrlPath(), LookupPathUrls.EOC_STATUS.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.EOC_STATUS.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            eocStatusList = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }

        LookUpUtil.sortValueSets(eocStatusList);
        log.info("Found " + eocStatusList.size() + " episode of care Status");
        return eocStatusList;
    }

    @Override
    public List<ValueSetDto> getEocType() {
        List<ValueSetDto> eocTypeList = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.EOC_TYPE.getUrlPath(), LookupPathUrls.EOC_TYPE.getType());
        if (LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.EOC_TYPE.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> valueSetList = response.getExpansion().getContains();
            eocTypeList = valueSetList.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(eocTypeList);
        log.info("Found " + eocTypeList.size() + " episode of care Types");
        return eocTypeList;
    }

    @Override
    public List<ValueSetDto> getContactPurpose() {
        return Arrays.stream(ContactentityType.values())
                .map(c -> {
                    ValueSetDto valueSetDto = new ValueSetDto();
                    valueSetDto.setCode(c.toCode());
                    valueSetDto.setDisplay(c.getDisplay());
                    valueSetDto.setDefinition(c.getDefinition());
                    valueSetDto.setSystem(c.getSystem());
                    return valueSetDto;
                })
                .filter(c -> c.getCode() != null && !c.getCode().equalsIgnoreCase("?"))
                .collect(toList());
    }

    @Override
    public List<ValueSetDto> getConditions() {
        List<ValueSetDto> condition_codes = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.CONDITIONS.getUrlPath(), LookupPathUrls.CONDITIONS.getType());
        if(LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.CONDITIONS.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> condtionslist = response.getExpansion().getContains();
            condition_codes = condtionslist.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(condition_codes);
        log.info("Found "+condition_codes.size() + " " + LookupPathUrls.CONDITIONS.getType());
        return condition_codes;
    }

    @Override
    public List<ValueSetDto> getConditionsPriorities() {
        List<ValueSetDto> condition_priorities = new ArrayList<>();
        ValueSet response = getValueSets(LookupPathUrls.CONDITIONS_PRIORITIES.getUrlPath(), LookupPathUrls.CONDITIONS_PRIORITIES.getType());
        if(LookUpUtil.isValueSetAvailableInServer(response, LookupPathUrls.CONDITIONS_PRIORITIES.getType())) {
            List<ValueSet.ValueSetExpansionContainsComponent> priority_list = response.getExpansion().getContains();
            condition_priorities = priority_list.stream().map(LookUpUtil::convertExpansionComponentToValueSetDto).collect(toList());
        }
        LookUpUtil.sortValueSets(condition_priorities);
        log.info("Found "+condition_priorities.size()+" "+LookupPathUrls.CONDITIONS_PRIORITIES.getType());
        return condition_priorities;
    }


    private ValueSet getValueSets(String urlPath, String type) {
        ValueSet response;
        String url = fisProperties.getFhir().getServerUrl() + urlPath;
        try {
            response = (ValueSet) fhirClient.search().byUrl(url).execute();
        } catch (ca.uhn.fhir.rest.server.exceptions.ResourceNotFoundException e) {
            log.error("Query was unsuccessful - Could not find any " + type + " code", e.getMessage());
            throw new ResourceNotFoundException("Query was unsuccessful - Could not find any " + type + " code", e);
        }
        return response;
    }

    private List<ValueSetDto> displayPatientAsClient(List<ValueSetDto> valueSetDtos) {
        valueSetDtos.stream().forEach(valueSetDto -> {
            if (valueSetDto.getDisplay().contains("Patient"))
                valueSetDto.setDisplay(valueSetDto.getDisplay().replace("Patient", "Client"));
        });
        return valueSetDtos;
    }
}
