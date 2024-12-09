import { SliderProps } from '../types/comps.types';

export const Slider = <T extends string>({
  register,
  value,
  type,
}: SliderProps<T>) => {
  return (
    <div className="slider">
      <div>{type}</div>
      <main>
        <span style={{ width: `${((value - 1) / (24 - 1)) * 100}%` }}></span>
        <input
          type="range"
          {...register}
          min={1}
          max={24}
          defaultValue={1}
          step={1}
        />
      </main>
    </div>
  );
};
