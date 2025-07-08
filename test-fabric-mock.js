// Quick test to verify fabric mock structure
// Mock Jest for testing purposes
global.jest = {
  fn: () => {
    const mockFn = function(...args) {
      if (mockFn._mockImplementation) {
        return mockFn._mockImplementation(...args);
      }
      return mockFn._mockReturnValue;
    };
    mockFn.mockImplementation = (impl) => {
      mockFn._mockImplementation = impl;
      return mockFn;
    };
    mockFn.mockReturnValue = (value) => {
      mockFn._mockReturnValue = value;
      return mockFn;
    };
    return mockFn;
  }
};

try {
  const fabricMock = require('./src/__mocks__/fabric.js');
  console.log('✅ Fabric mock loaded successfully');
  
  const canvas = new fabricMock.fabric.Canvas();
  console.log('✅ Canvas created successfully');
  console.log('Canvas methods:', Object.keys(canvas));
  
  if (typeof canvas.dispose === 'function') {
    console.log('✅ dispose method exists and is a function');
    canvas.dispose();
    console.log('✅ dispose method executed without error');
  } else {
    console.log('❌ dispose method is missing or not a function, type:', typeof canvas.dispose);
  }
  
} catch (error) {
  console.log('❌ Error:', error.message);
  console.log('Stack:', error.stack);
}
