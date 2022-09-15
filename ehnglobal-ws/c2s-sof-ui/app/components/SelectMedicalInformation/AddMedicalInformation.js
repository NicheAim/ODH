import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Cell, Grid } from 'styled-css-grid';
import { FormControlLabel, FormGroup } from 'material-ui-next/Form';
import Checkbox from 'material-ui-next/Checkbox';
import upperFirst from 'lodash/upperFirst';
import isEqual from 'lodash/isEqual';

import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledRaisedButton from 'components/StyledRaisedButton';
import { SHARE_ALL, SHARE_SPECIFIC } from './constants';
import messages from './messages';

class AddMedicalInformation extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { arrayHelpers, shareType, securityLabels } = this.props;
    if (isEqual(shareType, SHARE_ALL)) {
      const selectedAll = securityLabels.map((securityLabel) => ({
        code: securityLabel.code,
        display: securityLabel.display,
      }));
      arrayHelpers.form.setFieldValue(arrayHelpers.name, selectedAll);
    }
  }

  handleChange(event, medicalInfo, medicalInfoCodes) {
    if (event.target.checked) {
      this.props.arrayHelpers.push({
        code: medicalInfo.code,
        display: medicalInfo.display,
      });
    } else {
      const index = medicalInfoCodes.indexOf(medicalInfo.code);
      this.props.arrayHelpers.remove(index);
    }
  }

  render() {
    const { medicalInformation, securityLabels, shareType, onCloseDialog } = this.props;
    const medicalInfoCodes = medicalInformation.map((medicalInfo) => medicalInfo.code);
    return (
      <Grid columns={1}>
        <Cell>
          {securityLabels.map((securityLabel) => (
            <FormGroup key={securityLabel.code}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    value={securityLabel.code}
                    checked={medicalInfoCodes.includes(securityLabel.code)}
                    onChange={(event) => this.handleChange(event, securityLabel, medicalInfoCodes)}
                    disabled={isEqual(shareType, SHARE_ALL)}
                  />
                }
                label={upperFirst(securityLabel.display)}
              />
            </FormGroup>
          ))}
        </Cell>
        <Cell>
          <HorizontalAlignment position="end">
            <StyledRaisedButton fullWidth onClick={onCloseDialog}>
              <FormattedMessage {...messages.okButton} />
            </StyledRaisedButton>
          </HorizontalAlignment>
        </Cell>
      </Grid>
    );
  }
}

AddMedicalInformation.propTypes = {
  onCloseDialog: PropTypes.func.isRequired,
  shareType: PropTypes.oneOf([SHARE_ALL, SHARE_SPECIFIC]),
  arrayHelpers: PropTypes.shape({
    form: PropTypes.shape({
      setFieldValue: PropTypes.func.isRequired,
    }).isRequired,
    name: PropTypes.string.isRequired,
    push: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }).isRequired,
  medicalInformation: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
  securityLabels: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
};

export default AddMedicalInformation;
