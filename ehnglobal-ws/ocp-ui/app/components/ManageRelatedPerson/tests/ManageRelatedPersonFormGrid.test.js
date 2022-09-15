import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import ManageRelatedPersonFormGrid from '../ManageRelatedPersonFormGrid';

configure({ adapter: new Adapter() });

describe('<ManageRelatedPersonFormGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageRelatedPersonFormGrid>{children}</ManageRelatedPersonFormGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageRelatedPersonFormGrid>{children}</ManageRelatedPersonFormGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageRelatedPersonFormGrid>{children}</ManageRelatedPersonFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have default styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageRelatedPersonFormGrid>{children}</ManageRelatedPersonFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('padding-left', '0.5vw');
      expect(renderedComponent).toHaveStyleRule('margin', '2vh 1vw');
      expect(renderedComponent).toHaveStyleRule('grid-column-gap', '2vw');
      expect(renderedComponent).toHaveStyleRule('grid-row-gap', '2vh');
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr');
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle"    "patientName"    "active"    "firstName"    "lastName"    "relationshipCode"    "birthDate"    "genderCode"    "startDate"    "endDate"    "identifierGroup"    "addresses"    "contacts"    "buttonGroup"');
    });

    it('should have styles in min-width: 768px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = 'only screen and (min-width: 768px)';

      // Act
      const renderedComponent = shallow(<ManageRelatedPersonFormGrid>{children}</ManageRelatedPersonFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr 1fr', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle generalInformationSubtitle"      "patientName active"      "firstName lastName"      "relationshipCode ."      "birthDate genderCode"      "startDate endDate"      "identifierGroup identifierGroup"      "addresses addresses"      "contacts contacts"      "buttonGroup  ."', { media });
    });

    it('should have styles in min-width: 1200px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = 'only screen and (min-width: 1200px)';

      // Act
      const renderedComponent = shallow(<ManageRelatedPersonFormGrid>{children}</ManageRelatedPersonFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', 'repeat(12, 1fr)', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"      "patientName patientName patientName patientName . . . . . . . ."      "active . . . . . . . . . . ."      "firstName firstName lastName lastName . . . . . . . ."      "relationshipCode relationshipCode birthDate birthDate genderCode . . . . . . ."      "startDate startDate endDate endDate . . . . . . . ."      "identifierGroup identifierGroup identifierGroup identifierGroup identifierGroup . . . . . . ."      "addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses"      "contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts"      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . ."', { media });
    });
  });
});
