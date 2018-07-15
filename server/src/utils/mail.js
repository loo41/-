const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

const sendMails = (mail, html) => {
  let transporter = nodemailer.createTransport(smtpTransport({
    host: "smtp.163.com",
    secureConnection: true,
    port: 465,
    auth: {
      user: '17320098939@163.com',
      pass: 'youngon20',
    }
  }))
  let sendmail = () => {
      var option = {
          from: "约座<17320098939@163.com>",
          to: `${mail}`,
          headers: {
              "X-Mailer": "Microsoft Outlook Express 6.00.2900.2869"
          },
          date: new Date()
      }
      option.subject = '约座记录'
      option.html = html;
      transporter.sendMail(option, function(error, response){
          if(error) {
              console.log("fail: " + error);
          } else {
              console.log("success:" + response.response);
          }
      });
  }
  sendmail()
}

module.exports = {
  sendMails
}