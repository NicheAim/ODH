/**
 *
 * GoldenLayout
 *
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
// Import Golden Layout Style sheet
import 'golden-layout/src/css/goldenlayout-base.css';
import 'golden-layout/src/css/goldenlayout-light-theme.css';
import initGoldenLayout from './initGoldenLayout';
import GoldenLayoutContainer from './GoldenLayoutContainer';

function generateRandomId() {
  let text = '';
  const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function generateUniqueId() {
  let uniqueId = null;
  while (!uniqueId) {
    const candidateId = generateRandomId();
    if (!document.getElementById(uniqueId)) {
      uniqueId = candidateId;
    }
  }
  return uniqueId;
}

// Note: Do not change component type to React.Component
class GoldenLayout extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.layout = null;
    this.locationRegistry = [];
    this.state = {
      containerId: this.props.containerId || generateUniqueId(),
    };
    this.initLayout = this.initLayout.bind(this);
    this.destroyLayout = this.destroyLayout.bind(this);
    this.registerLocation = this.registerLocation.bind(this);
  }

  componentDidMount() {
    const initLayout = this.initLayout();
    this.layout = initLayout;
  }

  componentDidUpdate() {
    this.destroyLayout();
    const newLayout = this.initLayout();
    this.layout = newLayout;
  }

  componentWillUnmount() {
    this.destroyLayout();
  }

  initLayout() {
    return initGoldenLayout(document.getElementById(this.state.containerId),
      this.props.componentMetadata,
      this.props.stateMetadata,
      this.registerLocation);
  }

  destroyLayout() {
    // TODO: need to implement cleaning up popped out panels as well, because GoldenLayout removes the div, but React is not aware to of this to unmount the component and these components stays orphan
    // Clean up React Components created by Golden Layout callbacks
    this.locationRegistry.forEach((location) => {
      // if the node still exists at known location, unmount React component
      const node = document.getElementById(location);
      if (node) {
        ReactDOM.unmountComponentAtNode(node);
      }
    });
    this.locationRegistry = [];
    if (this.layout) {
      this.layout.destroy();
    }
  }

  registerLocation(location) {
    this.locationRegistry.push(location);
  }

  render() {
    return (
      <GoldenLayoutContainer id={this.state.containerId} containerHeight={this.props.containerHeight} containerWidth={this.props.containerWidth} />
    );
  }
}

GoldenLayout.propTypes = {
  containerId: PropTypes.string,
  containerHeight: PropTypes.string,
  containerWidth: PropTypes.string,
  stateMetadata: PropTypes.shape({
    content: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        content: PropTypes.arrayOf(PropTypes.shape({
          title: PropTypes.string,
          type: PropTypes.string.isRequired,
          componentName: PropTypes.string,
        })),
      })),
    })),
  }),
  componentMetadata: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    factoryMethod: PropTypes.func.isRequired,
  })),
};

export default GoldenLayout;
