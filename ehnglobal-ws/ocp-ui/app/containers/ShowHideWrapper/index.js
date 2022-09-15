/**
 *
 * ShowHideWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import includes from 'lodash/includes';

import {
  BENEFITS_SPECIALIST_ROLE_CODE,
  CARE_COORDINATOR_ROLE_CODE,
  CARE_MANAGER_ROLE_CODE,
  FRONT_OFFICE_ROLE_CODE,
  HEALTH_ASSISTANT_ROLE_CODE,
  OCP_ADMIN_ROLE_CODE,
  ORGANIZATION_ADMIN_ROLE_CODE,
  PATIENT_ROLE_CODE,
  PCP_ROLE_CODE,
} from 'containers/App/constants';
import { makeSelectUser } from 'containers/App/contextSelectors';

export const functionalRoles = [
  OCP_ADMIN_ROLE_CODE, CARE_MANAGER_ROLE_CODE, CARE_COORDINATOR_ROLE_CODE, PATIENT_ROLE_CODE, ORGANIZATION_ADMIN_ROLE_CODE,
  PCP_ROLE_CODE, BENEFITS_SPECIALIST_ROLE_CODE, HEALTH_ASSISTANT_ROLE_CODE, FRONT_OFFICE_ROLE_CODE,
];

export function ShowHideWrapper(props) {
  const { allowedRoles, children, user: { role } } = props;
  const isAllowedShow = includes(allowedRoles, role);
  return (
    <div>
      {isAllowedShow ?
        <div>{children}</div>
        : undefined
      }
    </div>
  );
}

ShowHideWrapper.propTypes = {
  allowedRoles: PropTypes.oneOfType([
    PropTypes.oneOf(functionalRoles).isRequired,
    PropTypes.arrayOf(
      PropTypes.oneOf(functionalRoles).isRequired,
    ),
  ]).isRequired,
  children: PropTypes.node,
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
  }),
};

ShowHideWrapper.defaultProps = {
  allowedRoles: [],
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
)(ShowHideWrapper);
