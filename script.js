//get from document DOM getElementById method
const inputCity = document.getElementById("InputCity");
const detailContainer = document.getElementById("detailContainer");

//  the keyup event listener on inputfield
inputCity.addEventListener("keyup", (e) => {
  e.preventDefault();
  if (!inputCity.value.trim()) {
    detailContainer.innerHTML = "";
  } else if (inputCity.value.trim()) {
    weatherDetail();
  }
});

//async function getting response from api
const weatherDetail = async () => {
  // try catch for error handling
  try {
    let respone = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${inputCity.value.trim()}?key=JTJ735BNL34D5AGHVBVYC53SM`
    );

    let data = await respone.json(); // converting the respone to json format
    console.log(data);

    //updting the html by using innerHTML dynamically
    detailContainer.innerHTML = `
         <div id="firstDetail">
            <p id="Temperature">${(((data.currentConditions.temp - 32) * 5) /9).toFixed(1)}&deg;C</p>
              <p id="Cityname">${data.resolvedAddress}</p>
            <div class="rightSideDetail">
                 <p id="WeatherStatus">${data.currentConditions.conditions}</p>
                 <p id="Humidity">Humidity : ${data.currentConditions.humidity} %</p>
                 <p id="Visible"> Visibility :${ data.currentConditions.visibility} %</p>
                 <p id="SunRise">Sunrise :${data.currentConditions.sunrise.slice(0,5)} AM</p>
                 <p id="sunSet" >Sunset :${data.currentConditions.sunset.slice(0,5)} PM</p>
            </div>
      </div>
         `;
  } catch (error) {
    detailContainer.innerHTML = `<div id="ErrorText"> City Not Found</div>`;
  }
};

   
 
 
