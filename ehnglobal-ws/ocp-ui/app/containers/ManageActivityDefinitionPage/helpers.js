import isEmpty from 'lodash/isEmpty';
import Util from 'utils/Util';

export function initialActivityDefinitionFormValues(activityDefinition) {
  let formData = null;
  if (!isEmpty(activityDefinition)) {
    const {
      version,
      name,
      title,
      status,
      description,
      effectivePeriod,
      topic,
      relatedArtifact,
      kind,
      timing,
      actionParticipantType,
      actionParticipantRole,
    } = activityDefinition;

    formData = {
      version,
      name,
      title,
      statusCode: status.code,
      description,
      effectiveStart: effectivePeriod && effectivePeriod.start && new Date(effectivePeriod.start),
      effectiveEnd: effectivePeriod && effectivePeriod.end && new Date(effectivePeriod.end),
      topicCode: topic.code,
      relatedArtifact,
      kindCode: kind.code,
      duration: timing && timing.durationMax.toString(),
      frequency: timing && timing.frequency.toString(),
      participantTypeCode: actionParticipantType.code,
      participantRoleCode: actionParticipantRole.code,
    };
  }
  return Util.pickByIdentity(formData);
}
