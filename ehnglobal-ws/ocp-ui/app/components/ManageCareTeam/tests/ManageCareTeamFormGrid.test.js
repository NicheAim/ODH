import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import ManageCareTeamFormGrid from '../ManageCareTeamFormGrid';

configure({ adapter: new Adapter() });

describe('<ManageCareTeamFormGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageCareTeamFormGrid>{children}</ManageCareTeamFormGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageCareTeamFormGrid>{children}</ManageCareTeamFormGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageCareTeamFormGrid>{children}</ManageCareTeamFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have default styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageCareTeamFormGrid>{children}</ManageCareTeamFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('width', 'auto');
      expect(renderedComponent).toHaveStyleRule('margin', '1vh 1vw');
      expect(renderedComponent).toHaveStyleRule('grid-row-gap', '0.5vh');
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr');
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle"    "selectedPatient"    "careTeamName"    "category"    "status"    "episodeOfCare"    "reason"    "startDate"    "endDate"    "participantSubtitle"    "addParticipant"    "selectedParticipants"    "buttonGroup"');
    });

    it('should have styles in min-width: 768px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = '(min-width: 768px)';

      // Act
      const renderedComponent = shallow(<ManageCareTeamFormGrid>{children}</ManageCareTeamFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr 1fr', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle generalInformationSubtitle"      "selectedPatient selectedPatient"      "careTeamName status"      "category ."      "episodeOfCare ."      "reason reason"      "startDate ."      "endDate ."      "participantSubtitle participantSubtitle"      "addParticipant ."      "selectedParticipants selectedParticipants"      "buttonGroup ."', { media });
    });

    it('should have styles in min-width: 1200px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = '(min-width: 1200px)';

      // Act
      const renderedComponent = shallow(<ManageCareTeamFormGrid>{children}</ManageCareTeamFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', 'repeat(12, 1fr)', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"      "selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient selectedPatient"      "careTeamName careTeamName careTeamName careTeamName category category category status status . . ."      "episodeOfCare episodeOfCare episodeOfCare reason reason reason reason . . . . ."      "startDate startDate endDate endDate . . . . . . . ."      "participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle participantSubtitle"      "addParticipant addParticipant . . . . . . . . . ."      "selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants selectedParticipants"      "buttonGroup buttonGroup buttonGroup . . . . . . . . ."', { media });
    });
  });
});
