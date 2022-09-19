/**
 *
 * AddRelatedPersonTableRow
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import MenuItem from 'material-ui/MenuItem';
import uniqueId from 'lodash/uniqueId';

import DatePicker from 'components/DatePicker';
import SelectField from 'components/SelectField';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import StyledRaisedButton from 'components/StyledRaisedButton';
import messages from './messages';


function AddRelatedPersonTableRow(props) {
  const { columns, onAddRelatedPerson, relatedPerson, participantRoles } = props;
  const { memberFirstName, memberLastName } = relatedPerson;
  return (
    <Formik
      onSubmit={(values, actions) => {
        onAddRelatedPerson(values, relatedPerson, actions);
        actions.setSubmitting(false);
      }}
      validationSchema={() =>
        yup.lazy((values) => {
          let startDate = new Date();
          if (values.startDate) {
            startDate = values.startDate;
          }
          return yup.object().shape({
            roleCode: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            startDate: yup.date()
              .required((<FormattedMessage {...messages.validation.required} />))
              .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
            endDate: yup.date()
              .required((<FormattedMessage {...messages.validation.required} />))
              .min(startDate.toLocaleDateString(), (<FormattedMessage {...messages.validation.minEndDate} />)),
          });
        })}
      render={(formikProps) => {
        const { isSubmitting, dirty, isValid } = formikProps;
        const today = new Date();
        return (
          <Form>
            <TableRow columns={columns}>
              <TableRowColumn>{memberFirstName} {memberLastName}</TableRowColumn>
              <TableRowColumn>
                <DatePicker
                  fullWidth
                  name="startDate"
                  minDate={today}
                  mode="landscape"
                  hintText={<FormattedMessage {...messages.startDateHintText} />}
                />
              </TableRowColumn>
              <TableRowColumn>
                <DatePicker
                  fullWidth
                  name="endDate"
                  minDate={today}
                  mode="landscape"
                  hintText={<FormattedMessage {...messages.endDateHintText} />}
                />
              </TableRowColumn>
              <TableRowColumn>
                <SelectField
                  name="roleCode"
                  fullWidth
                  hintText={<FormattedMessage {...messages.roleHintText} />}
                >
                  {participantRoles && participantRoles.map((participantRole) =>
                    (<MenuItem
                      key={uniqueId()}
                      value={participantRole.code}
                      primaryText={participantRole.display}
                    />),
                  )}
                </SelectField>
              </TableRowColumn>
              <TableRowColumn>
                <StyledRaisedButton type="submit" disabled={!dirty || isSubmitting || !isValid}>
                  <FormattedMessage {...messages.addButton} />
                </StyledRaisedButton>
              </TableRowColumn>
            </TableRow>
          </Form>
        );
      }}
    />
  );
}

AddRelatedPersonTableRow.propTypes = {
  columns: PropTypes.string,
  onAddRelatedPerson: PropTypes.func.isRequired,
  participantRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    definition: PropTypes.string,
    system: PropTypes.string,
  })),
  relatedPerson: PropTypes.shape({
    isInCareTeam: PropTypes.bool,
    memberId: PropTypes.string,
    memberFirstName: PropTypes.string,
    memberLastName: PropTypes.string,
    memberName: PropTypes.string,
    memberType: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    onBehalfOfId: PropTypes.string,
    onBehalfOfName: PropTypes.string,
    roleCode: PropTypes.string,
    roleDisplay: PropTypes.string,
  }).isRequired,
};

export default AddRelatedPersonTableRow;
