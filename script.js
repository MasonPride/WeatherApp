let weather ={
    apiKey: "6a4550453910c7961b16eda6ac746671",

    //function that passes in 'city' variable, then uses the api to look up the city and fetch data
    getWeather: function(city){
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=imperial&appid=" 
            + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },

    //fucntion to display the information from api to website
    displayWeather: function(data){
        const { name } = data;
        const { icon, description } = data.weather[0]
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        // log the content
        //console.log(name,icon,description,temp,humidity,speed);

        // changes the text of elemtns with 'city' class id
        document.querySelector(".city").innerText = "Weather in " + name;
        
        // adds icon of weather
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon +"@2x.png"

        // changes the text for the 'decription' class
        document.querySelector(".description").innerText = description;

        // changes the text of the 'temp' class 
        document.querySelector(".temp").innerText = temp + "°F";

        // changes text of the 'humidity' class 
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";

        // changes text of the 'windspeed' class
        document.querySelector(".windspeed").innerText = "Wind speed: " + speed + " km/h";

        //change background to city specific picture
        document.body.style.backgroundImage = "url('https://source.unsplash.com/1920x1080/?" + description +"')"
    },

    //function to search for weather form the input in the search bar
    search: function(){
        this.getWeather(document.querySelector(".search-bar").value)
    }
};

//fucntion that happens when the search button is pressed
document.querySelector(".search button").addEventListener("click", function(){
    weather.search();
});

//fucntion that happens when the enter key is pressed
document.querySelector(".search-bar").addEventListener("keyup", function(){
    if (event.key == "Enter"){
        weather.search();
    }
});


//geolocation api set up
const http = new XMLHttpRequest()

document.querySelector("#share").addEventListener("click", () =>{
    findMyCoord()
})

function findMyCoord(){
    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        ((position) =>{
            const BigdataCloudAPI = `https://api-bdc.net/data/reverse-geocode?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en&key=bdc_9a3b011457c24cb99c43b1aed63c52de`
            getAPI(BigdataCloudAPI)
        },
        (err) => {
            alert(err.message)
        })
    }else{
        alert("Geolocation not supported by your browser")
    }
}

function getAPI(BigdataCloudAPI){
    http.open("GET", BigdataCloudAPI)
    http.send()
    http.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            const results = JSON.parse(this.responseText)
            weather.getWeather(results.locality)
        }
    }
}