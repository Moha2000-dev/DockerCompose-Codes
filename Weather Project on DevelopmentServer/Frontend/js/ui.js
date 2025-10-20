// UI Management
const UIManager = {
    weatherContainer: document.getElementById('weatherContainer'),
    errorContainer: document.getElementById('errorContainer'),
    loadingElement: document.getElementById('loading'),
    
    showLoading() {
        this.loadingElement.classList.remove('hidden');
        this.errorContainer.classList.add('hidden');
        this.weatherContainer.innerHTML = '';
    },
    
    hideLoading() {
        this.loadingElement.classList.add('hidden');
    },
    
    showError(message) {
        this.errorContainer.textContent = `❌ Error: ${message}`;
        this.errorContainer.classList.remove('hidden');
    },
    
    hideError() {
        this.errorContainer.classList.add('hidden');
    },
    
    renderWeatherCards(weatherData) {
        this.hideLoading();
        
        if (!weatherData || weatherData.length === 0) {
            this.weatherContainer.innerHTML = `
                <div class="empty-state">
                    <p>No weather data available</p>
                    <p>Click "Refresh Weather Data" to load information</p>
                </div>
            `;
            return;
        }
        
        this.weatherContainer.innerHTML = weatherData.map(weather => `
            <div class="weather-card">
                <h3>${weather.cityName}</h3>
                <div class="temp">
                    ${weather.degree}
                    <span class="temp-unit">°C</span>
                </div>
                <p class="description">Current Temperature</p>
            </div>
        `).join('');
    },
    
    clear() {
        this.weatherContainer.innerHTML = '';
        this.hideError();
        this.hideLoading();
    }
};