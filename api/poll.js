const axios = require('axios')

module.exports = (req, res) => {
  res.send()

  const time = new Date()
  if (time.getUTCHours() >= 7 && date.getUTCHours() <= 19) {
    const awairDataUrl = encodeURI(`https://developer-apis.awair.is/v1/users/self/devices/${process.env.AWAIR_DEVICE_TYPE}/${process.env.AWAIR_DEVICE_ID}/air-data/latest`)

    axios.get(awairDataUrl, {
      headers: {
        'Authorization': `Bearer ${process.env.AWAIR_BEARER_TOKEN}`,
      }
    }).then(async awairRes => {
      const co2Level = awairRes.data.data[0].sensors.find(sensor => sensor.comp === 'co2').value
      if (co2Level >= 600) {
        await messageTelegram(co2Level)
        res.send()
      }
    })
  }
}

const messageTelegram = co2 => {
  const messageText = `CO2 is pretty high (${co2}), open a window! 🌬🏡`

  const telegramUrl = encodeURI(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${messageText}`)

  return axios.post(telegramUrl)
}
