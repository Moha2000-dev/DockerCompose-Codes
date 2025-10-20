// Main Application Logic
const App = {
    init() {
        this.setupEventListeners();
        this.loadWeatherData();
    },
    
    setupEventListeners() {
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.loadWeatherData();
        });
    },
    
    async loadWeatherData() {
        UIManager.showLoading();
        
        try {
            const weatherData = await fetchWeatherData();
            UIManager.renderWeatherCards(weatherData);
        } catch (error) {
            UIManager.hideLoading();
            UIManager.showError(error.message);
        }
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});