import Select, { components, type SingleValue } from "react-select";
import { styles } from "./SelectUI.styles";
import type { Option, OptionRole } from "@/types/ui/select/select";

import "./SelectUI.scss";

interface SelectUIProps {
  options: Option[] | OptionRole[] | undefined;
  placeholder?: string;
  value?: Option | OptionRole | null | undefined;
  notOptionsPlaceholder?: string;
  onChange: (values: SingleValue<Option>) => void;
}

const DropdownIndicator = (props: any) => {
  const { menuIsOpen } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <svg
        width="11"
        height="6"
        viewBox="0 0 11 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          transform: menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease",
        }}
      >
        <path
          d="M0.5 1L4.99 5.39C5.0236 5.42509 5.06396 5.45301 5.10865 5.47209C5.15333 5.49117 5.20141 5.501 5.25 5.501C5.29859 5.501 5.34667 5.49117 5.39135 5.47209C5.43604 5.45301 5.4764 5.42509 5.51 5.39L10 1"
          stroke="#2B2A2A"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </components.DropdownIndicator>
  );
};

const SelectUI: React.FC<SelectUIProps> = ({
  options,
  placeholder,
  value,
  notOptionsPlaceholder,
  onChange,
}) => (
  <Select
    classNamePrefix="selectUI"
    options={options}
    styles={styles}
    value={value}
    components={{ DropdownIndicator }}
    placeholder={placeholder ? placeholder : "Не назначен"}
    noOptionsMessage={() =>
      notOptionsPlaceholder ? String(notOptionsPlaceholder) : "Здесь ничего нет"
    }
    onChange={(selected) => {
      const valueLocal = (selected as SingleValue<Option>) || null;
      onChange?.(valueLocal);
    }}
  />
);

export default SelectUI;
