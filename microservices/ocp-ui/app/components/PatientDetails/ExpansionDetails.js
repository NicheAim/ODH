import Edit from '@material-ui/icons/Edit';
import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import drop from 'lodash/drop';
import take from 'lodash/take';
import upperFirst from 'lodash/upperFirst';
import words from 'lodash/words';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Cell, Grid } from 'styled-css-grid';
import { MANAGE_PATIENT_URL } from '../../containers/App/constants';
import StyledFlatButton from '../StyledFlatButton';
import StyledIconButton from '../StyledIconButton';
import AdvisoryDetails from './AdvisoryDetails';
import messages from './messages';
import moment from 'moment';

const getPatientOrganization = (organizations) => {
  if (organizations) {
    if (organizations.length > 0) {
      return organizations[0].display;
    }
  }
  return '';
};
function ExpansionDetails({ patient, emergencyContact }) {
  const {
    addresses,
    name,
    genderCode,
    identifier,
    telecoms,
    birthDate,
    flags,
    mrn,
    createdOnCode,
    organizations,
  } = patient;
  const firstName = take(words(name));
  const lastNames = drop(words(name));
  const lastName = lastNames.join(' ');
  const emergencyContactPhone =
    emergencyContact &&
    emergencyContact.telecoms &&
    emergencyContact.telecoms.find((item) => item.system === 'phone');
  const createdOnCodeDate = createdOnCode
    ? moment(createdOnCode).format('MM-DD-YY')
    : null;

  return (
    <Grid columns={'95% 5%'} justifyContent="space-between">
      <Cell>
        <InfoSection>
          <StyledFlatButton
            component={Link}
            to={`${MANAGE_PATIENT_URL}/${patient.id}`}
          >
            <StyledIconButton
              size="x-small"
              svgIconSize="small"
              disableIconHover
              aria-label={'Edit Icon'}
            >
              <Edit color={'#3275c1'} />
            </StyledIconButton>
            <FormattedMessage {...messages.edit} />
          </StyledFlatButton>
          <Grid columns={'repeat(5, 1fr)'} justifyContent="space-between">
            <Cell>
              <TextLabelGroup
                label={
                  <FormattedMessage {...messages.expansionDetailsFirstName} />
                }
                text={firstName}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={
                  <FormattedMessage {...messages.expansionDetailsLastName} />
                }
                text={lastName}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.gender} />}
                text={upperFirst(genderCode)}
              />
            </Cell>
            {emergencyContact &&
              emergencyContact.firstName &&
              emergencyContact.lastName && (
                <Cell>
                  <TextLabelGroup
                    label={'Emergency Contact Name'}
                    text={
                      emergencyContact.firstName +
                      ' ' +
                      emergencyContact.lastName
                    }
                  />
                </Cell>
              )}
            {emergencyContact &&
              emergencyContactPhone &&
              emergencyContactPhone.value && (
                <Cell>
                  <TextLabelGroup
                    label={'Emergency Contact Phone'}
                    text={emergencyContactPhone.value}
                  />
                </Cell>
              )}
            <Cell>
              <TextLabelGroup
                label={
                  <FormattedMessage {...messages.expansionDetailsIdentifiers} />
                }
                text={identifier}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={
                  <FormattedMessage {...messages.expansionDetailsAddresses} />
                }
                text={addresses}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.contactDetails} />}
                text={telecoms}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.expansionDetailsDOB} />}
                text={birthDate}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={<FormattedMessage {...messages.expansionDetailsMRN} />}
                text={mrn}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={
                  <FormattedMessage
                    {...messages.expansionDetailsManagingOrganization}
                  />
                }
                text={getPatientOrganization(organizations)}
              />
            </Cell>
            <Cell>
              <TextLabelGroup
                label={
                  <FormattedMessage
                    {...messages.expansionDetailsCreatedOnCode}
                  />
                }
                text={createdOnCodeDate}
              />
            </Cell>
          </Grid>
        </InfoSection>
      </Cell>
      {flags && flags.length > 0 && <AdvisoryDetails flags={flags} />}
    </Grid>
  );
}

ExpansionDetails.propTypes = {
  patient: PropTypes.shape({
    identifier: PropTypes.string,
    genderCode: PropTypes.string,
    name: PropTypes.string.isRequired,
    addresses: PropTypes.string,
    telecoms: PropTypes.string,
    birthDate: PropTypes.string,
    flags: PropTypes.array,
    createdOnCode: PropTypes.string,
    organizations: PropTypes.string,
  }).isRequired,
};

export default ExpansionDetails;
