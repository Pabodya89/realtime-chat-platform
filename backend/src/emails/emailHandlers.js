import { resendClient } from "../lib/resend"
import { createWelcomeEmailTemplate } from "../emails/emailTemplates.js"

export const sendWelcomeEmail = async (email, name , clientURL) => {
    //todo 
    const {data, error} = await resendClient.emails.send({
        from:`${sender.name} <$sender.email>` ,
        to: email,
        subject: "Welcome to ChatApp!",
        html: `<h1>Welcome to ChatApp, ${name}!</h1>`
            + `<p>We're excited to have you on board. Get started by visiting our website:</p>`
            + `<a href="${clientURL}">${clientURL}</a>`
            
    });

    if (error) {
        console.error("Error sending welcome email:", error);
        throw new Error("Failed to send welcome email");
    }

    console.log("Welcome email sent successfully:", data);
};