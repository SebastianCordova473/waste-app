import {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js/auto';

export default function Wastes() {
  const [data, setData] = useState([]);
  const [chartRendered, setChartRendered] = useState(false);
  const chartRef = useRef(null);

  useEffect(() => {
    fetch('http://35.231.78.51/fapi-dev/data.php/merma', {
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((res) => {
        setData(res.waste.reverse()); // Reverse the order of the data
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  useEffect(() => {
    if (data.length > 0 && chartRef.current && !chartRendered) {
      const ctx = chartRef.current.getContext('2d');

      const chartData = {
        labels: data.map((item) => item.mes),
        datasets: [
          {
            label: 'Percentage difference from previous month',
            data: data.map((item, index, array) => {
              if (index === 0) {
                // If it's the first month, set the percentage difference to 0
                return 0;
              } else {
                const currentMonthValue = item.monto;
                const previousMonthValue = array[index - 1].monto;
                return getPercentageDifference(
                  currentMonthValue,
                  previousMonthValue
                );
              }
            }),
            borderColor: 'blue',
            fill: false,
          },
          {
            label: 'Wastes',
            data: data.map((item) => item.monto),
            borderColor: 'red',
            fill: false,
          },
        ],
      };

      new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'category',
              title: {
                display: true,
                text: 'Month',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Percentage Difference / Wastes',
              },
            },
          },
        },
      });

      setChartRendered(true);
    }
  }, [data, chartRendered]);

  return (
    <div>
      <h1>Wastes</h1>
      <div style={{height: '400px'}}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}

function getPercentageDifference(currentValue, previousValue) {
  const diff = (currentValue - previousValue) / previousValue;
  return diff * 100;
}
