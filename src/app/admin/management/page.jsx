"use client";

import AppliedChallenges from "@/app/(user)/challenges/my/apply/_components/AppliedChallenges";
import ApplyDropdown from "@/components/dropDown/list/ApplyDropdown";
import SearchInput from "@/components/input/SearchInput";
import Sort from "@/components/sort/Sort";
import { ITEM_COUNT } from "@/constant/constant";
import { adminService } from "@/lib/service/adminService";
import { useEffect, useState } from "react";

export default function AdminManagementPage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [applications, setApplications] = useState();
  const [totalCount, setTotalCount] = useState(null);
  const [page, setPage] = useState(1);
  const [selectedSortLabel, setSelectedSortLabel] = useState("신청 시간 느린순");
  const [sort, setSort] = useState(null);
  const [keyword, setKeyword] = useState("");
  const pageSize = ITEM_COUNT.APPLICATION;

  const fetchApplications = async () => {
    try {
      const { totalCount, applications } = await adminService.getApplications(page, pageSize, sort, keyword);
      setApplications(applications);
      setTotalCount(totalCount);
    } catch (err) {
      console.error("신청 목록 조회 실패:", err.message);
      alert(err.message);
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
      <h1 className="mt-[26px] mb-[13px] text-xl font-semibold md:mt-[34px] md:mb-6">챌린지 신청 관리</h1>
      <div className="mb-4 grid grid-cols-[2.5fr_1fr] gap-3 md:mb-6 md:grid-cols-[4fr_1fr] lg:grid-cols-[6fr_1fr]">
        <SearchInput value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <div className="relative">
          <Sort isAdminStatus={true} onClick={() => setIsDropdownOpen((prev) => !prev)} label={selectedSortLabel} />
          {isDropdownOpen && <ApplyDropdown onSelect={handleSortSelect} className="absolute right-0 mt-2" />}
        </div>
      </div>
      <AppliedChallenges
        resultData={applications}
        totalCount={totalCount}
        page={page}
        pageSize={pageSize}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </>
  );
}
