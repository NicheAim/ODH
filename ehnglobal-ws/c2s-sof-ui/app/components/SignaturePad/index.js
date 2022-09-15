/**
 *
 * SignaturePad
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Button from 'material-ui-next/Button';
import SignaturePadWrapper from 'react-signature-pad-wrapper';
import { Cell, Grid } from 'styled-css-grid';

import PanelSection from 'components/PanelSection';
import StyledRaisedButton from 'components/StyledRaisedButton';
import SelectPenColor from './SelectPenColor';
import SignatureErrorText from './SignatureErrorText';
import messages from './messages';


class SignaturePad extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      hasSigned: true,
    };
    this.handleClearSignature = this.handleClearSignature.bind(this);
    this.handleSign = this.handleSign.bind(this);
    this.handleSelectColor = this.handleSelectColor.bind(this);
  }

  handleClearSignature() {
    this.signaturePad.clear();
  }

  handleSign() {
    if (this.signaturePad.isEmpty()) {
      this.setState({ hasSigned: false });
    } else {
      this.setState({ hasSigned: true });
      this.props.onSaveSignature(this.signaturePad.toDataURL());
    }
  }

  handleSelectColor(color) {
    this.signaturePad.penColor = color;
  }

  render() {
    return (
      <div>
        <PanelSection>
          <SignaturePadWrapper ref={(ref) => (this.signaturePad = ref)} />
        </PanelSection>
        <Grid columns={3} gap="10px">
          <Cell>
            <Button
              variant="raised"
              fullWidth
              onClick={this.handleClearSignature}
            >
              <FormattedMessage {...messages.clearButton} />
            </Button>
          </Cell>
          <Cell>
            <SelectPenColor onSelectedColor={this.handleSelectColor} />
          </Cell>
          <Cell>
            <StyledRaisedButton fullWidth onClick={this.handleSign}>
              <FormattedMessage {...messages.signButton} />
            </StyledRaisedButton>
          </Cell>
        </Grid>
        {!this.state.hasSigned &&
        <SignatureErrorText>
          <FormattedMessage {...messages.signErrorMessage} />
        </SignatureErrorText>
        }
      </div>
    );
  }
}

SignaturePad.propTypes = {
  onSaveSignature: PropTypes.func.isRequired,
};

export default SignaturePad;
