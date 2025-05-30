import dayjs from "dayjs";

export const formatDate = (date) => dayjs(date).format("YY/MM/DD");

// 마감기한
export const formatDeadline = (deadline) => dayjs(deadline).format("YYYY년 MM월 DD일");

// 신청 거절/삭제일
export const formatInvalidatedAt = (invalidatedAt) => dayjs(invalidatedAt).format("YY/MM/DD HH:MM");
