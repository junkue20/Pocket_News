import 'dotenv/config';

export const searchNews = (topic) => {  // form submit 기본 전송기능(action) 막기
  require('dotenv').config();

  const apiKey = process.env.API_KEY;
  const url = `https://newsapi.org/v2/everything?q=${topic}&apiKey=${apiKey}`;
  //검색내용 없을 때는 alert창 & 에러메세지
  if (topic == '') {
    alert('검색할 키워드를 입력해주세요!');
    return Promise.reject(new Error('topic is required'));
  }
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        alert('해당 키워드로는 검색할 수 없습니다!');
        throw new Error('뉴스 검색에 실패했습니다.');
      }
      return res.json();
    });
}