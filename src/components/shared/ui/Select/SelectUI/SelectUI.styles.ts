import type { StylesConfig } from "react-select";

// стили для select в обьекте для назначения менеджера
export const styles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    border: "none",
    boxShadow: "none",
    minHeight: "20px",
    cursor: "pointer",
  }),
  option: (provided, state) => ({
    ...provided,
    borderRadius: "12px",
    backgroundColor: state.isSelected ? "#019875" : "#fff", // цвет выбранного
    color: state.isSelected ? "#fff" : "#6F7583",
    cursor: "pointer",
    "&:hover": {
      // backgroundColor: "#019875",
      color: state.isSelected ? "#fff" : "#1C1C1C",
    },
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "none",
    padding: "0px",
    marginTop: 0,
  }),
  menuList: (provided) => ({
    ...provided,
    backgroundColor: "#fff",
    borderRadius: "12px",
    minWidth: "250px",
    padding: "0px",
    boxShadow: "2px 3px 8px 0px #0000000D",
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
    justifyContent: "center",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
};
