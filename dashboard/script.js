const formEl = document.querySelector(".input-form");
const movesSelectEl = document.querySelector(".moves-select");
const moveInfo = document.querySelector(".move-info");
const pokemonInputEl = document.querySelector(".input-name");
const submitBtn = document.querySelector(".submit-btn");
const pokemonDetailsContainer = document.querySelector(".pokemon-details");
const pokeMonImg = document.querySelector(".pokemon-img");
const pokemonStatsGraph = document.querySelector(".pokemon-stats");
const nextPokemonBtn = document.querySelector(".next-pokemon-btn");
const previousPokemonBtn = document.querySelector(".previous-pokemon-btn");
const upgradePokeomBtn = document.querySelector(".upgrade-pokemon-btn");
const degradePokemonBtn = document.querySelector(".degrade-pokemon-btn");
const BaseUrl = "https://pokeapi.co/api/v2/pokemon/";

// Helper functions

// To get string of types
const getTypes = function (data) {
  let string = "";
  data.types.forEach((el) => {
    string += el.type.name + " ";
  });

  return string;
};

// To get string of abilites
const getAbilites = function (data) {
  let string = "";
  data.abilities.forEach((el) => {
    string += el.ability.name + " ";
  });

  return string;
};

// Add moves in select depending on the pokemon
const appendMoves = function (data) {
  // Adding select
  const optionDefault = document.createElement("option");
  optionDefault.innerText = "Select a move";
  optionDefault.value = "";
  movesSelectEl.append(optionDefault);

  // Adding the moves info url as value

  data.moves.forEach((obj) => {
    const option = document.createElement("option");
    option.innerText = obj.move.name;
    option.value = obj.move.url;
    movesSelectEl.append(option);
  });
};

// CreateHtml for pokemon info

const createHtml = function (data) {
  const htmlDetail = `   
  <p id="p-name">Name: ${data.name}</p>
  <p id="p-id">ID: ${data.id}</p>
  <p id="p-height">Height: ${data.height} m</p>
  <p id="p-weight">Weight: ${data.weight} kg</p>
  <p id="p-types">Types: <span class="type">${getTypes(data)}</span></p>
  <p id="p-abilities">Abilities: ${getAbilites(data)}</p>`;

  pokemonDetailsContainer.innerHTML = htmlDetail;

  // Changing img
  pokeMonImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`;

  pokemonStatsGraph.innerHTML = `<canvas id="stats-graph"></canvas>`;
};

// Creates moves html on slect change
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

// On select change called
const updateMovesData = async function (el) {
  const data = await fetchData(el.value);
  // Creating the html for moves info
  const html = createMovesHtml(data);

  // Inserting it into movesInfo
  moveInfo.innerHTML = html;
};

// A function to fetch data
const fetchData = async function (url) {
  const res = await fetch(`${url}`);

  const data = await res.json();
  return data;
};

let curId = 1;
let curData;

const displayApiData = async function (idInput = 1) {
  if (idInput < 1) return;

  const data = await fetchData(`${BaseUrl}${idInput}`);
  curId = data.id;
  curData = data;

  // Add  html
  createHtml(data);
  document.body.style.filter = "blur(0px)";
  console.log(data);

  // Adding the moves data to select element and reseting to select as first option
  appendMoves(data);

  // Added graph using chat gpt
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

// To reset befor displaying new pokemon detail
const removeHtml = function () {
  // Remove all added data  which were added

  document.body.style.filter = "blur(20px)";
  pokemonDetailsContainer.innerHTML = "";
  pokemonStatsGraph.innerHTML = "";

  // Reseteing  oves info
  moveInfo.innerHTML = "";

  moveInfo.innerHTML = `<ul class="moves-list">
  <li> <p id="m-name">Name: -</p></li>
   <li><p id="m-type">Type: -</p></li>
   <li><p id="m-power">Power: -</p></li>
   <li><p id="m-accuracy">Accuracy: -</p></li>
   <li><p id="m-class">Damage Class: -</p></li>
   <li><p id="m-effect">Effect: -</p></li>`;

  // Making select again zero length
  movesSelectEl.options.length = 0;
};

//  Adding event listners

// Adding event lisner to select so on chage the required data is shown
movesSelectEl.addEventListener("change", function (e) {
  updateMovesData(e.target);
});

// Takes id or name from input box and searches pokemon
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const pokemonName = pokemonInputEl.value;
  pokemonInputEl.value = "";
  if (pokemonName < 1) return;
  removeHtml();
  displayApiData(pokemonName);
});

// Getting next pokemon

nextPokemonBtn.addEventListener("click", function (e) {
  e.preventDefault();

  removeHtml();
  // For next id
  displayApiData(++curId);
});

// Getting prev pokemon
previousPokemonBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (curId - 1 < 1) return;
  removeHtml();
  // For prev Id

  displayApiData(--curId);
});

upgradePokeomBtn.addEventListener("click", async function (e) {
  e.preventDefault();

  const NextIdData = await fetchData(`${BaseUrl}${curId + 1}`);

  if (getAbilites(curData) == getAbilites(NextIdData)) {
    removeHtml();
    displayApiData(++curId);
  }
});

degradePokemonBtn.addEventListener("click", async function (e) {
  e.preventDefault();

  const prevIdData = await fetchData(`${BaseUrl}${curId - 1}`);

  if (getAbilites(curData) == getAbilites(prevIdData)) {
    removeHtml();
    displayApiData(--curId);
  }
});

// Init to id 1
displayApiData();
