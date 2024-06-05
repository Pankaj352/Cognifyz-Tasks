document.getElementById('regis_form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const pass = document.getElementById('password').value;
    const strength = getPasswordStrength(pass);

    if (strength !== 'strong') {
        alert('Password is must be 8 characters minimum!');
    } else {
        alert('Form submitted successfully!');
    }
});

document.getElementById('password').addEventListener('input', function() {
    const pass = this.value;
    const passStrengthBar = document.getElementById('passwordStrength');
    const strength = getPasswordStrength(pass);

    passStrengthBar.className = 'strength';
    passStrengthBar.style.display = 'block';

    if (strength === 'strong') {
        passStrengthBar.classList.add('strong');
    } else if (strength === 'medium') {
        passStrengthBar.classList.add('medium');
    } else {
        passStrengthBar.classList.add('weak');
    }
});

function getPasswordStrength(pass) {
    let strength = 'weak';
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');
    const mediumRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})');

    if (strongRegex.test(pass)) {
        strength = 'strong';
    } else if (mediumRegex.test(pass)) {
        strength = 'medium';
    }
    return strength;
}
