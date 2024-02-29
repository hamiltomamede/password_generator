function showNotification(msg, type) {
    var notyf = new Notyf({
        duration: 3000,
        position: {
            x: 'center',
            y: 'top',
        },
        types: [
            {
                type: 'success',
            },
            {
                type: 'error',
            }
        ]
    })
    notyf.open({
        type: type,
        message: msg
    });
}
function generatePass() {

    var passSize = document.getElementById("passSize").value
    var allowedChars = ''

    var hasUpper = isChecked('upCheck');
    var hasLower = isChecked('downCheck');
    var hasNumber = isChecked('numCheck');
    var hasSymbol = isChecked('specialCheck')

    if (hasUpper) allowedChars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (hasLower) allowedChars += 'abcdefghijklmnopqrstuvwxyz';
    if (hasNumber) allowedChars += '0123456789';
    if (hasSymbol) allowedChars += '!@#$%^&*()_+{}[]';

    var minSize = (hasUpper + hasLower + hasNumber + hasSymbol)
    var pass = '';

    for (var i = 0; i < passSize; i++) {
        pass += allowedChars.charAt(Math.floor(Math.random() * allowedChars.length));
    }

    if (minSize === 0) {
        showNotification('Select at least one character type!', 'error');
        return;
    }

    if (passSize <= 6) {
        move(25, 'red');
    } else if (passSize <= 8) {
        move(50, 'yellow');
    } else if (passSize <= 10) {
        move(75, 'green');
    } else {
        move(100, 'green');
    }

    document.getElementById("generatedPass").value = pass;
}

function isChecked(id) {
    return document.getElementById(id).checked
}

function copyPass() {
    var generatedPass = document.getElementById("generatedPass").value;
    var textarea = document.createElement("textarea");
    textarea.value = generatedPass;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showNotification('Password copied to clipboard!', 'success');
}
function move(progress, color) {

    var elem = document.getElementById("myBar");
    var width = progress;
    elem.style.width = width + "%";
    elem.style.backgroundColor = color;
    if (width == 100) {
        elem.style.borderRadius = '0px 0px 10px 10px';
    } else {
        elem.style.borderRadius = '0px 0px 0px 10px';
    }
}
window.onload = function () {
    var pass = generatePass();
};
