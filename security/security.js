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


const encryptString = (givenString) => {
  // convert the string to a buffer
  const stringBuffer = Buffer.from(givenString, 'utf-8');
  
  // create a hash object using the SHA-256 algorithm
  const hashObject = crypto.createHash('sha256');
  
  // update the hash with the buffer
  hashObject.update(stringBuffer);
  
  // generate the hash as a buffer
  const hashBuffer = hashObject.digest();
  
  // convert the hash buffer to a hexadecimal string and return it
  return hashBuffer.toString('hex');


};

const crypto = require('crypto');
const nodemailer = require('nodemailer');

// gizli anahtar
const secretKey = 'my_secret_key';

// kullanıcı bilgileri
const user = {
  name: 'John Doe',
  email: 'johndoe@example.com'
};

// token oluşturma fonksiyonu
function generateToken(user, secret) {
  const payload = {
    sub: user.email,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 saat geçerli
  };

  const token = crypto.createHmac('sha256', secret)
    .update(JSON.stringify(payload))
    .digest('hex');

  return token;
}

// e-posta gönderme fonksiyonu
async function sendEmail(user, token) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mygmail@gmail.com',
      pass: 'mypassword'
    }
  });

  const mailOptions = {
    from: 'mygmail@gmail.com',
    to: user.email,
    subject: 'Tokenized link for your account',
    html: `
      <p>Hi ${user.name},</p>
      <p>Click the following link to access your account:</p>
      <a href="http://example.com/token/${token}">http://example.com/token/${token}</a>
    `
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`Message sent: ${info.messageId}`);
}

// uygulama
const token = generateToken(user, secretKey);
sendEmail(user, token);
console.log('Token sent to', user.email);
