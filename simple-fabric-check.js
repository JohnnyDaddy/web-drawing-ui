// Simple Node.js check for Fabric.js methods
const { fabric } = require('fabric');

console.log('Fabric.js version:', fabric.version);
console.log('Canvas constructor available:', typeof fabric.Canvas);

// Check Canvas prototype methods
if (fabric.Canvas) {
  const proto = fabric.Canvas.prototype;
  const methods = Object.getOwnPropertyNames(proto);
  
  console.log('\nCanvas methods containing "dispose":');
  const disposeMethods = methods.filter(m => m.toLowerCase().includes('dispose'));
  console.log(disposeMethods.length > 0 ? disposeMethods : 'No dispose methods found');
  
  console.log('\nCanvas cleanup methods:');
  const cleanupMethods = methods.filter(m => 
    m.toLowerCase().includes('clear') || 
    m.toLowerCase().includes('destroy') || 
    m.toLowerCase().includes('dispose') ||
    m.toLowerCase().includes('remove')
  );
  cleanupMethods.forEach(method => console.log(`  - ${method}`));
}
