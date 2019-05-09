## Tag 추가 방법
1. app/containers/CreateTags 를 import
2. <CreateTags name={tag 이름}> 과 같이 넘겨주면 된다.
3. Map 함수 써서 iterate 하면서 함수 call 하면 됨!

## Card 디자인
- div 는 papper-card 를 쓰면 됨!
- 제목은 div class 에 ellipse 를 추가하면 글자를 잘라준다.
- 본문 내용은 multi-ellips 를 추가하면 3줄로 만들어 준다.