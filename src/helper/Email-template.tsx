import React from 'react';


const EmailTemplate = ({ userName, message, senderName , subject}:any) => {
    return (
        <div className="text-4xl gap-4">
            <h2>Hello {userName},</h2>
            {(subject==="verify")? <p> "Please verify your account by entering the following code:" </p>
            :<h1>"Please enter the following code to reset your password:" </h1>}
            <p>code: <strong>{message}</strong>
            </p>
            <p>Best regards,</p>
            <p>{senderName}</p>
        </div>
    );
};

export default EmailTemplate;