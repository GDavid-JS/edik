const express = require("express");
const port = process.env.PORT || 5000;
const app = express();
const multer = require('multer');
// const bodyParser = require('body-parser');
const comments = require('./database/comments/comments.json');
const users = require('./database/users/users.json');
const path = require('path');
const fs = require('fs');

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});



app.use('/', express.static(__dirname + '/public/pages'));
app.use('/public/images', express.static(__dirname + '/public/images'));


app.get('/comments', (req, res) => {
  res.json(comments);
})

const storage = multer.diskStorage({
  destination: './public/images',
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage
}).single('image');

app.post('/login', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
    } else {
      let send = {
        "error": {
          "flag": false,
          "message": ""
        },
        "responce": false
      }


      if (Boolean(req.body.checkbox)) {

        let user = req.body;
        user.photoUrl = req.file.path;
        user.id = users.length+1;
        delete user.checkbox;


        users.forEach(userItem => {
          if (user.name === userItem.name) {
            send.error.flag = true;
            send.error.message = "Это имя уже существует";
          }
        })

        if (!send.error.flag) {
          users.push(user);

          fs.writeFile("./database/users/users.json", JSON.stringify(users), function(error){
            if(error) console.log(error);
          });

          send.responce = JSON.stringify(user);
        }
      } else {

        users.every(user => {
          if(user.name === req.body.name && user.password === req.body.password) {
            send.responce = JSON.stringify(user);
            return false
          } else {
            send.error.flag = true;
            send.error.message = 'Неверный пароль или имя пользователя';
          }
        })
      }


      res.send(send);
    }
  })
});


const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
  {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
        user: 'serenity.ledner77@ethereal.email',
        pass: 'sjGWGFS6rFAERjsA6P'
    },
    tls : { rejectUnauthorized: false }
  },{
    from: 'Mailer Test <serenity.ledner77@ethereal.email>'
  }
);

const mailer = message => {
  transporter.sendMail(message, (error, info) => {
    if (error) {
      console.log(error)
    }

    console.log("Email sent: ", info)
  })
}


app.post('/message', (req, res) => {
  upload(req, res, (err) => {

    console.log(req.body)

    const massage = {
      subject: 'Congradulations',
      to: 'grigoriand265@gmail.com',
      html: `
      <h2>Заголовок</h2>
      <div>${req.body.text}</div>
      <div style="margin-top: 20px;">Имя пользователя: <b>${req.body.name}</b></div>
      <div>Телефон пользователя: <b>${req.body.tel}</b></div>
      <div>Сообщение от пользователя: <b>${req.body.email}</b></div>
      `,
    }

    mailer(massage)

    res.send(true);
  })
})

app.post('/maincomment', (req, res) => {
  upload(req, res, (err) => {
    console.log(req.body)

    res.send(req.body)
  })
})

