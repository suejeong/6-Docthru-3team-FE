import { getChallenges } from "@/lib/api/challenge-api/searchChallenge";
import { useState, useEffect, useCallback } from "react";

const useChallenges = (myChallengeStatus) => {
  const [filters, setFilters] = useState({
    categories: [],
    docType: "",
    status: ""
  });
  const [challenges, setChallenges] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);

  const getInitialPageSize = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth > 375 ? 5 : 4;
    }
    return 4;
  };

  const [pageSize, setPageSize] = useState(getInitialPageSize);
  const [filterCount, setFilterCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getChallengesData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const options = {
        page,
        pageSize,
        keyword,
        category: filters.categories,
        docType: filters.docType,
        status: filters.status
      };

      //디버깅
      console.log("keyword", keyword);

      const challengesResults = await getChallenges(options, myChallengeStatus);
      setTotalCount(challengesResults.totalCount);

      const results = Array.isArray(challengesResults?.data) ? challengesResults.data : [];

      const currentDate = new Date();

      let filteredResults = results;
      if (filters.status === "progress") {
        filteredResults = results.filter((result) => {
          const deadlineDate = new Date(result.deadline);
          return deadlineDate.getTime() > currentDate.getTime();
        });
      } else if (filters.status === "closed") {
        filteredResults = results.filter((result) => {
          const deadlineDate = new Date(result.deadline);
          return deadlineDate.getTime() < currentDate.getTime();
        });
      }
      setChallenges(filteredResults);
    } catch (err) {
      console.error("챌린지 목록 불러오기 실패:", err);
      setError("챌린지 목록을 불러오는 데 실패했습니다.");
      setChallenges([]);
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, keyword, filters.categories, filters.docType, filters.status]);

  useEffect(() => {
    getChallengesData();
  }, [getChallengesData]);

  useEffect(() => {
    setPage(1);
  }, [filters, keyword]);

  const applyFilters = useCallback(({ fields, docType, status }) => {
    setFilters({
      categories: fields,
      docType,
      status
    });

    const currentFilterCount = [fields.length > 0 ? 1 : 0, docType ? 1 : 0, status ? 1 : 0].filter(Boolean).length;

    setFilterCount(currentFilterCount);
  }, []);

  return {
    challenges,
    totalCount,
    page,
    pageSize,
    keyword,
    filters,
    filterCount,
    isLoading,
    error,
    setPage,
    setKeyword,
    applyFilters,
    setChallenges,
    setTotalCount
  };
};

export default useChallenges;
