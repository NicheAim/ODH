/**
 *
 * ManageRelatedPersonModal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import merge from 'lodash/merge';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DEFAULT_START_PAGE_NUMBER, PARTICIPANTROLE } from 'containers/App/constants';
import { getLookupsAction } from 'containers/App/actions';
import { makeSelectParticipantRoles } from 'containers/App/lookupSelectors';
import ManageRelatedPersonDialog from 'components/ManageRelatedPersonDialog';
import { addRelatedPerson, removeRelatedPerson, searchRelatedPersons } from './actions';
import makeSelectManageRelatedPersonModal from './selectors';
import reducer from './reducer';
import saga from './saga';

export class ManageRelatedPersonModal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      showSearchResult: false,
      searchRelatedPersons: {
        searchTerms: '',
      },
    };
    this.handleRelatedPersonsSearch = this.handleRelatedPersonsSearch.bind(this);
    this.handleSearchPageChange = this.handleSearchPageChange.bind(this);
    this.handleListPageChange = this.handleListPageChange.bind(this);
    this.handleAddRelatedPerson = this.handleAddRelatedPerson.bind(this);
    this.handleRemoveRelatedPerson = this.handleRemoveRelatedPerson.bind(this);
  }

  componentDidMount() {
    this.props.getLookUp();
    const careTeamId = this.props.careTeam.id;
    this.props.searchRelatedPersons(careTeamId, DEFAULT_START_PAGE_NUMBER);
  }

  handleRelatedPersonsSearch(searchTerms) {
    this.setState({
      showSearchResult: true,
      searchRelatedPersons: { searchTerms },
    });
    const careTeamId = this.props.careTeam.id;
    this.props.searchRelatedPersons(careTeamId, DEFAULT_START_PAGE_NUMBER, searchTerms);
  }

  handleSearchPageChange(currentPage) {
    const careTeamId = this.props.careTeam.id;
    this.props.searchRelatedPersons(careTeamId, currentPage, this.state.searchRelatedPersons.searchTerms);
  }

  handleListPageChange(currentPage) {
    const careTeamId = this.props.careTeam.id;
    this.props.searchRelatedPersons(careTeamId, currentPage);
  }

  handleAddRelatedPerson(formValue, relatedPerson, actions) {
    const careTeamId = this.props.careTeam.id;
    const formData = {
      startDate: formValue.startDate.toLocaleDateString(),
      endDate: formValue.endDate.toLocaleDateString(),
      roleCode: formValue.roleCode,
    };
    this.props.addRelatedPerson(careTeamId, merge(relatedPerson, formData), () => actions.setSubmitting(false), () => this.props.onDialogClose());
  }

  handleRemoveRelatedPerson(relatedPerson) {
    const careTeamId = this.props.careTeam.id;
    this.props.removeRelatedPerson(careTeamId, relatedPerson, () => this.props.onDialogClose());
  }

  render() {
    const { dialogOpen, onDialogClose, participantRoles, careTeam, relatedPersons } = this.props;
    const relatedPersonsData = {
      loading: relatedPersons.loading,
      submitting: relatedPersons.submitting,
      data: relatedPersons.data,
      currentPage: relatedPersons.currentPage,
      totalNumberOfPages: relatedPersons.totalNumberOfPages,
      currentPageSize: relatedPersons.currentPageSize,
      totalElements: relatedPersons.totalElements,
      handleChangePage: this.state.showSearchResult ? this.handleSearchPageChange : this.handleListPageChange,
    };
    return (
      <ManageRelatedPersonDialog
        dialogOpen={dialogOpen}
        onDialogClose={onDialogClose}
        relatedPersonsData={relatedPersonsData}
        participantRoles={participantRoles}
        careTeamName={careTeam.name}
        onAddRelatedPerson={this.handleAddRelatedPerson}
        onRemoveRelatedPerson={this.handleRemoveRelatedPerson}
        onRelatedPersonsSearch={this.handleRelatedPersonsSearch}
      />
    );
  }
}

ManageRelatedPersonModal.propTypes = {
  dialogOpen: PropTypes.bool.isRequired,
  onDialogClose: PropTypes.func.isRequired,
  careTeam: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    reasonCode: PropTypes.string,
    reasonDisplay: PropTypes.string,
    statusCode: PropTypes.string,
    statusDisplay: PropTypes.string,
    categoryCode: PropTypes.string,
    categoryDisplay: PropTypes.string,
    subjectId: PropTypes.string.isRequired,
    subjectFirstName: PropTypes.string.isRequired,
    subjectLastName: PropTypes.string.isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.shape({
      roleCode: PropTypes.string,
      roleDisplay: PropTypes.string,
      memberId: PropTypes.string.isRequired,
      memberFirstName: PropTypes.string,
      memberLastName: PropTypes.string,
      memberName: PropTypes.string,
      memberType: PropTypes.string.isRequired,
      onBehalfOfId: PropTypes.string,
      onBehalfOfName: PropTypes.string,
    })),
  }).isRequired,
  getLookUp: PropTypes.func.isRequired,
  searchRelatedPersons: PropTypes.func.isRequired,
  addRelatedPerson: PropTypes.func.isRequired,
  removeRelatedPerson: PropTypes.func.isRequired,
  participantRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    definition: PropTypes.string,
    system: PropTypes.string,
  })),
  relatedPersons: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    data: PropTypes.array,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.bool,
    ]),
  }),
};

const mapStateToProps = createStructuredSelector({
  participantRoles: makeSelectParticipantRoles(),
  relatedPersons: makeSelectManageRelatedPersonModal(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookUp: () => dispatch(getLookupsAction([PARTICIPANTROLE])),
    searchRelatedPersons: (careTeamId, currentPage, searchTerms) => dispatch(searchRelatedPersons(careTeamId, currentPage, searchTerms)),
    addRelatedPerson: (careTeamId, relatedPerson, handleSubmitting, handleCloseDialog) => dispatch(addRelatedPerson(careTeamId, relatedPerson, handleSubmitting, handleCloseDialog)),
    removeRelatedPerson: (careTeamId, relatedPerson, handleCloseDialog) => dispatch(removeRelatedPerson(careTeamId, relatedPerson, handleCloseDialog)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageRelatedPersonModal', reducer });
const withSaga = injectSaga({ key: 'manageRelatedPersonModal', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageRelatedPersonModal);
