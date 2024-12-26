import { useEffect, useState } from 'react';
import { PollType } from '../types/slice.types';
import { PieChart } from '@mui/x-charts';
import { useAppSelector } from '../store';

type ChartDataType = {
  value: number;
}[];

export const PollPie = ({
  poll,
  totalVotes,
}: {
  poll: PollType;
  totalVotes: number;
}) => {
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
            paddingAngle: 3,
            cornerRadius: 3,
            startAngle: 47.5,
            endAngle: 410,
            highlightScope: { fade: 'global', highlight: 'item' },
          },
        ]}
        width={100}
        height={100}
        margin={{
          right: 0,
        }}
      ></PieChart>
      <main>
        {poll.options.map((option, index) => (
          <div key={option.oid}>
            <div>
              <div>{option.text} - </div>
              <p>
                {option.votes !== 0
                  ? Math.round((option?.votes / totalVotes) * 100)
                  : 0}
                % ({option.votes} votes)
              </p>
            </div>
            <span>
              <div
                style={{
                  backgroundColor: optionColors[index],
                  width: `${
                    totalVotes !== 0
                      ? Math.round((option?.votes / totalVotes) * 100)
                      : 0
                  }%`,
                }}
              />
            </span>
          </div>
        ))}
        <div>{`Total votes - ${totalVotes}`}</div>
      </main>
    </div>
  );
};
