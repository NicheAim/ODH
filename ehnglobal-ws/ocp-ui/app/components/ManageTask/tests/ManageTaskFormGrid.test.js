import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import ManageTaskFormGrid from '../ManageTaskFormGrid';

configure({ adapter: new Adapter() });

describe('<ManageTaskFormGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageTaskFormGrid>{children}</ManageTaskFormGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageTaskFormGrid>{children}</ManageTaskFormGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageTaskFormGrid>{children}</ManageTaskFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have default styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageTaskFormGrid>{children}</ManageTaskFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('padding-left', '0.5vw');
      expect(renderedComponent).toHaveStyleRule('margin', '2vh 1vw');
      expect(renderedComponent).toHaveStyleRule('grid-column-gap', '2vw');
      expect(renderedComponent).toHaveStyleRule('grid-row-gap', '2vh');
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr');
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle"    "activityDefinition"    "selOrganization"    "patientName"    "selRequester"    "authoredOn"    "lastModifiedDate"    "status"    "priority"    "intent"    "context"    "taskOwner"    "performerType"    "partOf"    "taskStart"    "taskEnd"    "description"    "comments"    "subTasksSection"    "buttonGroup"');
    });

    it('should have styles in min-width: 768px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = 'only screen and (min-width: 768px)';

      // Act
      const renderedComponent = shallow(<ManageTaskFormGrid>{children}</ManageTaskFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr 1fr', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle generalInformationSubtitle"      "activityDefinition activityDefinition"      "selOrganization selOrganization"      "patientName patientName"      "selRequester selRequester"      "authoredOn lastModifiedDate"      "status priority"      "intent context"      "taskOwner taskOwner"      "performerType performerType"      "partOf partOf"      "taskStart taskEnd"      "description description"      "comments comments"      "subTasksSection subTasksSection"      "buttonGroup  ."', { media });
    });

    it('should have styles in min-width: 1200px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = 'only screen and (min-width: 1200px)';

      // Act
      const renderedComponent = shallow(<ManageTaskFormGrid>{children}</ManageTaskFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', 'repeat(12, 1fr)', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"      "activityDefinition activityDefinition activityDefinition activityDefinition . . . . . . . ."      "selOrganization selOrganization selOrganization selOrganization patientName patientName patientName patientName selRequester selRequester selRequester selRequester"      "authoredOn authoredOn lastModifiedDate lastModifiedDate . . . . . . . ."      "status status status priority priority priority intent intent intent context context context"      "taskOwner taskOwner taskOwner taskOwner performerType performerType performerType performerType partOf partOf partOf partOf"      "taskStart taskStart taskEnd taskEnd . . . . . . . ."      "description description description . . . . . . . . ."      "comments comments comments . . . . . . . . ."      "subTasksSection subTasksSection subTasksSection subTasksSection subTasksSection subTasksSection subTasksSection subTasksSection subTasksSection subTasksSection subTasksSection subTasksSection"      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . ."', { media });
    });
  });
});
