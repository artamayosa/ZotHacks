const query = window.location.search.slice(1)

const [key, room] = query.split('=')

const username = "sammich"

document.addEventListener('DOMContentLoaded', onLoad)

const unavailableTimes = [
 "1:00PM", "2:00PM", "4:00PM"
]

function onLoad() {
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true,
        startDate: '0d'
    });

    $('.cell').click(function () {
        $('.cell').removeClass('select');
        $(this).addClass('select');
    });

    const title = document.getElementById('title')
    if (title) {
        title.textContent = room
    }

    document.querySelectorAll(".time-button").forEach((element) => {
        const time = element.textContent

        if (unavailableTimes.includes(time)) {
            element.classList.add("disabled")
        } else {
            element.classList.add("btn-primary")
        }

        element.addEventListener('click', handleClick)
    })
}

function handleClick(event) {
    event.preventDefault()
    console.log(event)

    const time= event.target.textContent
   

    const body= new FormData()
    body.append("start_time", time)
    body.append("end_time", time)
    body.append("username", username)
    body.append("location_name", room)

    fetch ("", {
        method: "POST", body
    })

}