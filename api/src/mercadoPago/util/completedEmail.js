const nodemailer = require('nodemailer')
require('dotenv').config()
// const { EMAIL, EMAIL_PASSWORD } = process.env;

this.enviar_mail_completed = async (name, email) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  let mail_options = {
    from: 'growup-libros',
    to: email,
    subject: 'GROW-UP LIBROS TU ORDEN HA SIDO ENTREGADA A TU DOMICILIO',
    html: `<table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
        <tr height="200px">
            <td bgcolor="" width="600px">
                <h1 style="color: #fff; text-align: center;">Buenos dias ${name}:</h1>
                <p style="color: #fff; text-align: center;"> <span style="color:#e84393;">Queremos informarle que tu paquete ha sido entregada en tu domicilio. Muchas gracias por tu compra y esperamos que disfrutes tu libro.</span> </p>
    
            </td>
        </tr>
    </table>`,
  }
  try {
    const response = await transporter.sendMail(mail_options)
    return console.log('SE ENVIO CON EXITO', response.response)
  } catch (error) {
    console.log('FALLO EL ENVIO DE EMAIL', error)
  }
}

module.exports = this
