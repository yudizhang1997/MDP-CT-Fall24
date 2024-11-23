const startBtn = document.getElementById('start');
const outputSection = document.getElementById('output');

const fetchDogData = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json())
    .then(data => {
        const dogImg = data.message;

        outputSection.innerHTML = '';
        const img = document.createElement('img');
        img.src = dogImg;
        img.alt = "Random Dog";
        img.width = 300;
        outputSection.appendChild(img);

        fetchCatData();
    })
    .catch(error => console.error('Error fetching dog data:', error));
};

const fetchCatData = () => {
    fetch("https://api.thecatapi.com/v1/images/search")
    .then(response => response.json())
    .then(data => {
        const catImg = data[0].url;

        const img = document.createElement('img');
        img.src = catImg;
        img.alt = "Random Cat";
        img.width = 300;
        outputSection.appendChild(img);
    })
    .catch(error => console.error('Error fetching cat data:', error));
};

startBtn.addEventListener('click', fetchDogData);