import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import ManageHealthcareServiceFormGrid from '../ManageHealthcareServiceFormGrid';

configure({ adapter: new Adapter() });

describe('<ManageHealthcareServiceFormGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageHealthcareServiceFormGrid>{children}</ManageHealthcareServiceFormGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageHealthcareServiceFormGrid>{children}</ManageHealthcareServiceFormGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageHealthcareServiceFormGrid>{children}</ManageHealthcareServiceFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have default styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageHealthcareServiceFormGrid>{children}</ManageHealthcareServiceFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('padding-left', '1vw');
      expect(renderedComponent).toHaveStyleRule('padding-right', '1vw');
      expect(renderedComponent).toHaveStyleRule('margin', '0 1vw');
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr');
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"name"    "programName"    "category"    "hcsType"    "hcsSpecialty"    "hcsReferralMethod"    "telecomType"    "telecomValue"    "buttonGroup"');
    });

    it('should have styles in min-width: 768px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = '(min-width: 768px)';

      // Act
      const renderedComponent = shallow(<ManageHealthcareServiceFormGrid>{children}</ManageHealthcareServiceFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr 1fr', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"name programName"      "category category"      "hcsType hcsType"      "hcsSpecialty hcsSpecialty"      "hcsReferralMethod hcsReferralMethod"      "telecomType telecomType"      "telecomValue telecomValue"      "buttonGroup ."', { media });
    });

    it('should have styles in min-width: 1200px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = '(min-width: 1200px)';

      // Act
      const renderedComponent = shallow(<ManageHealthcareServiceFormGrid>{children}</ManageHealthcareServiceFormGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', 'repeat(12, 1fr)', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"name name name programName programName programName . . . . . ."      "category category category hcsType hcsType hcsType hcsSpecialty hcsSpecialty hcsSpecialty hcsReferralMethod hcsReferralMethod hcsReferralMethod"      "telecomType telecomType telecomValue telecomValue telecomValue telecomValue . . . . . ."      "buttonGroup buttonGroup buttonGroup buttonGroup . . . . . . . ."', { media });
    });
  });
});
