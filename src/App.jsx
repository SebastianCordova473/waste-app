import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import WastesReduction from './wastes';
import Strategies from './strategies';
import SalesNeuronalNetworking from './analysis/SalesNeuronalNetworking';
import WastePrediction from './wastes/WastePrediction';
import {useState, useEffect, useRef} from 'react';
import {BASE_URL} from '../src/utils/Constants';
const App = () => {
  const [data, setData] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      const fetchData = async () => {
        try {
          const response = await fetch(BASE_URL + '/data.php/api');
          const data = await response.json();
          setData({
            wastes: data.waste,
            sales: data.sales,
            demands: data.demands,
            offers: data.offers,
            products: data.productos,
            season: data.season,
            categories: data.categorias,
            subCategories: data.subCategorias,
          });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, []);

  useEffect(() => {
    // Delay rendering the chart to allow other components to load
    const timeout = setTimeout(() => {
      setShowChart(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">
          Waste Management
        </a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/wastesreduction">
                Wastes Reduction
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/wasteprediction">
                Waste Prediction
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/strategies">
                Strategies
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sales-neuronal-networking">
                Sales Neuronal Networking
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route
          path="/wastesreduction"
          element={<WastesReduction data={data} />}
        />
        <Route path="/strategies" element={<Strategies data={data} />} />
        <Route
          path="wasteprediction"
          element={data ? <WastePrediction data={data} /> : null}
        />

        <Route
          path="/sales-neuronal-networking"
          element={showChart && <SalesNeuronalNetworking data={data} />}
        />
      </Routes>
    </Router>
  );
};
export default App;
