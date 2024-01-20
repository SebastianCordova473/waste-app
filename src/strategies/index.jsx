import RecommendStrategies from './RecommendStrategies';
import DownloadedImage from '../DownloadedImage.jsx';

const Strategies = ({data}) => {
  if (data === null) {
    return <p>Loading...</p>;
  }

  const strategies = RecommendStrategies(data);
  const hasEffectiveStrategies = strategies.some(
    (strategy) => strategy.effective
  );

  return (
    <div>
      <h1>Strategies</h1>
      {hasEffectiveStrategies ? (
        <div className="row">
          {strategies.map((strategy) => {
            if (strategy.effective) {
              return (
                <div className="col-md-4" key={strategy.id}>
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="card-title">Strategy: {strategy.name}</h5>
                      <p className="card-text">
                        Improvement Percentage: {strategy.improvementPercentage}
                      </p>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          {'Category: '}
                          {strategy.categories.map((cat) => (
                            <span key={cat.id}>{cat.nombre} </span>
                          ))}
                        </h5>
                        <p className="card-text">
                          Subcategories:{' '}
                          {strategy.subCategories.map((subCat) => (
                            <span key={subCat.id}>{subCat.nombre} </span>
                          ))}
                        </p>
                      </div>
                      {strategy.products.map((product) => (
                        <DownloadedImage
                          key={product.id}
                          url={product.imagen}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      ) : (
        <p>No effective strategies available</p>
      )}
    </div>
  );
};

export default Strategies;
