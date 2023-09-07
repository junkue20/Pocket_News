import { searchNews } from './api/api';
import { formatDate } from './components/formatDate.js';

// DOM 구조 생성
const searchInput = document.querySelector('.search-input');
const newsList = document.querySelector('.news-lists');
const loader = document.querySelector('.loader');
const $topBtn = document.querySelector('.moveTopBtn');


// 로딩상태 플래그
let isLoading = false;

// 맨 위로 버튼 숨김기능
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  // 스크롤 위치가 특정 값 이상인 경우 버튼 출현
  if (scrollY > 200) {
    $topBtn.style.visibility = 'visible';
    $topBtn.style.opacity = '1';
  } else {
    $topBtn.style.visibility = 'hidden';
    $topBtn.style.opacity = '0';
  }
});

// Top버튼 클릭 시 맨 위로 이동
$topBtn.onclick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const searchForm = document.querySelector('.search-form');
// form 검색 인식하면 이벤트 실행

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (isLoading) {
    return; // 이미 로딩 중인 경우 다시 요청하지 않음
  }

  const topic = searchInput.value;

  if (!topic) {
    return; // 검색어가 비어있는 경우 처리하지 않음
  }

  // 로딩 상태 설정
  isLoading = true;
  loader.style.display = 'block';

  // news-list의 내용값 비우기 (기존 검색된 li 모두 제거)
  newsList.innerHTML = '';

  // newsApi에서 가져온 정보로 DOM에 출력
  searchNews(topic)
    .then((data) => {
      // 데이터 처리 코드
      data.articles.forEach((article) => {
        /* 뉴스 받아오기*/
        const li = document.createElement('li');
        li.className = 'news';
        const a = document.createElement('a');
        a.setAttribute('href', article.url);
        a.setAttribute('target', '_blank');

        /* 뉴스 썸네일 */
        const thumbnail = document.createElement('div');
        thumbnail.className = 'news-thumbnail';
        const thumbnailImg = document.createElement('img');
        thumbnailImg.setAttribute('src', article.urlToImage);

        /* 뉴스 내용 */
        const contents = document.createElement('div');
        contents.className = 'news-contents';

        /* 뉴슥 내용 - 작성자 , 날짜 */
        const newsInfo = document.createElement('div');
        newsInfo.className = 'news-info';
        // 작성자
        const author = document.createElement('span');
        author.className = 'news-author';
        author.textContent = article.source.name;

        // 날짜
        const date = document.createElement('span');
        date.className = 'news-date';
        const dateStr = article.publishedAt; // 기사 날짜
        const dateFix = new Date(dateStr);
        date.textContent = formatDate(dateFix);

        /* 뉴슥 내용 - 제목 */
        //div.news-title
        const title = document.createElement('p');
        title.className = 'news-title';
        title.textContent = article.title;

        /* 뉴슥 내용 - 설명글 */
        //  div.news-description
        const description = document.createElement('p');
        description.className = 'news-description';
        description.textContent = article.description;

        /*만든 DOM요소들 부모에 넣기 */
        newsList.appendChild(li);
        li.appendChild(a);
        // 썸네일 이미지
        a.appendChild(thumbnail);
        thumbnail.append(thumbnailImg);
        // 기사내용
        a.appendChild(contents);

        // 기사 작성자 (뉴스사이트명)
        contents.appendChild(author);

        contents.appendChild(title);
        contents.appendChild(date);
      });

      // 관련 뉴스 없을 때
      let totalResults = data.totalResults;
      if (totalResults == '0') {
        let noResult = document.createElement('strong');
        noResult.className = 'noResult';
        noResult.textContent = '흠.. 기사가 없는 것 같아요..!';
        setTimeout(() => {
          noResult.textContent = '';
        }, 3000);
        newsList.appendChild(noResult);
      }
    })
    .catch((error) => {
      console.log('error : ', error);
    }).finally(() => {
      // 로딩 상태 초기화
    isLoading = false;
    loader.style.display = 'none';
    });
});
