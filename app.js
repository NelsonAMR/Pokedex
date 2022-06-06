const PokeCard = document.querySelector('[data-poke-cart]');
const PokeName = document.querySelector('[data-poke-name]');
const PokeImgCont = document.querySelector('data-poke-img-container');
const PokeImg = document.querySelector('[data-poke-img]');
const PokeID = document.querySelector('[data-poke-id]');
const PokeTypes = document.querySelector('[data-poke-types]');
const PokeStats = document.querySelector('[data-poke-stats]');
const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};

const searchPokemon = event => {
    event.preventDefault();
    const {value} = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound());
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const {stats, types} = data;

    PokeName.textContent = data.name;
    PokeImg.setAttribute('src', sprite);
    PokeID.textContent = `N° ${data.id}`;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}   

const setCardColor = types => {
    const color1 = typeColors[types[0].type.name];
    const color2 = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    PokeImg.style.background = `radial-gradient(${color2} 33%, ${color1} 33%)`;
    PokeImg.style.backgroundSize = '5px 5px';
}

const renderPokemonTypes = types => {
    PokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement('div');
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        PokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    PokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement('div');
        const statElementName = document.createElement('div');
        const statElementAmount = document.createElement('div');
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        PokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    PokeName.textContent = 'No encontrado';
    PokeImg.setAttribute('src', 'pokemon.jpg');
    PokeImg.style.background = '#fff';
    PokeTypes.innerHTML = '';
    PokeStats.innerHTML = '';
    PokeID.innerHTML = '';
}