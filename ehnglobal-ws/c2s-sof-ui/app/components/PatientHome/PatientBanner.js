import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import upperFirst from 'lodash/upperFirst';

import PatientBannerSection from 'components/PatientBannerSection';
import TextLabelGroup from 'components/TextLabelGroup';
import UserAvatar from 'components/UserAvatar';
import Padding from 'components/Padding';
import StyledText from 'components/StyledText';
import { flattenPatientData } from './helpers';
import messages from './messages';


function PatientBanner(props) {
  const { patient } = props;
  const flattenedPatient = flattenPatientData(patient);
  const { name, identifier, birthDate, genderCode, mrn } = flattenedPatient;
  return (
    <PatientBannerSection>
      <Padding left={10} right={10} top={10} bottom={10}>
        <Grid columns="5% 95%">
          <Cell>
            <UserAvatar size={65} genderCode={patient.genderCode} />
          </Cell>
          <Cell>
            <Grid columns={1}>
              <Cell>
                <StyledText fontSize="20px" fontWeight={700}>{name}</StyledText>
              </Cell>
              <Cell>
                <Grid columns={5}>
                  <Cell>
                    <TextLabelGroup
                      label={<FormattedMessage {...messages.patientBanner.identifier} />}
                      text={identifier}
                    />
                  </Cell>
                  <Cell>
                    <TextLabelGroup
                      label={<FormattedMessage {...messages.patientBanner.mrn} />}
                      text={mrn}
                    />
                  </Cell>
                  <Cell>
                    <TextLabelGroup
                      label={<FormattedMessage {...messages.patientBanner.birthDate} />}
                      text={birthDate}
                    />
                  </Cell>
                  <Cell>
                    <TextLabelGroup
                      label={<FormattedMessage {...messages.patientBanner.gender} />}
                      text={upperFirst(genderCode)}
                    />
                  </Cell>
                </Grid>
              </Cell>
            </Grid>
          </Cell>
        </Grid>
      </Padding>
    </PatientBannerSection>
  );
}

PatientBanner.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }).isRequired,
};

export default PatientBanner;
