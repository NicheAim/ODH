export function getSplitReference(value) {
  if (value === undefined) return undefined;

  const splitedValue = value.split('/');
  const splitRe = {
    resourceType: splitedValue[0],
    uuid: splitedValue[1],
  };

  return splitRe;
}

export function getGoalsIdsWithTasksIdsFromCarePlanActivity(carePlanActivity) {
  let goalsWithTask = {};
  let taskIds = {};

  carePlanActivity.forEach((item) => {
    const splitRef = getSplitReference(item.reference.reference);

    if (
      splitRef === undefined ||
      splitRef.resourceType !== 'Task' ||
      splitRef.uuid === undefined
    )
      return;

    if (
      item.detail === undefined ||
      item.detail.goal === undefined ||
      item.detail.goal[0] === undefined ||
      item.detail.goal[0].reference === undefined
    )
      return;

    const goalSplitRef = getSplitReference(item.detail.goal[0].reference);

    if (goalSplitRef === undefined || goalSplitRef.uuid === undefined) return;

    if (!(goalSplitRef.uuid in goalsWithTask)) {
      goalsWithTask[goalSplitRef.uuid] = {};
    }

    goalsWithTask[goalSplitRef.uuid][splitRef.uuid] = {};
    taskIds[splitRef.uuid] = {};
  });

  return { goalsWithTask: goalsWithTask, taskIds: taskIds };
}

export function getGoalsWithTaskData(goalsWithTask, tasksData) {
  let goalsWithTaskData = JSON.parse(JSON.stringify(goalsWithTask));

  Object.keys(goalsWithTaskData).forEach((goalKey) => {
    let goal = goalsWithTaskData[goalKey];
    Object.keys(goal).forEach((taskKey) => {
      const taskData = tasksData[taskKey];

      if (taskData) goalsWithTaskData[goalKey][taskKey] = taskData;
    });
  });

  return goalsWithTaskData;
}

export function filterGoalsByCategory(reducedElements, categoryCode) {
  if (reducedElements === undefined || !Array.isArray(reducedElements))
    return reducedElements;

  return reducedElements.filter((item) => {
    if (item.category === undefined) return false;

    return item.category.some((catItem) => {
      if (catItem.coding === undefined) return false;

      return catItem.coding.some(
        (codingItem) =>
          codingItem.code && codingItem.code.toLowerCase() === categoryCode
      );
    });
  });
}
