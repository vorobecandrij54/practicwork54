// Ініціалізація карти (центр Івано-Франківська)
var map = L.map('map', { zoomControl: false }).setView([48.9226, 24.7094], 16); 

// Додаємо чисту карту OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    attribution: '' // Прибираємо текст атрибуції
}).addTo(map);

// Додаємо кнопки для збільшення/зменшення масштабу
L.control.zoom({
    position: 'topright'
}).addTo(map);

// Іконка мітки (красивий значок)
var icon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Значок корпусу
    iconSize: [40, 40], 
    iconAnchor: [20, 40],
    popupAnchor: [0, -35]
});

// Список корпусів ПНУ (з координатами)
var locations = [
    { name: "Головний корпус ПНУ", room: "Головний вхід", lat: 48.9226, lng: 24.7094 },
    { name: "Інститут мистецтв", room: "Ауд. 201", lat: 48.9231, lng: 24.7108 },
    { name: "Факультет математики та інформатики", room: "Ауд. 305", lat: 48.9220, lng: 24.7085 },
    { name: "Бібліотека ПНУ", room: "Читальний зал", lat: 48.9235, lng: 24.7091 },
    { name: "Спортивний комплекс", room: "Тренажерний зал", lat: 48.9240, lng: 24.7078 }
];

// Додаємо мітки корпусів на карту
locations.forEach(loc => {
    loc.marker = L.marker([loc.lat, loc.lng], { icon: icon }).addTo(map)
        .bindPopup(`<b>${loc.name}</b><br>Аудиторія: ${loc.room}`);
});

// Функція для пошуку корпусу або аудиторії
function searchLocation() {
    var query = document.getElementById('searchBox').value.toLowerCase();
    
    var found = locations.find(loc => loc.name.toLowerCase().includes(query) || loc.room.includes(query));
    
    if (found) {
        map.setView([found.lat, found.lng], 17); // Збільшуємо масштаб на знайдену точку
        found.marker.openPopup(); // Відкриваємо інформаційне вікно
    } else {
        alert("Місце не знайдено!");
    }
}

// Додаємо маршрутизацію (потрібен маршрут між двома точками)
L.DomEvent.on(document.getElementById('searchBtn'), 'click', function() {
    // Наприклад, початковий корпус - Головний корпус, кінцевий - Спортивний комплекс
    var routeControl = L.Routing.control({
        waypoints: [
            L.latLng(48.9226, 24.7094),  // Головний корпус
            L.latLng(48.9240, 24.7078)   // Спортивний комплекс
        ],
        createMarker: function() { return null; }, // Не додаємо мітки на маршруті
        routeWhileDragging: true // Дозволяємо редагувати маршрут
    }).addTo(map);
});
