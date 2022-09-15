/**
 *
 * ConsentOptionsVisibility
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import includes from 'lodash/includes';
import upperCase from 'lodash/upperCase';
import { CONSENT_STATUS_ACTIVE, CONSENT_STATUS_DRAFT, CONSENT_STATUS_INACTIVE } from './constants';


const consentStatuses = [CONSENT_STATUS_DRAFT, CONSENT_STATUS_ACTIVE, CONSENT_STATUS_INACTIVE];

export function ConsentOptionsVisibility(props) {
  const { allowedStatuses, consentStatus, children } = props;
  const isAllowedView = includes(allowedStatuses, upperCase(consentStatus));
  return (
    isAllowedView &&
    <div>{children}</div>
  );
}

ConsentOptionsVisibility.propTypes = {
  allowedStatuses: PropTypes.oneOfType([
    PropTypes.oneOf(consentStatuses).isRequired,
    PropTypes.arrayOf(
      PropTypes.oneOf(consentStatuses).isRequired,
    ),
  ]).isRequired,
  children: PropTypes.node,
  consentStatus: PropTypes.string.isRequired,
};

ConsentOptionsVisibility.defaultProps = {
  allowedStatuses: [],
};

export default ConsentOptionsVisibility;
