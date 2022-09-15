/**
 *
 * Observations
 *
 */
import React from 'react';
import CenterAlign from 'components/Align/CenterAlign';
import Card from 'components/Card';
import LinearProgressIndicator from 'components/LinearProgressIndicator';
import PanelToolbar from 'components/PanelToolbar';
import {
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_CODE,
} from 'containers/App/constants';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import ObservationsTable from 'components/ObservationsTable';
import { SUMMARY_VIEW_WIDTH } from 'containers/Tasks/constants';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { getObservations } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeSelectObservations, makeSelectLoading } from './selectors';
import isEmpty from 'lodash/isEmpty';
import { MANAGE_OBSERVATION_URL } from '../App/constants';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import uniqueId from 'lodash/uniqueId';
import AddNewItemSpan from '../../components/PanelToolbar/AddNewItemSpan';
import StyledIconButton from '../../components/StyledIconButton';
import ShowHideWrapper from '../ShowHideWrapper';
import Refresh from '@material-ui/icons/Refresh';

export class Observations extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      openBinaryResource: false,
    };
    this.onSize = this.onSize.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
    this.handleOnRowClick = this.handleOnRowClick.bind(this);
  }

  componentDidMount() {
    this.reloadObservations();
  }

  reloadObservations() {
    const { patient, getObservations } = this.props;
    if (patient) {
      getObservations(patient.id);
    }
  }

  onSize(size) {
    const isExpanded =
      size && size.width ? Math.floor(size.width) > SUMMARY_VIEW_WIDTH : false;
    this.setState({ isExpanded });
  }

  handlePanelResize(size) {
    this.setState({ panelHeight: size.height });
  }

  handleOnRowClick() {}

  render() {
    const { loading, observations, patient } = this.props;

    let createObservationUrl;
    let addNewItem;
    if (!isEmpty(patient) && !isEmpty(patient.id)) {
      createObservationUrl = `${MANAGE_OBSERVATION_URL}`;
      addNewItem = {
        labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
        linkUrl: createObservationUrl,
      };
    }

    return (
      <Card minWidth={'auto'}>
        <PanelToolbar
          addNewItem={addNewItem}
          customNewButton={[
            <ShowHideWrapper
              key={uniqueId()}
              allowedRoles={[
                CARE_COORDINATOR_ROLE_CODE,
                CARE_MANAGER_ROLE_CODE,
                ORGANIZATION_ADMIN_ROLE_CODE,
              ]}
            >
              <AddNewItemSpan
                onClick={() => {
                  this.reloadObservations();
                }}
              >
                <StyledIconButton
                  size="x-small"
                  svgIconSize="small"
                  disableIconHover
                >
                  <Refresh color={'#3275c1'} />
                </StyledIconButton>
                {'Reload'}
              </AddNewItemSpan>
            </ShowHideWrapper>,
          ]}
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
        {!loading && (
          <div>
            <CenterAlign>
              <ObservationsTable
                observations={observations}
                onRowClick={this.handleOnRowClick}
                manageObservationsUrl={MANAGE_OBSERVATION_URL}
                isExpanded={this.state.isExpanded}
              />
            </CenterAlign>
          </div>
        )}
      </Card>
    );
  }
}

Observations.propTypes = {
  patient: PropTypes.object,
  observations: PropTypes.array,
  loading: PropTypes.bool,
  getObservations: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
  observations: makeSelectObservations(),
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    getObservations: (patientId) => dispatch(getObservations(patientId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'observations', reducer });
const withSaga = injectSaga({ key: 'observations', saga });

export default compose(withReducer, withSaga, withConnect)(Observations);
