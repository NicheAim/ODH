import { BASE_ATTACHMENTS_API_URL, getEndpoint } from 'utils/endpointService';
import request from 'utils/request';

export default function getDocumentReferences(patientId) {
  const searchEndpoint = `search?patientId=` + patientId;
  const baseEndpoint = getEndpoint(BASE_ATTACHMENTS_API_URL);
  const requestURL = `${baseEndpoint}/${searchEndpoint}`;
  const response = request(requestURL);
  return response;
}

export function getDocumentReference(documentReferenceId) {
  const baseEndpoint = getEndpoint(BASE_ATTACHMENTS_API_URL);
  const requestURL = `${baseEndpoint}/${documentReferenceId}`;
  const response = request(requestURL);
  return response;
}

export function getBinaryResource(binaryId) {
  const baseEndpoint = getEndpoint(BASE_ATTACHMENTS_API_URL);
  const requestURL = `${baseEndpoint}/binary/${binaryId}`;
  const response = request(requestURL);
  return response;
}
