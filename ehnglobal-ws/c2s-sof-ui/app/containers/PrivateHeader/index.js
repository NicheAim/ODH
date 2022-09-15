/**
 *
 * PrivateHeader
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { CircularProgress } from 'material-ui-next/Progress';
import common from 'material-ui-next/colors/common';
import { makeSelectUser } from 'containers/App/contextSelectors';
import StyledText from 'components/StyledText';
import StyledToolbar from 'components/StyledToolbar';
import UserAvatar from 'components/UserAvatar';
import StyledImage from 'components/StyledImage';
import c2sBrandImg from 'images/c2s-logo.png';
import HomeButton from './HomeButton';
import { mapUserName } from './helpers';
import messages from './messages';

function PrivateHeader(props) {
  const { user } = props;
  console.log("PrivateHeader( user:", user);
  return (
    <div>
      {user && user.fhirResource ?
        <StyledToolbar color={common.white} height="60px">
          <ToolbarGroup>
            <UserAvatar />
            <ToolbarTitle
              text={
                <StyledText fontWeight={600} whiteSpace fontSize="18px">
                  {mapUserName(user.fhirResource.name)}
                </StyledText>
              }
            />
          </ToolbarGroup>
          <ToolbarGroup>
            <StyledImage
              height="35px"
              width="40px"
              src={c2sBrandImg}
              alt={<FormattedMessage {...messages.brandImg} />}
            />
            <HomeButton component={Link} to="/c2s-sof-ui/home">
              <FormattedMessage {...messages.homeButton} />
            </HomeButton>
          </ToolbarGroup>
        </StyledToolbar> :
        <CircularProgress />
      }
    </div>
  );
}

PrivateHeader.propTypes = {
  user: PropTypes.shape({
    fhirResource: PropTypes.shape({
      name: PropTypes.array,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
)(PrivateHeader);
