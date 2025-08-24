const formEl = document.querySelector(".input-form");
const movesSelectEl = document.querySelector(".moves-select");
const moveInfo = document.querySelector(".move-info");
const pokemonInputEl = document.querySelector(".input-name");
const submitBtn = document.querySelector(".submit-btn");

movesSelectEl.addEventListener("change", function (e) {
  updateMovesData(e.target);
});

let id = 1;
const getApiData = async function (idInput = 1) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${idInput}`);

  const data = await res.json();
  id = data.id;

  const html = createHtml(data);
  formEl.insertAdjacentHTML("afterend", html);
  console.log(data);

  appendMoves(data);

  const ctx = document.getElementById("stats-graph");

  const pokemonStats = new Chart(ctx, {
    type: "radar",
    data: {
      labels: ["HP", "Attack", "Defense", "Sp. Atk", "Sp. Def", "Speed"],
      datasets: [
        {
          label: data.name,
          data: [
            data.stats[0].base_stat,
            data.stats[1].base_stat,
            data.stats[2].base_stat,
            data.stats[3].base_stat,
            data.stats[4].base_stat,
            data.stats[5].base_stat,
          ],
          backgroundColor: "rgba(255,255,255,0.1)",
          borderColor: "#fff",
          borderWidth: 1,
          pointBackgroundColor: "#fff",
          pointRadius: 3,
        },
      ],
    },
    options: {
      responsive: false,
      scales: {
        r: {
          angleLines: { color: "rgba(255,255,255,0.2)" },
          grid: { color: "rgba(255,255,255,0.2)" },
          pointLabels: {
            color: "#fff",
            font: { size: 10 },
          },
          ticks: {
            display: false,
          },
          suggestedMin: 0,
          suggestedMax: 120,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
};

const getTypes = function (data) {
  let string = "";
  data.types.forEach((el) => {
    string += el.type.name + " ";
  });

  return string;
};

const getAbilites = function (data) {
  let string = "";
  data.abilities.forEach((el) => {
    string += el.ability.name + " ";
  });

  return string;
};

const appendMoves = function (data) {
  const optionDefault = document.createElement("option");
  optionDefault.innerText = "Select a move";
  optionDefault.value = "";
  movesSelectEl.append(optionDefault);

  data.moves.forEach((obj) => {
    const option = document.createElement("option");
    option.innerText = obj.move.name;
    option.value = obj.move.url;
    movesSelectEl.append(option);
  });
};

const createHtml = function (data) {
  const html = `    <section class="pokemon-details">
  <p id="p-name">Name: ${data.name}</p>
  <p id="p-id">ID: ${data.id}</p>
  <p id="p-height">Height: ${data.height} m</p>
  <p id="p-weight">Weight: ${data.weight} kg</p>
  <p id="p-types">Types: <span class="type">${getTypes(data)}</span></p>
  <p id="p-abilities">Abilities: ${getAbilites(data)}</p>
</section>

<section class="img-box"><img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${
    data.id
  }.svg" class="pokemon-img"/></section>

<section class="pokemon-stats">
   <canvas id="stats-graph"></canvas>
</section>
`;

  return html;
};

const createMovesHtml = function (data) {
  const html = `
  <ul class="moves-list">
   <li> <p id="m-name">Name: ${data.name}</p></li>
    <li><p id="m-type">Type: ${data.type.name}</p></li>
    <li><p id="m-power">Power: ${data.power}</p></li>
    <li><p id="m-accuracy">Accuracy: ${data.accuracy}%</p></li>
    <li><p id="m-class">Damage Class: ${data.damage_class.name}</p></li>
    <li><p id="m-effect">Effect: ${data.effect_entries[0].effect}</p></li>`;

  return html;
};

const updateMovesData = async function (el) {
  const res = await fetch(el.value);

  const data = await res.json();

  console.log(data);

  const html = createMovesHtml(data);

  moveInfo.innerHTML = "";
  moveInfo.innerHTML = html;
};

getApiData();

const removeHtml = function () {
  const removeEl = document.querySelector(".pokemon-details");
  const removeEl2 = document.querySelector(".img-box");
  const removeEl3 = document.querySelector(".pokemon-stats");

  removeEl.remove();
  removeEl2.remove();
  removeEl3.remove();

  moveInfo.innerHTML = "";

  moveInfo.innerHTML = `<ul class="moves-list">
  <li> <p id="m-name">Name: -</p></li>
   <li><p id="m-type">Type: -</p></li>
   <li><p id="m-power">Power: -</p></li>
   <li><p id="m-accuracy">Accuracy: -</p></li>
   <li><p id="m-class">Damage Class: -</p></li>
   <li><p id="m-effect">Effect: -</p></li>`;
  movesSelectEl.options.length = 0;
};

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const pokemonName = pokemonInputEl.value;
  removeHtml();
  getApiData(pokemonName);
  pokemonInputEl.value = "";
});

document
  .querySelector(".next-pokemon-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();

    removeHtml();
    getApiData(++id);
  });

document
  .querySelector(".previous-pokemon-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    removeHtml();
    getApiData(--id);
  });

document
  .querySelector(".upgrade-pokemon-btn")
  .addEventListener("click", async function (e) {
    e.preventDefault();

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const CurIdData = await res.json();

    const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${id + 1}`);
    const NextIdData = await res2.json();

    if (getTypes(CurIdData) == getTypes(NextIdData)) {
      getApiData(++id);

      removeHtml();
    } else {
      return;
    }
  });

document
  .querySelector(".degrade-pokemon-btn")
  .addEventListener("click", async function (e) {
    e.preventDefault();

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const CurIdData = await res.json();

    const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${id - 1}`);
    const PrevIdData = await res2.json();

    if (getTypes(CurIdData) == getTypes(PrevIdData)) {
      getApiData(--id);

      removeHtml();
    } else {
      return;
    }
  });
