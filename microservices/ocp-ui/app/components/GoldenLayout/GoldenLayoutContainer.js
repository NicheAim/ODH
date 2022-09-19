import styled from 'styled-components';
import PropTypes from 'prop-types';

const GoldenLayoutContainer = styled.div`
  /* Main golden layout container */
  & .lm_goldenlayout {
    background: transparent !important;
  }

  /* Set height considering app bar height */
  & .lm_controls {
    margin-top: 10px;
  }

  & .lm_header + .lm_items {
    background: ${(props) => props.secondaryColor};
    border: 1px solid #3275c1;
    border-top: 0;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  & .lm_header {
    height: 30px !important;
  }

  & .lm_header + .lm_items,
  .lm_item_container {
    width: auto !important;
    height: ${(props) => props.contentHeight};
  }

  & .lm_root {
    height: ${(props) => props.containerHeight};
    width: ${(props) => props.containerWidth};
  }

  /* Enable scroll content */
  & .lm_content {
    overflow: auto;
    max-height: 98%;
    border-top: 1px solid #3275c1;
    border-bottom: 0 !important;
    border-left: 0 !important;
    border-right: 0 !important;
    background: transparent;
  }

  & .lm_tab {
    height: 18px !important;
    margin-top: 5px !important;
    border-radius: 5px;
    border: 1px solid #3275c1 !important;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    box-shadow: none !important;
  }

  & .lm_tab.lm_active {
    color: ${(props) => props.secondaryColor};
    background: #3275c1;
    font-size: 13px;
    font-family: Arial Bold, Arial, sans-serif;
  }

  & .lm_tab.lm_active:hover,
  .lm_tab:hover {
    color: ${(props) => props.secondaryColor};
    font-size: 13px;
    background: #099;
  }

  & .lm_title {
    text-transform: uppercase;
  }

  & .ui-hide { /* class used to move things off the screen but not hide them, this is for 508 compliance */
    position: absolute !important;
    left: -999999px !important;
    height: 0 !important;
    top: 0;
    padding: 0 !important;
    margin: 0 !important;
  }
`;

GoldenLayoutContainer.propTypes = {
  containerHeight: PropTypes.string,
  containerWidth: PropTypes.string,
  contentHeight: PropTypes.string,
  primaryColor: PropTypes.string,
  secondaryColor: PropTypes.string,
};

GoldenLayoutContainer.defaultProps = {
  containerHeight: 'calc(100vh - 75px)',
  containerWidth: '100vw',
  primaryColor: '#33666f',
  secondaryColor: '#ffffff',
  contentHeight: 'auto',
};

export default GoldenLayoutContainer;
