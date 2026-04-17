import nodemailer from "nodemailer";

const sendEmail = async (fullName, email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"MyUma" <${process.env.EMAIL}>`,
      to: email,
      subject: "🔐 MyUma Reset Password OTP",
      html: `
<div style="margin:0;padding:0;background:#F8FAFC;font-family: Arial, sans-serif;">
  
  <div style="max-width:600px;margin:30px auto;background:#FFFFFF;border-radius:12px;border:1px solid #E5E7EB;overflow:hidden;">
    
    <!-- Header -->
    <div style="background:linear-gradient(90deg,#0B2C4D,#0F3A68);color:white;padding:20px;text-align:center;">
      <h2 style="margin:0;font-size:20px;">
        My<span style="color:#F59E0B;">Uma</span> - Reset Password
      </h2>
    </div>

    <!-- Body -->
    <div style="padding:25px;color:#1F2937;">
      
      <h3 style="margin-top:0;">Hello ${fullName}, 👋</h3>
      
      <p style="font-size:14px;color:#6B7280;line-height:1.6;">
        We received a request to reset your 
        <b>My<span style="color:#F59E0B;">Uma</span></b> account password.  
        Please use the OTP below to proceed:
      </p>

      <!-- OTP Box -->
      <div style="text-align:center;margin:30px 0;">
        <span style="
          display:inline-block;
          padding:16px 35px;
          font-size:30px;
          letter-spacing:6px;
          font-weight:bold;
          color:#0B2C4D;
          background:#FFF7ED;
          border:2px dashed #F59E0B;
          border-radius:10px;
        ">
          ${otp}
        </span>
      </div>

      <p style="font-size:14px;color:#6B7280;">
        This OTP is valid for <strong>2 minutes</strong>. Do not share it with anyone.
      </p>

      <p style="font-size:13px;color:#9CA3AF;margin-top:15px;">
        If you did not request a password reset, you can safely ignore this email.
      </p>

    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:15px;font-size:12px;color:#6B7280;background:#F3F4F6;">
      © ${new Date().getFullYear()} 
      <b>My<span style="color:#F59E0B;">Uma</span></b> • Secure Authentication System
    </div>

  </div>

</div>
`
    });

    return info;

  } catch (error) {
    console.error("Email send error:", error);
    throw error;
  }
};
export default sendEmail