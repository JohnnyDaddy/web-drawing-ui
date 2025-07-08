# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-08

### Added
- 🎨 기본 드로잉 도구들 (선택, 자유그리기, 사각형, 원, 삼각형, 선)
- ✏️ 텍스트 추가 및 편집 기능
- 🎨 색상 선택기 (채우기 색상, 선 색상)
- 📏 선 두께 조절 슬라이더
- 💾 PNG 이미지 저장 기능
- 📁 이미지 파일 불러오기 기능
- 🗑️ 캔버스 전체 지우기 기능
- 🔄 도형 그리기 후 자동 선택 모드 전환
- 🧪 컴포넌트 단위 테스트 추가
- 📚 상세한 개발 문서 작성

### Technical Details
- React 18.2.0 기반 구현
- Fabric.js 5.3.0을 사용한 캔버스 구현
- TypeScript로 타입 안정성 확보
- Testing Library를 사용한 컴포넌트 테스트
- 성능 최적화된 이벤트 리스너 관리

### Fixed
- useEffect 의존성 배열 최적화
- 이벤트 리스너 중복 등록 방지
- 메모리 누수 방지를 위한 proper cleanup
- TypeScript 컴파일 에러 해결
- JSX 요소 인식 문제 해결

### Changed
- 컴포넌트 구조 단순화
- 코드 가독성 향상
- 불필요한 파일들 정리

### Security
- 입력 검증 추가
- XSS 방지를 위한 안전한 HTML 렌더링
