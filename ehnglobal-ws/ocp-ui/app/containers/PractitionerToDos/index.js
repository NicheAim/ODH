/**
 *
 * PractitionerToDos
 *
 */

import NoResultsFoundText from 'components/NoResultsFoundText';
import { PanelToolbar } from 'components/PanelToolbar';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import ToDoList from 'components/ToDoList';
import { getLookupsAction } from 'containers/App/actions';
import {
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  DATE_RANGE,
  PCP_ROLE_CODE,
  TO_DO_DEFINITION,
} from 'containers/App/constants';
import { makeSelectUser } from 'containers/App/contextSelectors';
import { makeSelectToDoFilterDateRanges } from 'containers/App/lookupSelectors';
import { getFilterToDos, getPractitionerToDos } from 'containers/PractitionerToDos/actions';
import { makeSelectPractitionerToDos, makeSelectSearchLoading } from 'containers/PractitionerToDos/selectors';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';

export class PractitionerToDos extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
    const definition = TO_DO_DEFINITION;
    const practitionerId = this.getPractitionerId();
    if (practitionerId) {
      this.props.getPractitionerToDos(practitionerId, definition);
    }
  }

  getPractitionerId() {
    const { user } = this.props;
    const practitionerId = user && (user.role === CARE_COORDINATOR_ROLE_CODE || user.role === CARE_MANAGER_ROLE_CODE || user.role === PCP_ROLE_CODE) ? user.fhirResource.logicalId : null;
    return practitionerId;
  }

  handleFilter(dateRange) {
    const definition = TO_DO_DEFINITION;
    const practitionerId = this.getPractitionerId();

    if (practitionerId && dateRange) {
      this.props.getFilterToDos(practitionerId, definition, dateRange);
    }
  }

  render() {
    const { toDos, loading, dateRanges } = this.props;
    const filterField = {
      filterTypes: dateRanges,
      filterValueHintText: <FormattedMessage {...messages.selectLabelDateRange} />,
    };
    return (
      <div>
        {loading && <RefreshIndicatorLoading />}
        <PanelToolbar
          showSearchIcon={false}
          showUploadIcon={false}
          showSettingIcon={false}
          showToDoSpecificFilters
          filterField={filterField}
          onFilter={this.handleFilter}
        />
        {!loading && isEmpty(toDos) &&
        <NoResultsFoundText>
          <FormattedMessage {...messages.noToDosFound} />
        </NoResultsFoundText>}
        {!isEmpty(toDos) &&
        <div>
          <ToDoList
            isPractitioner
            toDos={toDos}
          />
        </div>
        }
      </div>
    );
  }
}

PractitionerToDos.propTypes = {
  toDos: PropTypes.array.isRequired,
  getPractitionerToDos: PropTypes.func.isRequired,
  getFilterToDos: PropTypes.func.isRequired,
  getLookups: PropTypes.func.isRequired,
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  dateRanges: PropTypes.array.isRequired,
};

const mapStateToProps = createStructuredSelector({
  toDos: makeSelectPractitionerToDos(),
  loading: makeSelectSearchLoading(),
  user: makeSelectUser(),
  dateRanges: makeSelectToDoFilterDateRanges(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([DATE_RANGE])),
    getPractitionerToDos: (practitionerId, definition) => dispatch(getPractitionerToDos(practitionerId, definition)),
    getFilterToDos: (practitionerId, definition, dateRange) => dispatch(getFilterToDos(practitionerId, definition, dateRange)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'practitionerToDos', reducer });
const withSaga = injectSaga({ key: 'practitionerToDos', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PractitionerToDos);
