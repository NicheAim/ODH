import isEmpty from 'lodash/isEmpty';
import identity from 'lodash/identity';

import Util from 'utils/Util';
import { EMAIL_SYSTEM, PHONE_SYSTEM } from 'utils/constants';
import { combineAddress } from 'containers/App/helpers';

export function flattenContact(contact) {
  let flattenedContact = null;
  if (!isEmpty(contact)) {
    const { name: { firstName, lastName }, telecoms, address } = contact;
    flattenedContact = {
      ...contact,
      name: `${firstName} ${lastName}`,
      telecoms: combineTelecoms(telecoms),
      address: combineAddress(address),
    };
  }
  return flattenedContact;
}

function combineTelecoms(telecoms) {
  const phone = telecoms && telecoms
    .filter((telecom) => Util.equalsIgnoreCase(telecom.system, PHONE_SYSTEM))
    .map((telecom) => telecom.value)
    .pop();

  const email = telecoms && telecoms
    .filter((telecom) => Util.equalsIgnoreCase(telecom.system, EMAIL_SYSTEM))
    .map((telecom) => telecom.value)
    .pop();
  return [`Email: ${email}`, `Phone: ${phone}`].filter(identity).join('\n');
}
