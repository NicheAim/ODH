/**
 *
 * SelectPenColor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Select from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import messages from './messages';


class SelectPenColor extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      color: null,
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(event, index, value) {
    this.setState({ color: value });
    this.props.onSelectedColor(value);
  }

  render() {
    return (
      <div>
        <Select
          value={this.state.color}
          onChange={this.handleSelect}
          fullWidth
          hintText={<FormattedMessage {...messages.switchInkColor} />}
        >
          <MenuItem value="black" primaryText="Black" />
          <MenuItem value="blue" primaryText="Blue" />
        </Select>
      </div>
    );
  }
}

SelectPenColor.propTypes = {
  onSelectedColor: PropTypes.func.isRequired,
};

export default SelectPenColor;
