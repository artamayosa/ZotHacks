const reservations = [
    { 'time_start': "10:00AM", 'locationId': "CSL", 'room': "Room3" },{ 'time_start': "10:00AM", 'locationId': "CSL", 'room': "Room3" },{ 'time_start': "10:00AM", 'locationId': "CSL", 'room': "Room3" }
]

document.addEventListener('DOMContentLoaded', onLoad)


async function onLoad() {
    // const locations = await fetch('http://localhost:8000/locations', {method:'GET'}).then(response => response.json()).catch(() => [])

    const reserved = document.getElementById('reserve')

    const elements = reservations.forEach(reservation => {
        const id = reservation.locationId
        const time = reservation.time_start
        const room = reservation.room

        const div = document.createElement('div');
        div.style.textAlign = 'center';
        div.style.fontFamily = 'sans-serif';
        div.style.fontSize = 'xx-large';
        div.style.color = 'black';
        div.style.paddingTop = '50px';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.fontWeight = 'bold';
        div.style.gap = '4px';
        div.style.borderWidth = '20px'; 
        div.style.backgroundColor = '#FFFDD0';
        div.style.border= '1px solid black';
        div.style.borderRadius = '16px'
        div.style.paddingBottom = '20px'

        div.textContent = `${id}, ${time}, ${room}`

        reserved.appendChild(div)
    })

}
