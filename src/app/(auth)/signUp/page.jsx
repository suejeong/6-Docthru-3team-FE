"use client";

import Container from "@/components/container/PageContainer";
import EmailInput from "@/components/input/EmailInput";
import PasswordInput from "@/components/input/PasswordInput";
import PasswordConfirmationInput from "@/components/input/PasswordConfirmationInput";
import NicknameInput from "@/components/input/NicknameInput";
import SubmitButton from "@/components/btn/auth/SubmitButton";
import GoogleLoginButton from "@/components/btn/auth/GoogleLoginButton";
import AuthModal from "@/components/modal/AuthModal";
import Logo from "@/layout/_components/Logo";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { validateEmail, validatePassword, validatePasswordConfirmation } from "@/lib/utils/authUtils";

export default function SignUpPage() {
  const [values, setValues] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirmation: ""
  });

  const [errors, setErrors] = useState({
    email: false,
    nickname: false,
    password: "",
    passwordConfirmation: false
  });

  const [modalState, setModalState] = useState({
    open: false,
    success: false,
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const emailErr = validateEmail(values.email);
    const nicknameErr = values.nickname.trim() === "";
    const passwordErr = validatePassword(values.password);
    const passwordConfirmErr = validatePasswordConfirmation(values.password, values.passwordConfirmation);

    setErrors({
      email: emailErr,
      nickname: nicknameErr,
      password: passwordErr,
      passwordConfirmation: passwordConfirmErr
    });

    return !emailErr && !nicknameErr && !passwordErr && !passwordConfirmErr;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const { email, nickname, password, passwordConfirmation } = values;

    setLoading(true);
    try {
      const result = await register(email, nickname, password, passwordConfirmation);
      if (result?.error) {
        setModalState({
          open: true,
          success: false,
          message: result.message
        });
        return;
      }
      setModalState({
        open: true,
        success: true,
        message: "가입이 완료되었습니다!"
      });
    } catch (err) {
      setModalState({
        open: true,
        success: false,
        message: err.message || "회원가입 중 오류 발생"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    if (modalState.success) {
      router.push("/signIn");
    } else {
      setModalState((prev) => ({ ...prev, open: false }));
    }
  };

  return (
    <Container>
      <div className="mt-15 mb-30 flex flex-col items-center md:mt-30">
        <Logo className="mb-10 h-[54px] w-60 md:h-18 md:w-80" />
        <form className="mb-[18px] space-y-6" onSubmit={handleSubmit}>
          <EmailInput value={values.email} onChange={handleChange} error={errors.email} />
          <NicknameInput value={values.nickname} onChange={handleChange} error={errors.nickname} />
          <PasswordInput value={values.password} onChange={handleChange} error={errors.password} />
          <PasswordConfirmationInput
            value={values.passwordConfirmation}
            onChange={handleChange}
            error={errors.passwordConfirmation}
          />
          <SubmitButton
            type={loading ? "가입 중" : "회원가입"}
            loading={loading}
            hasInputValue={Object.values(values).some(Boolean)}
          />
        </form>
        <GoogleLoginButton />
        <div className="mt-6 space-x-2">
          <span>회원이신가요?</span>
          <Link href="/signIn" className="underline">
            로그인하기
          </Link>
        </div>
      </div>

      {modalState.open && <AuthModal message={modalState.message} onClose={handleModalClose} />}
    </Container>
  );
}
