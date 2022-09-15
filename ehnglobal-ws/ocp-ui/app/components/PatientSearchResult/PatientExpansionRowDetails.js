import InfoSection from 'components/InfoSection';
import TextLabelGroup from 'components/TextLabelGroup';
import isUndefined from 'lodash/isUndefined';
import toLower from 'lodash/toLower';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import messages from './messages';

function PatientExpansionRowDetails({ patient }) {
  const { addresses, name, identifier, telecoms, episodeOfCares, birthDate, genderDisplayString, birthSex, activityTypes, organizations, active, mrn } = patient;

  const getPatientOrganization = (patientOrganizations) => {
    if (patientOrganizations) {
      if (patientOrganizations.length > 0) {
        return patientOrganizations[0].display;
      }
    }
    return '';
  };

  let birthSexDisplay = 'Not Available';
  if (!isUndefined(birthSex) && birthSex !== null) {
    if (toLower(birthSex) === 'f' || toLower(birthSex) === 'female') {
      birthSexDisplay = 'Female';
    } else if (toLower(birthSex) === 'm' || toLower(birthSex) === 'male') {
      birthSexDisplay = 'Male';
    }
  }

  return (
    <InfoSection>
      <Grid columns={'60% 40%'} justifyContent="space-between">
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.name} />}
            text={name}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.identifiers} />}
            text={identifier}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.addresses} />}
            text={addresses}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.telecoms} />}
            text={telecoms}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.patientStatus} />}
            text={active ?
              <FormattedMessage {...messages.active} /> :
              <FormattedMessage {...messages.inactive} />
            }
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.dob} />}
            text={birthDate}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.gender} />}
            text={genderDisplayString}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.birthSex} />}
            text={birthSexDisplay}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.eocStatus} />}
            text={episodeOfCares && episodeOfCares.map((eoc) => (
                `${eoc.typeDisplay} - ${eoc.statusDisplay}`
              ),
            ).join('\n ')}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.activeTasks} />}
            text={activityTypes && activityTypes.map((type) => (
                `${type}`
              ),
            ).join('\n ')}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.managingOrganization} />}
            text={getPatientOrganization(organizations)}
          />
        </Cell>
        <Cell>
          <TextLabelGroup
            label={<FormattedMessage {...messages.expansionRowDetails.mrn} />}
            text={mrn}
          />
        </Cell>
      </Grid>
    </InfoSection>
  );
}

PatientExpansionRowDetails.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    identifier: PropTypes.string,
    active: PropTypes.bool,
    name: PropTypes.string.isRequired,
    addresses: PropTypes.string,
    telecoms: PropTypes.string,
    birthDate: PropTypes.string,
    genderDisplayString: PropTypes.string,
    birthSex: PropTypes.string,
    activityTypes: PropTypes.array,
  }).isRequired,
};

export default PatientExpansionRowDetails;
