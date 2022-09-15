/**
 *
 * PractitionerRoleForOrganizationTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import find from 'lodash/find';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import AutoSuggestionField from 'components/AutoSuggestion';
import StyledRaisedButton from 'components/StyledRaisedButton';
import { flattenOrganization } from './helpers';
import messages from './messages';


class PractitionerRoleForOrganizationTable extends React.Component {
  findExistingOrganization(reference, existingOrganizations) {
    return find(existingOrganizations, ['organization.reference', reference]);
  }

  render() {
    const { organizations, onAddPractitionerRole, existingOrganizations, onCloseDialog, roleType, specialtyType } = this.props;
    const roleSuggestions = roleType
      .filter((entry) => (entry.code !== null) && (entry.display !== null))
      .map((entry) => ({
        value: entry.code,
        label: entry.display,
      }));

    const specialtySuggestions = specialtyType
      .filter((entry) => (entry.code !== null) && (entry.display !== null))
      .map((entry) => ({
        value: entry.code,
        label: entry.display,
      }));

    return (
      <div>
        <Table margin="0px">
          <TableHeader columns=".5fr .5fr .5fr .3fr .7fr .7fr .3fr">
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderOrganization} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAddress} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderId} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderCode} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderSpecialty} /></TableHeaderColumn>
            <TableHeaderColumn />
          </TableHeader>
        </Table>
        {!isEmpty(organizations) && organizations.length > 0 && organizations.map((org) => (
          <Formik
            key={uniqueId()}
            initialValues={this.findExistingOrganization(`Organization/${org.logicalId}`, existingOrganizations)}
            onSubmit={(values, actions) => {
              const { code, specialty } = values;
              actions.setSubmitting(false);
              onAddPractitionerRole({
                organization: { reference: `Organization/${org.logicalId}`, display: `${org.name}` },
                code,
                specialty,
                active: true,
              });
              onCloseDialog();
            }}
            validationSchema={yup.object().shape({
              code: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              specialty: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
            })}
            render={(formikProps) => {
              const { isSubmitting, dirty, isValid } = formikProps;
              const flattenedOrganization = flattenOrganization(org);
              const { name, addresses, logicalId, identifiers, active } = flattenedOrganization;
              return (
                <Form>
                  <Table margin="0px">
                    <TableRow columns=".5fr .5fr .5fr .3fr .7fr .7fr .3fr" key={logicalId}>
                      <TableRowColumn>{name}</TableRowColumn>
                      <TableRowColumn>{addresses}</TableRowColumn>
                      <TableRowColumn>{identifiers}</TableRowColumn>
                      <TableRowColumn>{active}</TableRowColumn>
                      <TableRowColumn>
                        <AutoSuggestionField
                          name="code"
                          isRequired
                          placeholder={<FormattedMessage {...messages.rolePlaceholder} />}
                          suggestions={roleSuggestions}
                          {...this.props}
                        />
                      </TableRowColumn>
                      <TableRowColumn>
                        <AutoSuggestionField
                          name="specialty"
                          isRequired
                          placeholder={<FormattedMessage {...messages.specialtyPlaceholder} />}
                          suggestions={specialtySuggestions}
                          {...this.props}
                        />
                      </TableRowColumn>
                      <TableRowColumn>
                        <StyledRaisedButton
                          type="submit"
                          value={org}
                          disabled={!dirty || isSubmitting || !isValid || this.findExistingOrganization(`Organization/${logicalId}`, existingOrganizations) !== undefined}
                        >
                          Add
                        </StyledRaisedButton>
                      </TableRowColumn>
                    </TableRow>
                  </Table>
                </Form>
              );
            }}
          />
        ))}
      </div>
    );
  }
}

PractitionerRoleForOrganizationTable.propTypes = {
  organizations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    identifiers: PropTypes.array,
    addresses: PropTypes.array,
    logicalId: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  })).isRequired,
  onAddPractitionerRole: PropTypes.func,
  existingOrganizations: PropTypes.array,
  onCloseDialog: PropTypes.func,
  roleType: PropTypes.array,
  specialtyType: PropTypes.array,
};

export default PractitionerRoleForOrganizationTable;
