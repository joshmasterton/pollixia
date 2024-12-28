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
  const optionColors =
    localTheme === 'dark'
      ? ['#3656E1', '#633DCF', '#4B4CDC', '#E5C02A', '#E79527']
      : ['#4264ff', '#8356ff', '#5c5cff', '#ffd630', '#ffa42d'];

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
            paddingAngle: 0,
            cornerRadius: 3,
            startAngle: 47.5,
            endAngle: 425,
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
