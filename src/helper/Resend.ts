import { Resend } from "resend";
import EmailTemplate from "./Email-template"; // Adjust the import path as necessary


export async function sendEmail(email: string, verificationCode: string , username:string ,subject:string): Promise<void> {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: email,
        subject: `${subject==="verify"?"Verify your account":"Forgot Password"}`,
        react: EmailTemplate({
            recipientName: { username },
            message: { verificationCode },
            senderName: "Acme Team",
            subject: subject
        }),
    });
    console.log("Email sent");
}