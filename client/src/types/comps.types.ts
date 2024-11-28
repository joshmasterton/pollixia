import {
  FieldValues,
  UseFormRegisterReturn,
  UseFormSetValue,
} from 'react-hook-form';

export type CreateFormData = {
  question: string;
  category: string;
  lengthActive: number;
  options: {
    value: string;
  }[];
};

export type SliderProps<T extends string> = {
  register: UseFormRegisterReturn<T>;
  value: number;
  type: string;
};

export type DropdownProps<T extends FieldValues> = {
  options: string[];
  setValue: UseFormSetValue<T>;
};
