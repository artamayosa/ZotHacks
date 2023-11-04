const query = window.location.search.slice(1)
const [key, room] = query.split('=')

document.addEventListener('DOMContentLoaded', onLoad)

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
    title.textContent = room

    document.querySelectorAll(".time-button").forEach((element) => {
        element.addEventListener('click', handleClick)
    })
}

function handleClick(event) {
    event.preventDefault()
    console.log(event)

    const time= event.target.textContent
    const username= "sammich"

    const body= new FormData()
    body.append("start_time", time)
    body.append("end_time", time)
    body.append("username", username)
    body.append("location_name", room)

    fetch ("", {
        method: "POST", body
    })

}