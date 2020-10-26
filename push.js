const webPush = require('web-push')

const vapidKeys = {
    'publicKey': 'BKfpvDR_nqJ6pw9HKLS7g5rc8Jf5dx__TAgcppAAXw6lUwgGKODXBqFhoq9kuJj_nDzIcjc1wuMaRFDCYYXRBUQ',
    'privateKey': '8pcOo7vN0LDdCjhn8XUfmz0Jfn4Tl3hVuY5zNpANs38'
}

webPush.setVapidDetails(
    'mailto:roisfaozi55@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

const pushSubsctiption = {
    'endpoint': 'https://sg2p.notify.windows.com/w/?token=BQYAAADihSqJAwF4w5molmXWbKrRPcDHcSqsC8PxI%2fLfFkoyTzx7kh4caYFogHP9FUSWONskouiByVrsh8eDIcw13o%2bETcWhuMidDOc51ZGLlT%2b4OKkhjKKtNs8xBUDAZDI%2bP3UzljLQiiOrHMsh2Yku70U3i3TbOMNMbaXasbbeQEnvV9RHVBDYnC33YTgQHILCR5MJuIULv9xtcgi1NVRMeQrVzFing5c21MvTBD0jBtTV5Bf%2bd%2fN9TexyTiy7mSlouFAWvFA4aTikYU3Q5sb%2b7IvE1OIgqn7ShJTnAHpi8M%2fCsjCFTibpLhAKy8gm%2bL1BddM%3d',
    'keys': {
        'p256dh': 'BJakirQm3e1OgdQE7W4XSiYkwKBPFwmNoObzcq5Je67dyvhJQQFup2cpNlTSsJ6GCqPtnEMOQT/5SxM468jfsPc=',
        'auth': '7NrOk1TZ4l+kQXAvaKhbbA=='
    }
}

const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi'
const options = {
    gcmAPIKey: '209657799911',
    TTL: 60
}

webPush.sendNotification(
    pushSubsctiption,
    payload,
    options
)
    .then((status) => {
        console.log(status)
    })
    .catch((error) => {
        console.log(error)
    })