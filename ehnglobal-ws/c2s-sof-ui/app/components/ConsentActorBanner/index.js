/**
 *
 * ConsentActorBanner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Cell, Grid } from 'styled-css-grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import teal from 'material-ui-next/colors/teal';

import Padding from 'components/Padding';
import StyledIconButton from 'components/StyledIconButton';
import StyledText from 'components/StyledText';
import Banner from './Banner';
import BannerHeaderCell from './BannerHeaderCell';


class ConsentActorBanner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowAddActor: true,
    };
  }

  render() {
    const { actor, flattenActorData, onSelectActor, isActorSelected } = this.props;
    const flattenedActor = flattenActorData(actor);
    const { name, identifiers, addresses, telecoms } = flattenedActor;
    return (
      <Banner>
        <Grid columns={1}>
          <BannerHeaderCell>
            <Grid columns="93% 7%">
              <Cell>
                <StyledText fontWeight={600}>
                  {name}
                  <StyledText whiteSpace fontWeight={600}>[ {identifiers} ]</StyledText>
                </StyledText>
              </Cell>
              <Cell>
                <StyledIconButton
                  size="x-small"
                  svgIconSize="small"
                  disableIconHover
                  onClick={() => {
                    onSelectActor(actor);
                    this.setState({ isShowAddActor: !this.state.isShowAddActor });
                  }}
                  disabled={isActorSelected || !this.state.isShowAddActor}
                >
                  <AddCircleIcon
                    color={(isActorSelected || !this.state.isShowAddActor) ? 'rgba(0, 0, 0, 0.3)' : teal['500']}
                  />
                </StyledIconButton>
              </Cell>
            </Grid>
          </BannerHeaderCell>
          <Padding left={2} right={2}>
            <Cell>
              {addresses}
            </Cell>
            <Cell>
              {telecoms}
            </Cell>
          </Padding>
        </Grid>
      </Banner>
    );
  }
}

ConsentActorBanner.propTypes = {
  onSelectActor: PropTypes.func.isRequired,
  isActorSelected: PropTypes.bool.isRequired,
  flattenActorData: PropTypes.func.isRequired,
  actor: PropTypes.shape({
    name: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
    ]).isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
    addresses: PropTypes.arrayOf(PropTypes.shape({
      line1: PropTypes.string,
      line2: PropTypes.string,
      city: PropTypes.string,
      stateCode: PropTypes.string,
      postalCode: PropTypes.string,
      countryCode: PropTypes.string,
      use: PropTypes.string,
    })),
    telecoms: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
      use: PropTypes.string,
    })),
  }).isRequired,
};

export default ConsentActorBanner;
