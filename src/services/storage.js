export function setToLocalStorage(arr) {
    localStorage.removeItem('dataWeather');
    localStorage.setItem('dataWeather', JSON.stringify([arr]));
}

export function getToLocalStorage() {
    const storage = localStorage.getItem('dataWeather');

    if (storage) {
        return JSON.parse(storage)[0];
    }
}
