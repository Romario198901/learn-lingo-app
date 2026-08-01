import clsx from 'clsx';
import ReactSelect, { type SingleValue, type StylesConfig } from 'react-select';

import css from './Select.module.css';

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
  isClearable?: boolean;
}

const selectStyles: StylesConfig<SelectOption, false> = {
  control: base => ({
    ...base,
    minHeight: '3rem',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'none',
    backgroundColor: 'var(--color-white)',
    cursor: 'pointer',
    paddingLeft: '0.125rem',

    '&:hover': {
      border: 'none',
    },
  }),

  valueContainer: base => ({
    ...base,
    minWidth: 0,
    paddingInline: 'var(--space-3)',
  }),

  singleValue: base => ({
    ...base,
    minWidth: 0,
    margin: 0,
    overflow: 'hidden',
    color: 'var(--color-text-main)',
    fontSize: 'var(--fs-md)',
    fontWeight: 500,
    lineHeight: 'var(--lh-small)',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  }),

  placeholder: base => ({
    ...base,
    margin: 0,
    color: 'var(--color-text-main)',
    fontSize: 'var(--fs-md)',
    fontWeight: 500,
    lineHeight: 'var(--lh-small)',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: base => ({
    ...base,
    flexShrink: 0,
    paddingRight: 'var(--space-2)',
  }),
  clearIndicator: base => ({
    ...base,
    width: '1.25rem',
    height: '1.25rem',
    padding: '0.125rem',
    color: 'var(--color-text-secondary)',
    cursor: 'pointer',

    '&:hover': {
      color: 'var(--color-text-main)',
    },
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: 'var(--color-text-main)',
    paddingInline: 'var(--space-4)',
    transform: state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform var(--transition-base)',

    '&:hover': {
      color: 'var(--color-text-main)',
    },
  }),

   menu: base => ({
    ...base,
    marginTop: 'var(--space-1)',
    overflow: 'hidden',
    borderRadius: 'var(--radius-md)',
    backgroundColor: 'var(--color-white)',
    boxShadow: 'var(--shadow-modal)',
    zIndex: 20,
  }),

  menuList: base => ({
    ...base,
    padding: 'var(--space-4)',
  }),

  option: (base, state) => ({
    ...base,
    padding: 'var(--space-1) 0',
    color: state.isSelected
      ? 'var(--color-text-main)'
      : 'rgba(18, 20, 23, 0.2)',
    backgroundColor: 'transparent',
    fontSize: 'var(--fs-md)',
    fontWeight: 500,
    lineHeight: 'var(--lh-small)',
    cursor: 'pointer',

    '&:hover': {
      color: 'var(--color-text-main)',
      backgroundColor: 'transparent',
    },
  }),

  noOptionsMessage: base => ({
    ...base,
    color: 'var(--color-text-secondary)',
    fontSize: 'var(--fs-sm)',
  }),
};

export default function Select({
  label,
  placeholder,
  options,
  value,
  onChange,
  className,
  isClearable = false,
}: SelectProps) {
  const handleChange = (option: SingleValue<SelectOption>) => {
    onChange(option);
  };

  return (
    <div className={clsx(css.wrapper, className)}>
      {label && <span className={css.label}>{label}</span>}

      <ReactSelect<SelectOption, false>
        options={options}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        styles={selectStyles}
        isSearchable={false}
        isClearable={isClearable}
      />
    </div>
  );
}
