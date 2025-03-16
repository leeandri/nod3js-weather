console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msgOne = document.querySelector("#message-1");
const msgTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const address = search.value;

  msgOne.textContent = "Loading...";
  msgTwo.innerHTML = "";

  fetch("http://localhost:8000/weather?address=" + address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        msgOne.textContent = data.error;
      } else {
        msgOne.textContent = data.location;
        msgTwo.innerHTML = `
            <div>
              <img src="${data.weatherIcon}" alt="Weather Icon" width="100" height="100" />
              <p>
                ${data.weatherDescription}.<br />
                It is currently ${data.temperature} degrees out.<br />
                There is a ${data.precip}% chance of rain.
              </p>
            </div>
          `;
      }
    });
  });
});
