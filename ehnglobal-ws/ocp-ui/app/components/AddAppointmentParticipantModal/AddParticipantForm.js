import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import Tabs from 'material-ui-next/Tabs/Tabs';
import Tab from 'material-ui-next/Tabs/Tab';
import AppBar from 'material-ui-next/AppBar';
import { Grid } from 'styled-css-grid';
import isEmpty from 'lodash/isEmpty';
import compact from 'lodash/compact';

import CustomErrorText from 'components/CustomErrorText';
import InfoSection from 'components/InfoSection';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import InsideOrgTabContent from './InsideOrgTabContent';
import OutOfOrgTabContent from './OutOfOrgTabContent';
import LocationTabContent from './LocationTabContent';
import ServiceTabContent from './ServiceTabContent';
import {
  mapToOutsideParticipantReference,
  mapToParticipantReference,
  mapToPractitionerParticipantReference,
} from './helpers';
import messages from './messages';


class AddParticipantForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabIndex: 0 };
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleAddParticipants = this.handleAddParticipants.bind(this);
  }

  handleTabChange(event, index) {
    this.setState({ tabIndex: index });
  }

  handleAddParticipants(formValue) {
    const { healthcareServices, locations, practitioners, participantReferences: { outsideParticipants }, participantAttendance } = this.props;
    const serviceParticipant = mapToParticipantReference(formValue.service, healthcareServices);
    const locationParticipant = mapToParticipantReference(formValue.location, locations);
    const practitionerParticipant = mapToPractitionerParticipantReference(formValue.practitioner, formValue.attendance, practitioners, participantAttendance);
    let participants = Array.of(serviceParticipant, locationParticipant, practitionerParticipant);
    if (this.state.tabIndex === 1) {
      const outsideParticipant = mapToOutsideParticipantReference(formValue.practitioner, formValue.attendance, outsideParticipants, participantAttendance);
      participants = Array.of(outsideParticipant);
    }
    const fieldName = this.props.arrayHelpers.name;
    // Remove all falsey values from array
    this.props.arrayHelpers.form.setFieldValue(fieldName, compact(participants));
    this.props.onCloseDialog();
  }

  render() {
    const {
      onCloseDialog,
      healthcareServices,
      locations,
      practitioners,
      participantReferences,
      participantAttendance,
      onInitializeParticipantReferences,
      onGetAvailableLocations,
      onGetAvailableHealthcareServices,
      onGetAvailablePractitioners,
      onSearchParticipantReferences,
    } = this.props;
    const { tabIndex } = this.state;

    const tabProps = {
      healthcareServices,
      locations,
      practitioners,
      participantReferences,
      participantAttendance,
      onGetAvailableLocations,
      onGetAvailableHealthcareServices,
      onGetAvailablePractitioners,
      onSearchParticipantReferences,
    };

    function defineValidationSchema() {
      const inOrgFormValidationSchema = yup.object().shape({
        practitioner: yup.string()
          .required(<FormattedMessage {...messages.validation.required} />),
        attendance: yup.string()
          .required(<FormattedMessage {...messages.validation.required} />),
      });
      const outOfOrgFormValidationSchema = yup.object().shape({
        attendance: yup.string()
          .required(<FormattedMessage {...messages.validation.required} />),
      });
      const locationFormValidationSchema = yup.lazy((values) => {
        if (isEmpty(values.practitioner)) {
          return yup.object().shape({
            location: yup.string()
              .required(<FormattedMessage {...messages.validation.required} />),
          });
        }
        return yup.object().shape({
          location: yup.string()
            .required(<FormattedMessage {...messages.validation.required} />),
          attendance: yup.string()
            .required(<FormattedMessage {...messages.validation.required} />),
        });
      });
      const serviceFormValidationSchema = yup.object().shape({
        service: yup.string()
          .required(<FormattedMessage {...messages.validation.required} />),
        location: yup.string()
          .required(<FormattedMessage {...messages.validation.required} />),
      });
      switch (tabIndex) {
        case 0:
          return inOrgFormValidationSchema;
        case 1:
          return outOfOrgFormValidationSchema;
        case 2:
          return locationFormValidationSchema;
        default:
          return serviceFormValidationSchema;
      }
    }

    function renderParticipantDetailsForm(formikProps) {
      const { touched, errors, values, resetForm, setFieldTouched } = formikProps;

      function tabContent() {
        switch (tabIndex) {
          case 0:
            return (
              <InsideOrgTabContent
                formValues={values}
                resetForm={resetForm}
                setFieldTouched={setFieldTouched}
                {...tabProps}
              />
            );
          case 2:
            return (
              <LocationTabContent
                formValues={values}
                resetForm={resetForm}
                setFieldTouched={setFieldTouched}
                {...tabProps}
              />
            );
          default:
            return (
              <ServiceTabContent
                formValues={values}
                resetForm={resetForm}
                setFieldTouched={setFieldTouched}
                {...tabProps}
              />
            );
        }
      }

      function renderNoAvailableResourceMessage(resource, resourceMessage) {
        return (
          touched && isEmpty(resource) &&
          <CustomErrorText>
            <FormattedMessage {...messages.noResourceAvailable} values={{ resourceMessage }} />
          </CustomErrorText>
        );
      }

      return (
        <Form>
          {tabContent()}
          {renderNoAvailableResourceMessage(healthcareServices, 'healthcare service')}
          {renderNoAvailableResourceMessage(locations, 'location')}
          {renderNoAvailableResourceMessage(practitioners, 'practitioner')}
          <InfoSection margin="20px 0 0 0">
            <Grid columns={4}>
              <StyledRaisedButton type="submit" disabled={isEmpty(touched) || !isEmpty(errors)}>
                <FormattedMessage {...messages.addButton} />
              </StyledRaisedButton>
              <StyledFlatButton type="reset" onClick={onCloseDialog}>
                <FormattedMessage {...messages.cancelButton} />
              </StyledFlatButton>
            </Grid>
          </InfoSection>
        </Form>
      );
    }

    return (
      <div>
        <Formik
          onSubmit={(values) => this.handleAddParticipants(values)}
          validationSchema={defineValidationSchema()}
          render={(formikProps) => (
            <div>
              <AppBar position="sticky" color="default">
                <Tabs
                  value={tabIndex}
                  onChange={(event, index) => {
                    onInitializeParticipantReferences();
                    formikProps.resetForm();
                    this.handleTabChange(event, index);
                  }}
                  indicatorColor="primary"
                  textColor="primary"
                  fullWidth
                >
                  <Tab label={<FormattedMessage {...messages.inOrgTabLabel} />} />
                  <Tab label={<FormattedMessage {...messages.outOfOrgTabLabel} />} />
                  <Tab label={<FormattedMessage {...messages.locationTabLabel} />} />
                  <Tab label={<FormattedMessage {...messages.serviceTabLabel} />} />
                </Tabs>
              </AppBar>
              {tabIndex === 1 ?
                <OutOfOrgTabContent
                  onSearchParticipantReferences={onSearchParticipantReferences}
                  onCloseDialog={onCloseDialog}
                  {...formikProps}
                  {...tabProps}
                /> :
                renderParticipantDetailsForm(formikProps)
              }
            </div>
          )}
        />
      </div>
    );
  }
}

AddParticipantForm.propTypes = {
  arrayHelpers: PropTypes.shape({
    form: PropTypes.shape({
      setFieldValue: PropTypes.func.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }).isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  healthcareServices: PropTypes.array,
  locations: PropTypes.array,
  practitioners: PropTypes.array,
  participantReferences: PropTypes.shape({
    loading: PropTypes.bool,
    outsideParticipant: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  }),
  participantAttendance: PropTypes.array.isRequired,
  onInitializeParticipantReferences: PropTypes.func.isRequired,
  onGetAvailableLocations: PropTypes.func.isRequired,
  onGetAvailableHealthcareServices: PropTypes.func.isRequired,
  onGetAvailablePractitioners: PropTypes.func.isRequired,
  onSearchParticipantReferences: PropTypes.func.isRequired,
};

export default AddParticipantForm;
