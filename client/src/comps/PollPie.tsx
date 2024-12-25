import { useEffect, useState } from 'react';
import { PollType } from '../types/slice.types';
import { PieChart } from '@mui/x-charts';
import { useAppSelector } from '../store';

type ChartDataType = {
  value: number;
}[];

export const PollPie = ({ poll }: { poll: PollType }) => {
  const { localTheme } = useAppSelector((state) => state.theme);
  const [chartData, setChartData] = useState<ChartDataType>([]);
  const optionColors = [
    'rgba(59, 84, 226, 0.75)',
    'rgba(98, 62, 208, 0.75)',
    'rgba(85, 51, 173, 0.75)',
    'rgba(231, 201, 43, 0.75)',
    'rgba(231, 146, 39, 0.75)',
  ];

  useEffect(() => {
    if (poll) {
      const data = poll.options.map((option) => ({
        value: option.votes,
      }));

      setChartData(data);
    }
  }, [poll, localTheme]);

  return (
    <div className="pollPie">
      <PieChart
        colors={optionColors}
        series={[
          {
            data: chartData,
            innerRadius: '25%',
            outerRadius: '100%',
            paddingAngle: 2,
            cornerRadius: 10,
            startAngle: 47.5,
            endAngle: 410,
            highlightScope: { fade: 'global', highlight: 'item' },
          },
        ]}
        margin={{
          right: 0,
        }}
      />
      <main>
        {poll.options.map((option, index) => (
          <div key={option.oid}>
            <span style={{ backgroundColor: optionColors[index] }} />
            <div>{option.text}</div>
          </div>
        ))}
      </main>
    </div>
  );
};
