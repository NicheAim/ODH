import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import { Grid } from 'styled-css-grid';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';

import Util from 'utils/Util';
import LinearProgressIndicator from 'components/LinearProgressIndicator';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import TableHeaderColumn from 'components/TableHeaderColumn';
import SelectFieldWithoutOnClick from 'components/SelectFieldWithoutOnClick';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CustomErrorText from 'components/CustomErrorText';
import SearchParticipantReferences from './SearchParticipantReferences';
import { checkFieldSelected, mapAssociatedOrganizations } from './helpers';
import messages from './messages';

const tableColumns = 'repeat(4, 1fr) 110px';

class OutOfOrgTabContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isAddParticipant: false };
    this.handleAddParticipant = this.handleAddParticipant.bind(this);
  }

  handleAddParticipant() {
    this.setState({ isAddParticipant: true });
  }

  render() {
    const { values, resetForm, onCloseDialog, onSearchParticipantReferences, participantReferences, participantAttendance } = this.props;
    const { loading, outsideParticipants } = participantReferences;

    function checkRequiredValues() {
      return checkFieldSelected(values, 'attendance');
    }

    return (
      <div>
        <SearchParticipantReferences onSearchParticipantReferences={onSearchParticipantReferences} />
        <LinearProgressIndicator loading={loading} />
        {
          !loading && outsideParticipants && outsideParticipants.length === 0 &&
          <NoResultsFoundText><FormattedMessage {...messages.searchParticipantsTable.noParticipantsFound} /></NoResultsFoundText>
        }
        <Form>
          {!loading && !isEmpty(outsideParticipants) &&
          <Table margin="10px 0">
            <TableHeader columns={tableColumns}>
              <TableHeaderColumn>
                <FormattedMessage {...messages.searchParticipantsTable.tableHeaderName} />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <FormattedMessage {...messages.searchParticipantsTable.tableHeaderNPI} />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <FormattedMessage {...messages.searchParticipantsTable.tableHeaderAssociatedOrgs} />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <FormattedMessage {...messages.searchParticipantsTable.tableHeaderAttendance} />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <FormattedMessage {...messages.searchParticipantsTable.tableHeaderAction} />
              </TableHeaderColumn>
            </TableHeader>
            {outsideParticipants.map((participantReference) => {
              const { name, identifierValue, associatedOrganizations, appointmentParticipantReferenceDto } = participantReference;
              return (
                <TableRow key={uniqueId()} columns={tableColumns}>
                  <TableRowColumn>{name}</TableRowColumn>
                  <TableRowColumn>{identifierValue}</TableRowColumn>
                  <TableRowColumn>{mapAssociatedOrganizations(associatedOrganizations)}</TableRowColumn>
                  <TableRowColumn>
                    <SelectFieldWithoutOnClick
                      fullWidth
                      name="attendance"
                      hintText={<FormattedMessage {...messages.hintText.selectPractitionerAttendance} />}
                    >
                      {participantAttendance && participantAttendance
                        .filter((attendance) => Util.equalsIgnoreCase(attendance.code, 'information-only'))
                        .map((entry) =>
                          (<MenuItem
                            key={uniqueId()}
                            value={entry.code}
                            primaryText={entry.display}
                          />),
                        )}
                    </SelectFieldWithoutOnClick>
                  </TableRowColumn>
                  <TableRowColumn>
                    <StyledRaisedButton
                      onClick={() => {
                        resetForm({
                          attendance: values.attendance,
                          practitioner: appointmentParticipantReferenceDto.reference,
                        });
                        this.handleAddParticipant();
                      }}
                      disabled={checkRequiredValues() || this.state.isAddParticipant}
                    >
                      <FormattedMessage {...messages.confirmButton} />
                    </StyledRaisedButton>
                  </TableRowColumn>
                </TableRow>
              );
            })}
          </Table>
          }
          {!loading && !isEmpty(outsideParticipants) && checkRequiredValues() &&
          <CustomErrorText>Attendance is required</CustomErrorText>
          }
          <Grid columns={8}>
            <StyledRaisedButton type="submit" disabled={!this.state.isAddParticipant}>
              <FormattedMessage {...messages.addButton} />
            </StyledRaisedButton>
            <StyledFlatButton onClick={onCloseDialog}><FormattedMessage {...messages.cancelButton} /></StyledFlatButton>
          </Grid>
        </Form>
      </div>
    );
  }
}

OutOfOrgTabContent.propTypes = {
  participantReferences: PropTypes.shape({
    loading: PropTypes.bool,
    outsideParticipants: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
    ]),
  }),
  values: PropTypes.object,
  participantAttendance: PropTypes.array.isRequired,
  resetForm: PropTypes.func.isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  onSearchParticipantReferences: PropTypes.func.isRequired,
};

export default OutOfOrgTabContent;
