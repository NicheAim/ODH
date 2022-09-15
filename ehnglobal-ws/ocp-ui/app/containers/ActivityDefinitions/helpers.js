export function flattenActivityDefinitionsData(activityDefinitions) {
  return activityDefinitions && activityDefinitions.map((activityDefinition) => ({
    ...activityDefinition,
    topic: activityDefinition.topic.display,
    status: activityDefinition.status.display,
  }));
}
