import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'mock-local-storage';

import withContext from '../withContext';

configure({ adapter: new Adapter() });

const children = (<h1>Test</h1>);

const FUNCTION_TYPE = 'function';

function SampleFunctionalComponentWithoutAnyName() {
  return children;
}

function SampleFunctionalComponentWithDisplayName() {
  return children;
}

SampleFunctionalComponentWithDisplayName.displayName = 'SampleFunctionalComponentWithDisplayName';

class SampleClassComponent extends React.PureComponent {
  render() {
    return children;
  }
}

describe('withContext', () => {
  describe('snapshot tests', () => {
    it('should wrap functional component without any name and render', () => {
      // Arrange
      const toBeWrappedComponent = SampleFunctionalComponentWithoutAnyName;
      const WrappedComponent = withContext(toBeWrappedComponent);

      // Act
      const renderedComponent = shallow(
        WrappedComponent,
      );

      // Assert
      expect(typeof WrappedComponent.type).toBe(FUNCTION_TYPE);
      expect(renderedComponent).toMatchSnapshot();
    });

    it('should wrap functional component with display name and render', () => {
      // Arrange
      const toBeWrappedComponent = SampleFunctionalComponentWithDisplayName;
      const WrappedComponent = withContext(toBeWrappedComponent);

      // Act
      const renderedComponent = shallow(
        WrappedComponent,
      );

      // Assert
      expect(typeof WrappedComponent.type).toBe(FUNCTION_TYPE);
      expect(renderedComponent).toMatchSnapshot();
    });

    it('should to wrap class component and render', () => {
      // Arrange
      const toBeWrappedComponent = SampleClassComponent;
      const WrappedComponent = withContext(toBeWrappedComponent);

      // Act
      const renderedComponent = shallow(
        WrappedComponent,
      );

      // Assert
      expect(typeof WrappedComponent.type).toBe(FUNCTION_TYPE);
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should export a default withContext function', () => {
      // Assert
      expect(withContext).not.toBeNull();
      expect(typeof withContext).toBe(FUNCTION_TYPE);
    });

    it('should render children of functional component without any name', () => {
      // Arrange
      const toBeWrappedComponent = SampleFunctionalComponentWithoutAnyName;
      const WrappedComponent = withContext(toBeWrappedComponent);

      // Act
      const renderedComponent = mount(
        WrappedComponent,
      );

      // Assert
      expect(typeof WrappedComponent.type).toBe(FUNCTION_TYPE);
      expect(renderedComponent.contains(children)).toBe(true);
    });

    it('should render children of functional component with display name', () => {
      // Arrange
      const toBeWrappedComponent = SampleFunctionalComponentWithoutAnyName;
      const WrappedComponent = withContext(toBeWrappedComponent);

      // Act
      const renderedComponent = mount(
        WrappedComponent,
      );

      // Assert
      expect(typeof WrappedComponent.type).toBe(FUNCTION_TYPE);
      expect(renderedComponent.contains(children)).toBe(true);
    });

    it('should render children of class component', () => {
      // Arrange
      const toBeWrappedComponent = SampleClassComponent;
      const WrappedComponent = withContext(toBeWrappedComponent);

      // Act
      const renderedComponent = mount(
        WrappedComponent,
      );

      // Assert
      expect(typeof WrappedComponent.type).toBe(FUNCTION_TYPE);
      expect(renderedComponent.contains(children)).toBe(true);
    });
  });
});
