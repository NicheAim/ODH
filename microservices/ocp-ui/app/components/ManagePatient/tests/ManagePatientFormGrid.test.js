import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import ManagePatientFormGrid from '../ManagePatientFormGrid';

configure({ adapter: new Adapter() });

describe('<ManagePatientFormGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManagePatientFormGrid>{children}</ManagePatientFormGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManagePatientFormGrid>{children}</ManagePatientFormGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManagePatientFormGrid>{children}</ManagePatientFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have default styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManagePatientFormGrid>{children}</ManagePatientFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('padding-left', '0.5vw');
      expect(renderedComponent).toHaveStyleRule('margin', '2vh 1vw');
      expect(renderedComponent).toHaveStyleRule('grid-column-gap', '2vw');
      expect(renderedComponent).toHaveStyleRule('grid-row-gap', '2vh');
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr');
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle"    "contextGroup"    "firstName"    "lastName"    "birthDate"    "genderCode"    "birthSex"    "race"    "ethnicity"    "language"    "identifierGroup"    "addresses"    "contacts"    "flags"    "episodeOfCares"    "coverages"    "buttonGroup"');
    });

    it('should have styles in min-width: 768px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = 'only screen and (min-width: 768px)';

      // Act
      const renderedComponent = shallow(<ManagePatientFormGrid>{children}</ManagePatientFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr 1fr', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle generalInformationSubtitle"      "contextGroup contextGroup"      "firstName lastName"      "birthDate genderCode"      "birthSex race"      "ethnicity language"      "identifierGroup identifierGroup"      "contacts contacts"      "addresses addresses"      "flags flags"      "episodeOfCares episodeOfCares"      "coverages coverages"      "buttonGroup ."', { media });
    });

    it('should have styles in min-width: 1200px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = 'only screen and (min-width: 1200px)';

      // Act
      const renderedComponent = shallow(<ManagePatientFormGrid>{children}</ManagePatientFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', 'repeat(12, 1fr)', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"      "contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup contextGroup"      "firstName firstName firstName firstName lastName lastName lastName lastName . . . ."      "birthDate birthDate birthDate birthDate genderCode genderCode birthSex birthSex . . . ."      "race race ethnicity ethnicity ethnicity language language . . . . ."      "identifierGroup identifierGroup identifierGroup identifierGroup identifierGroup . . . . . . ."      "contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts contacts"      "addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses addresses"      "flags flags flags flags flags flags flags flags flags flags flags flags"      "episodeOfCares episodeOfCares episodeOfCares episodeOfCares episodeOfCares episodeOfCares episodeOfCares episodeOfCares episodeOfCares episodeOfCares episodeOfCares episodeOfCares"      "coverages coverages coverages coverages coverages coverages coverages coverages coverages coverages coverages coverages"      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . ."', { media });
    });
  });
});
