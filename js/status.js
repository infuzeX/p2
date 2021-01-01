function showStatus(status, message) {
    const alertBox = document.querySelector('.alert-box');
    const color = {
        'INFO': '#2196F3',
        'FAILED': '#f44336',
        'SUCCESS': '#4CAF50'
    }
    alertBox.innerHTML = ` <div class="alert" style="background-color:${color[status]}">
    <span class="closebtn" onclick="closeNotify()">&times;</span>
    <strong>"${status}!"</strong> ${message}
    </div>`
}
function showStatusUltra(type, status, message) {
   console.log(type);
    const alertBox = document.querySelector('.alert-box-'+type);
    const color = {
        'INFO': '#2196F3',
        'FAILED': '#f44336',
        'SUCCESS': '#4CAF50'
    }
    alertBox.innerHTML = ` <div class="alert" style="background-color:${color[status]}">
    <span class="closebtn" onclick="closeNotify()">&times;</span>
    <strong>"${status}!"</strong> ${message}
    </div>`
}


function closeNotify() {
    document.querySelector('.alert-box').innerHTML = "";
}