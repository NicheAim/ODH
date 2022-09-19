import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { FormattedMessage } from 'react-intl';

import { HealthcareServiceTable } from '../index';
import messages from '../messages';

configure({ adapter: new Adapter() });

const tableColumns = 'repeat(7, 1fr) 50px';
const relativeTop = 50;
const size = { width: 400 };
const flattenHealthcareServiceData = jest.fn();

describe('<HealthcareServiceTable />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot with active status', () => {
      // Arrange
      // element1
      const logicalId1 = 'logicalId1';
      const name1 = 'name1';
      const programName1 = 'programName1';
      const programName2 = 'programName2';
      const programNames1 = [programName1, programName2];
      const active1 = true;
      const categoryDisplay1 = 'categoryDisplay1';
      const typeDisplay1 = 'typeDisplay1';
      const typeDisplay2 = 'typeDisplay2';
      const type1 = [{ display: typeDisplay1 }, { display: typeDisplay2 }];
      const category1 = {
        display: categoryDisplay1,
      };
      const identifierSystem1 = 'identifierSystem1';
      const identifierSystem2 = 'identifierSystem2';
      const identifierValue1 = 'identifierValue1';
      const identifierValue2 = 'identifierValue2';
      const identifiers1 = [
        { system: identifierSystem1, value: identifierValue1 },
        { system: identifierSystem2, value: identifierValue2 },
      ];
      const element1 = {
        logicalId: logicalId1,
        name: name1,
        category: category1,
        type: type1,
        programName: programNames1,
        identifiers: identifiers1,
        active: active1,
      };
      // element2
      const logicalId2 = 'logicalId2';
      const name2 = 'name2';
      const programName3 = 'programName3';
      const programName4 = 'programName4';
      const programNames2 = [programName3, programName4];
      const active2 = true;
      const categoryDisplay2 = 'categoryDisplay2';
      const typeDisplay3 = 'typeDisplay3';
      const typeDisplay4 = 'typeDisplay4';
      const type2 = [{ display: typeDisplay3 }, { display: typeDisplay4 }];
      const category2 = {
        display: categoryDisplay2,
      };
      const identifierSystem3 = 'identifierSystem3';
      const identifierSystem4 = 'identifierSystem4';
      const identifierValue3 = 'identifierValue3';
      const identifierValue4 = 'identifierValue4';
      const identifiers2 = [
        { system: identifierSystem3, value: identifierValue3 },
        { system: identifierSystem4, value: identifierValue4 },
      ];
      const element2 = {
        logicalId: logicalId2,
        name: name2,
        category: category2,
        type: type2,
        programName: programNames2,
        identifiers: identifiers2,
        active: active2,
      };
      const mockElements = [element1, element2];

      // Act
      const renderedComponent = shallow(<HealthcareServiceTable
        columns={tableColumns}
        relativeTop={relativeTop}
        elements={mockElements}
        flattenHealthcareServiceData={flattenHealthcareServiceData}
        size={size}
      />);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });

    it('should match snapshot with inactive status', () => {
      // Arrange
      // element1
      const logicalId1 = 'logicalId1';
      const name1 = 'name1';
      const programName1 = 'programName1';
      const programName2 = 'programName2';
      const programNames1 = [programName1, programName2];
      const active1 = false;
      const categoryDisplay1 = 'categoryDisplay1';
      const typeDisplay1 = 'typeDisplay1';
      const typeDisplay2 = 'typeDisplay2';
      const type1 = [{ display: typeDisplay1 }, { display: typeDisplay2 }];
      const category1 = {
        display: categoryDisplay1,
      };
      const identifierSystem1 = 'identifierSystem1';
      const identifierSystem2 = 'identifierSystem2';
      const identifierValue1 = 'identifierValue1';
      const identifierValue2 = 'identifierValue2';
      const identifiers1 = [
        { system: identifierSystem1, value: identifierValue1 },
        { system: identifierSystem2, value: identifierValue2 },
      ];
      const element1 = {
        logicalId: logicalId1,
        name: name1,
        category: category1,
        type: type1,
        programName: programNames1,
        identifiers: identifiers1,
        active: active1,
      };
      // element2
      const logicalId2 = 'logicalId2';
      const name2 = 'name2';
      const programName3 = 'programName3';
      const programName4 = 'programName4';
      const programNames2 = [programName3, programName4];
      const active2 = true;
      const categoryDisplay2 = 'categoryDisplay2';
      const typeDisplay3 = 'typeDisplay3';
      const typeDisplay4 = 'typeDisplay4';
      const type2 = [{ display: typeDisplay3 }, { display: typeDisplay4 }];
      const category2 = {
        display: categoryDisplay2,
      };
      const identifierSystem3 = 'identifierSystem3';
      const identifierSystem4 = 'identifierSystem4';
      const identifierValue3 = 'identifierValue3';
      const identifierValue4 = 'identifierValue4';
      const identifiers2 = [
        { system: identifierSystem3, value: identifierValue3 },
        { system: identifierSystem4, value: identifierValue4 },
      ];
      const element2 = {
        logicalId: logicalId2,
        name: name2,
        category: category2,
        type: type2,
        programName: programNames2,
        identifiers: identifiers2,
        active: active2,
      };
      const mockElements = [element1, element2];

      // Act
      const renderedComponent = shallow(<HealthcareServiceTable
        columns={tableColumns}
        relativeTop={relativeTop}
        elements={mockElements}
        flattenHealthcareServiceData={flattenHealthcareServiceData}
        size={size}
      />);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should contain names', () => {
      // Arrange
      // element1
      const logicalId1 = 'logicalId1';
      const name1 = 'name1';
      const programName1 = 'programName1';
      const programName2 = 'programName2';
      const programNames1 = [programName1, programName2];
      const active1 = true;
      const categoryDisplay1 = 'categoryDisplay1';
      const typeDisplay1 = 'typeDisplay1';
      const typeDisplay2 = 'typeDisplay2';
      const type1 = [{ display: typeDisplay1 }, { display: typeDisplay2 }];
      const category1 = {
        display: categoryDisplay1,
      };
      const identifierSystem1 = 'identifierSystem1';
      const identifierSystem2 = 'identifierSystem2';
      const identifierValue1 = 'identifierValue1';
      const identifierValue2 = 'identifierValue2';
      const identifiers1 = [
        { system: identifierSystem1, value: identifierValue1 },
        { system: identifierSystem2, value: identifierValue2 },
      ];
      const element1 = {
        logicalId: logicalId1,
        name: name1,
        category: category1,
        type: type1,
        programName: programNames1,
        identifiers: identifiers1,
        active: active1,
      };
      // element2
      const logicalId2 = 'logicalId2';
      const name2 = 'name2';
      const programName3 = 'programName3';
      const programName4 = 'programName4';
      const programNames2 = [programName3, programName4];
      const active2 = true;
      const categoryDisplay2 = 'categoryDisplay2';
      const typeDisplay3 = 'typeDisplay3';
      const typeDisplay4 = 'typeDisplay4';
      const type2 = [{ display: typeDisplay3 }, { display: typeDisplay4 }];
      const category2 = {
        display: categoryDisplay2,
      };
      const identifierSystem3 = 'identifierSystem3';
      const identifierSystem4 = 'identifierSystem4';
      const identifierValue3 = 'identifierValue3';
      const identifierValue4 = 'identifierValue4';
      const identifiers2 = [
        { system: identifierSystem3, value: identifierValue3 },
        { system: identifierSystem4, value: identifierValue4 },
      ];
      const element2 = {
        logicalId: logicalId2,
        name: name2,
        category: category2,
        type: type2,
        programName: programNames2,
        identifiers: identifiers2,
        active: active2,
      };
      const mockElements = [element1, element2];
      // Act
      const renderedComponent = shallow(<HealthcareServiceTable
        columns={tableColumns}
        relativeTop={relativeTop}
        elements={mockElements}
        flattenHealthcareServiceData={flattenHealthcareServiceData}
        size={size}
      />);

      // Assert
      expect(renderedComponent.contains(name1)).toBe(true);
      expect(renderedComponent.contains(name2)).toBe(true);
    });

    it('should contain category displays', () => {
      // Arrange
      // element1
      const logicalId1 = 'logicalId1';
      const name1 = 'name1';
      const programName1 = 'programName1';
      const programName2 = 'programName2';
      const programNames1 = [programName1, programName2];
      const active1 = true;
      const categoryDisplay1 = 'categoryDisplay1';
      const typeDisplay1 = 'typeDisplay1';
      const typeDisplay2 = 'typeDisplay2';
      const type1 = [{ display: typeDisplay1 }, { display: typeDisplay2 }];
      const category1 = {
        display: categoryDisplay1,
      };
      const identifierSystem1 = 'identifierSystem1';
      const identifierSystem2 = 'identifierSystem2';
      const identifierValue1 = 'identifierValue1';
      const identifierValue2 = 'identifierValue2';
      const identifiers1 = [
        { system: identifierSystem1, value: identifierValue1 },
        { system: identifierSystem2, value: identifierValue2 },
      ];
      const element1 = {
        logicalId: logicalId1,
        name: name1,
        category: category1,
        type: type1,
        programName: programNames1,
        identifiers: identifiers1,
        active: active1,
      };
      // element2
      const logicalId2 = 'logicalId2';
      const name2 = 'name2';
      const programName3 = 'programName3';
      const programName4 = 'programName4';
      const programNames2 = [programName3, programName4];
      const active2 = true;
      const categoryDisplay2 = 'categoryDisplay2';
      const typeDisplay3 = 'typeDisplay3';
      const typeDisplay4 = 'typeDisplay4';
      const type2 = [{ display: typeDisplay3 }, { display: typeDisplay4 }];
      const category2 = {
        display: categoryDisplay2,
      };
      const identifierSystem3 = 'identifierSystem3';
      const identifierSystem4 = 'identifierSystem4';
      const identifierValue3 = 'identifierValue3';
      const identifierValue4 = 'identifierValue4';
      const identifiers2 = [
        { system: identifierSystem3, value: identifierValue3 },
        { system: identifierSystem4, value: identifierValue4 },
      ];
      const element2 = {
        logicalId: logicalId2,
        name: name2,
        category: category2,
        type: type2,
        programName: programNames2,
        identifiers: identifiers2,
        active: active2,
      };
      const mockElements = [element1, element2];
      const showAssigned = false;
      const onCheck = jest.fn();
      // Act
      const renderedComponent = shallow(<HealthcareServiceTable
        columns={tableColumns}
        relativeTop={relativeTop}
        elements={mockElements}
        showAssigned={showAssigned}
        size={size}
        onCheck={onCheck}
        flattenHealthcareServiceData={flattenHealthcareServiceData}
      />);

      // Assert
      expect(renderedComponent.contains(categoryDisplay1)).toBe(true);
      expect(renderedComponent.contains(categoryDisplay2)).toBe(true);
    });

    it('should hide type displays', () => {
      // Arrange
      // element1
      const logicalId1 = 'logicalId1';
      const name1 = 'name1';
      const programName1 = 'programName1';
      const programName2 = 'programName2';
      const programNames1 = [programName1, programName2];
      const active1 = true;
      const categoryDisplay1 = 'categoryDisplay1';
      const typeDisplay1 = 'typeDisplay1';
      const typeDisplay2 = 'typeDisplay2';
      const type1 = [{ display: typeDisplay1 }, { display: typeDisplay2 }];
      const category1 = {
        display: categoryDisplay1,
      };
      const identifierSystem1 = 'identifierSystem1';
      const identifierSystem2 = 'identifierSystem2';
      const identifierValue1 = 'identifierValue1';
      const identifierValue2 = 'identifierValue2';
      const identifiers1 = [
        { system: identifierSystem1, value: identifierValue1 },
        { system: identifierSystem2, value: identifierValue2 },
      ];
      const element1 = {
        logicalId: logicalId1,
        name: name1,
        category: category1,
        type: type1,
        programName: programNames1,
        identifiers: identifiers1,
        active: active1,
      };
      // element2
      const logicalId2 = 'logicalId2';
      const name2 = 'name2';
      const programName3 = 'programName3';
      const programName4 = 'programName4';
      const programNames2 = [programName3, programName4];
      const active2 = true;
      const categoryDisplay2 = 'categoryDisplay2';
      const typeDisplay3 = 'typeDisplay3';
      const typeDisplay4 = 'typeDisplay4';
      const type2 = [{ display: typeDisplay3 }, { display: typeDisplay4 }];
      const category2 = {
        display: categoryDisplay2,
      };
      const identifierSystem3 = 'identifierSystem3';
      const identifierSystem4 = 'identifierSystem4';
      const identifierValue3 = 'identifierValue3';
      const identifierValue4 = 'identifierValue4';
      const identifiers2 = [
        { system: identifierSystem3, value: identifierValue3 },
        { system: identifierSystem4, value: identifierValue4 },
      ];
      const element2 = {
        logicalId: logicalId2,
        name: name2,
        category: category2,
        type: type2,
        programName: programNames2,
        identifiers: identifiers2,
        active: active2,
      };
      const mockElements = [element1, element2];

      // Act
      const renderedComponent = shallow(<HealthcareServiceTable
        columns={tableColumns}
        relativeTop={relativeTop}
        elements={mockElements}
        flattenHealthcareServiceData={flattenHealthcareServiceData}
        size={size}
      />);

      // Assert
      expect(renderedComponent.contains(typeDisplay1)).toBe(false);
      expect(renderedComponent.contains(typeDisplay2)).toBe(false);
      expect(renderedComponent.contains(typeDisplay3)).toBe(false);
      expect(renderedComponent.contains(typeDisplay4)).toBe(false);
    });

    it('should contain program names', () => {
      // Arrange
      // element1
      const logicalId1 = 'logicalId1';
      const name1 = 'name1';
      const programName1 = 'programName1';
      const programName2 = 'programName2';
      const programNames1 = [programName1, programName2];
      const active1 = true;
      const categoryDisplay1 = 'categoryDisplay1';
      const typeDisplay1 = 'typeDisplay1';
      const typeDisplay2 = 'typeDisplay2';
      const type1 = [{ display: typeDisplay1 }, { display: typeDisplay2 }];
      const category1 = {
        display: categoryDisplay1,
      };
      const identifierSystem1 = 'identifierSystem1';
      const identifierSystem2 = 'identifierSystem2';
      const identifierValue1 = 'identifierValue1';
      const identifierValue2 = 'identifierValue2';
      const identifiers1 = [
        { system: identifierSystem1, value: identifierValue1 },
        { system: identifierSystem2, value: identifierValue2 },
      ];
      const element1 = {
        logicalId: logicalId1,
        name: name1,
        category: category1,
        type: type1,
        programName: programNames1,
        identifiers: identifiers1,
        active: active1,
      };
      // element2
      const logicalId2 = 'logicalId2';
      const name2 = 'name2';
      const programName3 = 'programName3';
      const programName4 = 'programName4';
      const programNames2 = [programName3, programName4];
      const active2 = true;
      const categoryDisplay2 = 'categoryDisplay2';
      const typeDisplay3 = 'typeDisplay3';
      const typeDisplay4 = 'typeDisplay4';
      const type2 = [{ display: typeDisplay3 }, { display: typeDisplay4 }];
      const category2 = {
        display: categoryDisplay2,
      };
      const identifierSystem3 = 'identifierSystem3';
      const identifierSystem4 = 'identifierSystem4';
      const identifierValue3 = 'identifierValue3';
      const identifierValue4 = 'identifierValue4';
      const identifiers2 = [
        { system: identifierSystem3, value: identifierValue3 },
        { system: identifierSystem4, value: identifierValue4 },
      ];
      const element2 = {
        logicalId: logicalId2,
        name: name2,
        category: category2,
        type: type2,
        programName: programNames2,
        identifiers: identifiers2,
        active: active2,
      };
      const mockElements = [element1, element2];

      // Act
      const renderedComponent = shallow(<HealthcareServiceTable
        columns={tableColumns}
        relativeTop={relativeTop}
        elements={mockElements}
        flattenHealthcareServiceData={flattenHealthcareServiceData}
        size={size}
      />);

      // Assert
      expect(renderedComponent.contains(programName1)).toBe(true);
      expect(renderedComponent.contains(programName2)).toBe(true);
      expect(renderedComponent.contains(programName3)).toBe(true);
      expect(renderedComponent.contains(programName4)).toBe(true);
    });

    it('should not contain identifier systems and values', () => {
      // Arrange
      // element1
      const logicalId1 = 'logicalId1';
      const name1 = 'name1';
      const programName1 = 'programName1';
      const programName2 = 'programName2';
      const programNames1 = [programName1, programName2];
      const active1 = true;
      const categoryDisplay1 = 'categoryDisplay1';
      const typeDisplay1 = 'typeDisplay1';
      const typeDisplay2 = 'typeDisplay2';
      const type1 = [{ display: typeDisplay1 }, { display: typeDisplay2 }];
      const category1 = {
        display: categoryDisplay1,
      };
      const identifierSystem1 = 'identifierSystem1';
      const identifierSystem2 = 'identifierSystem2';
      const identifierValue1 = 'identifierValue1';
      const identifierValue2 = 'identifierValue2';
      const identifiers1 = [
        { system: identifierSystem1, value: identifierValue1 },
        { system: identifierSystem2, value: identifierValue2 },
      ];
      const element1 = {
        logicalId: logicalId1,
        name: name1,
        category: category1,
        type: type1,
        programName: programNames1,
        identifiers: identifiers1,
        active: active1,
      };
      // element2
      const logicalId2 = 'logicalId2';
      const name2 = 'name2';
      const programName3 = 'programName3';
      const programName4 = 'programName4';
      const programNames2 = [programName3, programName4];
      const active2 = true;
      const categoryDisplay2 = 'categoryDisplay2';
      const typeDisplay3 = 'typeDisplay3';
      const typeDisplay4 = 'typeDisplay4';
      const type2 = [{ display: typeDisplay3 }, { display: typeDisplay4 }];
      const category2 = {
        display: categoryDisplay2,
      };
      const identifierSystem3 = 'identifierSystem3';
      const identifierSystem4 = 'identifierSystem4';
      const identifierValue3 = 'identifierValue3';
      const identifierValue4 = 'identifierValue4';
      const identifiers2 = [
        { system: identifierSystem3, value: identifierValue3 },
        { system: identifierSystem4, value: identifierValue4 },
      ];
      const element2 = {
        logicalId: logicalId2,
        name: name2,
        category: category2,
        type: type2,
        programName: programNames2,
        identifiers: identifiers2,
        active: active2,
      };
      const mockElements = [element1, element2];

      // Act
      const renderedComponent = shallow(<HealthcareServiceTable
        columns={tableColumns}
        relativeTop={relativeTop}
        elements={mockElements}
        flattenHealthcareServiceData={flattenHealthcareServiceData}
        size={size}
      />);

      // Assert
      expect(renderedComponent.contains(identifierSystem1)).toBe(false);
      expect(renderedComponent.contains(identifierSystem2)).toBe(false);
      expect(renderedComponent.contains(identifierSystem3)).toBe(false);
      expect(renderedComponent.contains(identifierSystem4)).toBe(false);
      expect(renderedComponent.contains(identifierValue1)).toBe(false);
      expect(renderedComponent.contains(identifierValue2)).toBe(false);
      expect(renderedComponent.contains(identifierValue3)).toBe(false);
      expect(renderedComponent.contains(identifierValue4)).toBe(false);
    });

    it('should not contain formatted identifiers', () => {
      // Arrange
      // element1
      const logicalId1 = 'logicalId1';
      const name1 = 'name1';
      const programName1 = 'programName1';
      const programName2 = 'programName2';
      const programNames1 = [programName1, programName2];
      const active1 = true;
      const categoryDisplay1 = 'categoryDisplay1';
      const typeDisplay1 = 'typeDisplay1';
      const typeDisplay2 = 'typeDisplay2';
      const type1 = [{ display: typeDisplay1 }, { display: typeDisplay2 }];
      const category1 = {
        display: categoryDisplay1,
      };
      const identifierSystem1 = 'identifierSystem1';
      const identifierSystem2 = 'identifierSystem2';
      const identifierValue1 = 'identifierValue1';
      const identifierValue2 = 'identifierValue2';
      const identifiers1 = [
        { system: identifierSystem1, value: identifierValue1 },
        { system: identifierSystem2, value: identifierValue2 },
      ];
      const element1 = {
        logicalId: logicalId1,
        name: name1,
        category: category1,
        type: type1,
        programName: programNames1,
        identifiers: identifiers1,
        active: active1,
      };
      // element2
      const logicalId2 = 'logicalId2';
      const name2 = 'name2';
      const programName3 = 'programName3';
      const programName4 = 'programName4';
      const programNames2 = [programName3, programName4];
      const active2 = true;
      const categoryDisplay2 = 'categoryDisplay2';
      const typeDisplay3 = 'typeDisplay3';
      const typeDisplay4 = 'typeDisplay4';
      const type2 = [{ display: typeDisplay3 }, { display: typeDisplay4 }];
      const category2 = {
        display: categoryDisplay2,
      };
      const identifierSystem3 = 'identifierSystem3';
      const identifierSystem4 = 'identifierSystem4';
      const identifierValue3 = 'identifierValue3';
      const identifierValue4 = 'identifierValue4';
      const identifiers2 = [
        { system: identifierSystem3, value: identifierValue3 },
        { system: identifierSystem4, value: identifierValue4 },
      ];
      const element2 = {
        logicalId: logicalId2,
        name: name2,
        category: category2,
        type: type2,
        programName: programNames2,
        identifiers: identifiers2,
        active: active2,
      };
      const mockElements = [element1, element2];

      // Act
      const renderedComponent = shallow(<HealthcareServiceTable
        columns={tableColumns}
        relativeTop={relativeTop}
        elements={mockElements}
        flattenHealthcareServiceData={flattenHealthcareServiceData}
        size={size}
      />);

      // Assert
      expect(renderedComponent.contains((<div>{`${identifierSystem1}: ${identifierValue1}`}<br /></div>))).toBe(false);
      expect(renderedComponent.contains((<div>{`${identifierSystem2}: ${identifierValue2}`}<br /></div>))).toBe(false);
      expect(renderedComponent.contains((<div>{`${identifierSystem3}: ${identifierValue3}`}<br /></div>))).toBe(false);
      expect(renderedComponent.contains((<div>{`${identifierSystem4}: ${identifierValue4}`}<br /></div>))).toBe(false);
    });

    it('should contain active status', () => {
      // Arrange
      // element1
      const logicalId1 = 'logicalId1';
      const name1 = 'name1';
      const programName1 = 'programName1';
      const programName2 = 'programName2';
      const programNames1 = [programName1, programName2];
      const active1 = true;
      const categoryDisplay1 = 'categoryDisplay1';
      const typeDisplay1 = 'typeDisplay1';
      const typeDisplay2 = 'typeDisplay2';
      const type1 = [{ display: typeDisplay1 }, { display: typeDisplay2 }];
      const category1 = {
        display: categoryDisplay1,
      };
      const identifierSystem1 = 'identifierSystem1';
      const identifierSystem2 = 'identifierSystem2';
      const identifierValue1 = 'identifierValue1';
      const identifierValue2 = 'identifierValue2';
      const identifiers1 = [
        { system: identifierSystem1, value: identifierValue1 },
        { system: identifierSystem2, value: identifierValue2 },
      ];
      const element1 = {
        logicalId: logicalId1,
        name: name1,
        category: category1,
        type: type1,
        programName: programNames1,
        identifiers: identifiers1,
        active: active1,
      };
      // element2
      const logicalId2 = 'logicalId2';
      const name2 = 'name2';
      const programName3 = 'programName3';
      const programName4 = 'programName4';
      const programNames2 = [programName3, programName4];
      const active2 = true;
      const categoryDisplay2 = 'categoryDisplay2';
      const typeDisplay3 = 'typeDisplay3';
      const typeDisplay4 = 'typeDisplay4';
      const type2 = [{ display: typeDisplay3 }, { display: typeDisplay4 }];
      const category2 = {
        display: categoryDisplay2,
      };
      const identifierSystem3 = 'identifierSystem3';
      const identifierSystem4 = 'identifierSystem4';
      const identifierValue3 = 'identifierValue3';
      const identifierValue4 = 'identifierValue4';
      const identifiers2 = [
        { system: identifierSystem3, value: identifierValue3 },
        { system: identifierSystem4, value: identifierValue4 },
      ];
      const element2 = {
        logicalId: logicalId2,
        name: name2,
        category: category2,
        type: type2,
        programName: programNames2,
        identifiers: identifiers2,
        active: active2,
      };
      const mockElements = [element1, element2];

      // Act
      const renderedComponent = shallow(<HealthcareServiceTable
        columns={tableColumns}
        relativeTop={relativeTop}
        elements={mockElements}
        flattenHealthcareServiceData={flattenHealthcareServiceData}
        size={size}
      />);

      // Assert
      expect(renderedComponent.contains(<FormattedMessage {...messages.labelActive} />)).toBe(true);
      expect(renderedComponent.contains(<FormattedMessage {...messages.labelInactive} />)).toBe(false);
    });

    it('should contain inactive status', () => {
      // Arrange
      // element1
      const logicalId1 = 'logicalId1';
      const name1 = 'name1';
      const programName1 = 'programName1';
      const programName2 = 'programName2';
      const programNames1 = [programName1, programName2];
      const active1 = false;
      const categoryDisplay1 = 'categoryDisplay1';
      const typeDisplay1 = 'typeDisplay1';
      const typeDisplay2 = 'typeDisplay2';
      const type1 = [{ display: typeDisplay1 }, { display: typeDisplay2 }];
      const category1 = {
        display: categoryDisplay1,
      };
      const identifierSystem1 = 'identifierSystem1';
      const identifierSystem2 = 'identifierSystem2';
      const identifierValue1 = 'identifierValue1';
      const identifierValue2 = 'identifierValue2';
      const identifiers1 = [
        { system: identifierSystem1, value: identifierValue1 },
        { system: identifierSystem2, value: identifierValue2 },
      ];
      const element1 = {
        logicalId: logicalId1,
        name: name1,
        category: category1,
        type: type1,
        programName: programNames1,
        identifiers: identifiers1,
        active: active1,
      };
      // element2
      const logicalId2 = 'logicalId2';
      const name2 = 'name2';
      const programName3 = 'programName3';
      const programName4 = 'programName4';
      const programNames2 = [programName3, programName4];
      const active2 = false;
      const categoryDisplay2 = 'categoryDisplay2';
      const typeDisplay3 = 'typeDisplay3';
      const typeDisplay4 = 'typeDisplay4';
      const type2 = [{ display: typeDisplay3 }, { display: typeDisplay4 }];
      const category2 = {
        display: categoryDisplay2,
      };
      const identifierSystem3 = 'identifierSystem3';
      const identifierSystem4 = 'identifierSystem4';
      const identifierValue3 = 'identifierValue3';
      const identifierValue4 = 'identifierValue4';
      const identifiers2 = [
        { system: identifierSystem3, value: identifierValue3 },
        { system: identifierSystem4, value: identifierValue4 },
      ];
      const element2 = {
        logicalId: logicalId2,
        name: name2,
        category: category2,
        type: type2,
        programName: programNames2,
        identifiers: identifiers2,
        active: active2,
      };
      const mockElements = [element1, element2];

      // Act
      const renderedComponent = shallow(<HealthcareServiceTable
        columns={tableColumns}
        relativeTop={relativeTop}
        elements={mockElements}
        flattenHealthcareServiceData={flattenHealthcareServiceData}
        size={size}
      />);

      // Assert
      expect(renderedComponent.contains(<FormattedMessage {...messages.labelActive} />)).toBe(false);
      expect(renderedComponent.contains(<FormattedMessage {...messages.labelInactive} />)).toBe(true);
    });
  });
});
