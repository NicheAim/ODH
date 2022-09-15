import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { FormControlLabel, FormGroup } from 'material-ui-next/Form';
import Checkbox from 'material-ui-next/Checkbox';
import { Cell, Grid } from 'styled-css-grid';
import uniqueId from 'lodash/uniqueId';
import upperFirst from 'lodash/upperFirst';

import HorizontalAlignment from 'components/HorizontalAlignment';
import StyledRaisedButton from 'components/StyledRaisedButton';
import messages from './messages';

class AddPurposeOfUse extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, purpose, purposeCodes) {
    if (event.target.checked) {
      this.props.arrayHelpers.push({
        code: purpose.code,
        display: purpose.display,
      });
    } else {
      const index = purposeCodes.indexOf(purpose.code);
      this.props.arrayHelpers.remove(index);
    }
  }

  render() {
    const { purposeOfUse, purpose, onCloseDialog } = this.props;
    const purposeCodes = purpose.map((pou) => pou.code);
    return (
      <Grid columns={1}>
        <Cell>
          <HorizontalAlignment position="end">
            <StyledRaisedButton fullWidth onClick={onCloseDialog}>
              <FormattedMessage {...messages.okButton} />
            </StyledRaisedButton>
          </HorizontalAlignment>
        </Cell>
        <Cell>
          {purposeOfUse && purposeOfUse.map((pou) => (
            <FormGroup key={uniqueId()}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    value={pou.code}
                    checked={purposeCodes && purposeCodes.includes(pou.code)}
                    onChange={(event) => this.handleChange(event, pou, purposeCodes)}
                  />
                }
                label={upperFirst(pou.display)}
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

AddPurposeOfUse.propTypes = {
  purposeOfUse: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string.isRequired,
  })).isRequired,
  onCloseDialog: PropTypes.func.isRequired,
  arrayHelpers: PropTypes.shape({
    push: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
  }).isRequired,
  purpose: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
};

export default AddPurposeOfUse;
