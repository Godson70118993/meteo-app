document.addEventListener('DOMContentLoaded', function() {
    // Remplacez par votre clé API OpenWeatherMap
    const apiKey = "1e3e8f230b6064d27976e41163a82b77";
        const cityInput = document.getElementById('city-input');
    const searchBtn = document.getElementById('search-btn');
    const errorMessage = document.getElementById('error-message');

    async function fetchWeather(city) {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiKey}`
            );
            
            if (!response.ok) {
                throw new Error('Ville non trouvée');
            }
            
            const data = await response.json();
            displayWeather(data);
            errorMessage.style.display = 'none';
        } catch (error) {
            errorMessage.textContent = 'Ville non trouvée. Essayez avec un nom international (ex: "Rome" pour l\'Italie)';
            errorMessage.style.display = 'block';
            console.error('Erreur:', error);
        }
    }

    function displayWeather(data) {
        // Affichage des données de base
        document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('temp').textContent = Math.round(data.main.temp);
        document.getElementById('weather-description').textContent = data.weather[0].description;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('wind').textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
        document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;

        // Affichage de l'icône (CORRECTION ICI)
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById('weather-icon').src = iconUrl;
        document.getElementById('weather-icon').alt = data.weather[0].description;

        // Date actuelle
        const now = new Date();
        document.getElementById('current-date').textContent = now.toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    // Recherche au clic ou avec Entrée
    searchBtn.addEventListener('click', search);
    cityInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') search();
    });

    function search() {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
    }

    // Chargement initial (optionnel)
    fetchWeather('Paris');
});