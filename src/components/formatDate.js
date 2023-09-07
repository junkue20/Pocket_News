export const formatDate = date => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 2자리로 포맷
  const day = date.getDate().toString().padStart(2, '0'); 
  let hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const ampm = hours < 12 ? '오전' : '오후';
  hours = (hours > 12 ? hours - 12 : hours )
  const formattedDate = `${year}년 ${month}월 ${day}일 ${ampm} ${hours}시 ${minutes}분`;
  
  return formattedDate;
}