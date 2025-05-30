// 이메일 유효성 검사
export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return !regex.test(email.trim());
};

// 비밀번호 유효성 검사
export const validatePassword = (password) => {
  if (password && password.length < 8) return "length";
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&()_+\[\]{};':"\\|,.<>\/?]).{8,15}$/;
  if (!regex.test(password)) return "invalid";
  return "";
};

// 비밀번호 확인 유효성 검사
export const validatePasswordConfirmation = (password, passwordConfirmation) => {
  return password !== passwordConfirmation;
};
