// elements declaration
const form = document.querySelector('form');
const inputEl = document.querySelector('.length-input');
const checksEl = document.querySelectorAll('.check');
const resultEl = document.querySelector('.input-result');
const tooltipsEl = document.querySelectorAll('.tooltip');
const copyBtn = document.querySelector('.btn-copy');
const submitBtn = document.getElementById('btnSubmit');
const disabledSubmitBtn = document.getElementById('btnSubmitDisabled');

// a function to get a one character from a string
function randomize(chars, callback) {
  const randomizeResult = chars[Math.floor(Math.random() * chars.length)];
  callback(randomizeResult);
}

// a function to get a final password result
function generatePassword(formData, element) {
  let generatedPassword = '';
  const [lengthInput, checkInput] = formData;
  const lowerChar = 'abcdefghijklmnopqrstuvwxyz';
  const upperChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numberChar = '1234567890';
  const symbolChar = '!@#$&-+=<>';
  
  for (let i = 0; i < lengthInput; i++) {
    let resultTemp = [];
    checkInput.forEach((checked, idx) => {
      if (checked) {
        switch (idx) {
          case 0:
            randomize(lowerChar, result => resultTemp.push(result))
            break;
          case 1:
            randomize(upperChar, result => resultTemp.push(result))
            break;
          case 2:
            randomize(numberChar, result => resultTemp.push(result))
            break;
          case 3:
            randomize(symbolChar, result => resultTemp.push(result))
            break;
        }
      }
    });
    randomize(resultTemp, result => generatedPassword += result);
  }
  
  element.value = generatedPassword;
}

// a function that handled submit form event
function formSubmit(element) {
  element.addEventListener('submit', e => {
    e.preventDefault();
    const formData = [inputEl.value, []];
    checksEl.forEach(({ checked }) => formData[1].push(checked));
  
    generatePassword(formData, resultEl);
    copyValidate();

    resultEl.classList.add('submited');
    setTimeout(() => resultEl.classList.remove('submited'), 300);
  });
}

// a function that user should check at least one option
function checkValidate() {
  let count = 0;
  checksEl.forEach(({ checked }) => checked && count++);
  
  if (count === 0) {
    disabledSubmitBtn.classList.remove('hidden');
    submitBtn.classList.add('hidden');
  }
  checksEl.forEach((check) => {
    check.addEventListener('change', () => {
      check.checked ? count++ : count--;
      if (count === 0) {
        disabledSubmitBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
      } else {
        disabledSubmitBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
      }
    });
  });
}

// a function that validate, if the result has been shown, so the copy button will active
function copyValidate() {
  resultEl && copyBtn.classList.remove('btn-disabled');
}

// copy to clipboard function, so if user click the copy button, then the password result will automaticaly copied to user's clipboard
function copyToClipboard(input, btn) {
  const copiedTooltip = btn.querySelector('.tooltip');
  btn.addEventListener('click', () => {
    input.select();
    input.setSelectionRange(0, 99999); // For mobile devices
    
    // Copy the text inside the text field
    navigator.clipboard.writeText(input.value);

    copiedTooltip.innerHTML = 'Copied!';
    resultEl.classList.add('submited');

    setTimeout(() => resultEl.classList.remove('submited'), 300);
    setTimeout(() => copiedTooltip.innerHTML = 'Copy to clipboard', 1200);
  });
}

// show a tooltip when user hover the button
function showTooltips(elements) {
  elements.forEach(element => {
    element.parentElement.addEventListener('mousemove', e => {
      const x = e.clientX;
      const y = e.clientY;
      element.style.left = (x + 20) + 'px';
      element.style.top = (y + 20) + 'px';
    });
  });
}

// wrap and run all function in one main function
function main() {
  showTooltips(tooltipsEl);
  checkValidate();
  formSubmit(form);
  copyToClipboard(resultEl, copyBtn);
  resultEl.value = '';
}

// run main() function when every all content loaded. or every user's window reloaded
window.addEventListener('DOMContentLoaded', main());
