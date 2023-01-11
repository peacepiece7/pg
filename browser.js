/*
브라우저 환경과 다양한 명세서

자바스크립트가 돌아가는 플랫폼은 호스트(Host)라고 부릅니다.
호스트는 브라우저, 웹서버, 커피 머신도 될 수 있습니다.
각 플랫폼은 해당 플랫폼에 특정되는 기능을 제공하는데 자바스크립트 명세서에서는 이것을 호스트 환경(Host Envinorment)라고 부릅니다.

호스트 환경이란?
자바스크립트의 플랫폼이 제공하는 환경을 말합니다.
호스트 환경은 랭귀지 코어(ECMAScript – 옮긴이)에 더하여 플랫폼에 특정되는 객체와 함수를 제공합니다.

브라우저의 경우 최상단에 window 객체가 있고, nodejs는 global 객체가 있습니다..

window 객체는 아래와 같은 특정을 가집니다.
1. 자바스크립트 코드의 전역 객체입니다.
2. 브라우저 창(browser window)을 대변하고, 이를 제어할 수 있는 메서드를 제공합니다.

DOM(Document Object Model)
웹 페이지 내 콘텐츠를 객체로 나타내줍니다. 이 객체는 수정 가능합니다.
document 객체는 진입점 역할을 합니다.
UI에서 핵심적인 역할을 합니다.

HTML 명세서
HTML언어, window, setTimeout, alert, lacation 등 BOM에 대한 설명이 있습니다.

BOM(Browser Object Model)
문서 이외의 모든 것을 제어하기 위해 브라우저(호스트 환경)에서 제공하는 추가 객체를 나타냅니다.

CSSOM 명세서
CSS규칙과 스타일시트를 어떻게 객체로 나타내고 읽고 쓸수 있을지에 대한 설명이 기제되어 있습니다.
자바스크립트를 이용해 CSS 규칙을 추가 혹은 제거해야 하는 경우는 극히 드물긴 하지만, 이때 CSSOM이 사용됩니다.
*/


/*
주요 노트 프로퍼티

DOM node class
Node 클레스는 최상위 EventTarget을 상속받고 다른 DOM 노드들은 Node 클레스를 상속 받습니다.
EventTarget <= Node <= [Text, Element, Comment] 
                                |<= HTMLElement <= [HTMLInput, HTMLBody ...]

1. Node 클래스를 상속받는 모든 DOM 노드들은 공통 프로퍼티, 메서드를 지원합니다.
2. DOM 노드의 종류에 따라 다른 프로퍼티를 추가 제공합니다.

EventTarget
- 추상 클래스로, 객체는 실제하지 않습니다.
- EventTarget은 최상위 노드이기 때문에 DOME노드는 모두 이벤트를 사용할 수 잇습니다.

Node 
- 추상클레스로, DOM 노드의 베이스 역할을 합니다.
- 트리 탐색 기능(parentNode, nextSibling, childNodes)

Element
- DOM 요소를 위한 베이스 클레스 입니다.
- nextElementSilbing, chidren, querySelector메서드가 이를 기반으로 합니다

HTMLElement
- HTML 요소 노드의 베이스 역할을 하는 클레스입니다. HTMLIinputElemet, HTMLBodyElement...등  모두 HTMLElement를 상속받습니다.
*/
const inputElement = document.createElement('input')
if(inputElement.constructor  == HTMLInputElement) console.log(inputElement.constructor.name)
if(inputElement instanceof HTMLInputElement) console.log(true)

/*
  ## nodeName과 tageName으로 태그 이름 확인하기
  tagName = element 노드에만 존재합니다.
  nodeName = 모든 Node에 있습니다.
*/
console.log(document.body.firstChild.tagName) // ? body안에 뭐가 들었지에 따라서 달라집니다.
console.log(document.body.firstChild.nodeName) // ? body안에 뭐가 들었지에 따라서 달라집니다.

console.log(document.tagName) // undefined
console.log(document.nodeName) // #document

