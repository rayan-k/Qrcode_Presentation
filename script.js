function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById('location').innerHTML = "La géolocalisation n'est pas supportée par ce navigateur.";
    }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    document.getElementById('location').innerHTML = "Latitude: " + lat + "<br>Longitude: " + lon;
    getAddress(lat, lon);
}

function getAddress(latitude, longitude) {
    var url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('location').innerHTML += `<br>Adresse: ${data.display_name}`;
        })
        .catch(error => console.error('Erreur lors de la récupération de l’adresse:', error));
}

function getDeviceInfo() {
    var parser = new UAParser();
    var result = parser.getResult();
    var browserName = result.browser.name;
    var browserVersion = result.browser.version;
    var osName = result.os.name;
    var osVersion = result.os.version;

    var details = `Navigateur utilisé: ${browserName} ${browserVersion}, Système d'exploitation: ${osName} ${osVersion}`;
    document.getElementById('device-info').innerHTML = `Informations détaillées: ${details}`;
}

window.onload = function() {
    getDeviceInfo();
};

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById('location').innerHTML = "L'utilisateur a refusé la demande de géolocalisation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById('location').innerHTML = "Les informations de localisation ne sont pas disponibles.";
            break;
        case error.TIMEOUT:
            document.getElementById('location').innerHTML = "La demande d'accès à la localisation a expiré.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById('location').innerHTML = "Une erreur inconnue s'est produite.";
            break;
    }
}
