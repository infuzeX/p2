const forms = document.querySelectorAll("form");
console.log(forms);

forms.forEach(form => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = {};
    elements = e.target.elements;
    formData["name"] = elements[0].value;
    formData["email"] = elements[1].value;
    formData["number"] = elements[2].value;
    const type = e.target.id;
    sendData(formData, type);
  });

})

function sendData(formData, type) {
  const endpoint = { CARD: 'carddb.php', CALL: 'calldb.php' }
  const xhr = new XMLHttpRequest();
  xhr.open('POST', `php/${endpoint[type]}`, true);
  showStatusUltra(type,"INFO", 'Submitting....')
  xhr.onload = function () {
    console.log(this.responseText);
    const { success, message } = JSON.parse(this.responseText);
    if (success) {
      if (type === 'CALL') {
        __clearField(elements)
        showStatusUltra(type, 'SUCCESS', message);
      } else {
        __clearField(elements)
        //open scrtch crfd
        closeNotify();
        closePopup();
      }
      return;
    }
    showStatusUltra(type, 'FAILED', message);

  }
  xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(formData))
}


function __clearField(elements) {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].name) elements[i].value = "";
  }
  elements = "";
}


//toggle form popup;
function __closePopup() {
  document.querySelector('.backdrop1').classList.toggle('close-popup')
}
//toggle scratch popup
//showPopup();
let open = false;
function closePopup() {
  open = !open;
  document.querySelector('.backdrop').classList.toggle('close-popup')
  if (open) scratch()
}