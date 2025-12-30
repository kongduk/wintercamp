# 해양 유해 생물 레시피 공유 서비스 API 명세서

## 기본 정보

- **Base URL**: `https://your-api-server.com/api`
- **인증 방식**: Bearer Token (JWT)
- **Content-Type**: `application/json`
- **응답 형식**: JSON

---

## 인증 (Authentication)

### 회원가입
프론트엔드에서 처리 (localStorage 기반)

### 로그인
프론트엔드에서 처리 (localStorage 기반)

### 로그아웃
프론트엔드에서 처리 (localStorage 기반)

---

## 레시피 (Recipes)

### 1. 전체 레시피 조회
```
GET /recipes
```

**Query Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| category | string | 선택 | 카테고리 필터 (`전체`, `한식`, `양식`, `중식`, `일식`) |
| species | string | 선택 | 유해 생물 종류 |
| limit | number | 선택 | 한 페이지당 개수 (기본값: 20) |
| offset | number | 선택 | 오프셋 (기본값: 0) |

**Response 200**
```json
{
  "recipes": [
    {
      "id": "uuid",
      "userId": "user-uuid",
      "userName": "사용자명",
      "title": "레시피 제목",
      "species": "군소",
      "category": "한식",
      "ingredients": ["재료1", "재료2"],
      "steps": ["조리법1", "조리법2"],
      "cookingTime": "30분",
      "difficulty": "중",
      "images": ["https://image-url-1.jpg", "https://image-url-2.jpg"],
      "rating": 4.5,
      "reviewCount": 10,
      "viewCount": 100,
      "likeCount": 50,
      "createdAt": "2025-12-30T12:00:00.000Z",
      "updatedAt": "2025-12-30T12:00:00.000Z"
    }
  ],
  "total": 100
}
```

---

### 2. 단일 레시피 조회
```
GET /recipes/:id
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| id | string | 필수 | 레시피 ID |

**Response 200**
```json
{
  "recipe": {
    "id": "uuid",
    "userId": "user-uuid",
    "userName": "사용자명",
    "title": "레시피 제목",
    "species": "군소",
    "category": "한식",
    "ingredients": ["재료1", "재료2"],
    "steps": ["조리법1", "조리법2"],
    "cookingTime": "30분",
    "difficulty": "중",
    "images": ["https://image-url-1.jpg"],
    "rating": 4.5,
    "reviewCount": 10,
    "viewCount": 101,
    "likeCount": 50,
    "createdAt": "2025-12-30T12:00:00.000Z",
    "updatedAt": "2025-12-30T12:00:00.000Z"
  }
}
```

**Response 404**
```json
{
  "error": "레시피를 찾을 수 없습니다."
}
```

---

### 3. 레시피 생성
```
POST /recipes
```

**Headers**
```
Authorization: Bearer {token}
```

**Request Body**
```json
{
  "title": "레시피 제목",
  "species": "군소",
  "category": "한식",
  "ingredients": ["재료1", "재료2"],
  "steps": ["조리법1", "조리법2"],
  "cookingTime": "30분",
  "difficulty": "중",
  "images": ["https://image-url-1.jpg"]
}
```

**Response 201**
```json
{
  "recipe": {
    "id": "uuid",
    "userId": "user-uuid",
    "userName": "사용자명",
    "title": "레시피 제목",
    "species": "군소",
    "category": "한식",
    "ingredients": ["재료1", "재료2"],
    "steps": ["조리법1", "조리법2"],
    "cookingTime": "30분",
    "difficulty": "중",
    "images": ["https://image-url-1.jpg"],
    "rating": 0,
    "reviewCount": 0,
    "viewCount": 0,
    "likeCount": 0,
    "createdAt": "2025-12-30T12:00:00.000Z",
    "updatedAt": "2025-12-30T12:00:00.000Z"
  }
}
```

**Response 401**
```json
{
  "error": "로그인이 필요합니다."
}
```

---

### 4. 레시피 수정
```
PUT /recipes/:id
```

**Headers**
```
Authorization: Bearer {token}
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| id | string | 필수 | 레시피 ID |

**Request Body**
```json
{
  "title": "수정된 레시피 제목",
  "species": "소라",
  "category": "양식",
  "ingredients": ["재료1", "재료2", "재료3"],
  "steps": ["조리법1", "조리법2"],
  "cookingTime": "45분",
  "difficulty": "어려움",
  "images": ["https://image-url-1.jpg"]
}
```

**Response 200**
```json
{
  "recipe": {
    "id": "uuid",
    "userId": "user-uuid",
    "userName": "사용자명",
    "title": "수정된 레시피 제목",
    "species": "소라",
    "category": "양식",
    "ingredients": ["재료1", "재료2", "재료3"],
    "steps": ["조리법1", "조리법2"],
    "cookingTime": "45분",
    "difficulty": "어려움",
    "images": ["https://image-url-1.jpg"],
    "rating": 4.5,
    "reviewCount": 10,
    "viewCount": 101,
    "likeCount": 50,
    "createdAt": "2025-12-30T12:00:00.000Z",
    "updatedAt": "2025-12-30T13:00:00.000Z"
  }
}
```

**Response 403**
```json
{
  "error": "권한이 없습니다."
}
```

