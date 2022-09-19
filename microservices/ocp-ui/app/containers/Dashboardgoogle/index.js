// eslint-disable-next-line no-undef
import { compose } from 'redux';
import React from 'react';

export class Dashboardgoogle extends React.Component{
  constructor() {
    super();
    this.state = {
      contentHeight: 856,
    };
    this.handleResize = this.handleResize.bind(this);
    this.onLoad = this.onLoad.bind(this);
  }

  componentWillUnmount() {
    this.container.contentWindow.removeEventListener('resize', this.handleResize);
  }

  onLoad = () => {
    this.container.contentWindow.addEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { body, documentElement } = this.container.contentWindow.document;
    const contentHeight = Math.max(
      body.clientHeight,
      body.offsetHeight,
      body.scrollHeight,
      documentElement.clientHeight,
      documentElement.offsetHeight,
      documentElement.scrollHeight
    );
    if (contentHeight !== this.state.contentHeight) this.setState({ contentHeight });
  }

  render() {
    const { contentHeight } = this.state;
    return (
      <iframe
        title="NAT Dashboard"
        onLoad={this.onLoad}
        ref={(container) => { this.container = container; }}
        scrolling="no"
        src="https://datastudio.google.com/embed/reporting/c70f2942-4bed-4217-9eef-ed46a5fc022d/page/PuflC"
        style={{ width: '100%', height: `${contentHeight}px` }}
      />
    );
  }
}

Dashboardgoogle.propTypes = {};
export default compose()(Dashboardgoogle);
