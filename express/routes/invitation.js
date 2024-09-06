import express from 'express'
import transporter from '#configs/mail.js'
import 'dotenv/config.js'

const router = express.Router()

router.get('/send', function (req, res, next) {

    const { event_name, event_date, name, gender, times, timee, address, email } = req.query

  const mailOptions = {
    from: `"醺迷仙園"<${process.env.SMTP_TO_EMAIL}>`,
    to: email,
    subject: '一支會活動資訊',
    html: `
    <h3> 此函為提供活動主要資訊，請以實際生成之邀請函為主 </h3>
      <div className="eventCardOuter" style="width: 750px; height: 200px; background: #F9F7EF; border: 2px solid #D4C0C0; display: flex;">
        <img
          className="eventCardPic"
          src="https://storage.googleapis.com/winentaste-alcohol-quick-howl-assets/images/article/tutorial/tutorial_taste_step_00.jpg"
          alt=""
          style="width: 300px; height: 100%; object-fit: cover; object-position: top;"
        >
        </img>
        <div className="eventCardInfo" style="width: 55%; padding: 20px 25px;">
          <div className="Infotitle" style="font-size: 20px; letter-spacing: 2px; font-weight: 900; color: #916B51;">${event_name}</div>
          <div className="InfoT" style="padding-top: 15px; color: #60464C; letter-spacing: 2px; font-weight: 400; line-height: 26px;">
            活動日期 - ${event_date} &nbsp; 
            ${times} ~ ${timee} <br />
            活動地點 - ${address}
          </div>
          <div className="InfoP" style="padding-top: 15px; color: #60464C; letter-spacing: 2px; font-weight: 400; line-height: 26px;">
            [ 參加者資訊 ] <br />
            ${name} / ${gender}
          </div>
        </div>
    </div>
    `,
  }

  transporter.sendMail(mailOptions, (err, response) => {
    if (err) {
      return res.status(400).json({ status: 'error', message: err.message })
    } else {
      return res.json({ status: 'success', data: null })
    }
  })
})

export default router
