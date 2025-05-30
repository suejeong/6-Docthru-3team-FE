import { useEffect } from 'react';

/**
 * 외부 클릭 감지 커스텀 훅
 * 사용법
 * const profileRef = useRef(null)
 * @param {*} ref - profileRef
 * @param {*} handler - () => setIsProfileOpen(false)
 */
export function useOutsideClick(ref, handler) {
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]);
}
