/**
 *
 * ManagePatientPage
 *
 */

import ManagePatient from 'components/ManagePatient';
import Page from 'components/Page';
import PageContent from 'components/PageContent';
import PageHeader from 'components/PageHeader';
import { getLookupsAction } from 'containers/App/actions';
import {
  ADMINISTRATIVEGENDER,
  COVERAGE_TYPE,
  EOC_STATUS,
  EOC_TYPE,
  FLAG_CATEGORY,
  FLAG_STATUS,
  FM_STATUS,
  LANGUAGE,
  PATIENTIDENTIFIERSYSTEM,
  POLICYHOLDER_RELATIONSHIP,
  RELATEDPERSONPATIENTRELATIONSHIPTYPES,
  TELECOMSYSTEM,
  TELECOMUSE,
  USCOREBIRTHSEX,
  USCOREETHNICITY,
  USCORERACE,
  USPSSTATES,
} from 'containers/App/constants';
import {
  getPatient,
  getSubscriberOptions,
} from 'containers/App/contextActions';
import {
  makeSelectOrganization,
  makeSelectPatient,
  makeSelectSubscriptionOptions,
  makeSelectUser,
} from 'containers/App/contextSelectors';
import {
  composePatientReference,
  getPatientFullName,
} from 'containers/App/helpers';
import {
  makeSelectNewMintPatient,
  makeSelectNewPatientExists,
  makeSelectNewPatientQueryParameters,
} from 'containers/NewPatientResource/selectors';
import merge from 'lodash/merge';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectAdministrativeGenders,
  makeSelectCoverageFmStatus,
  makeSelectCoverageType,
  makeSelectEpisodeOfCareStatus,
  makeSelectEpisodeOfCareType,
  makeSelectFlagCategories,
  makeSelectFlagStatuses,
  makeSelectLanguages,
  makeSelectPatientIdentifierSystems,
  makeSelectPolicyHolderRelationship,
  makeSelectRelatedPersonPatientRelationshipTypes,
  makeSelectTelecomSystems,
  makeSelectTelecomUses,
  makeSelectUsCoreBirthSexes,
  makeSelectUsCoreEthnicities,
  makeSelectUsCoreRaces,
  makeSelectUspsStates,
} from '../../containers/App/lookupSelectors';
import { makeSelectEmergencyContact } from '../../containers/PatientPage/selectors';
import { getPractitioners, savePatient } from './actions';
import { mapToFrontendPatientForm, getRelatedPersonsUrl } from './api';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { makeSelectPractitioners } from './selectors';

