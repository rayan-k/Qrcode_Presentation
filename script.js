function getLocation() {
    if (navigator.geolocation) {
        const options = {
            enableHighAccuracy: true, // Utilise le GPS pour une meilleure précision
            timeout: 10000,           // Temps maximum pour obtenir la localisation
            maximumAge: 0             // Ne pas accepter une localisation mise en cache
        };
        navigator.geolocation.getCurrentPosition(showPosition, showError, options);
    } else {
        document.getElementById('location').innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
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
            document.getElementById('location').innerHTML += `<br>Adresse la plus proche: ${data.display_name}`;
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
    document.getElementById('device-info').innerHTML = `Informations détaillées: ${details}`;
}

function showError(error) {
    let message;
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "L'utilisateur a refusé la demande de géolocalisation.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Les informations de localisation ne sont pas disponibles.";
            break;
        case error.TIMEOUT:
            message = "La demande d'accès à la localisation a expiré.";
            break;
        default:
            message = "Une erreur inconnue s'est produite.";
    }
    document.getElementById('location').innerHTML = message;
}

window.onload = getDeviceInfo;
