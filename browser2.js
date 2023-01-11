/*
요소 검색

getElementById, getElementsBy* 메서드들은 잘 사용되지 않습니다.
실무에선 간단한 querySelector를 사용합시다
!
getElementById는 document 객체를 대상으로 해당 id를 가진 요소 노드를 찾아 줍니다.
문서 노드가 아닌 다른 노드엔 호출할 수 없습니다.
이름이 충돌할 수 있기 때문에 id를 따서 만들어진 전역변수를 요소 접근시 사용하면 안됩니다.

querySelectorAll

document.querySelectorAll(css)
css를 선택자로 사용할 수 있습니다.

document.querySelectorAll(".item:hover li:first-child")

document.querySelector
elem.querySelector(css)는 주어진 CSS 선택자에 대응하는 요소 중 첫 번째 요소


getElements*와 querySelector의 차이

getElement는 살아있지만, querySelector는 정적입니다.

<div>1</div>
<script>
  const el1 = document.getElementsByTagName('div')
  const el2 = document.querySelectorAll("div")
  console.log(el1.length) // 1
  console.log(el2.length) // 1

  document.body.append(document.createElement('div'))
  console.log(el1.length) // 2
  console.log(el2.length) // 1
</script>


const element1 = document.getElementById('number')
console.log(element1.textContent) // 1



console.log(element1.textContent) // 2


// 요소가 일치하는지 여부를 불리언값으로 반환합니다.
element.matches('a[herf$='zip'')

element.closest(css)는 elem 자기 자신을 포함하여 CSS 선택자와 일치하는 가장 가까운 조상 요소를 찾을 수 있게 도와줍니다.

elemA.contains(elemB)는 elemB가 elemA에 속하거나(elemB가 elemA의 후손인 경우) elemA==elemB일 때, 참을 반환합니다.

*/

/*
속성과 프로퍼티

브라우저는 웹 페이지를 만나면 HTML을 파싱하여 DOM객체를 만듭니다.
element node에서 표준 html property는 DOM객체의 property가 됩니다.
<body id="page">가 있을 때, DOM 객체에서 body.id="page"를 사용할 수 있는 것 처럼요

1. 비표준 html 프로퍼티는 DOM객체의 property가 되지 않습니다.
2. 태그마다 지원하는 프로퍼티가 다릅니다.

비표준 프로퍼티의 경우 아래 메서드를 사용해 접근할 수 있습니다.
elem.hasAttribute(name) – 속성 존재 여부 확인
elem.getAttribute(name) – 속성값을 가져옴
elem.setAttribute(name, value) – 속성값을 변경함
elem.removeAttribute(name) – 속성값을 지움

속성과 프로퍼티의 동기화

표준 속성은 대부분 프로퍼티와 동기화 되어 있습니다.


아래와 같은 예외사항도 존재합니다. 
이럴경우 프로퍼티를 되돌리는데 속성을 사용할 수 있습니다.
<input>
<script>
  let input = document.querySelector('input');

  // 속성 추가 => 프로퍼티 갱신
  input.setAttribute('value', 'text');
  console.log(input.value); // text (갱신)

  // 프로퍼티를 변경해도 속성이 갱신되지 않음
  input.value = 'newValue2';
  console.log(input.value) // newValue2
  console.log(input.getAttribute('value')); // text (갱신 안됨!)
</script>

속성은 HTML안에서 쓰이고,
프로퍼티는 DOM에서 쓰이기 떄문에 이런 차이점이 발생합니다.

그 외에도 프로퍼티의와 속성의 타입이 다른 경우나, 내용이 다른 경우가 발생할 수 있습니다.
비표준 속성이 표준 속성이 될 경우도 문제가 될 수 있습니다.
그래서 'data-'로 시작하는 datashet 프로퍼티를 사용하여 속성에 접근하는 것이 좋습니다.
<body data-about="Elephants">
<script>
  console.log(document.body.dataset.about) // Elephants
</script>

css로 dataset 속성을 선택할 수 있습니다.
<style>
  .order[data-order-state='new'] {

  }
  .order[data-order-state='pending] {

  }
</style>
*/

