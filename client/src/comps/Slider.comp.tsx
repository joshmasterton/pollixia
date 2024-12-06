import { SliderProps } from '../types/comps.types';

export const Slider = <T extends string>({
  register,
  value,
  type,
}: SliderProps<T>) => {
  let displayTime = value;
  let displayType = type;

  if (value > 60) {
    displayTime = Math.floor(value / 60);
    displayType = 'hr';
  } else {
    displayType = 'min';
  }

  return (
    <div className="slider">
      <div>
        {displayTime} {displayType}
      </div>
      <main>
        <span style={{ width: `${(value / 1425) * 100 + 1}%` }}></span>
        <input
          type="range"
          {...register}
          min={1}
          max={1400}
          defaultValue={60}
        />
      </main>
    </div>
  );
};
