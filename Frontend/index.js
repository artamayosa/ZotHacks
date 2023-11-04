$(document).ready(function () {
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy',
        autoclose: true,
        startDate: '0d'
    });

    $('.cell').click(function () {
        $('.cell').removeClass('select');
        $(this).addClass('select');
    });

    const query = window.location.search.slice(1)
    const [key, value] = query.split('=')

    if (key === 'room') {
        const title = document.getElementById('title')
        title.textContent = value
    }
});

