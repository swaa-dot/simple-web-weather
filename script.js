// Ganti dengan API key Anda dari OpenWeatherMap
const apiKey = "65d5d280a86ec2f26a632d5222bc1323";

// Elemen DOM
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const cityName = document.getElementById('city-name');
const dateElement = document.getElementById('date');
const temp = document.getElementById('temp');
const weatherDescription = document.getElementById('weather-description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherIcon = document.getElementById('weather-icon');
const weatherBox = document.getElementById('weather-box');
const error = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const loading = document.getElementById('loading');
const latitudeElement = document.getElementById('latitude');
const longitudeElement = document.getElementById('longitude');
const locationResults = document.getElementById('location-results');

// Format tanggal
function formatDate(date) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const day = days[date.getDay()];
    const dayNumber = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day}, ${dayNumber} ${month} ${year}`;
}

// Dapatkan icon cuaca berdasarkan kode dari API
function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': 'fas fa-sun',
        '01n': 'fas fa-moon',
        '02d': 'fas fa-cloud-sun',
        '02n': 'fas fa-cloud-moon',
        '03d': 'fas fa-cloud',
        '03n': 'fas fa-cloud',
        '04d': 'fas fa-cloud',
        '04n': 'fas fa-cloud',
        '09d': 'fas fa-cloud-showers-heavy',
        '09n': 'fas fa-cloud-showers-heavy',
        '10d': 'fas fa-cloud-sun-rain',
        '10n': 'fas fa-cloud-moon-rain',
        '11d': 'fas fa-bolt',
        '11n': 'fas fa-bolt',
        '13d': 'fas fa-snowflake',
        '13n': 'fas fa-snowflake',
        '50d': 'fas fa-smog',
        '50n': 'fas fa-smog'
    };
    
    return iconMap[iconCode] || 'fas fa-cloud';
}

// Tampilkan data cuaca
function displayWeather(data) {
    cityName.textContent = data.name;
    temp.textContent = Math.round(data.main.temp);
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h
    
    // Tampilkan koordinat
    latitudeElement.textContent = data.coord.lat.toFixed(4);
    longitudeElement.textContent = data.coord.lon.toFixed(4);
    
    // Set icon cuaca
    const iconClass = getWeatherIcon(data.weather[0].icon);
    weatherIcon.innerHTML = `<i class="${iconClass}"></i>`;
    
    // Tampilkan elemen cuaca dan sembunyikan error
    weatherBox.style.display = 'block';
    error.style.display = 'none';
    locationResults.style.display = 'none';
}

// Ambil data lokasi berdasarkan nama kota
async function getLocationData(city) {
    // Tampilkan loading
    loading.style.display = 'block';
    weatherBox.style.display = 'none';
    error.style.display = 'none';
    locationResults.style.display = 'none';
    
    try {
        // Endpoint API untuk data geolokasi
        const apiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data lokasi');
        }
        
        const data = await response.json();
        
        // Sembunyikan loading
        loading.style.display = 'none';
        
        if (data.length === 0) {
            throw new Error('Lokasi tidak ditemukan');
        }
        
        // Jika hanya satu hasil, langsung ambil data cuaca
        if (data.length === 1) {
            getWeatherByCoords(data[0].lat, data[0].lon);
        } else {
            // Tampilkan pilihan lokasi
            displayLocationResults(data);
        }
        
    } catch (err) {
        // Sembunyikan loading dan tampilkan error
        loading.style.display = 'none';
        weatherBox.style.display = 'none';
        error.style.display = 'block';
        errorMessage.textContent = err.message;
    }
}

// Tampilkan hasil pencarian lokasi
function displayLocationResults(locations) {
    locationResults.innerHTML = '';
    
    locations.forEach(location => {
        const locationItem = document.createElement('div');
        locationItem.className = 'location-item';
        
        let locationText = location.name;
        if (location.state) locationText += `, ${location.state}`;
        if (location.country) locationText += `, ${location.country}`;
        
        locationItem.innerHTML = `
            <div>${locationText}</div>
            <div class="location-details">Lat: ${location.lat.toFixed(4)}, Lon: ${location.lon.toFixed(4)}</div>
        `;
        
        locationItem.addEventListener('click', () => {
            getWeatherByCoords(location.lat, location.lon);
        });
        
        locationResults.appendChild(locationItem);
    });
    
    locationResults.style.display = 'block';
}

// Ambil data cuaca berdasarkan koordinat
async function getWeatherByCoords(lat, lon) {
    // Tampilkan loading
    loading.style.display = 'block';
    weatherBox.style.display = 'none';
    error.style.display = 'none';
    locationResults.style.display = 'none';
    
    try {
        // Endpoint API untuk data cuaca berdasarkan koordinat
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Gagal mengambil data cuaca');
        }
        
        const data = await response.json();
        
        // Sembunyikan loading dan tampilkan data cuaca
        loading.style.display = 'none';
        displayWeather(data);
        
    } catch (err) {
        // Sembunyikan loading dan tampilkan error
        loading.style.display = 'none';
        weatherBox.style.display = 'none';
        error.style.display = 'block';
        errorMessage.textContent = err.message;
    }
}

// Dapatkan lokasi pengguna
function getUserLocation() {
    if (navigator.geolocation) {
        loading.style.display = 'block';
        weatherBox.style.display = 'none';
        error.style.display = 'none';
        locationResults.style.display = 'none';
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByCoords(lat, lon);
            },
            (error) => {
                loading.style.display = 'none';
                weatherBox.style.display = 'none';
                error.style.display = 'block';
                errorMessage.textContent = 'Izin akses lokasi ditolak. Silakan cari kota secara manual.';
            }
        );
    } else {
        error.style.display = 'block';
        errorMessage.textContent = 'Browser tidak mendukung geolokasi';
    }
}

// Event listener untuk tombol pencarian
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getLocationData(city);
    }
});

// Event listener untuk tombol lokasi
locationBtn.addEventListener('click', getUserLocation);

// Event listener untuk menekan Enter di input
cityInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getLocationData(city);
        }
    }
});

// Inisialisasi dengan data cuaca Jakarta
document.addEventListener('DOMContentLoaded', () => {
    // Set tanggal hari ini
    dateElement.textContent = formatDate(new Date());
    
    // Ambil data cuaca untuk Jakarta
    getLocationData('Jakarta');
});