# Drawing Template App v1.0

React와 Fabric.js를 사용한 프로덕션 레벨 드로잉 템플릿 애플리케이션입니다.

## 🎨 기능

- **다양한 도구**: 선택, 자유 그리기, 사각형, 원, 삼각형, 선, 텍스트
- **스타일 설정**: 채우기 색상, 선 색상, 선 두께 조정
- **텍스트 기능**: 텍스트 추가 및 편집
- **편집 기능**: 전체 캔버스 지우기
- **파일 관리**: PNG 이미지로 저장 및 이미지 불러오기
- **자동 모드 전환**: 도형 그리기 후 선택 모드로 자동 전환

## 🚀 빠른 시작

### 설치
```bash
# 저장소 클론
git clone <repository-url>
cd drawing-ui

# 의존성 설치
npm install

# 개발 서버 시작
npm start
```

### 빌드
```bash
# 프로덕션 빌드
npm run build

# 테스트 실행
npm test

# 테스트 커버리지
npm run test:coverage
```

## 사용법

1. 왼쪽 도구 패널에서 원하는 도구를 선택하세요
2. 캔버스에서 마우스로 드래그하여 도형을 그리세요
3. 스타일 섹션에서 색상과 선 두께를 조정하세요
4. 도형 그리기 후 자동으로 선택 모드로 전환됩니다
5. 이미지를 PNG 파일로 저장하거나 불러올 수 있습니다

## 📁 프로젝트 구조

```
src/
├── components/
│   └── DrawingCanvas.tsx    # 메인 캔버스 컴포넌트
├── __tests__/
│   ├── App.test.tsx        # App 컴포넌트 테스트
│   └── DrawingCanvas.test.tsx # DrawingCanvas 테스트
├── App.tsx                 # 메인 애플리케이션 컴포넌트
├── App.css                 # 애플리케이션 스타일
├── index.tsx               # 엔트리 포인트
├── index.css               # 글로벌 스타일
└── react-app-env.d.ts      # React 타입 정의
```

## 🔧 개발 가이드

### 컴포넌트 구조
- **App.tsx**: 메인 애플리케이션 로직과 상태 관리
- **DrawingCanvas.tsx**: Fabric.js 캔버스 래퍼 및 도구 구현

### 상태 관리
- `activeTool`: 현재 선택된 도구
- `fillColor`: 도형 채우기 색상
- `strokeColor`: 선 색상
- `strokeWidth`: 선 두께
- `textContent`: 텍스트 내용

### 도구 구현
각 도구는 `DrawingCanvas` 컴포넌트 내에서 이벤트 리스너를 통해 구현됩니다:
- **선택 도구**: 기본 Fabric.js 선택 기능
- **자유 그리기**: Fabric.js의 `isDrawingMode` 사용
- **도형 도구**: 마우스 이벤트로 동적 생성

## 🧪 테스트

### 테스트 실행
```bash
# 전체 테스트 실행
npm test

# 테스트 감시 모드
npm test -- --watch

# 커버리지 포함 테스트
npm test -- --coverage
```

### 테스트 구조
- **단위 테스트**: 개별 컴포넌트 기능 테스트
- **통합 테스트**: 사용자 상호작용 테스트
- **모킹**: Fabric.js 라이브러리 모킹으로 테스트 안정성 확보

## 📦 배포

### Vercel 배포
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 배포
vercel
```

### Netlify 배포
```bash
# 빌드 명령어: npm run build
# 배포 디렉토리: build
```

## 🤝 기여 가이드

### 개발 워크플로우
1. 이슈 생성 및 브랜치 생성
2. 기능 개발 및 테스트 작성
3. 코드 리뷰 및 PR 생성
4. 테스트 통과 후 머지

### 코딩 컨벤션
- **TypeScript**: 엄격한 타입 체크 사용
- **컴포넌트**: 함수형 컴포넌트와 React Hooks 사용
- **스타일링**: CSS 모듈 또는 클래스명 기반
- **테스트**: 모든 컴포넌트에 대한 테스트 작성 필수

## 🐛 문제 해결

### 일반적인 문제들

**Canvas 렌더링 문제**
```typescript
// 해결: useEffect에서 proper cleanup 확인
useEffect(() => {
  return () => {
    canvas.dispose();
  };
}, []);
```

**이벤트 리스너 중복**
```typescript
// 해결: 이전 리스너 제거 후 새 리스너 등록
canvas.off();
canvas.on('mouse:down', handler);
```

**메모리 누수**
```typescript
// 해결: 컴포넌트 언마운트 시 리소스 정리
useEffect(() => {
  return () => {
    if (currentEventListeners.current) {
      currentEventListeners.current();
    }
  };
}, []);
```

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🔗 링크

- [Fabric.js 문서](http://fabricjs.com/docs/)
- [React 문서](https://reactjs.org/docs/)
- [TypeScript 문서](https://www.typescriptlang.org/docs/)
