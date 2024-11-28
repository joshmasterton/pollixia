import { useState } from 'react';
import { CgChevronDown } from 'react-icons/cg';
import { CreateFormData, DropdownProps } from '../types/comps.types';

export const Dropdown = ({
  options,
  setValue,
}: DropdownProps<CreateFormData>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [valueState, setValueState] = useState('');

  const handleChangeValue = (option: string) => {
    setValueState(option);
    setValue('category', option);
    setIsOpen(false);
  };

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`}>
      <button type="button" onClick={() => setIsOpen(!isOpen)}>
        <div>{valueState === '' ? 'Choose a category' : valueState}</div>
      </button>
      <CgChevronDown />
      <ul>
        {options.map((option) => (
          <button
            type="button"
            onClick={() => handleChangeValue(option)}
            key={option}
          >
            <div>{option}</div>
          </button>
        ))}
      </ul>
    </div>
  );
};