/*
문서 수정하기

### create

document.createElement(<tag>)
document.createText(string)
document.createComment(string)

### insert

node.append(노드나 문자열) – 노드나 문자열을 node 끝에 삽입합니다.
node.prepend(노드나 문자열) – 노드나 문자열을 node 맨 앞에 삽입합니다.
node.before(노드나 문자열) –- 노드나 문자열을 node 이전에 삽입합니다.
node.after(노드나 문자열) –- 노드나 문자열을 node 다음에 삽입합니다.
node.replaceWith(노드나 문자열) –- node를 새로운 노드나 문자열로 대체합니다.\


### insertAdjacentHTML/Text/Element

elem.insertAdjacentHTML(where, html)에서 첫 번째 매개변수는 elem을 기준으로 하는 상대 위치로, 다음 값 중 하나여야 합니다.
'beforebegin' – elem 바로 앞에 html을 삽입합니다.
'afterbegin' – elem의 첫 번째 자식 요소 바로 앞에 html을 삽입합니다.
'beforeend' – elem의 마지막 자식 요소 바로 다음에 html을 삽입합니다.
'afterend' – elem 바로 다음에 html을 삽입합니다.

div.insertAdjacentHTML('beforebegin', '<p>안녕하세요.</p>');
div.insertAdjacentHTML('afterend', '<p>안녕히 가세요.</p>');

### remove

element.remove()

### clone
element.cloneNode(boolean)
- true일 경우 후손 요소까지 전부 복사
- false일 경우 후손 노드 복사 없이 현제 요소만 복사

### DocumentFragment

특별한 노드 타입으로, 여러 노드로 구성된 그룹을 감사 다른 곳으로 전달해주는 역할을 합니다.
template 요소 같이 DocumentFragment를 기반으로하는 문법이 있습니다.

let fragment = new DocumentFragment();
for(let i = 0 ; i < 3;i++) {
  let li = document.creatElement('li')
  li.append(i)
  fragment.append(li)
}
 document.body.append(fragment) // fragment는 녹아없어지고 li만 남습니다.


### 구식 메서드
 parentElement.appendChild(node)
 parentElement.insertBefore(node, nextSibling)
 parentElement.replaceChild(node, oldChild)
 prentElement.rem##oveChild(node)

### document.write
사용하지 않는게 좋은 구식 메서드 입니다.

브라우저가 html을 파싱하는 중에 document.write를 만나면 텍스트 형식의 html을 원래 페이지에 있던것 마냥 해석합니다.
dom을 조작하지 않기 때문에 속도가 빨라집니다. dom이 완성되기 전에 내용이 삽입되기 때문입니다.
하지만 document.write는 페이지를 불러오는 도중에만 작동합니다. 
페이지가 로드 된 후 document.write를 호출하면 기존 문서 내용이 사라집니다.

 */

