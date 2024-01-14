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

let sendAttechment = async (dataSend) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'nguyen.quan.it.99@gmail.com', // generated ethereal user
            pass: 'wvhnohvojahyozqr', // generated ethereal password
            // user: process.env.EMAIL_APP, // generated ethereal user
            // pass: process.env.EMAIL_APP_PASSWORD, 
        },
    });

    // send mail with defined transport object aopqnknntywfvksv
    let info = await transporter.sendMail({
        from: '"Bac Si "<nguyen.quan.it.99@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Đặt lịch khám bệnh", // Subject line
        text: "Hello world?", // plain text body
        html: `
        <h3>Xin chào ${dataSend.patientName}!</h3>
        <p>Cám ơn bạn đã lựa chọn BookingCare</p>
        <p>BookingCare chúc bạn luôn luôn mạnh khỏe!</p>   
        </div>
        
        `, // html body
        attechments:
        {   // encoded string as an attachment
            filename: 'text1.png',
            content: 'aGVsbG8gd29ybGQh',
            encoding: dataSend.imgBase64,
        },
    });
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    sendAttechment: sendAttechment,
}