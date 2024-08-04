// components/PieChart.js
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ data }) => {
  const statusCounts = data.reduce(
    (acc, user) => {
      acc[user.status] = (acc[user.status] || 0) + 1;
      return acc;
    },
    { 'not interesting': 0, 'yes': 0, 'no': 0 }
  );

  const total = statusCounts['not interesting'] + statusCounts['yes'] + statusCounts['no'];

  const chartData = {
    labels: ['Not Interesting', 'Yes', 'No'],
    datasets: [
      {
        label: '# of Votes',
        data: [statusCounts['not interesting'], statusCounts['yes'], statusCounts['no']],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        formatter: (value, context) => {
          const percentage = ((value / total) * 100).toFixed(2);
          return `${context.chart.data.labels[context.dataIndex]}: ${percentage}%`;
        },
        color: '#fff',
        font: {
          size: 16,
          weight: 'bold',
        },
        color: 'black',
        anchor: 'end',
        align: 'start',
        offset: 10,
        borderRadius: 8,
        backgroundColor: (context) => context.dataset.backgroundColor,
        padding: 6,
    
      },
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PieChart;
