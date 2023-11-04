document.addEventListener('DOMContentLoaded', onLoad)

const locations = [
    {
        name: "CSL",
        rooms: [
            "Room 1",
            "Room 2",
            "Room 3"
        ]
    },
    {
        name: "Science Library",
        rooms: [
            "Room 1",
            "Room 2",
            "Room 3"
        ]
    },
    {
        name: "Langston Library",
        rooms: [
            "Room 1",
            "Room 2",
            "Room 3"
        ]
    }
]

async function onLoad() {
    const actualLocations = await fetch('/locations').then(response => response.json()).catch(() => [])

    // const emoji = await fetch('https://emojihub.yurace.pro/api/random')
    // const data = await emoji.json()
    // console.log(emoji, data)
    
    const allButtons = document.getElementById('buttons')

    const elements = locations.forEach(location => {
        const locationName = location.name

        const div = document.createElement('div');
        div.style.textAlign = 'center';
        div.style.fontFamily = 'sans-serif';
        div.style.fontSize = 'x-large';
        div.style.color = 'blue';
        
        
        div.textContent = locationName

        location.rooms.forEach(room => {
            const button = document.createElement('button')

            button.textContent = room
            button.addEventListener('click', (event) => {
                event.preventDefault()
                const room = event.target.textContent
                console.log(locationName, room)

            })

            div.appendChild(button)
        })

        allButtons.appendChild(div)
    })

}