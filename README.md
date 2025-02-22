# 43-1st-MG-backend

# Developers

### Back-End Developers 
[Backend-repo](https://github.com/wecode-bootcamp-korea/43-1st-MG-backend)

- 윤수빈 (BE)
- 장지원 (BE)(Product Manager)

### Front-End Developsers
[Frontend-repo](https://github.com/wecode-bootcamp-korea/43-1st-MG-frontend)

- 김진평 (FE)(Project Manager)
- 문은빈 (FE)
- 오지수 (FE)

# STACK

### Back-End

|                                                                                                       JavaScript                                                                                                        |                                                                                              &nbsp;&nbsp;NodeJs&nbsp;&nbsp;                                                                                               |                                                                                        &nbsp;&nbsp;&nbsp;MySql&nbsp;&nbsp;&nbsp;                                                                                         |                                                                                    &nbsp;&nbsp;&nbsp;&nbsp;Rest&nbsp;&nbsp;&nbsp;&nbsp;                                                                                     |                                                                                           &nbsp;&nbsp;&nbsp;Prittier&nbsp;&nbsp;&nbsp;                                                                                            |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| ![javascript](https://camo.githubusercontent.com/d2e764d63294c27eff3598ae3a0df5884b4efcabbdbbd200e51472cddf4a3f03/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6a732d69636f6e2e737667) | ![Nodejs](https://camo.githubusercontent.com/418cbff54fe0ff385225ac464200a519c169c0fd3fb80402a8a9f977efd63c7a/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6e67696e782d69636f6e2e737667) | ![MySql](https://camo.githubusercontent.com/b3578157355b1ac74d38d0f89d1022095ba7f7a988db091cef0fa4a62685e87e/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f6d7973716c2d69636f6e2e737667) | ![Rest](https://camo.githubusercontent.com/06ebb2c20cfd35f27db6d25b0a03f5a0d078f63e20c098c6ce461b7bffd18d60/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f726573746170692d69636f6e2e737667) | ![Prettier](https://camo.githubusercontent.com/82935f72bd8f7a84991ceeb91cba325f0ae3b00f7fb2af42da60a81d3ff631b4/68747470733a2f2f74656368737461636b2d67656e657261746f722e76657263656c2e6170702f70726574746965722d69636f6e2e737667) |

# TOOL

![GIT](https://camo.githubusercontent.com/493683d1e69c600dc04bb375ab588466c554471ea28f7326b390b5103c401058/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4769742d4630353033323f7374796c653d666c6174266c6f676f3d476974266c6f676f436f6c6f723d7768697465)&nbsp;![GitHub](https://camo.githubusercontent.com/779ecf5e6059fd906fca2099015186945f91679f22da6bf05f37f52e69e86e8a/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4769744875622d3138313731373f7374796c653d666c6174266c6f676f3d476974487562266c6f676f436f6c6f723d7768697465)&nbsp;![Slack](https://camo.githubusercontent.com/78f1634c5ea1be58f1f7a433c687cda4fdb475542c6958e4984782d50a30b9a1/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f536c61636b2d3441313534423f7374796c653d666c6174266c6f676f3d536c61636b266c6f676f436f6c6f723d7768697465)&nbsp;![VSCODE](https://camo.githubusercontent.com/e41fd8604cbb491e8716306e2436b9b1c1efe739cc147779b73cb974c2aaf8f7/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5653436f64652d3030374143433f7374796c653d666c6174266c6f676f3d56697375616c2053747564696f20436f6465266c6f676f436f6c6f723d7768697465)

# ERD

![ERD](https://raw.githubusercontent.com/wecode-bootcamp-korea/43-1st-MG-backend/6645fad5aa946afef425c3555f156a52168e6247/ERD.png)

# 담당 구현사항

윤수빈 - 🐧 장지원 - 🐹

- 로그인 🐧
- 회원가입 🐧
- 상품페이지
  - 전체페이지 🐹
  - 상세페이지 🐹
  - 카테고리별 페이지 🐹
- 유저정보
  - 개인정보변경 🐧
  - 주소록 🐹
- 장바구니
  - 장바구니 리스트 불러오기 🐹
  - 장바구니 담기 🐧
  - 장바구니 삭제 🐹
  - 장바구니 수량변경 🐧
- 주문결제
  - 주문페이지 정보 불러오기 🐹
  - 결제 프로세스 🐹
    - 오더스 테이블 넣기 🐹
    - 오더스 프로덕트 테이블 넣기 🐹
    - 카트 테이블 삭제 🐹
    - 유저 테이블 포인트 변경 🐹
- DB 작업 🐧🐹

## 기능

### User

- 회원가입 - 정규표현식을 활용한 유효성 검사, Bcrypt를 사용한 비밀번호 암호화

- 로그인 - 기존에 테이블에 암호화하여 저장한 비밀번호와 입력된 이메일의 비밀번호와의 일치여부 확인 후 일치하면 jwt 토큰 발급

- 인가 - loginRequired 를 작성하여 인가가 필요한 모든 API에 적용

### Product

- 상품 리스트 - 상품 리스트 조회, 카테고리별 조회, 카테고리별 상품 개수 조회

- 상품 디테일 - 상품 상세페이지 조회

- 검색 - 상품 검색 기능 구현

- 할인 - 개수 별 할인 적용된 가격 안내

### Cart

- 장바구니 - 장바구니 조회, 장바구니에 상품 추가, 장바구니 수정, 장바구니 삭제, 회원 잔여 포인트 안내

### Order

- 주문 - 주문 시 필요한 정보 호출 기능 구현, 주문 후 주문서 작성 및 장바구니 비우기, 잔여 포인트 안내
- 결제 - 관리자가 부여한 포인트로 결제 기능 구현
---
## What I learn

- 생각보다 2주는 긴 시간이 아니었다. 좀 더 시간을 잘 배분하여 몰두할 것
- 미처 구현하지 못했던 장바구니 내 물품 선택 삭제 기능과 장바구니 내 상품 선택 구매 기능을 다음엔 꼭 구현해볼 것이다.
- 프론트와 좀 더 미리미리 원활히 소통하고 변수명 같은건 미리미리 정하자..! 미리 명확하게 의논해두지 않으면 나중에 서버 테스트 직전에 폭풍 수정하게 될 수도 있다.
- 커뮤니케이션 능력도 업무에 중요한 역량임을 명심하자