---

### 5. 레시피 삭제
```
DELETE /recipes/:id
```

**Headers**
```
Authorization: Bearer {token}
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| id | string | 필수 | 레시피 ID |

**Response 200**
```json
{
  "success": true
}
```

**Response 403**
```json
{
  "error": "권한이 없습니다."
}
```

---

### 6. 내 레시피 조회
```
GET /my-recipes
```

**Headers**
```
Authorization: Bearer {token}
```

**Response 200**
```json
{
  "recipes": [
    {
      "id": "uuid",
      "userId": "user-uuid",
      "userName": "사용자명",
      "title": "레시피 제목",
      "species": "군소",
      "category": "한식",
      "ingredients": ["재료1", "재료2"],
      "steps": ["조리법1", "조리법2"],
      "cookingTime": "30분",
      "difficulty": "중",
      "images": ["https://image-url-1.jpg"],
      "rating": 4.5,
      "reviewCount": 10,
      "viewCount": 100,
      "likeCount": 50,
      "createdAt": "2025-12-30T12:00:00.000Z",
      "updatedAt": "2025-12-30T12:00:00.000Z"
    }
  ]
}
```

---

## 리뷰 (Reviews)

### 1. 레시피 리뷰 조회
```
GET /recipes/:id/reviews
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| id | string | 필수 | 레시피 ID |

**Response 200**
```json
{
  "reviews": [
    {
      "id": "uuid",
      "recipeId": "recipe-uuid",
      "userId": "user-uuid",
      "userName": "사용자명",
      "rating": 5,
      "comment": "정말 맛있어요!",
      "images": ["https://review-image-1.jpg"],
      "createdAt": "2025-12-30T12:00:00.000Z"
    }
  ]
}
```

---

### 2. 리뷰 작성
```
POST /recipes/:id/reviews
```

**Headers**
```
Authorization: Bearer {token}
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| id | string | 필수 | 레시피 ID |

**Request Body**
```json
{
  "rating": 5,
  "comment": "정말 맛있어요!",
  "images": ["https://review-image-1.jpg"]
}
```

**Response 201**
```json
{
  "review": {
    "id": "uuid",
    "recipeId": "recipe-uuid",
    "userId": "user-uuid",
    "userName": "사용자명",
    "rating": 5,
    "comment": "정말 맛있어요!",
    "images": ["https://review-image-1.jpg"],
    "createdAt": "2025-12-30T12:00:00.000Z"
  }
}
```

---

## 좋아요 (Likes)

### 1. 좋아요 토글
```
POST /recipes/:id/like
```

**Headers**
```
Authorization: Bearer {token}
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| id | string | 필수 | 레시피 ID |

**Response 200**
```json
{
  "isLiked": true
}
```

---

### 2. 좋아요 상태 확인
```
GET /recipes/:id/like
```

**Headers**
```
Authorization: Bearer {token}
```

**Path Parameters**
| 파라미터 | 타입 | 필수 | 설명 |
|---------|------|------|------|
| id | string | 필수 | 레시피 ID |

**Response 200**
```json
{
  "isLiked": false
}
```

---

## 이미지 업로드 (Image Upload)

### 이미지 업로드
```
POST /upload
```

**Headers**
```
Authorization: Bearer {token}
Content-Type: multipart/form-data
```

**Request Body (FormData)**
| 필드 | 타입 | 필수 | 설명 |
|------|------|------|------|
| file | File | 필수 | 업로드할 이미지 파일 |

**Response 200**
```json
{
  "url": "https://cdn.example.com/images/uuid.jpg",
  "path": "images/uuid.jpg"
}
```

**Response 401**
```json
{
  "error": "로그인이 필요합니다."
}
```

**Response 400**
```json
{
  "error": "파일이 없습니다."
}
```

---

## 유해 생물 정보

### 지원하는 유해 생물 목록
1. 아무르불가사리
2. 별불가사리
3. 고둥
4. 보라성게
5. 말똥성게
6. 군소
7. 소라
8. 감태
9. 모자반

---

## 카테고리 목록
- 전체
- 한식
- 양식
- 중식
- 일식

---

## 난이도 목록
- 쉬움
- 중
- 어려움

---

## 에러 코드

| 상태 코드 | 설명 |
|----------|------|
| 200 | 성공 |
| 201 | 생성 성공 |
| 400 | 잘못된 요청 |
| 401 | 인증 필요 |
| 403 | 권한 없음 |
| 404 | 찾을 수 없음 |
| 500 | 서버 오류 |

---

## 참고사항

### 인증 토큰
- 프론트엔드에서 localStorage에 저장된 사용자 정보를 기반으로 토큰 생성
- 백엔드에서는 토큰 검증 없이 userId를 신뢰 (프로토타입용)
- 실제 서비스에서는 JWT 검증 필요

### 이미지 처리
- 업로드된 이미지는 CDN URL로 반환
- 지원 형식: JPG, PNG, WebP
- 최대 크기: 5MB

### 페이지네이션
- 기본 limit: 20
- 최대 limit: 100
- offset 기반 페이지네이션 사용

### 정렬
- 레시피: 최신순 정렬 (createdAt DESC)
- 리뷰: 최신순 정렬 (createdAt DESC)
