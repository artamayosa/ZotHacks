fetch('/hello').then(async (res) => {
    const data = await res.json()
    console.log('data: ', data)
})

const submitButton = document.getElementById('submit-button')

if (submitButton) {
    submitButton.addEventListener('click', user_login)
}

function user_login(event) {
    event.preventDefault()
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value
    const body = new FormData()
    body.append('username', username)
    body.append('password', password)
    fetch('', { method: 'POST', body }).catch(e => console.log('error: ', e))
    console.log(window.location)
    // window.location.pathname="/scheduling.html"

}