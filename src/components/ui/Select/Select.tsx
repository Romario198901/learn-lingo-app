import ReactSelect, { type SingleValue, type StylesConfig } from 'react-select';

import css from './Select.module.css';
import clsx from 'clsx';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value: SelectOption | null;
  onChange: (option: SelectOption | null) => void;
  className?: string;
}

const selectStyles: StylesConfig<SelectOption, false> = {
  control: base => ({
    ...base,
    minHeight: '3rem',
    width: '100%',
    border: 'none',
    borderRadius: '0.875rem',
    boxShadow: 'none',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
    paddingLeft: '0.125rem',
    paddingRight: '0.125rem',

    '&:hover': {
      border: 'none',
    },
  }),

  valueContainer: base => ({
    ...base,
    padding: '0 0.875rem',
  }),

  singleValue: base => ({
    ...base,
    color: '#121417',
    fontSize: '1rem',
    fontWeight: 500,
  }),

  placeholder: base => ({
    ...base,
    color: '#121417',
    fontSize: '1rem',
    fontWeight: 500,
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    color: '#121417',
    padding: '0 0.875rem',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : undefined,
    transition: 'transform 250ms ease',

    '&:hover': {
      color: '#121417',
    },
  }),

  menu: base => ({
    ...base,
    marginTop: '0.25rem',
    borderRadius: '0.875rem',
    overflow: 'hidden',
    boxShadow: 'none',
    zIndex: 20,
  }),

  menuList: base => ({
    ...base,
    padding: '0.875rem',
  }),

  option: (base, state) => ({
    ...base,
    padding: '0.25rem 0',
    color: state.isSelected ? '#121417' : 'rgba(18, 20, 23, 0.2)',
    backgroundColor: 'transparent',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',

    '&:hover': {
      color: '#121417',
      backgroundColor: 'transparent',
    },
  }),
};

export default function Select({
  label,
  placeholder,
  options,
  value,
  onChange,
  className = '',
}: SelectProps) {
  const handleChange = (option: SingleValue<SelectOption>) => {
    onChange(option);
  };

  return (
    <label className={clsx(css.wrapper, className)}>
      {label && <span className={css.label}>{label}</span>}
      <ReactSelect<SelectOption, false>
        options={options}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        styles={selectStyles}
        isSearchable={false}
      />
    </label>
  );
}
