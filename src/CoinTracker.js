import { getValue } from "@testing-library/user-event/dist/utils";
import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const onChange = (event) => {
    setMoney(event.target.value);
  };
  const onClick = () => {
    alert(`$${money} is ${money / 1316.5} in USD`);
  };
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <label for="coin">가진 금액을 입력하세요 : </label>
          <input type="number" value={money} onChange={onChange} />
          <button onClick={onClick}>변환</button>
          <br />
          <select>
            {coins.map((coin) => (
              <option>
                {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

export default App;
