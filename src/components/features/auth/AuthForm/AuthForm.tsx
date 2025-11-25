import { useState } from "react";

import type { AuthFormProps } from "@/types/auth/auth";

import "./AuthForm.scss";

const AuthForm: React.FC<AuthFormProps> = ({ loading, authHandle }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authHandle(login, password);
  };

  const btnDisabled = loading || !login || !password;

  return (
    <form onSubmit={handleSubmit} className="authForm" autoComplete="off">
      <div className="input-item">
        <input
          type="text"
          placeholder="Логин"
          name="name"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
      </div>

      <div className="input-item">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Пароль"
          name="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <span
          className={showPassword ? "icon-eye active" : "icon-eye"}
          onClick={() => setShowPassword((prev) => !prev)}
        ></span>
      </div>

      <button className="btn btn--white" type="submit" disabled={btnDisabled}>
        {loading ? "Вход..." : "Войти"}
      </button>
    </form>
  );
};

export default AuthForm;
