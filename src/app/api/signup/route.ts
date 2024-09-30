import { DBconnect } from "@/helper/DB_Connect";
import User from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Resend } from "resend";
import EmailTemplate from "@/helper/Email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined in the environment variables");
}

export async function POST(req: NextRequest) {
    console.log("Sign-up API");
    await DBconnect();
    const { username, email, password } = await req.json();
    try {
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000)
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.findOne({email});
        if (user) {
            if (user.isVerified) {
                return NextResponse.json({success:false ,message: "User already exists and is verified"},{status: 400});
            } else {
                user.verificationToken = verificationToken;
                user.verificationTokenExpires = verificationTokenExpires;
                user.password = hashedPassword;
                user.username = username;
                await user.save();
                await resend.emails.send({
                    from: "Acme <onboarding@resend.dev>",
                    to: email,
                    subject: "Verify your Account",
                    react: EmailTemplate({
                        userName: username, 
                        message: verificationToken, 
                        senderName: "GhostFeedBack Admin", 
                        subject: "verify"
                    })
                }).catch((error) => {
                    console.error(`Failed to send email to ${email}:`, error);
                });
                return NextResponse.json({success:true, message: "User updated and Verification email sent"},{status: 200});
            }
        }else {
            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                verificationToken: verificationToken,
                verificationTokenExpires: verificationTokenExpires,
                isVerified: false,
                resetPasswordToken : "",
                resetpasswordTokenExpires : null,
                messages : []
            });
            await newUser.save();
            await resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: email,
                subject: "Verify your Account",
                react: EmailTemplate({
                    userName: username, 
                    message: verificationToken, 
                    senderName: "GhostFeedBack Admin", 
                    subject: "verify"
                })
            });
            return NextResponse.json({success:true, message: "User Saved and Verification email sent"},{status: 200});
        }
    }
    catch (error:any) {
        return NextResponse.json({success:false, message: error.message},{status: 500});
    }
}
       