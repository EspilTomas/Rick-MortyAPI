let currentCharacterId = 1;

const characterImage = document.getElementById('character-image');
const characterName = document.getElementById('character-name');
const characterStatus = document.getElementById('character-status');
const characterSpecies = document.getElementById('character-species');
const characterGender = document.getElementById('character-gender');
const characterOrigin = document.getElementById('character-origin');
const characterLocation = document.getElementById('character-location');
const characterEpisodes = document.getElementById('character-episodes');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const characterCard = document.getElementById('character-card');
const themeToggleButton = document.getElementById('theme-toggle-button');

const apiUrl = 'https://rickandmortyapi.com/api/character/';

async function fetchCharacter(id) {
    try {
        const response = await fetch(`${apiUrl}${id}`);
        const character = await response.json();
        displayCharacter(character);
    } catch (error) {
        console.error('Error fetching character:', error);
    }
}

async function searchCharacterByName(name) {
    try {
        const response = await fetch(`${apiUrl}?name=${name}`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            displayCharacter(data.results[0]);
            currentCharacterId = data.results[0].id;
        } else {
            alert('Personaje no encontrado');
        }
    } catch (error) {
        console.error('Error searching character:', error);
    }
}

function displayCharacter(character) {
    characterImage.src = character.image;
    characterName.textContent = `Nombre: ${character.name}`;
    characterStatus.textContent = `Estado: ${character.status}`;
    characterSpecies.textContent = `Especie: ${character.species}`;
    characterGender.textContent = `Género: ${character.gender}`;
    characterOrigin.textContent = `Origen: ${character.origin.name}`;
    characterLocation.textContent = `Última ubicación conocida: ${character.location.name}`;

}

function animateCardOut(callback) {
    characterCard.style.animation = 'slideOut 0.5s forwards';
    setTimeout(() => {
        callback();
        characterCard.style.animation = 'slideIn 0.5s forwards';
    }, 500);
}

prevButton.addEventListener('click', () => {
    if (currentCharacterId > 1) {
        animateCardOut(() => {
            currentCharacterId--;
            fetchCharacter(currentCharacterId);
        });
    }
});

nextButton.addEventListener('click', () => {
    animateCardOut(() => {
        currentCharacterId++;
        fetchCharacter(currentCharacterId);
    });
});

searchButton.addEventListener('click', () => {
    const name = searchInput.value.trim();
    if (name) {
        animateCardOut(() => {
            searchCharacterByName(name);
        });
    }
});

themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Fetch the first character on page load
fetchCharacter(currentCharacterId);
