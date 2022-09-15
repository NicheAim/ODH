/**
 *
 * CareTeams
 *
 */

import CenterAlign from 'components/Align/CenterAlign';
import Card from 'components/Card';
import CareTeamTable from 'components/CareTeamTable';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import ContentSection from 'components/ContentSection';
import FilterSection from 'components/FilterSection';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import LinearProgressIndicator from 'components/LinearProgressIndicator';
import NoResultsFoundText from 'components/NoResultsFoundText';
import PanelToolbar from 'components/PanelToolbar';
import RecordsRange from 'components/RecordsRange';
import SizedStickyDiv from 'components/StickyDiv/SizedStickyDiv';
import { getLookupsAction } from 'containers/App/actions';
import {
  CARETEAMSTATUS,
  CARE_MANAGER_ROLE_CODE,
  DEFAULT_START_PAGE_NUMBER,
  MANAGE_CARE_TEAM_URL,
  ORGANIZATION_ADMIN_ROLE_CODE,
  PATIENT_ROLE_CODE,
} from 'containers/App/constants';
import {
  makeSelectPatient,
  makeSelectUser,
} from 'containers/App/contextSelectors';
import { makeSelectCareTeamStatuses } from 'containers/App/lookupSelectors';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import uniqueId from 'lodash/uniqueId';
import { Checkbox } from 'material-ui';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Cell, Grid } from 'styled-css-grid';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { CARE_COORDINATOR_ROLE_CODE } from '../App/constants';
import { getCareTeams, initializeCareTeams } from './actions';
import { DEFAULT_CARE_TEAM_STATUS_CODE, SUMMARY_VIEW_WIDTH } from './constants';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import makeSelectCareTeams from './selectors';

