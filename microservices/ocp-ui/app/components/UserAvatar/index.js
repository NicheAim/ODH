/**
 *
 * UserAvatar
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'material-ui/Avatar';
import maleAvatar from 'images/user-male-avatar.png';
import femaleAvatar from 'images/user-female-avatar.png';
import genericAvatar from 'images/user-generic-avatar.png';


const genderCodes = ['male', 'female', 'other', 'unknown'];

function getPatientAvatarByGender(genderCode) {
  switch (genderCode) {
    case 'male':
      return maleAvatar;
    case 'female':
      return femaleAvatar;
    default:
      return genericAvatar;
  }
}

function UserAvatar(props) {
  const { genderCode, size } = props;
  const avatar = getPatientAvatarByGender(genderCode);
  return (
    <Avatar size={size} src={avatar} />
  );
}

UserAvatar.propTypes = {
  genderCode: PropTypes.oneOf(genderCodes),
  size: PropTypes.number,
};

UserAvatar.defaultProps = {
  genderCode: 'unknown',
  size: 45,
};

export default UserAvatar;
