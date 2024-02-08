let searchButton = document.getElementsByClassName("searchButton")[0];

searchButton.addEventListener("click", function () {
  let apiUrl = `https://api.coinlore.net/api/tickers/?start=0&limit=100`;

  fetch(apiUrl)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      let j = Math.floor(Math.random() * res.data.length);
      displayCoin(res.data[j]);
    })

    .catch((error) => {
      console.error("Error:", error);
    });
});

function displayCoin(coin) {
  const coinContainer = document.querySelector(".coin-container");

  let mockHTML = `
        <div class="coin">
            <h3>Random Coin: ${coin.name}</h3>
            <div class="info">
                <button class ="infoButton">Track Coin</button>
            </div>
        </div>
    `;

  coinContainer.innerHTML = "";

  coinContainer.insertAdjacentHTML("beforeend", mockHTML);

  let infoButton = document.getElementsByClassName("infoButton")[0];

  infoButton.addEventListener("click", () => {
    const coinInformation = document.querySelector(".coinInformation");

    let savedCoins = JSON.parse(localStorage.getItem("trackedCoins")) || []

    savedCoins.push(coin)

    localStorage.setItem('trackedCoins', JSON.stringify(savedCoins));

    coinInformation.innerHTML = ""

    savedCoins.forEach((savedCoin) => {
      let mockInfoHTML = `
              <div class="coinInfo">
                  <p>Name: ${savedCoin.name}</p>
                  <p>Rank: ${savedCoin.rank}</p>
                  <p>Symbol: ${savedCoin.symbol}</p>
                  <p>Price USD: ${savedCoin.price_usd}</p>
                  <p>Price BTC: ${savedCoin.price_btc}</p>
              </div>
          `;
  
      coinInformation.insertAdjacentHTML("beforeend", mockInfoHTML);
    })

  });
}



function onPageLoad(){
  const coinInformation = document.querySelector(".coinInformation");

  let savedCoins = JSON.parse(localStorage.getItem("trackedCoins")) || []

  coinInformation.innerHTML = ""

  savedCoins.forEach((savedCoin) => {
    let mockInfoHTML = `
            <div class="coinInfo">
                <p>Name: ${savedCoin.name}</p>
                <p>Rank: ${savedCoin.rank}</p>
                <p>Symbol: ${savedCoin.symbol}</p>
                <p>Price USD: ${savedCoin.price_usd}</p>
                <p>Price BTC: ${savedCoin.price_btc}</p>
            </div>
        `;

    coinInformation.insertAdjacentHTML("beforeend", mockInfoHTML);
  })
}

onPageLoad()