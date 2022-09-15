/**
 *
 * PrivateLayout
 *
 */

import PrivateHeader from 'components/PrivateHeader';
import PrivateNavigation from 'components/PrivateNavigation';
import StyledImage from 'components/StyledImage';
import brandImg from 'images/omnibus-care-plan-logo.png';
import PropTypes from 'prop-types';
import React from 'react';
import { Cell, Grid } from 'styled-css-grid';
import { BRAND_IMAGE } from './constants';
import ContentContainer from './ContentContainer';
import HeaderContainer from './HeaderContainer';
import HeaderGrid from './HeaderGrid';
import LayoutGrid from './LayoutGrid';

function PrivateLayout(props) {
  return (
    <LayoutGrid columns={1}>
      <HeaderContainer>
        <HeaderGrid columns={'100px 1fr'} alignContent="end">
          <Cell>
            <StyledImage
              height="50px"
              width="95px"
              src={brandImg}
              alt={BRAND_IMAGE}
            />
          </Cell>
          {props.user.role && (
            <Cell>
              <Grid columns={2}>
                <Cell top={2}>
                  <PrivateNavigation
                    user={props.user}
                    getLinkUrlByRole={props.getLinkUrlByRole}
                  />
                </Cell>
                <Cell left={3} top={2}>
                  <PrivateHeader
                    user={props.user}
                    organization={props.organization}
                  />
                </Cell>
              </Grid>
            </Cell>
          )}
        </HeaderGrid>
      </HeaderContainer>
      <ContentContainer>
        <main>{props.children}</main>
        {props.tokenTimmer}
      </ContentContainer>
    </LayoutGrid>
  );
}

PrivateLayout.propTypes = {
  children: PropTypes.node,
  user: PropTypes.shape({
    role: PropTypes.string,
  }).isRequired,
  organization: PropTypes.object,
  getLinkUrlByRole: PropTypes.func.isRequired,
};

export default PrivateLayout;
