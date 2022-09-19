/**
 *
 * RelatedPersons
 *
 */

import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import ContentSection from 'components/ContentSection';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import LinearProgressIndicator from 'components/LinearProgressIndicator';
import NoResultsFoundText from 'components/NoResultsFoundText';
import PanelToolbar from 'components/PanelToolbar';
import RecordsRange from 'components/RecordsRange';
import RelatedPersonTable from 'components/RelatedPersonTable';
import {
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  MANAGE_RELATED_PERSON_URL,
  OCP_ADMIN_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_CODE,
  PATIENT_ROLE_CODE,
} from 'containers/App/constants';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { actions } from './actions';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectRelatedPersons, {
  makeSelectRelatedPersonsSearchLoading,
  makeSelectRelatedPersonsTotalElements,
} from './selectors';

export class RelatedPersons extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      panelHeight: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
    this.PATIENT_NAME_HTML_ID = uniqueId('patient_name_');
  }

  componentDidMount() {
    this.props.initializeRelatedPersons();
    const { patient } = this.props;
    if (patient) {
      this.props.getRelatedPersons(true, 1);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { patient } = this.props;
    const { patient: newPatient } = nextProps;
    if (!isEqual(patient, newPatient)) {
      this.props.getRelatedPersons(true, 1);
    }
  }

  handlePageClick(pageNumber) {
    this.props.getRelatedPersons(true, pageNumber);
  }

  handlePanelResize(size) {
    this.setState({ panelHeight: size.height });
  }

  render() {
    const { data, patient, loading } = this.props;
    let patientName = null;
    if (patient) {
      const {
        name: [{ firstName, lastName }],
      } = patient;
      patientName = [firstName, lastName].filter((n) => !isEmpty(n)).join(' ');
    }
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_RELATED_PERSON_URL,
    };
    return (
      <div>
        <PanelToolbar
          addNewItem={addNewItem}
          allowedAddNewItemRoles={[
            OCP_ADMIN_ROLE_CODE,
            PATIENT_ROLE_CODE,
            CARE_COORDINATOR_ROLE_CODE,
            CARE_MANAGER_ROLE_CODE,
            ORGANIZATION_ADMIN_ROLE_CODE,
          ]}
          showSearchIcon={false}
          showFilterIcon={false}
          showSettingIcon={false}
          showUploadIcon={false}
          onSize={this.handlePanelResize}
        />
        <LinearProgressIndicator loading={loading} />
        {isEmpty(patient) && (
          <NoResultsFoundText>
            <FormattedMessage {...messages.noRelatedPersonSelected} />
          </NoResultsFoundText>
        )}
        {!isEmpty(patient) && (
          <InfoSection>
            The <FormattedMessage {...messages.relatedPersons} /> for&nbsp;
            <InlineLabel htmlFor={this.PATIENT_NAME_HTML_ID}>
              <span id={this.PATIENT_NAME_HTML_ID}>{patientName}</span>&nbsp;
            </InlineLabel>
            are :
          </InfoSection>
        )}
        <ContentSection>
          {!isEmpty(patient) && (isEmpty(data) || isEmpty(data.elements)) && (
            <NoResultsFoundText>
              <FormattedMessage {...messages.noRelatedPersonFound} />
            </NoResultsFoundText>
          )}
          {!isEmpty(patient) && !isEmpty(data.elements) && (
            <div>
              <RelatedPersonTable
                relativeTop={this.state.panelHeight}
                relatedPersons={data.elements}
                patientId={patient.id}
              />
              <CenterAlignedUltimatePagination
                currentPage={data.currentPage}
                totalPages={data.totalNumberOfPages}
                onChange={this.handlePageClick}
              />
              <RecordsRange
                currentPage={data.currentPage}
                totalPages={data.totalNumberOfPages}
                totalElements={data.totalElements}
                currentPageSize={data.currentPageSize}
              />
            </div>
          )}
        </ContentSection>
      </div>
    );
  }
}

RelatedPersons.propTypes = {
  getRelatedPersons: PropTypes.func.isRequired,
  initializeRelatedPersons: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  patient: PropTypes.object,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectRelatedPersons(),
  patient: makeSelectPatient(),
  loading: makeSelectRelatedPersonsSearchLoading(),
  totalElements: makeSelectRelatedPersonsTotalElements(),
});

function mapDispatchToProps(dispatch) {
  return {
    getRelatedPersons: (showInActive, pageNumber) =>
      dispatch(actions.getRelatedPersons(showInActive, pageNumber)),
    initializeRelatedPersons: () =>
      dispatch(actions.initializeRelatedPersons()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'relatedPersons', reducer });
const withSaga = injectSaga({ key: 'relatedPersons', saga });

export default compose(withReducer, withSaga, withConnect)(RelatedPersons);
