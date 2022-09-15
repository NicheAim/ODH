/**
 *
 * SmartContextInitializerPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import queryString from 'query-string';
import identity from 'lodash/identity';
import pick from 'lodash/pick';
import { Step, StepButton } from 'material-ui-next/Stepper';
import Typography from 'material-ui-next/Typography';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledStepper from 'components/StyledStepper';
import FormSubtitle from 'components/FormSubtitle';
import InfoSection from 'components/InfoSection';
import ErrorText from 'components/ErrorText';
import NoResultsFoundText from 'components/NoResultsFoundText';
import Patients from 'containers/Patients/Loadable';
import Organizations from 'containers/Organizations/Loadable';
import Locations from 'containers/Locations/Loadable';
import { setOrganization } from 'containers/App/contextActions';
import makeSelectSmartContextInitializerPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { postContext } from './actions';

const InlineBlock = styled.span`
  display: inline-block;
`;

export class SmartContextInitializerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static BUTTON_MARGIN_RIGHT = 8;
  static USER_CONTEXT_PARAM = 'user';

  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      completed: {},
      selected: {},
    };
    this.getSteps = this.getSteps.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.getSearchParams = this.getSearchParams.bind(this);
    this.getRequiredSteps = this.getRequiredSteps.bind(this);
    this.getRequiredContexts = this.getRequiredContexts.bind(this);
    this.getLaunchId = this.getLaunchId.bind(this);
    this.completedSteps = this.completedSteps.bind(this);
    this.totalSteps = this.totalSteps.bind(this);
    this.isLastStep = this.isLastStep.bind(this);
    this.allStepsCompleted = this.allStepsCompleted.bind(this);
    this.activeStepCompleted = this.activeStepCompleted.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleStep = this.handleStep.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOrganizationClick = this.handleOrganizationClick.bind(this);
    this.handleLocationClick = this.handleLocationClick.bind(this);
    this.handlePatientClick = this.handlePatientClick.bind(this);
    this.renderPatientSelector = this.renderPatientSelector.bind(this);
    this.renderOrganizationSelector = this.renderOrganizationSelector.bind(this);
    this.renderLocationSelector = this.renderLocationSelector.bind(this);
    this.renderEncounterSelector = this.renderEncounterSelector.bind(this);
    this.renderResourceSelector = this.renderResourceSelector.bind(this);
  }

  getSteps() {
    return {
      patient: 'Select Patient',
      organization: 'Select Organization',
      location: 'Select Location',
      encounter: 'Select Encounter',
      resource: 'Select Resource',
    };
  }

  getStepContent(step, keys) {
    const stepContents = {
      patient: this.renderPatientSelector,
      organization: this.renderOrganizationSelector,
      location: this.renderLocationSelector,
      encounter: this.renderEncounterSelector,
      resource: this.renderResourceSelector,
    };
    const requiredStepContents = Object.values(pick(stepContents, keys));
    return requiredStepContents[step]();
  }

  getSearchParams() {
    return queryString.parse(this.props.location.search);
  }

  getLaunchId() {
    const params = this.getSearchParams();
    return params.launch;
  }

  getRequiredContexts() {
    const params = this.getSearchParams();
    return params.required_context.split(',').filter(identity).filter((value) => value !== SmartContextInitializerPage.USER_CONTEXT_PARAM);
  }

  getRequiredSteps(requiredContexts) {
    const reqContexts = requiredContexts || this.getRequiredContexts();
    return reqContexts.map((c) => this.getSteps()[c]);
  }

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  totalSteps() {
    const steps = this.getRequiredSteps();
    return steps.length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  activeStepCompleted() {
    return this.state.completed[this.state.activeStep];
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }

  handleNext() {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = this.getRequiredSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  }

  handleBack() {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  }

  handleStep(step) {
    return () => {
      this.setState({
        activeStep: step,
      });
    };
  }

  handleComplete() {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  }

  handleReset() {
    this.setState({
      activeStep: 0,
      completed: {},
      selected: {},
    });
  }

  handleSubmit() {
    if (this.allStepsCompleted()) {
      const launchId = this.getLaunchId();
      const context = this.state.selected;
      const { required_context, ...params } = this.getSearchParams();
      this.props.postContext(launchId, context, params);
    }
  }

  handleOrganizationClick(organization) {
    this.setState((prevState) => ({
      selected: {
        ...prevState.selected,
        organization: `${organization.logicalId}`,
      },
    }), () => this.props.setOrganization(organization));
  }

  handleLocationClick(location) {
    this.setState((prevState) => ({
      selected: {
        ...prevState.selected,
        location: `${location.logicalId}`,
      },
    }));
  }

  handlePatientClick(patient) {
    this.setState((prevState) => ({
      selected: {
        ...prevState.selected,
        patient: `${patient.id}`,
      },
    }));
  }

  renderPatientSelector() {
    return (
      <div>
        <InfoSection margin="20px 0px">
          <FormSubtitle margin="0">Select Patient</FormSubtitle>
        </InfoSection>
        <InfoSection margin="20px 0px">
          <span><strong>Selected: </strong>{this.activeStepCompleted() && this.state.selected.patient}</span>
        </InfoSection>
        {!this.activeStepCompleted() &&
        <InfoSection margin="20px 0px">
          <Patients showSearchBarByDefault hideToolbar onPatientClick={this.handlePatientClick} />
        </InfoSection>}
      </div>);
  }

  renderOrganizationSelector() {
    return (
      <div>
        <InfoSection margin="20px 0px">
          <FormSubtitle margin="0">Select Organization</FormSubtitle>
        </InfoSection>
        <InfoSection margin="20px 0px">
          <span><strong>Selected: </strong>{this.activeStepCompleted() && this.state.selected.organization}</span>
        </InfoSection>
        {!this.activeStepCompleted() &&
        <InfoSection margin="20px 0px">
          <Organizations showSearchBarByDefault hideToolbar onOrganizationClick={this.handleOrganizationClick} />
        </InfoSection>}
      </div>);
  }

  renderLocationSelector() {
    return (
      <div>
        {!(this.state.selected.organization && this.state.completed[this.getRequiredContexts().indexOf('organization')]) ?
          <InfoSection margin="20px 0px">
            <FormSubtitle margin="0">
              <ErrorText marginLeft="0px" paddingLeft="0px">Organization must be selected before Location</ErrorText>
            </FormSubtitle>
          </InfoSection> :
          <div>
            <InfoSection margin="20px 0px">
              <FormSubtitle margin="0">Select Location</FormSubtitle>
            </InfoSection>
            <InfoSection margin="20px 0px">
              <span><strong>Selected: </strong>{this.activeStepCompleted() && this.state.selected.location}</span>
            </InfoSection>
            {!this.activeStepCompleted() &&
            <InfoSection margin="20px 0px">
              <Locations showSearchBarByDefault hideToolbar onLocationClick={this.handleLocationClick} />
            </InfoSection>}
          </div>
        }
      </div>);
  }

  renderEncounterSelector() {
    return (
      <div>
        <InfoSection margin="20px 0px">
          <FormSubtitle margin="0">Select Encounter</FormSubtitle>
        </InfoSection>
        <InfoSection margin="20px 0px">
          <span><strong>Selected: </strong>{this.activeStepCompleted() && this.state.selected.encounter}</span>
        </InfoSection>
        {!this.activeStepCompleted() &&
        <InfoSection margin="20px 0px">
          <NoResultsFoundText>Under Construction</NoResultsFoundText>
        </InfoSection>}
      </div>);
  }

  renderResourceSelector() {
    return (
      <div>
        <InfoSection margin="20px 0px">
          <FormSubtitle margin="0">Select Resource</FormSubtitle>
        </InfoSection>
        <InfoSection margin="20px 0px">
          <span><strong>Selected: </strong>{this.activeStepCompleted() && this.state.selected.resource}</span>
        </InfoSection>
        {!this.activeStepCompleted() &&
        <InfoSection margin="20px 0px">
          <NoResultsFoundText>Under Construction</NoResultsFoundText>
        </InfoSection>}
      </div>);
  }

  render() {
    const requiredContexts = this.getRequiredContexts();
    const steps = this.getRequiredSteps(requiredContexts);
    const { activeStep } = this.state;

    return (
      <Page>
        <Helmet>
          <title>SmartContextInitializerPage</title>
          <meta name="description" content="Description of SmartContextInitializerPage" />
        </Helmet>
        <PageHeader title={<FormattedMessage {...messages.header} />} />
        <PageContent>
          <div>
            <StyledStepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton
                    onClick={this.handleStep(index)}
                    completed={this.state.completed[index]}
                  >
                    {label}
                  </StepButton>
                </Step>
              ))}
            </StyledStepper>
            <div>
              {this.allStepsCompleted() ? (
                <div>
                  <Typography>
                    All steps completed - you&quot;re finished
                  </Typography>
                  <StyledFlatButton
                    marginRight={SmartContextInitializerPage.BUTTON_MARGIN_RIGHT}
                    onClick={this.handleReset}
                  >Reset
                  </StyledFlatButton>
                  <StyledRaisedButton onClick={this.handleSubmit}>Submit</StyledRaisedButton>
                </div>
              ) : (
                <InfoSection margin="20px 20px">
                  <Typography component={InfoSection}>
                    {this.getStepContent(activeStep, requiredContexts)}
                  </Typography>
                  <InfoSection margin="20px 0px">
                    <StyledRaisedButton
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      marginRight={SmartContextInitializerPage.BUTTON_MARGIN_RIGHT}
                    >
                      Back
                    </StyledRaisedButton>
                    <StyledRaisedButton
                      onClick={this.handleNext}
                      marginRight={SmartContextInitializerPage.BUTTON_MARGIN_RIGHT}
                    >
                      Next
                    </StyledRaisedButton>
                    {activeStep !== steps.length &&
                    (this.activeStepCompleted() ? (
                      <InlineBlock>
                        <Typography variant="caption">
                          Step {activeStep + 1} already completed
                        </Typography></InlineBlock>
                    ) : (
                      <StyledRaisedButton
                        disabled={!this.state.selected[requiredContexts[activeStep]]}
                        onClick={this.handleComplete}
                        marginRight={SmartContextInitializerPage.BUTTON_MARGIN_RIGHT}
                      >
                        {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Confirm Selection'}
                      </StyledRaisedButton>
                    ))}
                  </InfoSection>
                </InfoSection>
              )}
            </div>
          </div>
        </PageContent>
      </Page>
    );
  }
}

SmartContextInitializerPage.propTypes = {
  setOrganization: PropTypes.func.isRequired,
  postContext: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  smartcontextinitializerpage: makeSelectSmartContextInitializerPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    setOrganization: (organization) => dispatch(setOrganization(organization)),
    postContext: (launchId, context, params) => dispatch(postContext(launchId, context, params)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'smartContextInitializerPage', reducer });
const withSaga = injectSaga({ key: 'smartContextInitializerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SmartContextInitializerPage);
