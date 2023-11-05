const params = new URLSearchParams(window.location.search.slice(1));

const room = params.get("room");

const roomLocation = params.get("location");

const username = "sammich";

document.addEventListener("DOMContentLoaded", onLoad);

async function onLoad() {
  const title = document.getElementById("title");
  if (title) {
    title.textContent = roomLocation + ", " + room;
  }

  const unavailableTimes = await fetch(`/times?location_name=${roomLocation}&room=${room}`).then(res => res.json())

  setButtons(unavailableTimes)
}

function setButtons(unavailableTimes) {
    document.querySelectorAll(".time-button").forEach((element) => {
        const time = element.textContent;
    
        if (unavailableTimes.includes(time)) {
          element.classList.add("disabled");
          element.classList.remove("btn-primary");
        } else {
          element.classList.remove("disabled");
          element.classList.add("btn-primary");
        }
    
        element.addEventListener("click", handleClick);
      });
}

async function handleClick(event) {
  event.preventDefault();
  console.log(event);

  const time = event.target.textContent;

  const body = new FormData();
  body.append("start_time", time);
  body.append("room", room);
  body.append("username", username);
  body.append("location_name", roomLocation);

  const newUnavailableButtons = await fetch("/reserve", {
    method: "POST",
    body,
  }).then(res => res.json())

  setButtons(newUnavailableButtons)
}
