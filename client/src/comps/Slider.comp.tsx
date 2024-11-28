import { SliderProps } from '../types/comps.types';

export const Slider = <T extends string>({
  register,
  value,
  type,
}: SliderProps<T>) => {
  return (
    <div className="slider">
      <div>{type}</div>
      <span style={{ width: `${value * 4}%` }}></span>
      <input type="range" {...register} min={1} max={24} defaultValue={1} />
    </div>
  );
};
