import React from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Avatar from 'material-ui-next/Avatar';
import teal from 'material-ui-next/colors/teal';
import upperFirst from 'lodash/upperFirst';
import StyledChip from 'components/StyledChip';

function AddedMedicalInformation(props) {
  const { medicalInformation } = props;
  return (
    <div>
      {medicalInformation.map((info) => (
        <StyledChip
          key={info.code}
          label={upperFirst(info.display)}
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

AddedMedicalInformation.propTypes = {
  medicalInformation: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
};

export default AddedMedicalInformation;
