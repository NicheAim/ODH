import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import ManageActivityDefinitionFormGrid from '../ManageActivityDefinitionFormGrid';

configure({ adapter: new Adapter() });

describe('<ManageActivityDefinitionFormGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(
        <ManageActivityDefinitionFormGrid>{children}</ManageActivityDefinitionFormGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(
        <ManageActivityDefinitionFormGrid>{children}</ManageActivityDefinitionFormGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(
        <ManageActivityDefinitionFormGrid>{children}</ManageActivityDefinitionFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have default styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(
        <ManageActivityDefinitionFormGrid>{children}</ManageActivityDefinitionFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('padding-left', '0.5vw');
      expect(renderedComponent).toHaveStyleRule('margin', '2vh 1vw');
      expect(renderedComponent).toHaveStyleRule('grid-column-gap', '2vw');
      expect(renderedComponent).toHaveStyleRule('grid-row-gap', '2vh');
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr');
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle"    "version"    "selectedOrganization"    "systemName"    "displayName"    "status"    "lastPublishDate"    "description"    "effectivePeriodStart"    "effectivePeriodEnd"    "topic"    "kind"    "activityParticipantSubtitle"    "participantType"    "participantRole"    "setOccurrenceSubtitle"    "duration"    "frequency"    "relatedArtifactsSection"    "buttonGroup"');
    });

    it('should have styles in min-width: 768px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = 'only screen and (min-width: 768px)';

      // Act
      const renderedComponent = shallow(
        <ManageActivityDefinitionFormGrid>{children}</ManageActivityDefinitionFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr 1fr', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle generalInformationSubtitle"      "version version"      "selectedOrganization lastPublishDate"      "systemName displayName"      "status description"      "effectivePeriodStart effectivePeriodEnd"      "topic kind"      "activityParticipantSubtitle activityParticipantSubtitle"      "participantType participantRole"      "setOccurrenceSubtitle setOccurrenceSubtitle"      "duration frequency"      "relatedArtifactsSection relatedArtifactsSection"      "buttonGroup  ."', { media });
    });

    it('should have styles in min-width: 1200px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = 'only screen and (min-width: 1200px)';

      // Act
      const renderedComponent = shallow(
        <ManageActivityDefinitionFormGrid>{children}</ManageActivityDefinitionFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', 'repeat(12, 1fr)', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"      "version version version version . . . . . . . ."      "selectedOrganization selectedOrganization selectedOrganization selectedOrganization lastPublishDate lastPublishDate lastPublishDate lastPublishDate . . . ."      "systemName systemName systemName systemName displayName displayName displayName displayName . . . ."      "status status status status description description description description . . . ."      "effectivePeriodStart effectivePeriodStart effectivePeriodStart effectivePeriodStart effectivePeriodEnd effectivePeriodEnd effectivePeriodEnd effectivePeriodEnd . . . ."      "topic topic topic topic kind kind kind kind . . . ."      "activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle activityParticipantSubtitle"      "participantType participantType participantType participantType participantRole participantRole participantRole participantRole . . . ."      "setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle setOccurrenceSubtitle"      "duration duration duration duration frequency frequency frequency frequency . . . ."      "relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection relatedArtifactsSection"      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . ."', { media });
    });
  });
});
