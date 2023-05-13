import RecommendStrategies from './strategies/RecommendStrategies';
import DownloadedImage from './DownloadedImage.jsx';
export default function Strategies({data}) {
  let strategies;
  let hasEffectiveStrategies = false;
  if (Object.keys(data).length > 0) {
    strategies = RecommendStrategies(data);
    hasEffectiveStrategies = strategies.some((strategy) => strategy.effective);
  }
  return (
    <div>
      <h1>Estrategies</h1>
      {hasEffectiveStrategies ? (
        <div className="row">
          {strategies.map((strategy) => {
            if (strategy.effective) {
              return (
                <div className="col-md-4" key={strategy.id}>
                  <div className="card mb-4">
                    <div className="card-body">
                      <h5 className="card-title">Estrategy: {strategy.name}</h5>
                      <p className="card-text">
                        Porcentaje de Mejora: {strategy.improvementPercentage}
                      </p>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title">
                          {'Categoria: '}
                          {strategy.categories.map((cat) => (
                            <span key={cat.id}>{cat.nombre} </span>
                          ))}
                        </h5>
                        <p className="card-text">
                          Subcategorias:{' '}
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
        <p>No Strategies Available </p>
      )}
    </div>
  );
}
