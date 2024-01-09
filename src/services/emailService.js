require('dotenv').config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async (dataSend) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            // TODO: replace `user` and `pass` values from <https://forwardemail.net>
            user: process.env.EMAIL_APP,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // async..await is not allowed in global scope, must use a wrapper
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"BookingCare" <thanhphong2k.bp@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        text: "Hello world?", // plain text body
        html: `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <h4>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Bookingcare clone</h4>
        <p> Thông tin đặt lịch khám bệnh </p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Thời gian: ${dataSend.doctorName}</b></div>
        <p>Nếu các thông tin trên là đúng sự thật vui lòng CLICK vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
        <div>
        <a href= ${dataSend.redirectLink} target="_blank" > Click here </a>
        </div>
        <div>Xin chân thành cảm ơn</div>

        `, // html body
    });

}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}