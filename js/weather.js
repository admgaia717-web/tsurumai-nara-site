/* js/weather.js */
document.addEventListener('DOMContentLoaded', () => {
    // 鶴舞の座標（奈良県奈良市）
    const LAT = 34.6851;
    const LON = 135.8048;

    const weatherIcons = {
        0: '☀️', 1: '⛅', 2: '☁️', 3: '☁️',
        45: '🌫️', 48: '🌫️',
        51: '🌦️', 53: '🌦️', 55: '🌦️',
        61: '🌧️', 63: '🌧️', 65: '🌧️', 66: '🌧️', 67: '🌧️',
        71: '❄️', 73: '❄️', 75: '❄️', 77: '❄️',
        80: '🌧️', 81: '🌧️', 82: '🌧️',
        85: '❄️', 86: '❄️',
        95: '⛈️', 96: '⛈️', 99: '⛈️'
    };

    const weatherJa = {
        0: '快晴', 1: '晴れ', 2: '曇り', 3: '曇り',
        45: '霧', 48: '霧',
        51: '小雨', 53: '小雨', 55: '小雨',
        61: '雨', 63: '雨', 65: '雨', 66: '雨', 67: '雨',
        71: '雪', 73: '雪', 75: '雪', 77: '雪',
        80: '雨', 81: '雨', 82: '雨',
        85: '雪', 86: '雪',
        95: '雷', 96: '雷', 99: '雷'
    };

    const windDir = ['北', '北北東', '北東', '東北東', '東', '東南東', '南東', '南南東', '南', '南南西', '南西', '西南西', '西', '西北西', '北西', '北北西'];

    function getUVDesc(uv) {
        if (uv <= 2) return '弱い';
        if (uv <= 5) return '中';
        if (uv <= 7) return '強い';
        if (uv <= 10) return '非常に強い';
        return '極端に強い';
    }

    async function fetchWeather() {
        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
            `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,pressure_msl,wind_speed_10m,wind_direction_10m` +
            `&hourly=temperature_2m,precipitation_probability,weather_code,uv_index` +
            `&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset` +
            `&timezone=Asia%2FTokyo&forecast_days=7`
        );
        if (!res.ok) throw new Error('Network response was not ok');
        return await res.json();
    }

    function updateDisplay(data) {
        const c = data.current;
        const h = data.hourly;
        const d = data.daily;
        const now = new Date();
        const hour = now.getHours();

        const el = (id) => document.getElementById(id);

        if (el('weather-updateTime')) {
            el('weather-updateTime').textContent = `${now.getMonth() + 1}/${now.getDate()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} 更新`;
        }

        if (el('weather-temperature')) el('weather-temperature').textContent = `${c.temperature_2m.toFixed(1)}°`;
        if (el('weather-condition')) el('weather-condition').textContent = weatherJa[c.weather_code] || '不明';
        if (el('weather-feelsLike')) el('weather-feelsLike').textContent = `${c.apparent_temperature.toFixed(1)}°`;
        if (el('weather-humidity')) el('weather-humidity').textContent = `${c.relative_humidity_2m}%`;
        if (el('weather-wind')) el('weather-wind').textContent = `${c.wind_speed_10m.toFixed(1)} m/s ${windDir[Math.round(c.wind_direction_10m / 22.5) % 16]}`;
        if (el('weather-precip')) el('weather-precip').textContent = `${c.precipitation.toFixed(1)} mm`;

        const uv = h.uv_index[hour] || 0;
        if (el('weather-uvIndex')) el('weather-uvIndex').textContent = uv.toFixed(1);
        if (el('weather-uvDesc')) el('weather-uvDesc').textContent = getUVDesc(uv);

        const sr = new Date(d.sunrise[0]);
        const ss = new Date(d.sunset[0]);
        if (el('weather-sunrise')) el('weather-sunrise').textContent = `${sr.getHours()}:${String(sr.getMinutes()).padStart(2, '0')}`;
        if (el('weather-sunset')) el('weather-sunset').textContent = `${ss.getHours()}:${String(ss.getMinutes()).padStart(2, '0')}`;

        const hourlyGrid = el('weather-hourlyGrid');
        if (hourlyGrid) {
            hourlyGrid.innerHTML = '';
            for (let i = 0; i < 24; i++) {
                const hr = (hour + i) % 24;
                const t = i === 0 ? '現在' : `${hr}時`;
                const code = h.weather_code[hour + i];

                const icon = weatherIcons[code] || '☁️';

                const item = document.createElement('div');
                item.className = 'weather-hourly-item';
                item.innerHTML = `
              <div class="weather-hourly-time">${t}</div>
              <div class="weather-hourly-icon">${icon}</div>
              <div class="weather-hourly-temp">${h.temperature_2m[hour + i].toFixed(0)}°</div>
            `;
                hourlyGrid.appendChild(item);
            }
        }

        const weeklyGrid = el('weather-weeklyGrid');
        if (weeklyGrid) {
            weeklyGrid.innerHTML = '';
            const days = ['日', '月', '火', '水', '木', '金', '土'];
            for (let i = 0; i < 7; i++) {
                const date = new Date();
                date.setDate(date.getDate() + i);
                const day = i === 0 ? '今日' : `${days[date.getDay()]}`;
                const code = d.weather_code[i];

                const item = document.createElement('div');
                item.className = 'weather-weekly-item';
                item.innerHTML = `
              <div class="weather-weekly-day">${day}</div>
              <div class="weather-weekly-condition">
                <span class="weather-weekly-icon">${weatherIcons[code] || '☁️'}</span>
                <span>${weatherJa[code] || '不明'}</span>
              </div>
              <div class="weather-weekly-high">${d.temperature_2m_max[i].toFixed(0)}°</div>
              <div class="weather-weekly-low">${d.temperature_2m_min[i].toFixed(0)}°</div>
            `;
                weeklyGrid.appendChild(item);
            }
        }

        if (el('weather-loading')) el('weather-loading').style.display = 'none';
        if (el('weather-content')) el('weather-content').style.display = 'block';
    }

    async function init() {
        const loader = document.getElementById('weather-loading');
        if (!loader) return; // Only run if the widget exists on the page
        try {
            const data = await fetchWeather();
            updateDisplay(data);
            setInterval(async () => updateDisplay(await fetchWeather()), 600000); // 10 minutes
        } catch (e) {
            if (loader) loader.textContent = '気象データの取得に失敗しました';
            console.error(e);
        }
    }

    init();
});
