import {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js/auto';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-converter';

const SalesAnalysisChart = ({data}) => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef(null);
  let chartInstance = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const {wastes, demands, offers, sales} = data;
        const wasteTensor = tf.tensor2d(wastes, [wastes.length, 1]);
        const salesTensor = tf.tensor2d(sales, [sales.length, 1]);

        const model = tf.sequential();
        model.add(
          tf.layers.dense({units: 16, activation: 'relu', inputShape: [1]})
        );
        model.add(tf.layers.dense({units: 16, activation: 'relu'}));
        model.add(tf.layers.dense({units: 1}));
        model.compile({loss: 'meanSquaredError', optimizer: 'adam'});
        await model.fit(wasteTensor, salesTensor, {epochs: 100});

        if (isMounted) {
          const predictionsSales = model.predict(salesTensor).dataSync();

          const chartData = {
            labels: sales,
            datasets: [
              {
                label: 'Actual Sales',
                data: sales,
                borderColor: 'blue',
                fill: false,
                hidden: false,
              },
              {
                label: 'Predicted Sales',
                data: Array.from(predictionsSales),
                borderColor: 'lightblue',
                fill: false,
                hidden: false,
              },
            ],
          };

          setChartData(chartData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error training the model:', error);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [data]);

  useEffect(() => {
    if (chartData && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
      chartInstance.current = new Chart(chartRef.current, {
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
                text: 'Actual Sales',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Sales Predicted',
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  const chartStyles = {
    width: '900px', // or any width you want
    height: '700px', // or any height you want
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : chartData ? (
        <canvas style={chartStyles} ref={chartRef} />
      ) : null}
    </div>
  );
};

export default SalesAnalysisChart;
