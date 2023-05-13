import {useEffect, useState} from 'react';

export default function Wastes() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch('http://35.231.78.51/fapi-dev/data.php/merma', {
      mode: 'cors',
    })
      .then((response) => response.json())
      .then((res) => {
        setData(res.waste);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  console.log(data);
  return (
    <div className="App">
      <div>
        <h1>Wastes</h1>
        <ul>
          {data
            .sort((a, b) => new Date(b.mes) - new Date(a.mes))
            .map((item, index, array) => {
              const previousMonthValue =
                index < array.length - 1 ? array[index + 1].monto : 0;
              const percentageDifference =
                index < array.length - 1
                  ? getPercentageDifference(item.monto, previousMonthValue)
                  : 0;
              return (
                <li key={item.mes}>
                  {`${item.mes}: ${item.monto}`}
                  {percentageDifference !== 0 && (
                    <span style={{marginLeft: '10px'}}>
                      {`(${percentageDifference.toFixed(
                        2
                      )}% from previous month)`}
                    </span>
                  )}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

function getPercentageDifference(currentValue, previousValue) {
  const diff = (currentValue - previousValue) / previousValue;
  return diff * 100;
}
