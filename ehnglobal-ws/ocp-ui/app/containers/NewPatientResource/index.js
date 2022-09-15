/**
 *
 * NewPatientResource
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import AddPatientModal from 'components/AddPatientModal';
import { makeSelectUser, makeSelectOrganization } from 'containers/App/contextSelectors';
import { ORGANIZATION_ADMIN_ROLE_CODE } from 'containers/App/constants';
import Util from 'utils/Util';
import makeSelectNewPatientResource from './selectors';
import { findPatient, initializeFindPatient } from './actions';
import reducer from './reducer';
import saga from './saga';

export class NewPatientResource extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleCheckExisting = this.handleCheckExisting.bind(this);
  }

  componentDidMount() {
    this.props.initializeFindPatient();
  }

  handleCheckExisting(patientFormData, actions) {
    const { firstName, lastName, birthDate } = patientFormData;
    this.props.findPatient(firstName, lastName, birthDate, () => actions.setSubmitting(false));
  }

  render() {
    const { modalOpen, onModalClose, user: { role }, patientLookup, organization } = this.props;
    const isOrgAdmin = Util.equalsIgnoreCase(role, ORGANIZATION_ADMIN_ROLE_CODE);
    return (
      <div>
        <AddPatientModal
          modalOpen={modalOpen}
          onModalClose={onModalClose}
          isOrgAdmin={isOrgAdmin}
          patientLookup={patientLookup}
          organization={organization}
          onCheckExisting={this.handleCheckExisting}
        />
      </div>
    );
  }
}

NewPatientResource.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  initializeFindPatient: PropTypes.func.isRequired,
  findPatient: PropTypes.func.isRequired,
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
  patientLookup: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    exists: PropTypes.bool.isRequired,
    patient: PropTypes.object,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.bool,
    ]),
  }),
  organization: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  patientLookup: makeSelectNewPatientResource(),
  user: makeSelectUser(),
  organization: makeSelectOrganization(),
  
});

function mapDispatchToProps(dispatch) {
  return {
    initializeFindPatient: () => dispatch(initializeFindPatient()),
    findPatient: (firstName, lastName, birthDate, handleSubmitting) => dispatch(findPatient(firstName, lastName, birthDate, handleSubmitting)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'newPatientResource', reducer });
const withSaga = injectSaga({ key: 'newPatientResource', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewPatientResource);
