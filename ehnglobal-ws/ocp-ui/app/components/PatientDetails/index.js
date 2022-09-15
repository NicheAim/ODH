/**
 *
 * PatientDetails
 *
 */

import has from 'lodash/has';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Flag from '@material-ui/icons/Flag';
import PatientBannerSection from 'components/PatientBannerSection';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledIconButton from 'components/StyledIconButton';
import StyledText from 'components/StyledText';
import StyledTooltip from 'components/StyledTooltip';
import UserAvatar from 'components/UserAvatar';
// TODO: cambiar esta declaracion
import { getObservation } from 'containers/App/api';
import {
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  MANAGE_PATIENT_URL,
  ORGANIZATION_ADMIN_ROLE_CODE,
  PCP_ROLE_CODE,
} from 'containers/App/constants';
import ShowHideWrapper from 'containers/ShowHideWrapper';
import { uniqueId } from 'lodash';
import upperFirst from 'lodash/upperFirst';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Cell, Grid } from 'styled-css-grid';
import { env_vars } from '../../../env';
import { maskSsn } from '../../containers/App/helpers';
import ExpansionDetails from './ExpansionDetails';
import messages from './messages';
import StyledExpansionDetails from './StyledExpansionDetails';

const MEDICAID_ID_SYSTEM =
  env_vars.REACT_APP_PATIENT_IDENTIFIER_MEDICAID_ID_SYSTEM;

class PatientDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expansionPanelOpen: false,
      silcode: '',
    };
    this.handlePanelOpen = this.handlePanelOpen.bind(this);
    this.getSilCode = this.getSilCode.bind(this);
  }

  componentDidMount() {
    // getObservation(this.props.patient.id).then((data) => {
    //   if (data && data.elements.length > 0) {
    //     console.log('sil');
    //     console.log(data.elements);
    //     const filterobs = data.elements.filter((a) => {
    //       if (
    //         a.valueCodeableConcept === undefined ||
    //         a.valueCodeableConcept.text === undefined
    //       )
    //         return false;
    //       return a.valueCodeableConcept.text.includes('sil');
    //     });
    //     if (filterobs.length > 0) {
    //       const filtermap = filterobs.map((a) => a.valueCodeableConcept);
    //       this.setState({ silcode: filtermap[0].coding[0].code });
    //     }
    //   }
    // });
  }

  getSilCode(patient) {
    if (has(patient, 'sil') && patient.sil !== null) {
      if (
        has(patient.sil, 'valueCodeableConcept') &&
        patient.sil.valueCodeableConcept !== null
      ) {
        if (
          has(patient.sil.valueCodeableConcept, 'coding') &&
          patient.sil.valueCodeableConcept.coding !== null &&
          patient.sil.valueCodeableConcept.coding.length > 0
        ) {
          const silCoding = patient.sil.valueCodeableConcept.coding[0];
          if (silCoding && has(silCoding, 'code')) {
            return silCoding.code;
          }
        }
      }
    }
    return '';
  }

  handlePanelOpen() {
    this.setState({ expansionPanelOpen: !this.state.expansionPanelOpen });
  }

  render() {
    const { patient, flattenPatientData, emergencyContact } = this.props;
    const flattenPatient = flattenPatientData(patient);
    const { id, name, phones, genderCode, flags, active } = flattenPatient;
    const medicaid = patient.identifier.find((obj) => {
      return obj.system === MEDICAID_ID_SYSTEM;
    });
    return (
      <PatientBannerSection>
        <Grid columns="0.1fr 0.1fr repeat(2, 1fr) 1fr 1fr 1fr 1fr">
          <Cell middle center>
            <StyledTooltip
              title={<FormattedMessage {...messages.viewDetails} />}
              placement="bottom"
            >
              <StyledIconButton
                svgIconSize="large"
                size="x-small"
                onClick={this.handlePanelOpen}
              >
                {this.state.expansionPanelOpen ? (
                  <ExpandLessIcon />
                ) : (
                  <ExpandMoreIcon />
                )}
              </StyledIconButton>
            </StyledTooltip>
          </Cell>
          <Cell>
            <UserAvatar genderCode={genderCode} />
          </Cell>
          <Cell middle>
            <StyledText>
              <FormattedMessage {...messages.name} />
              <StyledText whiteSpace fontWeight="700">
                {name}
              </StyledText>
            </StyledText>
          </Cell>
          <Cell middle>
            <StyledText>
              <FormattedMessage {...messages.gender} />
              <StyledText whiteSpace fontWeight="700">
                {upperFirst(genderCode)}
              </StyledText>
            </StyledText>
          </Cell>
          <Cell middle>
            <StyledText>
              <FormattedMessage {...messages.phone} />
              <StyledText whiteSpace fontWeight="700">
                {phones}
              </StyledText>
            </StyledText>
          </Cell>
          <Cell middle>
            <StyledText>
              <FormattedMessage {...messages.sil} />
              <StyledText whiteSpace fontWeight="700">
                {this.getSilCode(patient)}
              </StyledText>
            </StyledText>
          </Cell>
          <Cell middle>
            <StyledText>
              <FormattedMessage {...messages.medicalId} />
              <StyledText whiteSpace fontWeight="700">
                {medicaid && medicaid.value && maskSsn(medicaid.value)}
              </StyledText>
            </StyledText>
          </Cell>
          {/*{active === true && <Cell middle>*/}
          {/*  <StyledText>*/}
          {/*    <StyledIconButton size="small" svgIconSize="large" disableIconHover>*/}
          {/*      <CheckCircle />*/}
          {/*    </StyledIconButton>*/}
          {/*     <StyledText whiteSpace fontWeight="700">*/}
          {/*      <FormattedMessage {...messages.eligible} />*/}
          {/*    </StyledText>*/}
          {/*  </StyledText>*/}
          {/*</Cell> }*/}
          {/*{active === false && <Cell middle>*/}
          {/*  <StyledText>*/}
          {/*    <StyledIconButton size="small" svgIconSize="large" disableIconHover>*/}
          {/*      <CancelCircle />*/}
          {/*    </StyledIconButton>*/}
          {/*     <StyledText whiteSpace fontWeight="700">*/}
          {/*      <FormattedMessage {...messages.ineligible} />*/}
          {/*    </StyledText>*/}
          {/*  </StyledText>*/}
          {/*</Cell> }*/}

          {flags && flags.length > 0 && (
            <Cell middle>
              <ShowHideWrapper
                allowedRoles={[
                  ORGANIZATION_ADMIN_ROLE_CODE,
                  CARE_COORDINATOR_ROLE_CODE,
                  CARE_MANAGER_ROLE_CODE,
                  PCP_ROLE_CODE,
                ]}
              >
                <StyledFlatButton
                  color="primary"
                  component={Link}
                  to={`${MANAGE_PATIENT_URL}/${id}`}
                >
                  <StyledIconButton
                    size="small"
                    svgIconSize="large"
                    disableIconHover
                  >
                    <Flag />
                  </StyledIconButton>
                  <FormattedMessage {...messages.advisory} />
                </StyledFlatButton>
              </ShowHideWrapper>
            </Cell>
          )}
        </Grid>
        <StyledExpansionDetails expanded={this.state.expansionPanelOpen}>
          <ExpansionDetails
            key={uniqueId()}
            patient={flattenPatient}
            emergencyContact={emergencyContact}
          />
        </StyledExpansionDetails>
      </PatientBannerSection>
    );
  }
}

PatientDetails.propTypes = {
  patient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.array,
  }),
  flattenPatientData: PropTypes.func.isRequired,
};

export default PatientDetails;
