/**
 *
 * AppointmentsCalendar
 *
 */

import Calendar from 'components/Calendar';
import ColorLegend from 'components/ColorLegend';
import HorizontalAlignment from 'components/HorizontalAlignment';
import LoginButtonCell from 'components/Login/LoginButtonCell';
import LoginFieldGrid from 'components/Login/LoginFieldGrid';
import LoginStyledCard from 'components/Login/LoginStyledCard';
import StyledDialog from 'components/StyledDialog';
import StyledRaisedButton from 'components/StyledRaisedButton';
import TextField from 'components/TextField';
import { getLookupsAction } from 'containers/App/actions';
import upperFirst from 'lodash/upperFirst';

import { APPOINTMENT_STATUS, APPOINTMENT_TYPE, MANAGE_APPOINTMENT_URL } from 'containers/App/constants';
import { getPatient, refreshPatient } from 'containers/App/contextActions';
import messages from 'containers/AppointmentsCalendar/messages';
import { Form, Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import { DialogContent, DialogTitle } from 'material-ui-next';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Cell, Grid } from 'styled-css-grid';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import yup from 'yup';
import { getAppointments, getOutlookAppointments, loginToOWA } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectAppointmentsCalendar, { makeSelectIsOutlookAuthenticated } from './selectors';

export class AppointmentsCalendar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      cannotEditModalOpen: false,
      cannotEditOutlookAppointmentModalOpen: false,
      confirmEditModalOpen: false,
      loginModalOpen: false,
      editAppointmentURL: '',
      patientId: '',
    };
    this.handleCloseCannotEditDialog = this.handleCloseCannotEditDialog.bind(this);
    this.handleCloseCannotEditOutlookDialog = this.handleCloseCannotEditOutlookDialog.bind(this);
    this.handleCloseConfirmEditDialog = this.handleCloseConfirmEditDialog.bind(this);
    this.handleCloseLoginDialog = this.handleCloseLoginDialog.bind(this);
    this.handleDoubleClickEvent = this.handleDoubleClickEvent.bind(this);
    this.navigateToEditAppointment = this.navigateToEditAppointment.bind(this);
    this.authenticateOutlookCredentials = this.authenticateOutlookCredentials.bind(this);
    this.handleOpenLoginDialog = this.handleOpenLoginDialog.bind(this);
    this.showTooltip = this.showTooltip.bind(this);
  }

  componentDidMount() {
    this.props.getAppointments();
    this.props.getOutlookAppointments();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.loginModalOpen && nextProps.isOutlookAuthenticated) {
      this.setState({ loginModalOpen: false });
    }
  }

  handleDoubleClickEvent(appointment, patientId) {
    if (appointment.isOutlookAppointment) {
      this.setState({ cannotEditOutlookAppointmentModalOpen: true });
    } else if (appointment.canEdit) {
      this.setState({ editAppointmentURL: appointment.editUrl });
      this.setState({ patientId });
      this.setState({ confirmEditModalOpen: true });
    } else {
      this.setState({ cannotEditModalOpen: true });
    }
  }

  navigateToEditAppointment() {
    this.props.getPatient(this.state.patientId);
    this.props.history.push(this.state.editAppointmentURL);
  }

  authenticateOutlookCredentials(loginFormData, actions) {
    this.props.authenticateOutlookCredentials(loginFormData, () => actions.setSubmitting(false));
  }

  handleCloseCannotEditDialog() {
    this.setState({ cannotEditModalOpen: false });
  }

  handleCloseCannotEditOutlookDialog() {
    this.setState({ cannotEditOutlookAppointmentModalOpen: false });
  }

  handleCloseConfirmEditDialog() {
    this.setState({ confirmEditModalOpen: false });
  }

  handleCloseLoginDialog() {
    this.setState({ loginModalOpen: false });
  }

  handleOpenLoginDialog() {
    this.setState({ loginModalOpen: true });
  }

  showTooltip(appointment) {
    const title = appointment.title;
    const organizerName = appointment.organizerName;
    const myResponse = upperFirst(appointment.myResponse);
    if (!appointment.isOutlookAppointment) {
      const patientName = appointment.patientName;
      const participantNames = appointment.allParticipantNames.join(', ');
      const status = (appointment.status ? upperFirst(appointment.status) : '');
      return `\n Title: ${title} \n Appointment Status: ${status} \n My Response: ${myResponse} \n Organizer: ${organizerName} \n Patient Name: ${patientName} \n Participants: ${participantNames}`;
    }
    const required = appointment.requiredParticipantNames.join(', ');
    const optional = appointment.optionalParticipantNames.join(', ');
    return `\n Title: ${title} \n My Response: ${myResponse} \n Organizer: ${organizerName} \n Required Attendees: ${required} \n Optional Attendees: ${optional}`;
  }

  render() {
    let { appointmentsCalendar: { data, outlookData } } = this.props;
    if (isEmpty(data)) {
      data = [];
    }
    if (isEmpty(outlookData)) {
      outlookData = [];
    }
    const colorLabelArray = [
      { key: 0, label: 'Accepted', color: '#009688' },
      { key: 1, label: 'Tentative', color: '#9868b9' },
      { key: 2, label: 'Needs Action', color: '#E3999D' },
      { key: 3, label: 'Outlook Appointment (Accepted or Tentative)', color: '#2D7BC0' },
      { key: 4, label: 'Outlook Appointment (Not Responded Yet)', color: '#CDE6F7' },
    ];

    return (
      <div>
        <div>
          <Grid columns="90% 10%">
            <Cell>
              <ColorLegend data={colorLabelArray} />
            </Cell>
            <Cell>
              <StyledRaisedButton
                onClick={this.handleOpenLoginDialog}
                disabled={this.props.isOutlookAuthenticated}
                marginTop={3}
              >
                <FormattedMessage {...messages.buttonLoginToOutlook} />
              </StyledRaisedButton>
            </Cell>
          </Grid>
        </div>

        <Calendar
          elements={data}
          outlookElements={outlookData}
          manageAppointmentUrl={MANAGE_APPOINTMENT_URL}
          handleDoubleClickEvent={this.handleDoubleClickEvent}
          tooltipAccessor={this.showTooltip}
        />

        <div>
          <StyledDialog
            open={this.state.cannotEditOutlookAppointmentModalOpen}
            fullWidth
          >
            <DialogTitle>
              <FormattedMessage {...messages.dialogTitleOpenEvent} />
            </DialogTitle>
            <DialogContent>
              <Grid columns={1} alignContent="space-between">
                <Cell>
                  <FormattedMessage {...messages.cannotEditOutlookAppointment} />
                </Cell>
                <Cell>
                  <HorizontalAlignment position={'end'}>
                    <StyledRaisedButton
                      onClick={this.handleCloseCannotEditOutlookDialog}
                    >
                      <FormattedMessage {...messages.dialogButtonLabelOk} />
                    </StyledRaisedButton>
                  </HorizontalAlignment>
                </Cell>
              </Grid>
            </DialogContent>
          </StyledDialog>
        </div>

        <div>
          <StyledDialog
            open={this.state.cannotEditModalOpen}
            fullWidth
          >
            <DialogTitle>
              <FormattedMessage {...messages.dialogTitleOpenEvent} />
            </DialogTitle>
            <DialogContent>
              <Grid columns={1} alignContent="space-between">
                <Cell>
                  <FormattedMessage {...messages.cannotEdit} />
                </Cell>
                <Cell>
                  <HorizontalAlignment position={'end'}>
                    <StyledRaisedButton
                      onClick={this.handleCloseCannotEditDialog}
                    >
                      <FormattedMessage {...messages.dialogButtonLabelOk} />
                    </StyledRaisedButton>
                  </HorizontalAlignment>
                </Cell>
              </Grid>
            </DialogContent>
          </StyledDialog>
        </div>

        <div>
          <StyledDialog
            open={this.state.confirmEditModalOpen}
            fullWidth
          >
            <DialogTitle>
              <FormattedMessage {...messages.dialogTitleOpenEvent} />
            </DialogTitle>
            <DialogContent>
              <Grid columns={1} alignContent="space-between">
                <Cell>
                  <FormattedMessage {...messages.confirmEdit} />
                </Cell>
                <Cell>
                  <HorizontalAlignment position={'end'}>
                    <Grid columns={2} alignContent="space-between">
                      <StyledRaisedButton
                        onClick={this.navigateToEditAppointment}
                      >
                        <FormattedMessage {...messages.dialogButtonLabelEdit} />
                      </StyledRaisedButton>
                      <StyledRaisedButton
                        onClick={this.handleCloseConfirmEditDialog}
                      >
                        <FormattedMessage {...messages.dialogButtonLabelCancel} />
                      </StyledRaisedButton>
                    </Grid>
                  </HorizontalAlignment>
                </Cell>
              </Grid>
            </DialogContent>
          </StyledDialog>
        </div>

        <div>
          <StyledDialog
            open={this.state.loginModalOpen}
            fullWidth
          >
            <DialogTitle>
              <FormattedMessage {...messages.dialogTitleLoginToOutlook} />
            </DialogTitle>
            <DialogContent>
              <LoginStyledCard>
                <Formik
                  onSubmit={(values, actions) => {
                    this.authenticateOutlookCredentials(values, actions);
                  }}
                  validationSchema={yup.object().shape({
                    username: yup.string()
                      .required((<FormattedMessage {...messages.validation.required} />)),
                    password: yup.string()
                      .required((<FormattedMessage {...messages.validation.required} />)),
                  })}
                  render={(loginFormProps) => {
                    const { isSubmitting, dirty, isValid } = loginFormProps;
                    return (
                      <Form>
                        <LoginFieldGrid
                          columns={1}
                          rows="120px 120px 45px 100px"
                          areas={[
                            'username',
                            'password',
                            'loginButton',
                          ]}
                        >
                          <Cell>
                            <TextField
                              name="username"
                              hintText={<FormattedMessage {...messages.hintText.username} />}
                              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.username} />}
                              fullWidth
                            />
                          </Cell>
                          <Cell>
                            <TextField
                              name="password"
                              type="password"
                              hintText={<FormattedMessage {...messages.hintText.password} />}
                              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.password} />}
                              fullWidth
                            />
                          </Cell>
                          <LoginButtonCell>
                            <Grid columns={2} alignContent="space-between">
                              <StyledRaisedButton
                                type="submit"
                                fullWidth
                                disabled={!dirty || isSubmitting || !isValid}
                              >{isSubmitting ?
                                <FormattedMessage {...messages.authenticatingButton} /> :
                                <FormattedMessage {...messages.dialogButtonLabelLogin} />}
                              </StyledRaisedButton>
                              <StyledRaisedButton
                                onClick={this.handleCloseLoginDialog}
                              >
                                <FormattedMessage {...messages.dialogButtonLabelCancel} />
                              </StyledRaisedButton>
                            </Grid>
                          </LoginButtonCell>
                        </LoginFieldGrid>
                      </Form>
                    );
                  }}
                />
              </LoginStyledCard>
            </DialogContent>
          </StyledDialog>
        </div>

      </div>
    )
      ;
  }
}

