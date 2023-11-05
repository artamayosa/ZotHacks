document.addEventListener('DOMContentLoaded', onLoad)


async function onLoad() {
    const locations = await fetch('http://localhost:8000/locations', {method:'GET'}).then(response => response.json()).catch(() => [])
    console.log(locations)
    // const emoji = await fetch('https://emojihub.yurace.pro/api/random')
    // const data = await emoji.json()
    // console.log(emoji, data)
    
    const allButtons = document.getElementById('buttons')

    const elements = locations.forEach(location => {
        const locationName = location.name

        const div = document.createElement('div');
        div.style.textAlign = 'center';
        div.style.fontFamily = 'sans-serif';
        div.style.fontSize = 'xx-large';
        div.style.color = '#fbfae3';
        div.style.paddingTop = '50px';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.fontWeight = 'bold';
        div.style.gap = '4px';
        div.style.borderWidth = '20px'; 
        
        
        div.textContent = locationName

        location.rooms.forEach(room => {
            const button = document.createElement('button')
            
            button.style.borderRadius = '8px'
            button.textContent = room
            button.addEventListener('click', (event) => {
                event.preventDefault()
                const room = event.target.textContent
                window.location.href = `/static/scheduling.html?room=${room}&location=${location.name}`

            })

            div.appendChild(button)
        })

        allButtons.appendChild(div)
    })

}