const sgMail = require('@sendgrid/mail')
const apiKey = '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'

sgMail.setApiKey(apiKey)

sgMail.send({
    to: 'mjhossainnyc@gmail.com',
    from: 'dev.mjhossain@gmail.com',
    subject: 'Sending a test email',
    text: 'This is a test email!.'
}).then(() => {
    console.log('Email Sent')
}).catch((e) => {
    console.log(e)
})