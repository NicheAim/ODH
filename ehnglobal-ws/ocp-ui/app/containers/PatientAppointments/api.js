import { DEFAULT_PAGE_SIZE } from 'containers/App/constants';
import { isUndefined } from 'lodash';
import { BASE_APPOINTMENTS_API_URL, getEndpoint } from 'utils/endpointService';
import queryString from 'utils/queryString';
import request from 'utils/request';

export default function getPatientAppointmentsApi(query) {
  const { pageSize = DEFAULT_PAGE_SIZE } = query;
  const q = {
    ...query,
    pageSize,
  };
  q.sortByStartTimeAsc = !(!isUndefined(query.showPastAppointments) && query.showPastAppointments);
  const params = queryString(q);
  const baseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const requestURL = `${baseEndpoint}/search${params}`;
  return request(requestURL);
}

export function cancelAppointment(id) {
  const baseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const requestURL = `${baseEndpoint}/${id}/cancel`;
  return request(requestURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}


export function acceptAppointment(id, query) {
  const baseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const params = queryString(query);
  const requestURL = `${baseEndpoint}/${id}/accept${params}`;
  return request(requestURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export function declineAppointment(id, query) {
  const baseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const params = queryString(query);
  const requestURL = `${baseEndpoint}/${id}/decline${params}`;
  return request(requestURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
export function tentativelyAcceptAppointment(id, query) {
  const baseEndpoint = getEndpoint(BASE_APPOINTMENTS_API_URL);
  const params = queryString(query);
  const requestURL = `${baseEndpoint}/${id}/tentative${params}`;
  return request(requestURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
