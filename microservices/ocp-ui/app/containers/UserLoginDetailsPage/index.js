/**
 *
 * UserLoginDetailsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { LinearProgress } from 'material-ui-next/Progress';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import uniqueId from 'lodash/uniqueId';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import InfoSection from 'components/InfoSection';
import { getUserLoginDetails } from './actions';
import makeSelectUserLoginDetailsPage from './selectors';
import reducer from './reducer';
import saga from './saga';


export class UserLoginDetailsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
    };
    this.onDocumentLoadSuccess = this.onDocumentLoadSuccess.bind(this);
  }

  componentDidMount() {
    this.props.getUserLoginDetails();
  }

  onDocumentLoadSuccess({ numPages }) {
    this.setState({ numPages });
  }

  render() {
    const { userLoginDetails: { data } } = this.props;
    return (
      <div>
        <Helmet>
          <title>Sample User Login Details</title>
          <meta name="description" content="Sample User Login Details page of Omnibus Care Plan application" />
        </Helmet>
        {data && data.encodedPdf ?
          <InfoSection margin="10px 0">
            <Document
              loading={<LinearProgress />}
              file={`data:application/pdf;base64,${data.encodedPdf}`}
              onLoadSuccess={this.onDocumentLoadSuccess}
            >
              {
                Array.from(
                  new Array(this.state.numPages),
                  (el, index) => (
                    <Page key={uniqueId()} pageNumber={index + 1} scale={2} renderMode="svg" />
                  ))
              }
            </Document>
          </InfoSection> : <LinearProgress />
        }
      </div>
    );
  }
}

UserLoginDetailsPage.propTypes = {
  getUserLoginDetails: PropTypes.func.isRequired,
  userLoginDetails: PropTypes.shape({
    encodedPdf: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  userLoginDetails: makeSelectUserLoginDetailsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    getUserLoginDetails: () => dispatch(getUserLoginDetails()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'userLoginDetailsPage', reducer });
const withSaga = injectSaga({ key: 'userLoginDetailsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UserLoginDetailsPage);
