# 🧑🏻‍🌾 THERAPIA 👩🏻‍🌾

## 소개 및 개발 배경
코로나19로 인해 신체적/심리적 문제를 겪고 있는 사람들이 많아졌습니다.<br/>이 문제를 해결하기 위한 여러가지 방안이 등장했고 그 중 저희 팀은 치유농업에 관심을 갖게 되었습니다.

‘치유농업 연구개발 및 육성에 관한 법률(이하 치유농업법)’이 국회를 통과할 만큼 치유농업에 대해 국가가 관심을 가지며 치유농업을 알리고 있지만, 치유농업의 개념조차도 인식하지 못하는 사람들이 많습니다. 이에 농업 활동으로 힐링하는 시간을 얻을 수 있도록 도와주는 서비스를 기획하였습니다.

저희 서비스 이름인 Therapia는 라틴어로 '치료'라는 뜻을 담고 있습니다. 저희 서비스에서 이 치료는 두 가지의 의미를 담고 있습니다.<br/>첫 번째는 '치유농장'을 통한 심적인 치료를 할 수 있다는 의미이고, 두 번째는 '작물 진단'을 통한 신체적인 치료를 할 수 있다는 의미입니다.

## 기능 상세
<img width="250px" src="https://user-images.githubusercontent.com/81412212/182316037-a0e20f64-fc8d-4235-a18a-c938e908f435.png"><img width="250px" src="https://user-images.githubusercontent.com/81412212/182316043-871c926e-b197-45bf-a2f2-b4634f4154dd.png"> <img width="250px" src="https://user-images.githubusercontent.com/81412212/182316060-abcac787-2752-468e-bae9-8eef2e23194e.png">


 **가고 싶은 지역을 검색**하여 지정합니다. <br/>
 해당 지역에서 운영되고 있는 농장들을 볼 수 있습니다. <br/>
 
 **‘주말 농장’, ‘치유 농장’, ‘체험 농장’** 중 관심 있는 농장 유형을 고르면 **지도**에서 선택한 유형의 농장만 볼 수 있습니다. <br/>
 농장들의 위치를 바로 확인할 수 있고 상세 설명은 지도 아래에서 확인할 수 있습니다. <br/>
 상세 설명 카드들은 좌우 스크롤로 이동하며 볼 수 있습니다.
 

 카드를 클릭하면 그 농장에 대한 **추천도**를 도넛차트로 보여줍니다. <br/>
 거리는 현위치로부터 선택한 농장까지의 직선거리, 평점은 사람들이 리뷰와 함께 남긴 평점들의 평균, 추천도는 거리와 평균을 환산한 값의 평균입니다.<br/>
 리뷰 카드는 좌우 스크롤로 이동하며 볼 수 있습니다.

 자신의 증상을 체크하면 그 증상에 맞는 효능 작물을 소개합니다. <br/>
 또한, 작물들로 음식을 만들 수 있게 작물의 효능, 제철 시기, 보관방법, 재료, 레시피 정보를 제공합니다.
 

