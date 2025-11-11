import type { StylesConfig } from "react-select";

// стили для select в обьекте для назначения менеджера
export const styles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    minHeight: "0px",
    gap: "0px",
    cursor: "pointer",
  }),
  option: (provided) => ({
    ...provided,
    borderRadius: "12px",
    backgroundColor: "transparent",
    color: "#6F7583",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "transparent",
      color: "#1C1C1C",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    boxShadow: "none",
    marginTop: 0,
    borderRadius: "12px",
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    borderRadius: "12px",
    minWidth: "200px",
    width: "100%",
    boxShadow: "2px 3px 8px 0px #0000000D",
    /*кастомизация скроллбара */
    "::-webkit-scrollbar": {
      width: "6px",
      height: "6px",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: "#C8E6C9",
      borderRadius: "3px",
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#1C1C1C", // цвет выбранного значения
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#6F7583", // цвет плейсхолдера
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "0", // убираем лишние отступы
    width: "12px", // задаём ширину области стрелки
    height: "12px", // задаём высоту области стрелки
    display: "flex",
    alignItems: "center",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  valueContainer: (provided: any) => ({
    ...provided,
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: "#AEB1B933", // фон для выбранного значения
    borderRadius: "30px",
    padding: "10px",
    display: "flex",
    alignItems: "center",
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: "##6F7583", // цвет текста
    fontWeight: 600,
    fontSize: "13px",
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: "#1C1C1C", // цвет крестика удаления
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#EE3B3B", // фон при наведении на крестик
      color: "#fff",
      borderRadius: "20px;",
    },
  }),
};
