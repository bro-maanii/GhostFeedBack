import React from 'react';


const EmailTemplate = ({ userName, message, senderName , subject}:any) => {
    return (
        <>
            <h1>Hello {userName},</h1>
            {subject === "verify" ? (
            <p>Please verify your account by entering the following code:</p>
            ) : (
            <h1>Please enter the following code to reset your password:</h1>
            )}
            <p>Don't share this code with anyone. It is confidential and meant for your use only.</p>
            <p><i>Code: <strong>{message}</strong></i></p>
            <p>If you did not request this, please ignore this email or contact support.</p>
            <p>Best regards,</p>
            <p><strong>{senderName}</strong></p>
            <p>P.S. If you have any questions, feel free to reply to this email.</p>
            <p>Thank you for being a valued member of our community. We are committed to providing you with the best service possible. If you have any feedback or suggestions, please do not hesitate to share them with us. Your input is invaluable and helps us improve our services.</p>
            <p>We hope you have a great day!</p>
            <p>Warm regards,</p>
            <p>The Support Team</p>
        </>
    );
};

export default EmailTemplate;