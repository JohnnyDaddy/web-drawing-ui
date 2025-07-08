const { fabric } = require('fabric');

// Create a simple test to check if dispose method exists
try {
  // Create a canvas element for testing
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM('<!DOCTYPE html><canvas id="test"></canvas>');
  global.document = dom.window.document;
  global.window = dom.window;
  
  const canvasElement = document.getElementById('test');
  const fabricCanvas = new fabric.Canvas(canvasElement);
  
  console.log('Fabric.js Canvas created successfully');
  console.log('dispose method exists:', typeof fabricCanvas.dispose);
  console.log('Available methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(fabricCanvas)).filter(name => name.includes('dispose')));
  
  if (typeof fabricCanvas.dispose === 'function') {
    console.log('✅ dispose method is available');
  } else {
    console.log('❌ dispose method not found');
    console.log('Available cleanup methods:');
    Object.getOwnPropertyNames(Object.getPrototypeOf(fabricCanvas))
      .filter(name => name.includes('clear') || name.includes('destroy') || name.includes('remove'))
      .forEach(method => console.log(`  - ${method}`));
  }
  
} catch (error) {
  console.log('Error creating Fabric.js canvas:', error.message);
}
