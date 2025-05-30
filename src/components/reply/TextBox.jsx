import TextareaAutosize from "react-textarea-autosize";

/**
 * TextBox 컴포넌트
 *
 * 자동 높이 조절이 가능한 텍스트 입력 컴포넌트입니다.
 * - `Enter` 키로 제출 가능하며, `Shift + Enter`는 줄바꿈으로 처리됩니다.
 * - 줄 수는 최소 3줄, 최대 6줄까지 자동 확장됩니다.
 * - 외부 상태로부터 제어되는 제어 컴포넌트입니다.
 *
 * @component
 * @example
 * <TextBox
 *   value={text}
 *   onChange={(e) => setText(e.target.value)}
 *   onSubmit={(val) => console.log("제출:", val)}
 * />
 *
 * @param {Object} props - 컴포넌트 props
 * @param {string} props.value - 텍스트 입력 값 (제어 상태)
 * @param {(e: React.ChangeEvent<HTMLTextAreaElement>) => void} props.onChange - 입력 변경 핸들러
 * @param {(value: string) => void} [props.onSubmit] - Enter 키로 제출 시 실행되는 콜백
 * @param {string} [props.placeholder] - placeholder 텍스트 (기본값: "피드백을 남겨주세요")
 *
 * @returns {JSX.Element} 자동 크기 조절 textarea JSX
 */
export default function TextBox({
  value = "",
  onChange,
  onSubmit = () => {},
  placeholder = "피드백을 남겨주세요",
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSubmit(value);
      }
    }
  };

  return (
    <TextareaAutosize
      minRows={3}
      maxRows={6}
      className="w-full rounded-xl border border-gray-200 p-4"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={handleKeyDown}
    />
  );
}
