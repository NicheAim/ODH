/**
 *
 * ControlledAccordion
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui-next/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpansionPanel, {
  ExpansionPanelActions,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui-next/ExpansionPanel';

import FullWidthPanelDetails from './FullWidthPanelDetails';


class ControlledAccordion extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      expansionPanelOpen: false,
    };
    this.handlePanelOpen = this.handlePanelOpen.bind(this);
  }

  handlePanelOpen() {
    this.setState({ expansionPanelOpen: !this.state.expansionPanelOpen });
  }

  render() {
    const { expandIcon, accordionTitle, children } = this.props;
    return (
      <div>
        <ExpansionPanel expanded={this.state.expansionPanelOpen}>
          <ExpansionPanelSummary expandIcon={expandIcon}>
            {this.state.expansionPanelOpen ?
              <ExpandLessIcon onClick={this.handlePanelOpen} /> :
              <ExpandMoreIcon onClick={this.handlePanelOpen} />
            }
            {accordionTitle}
          </ExpansionPanelSummary>
          <Divider light />
          {children}
        </ExpansionPanel>
      </div>
    );
  }
}

ControlledAccordion.propTypes = {
  expandIcon: PropTypes.node,
  accordionTitle: PropTypes.node.isRequired,
  children: PropTypes.shape({
    type: PropTypes.oneOf([ExpansionPanelDetails, FullWidthPanelDetails, ExpansionPanelActions]),
  }),
};

export default ControlledAccordion;
