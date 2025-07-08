const { spawn } = require('child_process');

console.log('🧪 테스트 실행 중...');

const testProcess = spawn('npm', ['test', '--', '--testPathPattern=Basic.test.tsx', '--watchAll=false'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

// 15초 후 프로세스 종료
const timeout = setTimeout(() => {
  console.log('\n⏰ 15초 타임아웃 - 테스트 종료');
  testProcess.kill('SIGTERM');
}, 15000);

testProcess.on('exit', (code) => {
  clearTimeout(timeout);
  console.log(`\n✅ 테스트 완료 (코드: ${code})`);
});

testProcess.on('error', (error) => {
  clearTimeout(timeout);
  console.log(`\n❌ 테스트 에러: ${error.message}`);
});
