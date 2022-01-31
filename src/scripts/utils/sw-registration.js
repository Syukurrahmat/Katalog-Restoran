const swRegister = async () => {
    if (!('serviceWorker' in navigator)) return console.log('Browser tidak mendukung Service Worker')

    navigator.serviceWorker.register('./sw.js').catch((error) => console.log('Failed to register service worker', error))
}

export default swRegister
