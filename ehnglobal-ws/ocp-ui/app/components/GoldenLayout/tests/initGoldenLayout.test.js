import initGoldenLayout from '../initGoldenLayout';

let mockInstance = {};

function clearMockInstance() {
  mockInstance = {};
}

const mockHtmlFunc = jest.fn();

jest.useFakeTimers();

jest.mock('golden-layout', () => {
  class MockProxyClass {
    constructor(stateMetadata, root) {
      mockInstance.stateMetadata = stateMetadata;
      mockInstance.root = root;
      mockInstance.init = jest.fn();
      mockInstance.registerComponent = jest.fn();
      mockInstance.constructed = true;
      mockInstance.callbacks = [];
    }

    init() {
      mockInstance.init();
      mockInstance.callbacks.forEach((callback) => callback({
        getElement: () => ({ html: mockHtmlFunc }),
      }));
    }

    registerComponent(name, callback) {
      mockInstance.registerComponent(name, callback);
      mockInstance.callbacks.push(callback);
    }
  }

  return MockProxyClass;
});

describe('initGoldenLayout', () => {
  beforeEach(() => {
    clearMockInstance();
  });

  it('should export default function', () => {
    // Assert
    expect(initGoldenLayout).not.toBeNull();
    expect(typeof initGoldenLayout).toBe('function');
  });

  it('should initialize golden layout', () => {
    // Arrange
    const root = { root: 'root' };
    const factoryMethod1 = jest.fn();
    const name1 = 'name1';
    const text1 = 'text1';
    const metadata1 = { name: name1, text: text1, factoryMethod: factoryMethod1 };
    const factoryMethod2 = jest.fn();
    const name2 = 'name2';
    const text2 = 'text2';
    const metadata2 = { name: name2, text: text2, factoryMethod: factoryMethod2 };
    const componentMetadata = [
      metadata1, metadata2,
    ];
    const stateMetadata = { stateMetadata: 'stateMetadata' };
    const registerLocation = jest.fn();
    const divId1 = 'component_1';
    const divId2 = 'component_2';

    // Act
    initGoldenLayout(root, componentMetadata, stateMetadata, registerLocation);

    // Assert
    expect(mockInstance.constructed).toBe(true);
    expect(mockInstance.init).toHaveBeenCalledTimes(1);
    expect(mockInstance.stateMetadata).toBe(stateMetadata);
    expect(mockInstance.root).toBe(root);
    expect(mockInstance.registerComponent).toHaveBeenCalledTimes(2);
    expect(mockInstance.registerComponent).toHaveBeenCalledWith(name1, expect.any(Function));
    expect(mockInstance.registerComponent).toHaveBeenCalledWith(name2, expect.any(Function));
    jest.runAllTimers();
    expect(mockHtmlFunc).toHaveBeenCalledTimes(2);
    expect(mockHtmlFunc).toHaveBeenCalledWith(`<div id="${divId1}"></div>`);
    expect(mockHtmlFunc).toHaveBeenCalledWith(`<div id="${divId2}"></div>`);
    expect(factoryMethod1).toHaveBeenCalledWith(divId1);
    expect(factoryMethod2).toHaveBeenCalledWith(divId2);
  });
});
