import { Grid } from 'styled-css-grid';

const ManageActivityDefinitionFormGrid = Grid.extend`
  padding-left: 0.5vw;
  margin: 2vh 1vw;
  grid-column-gap: 2vw;
  grid-row-gap: 2vh;
  grid-template-columns: 1fr;
  grid-template-areas:
    "generalInformationSubtitle"
    "version"
    "selectedOrganization"
    "systemName"
    "displayName"
    "status"
    "lastPublishDate"
    "description"
    "effectivePeriodStart"
    "effectivePeriodEnd"
    "topic"
    "kind"
    "activityParticipantSubtitle"
    "participantType"
    "participantRole"
    "setOccurrenceSubtitle"
    "duration"
    "frequency"
    "relatedArtifactsSection"
    "buttonGroup";

  @media only screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle"
      "version version"
      "selectedOrganization lastPublishDate"
      "systemName displayName"
      "status description"
      "effectivePeriodStart effectivePeriodEnd"
      "topic kind"
      "activityParticipantSubtitle activityParticipantSubtitle"
      "participantType participantRole"
      "setOccurrenceSubtitle setOccurrenceSubtitle"
      "duration frequency"
      "relatedArtifactsSection relatedArtifactsSection"
      "buttonGroup  .";
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(12, 1fr);
    grid-template-areas:
      "generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"
      "version version version version . . . . . . . ."
      "selectedOrganization selectedOrganization selectedOrganization selectedOrganization lastPublishDate lastPublishDate lastPublishDate lastPublishDate . . . ."
      "systemName systemName systemName systemName displayName displayName displayName displayName . . . ."
      "status status status status description description description description . . . ."
      "effectivePeriodStart effectivePeriodStart effectivePeriodStart effectivePeriodStart effectivePeriodEnd effectivePeriodEnd effectivePeriodEnd effectivePeriodEnd . . . ."
      "topic topic topic topic kind kind kind kind . . . ."
      "activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle"
      "participantType participantType participantType participantType participantRole participantRole participantRole participantRole . . . ."
      "setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle"
      "duration duration duration duration frequency frequency frequency frequency . . . ."
      "relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection"
      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . .";
  }
`;

ManageActivityDefinitionFormGrid.propTypes = Grid.propTypes;

export default ManageActivityDefinitionFormGrid;
