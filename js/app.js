const ENDPOINT = "http://localhost:3000";
const uniCards = document.querySelector("#uniCards");
const ixtisasCards = document.querySelector("#ixtisasCards");

const getUniversitetler = () => {
  axios.get(ENDPOINT + "/university").then(({ data }) => {
    data.forEach(({ id, code, name }) => {
      uniCards.innerHTML += ` <div class="card">
          <h2>${code}</h2>
          <p>${name}</p>
        </div>`;
    });
  });
};
getUniversitetler();

const getIxtisaslar = () => {
  axios.get(ENDPOINT + "/ixtisaslar").then(({ data }) => {
    data.forEach(({ id, code, name }) => {
      ixtisasCards.innerHTML += `  <div class="card">
          <h2>${code}</h2>
          <p>${name}</p>
        </div>`;
    });
  });
};

getIxtisaslar();
