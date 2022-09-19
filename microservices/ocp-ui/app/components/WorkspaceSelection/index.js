/**
 *
 * WorkspaceSelection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import { Step, StepLabel, Stepper } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';

import SearchBar from 'components/SearchBar';
import InfoSection from 'components/InfoSection';
import StepperSection from './StepperSection';
import StepContent from './StepContent';
import RoleSelectField from './RoleSelectField';
import PatientTable from './PatientTable';
import OrganizationTable from './OrganizationTable';

class WorkspaceSelection extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      roleValue: props.defaultRole,
      practitionerValue: null,
      selectPatient: null,
      selectOrganization: null,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleOrganizationChange = this.handleOrganizationChange.bind(this);
    this.handlePractitionerValueChange = this.handlePractitionerValueChange.bind(this);
    this.handlePatientSelect = this.handlePatientSelect.bind(this);
    this.handleNavigateTo = this.handleNavigateTo.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  getOrganizationName() {
    let organizationName = null;
    if (!isEmpty(this.state.selectOrganization) && this.state.selectOrganization.name) {
      organizationName = this.state.selectOrganization.name;
    }
    return organizationName;
  }

  defineStepContentBasedOnRole() {
    const { ocpAdminRoleCode, patientRoleCode } = this.props;
    switch (this.state.roleValue) {
      case ocpAdminRoleCode:
        return this.renderOcpAdminStepContent();
      case patientRoleCode:
        return this.renderPatientStepContent();
      default:
        return this.renderPractitionerStepContent();
    }
  }

  defineAdminStepContent() {
    switch (this.state.stepIndex) {
      case 0:
        return this.renderSelectRoleContent();
      default:
        return null;
    }
  }

  definePatientStepContent() {
    const { onPatientSearch, searchPatientsData, onChangePatientSearchPage, flattenPatientData } = this.props;
    switch (this.state.stepIndex) {
      case 0:
        return this.renderSelectRoleContent();
      case 1:
        return (
          <InfoSection margin="10px 0">
            <SearchBar showFilter onSearch={onPatientSearch} />
            <PatientTable
              searchPatientsData={searchPatientsData}
              onChangePatientSearchPage={onChangePatientSearchPage}
              flattenPatientData={flattenPatientData}
              onPatientSelect={this.handlePatientSelect}
            />
          </InfoSection>
        );
      default:
        return null;
    }
  }

  definePractitionerStepContent() {
    const { practitioners, mapToName } = this.props;
    switch (this.state.stepIndex) {
      case 0:
        return this.renderSelectRoleContent();
      case 1:
        return this.renderSelectOrganizationContent();
      case 2: {
        return (
          <div>
            {practitioners && practitioners.data && practitioners.data.length === 0 ? `No ${this.mapToRoleDisplay(this.state.roleValue)}s Found`
              : <SelectField
                floatingLabelText={`Select ${this.mapToRoleDisplay(this.state.roleValue)}`}
                value={this.state.practitionerValue}
                onChange={this.handlePractitionerValueChange}
              >
                {practitioners && practitioners.data.map((practitioner) =>
                  (<MenuItem
                    key={practitioner.logicalId}
                    value={practitioner.logicalId}
                    primaryText={mapToName(practitioner.name)}
                  />),
                )}
              </SelectField>
            }
          </div>
        );
      }
      default:
        return null;
    }
  }

  mapToRoleDisplay(roleCode) {
    const roleObject = this.props.mapToRoleObject(this.props.workflowRoles, roleCode);
    return roleObject.display;
  }

  handleNext() {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  handleRoleChange(event, index, value) {
    this.setState({ roleValue: value });
  }

  handleOrganizationChange(selectOrganization) {
    this.setState({ selectOrganization });
    this.props.onPractitionerSelection(this.state.roleValue, selectOrganization.logicalId);
  }

  handlePractitionerValueChange(event, index, value) {
    this.setState({ practitionerValue: value });
  }

  handlePatientSelect(selectPatient) {
    this.setState({ selectPatient });
  }

  handleNavigateTo() {
    const { practitioners } = this.props;
    const practitioner = find(practitioners.data, { logicalId: this.state.practitionerValue });
    this.props.onSetWorkspaceContext(this.state.roleValue, this.state.selectOrganization, practitioner, this.state.selectPatient);
    const linkTo = this.props.getLinkUrlByRole(this.state.roleValue);
    this.props.history.push(linkTo);
  }

  handleReset(event) {
    event.preventDefault();
    this.props.initializeSelection();
    this.setState({
      finished: false,
      stepIndex: 0,
      roleValue: this.props.defaultRole,
      practitionerValue: null,
      selectOrganization: null,
      selectPatient: null,
    });
  }

  renderSelectRoleContent() {
    const { workflowRoles } = this.props;
    return (
      <div>
        <RoleSelectField
          width="290px"
          floatingLabelText="Select Role"
          value={this.state.roleValue}
          onChange={this.handleRoleChange}
        >
          {workflowRoles && workflowRoles.map((workflowRole) =>
            (<MenuItem
              key={uniqueId()}
              value={workflowRole.code}
              primaryText={workflowRole.display}
            />),
          )}
        </RoleSelectField>
      </div>
    );
  }

  renderSelectOrganizationContent() {
    const { onOrganizationSearch, searchOrganizationsData, onChangeOrganizationSearchPage, flattenOrganizationData } = this.props;
    return (
      <InfoSection margin="10px 0">
        <SearchBar showFilter onSearch={onOrganizationSearch} />
        <OrganizationTable
          searchOrganizationsData={searchOrganizationsData}
          onChangeOrganizationSearchPage={onChangeOrganizationSearchPage}
          flattenOrganizationData={flattenOrganizationData}
          onOrganizationSelect={this.handleOrganizationChange}
        />
      </InfoSection>
    );
  }

  renderOcpAdminStepContent() {
    const { stepIndex, roleValue } = this.state;
    return (
      <div>
        <StepperSection>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select Role</StepLabel>
            </Step>
          </Stepper>
          <StepContent>
            <div>
              {this.defineAdminStepContent()}
              <p><strong>Role:</strong> {this.mapToRoleDisplay(roleValue)}</p>
              <RaisedButton
                label="Continue"
                primary
                onClick={this.handleNavigateTo}
              />
            </div>
          </StepContent>
        </StepperSection>
      </div>
    );
  }

  renderPractitionerStepContent() {
    const { stepIndex, finished, roleValue, practitionerValue } = this.state;
    const roleDisplay = this.mapToRoleDisplay(roleValue);
    return (
      <div>
        <StepperSection>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select Role</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Organization</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select {roleDisplay}</StepLabel>
            </Step>
          </Stepper>
          <StepContent>
            {finished ? (
              <div>
                <p><strong>Role:</strong> {roleDisplay}</p>
                <p><strong>Organization Name:</strong> {this.getOrganizationName()}</p>
                <p><strong>{roleDisplay} ID:</strong> {practitionerValue}</p>
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Reset"
                      secondary
                      onClick={this.handleReset}
                    />
                  </Cell>
                  <Cell>
                    <RaisedButton
                      label="Continue"
                      primary
                      onClick={this.handleNavigateTo}
                    />
                  </Cell>
                </Grid>
              </div>
            ) : (
              <div>
                {this.definePractitionerStepContent()}
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Back"
                      disabled={stepIndex === 0}
                      onClick={this.handlePrev}
                    />
                  </Cell>
                  <Cell>
                    <RaisedButton
                      label={stepIndex === 2 ? 'Finish' : 'Next'}
                      primary
                      onClick={this.handleNext}
                      disabled={(stepIndex > 0 && isEmpty(this.state.selectOrganization)) ||
                      (stepIndex > 1 && isEmpty(practitionerValue))
                      }
                    />
                  </Cell>
                </Grid>
              </div>
            )}
          </StepContent>
        </StepperSection>
      </div>
    );
  }

  renderPatientStepContent() {
    const { stepIndex, finished, roleValue } = this.state;
    let patientName = null;
    if (!isEmpty(this.state.selectPatient) && this.state.selectPatient.name) {
      patientName = this.props.flattenPatientData(this.state.selectPatient).name;
    }
    return (
      <div>
        <StepperSection>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select Role</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Patient</StepLabel>
            </Step>
          </Stepper>
          <StepContent>
            {finished ? (
              <div>
                <p><strong>Role:</strong> {this.mapToRoleDisplay(roleValue)}</p>
                <p><strong>Patient Name:</strong> {patientName}</p>
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Reset"
                      secondary
                      onClick={this.handleReset}
                    />
                  </Cell>
                  <Cell>
                    <RaisedButton
                      label="Continue"
                      primary
                      onClick={this.handleNavigateTo}
                    />
                  </Cell>
                </Grid>
              </div>
            ) : (
              <div>
                {this.definePatientStepContent()}
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Back"
                      disabled={stepIndex === 0}
                      onClick={this.handlePrev}
                    />
                  </Cell>
                  <Cell>
                    <RaisedButton
                      label={stepIndex === 1 ? 'Finish' : 'Next'}
                      primary
                      onClick={() => {
                        this.setState({
                          stepIndex: stepIndex + 1,
                          finished: stepIndex >= 1,
                        });
                      }}
                      disabled={stepIndex > 0 && isEmpty(this.state.selectPatient)}
                    />
                  </Cell>
                </Grid>
              </div>
            )}
          </StepContent>
        </StepperSection>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.defineStepContentBasedOnRole()}
      </div>
    );
  }
}

WorkspaceSelection.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  ocpAdminRoleCode: PropTypes.string.isRequired,
  patientRoleCode: PropTypes.string.isRequired,
  workflowRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })).isRequired,
  searchOrganizationsData: PropTypes.any.isRequired,
  searchPatientsData: PropTypes.any.isRequired,
  practitioners: PropTypes.shape({
    data: PropTypes.array.isRequired,
  }).isRequired,
  defaultRole: PropTypes.string,
  initializeSelection: PropTypes.func.isRequired,
  mapToName: PropTypes.func.isRequired,
  mapToRoleObject: PropTypes.func.isRequired,
  flattenOrganizationData: PropTypes.func.isRequired,
  flattenPatientData: PropTypes.func.isRequired,
  getLinkUrlByRole: PropTypes.func.isRequired,
  onSetWorkspaceContext: PropTypes.func.isRequired,
  onPractitionerSelection: PropTypes.func.isRequired,
  onPatientSearch: PropTypes.func.isRequired,
  onChangePatientSearchPage: PropTypes.func.isRequired,
  onOrganizationSearch: PropTypes.func.isRequired,
  onChangeOrganizationSearchPage: PropTypes.func.isRequired,
};

export default WorkspaceSelection;
