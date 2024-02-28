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

    var pass = "";

    if (document.getElementById('upCheck').checked) allowedChars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (document.getElementById('downCheck').checked) allowedChars += 'abcdefghijklmnopqrstuvwxyz'
    if (document.getElementById('numCheck').checked) allowedChars += '0123456789'
    if (document.getElementById('specialCheck').checked) allowedChars += '!@#$%^&*()_+/'

    for (var i = 0; i < passSize; i++) {
        pass += allowedChars[Math.floor(Math.random() * allowedChars.length)];
    }
    if (allowedChars.length === 0) {
        showNotification('Selecione pelo menos um tipo de caractere!', 'error');
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
    pass = pass.split('').sort(function () { return 0.5 - Math.random() }).join('');

    document.getElementById("generatedPass").value = pass;
}
function copiarSenha() {
    var generatedPass = document.getElementById("generatedPass").value;
    var textarea = document.createElement("textarea");
    textarea.value = generatedPass;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    showNotification('Senha copiada para a área de transferência!', 'success');
}
function move(progress, color) {

    var elem = document.getElementById("myBar");
    var width = progress;
    elem.style.width = width + "%";
    elem.style.backgroundColor = color;
}
window.onload = function () {
    var senha = generatePass(); // Gerar senha inicial
};
