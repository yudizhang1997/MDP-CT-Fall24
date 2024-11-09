const startBtn = document.getElementById('start')
const outputSection = document.getElementById('output')

const fetchCocktailData = () => {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then((response) => response.json() )
    .then(data => {
        const cocktail = data.drinks[0]
        
        const cocktailName = cocktail.strDrink
        const cocktailImg = cocktail.strDrinkThumb
        let cocktailDate = cocktail.dateModified

        const name = document.createElement('h2')
        name.textContent = cocktailName
        outputSection.appendChild(name)

        outputSection.appendChild(document.createElement('img')).src = cocktailImg
        console.log(cocktailDate)
        cocktailDate = cocktailDate.substring(0, cocktailDate.indexOf(' '))
        const regex = /\d{4}-\d{2}-\d{2}/;
        const outcome = cocktailDate.match(regex)
        if(outcome.length > 0) {
            fetchNASAData(cocktailDate)
        }

    })
    //.then(fetchNASAData)
}

const fetchNASAData  = (pictureDate) => {
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=' + pictureDate)
    .then(response => response.json())
    .then(data =>{
        console.log(data)
    })
}

startBtn.addEventListener('click', fetchCocktailData)