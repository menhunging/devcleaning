import Select, { components } from "react-select";
import type { MultiValue } from "react-select";
import { styles } from "./SelectUIMulti.styles";
import type { Option } from "@/types/ui/select/select";

interface SelectUIProps {
  options: Option[] | undefined;
  value?: Option[] | undefined;
  notOptionsPlaceholder?: string;
  onChange: (values: MultiValue<Option>) => void;
}

const CustomMultiValueRemove = (props: any) => {
  return (
    <components.MultiValueRemove {...props}>
      <span>
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.76923 10L0 9.23077L4.23077 5L0 0.76923L0.76923 0L5 4.23077L9.23077 0L10 0.76923L5.76923 5L10 9.23077L9.23077 10L5 5.76923L0.76923 10Z"
            fill="#1C1C1C"
          />
        </svg>
      </span>
    </components.MultiValueRemove>
  );
};

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

const CheckboxOption = (props: any) => {
  return (
    <components.Option {...props}>
      <div className="optionSelectMulti">
        <span
          className={
            props.isSelected
              ? "optionSelectMulti__name isSelected"
              : "optionSelectMulti__name"
          }
        >
          {props.label}
        </span>
      </div>
    </components.Option>
  );
};

const SelectUIMulti: React.FC<SelectUIProps> = ({
  options,
  value,
  notOptionsPlaceholder,
  onChange,
}) => (
  <Select
    options={options}
    styles={styles}
    value={value}
    components={{
      DropdownIndicator,
      Option: CheckboxOption,
      MultiValueRemove: CustomMultiValueRemove,
    }}
    noOptionsMessage={() =>
      notOptionsPlaceholder ? String(notOptionsPlaceholder) : "Здесь ничего нет"
    }
    isMulti
    placeholder="Выбрать"
    closeMenuOnSelect={false}
    hideSelectedOptions={false} // выбранные остаются в списке
    isClearable={false} // крестик для удаления всех полей
    onChange={(selected) => {
      const values = (selected as MultiValue<Option>) || [];
      onChange?.(values);
    }}
  />
);

export default SelectUIMulti;
