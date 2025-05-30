// 참여 현황에서 최다 추천 번역이 여러개인 경우 중복 순위를 표시하는 함수

export function assignRankingWithTies(items, getLikes = (item) => item.likeCount) {
  let lastLikes = null;
  let lastRank = 0;
  let sameCount = 0;

  return items.map((item) => {
    const likes = getLikes(item);

    if (likes === lastLikes) {
      sameCount++;
    } else {
      lastRank += sameCount + 1;
      sameCount = 0;
      lastLikes = likes;
    }

    return {
      ...item,
      rank: lastRank
    };
  });
}
