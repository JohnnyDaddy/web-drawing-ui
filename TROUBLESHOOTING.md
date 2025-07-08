# 트러블슈팅 가이드

React + Fabric.js 드로잉 앱 개발 과정에서 발생한 주요 문제들과 해결 방법을 정리했습니다.

## 1. Fabric.js 모킹 문제

### 문제 상황
```
TypeError: fabricCanvas.dispose is not a function
```

### 원인
- Fabric.js v5.x에서는 `dispose()` 메서드가 존재하지만, 테스트 환경에서 모킹이 불완전했음
- 초기 mock에서 `dispose` 메서드가 누락되었음

### 해결 과정
1. **1차 시도**: `__mocks__/fabric.js` 파일 생성
   - 문제: 모킹이 일관되지 않음
   
2. **2차 시도**: `package.json`에 `moduleNameMapper` 추가
   - 문제: 설정이 복잡하고 유지보수 어려움

3. **최종 해결**: `setupTests.ts`에서 전역 모킹
   ```typescript
   // setupTests.ts
   const mockCanvasInstance = {
     dispose: jest.fn(),
     add: jest.fn(),
     remove: jest.fn(),
     clear: jest.fn(),
     renderAll: jest.fn(),
     setActiveObject: jest.fn(),
     // ... 기타 필요한 메서드들
   };

   const mockFabric = {
     Canvas: jest.fn(() => mockCanvasInstance),
     Object: jest.fn(),
     // ... 기타 Fabric.js 객체들
   };

   (global as any).fabric = mockFabric;
   ```

### 교훈
- 복잡한 외부 라이브러리 모킹은 `setupTests.ts`에서 전역으로 처리하는 것이 안정적
- 모든 테스트에서 동일한 mock 인스턴스를 공유하도록 구현

## 2. 모호한 텍스트 선택자 문제

### 문제 상황
```
TestingLibraryElementError: Found multiple elements with the text: /선/i
```

### 원인
- "선" 텍스트가 여러 곳에서 사용됨:
  - "🖱️ 선택" 버튼
  - "📏 선" 버튼
  - "선 색상" 라벨
  - "선 두께" 라벨

### 해결 방법
이모지를 포함한 더 구체적인 선택자 사용:
```typescript
// 문제가 있던 코드
expect(screen.getByText(/선/i)).toBeInTheDocument();

// 수정된 코드
expect(screen.getByText(/📏 선/i)).toBeInTheDocument();
expect(screen.getByText(/🖱️ 선택/i)).toBeInTheDocument();
```

### 교훈
- UI 텍스트가 겹칠 가능성을 고려하여 고유한 식별자 사용
- 이모지는 텍스트 고유성을 보장하는 좋은 방법

## 3. Canvas 요소 Role 문제

### 문제 상황
```
TestingLibraryElementError: There are no available roles.
```

### 원인
- `<canvas>` 요소는 기본적으로 특별한 ARIA role을 가지지 않음
- `screen.getByRole('img')`를 사용하려 했으나 canvas는 img role이 아님

### 해결 방법
```typescript
// 문제가 있던 코드
const canvasElement = screen.getByRole('img', { hidden: true });

// 수정된 코드
const { container } = render(<DrawingCanvas {...mockProps} />);
const canvasElement = container.querySelector('canvas');
expect(canvasElement).toBeInTheDocument();
expect(canvasElement?.tagName).toBe('CANVAS');
```

### 교훈
- HTML 요소의 기본 role을 정확히 파악하고 테스트 작성
- 특별한 role이 없는 요소는 `querySelector` 사용이 더 적절

## 4. 컴포넌트 이벤트 정리 문제

### 문제 상황
- 메모리 누수 가능성
- 이벤트 리스너가 제대로 정리되지 않음

### 해결 방법
```typescript
// DrawingCanvas.tsx
useEffect(() => {
  // 이전 이벤트 리스너 정리
  if (currentEventListeners.current) {
    currentEventListeners.current();
  }

  // 새로운 이벤트 리스너 등록
  const cleanup = setupEventListeners();
  currentEventListeners.current = cleanup;

  return () => {
    if (cleanup) {
      cleanup();
    }
  };
}, [activeTool, canvas]);
```

### 교훈
- React에서 이벤트 리스너는 반드시 cleanup 함수로 정리
- useRef를 사용하여 이전 리스너 추적 및 정리

## 5. 테스트 환경 설정

### 최종 권장 구조
```
src/
├── setupTests.ts          # 전역 모킹 설정
├── __tests__/
│   ├── App.test.tsx
│   ├── DrawingCanvas.test.tsx
│   └── Basic.test.tsx
└── components/
    └── DrawingCanvas.tsx
```

### 핵심 설정
1. **setupTests.ts**: 모든 외부 라이브러리 모킹
2. **beforeAll**: 각 테스트 파일에서 모킹 검증
3. **container.querySelector**: 특별한 role이 없는 요소 선택

## 6. 성능 최적화

### 적용된 최적화
- `useCallback`으로 함수 메모이제이션
- 이벤트 리스너 디바운싱
- 불필요한 re-render 방지

### 교훈
- Fabric.js 같은 무거운 라이브러리는 성능 고려사항이 중요
- 이벤트 핸들러 최적화로 사용자 경험 개선

## 7. 개별 요소 삭제 기능 누락

### 문제 상황
- 전체 캔버스 지우기 기능은 구현되었지만, 선택된 개별 요소를 삭제하는 기능이 누락됨
- 사용자가 특정 도형이나 텍스트만 삭제하고 싶을 때 불편함

### 해결 방법
1. **Delete 키 이벤트 핸들러 추가**
   ```typescript
   // DrawingCanvas.tsx
   useEffect(() => {
     const handleKeyDown = (e: KeyboardEvent) => {
       if (e.key === 'Delete' || e.key === 'Backspace') {
         const activeObject = canvas.getActiveObject();
         if (activeObject) {
           canvas.remove(activeObject);
           canvas.renderAll();
         }
       }
     };

     window.addEventListener('keydown', handleKeyDown);
     return () => window.removeEventListener('keydown', handleKeyDown);
   }, [canvas]);
   ```

2. **삭제 버튼 UI 추가**
   ```typescript
   // App.tsx
   const deleteSelected = useCallback(() => {
     if (canvas) {
       const activeObject = canvas.getActiveObject();
       if (activeObject) {
         canvas.remove(activeObject);
         canvas.renderAll();
       }
     }
   }, [canvas]);
   ```

### 교훈
- 기본적인 편집 기능(선택, 삭제, 복사 등)은 초기 설계에서 고려해야 함
- 키보드 단축키와 UI 버튼 두 가지 방법 모두 제공하는 것이 사용자 경험 향상에 도움

## 결론

이 프로젝트를 통해 학습한 주요 교훈:
1. **모킹 전략**: 복잡한 라이브러리는 전역 모킹이 효과적
2. **테스트 선택자**: 고유성을 보장하는 선택자 사용
3. **이벤트 정리**: React에서 메모리 누수 방지의 중요성
4. **성능 최적화**: 사용자 경험을 위한 지속적인 최적화

이 문서가 유사한 프로젝트를 진행하는 개발자들에게 도움이 되기를 바랍니다.
