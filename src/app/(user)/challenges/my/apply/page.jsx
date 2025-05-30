"use client";

import AppliedChallenges from "./_components/AppliedChallenges";
import ApplyDropdown from "@/components/dropDown/list/ApplyDropdown";
import SearchInput from "@/components/input/SearchInput";
import Sort from "@/components/sort/Sort";
import { ITEM_COUNT } from "@/constant/constant";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { userService } from "@/lib/service/userService";

export default function MyApplicationsPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [applications, setApplications] = useState();
  const [totalCount, setTotalCount] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedSortLabel, setSelectedSortLabel] = useState("신청 시간 느린순");
  const [sort, setSort] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const pageSize = ITEM_COUNT.APPLICATION;

  const { user } = useAuth();

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const { totalCount, applications } = await userService.getMyApplications(page, pageSize, sort, keyword, user?.id);
      setApplications(applications);
      setTotalCount(totalCount);
    } catch (err) {
      console.error("신청 목록 조회 실패:", err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [page, sort, keyword]);

  const handleSortSelect = ({ label, value }) => {
    setSelectedSortLabel(label);
    setSort(value);
    setIsDropdownOpen(false);
    setPage(1);
  };

  return (
    <>
      <div className="mb-4 flex justify-between gap-2">
        <div className="flex-7 sm:flex-8">
          <SearchInput value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </div>
        <div className="relative flex-3 sm:flex-2">
          <Sort isAdminStatus={true} onClick={() => setIsDropdownOpen((prev) => !prev)} label={selectedSortLabel} />
          <div className="absolute right-0 mt-2">{isDropdownOpen && <ApplyDropdown onSelect={handleSortSelect} />}</div>
        </div>
      </div>
      {!loading && applications?.length > 0 ? (
        <AppliedChallenges
          resultData={applications}
          totalCount={totalCount}
          page={page}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
        />
      ) : (
        <div className="mt-[15rem] flex w-full items-center justify-center text-sm text-gray-500">
          아직 챌린지가 없어요.
        </div>
      )}
    </>
  );
}
