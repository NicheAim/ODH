import identity from 'lodash/identity';
import Util from 'utils/Util';

export function flattenContact(contact, contactPurposes) {
  const { firstName, lastName, purpose, email, phone, line1, line2, city, state, postalCode, countryCode } = contact;
  return {
    ...contact,
    name: `${firstName} ${lastName}`,
    purpose: mapToPurposeDisplay(purpose, contactPurposes),
    telecoms: combineTelecoms(email, phone),
    address: combineAddress(line1, line2, city, state, postalCode, countryCode),
  };
}

function mapToPurposeDisplay(purpose, contactPurposes) {
  return contactPurposes && contactPurposes
    .filter((contactPurpose) => Util.equalsIgnoreCase(purpose, contactPurpose.code))
    .map((contactPurpose) => contactPurpose.display)
    .pop();
}

function combineTelecoms(email, phone) {
  return [`Email: ${email}`, `Phone: ${phone}`].filter(identity).join('\n');
}

function combineAddress(line1, line2, city, stateCode, postalCode, countryCode) {
  const firstLineAddress = [line1, line2].filter(identity).join(', ');
  const secondLineAddress = [city, stateCode, postalCode, countryCode].filter(identity).join(', ');
  return [firstLineAddress, secondLineAddress].filter(identity).join('\n');
}
