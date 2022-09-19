/**
 *
 * TextLabelGroup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Cell, Grid } from 'styled-css-grid';
import StyledText from 'components/StyledText';
import HorizontalAlignment from 'components/HorizontalAlignment';

function TextLabelGroup({ label, text, boldLabel, boldText }) {
  return (
    <Grid columns={1} gap="0px">
      <Cell>
        <HorizontalAlignment position="start">
          <StyledText fontWeight={boldLabel && boldLabel ? '700' : '0'}>
            {label}
          </StyledText>
        </HorizontalAlignment>
      </Cell>
      <Cell>
        <HorizontalAlignment position="start">
          <StyledText fontWeight={boldText && boldText ? '700' : '0'}>
            {text}
          </StyledText>
        </HorizontalAlignment>
      </Cell>
    </Grid>
  );
}

TextLabelGroup.propTypes = {
  label: PropTypes.node.isRequired,
  text: PropTypes.node,
  boldLabel: PropTypes.bool,
  boldText: PropTypes.bool,
};

TextLabelGroup.defaultProps = {
  boldLabel: false,
  boldText: true,
};

export default TextLabelGroup;
