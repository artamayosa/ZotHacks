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

function onLoad() {
    const allButtons = document.getElementById('buttons')

    const elements = locations.forEach(location => {
        const locationName = location.name

        const div = document.createElement('div')
        
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