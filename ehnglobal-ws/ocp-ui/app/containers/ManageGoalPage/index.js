/**
 *
 * ManageGoalPage
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import Page from 'components/Page';
import ManageGoal from 'components/ManageGoal';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';
import { makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import _, { get } from 'lodash';
import {
  removeUniqueIdSuffixes,
  getPlanSuggestions,
} from './utils';
import {
  getGoalCategories,
  getGoalStatuses,
  getPlanDefinitions,
  getGoalAchievementStatuses,
  createGoal,
  updateGoal,
  getGoal,
  clearGoal,
} from './actions';
import {
  makeSelectPlanDefinitions,
  makeSelectGoalCategories,
  makeSelectGoalStatuses,
  makeSelectGoalAchievementStatuses,
  makeSelectGoal,
} from './selectors';
import { makeSelectOrganization } from '../App/contextSelectors';
import { makeSelectPractitioners } from './selectors';
import { getPractitioners } from './actions';

export class ManageGoalPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
    this.createFhirGoal = this.createFhirGoal.bind(this);
  }

  get queryParams() {
    return queryString.parse(location.search);
  }

  componentDidMount() {
    const {
      getPlanDefinitions,
      getGoalCategories,
      getGoalStatuses,
      getGoalAchievementStatuses,
      getGoal,
      clearGoal,
      getPractitioners,
      organization,
    } = this.props;

    const { id } = this.queryParams;
    if (id) {
      getGoal(id);
    }
    else {
      clearGoal();
    }
    getPlanDefinitions();
    getGoalCategories();
    getGoalStatuses();
    getGoalAchievementStatuses();
    getPractitioners(organization.logicalId);
  }

  get titleHeader() {
    const editMode = !!this.queryParams.id;
    return <FormattedMessage {
      ...editMode
        ? messages.updateHeader
        : messages.createHeader
    }/>
  }

  handleSave(rawGoalFormData, actions) {
    const goalFormData = removeUniqueIdSuffixes(rawGoalFormData);
    const fhirGoal = this.createFhirGoal(goalFormData);
    const onAfterSubmit = () => actions.setSubmitting(false);
    if (this.props.goal) {
      this.props.updateGoal(fhirGoal, onAfterSubmit);
    }
    else {
      this.props.createGoal(goalFormData, fhirGoal, onAfterSubmit);
    }
  }

  createFhirGoal(goalFormData) {
    const {
      startDate,
      dueDate,
      lifecycleStatus,
      achievementStatus,
      description,
    } = goalFormData;

    const {
      goal,
      goalAchievementStatuses,
      patient,
    } = this.props;

    const goalType = this.queryParams['goalType'];
    const achievmentStatusDisplay = _
      .chain(goalAchievementStatuses)
      .find(status => status.code === achievementStatus)
      .get('display')
      .value()
    ;
    const goalCategoryCode = goal ? get(goal, 'category[0].coding[0].code') : goalType;
    const goalCategoryDisplay = _.startCase(goalCategoryCode);

    return {
      resourceType: 'Goal',
      ...(goal ? { id: goal.id } : {}),
      name: 'Goal',
      lifecycleStatus,
      achievementStatus: {
        coding: [
          {
            system: 'http://terminology.hl7.org/CodeSystem/goal-achievement',
            code: achievementStatus,
            display: achievmentStatusDisplay,
          }
        ],
        text: achievmentStatusDisplay,
      },
      category: [
        {
          coding: [
            {
              system: 'http://example.com/CodeableConcept-0',
              code: goalCategoryCode,
              display: goalCategoryDisplay,
            }
          ],
          text: 'Treatment'
        }
      ],
      description: {
        coding: [
          {
            system: 'http://snomed.info/sct',
            code: '109006'
          }
        ],
        text: description,
      },
      subject: {
        reference: `Patient/${patient.id}`
      },
      startDate: this.getFhirDate(startDate),
      target: [
        {
          dueDate: this.getFhirDate(dueDate),
        }
      ],
    };
  }

  getFhirDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  render() {
    const {
      goal,
      organization,
      patient,
      requester,
      planDefinitions,
      goalCategories,
      goalStatuses,
      goalAchievementStatuses,
      practitioners,
    } = this.props;

    const goalProps = {
      goal,
      organization,
      patient,
      requester,
      planDefinitions,
      goalCategories,
      goalStatuses,
      goalAchievementStatuses,
      practitioners,
      planSuggestions: getPlanSuggestions(
        planDefinitions,
        this.queryParams['useContextDisplayFilter']
      ),
    }

    if (
      !organization
      || !patient
      || !planDefinitions
      || !goalCategories
      || !goalStatuses
      || !goalAchievementStatuses
      || !practitioners
      || (this.queryParams.id && !goal)
    ) {
      return null;
    }

    return (
      <Page>
        <Helmet>
          <title>Manage Goal</title>
          <meta
            name='description'
            content='Manage Goal page of Omnibus Care Plan application'
          />
        </Helmet>
        <PageHeader
          title={this.titleHeader}
        />
        <PageContent>
          <ManageGoal {...goalProps} onSave={this.handleSave} />
        </PageContent>
      </Page>
    );
  }
}

ManageGoalPage.propTypes = {
  goal: PropTypes.object,
  user: PropTypes.object,
  patient: PropTypes.object,
  planDefinitions: PropTypes.object,
  goalCategories: PropTypes.array,
  goalStatuses: PropTypes.array,
  goalAchievementStatuses: PropTypes.array,
  getGoalAchievementStatuses: PropTypes.func,
  organization: PropTypes.object,
  practitioners: PropTypes.array,
  getGoalCategories: PropTypes.func,
  getGoalStatuses: PropTypes.func,
  createGoal: PropTypes.func.isRequired,
  updateGoal: PropTypes.func.isRequired,
  getGoal: PropTypes.func.isRequired,
  clearGoal: PropTypes.func.isRequired,
  getPractitioners: PropTypes.func.isRequired,
}

const mapStateToProps = createStructuredSelector({
  goal: makeSelectGoal(),
  user: makeSelectUser(),
  patient: makeSelectPatient(),
  organization: makeSelectOrganization(),
  planDefinitions: makeSelectPlanDefinitions(),
  goalCategories: makeSelectGoalCategories(),
  goalStatuses: makeSelectGoalStatuses(),
  goalAchievementStatuses: makeSelectGoalAchievementStatuses(),
  practitioners: makeSelectPractitioners(),
});

function mapDispatchToProps(dispatch) {
  return {
    getPlanDefinitions: () => dispatch(getPlanDefinitions()),
    getGoalCategories: () => dispatch(getGoalCategories()),
    getGoalStatuses: () => dispatch(getGoalStatuses()),
    getGoalAchievementStatuses: () => dispatch(getGoalAchievementStatuses()),
    createGoal: (goalFormData, fhirGoal, handleSubmitting) => dispatch(createGoal(goalFormData, fhirGoal, handleSubmitting)),
    updateGoal: (fhirGoal, handleSubmitting) => dispatch(updateGoal(fhirGoal, handleSubmitting)),
    getGoal: (goalId) => dispatch(getGoal(goalId)),
    clearGoal: () => dispatch(clearGoal()),
    getPractitioners: (organizationId) => dispatch(getPractitioners(organizationId)),
  }
}

const withReducer = injectReducer({ key: 'manageGoalPage', reducer });
const withSaga = injectSaga({ key: 'manageGoalPage', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageGoalPage);
