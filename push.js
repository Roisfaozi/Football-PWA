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
    'endpoint': ' https://fcm.googleapis.com/fcm/send/cfEkM4FDiT0:APA91bErFOooQTfgqeecEgdQVPDt1ozOAmBOOEkEAh6dpIfv1wzpjv1SAFZWd5NSi-1hzEoppML5A2aIsCQeqx2UVeI_Cg3rw5lhW6dtrzQqm-OTtxGgdwz5Ujmb9twfOW6kmNCWt2xk',
    'keys': {
        'p256dh': 'BHpTJDMIlHQKH8S2QTv+sUsS6BVsqjm9DboWU0H2yo7ugcpY2q7KyKh8zD2CcMI1uZ/J0V1xIy/LxVvLAkQUsXY=',
        'auth': 'cmyotZTFueTYj6uhY8dQXQ=='
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