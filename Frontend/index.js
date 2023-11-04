// $(document).ready(function () {
//     $('.datepicker').datepicker({
//         format: 'mm/dd/yyyy',
//         autoclose: true,
//         startDate: '0d'
//     });

//     $('.cell').click(function () {
//         $('.cell').removeClass('select');
//         $(this).addClass('select');
//     });

//     const query = window.location.search.slice(1)
//     const [key, value] = query.split('=')

//     if (key === 'room') {
//         const title = document.getElementById('title')
//         title.textContent = value
//     }
// });

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


