import {useEffect, useRef, useState} from 'react';
import Chart from 'chart.js/auto';
import CalculateMAPE from '../utils/CalculateMape';
import NormalizeData from '../utils/NormalizeData';
import {Matrix} from 'ml-matrix';
import MultivariateLinearRegression from 'ml-regression-multivariate-linear';

const WastePrediction = ({data}) => {
  const [predictionDenormalized, setPredictionDenormalized] = useState(0);
  const [meanSquaredError, setMeanSquaredError] = useState(0);
  const [meanAbsoluteError, setMeanAbsoluteError] = useState(0);
  const [rSquared, setRSquared] = useState(0);
  const [mape, setMape] = useState(0);

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  useEffect(() => {
    if (!data) {
      return;
    }

    const {offers, wastes, demands, sales} = data;
    const minOffer = Math.min(...offers);
    const maxOffer = Math.max(...offers);
    const normOffers = NormalizeData(offers, minOffer, maxOffer);
    const normWastes = NormalizeData(
      wastes,
      wastes[0],
      wastes[wastes.length - 1]
    );
    const normDemands = NormalizeData(
      demands,
      demands[0],
      demands[demands.length - 1]
    );
    const normSales = NormalizeData(sales, sales[0], sales[sales.length - 1]);

    const testData = new Matrix([
      normSales,
      normWastes,
      normDemands,
      normOffers,
    ]).transpose();

    const outputs = new Matrix([normWastes]).transpose();

    const regression = new MultivariateLinearRegression(testData, outputs);
    const prediction = regression.predict([1, 1, 1, 1])[0];
    const predictionDenorm =
      prediction * (wastes[wastes.length - 1] - wastes[0]) + wastes[0];

    const yHat = regression.predict(testData);
    const residuals = outputs.sub(yHat);
    const residualsArray = residuals.to1DArray();
    const residualsSquaredArray = residualsArray.map((residual) =>
      Math.pow(residual, 2)
    );
    const residualsSquaredSum = residualsSquaredArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const mse = residualsSquaredSum / residualsArray.length;

    const explainedSumOfSquares =
      outputs.to1DArray().reduce((a, b) => a + b, 0) -
      Math.pow(
        outputs.to1DArray().reduce((a, b) => a + b, 0),
        2
      ) /
        outputs.to1DArray().length;
    const totalSumOfSquares =
      residualsSquaredSum +
      explainedSumOfSquares +
      Math.pow(
        outputs.to1DArray().reduce((a, b) => a + b, 0),
        2
      ) /
        outputs.to1DArray().length;
    const rSquared = 1 - residualsSquaredSum / totalSumOfSquares;

    setPredictionDenormalized(predictionDenorm);
    setMeanSquaredError(mse);
    setRSquared(rSquared);

    const actualWastes = wastes;
    const predictedWastes = yHat
      .to1DArray()
      .map((val) => val * (wastes[wastes.length - 1] - wastes[0]) + wastes[0]);

    setMape(CalculateMAPE(actualWastes, predictedWastes));

    // Calculate Mean Absolute Error (MAE)
    const absoluteErrors = actualWastes.map((actual, index) =>
      Math.abs(actual - predictedWastes[index])
    );
    const mae =
      absoluteErrors.reduce((sum, error) => sum + error, 0) /
      absoluteErrors.length;
    setMeanAbsoluteError(mae);

    const ctx = chartRef.current.getContext('2d');

    // Chart.js configuration
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const chartData = {
      labels: wastes,
      datasets: [
        {
          label: 'Predicted Waste',
          data: predictedWastes,
          borderColor: 'blue',
          fill: false,
        },
        {
          label: 'Actual Waste',
          data: actualWastes,
          borderColor: 'red',
          fill: false,
        },
      ],
    };

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Wastes',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Wastes Predicted',
            },
          },
        },
      },
    });
  }, [data]);

  return (
    <div>
      <h1>Waste Prediction</h1>
      <p>{`The predicted amount of waste is: $${predictionDenormalized}`}</p>
      <p>{`Mean squared error: ${meanSquaredError}`}</p>
      <p>{`Mean absolute error: ${meanAbsoluteError}`}</p>
      <p>{`RSquared: ${rSquared}`}</p>
      <p>{`MAPE: ${mape}`}</p>
      <div style={{height: '400px'}}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default WastePrediction;