/*
  ## innerHTML, outerHTML
  innerHTML 은 내용을 덮어쓰기떄문에 주의해야합니다.
*/
document.body.innerHTML = 'hi';
document.body.innerHTML += 'bye'; // bye
/*
  outerHTML의 할당연산은 요소를 수정하지 않습니다. 읽기용으로 사용합시다.
*/
/*
  nodeValue/data로 텍스트 노드 내용 조작
  DOM node calss에서 #text, #comment가 어떤 노드인지 확인해보고 내용을 조작해봅시다
  main.html 참고!
*/
/*
  textContent로 순수한 텍스트만
  innerHTML, textContent
  
  ! 인터렉티브한 동작인 textContent를 사용하세요
  innerHTML
  - xss에 취약합니다.
  - 태그, 숨겨진 내용까지 전부 화면에 출력 됩니다.
  innerText
  - css를 고려하여 텍스트를 가져옵니다. 
  - 그렇기 때문에 리플로우(화면을 다시 그리는 비싼 행위)가 일어날 수 있고, 실제 요소가 가지고 있는 텍스트와 다를 수 있습니다.
  textContent
  - 요소가 가지고 있는 텍스트를 그대로 가져옵니다. (css로 문자열을 가려도 원본 그대로 가져옵니다.)
*/
/*
  hidden 프로퍼티
  display=none과 같습니다.
  다만, 태그에 직접 사용할 수 있습니다.
  <div hidden>hi</div>

*/
/*
DOM 탐색하기

childNodes, firstChild, lastChild로 자식 노드 탐색

childNodes 컬렉션은 텍스트 노드를 포함한 모든 자식 노드를 담고 있습니다.
firstChild == childNodes[0], lastChild == childNodes.length-1 과 같습니다.

! 텍스트 노드나 document노드를 제외하고 싶다면 chidren을 사용할 수 있습니다.

DOM 컬렉션
childNodes는 이터러블로 유사배열 객체인 컬렉션(collection)입니다.
for..of를 사용해서 순회할 수 있고, Array.from, [...array]로 진짜 배열로 만들 수 있습니다.

요소를 선택하는 프로퍼티
firstChild, firstElementChild,
parentElement, parentNode
children, childNodes는 어떻게 다를까요?

node는 element를 포함합니다.

html

document 노드는 요소가 아니가 때문에 parentElement는 상위 요소가 없다고 판단하고 null을 반환합니다.
alert( document.documentElement.parentNode ); // document
alert( document.documentElement.parentElement ); // null

마찬가지로 childNodes는 텍스트 노드는 포함하지만, children은 요소만 선택하기 때문에 텍스트 노드, 코맨트 노드를 포함하지 않습니다.

<html>
<body>
  <div>시작</div>

  <ul>
    <li>항목</li>
  </ul>

  <div>끝</div>

  <script>
    for (let elem of document.body.children) {
      alert(elem); // DIV, UL, DIV, SCRIPT
    }
  </script>
  ...
</body>
</html>
*/


/*
1. clinetWidth, clientHeigth : padding을 포함한 cotent size입니다. scroll, border, margin size,는 포함되지 않습니다.
2. offsetWidth, offsetHeight : clientWidth에 scroll, border size를 포함한 크기입니다. margin size는 포함되지 않습니다.
*/


// offsetParent 프로퍼티는 해당 요소를 렌더링할 때, 좌표 계산에 사용되는 가장 가까운 조상 요소의 참조를 반환합니다.
// 1. CSS position 프로퍼티가 absolute나 relative, fixed, sticky인 가장 가까운 조상 요소
// 2. <td>나 <th>, 혹은 <table>
// 3. <body></body>
/*
    offsetLeft, offsetTop 프로퍼티는 offsetParent를 기준으로 offsetWidth, offsetHeight가 얼마나 떨어져 있는지를 나타냅니다.

    ! offset*프로퍼티는 0또는 null을 반환합니다. 주의하세요!



clientTop, clientLeft
border + scroll size입니다.
스크롤이 왼쪽또는 위에 있을 경우 계산에 주의하세요!

scrollWidth, scrollHeight
스크롤에 감춰진 사이즈를 나타냅니다.
scroll, padding size를 포함하지 않습니다.

scrollLeft, scrollTop은 가로 스크롤이 오른쪽, 세로 스크롤이 아래로 움직임에 따라 가려진 영역의 너비와 높이를 나타냅니다.
구글 검색 결과창에서 document.querySelector('html').scrollTop를 콘솔에 입력해보세요

! scrollLeft, scrollTop은 수정가능합니다.
scrollToTop이나 scrollToBottom같은 기능을 만들 떄 사용할 수 있습니다.

요약
요소는 다음과 같은 기하 프로퍼티를 지원합니다.

offsetParent – 위치 계산에 사용되는 가장 가까운 조상 요소나 td, th, table, body
offsetLeft와 offsetTop – offsetParent 기준으로 요소가 각각 오른쪽, 아래쪽으로 얼마나 떨어져 있는지를 나타내는 값
offsetWidth와 offsetHeight – 테두리를 포함 요소 '전체’가 차지하는 너비와 높이
clientLeft와 clientTop – 요소 제일 밖을 감싸는 영역과 요소 안(콘텐츠 + 패딩)을 감싸는 영역 사이의 거리를 나타냄. 대부분의 경우 왼쪽, 위쪽 테두리 두께와 일치하지만, 오른쪽에서 왼쪽으로 글을 쓰는 언어가 세팅된 OS에선 clientLeft에 스크롤바 두께가 포함됨
clientWidth와 clientHeight – 콘텐츠와 패딩을 포함한 영역의 너비와 높이로, 스크롤바는 포함되지 않음
scrollWidth와 scrollHeight – clientWidth, clientHeight 같이 콘텐츠와 패딩을 포함한 영역의 너비와 높이를 나타내는데, 스크롤바에 의해 숨겨진 콘텐츠 영역까지 포함됨
scrollLeft와 scrollTop – 스크롤바가 오른쪽, 아래로 움직임에 따라 가려지게 되는 요소 콘텐츠의 너비와 높이
스크롤바를 움직일 수 있게 해주는 scrollLeft와 scrollTop을 제외한 모든 프로퍼티는 읽기 전용입니다.
*/