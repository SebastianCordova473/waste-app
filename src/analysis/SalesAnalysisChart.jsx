import {useEffect, useRef} from 'react';
import Chart from 'chart.js/auto';

const SalesAnalysisChart = ({data}) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      const chartData = {
        labels: data.season.map((s) => `${s.periodo} - ${s.estacion}`),
        datasets: [
          {
            label: 'Sales',
            data: data.sales,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
          {
            label: 'Offers',
            data: data.offers,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1,
          },
          {
            label: 'Demands',
            data: data.demands,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Wastes',
            data: data.wastes,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };

      const chartConfig = {
        type: 'line',
        data: chartData,
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        },
      };

      chartInstance.current = new Chart(chartContainer.current, chartConfig);
    }
  }, [data]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default SalesAnalysisChart;
