import React, {useEffect, useState, useRef} from 'react';
import Chart from 'chart.js/auto';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-converter';
import NormalizeData from '../utils/NormalizeData';
import {Matrix} from 'ml-matrix';

const SalesMultipleLinearRegression = ({data}) => {
  const [predictionDenormalized, setPredictionDenormalized] = useState(0);
  const [meanSquaredError, setMeanSquaredError] = useState(0);
  const [rSquared, setRSquared] = useState(0);
  const [mape, setMape] = useState(0);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const {sales, offers, wastes, demands} = data;

  const minOffer = Math.min(...offers);
  const maxOffer = Math.max(...offers);
  const minDemand = Math.min(...demands);
  const maxDemand = Math.max(...demands);
  const minSales = Math.min(...sales);
  const maxSales = Math.max(...sales);
  const minWastes = Math.min(...wastes);
  const maxWastes = Math.max(...wastes);

  const normOffer = NormalizeData(offers, minOffer, maxOffer);
  const normDemand = NormalizeData(demands, minDemand, maxDemand);
  const normSales = NormalizeData(sales, minSales, maxSales);
  const normWastes = NormalizeData(wastes, minWastes, maxWastes);

  const testData = new Matrix();
  return <div>SalesMultipleLinearRegression</div>;
};

export default SalesMultipleLinearRegression;
