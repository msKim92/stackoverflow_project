# Todo Challenge

## Todo Back_End

### Mapper 리팩토링(beanMapper or  ModelMapper 적용)

- 적용할 Mapper
    - questionMapper
    - AnswerMapper

### 질문
- Question, Answer 좋아요 기능
-> 자신이 속한 Question, Answer id를 받아와서 그 id의 vote수를 증가 시킨다.
- 질문 전체 화면
    - 검색 기능 추가  expired 11월 1일
        - 질문 제목 기준 검색 
        - repository -> findbyTitle
        - service
        - controller
        - 못찾으면 오류 방출
    - questionFrontResponse에 변경될 내용
        - 댓글 수 표시 추가 - go
        - 참조된 태그를 리스트로 변경하여 전송 필요 //민섭님 아이디어로 대체 -> complete
    - 페이지네이션 기능 추가
        - 생성일자 기준 내림차순 조회 기능(기본) - go
        - 댓글 수 기준 내림차순 조회 기능 - go 
        - 조회 수 기준 내림차순 조회 기능 - go
        - 좋아요 수 기준 내림차순 조회 기능 (+,- 컨트롤러 추가) - go

- 질문 상세 화면

  - questionDetailResponse에 변경될 내용 -> complete
    

### 사용자 (민섭, 이서)

- 사용자 상세페이지

    - UserDto.Response에 변경될 내용
        
       - Questions(리스트,작성 시간 기준으로 페이지네이션) - complete
            - Question 제목,
            - 작성시간
       - Answers(리스트,작성 시간 기준으로 페이지네이션) - complete
            - Question 제목,
            - 작성시간

    - 사용자 상세페이지 접근 가능 방법 - complete
        - question 상세페이지에서 클릭 - complete
        - question 전체페이지에서 클릭 - complete


### 태그 -> complete
- expired 11월 1일
- 태그 컨트롤러 날리고, 엔티티 날리기
- 상세 페이지에서 태그 String tag로 받고 , List<String> tags = tag.split(".");
- 이걸 question 쪽 컨트롤러에 추가




