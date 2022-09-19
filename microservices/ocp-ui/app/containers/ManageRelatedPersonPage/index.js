/**
 *
 * ManageRelatedPersonPage
 *
 */

import ManageRelatedPerson from 'components/ManageRelatedPerson';
import Page from 'components/Page';
import PageContent from 'components/PageContent';
import PageHeader from 'components/PageHeader';
import { getLookupsAction } from 'containers/App/actions';
import {
  ADMINISTRATIVEGENDER,
  PATIENTIDENTIFIERSYSTEM,
  RELATEDPERSONPATIENTRELATIONSHIPTYPES,
  TELECOMSYSTEM,
  TELECOMUSE,
  USPSSTATES,
} from 'containers/App/constants';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import {
  makeSelectAdministrativeGenders,
  makeSelectPatientIdentifierSystems,
  makeSelectRelatedPersonPatientRelationshipTypes,
  makeSelectTelecomSystems,
  makeSelectTelecomUses,
  makeSelectUspsStates,
} from 'containers/App/lookupSelectors';
import isUndefined from 'lodash/isUndefined';
import moment from 'moment';
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
  createRelatedPerson,
  getRelatedPerson,
  updateRelatedPerson,
} from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { makeSelectRelatedPerson } from './selectors';
import uniqueId from 'lodash/uniqueId';

export class ManageRelatedPersonPage extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
    const relatedPersonId = this.props.match.params.id;
    if (relatedPersonId) {
      this.props.getRelatedPerson(relatedPersonId);
    }
  }

  handleSave(relatedPerson, actions) {
    const relatedPersonId = this.props.match.params.id;
    const mappedRelatedPerson = {
      ...relatedPerson,
      startDate:
        relatedPerson && relatedPerson.startDate
          ? moment(relatedPerson.startDate, 'DD/MM/YYYY').format('MM/DD/YYYY')
          : null,
      endDate:
        relatedPerson && relatedPerson.endDate
          ? moment(relatedPerson.endDate, 'DD/MM/YYYY').format('MM/DD/YYYY')
          : null,
    };

    if (relatedPersonId) {
      const relatedPersonWithId = { ...mappedRelatedPerson, relatedPersonId };
      this.props.updateRelatedPerson(relatedPersonWithId, () => actions.setSubmitting(false));
    } else {
      this.props.createRelatedPerson(mappedRelatedPerson, () => actions.setSubmitting(false));
    }
  }

  render() {
    const {
      match,
      uspsStates,
      patientIdentifierSystems,
      administrativeGenders,
      telecomSystems,
      telecomUses,
      relationshipTypes,
      patient,
      relatedPerson,
    } = this.props;
    const editMode = !isUndefined(match.params.id);
    let selectedRelatedPerson = null;
    if (editMode && relatedPerson) {
      selectedRelatedPerson = relatedPerson;
    }
    const manageRelatedPersonProps = {
      uspsStates,
      patientIdentifierSystems,
      administrativeGenders,
      telecomSystems,
      telecomUses,
      relationshipTypes,
      patient,
      editMode,
      selectedRelatedPerson,
    };
    return (
      <Page key={uniqueId()}>
        <Helmet>
          <title>Manage Related Person</title>
          <meta
            name="description"
            content="Description of ManageRelatedPersonPage"
          />
        </Helmet>
        <PageHeader title={<FormattedMessage {...messages.header} />} />
        <PageContent>
          <ManageRelatedPerson
            {...manageRelatedPersonProps}
            onSave={this.handleSave}
          />
        </PageContent>
      </Page>
    );
  }
}

ManageRelatedPersonPage.propTypes = {
  uspsStates: PropTypes.array,
  match: PropTypes.object,
  createRelatedPerson: PropTypes.func.isRequired,
  updateRelatedPerson: PropTypes.func.isRequired,
  getLookups: PropTypes.func.isRequired,
  getRelatedPerson: PropTypes.func.isRequired,
  patientIdentifierSystems: PropTypes.array,
  administrativeGenders: PropTypes.array,
  telecomSystems: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      system: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ).isRequired,
  telecomUses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      system: PropTypes.string,
      display: PropTypes.string,
      definition: PropTypes.string,
    })
  ).isRequired,
  relationshipTypes: PropTypes.array,
  patient: PropTypes.object,
  relatedPerson: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  patientIdentifierSystems: makeSelectPatientIdentifierSystems(),
  administrativeGenders: makeSelectAdministrativeGenders(),
  telecomSystems: makeSelectTelecomSystems(),
  telecomUses: makeSelectTelecomUses(),
  relationshipTypes: makeSelectRelatedPersonPatientRelationshipTypes(),
  patient: makeSelectPatient(),
  relatedPerson: makeSelectRelatedPerson(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () =>
      dispatch(
        getLookupsAction([
          USPSSTATES,
          PATIENTIDENTIFIERSYSTEM,
          ADMINISTRATIVEGENDER,
          TELECOMUSE,
          TELECOMSYSTEM,
          RELATEDPERSONPATIENTRELATIONSHIPTYPES,
        ])
      ),
    getRelatedPerson: (relatedPersonId) =>
      dispatch(getRelatedPerson(relatedPersonId)),
    createRelatedPerson: (relatedPerson, handleSubmitting) =>
      dispatch(createRelatedPerson(relatedPerson, handleSubmitting)),
    updateRelatedPerson: (relatedPerson, handleSubmitting) =>
      dispatch(updateRelatedPerson(relatedPerson, handleSubmitting)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageRelatedPersonPage', reducer });
const withSaga = injectSaga({ key: 'manageRelatedPersonPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ManageRelatedPersonPage);
