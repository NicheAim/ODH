/*
 *
 * ManageOrganizationPage actions
 *
 */

import { CREATE_ORGANIZATION, UPDATE_ORGANIZATION } from './constants';

export function createOrganization(organization, callback) {
  return {
    type: CREATE_ORGANIZATION,
    organization,
    callback,
  };
}

export function updateOrganization(id, organization, callback) {
  return {
    type: UPDATE_ORGANIZATION,
    id,
    organization,
    callback,
  };
}
