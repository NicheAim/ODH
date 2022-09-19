import isEmpty from 'lodash/isEmpty';
import { EMPTY_STRING } from '../containers/App/constants';
import Util from './Util';

const ORGANIZATION_TYPE = 'organization';

export const mapParticipantName = (participant) => {
  if (participant && participant.memberType && Util.equalsIgnoreCase(participant.memberType, ORGANIZATION_TYPE)) {
    return participant.memberName;
  }
  const firstName = isEmpty(participant.memberFirstName) ? EMPTY_STRING : participant.memberFirstName;
  const lastName = isEmpty(participant.memberLastName) ? EMPTY_STRING : participant.memberLastName;
  return `${firstName} ${lastName}`;
};

export const mapSearchParticipantName = (participant) => {
  if (participant && participant.member && Util.equalsIgnoreCase(participant.member.type, ORGANIZATION_TYPE)) {
    return participant.member.name;
  }
  const firstName = isEmpty(participant.member.firstName) ? EMPTY_STRING : participant.member.firstName;
  const lastName = isEmpty(participant.member.lastName) ? EMPTY_STRING : participant.member.lastName;
  return `${firstName} ${lastName}`;
};
