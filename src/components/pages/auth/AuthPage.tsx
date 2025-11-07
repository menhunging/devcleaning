import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store.ts";
import { useNavigate } from "react-router-dom";

import type { AuthHandleFn } from "@/types/auth/auth";

import { loginUser } from "@/store/slices/authSlice.ts";
import AuthForm from "@/components/features/auth/AuthForm/AuthForm";

import logo from "@/assets/img/logo.png";
import "./AuthPage.scss";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const authHandle: AuthHandleFn = (login, password) => {
    dispatch(loginUser({ login, password }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className="authPage">
      <div className="authPage__head">
        <a href="/" className="logo">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <div className="authPage__body">
        <span className="authPage__caption">Вход</span>
        <AuthForm loading={loading} authHandle={authHandle} />
        <span className={error ? "authError isVisible" : "authError"}>
          {error}
        </span>
      </div>
    </div>
  );
};

export default AuthPage;
