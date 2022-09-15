/**
 *
 * PatientLookupResult
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Divider from 'material-ui-next/Divider';
import uniqueId from 'lodash/uniqueId';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import InfoSection from 'components/InfoSection';
import LinearProgressIndicator from 'components/LinearProgressIndicator';
import NavigationIconMenu from 'components/NavigationIconMenu';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledText from 'components/StyledText';
import { flattenPatient } from './helpers';
import messages from './messages';

const columns = '.5fr .6fr  repeat(3, 1fr) .5fr';

function PatientLookupResult(props) {
  const { patientLookup: { loading, patient, exists, error }, isOrgAdmin, organization } = props;
  const managePatientUrl = '/ocp-ui/manage-patient';
  const manageCareTeamUrl = '/ocp-ui/manage-care-team?newpatient=true';
  
  
  let isPatientBelongToOrg = false;
  const orgRefer = patient && patient.organization && patient.organization.reference;
  if(orgRefer && orgRefer.substring(orgRefer.indexOf('/') + 1) === organization.logicalId)
    isPatientBelongToOrg=true;

  let isCareTeamExists = true;

  function renderPatientTable() {
    const flattenedPatient = flattenPatient(patient);
    const menuItems = isOrgAdmin ? [{
      primaryText: <FormattedMessage {...messages.associateCurrentOrganization} />,
      linkTo: `${managePatientUrl}/${patient.logicalId}`,
    }] : [{
      primaryText: <FormattedMessage {...messages.edit} />,
      linkTo: `${managePatientUrl}/${patient.logicalId}`,
    }];
    return (
      <div>
        <FormattedMessage {...messages.modalContentText} />
        <Divider light />
        <Table>
          <TableHeader columns={columns}>
            <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnName} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnIdentifier} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnOrgName} /></TableHeaderColumn>
            <TableHeaderColumn> <FormattedMessage {...messages.tableColumnHeaderRole} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderEmail} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnAction} /></TableHeaderColumn>
          </TableHeader>
          <TableRow key={uniqueId()} columns={columns}>
            <TableRowColumn>{flattenedPatient.name}</TableRowColumn>
            <TableRowColumn>{flattenedPatient.identifiers}</TableRowColumn>
            <TableRowColumn>
              <StyledText>{flattenedPatient.orgName}</StyledText>
            </TableRowColumn>
            <TableRowColumn>{flattenedPatient.roles}</TableRowColumn>
            <TableRowColumn>{flattenedPatient.email}</TableRowColumn>
            <TableRowColumn>
              <NavigationIconMenu menuItems={menuItems} />
            </TableRowColumn>
          </TableRow>
        </Table>
        {renderCreateNewRecordButton()}
      </div>
    );
  }

  function renderCreateNewRecordButton() {
    return (
      <InfoSection margin="10px 0px">
        <StyledRaisedButton component={Link} to={managePatientUrl}>
          <FormattedMessage {...messages.createButton} />
        </StyledRaisedButton>
      </InfoSection>
    );
  }

  function renderCreateNewCareTeamButton() {
    return (
      <InfoSection margin="10px 0px">
        <StyledRaisedButton component={Link} to={manageCareTeamUrl}>
          <FormattedMessage {...messages.createCareTeamButton} />
        </StyledRaisedButton>
      </InfoSection>
    );
  }

  function renderViewPatientButton() {
    return (
      <InfoSection margin="10px 0px">
        <StyledRaisedButton component={Link} to={`/ocp-ui/patients/${patient.id}`}>
          <FormattedMessage {...messages.viewPatientButton} />
        </StyledRaisedButton>
      </InfoSection>
    );
  }
 

  return (
    <div>
      <LinearProgressIndicator loading={loading} />

      {error === false && !exists && !loading &&
      <div>
        <FormattedMessage {...messages.NoExistPatientFound} />
        {renderCreateNewRecordButton()}
      </div>
      }

      
     {error === "Not Found" && !loading && !exists && !loading &&
      <div>
        <FormattedMessage {...messages.NoExistPatientFound} />
        {renderCreateNewRecordButton()}
      </div>
      }


     {error === false && !loading && exists && patient && patient.mrn ===  null &&
      <div>
        <FormattedMessage {...messages.ExistMintPatientFound} />
        {renderCreateNewRecordButton()}
      </div>
      }

      
      {error === false && !loading && exists && patient && patient.mrn !== null && patient.mrn !== ''  && !isPatientBelongToOrg &&
      <div>
        <FormattedMessage {...messages.ExistPatientFound} />
        {renderCreateNewRecordButton()}
      </div>
      }

      {error === false && !loading && exists && patient && patient.mrn !== null && patient.mrn !== ''  && isPatientBelongToOrg &&
      <div>
        <FormattedMessage {...messages.ExistOrgPatientFound} />
        {renderViewPatientButton()}
      </div>
      }

      {/* {!loading && exists && renderPatientTable()} */}
    </div>
  );
}

PatientLookupResult.propTypes = {
  patientLookup: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    exists: PropTypes.bool.isRequired,
    patient: PropTypes.shape({
      name: PropTypes.array,
      identifiers: PropTypes.array,
      telecoms: PropTypes.array,
      patientRoles: PropTypes.array,
      mrn: PropTypes.string,
    }),
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.bool,
    ]),
  }).isRequired,
  isOrgAdmin: PropTypes.bool.isRequired,
  organization: PropTypes.shape({
    logicalId: PropTypes.string,
  }),
};

export default PatientLookupResult;
