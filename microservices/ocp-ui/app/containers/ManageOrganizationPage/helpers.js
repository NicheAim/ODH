import Util from 'utils/Util';
import { EMAIL_SYSTEM, PHONE_SYSTEM } from 'utils/constants';

export function mapToFrontendContacts(contacts) {
  return contacts && contacts.map((contact) => {
    const {
      name: { firstName, lastName },
      purpose,
      telecoms,
      address: { line1, line2, city, stateCode, postalCode, countryCode },
    } = contact;
    const phone = telecoms && telecoms
      .filter((telecom) => Util.equalsIgnoreCase(telecom.system, PHONE_SYSTEM))
      .map((telecom) => telecom.value)
      .pop();

    const email = telecoms && telecoms
      .filter((telecom) => Util.equalsIgnoreCase(telecom.system, EMAIL_SYSTEM))
      .map((telecom) => telecom.value)
      .pop();
    return {
      firstName,
      lastName,
      purpose,
      phone,
      email,
      line1,
      line2,
      city,
      stateCode,
      postalCode,
      countryCode,
    };
  });
}
