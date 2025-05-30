import { useState, useEffect } from 'react';

/**
 * 사용예시
  const [pageSize, setPageSize] = useState(BEST_ITEM_COUNT.pc);
  const windowWidth = useViewport();

  // 화면 너비 기준 보여줄 베스트 상품 수
  useEffect(() => {
    if (windowWidth >= BREAKPOINTS.lg) {
      setPageSize(BEST_ITEM_COUNT.pc);
    } else if (windowWidth >= BREAKPOINTS.md) {
      setPageSize(BEST_ITEM_COUNT.tablet);
    } else {
      setPageSize(BEST_ITEM_COUNT.mobile);
    }
  }, [windowWidth]);
 */
export const useViewport = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    handleWindowResize();
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return width;
};
