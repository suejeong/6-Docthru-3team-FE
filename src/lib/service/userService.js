import { getApplicationAction, getApplicationsAction, getMyApplicationsAction, getUserAction } from "../actions/user";

export const userService = {
  // 사용자 정보 조회
  getMe: async () => {
    return await getUserAction();
  },

  // 니의 챌린지 신청 목록 조회
  getMyApplications: async (page, pageSize, sort, keyword, userId) => {
    return await getMyApplicationsAction({ params: { page, pageSize, sort, keyword, userId } });
  },

  // 나의 챌린지 신청 상세 조회
  getApplication: async (applicationId) => {
    return await getApplicationAction(applicationId);
  }
};
