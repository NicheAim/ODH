/**
 *
 * ManageObservationPage
 *
 */
import ManageObservation from 'components/ManageObservation';
import Page from 'components/Page';
import PageContent from 'components/PageContent';
import PageHeader from 'components/PageHeader';
import {
  makeSelectOrganization,
  makeSelectPatient,
  makeSelectUser,
} from 'containers/App/contextSelectors';
import moment from 'moment';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { env_vars } from '../../../env';
import {
  clearObservation,
  createObservation,
  getMedicalComplexities,
  getObservation,
  getServiceIntegrationLevels,
  getSocialComplexities,
  updateObservation,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import {
  makeSelectMedicalComplexities,
  makeSelectObservation,
  makeSelectServiceIntegrationLevels,
  makeSelectSocialComplexities,
} from './selectors';

export class ManageObservationPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.createFhirObservation = this.createFhirObservation.bind(this);
  }

  componentDidMount() {
    const {
      getMedicalComplexities,
      getServiceIntegrationLevels,
      getSocialComplexities,
      getObservation,
      clearObservation,
    } = this.props;

    const id = this.queryParams.id;
    if (id) {
      getObservation(id);
    } else {
      clearObservation();
    }
    getMedicalComplexities();
    getServiceIntegrationLevels();
    getSocialComplexities();
  }

  get queryParams() {
    return queryString.parse(location.search);
  }

  get titleHeader() {
    const editMode = !!this.queryParams.id;
    return (
      <FormattedMessage
        {...(editMode ? messages.updateHeader : messages.createHeader)}
      />
    );
  }

  handleSave(observationFormData, actions) {
    const { observation, createObservation, updateObservation } = this.props;
    const newFhirObservation = this.createFhirObservation(observationFormData);
    const onAfterSubmit = () => actions.setSubmitting(false);

    if (observation) {
      const updatedFhirObservation = { ...observation, status: 'amended' };
      updateObservation(
        updatedFhirObservation,
        newFhirObservation,
        onAfterSubmit
      );
      createObservation(newFhirObservation, onAfterSubmit);
    } else {
      createObservation(newFhirObservation, onAfterSubmit);
    }
  }

  createFhirObservation(observationFormData) {
    const { observation, patient } = this.props;

    const { observationIssued, observationCode, observationValue } =
      observationFormData;

    const {
      id: codeSystemId,
      title,
      name: codeSystemName,
    } = this.codeSystems[observationCode].contents;

    const codeSystemTitle = title.toLowerCase();

    const baseFhirUrl = env_vars.REACT_APP_BASE_FHIR_URL;

    return {
      resourceType: 'Observation',
      status: 'preliminary',
      ...(observation
        ? {
            derivedFrom: {
              reference: `Observation/${observation.id}`,
            },
          }
        : {}),
      code: {
        coding: [
          {
            system: `${baseFhirUrl}/CodeSystem/${codeSystemId}`,
            code: codeSystemTitle,
            display: codeSystemName,
          },
        ],
        text: codeSystemTitle,
      },
      subject: {
        reference: `Patient/${patient.id}`,
      },
      issued: this.getFhirTimestamp(observationIssued),
      ...(codeSystemName === 'njinck-social-complexity'
        ? {
            valueInteger: parseInt(observationValue),
          }
        : {
            valueCodeableConcept: {
              coding: [
                {
                  system: `${baseFhirUrl}/CodeSystem/${codeSystemId}`,
                  code: observationValue,
                  display: observationValue,
                },
              ],
              text: `${codeSystemTitle}|${observationValue}`,
            },
          }),
    };
  }

  getFhirTimestamp(date) {
    return moment(date).toISOString();
  }

  render() {
    const {
      user,
      patient,
      organization,
      medicalComplexities,
      socialComplexities,
      serviceIntegrationLevels,
      observation,
    } = this.props;

    if (
      !user ||
      !patient ||
      !organization ||
      !medicalComplexities ||
      !socialComplexities ||
      !serviceIntegrationLevels ||
      (this.queryParams.id && !observation)
    ) {
      return null;
    }

    const codeSystems = {
      'njinck-medical-complexity': {
        label: 'Medical Complexity',
        contents: medicalComplexities,
      },
      'njinck-social-complexity': {
        label: 'Social Complexity',
        contents: socialComplexities,
      },
      'njinck-service-integration-level': {
        label: 'Service Integration Level',
        contents: serviceIntegrationLevels,
      },
    };

    this.codeSystems = codeSystems;

    const observationProps = {
      user,
      patient,
      organization,
      medicalComplexities,
      socialComplexities,
      serviceIntegrationLevels,
      observation,
      codeSystems,
    };

    return (
      <Page>
        <Helmet>
          <title>Manage Goal</title>
          <meta
            name="description"
            content="Manage Observation page of Omnibus Care Plan application"
          />
        </Helmet>
        <PageHeader title={this.titleHeader} />
        <PageContent>
          <ManageObservation {...observationProps} onSave={this.handleSave} />
        </PageContent>
      </Page>
    );
  }
}

ManageObservationPage.propTypes = {
  user: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  medicalComplexities: PropTypes.object,
  socialComplexities: PropTypes.object,
  serviceIntegrationLevels: PropTypes.object,
  observation: PropTypes.object,
  getMedicalComplexities: PropTypes.func.isRequired,
  getServiceIntegrationLevels: PropTypes.func.isRequired,
  getSocialComplexities: PropTypes.func.isRequired,
  createObservation: PropTypes.func.isRequired,
  updateObservation: PropTypes.func.isRequired,
  getObservation: PropTypes.func.isRequired,
  clearObservation: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  patient: makeSelectPatient(),
  organization: makeSelectOrganization(),
  medicalComplexities: makeSelectMedicalComplexities(),
  socialComplexities: makeSelectSocialComplexities(),
  serviceIntegrationLevels: makeSelectServiceIntegrationLevels(),
  observation: makeSelectObservation(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMedicalComplexities: () => dispatch(getMedicalComplexities()),
    getServiceIntegrationLevels: () => dispatch(getServiceIntegrationLevels()),
    getSocialComplexities: () => dispatch(getSocialComplexities()),
    createObservation: (observation, handleSubmitting) =>
      dispatch(createObservation(observation, handleSubmitting)),
    updateObservation: (updatedObservation, newObservation, handleSubmitting) =>
      dispatch(
        updateObservation(updatedObservation, newObservation, handleSubmitting)
      ),
    getObservation: (id) => dispatch(getObservation(id)),
    clearObservation: () => dispatch(clearObservation()),
  };
}

const withReducer = injectReducer({ key: 'manageObservationPage', reducer });
const withSaga = injectSaga({ key: 'manageObservationPage', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ManageObservationPage);
