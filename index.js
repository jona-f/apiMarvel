/* Api marvel */

document.addEventListener('DOMContentLoaded', () => {
    const publicKey = '96351f77d76ccd0cc48dcd75a13f83a5';
    const privateKey = 'ca130685abc27bf11252170fcea8f113865609a6';
    const timestamp = new Date().getTime().toString();
    const hash = CryptoJS.MD5(timestamp + privateKey + publicKey).toString();

    const apiUrl = `https://gateway.marvel.com/v1/public/characters?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Verifica los datos en la consola

            const charactersContainer = document.getElementById('characters');

            // Limpiar el contenedor de personajes antes de agregar nuevos
            charactersContainer.innerHTML = '';

            // Recorrer los personajes y mostrarlos en la página
            data.data.results.forEach(character => {
                const characterElement = document.createElement('div');
                characterElement.classList.add('character');

                const characterName = document.createElement('h2');
                characterName.textContent = character.name;

                const characterImage = document.createElement('img');
                characterImage.src = `${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`;
                characterImage.alt = character.name;

                characterElement.appendChild(characterImage);
                characterElement.appendChild(characterName);

                charactersContainer.appendChild(characterElement);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});