/*
-> 문서 수정하기 요약본
노드 생성 메서드:

document.createElement(tag) – 태그 이름을 사용해 새로운 요소를 만듦
document.createTextNode(value) – 텍스트 노드를 만듦(잘 쓰이지 않음)
elem.cloneNode(deep) – 요소를 복제함. deep==true일 경우 모든 자손 요소도 복제됨
노드 삽입, 삭제 메서드:

node.append(노드나 문자열) – node 끝에 노드를 삽입
node.prepend(노드나 문자열) – node 맨 앞에 노드를 삽입
node.before(노드나 문자열) –- node 이전에 노드를 삽입
node.after(노드나 문자열) –- node 다음에 노드를 삽입
node.replaceWith(노드나 문자열) –- node를 대체
node.remove() –- node를 제거
문자열을 삽입, 삭제할 땐 문자열을 ‘그대로’ 넣으면 됩니다.

‘구식’ 메서드:

parent.appendChild(node)
parent.insertBefore(node, nextSibling)
parent.removeChild(node)
parent.replaceChild(newElem, node)
이 메서드들은 전부 node를 반환합니다.

html에 HTML을 넣으면 메서드 elem.insertAdjacentHTML(where, html)은 where 값에 따라 특정 위치에 HTML을 삽입함

"beforebegin" – elem 바로 앞에 html을 삽입
"afterbegin" – elem의 첫 번째 자식 요소 바로 앞에 html을 삽입
"beforeend" – elem의 마지막 자식 요소 바로 다음에 html을 삽입
"afterend" – elem 바로 다음에 html을 삽입
문자열이나 요소 삽입에 쓰이는 유사 메서드 elem.insertAdjacentText와 elem.insertAdjacentElement도 있는데, 잘 쓰이지는 않음

페이지 로딩이 끝나기 전에 HTML을 삽입해주는 메서드:

document.write(html)
문서 로딩이 끝난 상태에서 이 메서드를 호출하면 문서 내용이 지워짐. 오래된 스크립트에서 볼 수 있음
*/

/*
스타일과 클래스

## className과 classList
과거엔 "class" 프로퍼티를 사용할 수 없었기 때문에
클래스를 위한 프로퍼티 "className"가 도입되게 되었습니다. elem.className는 "class" 속성에 대응합니다.

elem.classList.add/remove("class") – class를 추가하거나 제거
elem.classList.toggle("class") – class가 존재할 경우 class를 제거하고, 그렇지 않은 경우엔 추가
elem.classList.contains("class") – class 존재 여부에 따라 true/false를 반환
classList는 이터러블 객체라서 for...of가 사용가능합니다.


cssText로 css규칙 다시 작성하기
개발 스타일 프로퍼티는 element.style.* 를 사용합니다.
element.style은 읽기 전용 객체이기 때문에 여러 프로퍼티를 동시에 변경하고 싶다면 cssText를 사용해야 합니다.

// cssText를 사용하면 'important' 같은 규칙도 설정할 수 있습니다.
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;


계산 값(computed style value) – CSS 규칙과 CSS 상속이 모두 적용된 후의 값을 의미합니다. 값의 형태는 height:1em나 font-size:125% 같이 생겼습니다.
결정 값(resolved style value) – 요소에 최종적으로 적용되는 값을 의미합니다. 계산 값에서 사용한 1em나 125%은 상대 단위를 사용하는 상댓값인데, 
브라우저는 계산 값을 받아 단위를 전환해 height:20px나 font-size:16px같이 고정 단위를 사용하는 값(절댓값)으로 값을 변환합니다. 
기하 관련 프로퍼티의 결정 값에는 width:50.5px같이 소수점 단위가 있을 수 있습니다.

getComputedStyle로 계산된 스타일 얻기
style 프로퍼티만으론 CSS 종속(CSS cascade)값을 다루지 못합니다.
마진을 현재 크기보다 20px 더 크게 하려면 어떻게 해야 할까요? 원하는 작업을 하려먼 먼저 현재 크기를 알 수 있어야 합니다.
이럴 때 getComputedStyle 메서드를 사용할 수 있습니다.

getComputedStyle(element, [pseudo])

element
값을 읽을 요소
pseudo
::before같이 의사 요소(pseudo-element)가 필요한 경우 명시해줌. 빈 문자열을 넘겨주거나 아무런 값을 입력하지 않은 경우 요소 자체를 의미함
! paddingLeft, borderTopWidth같이 정확한 값을 명시해 줘야합니다.
padding, margin같은 프로퍼티를 사용하면 브라우저에 따라 동작이 다를 수 있습니다.

:visited 링크 관련 스타일은 숨겨져 있습니다.
사생활 침해여부를 고려하여 이런 제약들 생겼습니다.
*/
