const { BrevoClient } = require('@getbrevo/brevo')

const client = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY
})

const sendEmail = async (content) => {
    try {
      const response =  await client.transactionalEmails.sendTransacEmail({
            sender: {
                name: "Facebook Clone",
                email: process.env.BREVO_EMAIL
            },
            to: [{
                name: content.name,
                email: content.email
            }],
            subject: content.subject,
            htmlContent: content.htmlContent
        })

        console.log('Email sent successfully', response.messageId)
    } catch (error) {
        console.log('Error sending email: ', error)
    }
}

module.exports = sendEmail