AppointmentsCalendar.propTypes = {
  getAppointments: PropTypes.func.isRequired,
  getOutlookAppointments: PropTypes.func.isRequired,
  appointmentsCalendar: PropTypes.shape({
    data: PropTypes.array,
    outlookData: PropTypes.array,
  }),
  history: PropTypes.object.isRequired,
  getPatient: PropTypes.func.isRequired,
  authenticateOutlookCredentials: PropTypes.func,
  isOutlookAuthenticated: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  appointmentsCalendar: makeSelectAppointmentsCalendar(),
  isOutlookAuthenticated: makeSelectIsOutlookAuthenticated(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAppointments: (query) => dispatch(getAppointments(query)),
    getOutlookAppointments: () => dispatch(getOutlookAppointments()),
    getLookupData: () => dispatch(getLookupsAction([APPOINTMENT_STATUS, APPOINTMENT_TYPE])),
    refreshPatient: () => dispatch(refreshPatient()),
    getPatient: (logicalId) => dispatch(getPatient(logicalId)),
    authenticateOutlookCredentials: (loginFormData, handleSubmitting) => dispatch(loginToOWA(loginFormData, handleSubmitting)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'appointmentsCalendar', reducer });
const withSaga = injectSaga({ key: 'appointmentsCalendar', saga });

const reduxCompose = compose(
  withReducer,
  withSaga,
  withConnect,
)(AppointmentsCalendar);

export default withRouter(reduxCompose);
