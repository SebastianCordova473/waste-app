import {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js/auto';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-converter';

const SalesAnalysisChart = ({data}) => {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef(null);
  let chartInstance = useRef(null); // useRef here

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {wastes, demands, offers, sales} = data;

        // Call the function to predict using the extracted data
        await predictSalesWasteDemandOffer(wastes, demands, offers, sales);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [data]);

  const predictSalesWasteDemandOffer = async (
    wastes,
    demands,
    offers,
    sales
  ) => {
    try {
      // Convert the data to TensorFlow tensors
      const wasteTensor = tf.tensor2d(wastes, [wastes.length, 1]);
      const demandsTensor = tf.tensor2d(demands, [demands.length, 1]);
      const offersTensor = tf.tensor2d(offers, [offers.length, 1]);
      const salesTensor = tf.tensor2d(sales, [sales.length, 1]);

      // Set up the neural network model
      const model = tf.sequential();
      model.add(
        tf.layers.dense({units: 16, activation: 'relu', inputShape: [1]})
      );
      model.add(tf.layers.dense({units: 16, activation: 'relu'}));
      model.add(tf.layers.dense({units: 1}));

      // Compile the model
      model.compile({loss: 'meanSquaredError', optimizer: 'adam'});

      // Train the model
      await model.fit(wasteTensor, salesTensor, {epochs: 100});

      // Make predictions using the trained model
      const predictionsSales = model.predict(salesTensor).dataSync();
      const predictionsWastes = model.predict(wasteTensor).dataSync();
      const predictionsDemands = model.predict(demandsTensor).dataSync();
      const predictionsOffers = model.predict(offersTensor).dataSync();

      // Set up the data for the chart
      const chartData = {
        labels: wastes,
        datasets: [
          {
            label: 'Actual Sales',
            data: sales,
            borderColor: 'blue',
            fill: false,
          },
          {
            label: 'Predicted Sales',
            data: Array.from(predictionsSales),
            borderColor: 'lightblue',
            fill: false,
          },
          {
            label: 'Actual Waste',
            data: wastes,
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'Predicted Waste',
            data: Array.from(predictionsWastes),
            borderColor: 'pink',
            fill: false,
          },
          {
            label: 'Actual Demands',
            data: demands,
            borderColor: 'green',
            fill: false,
          },
          {
            label: 'Predicted Demands',
            data: Array.from(predictionsDemands),
            borderColor: 'lightgreen',
            fill: false,
          },
          {
            label: 'Actual Offers',
            data: offers,
            borderColor: 'orange',
            fill: false,
          },
          {
            label: 'Predicted Offers',
            data: Array.from(predictionsOffers),
            borderColor: 'lightorange',
            fill: false,
          },
        ],
      };

      // Update the chart data state
      setChartData(chartData);
    } catch (error) {
      console.error('Error training the model:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (chartData && chartRef.current) {
      // If there's a chart already, destroy it
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
                text: 'X Axis',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Y Axis',
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : chartData ? (
        <canvas ref={chartRef} /> // use a canvas element with a ref instead of the Line component
      ) : null}
    </div>
  );
};

export default SalesAnalysisChart;