export class CareTeams extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      panelHeight: 0,
      filterHeight: 0,
      isExpanded: false,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleStatusListChange = this.handleStatusListChange.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
    this.handleFilterResize = this.handleFilterResize.bind(this);
    this.onSize = this.onSize.bind(this);
    this.PATIENT_NAME_HTML_ID = uniqueId('patient_name_');
  }

  componentDidMount() {
    this.props.initializeCareTeams();
    this.props.initializeLookups();
    const { patient } = this.props;
    if (patient) {
      this.props.getCareTeams(1);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { patient } = this.props;
    const { patient: newPatient } = nextProps;
    if (!isEqual(patient, newPatient)) {
      this.props.getCareTeams(1);
    }
  }

  onSize(size) {
    const isExpanded =
      size && size.width ? Math.floor(size.width) > SUMMARY_VIEW_WIDTH : false;
    this.setState({ isExpanded });
  }

  handlePageClick(pageNumber) {
    const { statusList } = this.props.careTeams;
    this.props.getCareTeams(pageNumber, statusList);
  }

  handleStatusListChange(code, checked) {
    const { statusList } = this.props.careTeams;
    const filteredStatusList = statusList.filter((c) => c !== code);
    const newStatusList = checked
      ? [...filteredStatusList, code]
      : filteredStatusList;
    this.props.getCareTeams(DEFAULT_START_PAGE_NUMBER, newStatusList);
  }

  handlePanelResize(size) {
    this.setState({ panelHeight: size.height });
  }

  handleFilterResize(size) {
    this.setState({ filterHeight: size.height });
  }

  calculateCheckboxColumns({ length }) {
    return `100px repeat(${length < 1 ? 0 : length - 1},110px) 180px 1fr`;
  }

  renderFilter(careTeamStatuses, statusList) {
    const filteredCareTeamStatuses = careTeamStatuses.filter(
      ({ code }) => DEFAULT_CARE_TEAM_STATUS_CODE !== code
    );
    return (
      <FilterSection>
        <CheckboxFilterGrid
          columns={this.calculateCheckboxColumns(filteredCareTeamStatuses)}
        >
          <Cell>
            <CenterAlign>
              <FormattedMessage {...messages.includeLabel} />
            </CenterAlign>
          </Cell>
          {filteredCareTeamStatuses.map(({ code, display }) => (
            <Cell key={code}>
              <CenterAlign>
                <Checkbox
                  name={code}
                  checked={statusList.includes(code)}
                  label={display}
                  onCheck={(event, checked) =>
                    this.handleStatusListChange(code, checked)
                  }
                />
              </CenterAlign>
            </Cell>
          ))}
        </CheckboxFilterGrid>
      </FilterSection>
    );
  }

  render() {
    const {
      careTeams: { loading, data, statusList },
      careTeamStatuses,
      patient,
      user,
    } = this.props;
    let patientName = null;
    if (patient) {
      const {
        name: [{ firstName, lastName }],
      } = patient;
      patientName = [firstName, lastName].filter((n) => !isEmpty(n)).join(' ');
    }
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_CARE_TEAM_URL,
    };
    const isPatient = user.role === PATIENT_ROLE_CODE;
    return (
      <Card>
        <PanelToolbar
          addNewItem={addNewItem}
          allowedAddNewItemRoles={[
            CARE_COORDINATOR_ROLE_CODE,
            CARE_MANAGER_ROLE_CODE,
            ORGANIZATION_ADMIN_ROLE_CODE,
          ]}
          showSearchIcon={false}
          showUploadIcon={false}
          showSettingIcon={false}
          showFilterIcon={false}
          onSize={this.handlePanelResize}
        />
        <LinearProgressIndicator loading={loading} />
        <ContentSection>
          {isEmpty(patientName) ? (
            <NoResultsFoundText>
              <FormattedMessage {...messages.patientNotSelected} />
            </NoResultsFoundText>
          ) : (
            <SizedStickyDiv
              onSize={this.handleFilterResize}
              top={`${this.state.panelHeight}px`}
            >
              <Grid columns={1} gap="">
                <Cell>
                  <InfoSection>
                    <div>
                      The <FormattedMessage {...messages.careTeams} /> for&nbsp;
                      <InlineLabel htmlFor={this.PATIENT_NAME_HTML_ID}>
                        <span id={this.PATIENT_NAME_HTML_ID}>
                          {patientName}
                        </span>
                        &nbsp;
                      </InlineLabel>
                      are :
                    </div>
                  </InfoSection>
                </Cell>
                {!isEmpty(careTeamStatuses) && this.state.isExpanded && (
                  <Cell>{this.renderFilter(careTeamStatuses, statusList)}</Cell>
                )}
              </Grid>
            </SizedStickyDiv>
          )}

          {!loading &&
            !isEmpty(patientName) &&
            (isEmpty(data) || isEmpty(data.elements)) && (
              <NoResultsFoundText>
                <FormattedMessage {...messages.noCareTeamsFound} />
              </NoResultsFoundText>
            )}

          {!isEmpty(data) && !isEmpty(data.elements) && (
            <CenterAlign>
              <CareTeamTable
                isPatient={isPatient}
                relativeTop={this.state.panelHeight + this.state.filterHeight}
                elements={data.elements}
                manageCareTeamUrl={MANAGE_CARE_TEAM_URL}
                onSize={this.onSize}
                isExpanded={this.state.isExpanded}
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
            </CenterAlign>
          )}
        </ContentSection>
      </Card>
    );
  }
}

CareTeams.propTypes = {
  getCareTeams: PropTypes.func.isRequired,
  initializeCareTeams: PropTypes.func.isRequired,
  initializeLookups: PropTypes.func.isRequired,
  careTeams: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    query: PropTypes.object,
    patientName: PropTypes.string,
    statusList: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  careTeamStatuses: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    })
  ),
  patient: PropTypes.object,
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  careTeams: makeSelectCareTeams(),
  careTeamStatuses: makeSelectCareTeamStatuses(),
  patient: makeSelectPatient(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCareTeams: (pageNumber, statusList) =>
      dispatch(getCareTeams(pageNumber, statusList)),
    initializeLookups: () => dispatch(getLookupsAction([CARETEAMSTATUS])),
    initializeCareTeams: () => dispatch(initializeCareTeams()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'careTeams', reducer });
const withSaga = injectSaga({ key: 'careTeams', saga });

export default compose(withReducer, withSaga, withConnect)(CareTeams);
