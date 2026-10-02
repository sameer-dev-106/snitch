import { Resend } from "resend";
import { config } from "../config/config.js";

const resend = new Resend(config.RESEND_API_KEY);

export async function sendEmail({ to, subject, html }) {
    try {
        const data = await resend.emails.send({
            from: "onboarding@resend.dev",
            to,
            subject,
            html
        });
        console.log("Email sent:", data);
        return {
            success: true,
            data
        };
    } catch (error) {
        console.error("Email error:", error);
        return {
            success: false,
            error
        };
    }
}

// export const sendResetPasswordEmail = async ({ to, resetUrl }) => {
//     if (!config.EMAIL_USER || !config.EMAIL_APP_PASSWORD) {
//         throw new Error(
//             "Email is not configured. Set EMAIL_USER and EMAIL_APP_PASSWORD in Backend/.env"
//         );
//     }

//     await transporter.sendMail({
//         from: `"Snitch" <${config.EMAIL_USER}>`,
//         to,
//         subject: "Reset your Snitch password",
//         html: `
//             <div style="font-family: sans-serif; max-width: 480px; margin: auto;">
//                 <h2 style="font-weight: 500;">Reset your password</h2>
//                 <p>We received a request to reset your Snitch account password. Click the button below to choose a new one. This link expires in 1 hour.</p>
//                 <p style="margin: 24px 0;">
//                     <a href="${resetUrl}" style="background:#1b1c1a;color:#fbf9f6;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;">
//                         Reset Password
//                     </a>
//                 </p>
//                 <p style="color:#7A6E63;font-size:13px;">If you didn't request this, you can safely ignore this email — your password won't change.</p>
//             </div>
//         `,
//     });
// };
