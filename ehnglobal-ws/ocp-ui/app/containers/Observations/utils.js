import _ from 'lodash';

function getObservationLogicalId(observation) {
  const { id } = observation;
  if (!id || !id.startsWith('http')) {
    return id;
  }
  const separator = '/Observation';
  const start = id.lastIndexOf(separator);
  if (start > 0) {
    const remaining = id.substring(start + separator.length + 1)
    const end = remaining.indexOf('/');
    return remaining.substring(0, end > 0 ? end : undefined)
  }
}

export function mapObervations(result) {
  return _
    .chain(result)
    .get('elements')
    .map(observation => ({
      ...(
        observation.logicalId
          ? observation
          : {
            logicalId: getObservationLogicalId(observation),
            ...observation
          }
      ),
    }))
    .value();
}

