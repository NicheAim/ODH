/**
 *
 * ColorLegend
 *
 */

import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
import StyledChip from 'components/StyledChip';
import upperFirst from 'lodash/upperFirst';
import Avatar from 'material-ui-next/Avatar';
import PropTypes from 'prop-types';
import React from 'react';

function ColorLegend(props) {
  const { data } = props;
  return (
    <div>
      {
        data && data.map((item) => (
          <StyledChip
            key={item.key}
            label={upperFirst(item.label)}
            avatar={
              <Avatar>
                <FiberManualRecord color={item.color} />
              </Avatar>
            }
          >
          </StyledChip>
        ))
      }
    </div>
  );
}

ColorLegend.propTypes = {
  data: PropTypes.array,
};

export default ColorLegend;
