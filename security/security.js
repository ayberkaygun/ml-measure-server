const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const generateRandomString = (length) => {
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

const sendEmail = async () => {
  try {
    // E-posta göndermek için kullanacağınız e-posta hesap bilgilerini girin
    const transporter = nodemailer.createTransport({
      service: "Gmail", // E-posta sağlayıcınıza göre değişebilir
      auth: {
        user: "ayberk.aygun07@gmail.com", // E-posta adresiniz
        pass: "***********", // E-posta şifreniz
      },
    });

    // Rastgele şifrelenmiş dizeyi oluşturun
    const randomString = generateRandomString(10);

    // Token oluşturun
    const token = jwt.sign({ randomString }, "your_secret_key");

    // E-posta ayarlarınızı ve içeriğinizi düzenleyin
    const mailOptions = {
      from: "ayberk.aygun07@gmail.com", // Gönderen e-posta adresi
      to: "ayberk.aygun127@gmail.com", // Alıcı e-posta adresi
      subject: "Şifre Sıfırlama Bağlantısı", // E-posta konusu
      text: `Aşağıdaki bağlantıyı kullanarak şifrenizi sıfırlayabilirsiniz: https://example.com/reset-password?token=${token}`, // E-posta içeriği (metin formatı)
    };

    // E-postayı gönderin
    const info = await transporter.sendMail(mailOptions);
    console.log("E-posta gönderildi:", info.messageId);
  } catch (error) {
    console.error("E-posta gönderme hatası:", error);
  }
};

// E-posta gönderme fonksiyonunu çağırın.
sendEmail();
