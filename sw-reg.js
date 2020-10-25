if ('serviceWorker' in navigator) {
    serviceWorkerRegister()
    requestPermisson()
} else {
    console.log('serviceWorker Belum didukung browser ini.')
}

function serviceWorkerRegister() {
    return navigator.serviceWorker
        .register('service-worker.js')
        .then((registration) => {
            console.log('Pendaftaran ServiceWorker berhasil')
            return registration
        })
        .catch(() => {
            console.log('pendaftaran serviceWorker gagal')
        })
}

function requestPermisson() {
    if ('Notification' in window) {
        Notification.requestPermission().then((response) => {
            if (response === 'denied') {
                console.log('fitur notifikasi tidak diijinkan.')
                return
            } else if (response === 'default') {
                console.error('Pengguna menutup kotak dialog perminataan ijin.')
                return
            }

            if ('PushManager' in window) {
                navigator.serviceWorker.getRegistration().then((registration) => {
                    registration.pushManager
                        .subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array(
                                '<Appkey>'
                            ),
                        })
                        .then((subscribe) => {
                            console.log('Berhasil subscribe dengan endpoint : ', subscride.endpoint)
                            console.log(
                                'berhasil melakukan subscribe dengan p256dh key: ',
                                btoa(
                                    String.fromCharCode.apply(
                                        null, new Uint8Array(subscribe.getKey('p256dh'))
                                    )
                                )
                            )
                            console.log(
                                'Berhasil melakukan subscribe dengan auth key: ', btoa(
                                    String.fromCharCode.apply(
                                        null, new Uint8Array(subscribe.getKey('auth'))
                                    )

                                )
                            )
                        })
                        .catch((e) => {
                            console.error('tidak dapat melakukan sunscribe', e.message)
                        })
                })
            }
        })
    }
}


function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length)
    for (let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}
