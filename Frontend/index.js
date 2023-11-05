fetch('/hello').then(async (res) => {
    const data = await res.json()
    console.log('data: ', data)
})

const submitButton = document.getElementById('submit-button')

if (submitButton) {
    submitButton.addEventListener('click', user_login)
}

async function user_login(event) {
    event.preventDefault()
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    const body = new FormData()
    body.append('username', username)
    body.append('password', password)
    await fetch('http://localhost:8000/login', { method: 'POST', body }).catch(e => console.log('error: ', e))
    console.log(window.location)
    window.location.href = `/static/rooms.html`
    console.log(window.location)
}