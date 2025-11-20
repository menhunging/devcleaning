import { useState } from "react";

interface SwitcherProps {
  status: number;
  dispatch: () => void;
}

export const Switcher = ({ status, dispatch }: SwitcherProps) => {
  const [isCooldown, setIsCooldown] = useState(false);

  const handleClick = () => {
    if (isCooldown) return; // блокируем повторный клик

    setIsCooldown(true);
    dispatch();

    // снимаем блокировку через 1 секунду
    setTimeout(() => setIsCooldown(false), 1000);
  };

  return (
    <div className="switcher">
      <span
        className={status === 1 ? "switcher__text isActive" : "switcher__text"}
        onClick={handleClick}
      >
        {status === 1 ? "Активно" : "Остановлено"}
      </span>
    </div>
  );
};
