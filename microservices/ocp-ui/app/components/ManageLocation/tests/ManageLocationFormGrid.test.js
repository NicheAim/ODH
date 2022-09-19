import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import ManageLocationFormGrid from '../ManageLocationFormGrid';

configure({ adapter: new Adapter() });

describe('<ManageLocationFormGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageLocationFormGrid>{children}</ManageLocationFormGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageLocationFormGrid>{children}</ManageLocationFormGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageLocationFormGrid>{children}</ManageLocationFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have default styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageLocationFormGrid>{children}</ManageLocationFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('padding-left', '1vw');
      expect(renderedComponent).toHaveStyleRule('padding-right', '1vw');
      expect(renderedComponent).toHaveStyleRule('margin', '0 1vw');
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr');
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle"    "organizationName"    "name"    "status"    "locationType"    "identifierGroup"    "contact"    "addressSubtitle"    "address1"    "address2"    "city"    "state"    "postalCode"    "countryCode"    "addressUse"    "buttonGroup"    "errorMessage"');
    });

    it('should have styles in min-width: 768px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = '(min-width: 768px)';

      // Act
      const renderedComponent = shallow(<ManageLocationFormGrid>{children}</ManageLocationFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr 1fr', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle generalInformationSubtitle"      "organizationName organizationName"      "name status"      "locationType locationType"      "identifierGroup identifierGroup"      "identifierGroup identifierGroup"      "contact contact"      "addressSubtitle addressSubtitle"      "address1 address2"      "city state postalCode"      "countryCode addressUse"      "buttonGroup ."      "errorMessage errorMessage"', { media });
    });

    it('should have styles in min-width: 1200px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = '(min-width: 1200px)';

      // Act
      const renderedComponent = shallow(<ManageLocationFormGrid>{children}</ManageLocationFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', 'repeat(12, 1fr)', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle generalInformationSubtitle"      "organizationName organizationName organizationName organizationName organizationName organizationName organizationName organizationName organizationName organizationName organizationName organizationName"      "name name name name status status status . . . . ."      "locationType locationType identifierGroup identifierGroup identifierGroup identifierGroup identifierGroup identifierGroup . . . ."      "contact contact contact contact contact contact contact contact contact contact contact contact"      "addressSubtitle addressSubtitle addressSubtitle addressSubtitle addressSubtitle addressSubtitle addressSubtitle addressSubtitle addressSubtitle addressSubtitle addressSubtitle addressSubtitle"      "address1 address1 address1 address1 address2 address2 address2 address2 . . . ."      "city city city city state state state postalCode postalCode . . ."      "countryCode countryCode countryCode addressUse addressUse addressUse . . . . . ."      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . ."      "errorMessage errorMessage . . . . . . . . . ."', { media });
    });
  });
});
