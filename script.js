function showInfo() {
    document.body.style.backgroundColor = "#000"; // Change le fond en noir
    document.body.style.color = "#000"; // Change la couleur du texte en noir pour les autres éléments
    const alertTitle = document.getElementById('alert-title');
    alertTitle.textContent = "Vous avez été piraté!";
    alertTitle.style.color = "red"; // Change la couleur du titre d'alerte en rouge

    getLocation();
    getDeviceInfo();
}


function getLocation() {
    if (navigator.geolocation) {
        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(showPosition, showError, options);
    } else {
        document.getElementById('location').textContent = "La géolocalisation n'est pas supportée par ce navigateur.";
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    document.getElementById('location').innerHTML = `Latitude: ${lat}<br>Longitude: ${lon}`;
    getAddress(lat, lon);
}

function getAddress(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('location').innerHTML += `<br>Adresse: ${data.display_name}`;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération de l’adresse:', error);
            document.getElementById('location').innerHTML += `<br>Impossible de récupérer l'adresse`;
        });
}

function getDeviceInfo() {
    const parser = new UAParser();
    const result = parser.getResult();
    const details = `Navigateur utilisé: ${result.browser.name} ${result.browser.version}, ` +
                    `Système d'exploitation: ${result.os.name} ${result.os.version}`;
    document.getElementById('device-info').textContent = details;
}

function showError(error) {
    let message = "Une erreur est survenue lors de la récupération de votre position.";
    document.getElementById('location').textContent = message;
}
