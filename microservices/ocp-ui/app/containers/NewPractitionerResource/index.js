/**
 *
 * NewPractitionerResource
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Util from 'utils/Util';
import { makeSelectUser } from 'containers/App/contextSelectors';
import { getLookupsAction } from 'containers/App/actions';
import { ORGANIZATION_ADMIN_ROLE_CODE, PRACTITIONERIDENTIFIERSYSTEM } from 'containers/App/constants';
import { makeSelectPractitionerIdentifierSystems } from 'containers/App/lookupSelectors';
import AddPractitionerModal from 'components/AddPractitionerModal';
import { findPractitioner, initializeFindPractitioner } from './actions';
import makeSelectNewPractitionerResource from './selectors';
import reducer from './reducer';
import saga from './saga';

export class NewPractitionerResource extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleCheckExisting = this.handleCheckExisting.bind(this);
  }

  componentDidMount() {
    this.props.getLookUp();
    this.props.initializeFindPractitioner();
  }

  handleCheckExisting(practitionerFormData, actions) {
    const { firstName, lastName, identifierType, identifier } = practitionerFormData;
    this.props.findPractitioner(firstName, lastName, identifierType, identifier, () => actions.setSubmitting(false));
  }

  render() {
    const { modalOpen, onModalClose, user: { role }, identifierSystems, practitionerLookup } = this.props;
    const isOrgAdmin = Util.equalsIgnoreCase(role, ORGANIZATION_ADMIN_ROLE_CODE);
    return (
      <div>
        <AddPractitionerModal
          modalOpen={modalOpen}
          onModalClose={onModalClose}
          isOrgAdmin={isOrgAdmin}
          identifierSystems={identifierSystems}
          practitionerLookup={practitionerLookup}
          onCheckExisting={this.handleCheckExisting}
        />
      </div>
    );
  }
}

NewPractitionerResource.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
  getLookUp: PropTypes.func.isRequired,
  initializeFindPractitioner: PropTypes.func.isRequired,
  findPractitioner: PropTypes.func.isRequired,
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
  identifierSystems: PropTypes.arrayOf(PropTypes.shape({
    uri: PropTypes.string.isRequired,
    oid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  practitionerLookup: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    exists: PropTypes.bool.isRequired,
    practitioner: PropTypes.object,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.bool,
    ]),
  }),
};

const mapStateToProps = createStructuredSelector({
  practitionerLookup: makeSelectNewPractitionerResource(),
  identifierSystems: makeSelectPractitionerIdentifierSystems(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookUp: () => dispatch(getLookupsAction([PRACTITIONERIDENTIFIERSYSTEM])),
    initializeFindPractitioner: () => dispatch(initializeFindPractitioner()),
    findPractitioner: (firstName, lastName, identifierType, identifier, handleSubmitting) => dispatch(findPractitioner(firstName, lastName, identifierType, identifier, handleSubmitting)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'newPractitionerResource', reducer });
const withSaga = injectSaga({ key: 'newPractitionerResource', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewPractitionerResource);
