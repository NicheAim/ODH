import _ from 'lodash';

export function removeUniqueIdSuffixes(obj = {}) {
  return Object.entries(obj).reduce(
    (newObj, [key, value]) => {
      newObj[key.substring(0, key.lastIndexOf('_'))] = value;
      return newObj;
    },
    {}
  )
}

export function getPlanSuggestions(planDefinitionsResult, useContextDisplayFilter) {
  const planDefinitions = _.get(planDefinitionsResult, 'elements');
  return _
    .chain((planDefinitions || []))
    .filter(planDefinition => {
      const type = _.get(planDefinition, 'type.coding[0].code');
      return type === 'goal-definition';
    })
    .filter(planDefinition => {
      return !useContextDisplayFilter ||
        getContextDisplay(planDefinition) === useContextDisplayFilter;
    })
    .map(planDefinition => {
      const planId = _.get(planDefinition, 'logicalId');
      const goal = _.get(planDefinition, 'goal[0]');
      const contextDisplay = getContextDisplay(planDefinition);
      return {
        value: planId,
        label: `${contextDisplay} - ${_.get(goal, 'description.text')}`
      };
    })
    .sortBy('label')
    .value();
}

function getContextDisplay(planDefinition) {
  return _.get(
    planDefinition,
    'useContext[0].valueCodeableConcept.coding[0].display'
  );
}
