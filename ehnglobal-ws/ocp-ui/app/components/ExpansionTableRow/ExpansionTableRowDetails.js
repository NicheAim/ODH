/**
 *
 * ExpansionTableRowDetails
 *
 */

import React from 'react';
import PropType from 'prop-types';
import sizeMe from 'react-sizeme';


function ExpansionTableRowDetails(props) {
  return (<div>{props.children}</div>);
}

ExpansionTableRowDetails.propTypes = {
  children: PropType.node.isRequired,
};

// Create the config for SizeMe
const config = {
  monitorWidth: false,
  monitorHeight: true,
  refreshRate: 250,
};

// Call SizeMe with the config to get back the HOC.
const sizeMeHOC = sizeMe(config);

export default sizeMeHOC(ExpansionTableRowDetails);
