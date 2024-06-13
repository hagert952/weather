function updateCurrentweather(data) {
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const localtime = new Date(data.location.localtime);

    document.getElementById('day').innerText = weekdays[localtime.getDay()];
    document.getElementById('day_num').innerText = localtime.getDate();
    document.getElementById('date').innerText = months[localtime.getMonth()];
    document.getElementById('place').innerText = data.location.name;
    document.getElementById('temp').innerText = `${data.current.temp_c}°C`;
    document.getElementById('icon').src = `https:${data.current.condition.icon}`;
    document.getElementById('text').innerText = `${data.current.condition.text}`;
    document.getElementById('percent').innerText = `${data.current.precip_mm*100*10}%`;
    document.getElementById('wind').innerText = `${Math.ceil(data.current.wind_mph)}km/h`;
    document.getElementById('direction').innerText = `${(data.current.wind_dir)}`;
    
}

async function fetchs(location) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=2a59850d0c2c48b5b9a151517240706&q=${location}`);
        const data = await response.json();
        updateCurrentweather(data);
    } catch (e) {
        console.log('Error fetching weather:', e);
    }
}

document.getElementById('location-input').addEventListener('input', async function(event) {
    const location = event.target.value.trim();
    if (location.length >= 3) {
        await fetchs(location);
        await displayWeatherForecast(location);
    } else {
        window.onload = async function() {
            await fetchs('Cairo');
            await displayWeatherForecast('Cairo');
        };
    }
});

window.onload = async function() {
    await fetchs('Cairo');
    await displayWeatherForecast('Cairo');
};

async function displayWeatherForecast(location) {
try{

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const weather =await fetch2(location);
    if(weather &&weather.length>0){
        for(let i=0;i<weather.length;i++){
            const day=weather[i]; 
            const { date, day: { maxtemp_c, mintemp_c, condition: { text, icon } } } = day;
    const time = new Date(date);
         
            const data2=document.getElementById(`item-${i + 1}`);
         if(data2)  { data2.querySelector('.datew').innerText=days[time.getDay()];
                        data2.querySelector('.iconi').src=`https:${icon}`;
                        data2.querySelector('.matemp').innerText=`${maxtemp_c}`;
                        data2.querySelector('.mintemp').innerText=`${mintemp_c}`;
                        data2.querySelector('.text').innerText=text;
         }
         else{console.log('itemnotfound');}
       
        }

    }else{console.log('item not found');}
}catch(e){

}

}

async function fetch2(location) {
  
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2a59850d0c2c48b5b9a151517240706&q=${location}&days=3`);
            const data = await response.json();
            return data.forecast.forecastday.slice(1, 3); 
        } catch (error) {
            console.error('Error fetching weather forecast data:', error);
            return null;
        }
    }