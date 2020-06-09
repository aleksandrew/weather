export function setLocalStorage (arr) {
    localStorage.removeItem('dataWeather');
    localStorage.setItem('dataWeather', JSON.stringify([arr]));
}

export function getLocalStorage () {
    const storage = localStorage.getItem('dataWeather');

    if (storage) {
        return JSON.parse(storage)[0];
    }
}
