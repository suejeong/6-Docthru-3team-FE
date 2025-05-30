import { getApplicationsAction } from "../actions/admin";
import { getApplicationAction } from "../actions/user";

export const adminService = {
  // 챌린지 신청 목록 조회
  getApplications: async (page, pageSize, sort, keyword) => {
    return await getApplicationsAction({ params: { page, pageSize, sort, keyword } });
  },

  // 챌린지 신청 상세 조회 (TODO: 수정))
  getApplication: async (applicationId) => {
    return await getApplicationAction(applicationId);
  }
};
