# YouTube Script Cloner

유튜브 대본의 스타일을 분석하고 새로운 주제로 유사한 대본을 생성하는 AI 기반 도구입니다.

## 주요 기능

- 📝 대본 구조 및 톤 분석
- 🎯 타겟 오디언스 식별
- 💡 새로운 주제 제안
- ✨ 유사한 스타일의 새 대본 생성

## 로컬 실행

**필수 요구사항:** Node.js

1. 의존성 설치:
   ```bash
   npm install
   ```

2. `.env.local` 파일에 Gemini API 키 설정:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```

3. 앱 실행:
   ```bash
   npm run dev
   ```

## Vercel 배포

1. Vercel에서 GitHub 저장소 연결
2. 환경 변수 설정:
   - `GEMINI_API_KEY`: Google Gemini API 키
3. 배포 완료!

**중요:** Vercel 대시보드의 Settings → Environment Variables에서 `GEMINI_API_KEY`를 반드시 설정해야 합니다.