export class ManagePatientPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.getPractitioner = this.getPractitioner.bind(this);
  }

  componentDidMount() {
    this.props.getLookUpFormData();
    const { organization, match } = this.props;
    const patientId = match.params.id;

    if (patientId) {
      this.props.getSubscriberOptions(patientId);
    }

    if (organization) {
      // get practitioners belonging to requester organization
      this.props.getPractitioners(organization.logicalId);
    }
  }

  getPractitioner() {
    const { user } = this.props;
    const id = user && user.fhirResource ? user.fhirResource.logicalId : null;
    const display = `${
      user && user.fhirResource
        ? `${user.fhirResource.name[0].firstName} ${user.fhirResource.name[0].lastName}`
        : null
    }`;
    return { id, display };
  }

  handleSave(patientFormData, actions) {
    if (this.props.organization) {
      merge(patientFormData, {
        organizationId: this.props.organization.logicalId,
      });
    }

    const practitioner = this.getPractitioner();

    if (practitioner && practitioner.id) {
      merge(patientFormData, { practitionerId: practitioner.id });
    }

    if (
      patientFormData.emergencyContacts &&
      !isEmpty(patientFormData.emergencyContacts)
    ) {
      const emergencyContactsMapped = patientFormData.emergencyContacts.map(
        (item) => {
          if (!item.system || !item.value || !item.use) return item;

          const relationshipTypes = this.props.relationshipTypes;

          const selectedRelationshipTypes = relationshipTypes.find(
            (itemRelationshipType) =>
              itemRelationshipType.code === item.relationshipCode
          );

          const relationshipValue = selectedRelationshipTypes.display;
          const relationshipSystem = selectedRelationshipTypes.system;

          const tempTelecom = {
            system: item.system,
            value: item.value,
            use: item.use,
          };

          let mappedItem = { ...item };
          delete mappedItem.system;
          delete mappedItem.value;
          delete mappedItem.use;

          if (!item.telecoms) {
            return {
              ...mappedItem,
              telecoms: [tempTelecom],
              relationshipValue,
              relationshipSystem,
            };
          }

          return {
            ...mappedItem,
            telecoms: [...item.telecoms, tempTelecom],
            relationshipValue,
            relationshipSystem,
          };
        }
      );

      merge(patientFormData, { emergencyContacts: emergencyContactsMapped });
    }

    this.props.onSaveForm(patientFormData, () => {
      actions.setSubmitting(false);
      if (
        patientFormData &&
        patientFormData.id !== undefined &&
        patientFormData.id !== null
      )
        this.props.getPatient(patientFormData.id);
    });
  }

  render() {
    const {
      match,
      patient,
      uspsStates,
      patientIdentifierSystems,
      administrativeGenders,
      usCoreRaces,
      usCoreEthnicities,
      usCoreBirthSexes,
      languages,
      telecomSystems,
      telecomUses,
      flagStatuses,
      flagCategories,
      practitioners,
      organization,
      episodeOfCareType,
      episodeOfCareStatus,
      policyHolderRelationship,
      coverageFmStatus,
      coverageType,
      subscriptionOptions,
      newPatientQueryParameters,
      newPatientExists,
      newMintPatient,
      relationshipTypes,
      emergencyContact,
    } = this.props;

    let initialNewPatientValue;
    if (match.params.id === undefined && newPatientQueryParameters) {
      const { firstName, lastName, birthDate } = newPatientQueryParameters;
      initialNewPatientValue = !newPatientExists && {
        firstName,
        lastName,
        birthDate,
        active: true,
      };
    }

    if (match.params.id === undefined && newPatientExists && newMintPatient) {
      newMintPatient.id = null;
      newMintPatient.episodeOfCares = null;
      initialNewPatientValue = mapToFrontendPatientForm(newMintPatient);
    }

    let emergencyContacts = [];

    const fetchRelatedPersons = async () => {
      await fetch(getRelatedPersonsUrl(patient.id))
        .then((res) => res.json())
        .then((data) => {
          data.elements.forEach((item) => {
            if (item.relationshipCode === 'C' && item.active) {
              emergencyContacts.push(item);
            }
          });
        });
    };

    fetchRelatedPersons();

    const formProps = {
      uspsStates,
      patientIdentifierSystems,
      administrativeGenders,
      usCoreRaces,
      usCoreEthnicities,
      usCoreBirthSexes,
      languages,
      telecomSystems,
      telecomUses,
      flagStatuses,
      flagCategories,
      patient:
        match.params.id === undefined
          ? initialNewPatientValue
          : mapToFrontendPatientForm(patient),
      emergencyContacts: emergencyContacts,
      practitioner: this.getPractitioner(),
      practitioners,
      organization,
      episodeOfCareType,
      episodeOfCareStatus,
      policyHolderRelationship,
      coverageFmStatus,
      coverageType,
      subscriptionOptions,
      composePatientReference,
      getPatientFullName,
      relationshipTypes,
    };
    return (
      <Page>
        <Helmet>
          <title>Manage Patient</title>
          <meta
            name="description"
            content="Manage patient page of Omnibus Care Plan application"
          />
        </Helmet>
        <PageHeader
          title={
            match.params.id ? (
              <FormattedMessage {...messages.updateHeader} />
            ) : (
              <FormattedMessage {...messages.createHeader} />
            )
          }
        />
        <PageContent>
          <ManagePatient {...formProps} onSave={this.handleSave} />
        </PageContent>
      </Page>
    );
  }
}

ManagePatientPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onSaveForm: PropTypes.func,
  getPatient: PropTypes.func.isRequired,
  getSubscriberOptions: PropTypes.func.isRequired,
  getLookUpFormData: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
  patientIdentifierSystems: PropTypes.array,
  administrativeGenders: PropTypes.array,
  usCoreRaces: PropTypes.array,
  usCoreEthnicities: PropTypes.array,
  usCoreBirthSexes: PropTypes.array,
  episodeOfCareType: PropTypes.array.isRequired,
  episodeOfCareStatus: PropTypes.array.isRequired,
  languages: PropTypes.array,
  telecomSystems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      system: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  telecomUses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      system: PropTypes.string,
      display: PropTypes.string,
      definition: PropTypes.string,
    })
  ),
  flagStatuses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      system: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  flagCategories: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      system: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
  practitioners: PropTypes.arrayOf(
    PropTypes.shape({
      reference: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  getPractitioners: PropTypes.func.isRequired,
  user: PropTypes.object,
  organization: PropTypes.object,
  subscriptionOptions: PropTypes.array,
  policyHolderRelationship: PropTypes.array,
  coverageType: PropTypes.array,
  coverageFmStatus: PropTypes.array,
  newPatientExists: PropTypes.bool,
  newPatientQueryParameters: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    birthDate: PropTypes.date,
  }),
  newMintPatient: PropTypes.object,
  relationshipTypes: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
  uspsStates: makeSelectUspsStates(),
  patientIdentifierSystems: makeSelectPatientIdentifierSystems(),
  administrativeGenders: makeSelectAdministrativeGenders(),
  usCoreRaces: makeSelectUsCoreRaces(),
  usCoreEthnicities: makeSelectUsCoreEthnicities(),
  usCoreBirthSexes: makeSelectUsCoreBirthSexes(),
  languages: makeSelectLanguages(),
  telecomSystems: makeSelectTelecomSystems(),
  telecomUses: makeSelectTelecomUses(),
  flagStatuses: makeSelectFlagStatuses(),
  flagCategories: makeSelectFlagCategories(),
  practitioners: makeSelectPractitioners(),
  user: makeSelectUser(),
  organization: makeSelectOrganization(),
  episodeOfCareType: makeSelectEpisodeOfCareType(),
  episodeOfCareStatus: makeSelectEpisodeOfCareStatus(),
  policyHolderRelationship: makeSelectPolicyHolderRelationship(),
  coverageFmStatus: makeSelectCoverageFmStatus(),
  coverageType: makeSelectCoverageType(),
  subscriptionOptions: makeSelectSubscriptionOptions(),
  newPatientQueryParameters: makeSelectNewPatientQueryParameters(),
  newPatientExists: makeSelectNewPatientExists(),
  newMintPatient: makeSelectNewMintPatient(),
  relationshipTypes: makeSelectRelatedPersonPatientRelationshipTypes(),
  emergencyContact: makeSelectEmergencyContact(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSaveForm: (patientFormData, handleSubmitting) => {
      dispatch(savePatient(patientFormData, handleSubmitting));
    },
    getLookUpFormData: () =>
      dispatch(
        getLookupsAction([
          USPSSTATES,
          PATIENTIDENTIFIERSYSTEM,
          ADMINISTRATIVEGENDER,
          POLICYHOLDER_RELATIONSHIP,
          FM_STATUS,
          COVERAGE_TYPE,
          USCORERACE,
          USCOREETHNICITY,
          USCOREBIRTHSEX,
          LANGUAGE,
          TELECOMSYSTEM,
          TELECOMUSE,
          FLAG_STATUS,
          FLAG_CATEGORY,
          EOC_TYPE,
          EOC_STATUS,
          RELATEDPERSONPATIENTRELATIONSHIPTYPES,
        ])
      ),
    getPatient: (id) => dispatch(getPatient(id)),
    getPractitioners: (organizationId) =>
      dispatch(getPractitioners(organizationId)),
    getSubscriberOptions: (patientId) =>
      dispatch(getSubscriberOptions(patientId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'managePatientPage', reducer });
const withSaga = injectSaga({ key: 'managePatientPage', saga });

export default compose(withReducer, withSaga, withConnect)(ManagePatientPage);
