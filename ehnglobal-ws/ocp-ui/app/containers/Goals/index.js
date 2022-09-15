/**
 *
 * Goals
 *
 */
import Refresh from '@material-ui/icons/Refresh';
import CenterAlign from 'components/Align/CenterAlign';
import Card from 'components/Card';
import LinearProgressIndicator from 'components/LinearProgressIndicator';
import PanelToolbar from 'components/PanelToolbar';
import {
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_CODE,
} from 'containers/App/constants';
import { SUMMARY_VIEW_WIDTH } from 'containers/Tasks/constants';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import GoalsTable from '../../components/GoalsTable';
import AddNewItemSpan from '../../components/PanelToolbar/AddNewItemSpan';
import StyledIconButton from '../../components/StyledIconButton';
import { filterGoalsByCategory } from '../../utils/fhirUtils';
import { MANAGE_GOAL_URL } from '../App/constants';
import ShowHideWrapper from '../ShowHideWrapper';
import messages from './messages';
import { PROP_TYPES } from './prop-types';

export class Goals extends React.Component {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
    };
    this.onSize = this.onSize.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
    this.handleOnRowClick = this.handleOnRowClick.bind(this);
    this.handleReloadGoals = this.handleReloadGoals.bind(this);
  }

  componentDidMount() {
    // this.props.initialize();

    const { patient } = this.props;

    if (patient) {
      // this.props.getGoals(patient.id);
      // this.props.getCarePlan(patient.id);
    }
  }

  handleReloadGoals() {
    // this.props.initialize();
    const { patient } = this.props;

    if (patient) {
      // this.props.getGoals(patient.id);
      // this.props.getCarePlan(patient.id);
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

  handleOnRowClick(resourceId) {
  }

  render() {
    const { goals, patient, goalType, useContextDisplayFilter } = this.props;

    let reducedElements = []
    let goalsWithTask = goals.goalsWithTask;

    if (goals.data && goals.data.elements) {
      reducedElements = goals.data.elements;
    }

    if (reducedElements) {
      reducedElements = filterGoalsByCategory(reducedElements, goalType);
    }

    let createGoalUrl;
    let addNewItem;
    if (!isEmpty(patient) && !isEmpty(patient.id)) {
      createGoalUrl = `${MANAGE_GOAL_URL}?useContextDisplayFilter=${useContextDisplayFilter}&goalType=${goalType}`;
      addNewItem = {
        labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
        linkUrl: createGoalUrl,
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
                  this.handleReloadGoals();
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
        <LinearProgressIndicator loading={goals.loading} />

        {!goals.loading && reducedElements && (
          <div>
            <CenterAlign>
              <GoalsTable
                manageGoalsUrl={MANAGE_GOAL_URL}
                elements={reducedElements}
                onRowClick={this.handleOnRowClick}
                goalsWithTasks={goalsWithTask}
                isExpanded={this.state.isExpanded}
              />
            </CenterAlign>
          </div>
        )}
      </Card>
    );
  }
}

Goals.propTypes = PROP_TYPES;
