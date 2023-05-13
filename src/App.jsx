import Wastes from './Wastes';
import Strategies from './Strategies';
import SalesAnalysisChart from './analysis/SalesAnalysisChart';
import WastePrediction from './wastes/WastePrediction';
import {useState, useEffect} from 'react';
export default function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://35.231.78.51/fapi-dev/data.php/api', {
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((data) => {
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
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="App">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Wastes />
          <WastePrediction data={data} />
          <Strategies data={data} />
          <SalesAnalysisChart data={data} />
        </>
      )}
    </div>
  );
}
