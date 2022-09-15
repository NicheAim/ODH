import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Avatar from 'material-ui-next/Avatar';
import teal from 'material-ui-next/colors/teal';
import upperFirst from 'lodash/upperFirst';
import StyledChip from 'components/StyledChip';

function AddedPurposeOfUse(props) {
  const { purpose } = props;
  return (
    <div>
      {purpose.map((pou) => (
        <StyledChip
          key={pou.code}
          label={upperFirst(pou.display)}
          avatar={
            <Avatar>
              <CheckCircleIcon color={teal['500']} />
            </Avatar>
          }
        />
      ))
      }
    </div>
  );
}

AddedPurposeOfUse.propTypes = {
  purpose: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
};

export default AddedPurposeOfUse;
