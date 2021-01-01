const form = document.querySelector("#contactForm");
let open = false;
let elements = [];
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {};
  elements = e.target.elements;
  formData["name"] = elements[0].value;
  formData["email"] = elements[1].value;
  formData["number"] = elements[2].value;
  formData["city"] = elements[3].value;
  formData["college"] = elements[4].value
  console.log(formData);
  sendData(formData);
});

function sendData(formData) {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'php/membershipdb.php', true);
  xhr.onload = function () {
    console.log(this.responseText);
    const { success, message } = JSON.parse(this.responseText);
    if (success) {
      //clear data
      clearField(elements)
      showStatus('SUCCESS', message);
      //window.location.href
    } else {
      showStatus('FAILED', message)
    }

  }
  xhr.setRequestHeader('Content-type', 'application/json;charset=UTF-8');
  xhr.send(JSON.stringify(formData))
}


function clearField(elements) {
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].name) elements[i].value = "";
  }
  elements = "";
}


