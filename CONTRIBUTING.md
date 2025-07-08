# 기여 가이드 (Contributing Guide)

Drawing Template App에 기여해주셔서 감사합니다! 🎉

## 🤝 기여 방법

### 1. 개발 환경 설정

```bash
# 저장소 포크 및 클론
git clone https://github.com/your-username/drawing-template-app.git
cd drawing-template-app

# 의존성 설치
npm install

# 개발 서버 시작
npm start
```

### 2. 브랜치 전략

```bash
# 새 기능 개발
git checkout -b feature/새기능명

# 버그 수정
git checkout -b fix/버그명

# 문서 수정
git checkout -b docs/문서명
```

### 3. 코딩 컨벤션

#### TypeScript
- 엄격한 타입 체크 사용
- `any` 타입 사용 금지
- 인터페이스 명명: `PascalCase`

```typescript
// ✅ 좋은 예
interface DrawingCanvasProps {
  activeTool: string;
  fillColor: string;
}

// ❌ 나쁜 예
interface props {
  activeTool: any;
}
```

#### React 컴포넌트
- 함수형 컴포넌트 사용
- React Hooks 활용
- Props 타입 정의 필수

```typescript
// ✅ 좋은 예
const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ activeTool, fillColor }) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  
  return <canvas ref={canvasRef} />;
};

// ❌ 나쁜 예
const DrawingCanvas = (props) => {
  return <canvas />;
};
```

#### 네이밍 컨벤션
- 컴포넌트: `PascalCase`
- 함수/변수: `camelCase`
- 상수: `UPPER_SNAKE_CASE`
- CSS 클래스: `kebab-case`

### 4. 테스트 작성

모든 새로운 기능에는 테스트가 필요합니다:

```typescript
// 컴포넌트 테스트 예시
describe('새로운 컴포넌트', () => {
  test('기본 렌더링 테스트', () => {
    render(<NewComponent />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('사용자 상호작용 테스트', () => {
    render(<NewComponent />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockFunction).toHaveBeenCalled();
  });
});
```

### 5. 커밋 메시지 규칙

[Conventional Commits](https://www.conventionalcommits.org/) 형식을 따릅니다:

```
type(scope): description

[optional body]

[optional footer(s)]
```

#### 타입
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 스타일 변경
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드/설정 변경

#### 예시
```
feat(canvas): 새로운 브러시 도구 추가

- 다양한 브러시 스타일 지원
- 브러시 크기 동적 조절 기능
- 투명도 설정 옵션 추가

Closes #123
```

### 6. Pull Request 가이드

#### PR 템플릿
```markdown
## 📝 변경 사항
- [ ] 새로운 기능 추가
- [ ] 버그 수정
- [ ] 문서 업데이트
- [ ] 리팩토링

## 🧪 테스트
- [ ] 기존 테스트 통과
- [ ] 새로운 테스트 추가
- [ ] 수동 테스트 완료

## 📷 스크린샷 (UI 변경 시)
Before: [스크린샷]
After: [스크린샷]

## 🔗 관련 이슈
Closes #이슈번호
```

#### PR 체크리스트
- [ ] 코드 리뷰 준비 완료
- [ ] 테스트 통과 확인
- [ ] 문서 업데이트 (필요시)
- [ ] 브라우저 호환성 확인
- [ ] 성능 영향 검토

### 7. 이슈 리포팅

#### 버그 리포트
```markdown
## 🐛 버그 설명
[버그에 대한 명확한 설명]

## 🔄 재현 단계
1. '...'로 이동
2. '...'를 클릭
3. '...'까지 스크롤
4. 오류 확인

## 🎯 예상 동작
[정상적으로 동작해야 하는 내용]

## 📱 환경
- OS: [예: macOS 12.0]
- 브라우저: [예: Chrome 95.0]
- 버전: [예: v1.0.0]

## 📷 스크린샷
[가능하다면 스크린샷 첨부]
```

#### 기능 요청
```markdown
## 🚀 기능 요청
[기능에 대한 명확한 설명]

## 💡 동기
[이 기능이 왜 필요한지 설명]

## 📋 세부 사항
[구현해야 할 세부 사항들]

## 🎨 UI/UX 제안
[가능하다면 목업이나 스케치 첨부]
```

### 8. 코드 리뷰 가이드

#### 리뷰어를 위한 가이드
- 코드 품질과 가독성 확인
- 테스트 커버리지 검토
- 성능 영향 평가
- 보안 취약점 점검

#### 작성자를 위한 가이드
- 작은 단위로 PR 분할
- 명확한 설명과 컨텍스트 제공
- 피드백에 대한 긍정적 수용

### 9. 성능 가이드라인

- 불필요한 리렌더링 방지
- 메모리 누수 방지
- 이벤트 리스너 적절한 정리
- 번들 크기 최적화

### 10. 접근성 (a11y) 가이드라인

- 키보드 네비게이션 지원
- 스크린 리더 호환성
- 색상 대비 준수
- ARIA 속성 적절한 사용

## 📞 도움이 필요하다면

- 이슈 탭에서 질문 등록
- 디스코드 채널 참여
- 이메일: support@drawing-app.com

감사합니다! 🙏
