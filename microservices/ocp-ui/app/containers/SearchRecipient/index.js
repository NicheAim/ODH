/**
 *
 * SearchRecipient
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import DialogHeader from 'components/DialogHeader';
import { makeSelectRecipients, makeSelectSelectedRecipients } from 'containers/SearchRecipient/selectors';
import { addSelectedRecipients, getRecipients, setSelectRecipientStatus } from 'containers/SearchRecipient/actions';
import { getRoleName } from 'utils/CommunicationUtils';
import StyledFlatButton from 'components/StyledFlatButton';
import Dialog from 'material-ui/Dialog';
import StyledRaisedButton from 'components/StyledRaisedButton';
import { customContentStyle } from 'containers/SearchRecipient/constants';
import SearchRecipientDialogContent from 'components/SearchRecipientDialogContent';
import { getLookupsAction } from 'containers/App/actions';
import { PARTICIPANTROLE, PARTICIPANTTYPE } from 'containers/App/constants';
import { makeSelectParticipantTypes } from 'containers/App/lookupSelectors';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class SearchRecipient extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.addRecipients = this.addRecipients.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.updateCheck = this.updateCheck.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.getLookUpFormData();
  }

  addRecipients() {
    this.handleDialogClose();
    this.props.addSelectedRecipients();
  }

  updateCheck(evt, checked, recipientReference) {
    this.props.setSelectRecipientStatus(checked, recipientReference);
  }

  handleDialogClose() {
    this.setState({ open: false });
    this.props.handleClose();
  }

  handleSearch(values) {
    const { member, name } = values;
    // const member = values && values.member ? values.member : '';
    if (this.props.communicationId) {
      this.props.getRecipients(this.props.selectedPatient.id, member, name, this.props.communicationId);
    } else {
      this.props.getRecipients(this.props.selectedPatient.id, member, name, null);
    }
  }

  render() {
    const { isOpen, recipients, participantTypes, selectedRecipients } = this.props;
    const localProps = {
      recipients,
      selectedRecipients,
      participantTypes,
    };
    const actionsButtons = [
      <StyledFlatButton onClick={this.handleDialogClose}>
        <FormattedMessage {...messages.dialogCancelBtnLabel} />
      </StyledFlatButton>,
      <StyledRaisedButton onClick={this.addRecipients}>
        <FormattedMessage {...messages.dialogAddBtnLabel} />
      </StyledRaisedButton>,
    ];
    return (
      <Dialog
        actions={actionsButtons}
        modal
        open={isOpen}
        contentStyle={customContentStyle}
        autoScrollBodyContent
      >
        <DialogHeader>
          <FormattedMessage {...messages.addRecipientDialogTitle} />
        </DialogHeader>
        <SearchRecipientDialogContent
          {...localProps}
          updateCheck={this.updateCheck}
          handleSearch={this.handleSearch}
          getRoleName={getRoleName}
        />
      </Dialog>
    );
  }
}

SearchRecipient.propTypes = {
  getRecipients: PropTypes.func.isRequired,
  communicationId: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  addSelectedRecipients: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  setSelectRecipientStatus: PropTypes.func.isRequired,
  selectedPatient: PropTypes.object,
  recipients: PropTypes.array.isRequired,
  selectedRecipients: PropTypes.array,
  getLookUpFormData: PropTypes.func.isRequired,
  participantTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    definition: PropTypes.string,
    system: PropTypes.string,
  })),

};

const mapStateToProps = createStructuredSelector({
  recipients: makeSelectRecipients(),
  participantTypes: makeSelectParticipantTypes(),
  selectedPatient: makeSelectPatient(),
  selectedRecipients: makeSelectSelectedRecipients(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRecipients: (patientId, member, name, communicationId) => dispatch(getRecipients(patientId, member, name, communicationId)),
    getLookUpFormData: () => dispatch(getLookupsAction([PARTICIPANTTYPE, PARTICIPANTROLE])),
    setSelectRecipientStatus: (checked, recipientReference) => dispatch(setSelectRecipientStatus(checked, recipientReference)),
    addSelectedRecipients: () => dispatch(addSelectedRecipients()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'searchRecipient', reducer });
const withSaga = injectSaga({ key: 'searchRecipient', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SearchRecipient);
