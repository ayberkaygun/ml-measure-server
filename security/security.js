const { text } = require("body-parser");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');

//Yapıcı fonksiyon sınıf gibi davranır.
function mailTokenObject(mail,token) {
  this.mail = mail
  this.token = token 
}
const mailTokenObjectList = []

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

async function sendEmail(mail) {
  // Rastgele şifrelenmiş dizeyi oluşturun
  const randomString = generateRandomString(5);
  let mailIsAlreadyUse = false
  let tokentext = ""
  //token oluşturma
  const token = jwt.sign({ randomString }, "your_secret_key");
  //tokenlar ve mailleri listeye alma
  if(mailTokenObjectList.length == 0){
    mailTokenObjectList[0] = new mailTokenObject(mail,token)
  }

  //mail daha önce girildi mi diye kontrol etme
  for (let mailCount = 0; mailCount < mailTokenObjectList.length; mailCount++) {
    if(mail == mailTokenObjectList[mailCount].mail){
      mailIsAlreadyUse = true
      tokentext = `Aşağıdaki bağlantıyı kullanarak giriş yapınız: http://localhost:3000/measure/token=${mailTokenObjectList[mailCount].token}`
      break
    }
  }
  //Yeni bir mail ise listeye ekle
  if(mailIsAlreadyUse == false){
    mailTokenObjectList[mailTokenObjectList.charactersLength] = new mailTokenObject(mail,token)
    tokentext = `Aşağıdaki bağlantıyı kullanarak giriş yapınız: http://localhost:3000/measure/token=${mailTokenObjectList[mailTokenObjectList.length].token}`
  }

  try {
    // E-posta göndermek için kullanacağınız e-posta hesap bilgilerini girin
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "ayberk.aygun07@gmail.com", // E-posta adresin
        pass: "nnsvmpjhpcoposmt", //App şifren
      },
    });


    // E-posta ayarlarınızı ve içeriğinizi düzenleyin
    const mailOptions = {
      from: "ayberk.aygun07@gmail.com", // Gönderen e-posta adresi
      to: mail, // Alıcı e-posta adresi
      subject: "ML Measure Project Token Link", // E-posta konusu
      text: tokentext, // E-posta içeriği (metin formatı)
    };

    // E-postayı gönder
    const info = await transporter.sendMail(mailOptions);
    console.log("E-posta gönderildi:", info.messageId);
  } catch (error) {
    console.error("E-posta gönderme hatası:", error);
  }
};
module.exports = {
  sendEmail: sendEmail
};