## 기술
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">&nbsp;<img src="https://img.shields.io/badge/Recoil-007af4.svg?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDI1NS4yMSA2MjMuOTEiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDp3aGl0ZX08L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Im03NC42MiAyNzcuNDYgMS4yNC0uMTMgMzQuNzgtMy4yOC01My40Ny01OC42NkE5Ni40NyA5Ni40NyAwIDAgMSAzMiAxNTAuM0gzYTEyNS4zIDEyNS4zIDAgMCAwIDMyLjggODQuNTdaTTE3Ny4xMyAzNDdsLTM2IDMuNCA1My4zMiA1OC41MUE5Ni40MSA5Ni40MSAwIDAgMSAyMTkuNjMgNDc0aDI4LjkyYTEyNS4yOCAxMjUuMjggMCAwIDAtMzIuNzYtODQuNTdaIi8+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMjUzLjY5IDIzMS42OGMtNi4zMy0zMS4zLTMwLjg5LTU0LjA5LTYyLjU3LTU4LjA3bC02LjM1LS43OWE0OS42MSA0OS42MSAwIDAgMS00My4zNS00OS4xM3YtMjBhNTIuNzUgNTIuNzUgMCAxIDAtMjguOTEtLjM2djIwLjM4YTc4LjU2IDc4LjU2IDAgMCAwIDY4LjY1IDc3LjgybDYuMzYuOGMyMy4yNCAyLjkyIDM0Ljc4IDIwIDM3LjgzIDM1LjFzLS45MyAzNS4zMi0yMS4yMiA0N2E3My44MSA3My44MSAwIDAgMS0zMC4wNiA5LjYybC05NS42NiA5YTEwMi40NSAxMDIuNDUgMCAwIDAtNDEuOCAxMy4zOEM5IDMzMi40NS00LjgxIDM2MyAxLjUyIDM5NC4yOXMzMC44OSA1NC4wOCA2Mi41NyA1OC4wNmw2LjM1LjhhNDkuNiA0OS42IDAgMCAxIDQzLjM1IDQ5LjEydjE4YTUyLjc1IDUyLjc1IDAgMSAwIDI4LjkxLjI2di0xOC4yNmE3OC41NSA3OC41NSAwIDAgMC02OC42NS03Ny44MWwtNi4zNi0uOGMtMjMuMjQtMi45Mi0zNC43OC0yMC4wNS0zNy44My0zNS4xMXMuOTMtMzUuMzIgMjEuMjItNDdhNzMuNjggNzMuNjggMCAwIDEgMzAuMDYtOS42M2w5NS42Ni05YTEwMi40NSAxMDIuNDUgMCAwIDAgNDEuOC0xMy4zOGMyNy42NS0xNi4wMiA0MS40LTQ2LjU0IDM1LjA5LTc3Ljg2WiIvPjwvc3ZnPg==&logoColor=white">&nbsp;<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=black">&nbsp;<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black">&nbsp;

- 리액트와 타입스크립트, 자바스크립트 언어를 사용하여 개발
- 카카오맵API를 사용하여 지도 구현
- 상태관리를 위하여 Recoil 라이브러리를 사용
- 노트북, 컴퓨터 환경보다 모바일을 통한 정보 습득이 익숙한 사용자들을 위해 모바일 화면에 맞게 제작
- 농장 상세 설명은 화면 슬라이드 형식을 이용하여 사용자 경험을 높여 구현


## 활용 데이터
 1) 농림축산식품 공공데이터 포털 - 텃밭 분양 상세정보 (오픈 API 활용해 XML/JSON 포맷으로 데이터 획득)(https://data.mafra.go.kr/opendata/data/indexOpenDataDetail.do?data_id=20171122000000000916)
 2) 공공데이터포털 - 서울시 주말농장 현황 (Excel 데이터를 활용해 데이터 획득 후 파이썬을 이용해 알맞게 가공)(https://www.data.go.kr/data/15047308/fileData.do)
 3) 공공데이터포털 – 농촌진흥청_치유농장 (오픈 API를 활용해 AJAX 방식으로 치유농장 데이터를 획득)(https://www.data.go.kr/data/15081306/openapi.do)



## 커밋 컨벤션

|커밋|컨벤션|
|-----|-----|
|🔥Feat : |기능 추가|
|🛠Fix : |버그 해결|
|🎨Design : |디자인 추가 및 수정|
|📝Docs : |문서 수정 (README.md)|
|🚚Rename : |파일명, 폴더명 수정 또는 이동|
|✂️Chore : |사소한 수정, 소스코드 외 내용|
|✅Test : |테스트 커밋|

## 프론트 팀원

| Name    | 이예진                                     | 최진실                                   |
| ------- | ---------------------------------------- | ---------------------------------------- |
| Profile | <img width="200px" src="" />                               | <img width="200px" src="" />                               |
| Role    |                  |                                   |
| Github  | [@yejinleee](https://github.com/yejinleee) | [@chlwlstlf](https://github.com/chlwlstlf) |

