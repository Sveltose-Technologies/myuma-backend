import Auth from "../model/auth.model.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import sendEmail from "../services/email.js";

const generateToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : "30d"})
};

// const sendOtpEmail = async (fullName, email, otp) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//       },
//     });

//     await transporter.sendMail({
//       from: process.env.EMAIL,
//       to: email,
//       subject: "MyUma Account Verification OTP",
//  html: `
// <div style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial, sans-serif;">
//   <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 4px 10px rgba(0,0,0,0.05);">
    
//     <!-- Header -->
//     <tr>
//       <td style="background:#4A90E2;padding:20px;text-align:center;color:#ffffff;">
//         <h1 style="margin:0;font-size:24px;">🔐 Account Verification</h1>
//       </td>
//     </tr>

//     <!-- Body -->
//     <tr>
//       <td style="padding:30px;color:#333333;">
//         <h2 style="margin-top:0;">Hello ${fullName},👋</h2>
        
//         <p style="font-size:16px;line-height:1.6;">
//           Thank you for signing up. Please use the OTP below to verify your account:
//         </p>

//         <!-- OTP Box -->
//         <div style="text-align:center;margin:30px 0;">
//           <span style="
//             display:inline-block;
//             padding:15px 30px;
//             font-size:28px;
//             letter-spacing:5px;
//             font-weight:bold;
//             color:#4A90E2;
//             background:#f1f7ff;
//             border:2px dashed #4A90E2;
//             border-radius:8px;
//           ">
//             ${otp}
//           </span>
//         </div>

//         <p style="font-size:14px;color:#777;">
//           This OTP is valid for <strong>2 minutes</strong>. Do not share it with anyone.
//         </p>

//         <p style="font-size:14px;color:#999;margin-top:20px;">
//           If you did not request this, please ignore this email.
//         </p>
//       </td>
//     </tr>

//     <!-- Footer -->
//     <tr>
//       <td style="background:#f4f6f8;padding:15px;text-align:center;font-size:12px;color:#999;">
//         © ${new Date().getFullYear()} Your Company • Secure Authentication System
//       </td>
//     </tr>

//   </table>
// </div>
// `
//     });

//   } catch (error) {
//     console.error("Email Error:", error);
//     throw new Error("Email sending failed");
//   }
// };


const sendOtpEmail = async (fullName, email, otp) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"MyUma" <${process.env.EMAIL}>`,
      to: email,
      subject: "🔐 MyUma Account Verification OTP",
      html: `
<div style="margin:0;padding:0;background:#F8FAFC;font-family: Arial, sans-serif;">
  
  <div style="max-width:600px;margin:30px auto;background:#FFFFFF;border-radius:12px;border:1px solid #E5E7EB;overflow:hidden;">
    
    <!-- Header -->
    <div style="background:linear-gradient(90deg,#0B2C4D,#0F3A68);color:white;padding:20px;text-align:center;">
      <h2 style="margin:0;font-size:20px;">
        My<span style="color:#F59E0B;">Uma</span> - Verification
      </h2>
    </div>

    <!-- Body -->
    <div style="padding:25px;color:#1F2937;">




      
      <h3 style="margin-top:0;">Hello ${fullName}, 👋</h3>
      
      <p style="font-size:14px;color:#6B7280;line-height:1.6;">
        Thank you for signing up with 
        <b>My<span style="color:#F59E0B;">Uma</span></b>.  
        Please use the OTP below to verify your account:
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
        If you did not request this, please ignore this email.
      </p>

    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:15px;font-size:12px;color:#6B7280;background:#F3F4F6;">
      © ${new Date().getFullYear()} My<span style="color:#F59E0B;font-weight:600;">Uma</span> • Secure Authentication
    </div>

  </div>

</div>
`
    });

  } catch (error) {
    console.error("Email Error:", error);
    throw new Error("Email sending failed");
  }
};

export const signUp = async (req,res) => {
   
  try {
     const { fullName, email, password, address,role} = req.body
     
       if (!fullName || !email) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }

    const profileImage = req.file ? `/uploads/${req.file.filename} ` : null;

   const authExists = await Auth.findOne({ email });

      if (authExists && authExists.isVerified) {
      return res.status(400).json({
        message: "Email already registered",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

 
    if (authExists && !authExists.isVerified) {
    const hashedOtp = await bcrypt.hash(otp, 10);

  authExists.resetOtp = hashedOtp;
  authExists.resetOtpExpire = Date.now() + 2 * 60 * 1000;
  authExists.resetOtpVerified = false;

      await authExists.save();

     await sendOtpEmail(fullName, email, otp);

      return res.status(200).json({
        message: "signup verify OTP resent. Please verify your email",
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10)

    const auth = await Auth.create({
        fullName,
        email,
        password: hashedPassword,
        address,
        profileImage,
        role,
        resetOtp: await bcrypt.hash(otp, 10),
        resetOtpExpire: Date.now() + 2 * 60 * 1000,
        isVerified: false,
    })

  await sendOtpEmail(fullName, email, otp);

     return res.status(201).json({
      message: "signup verify OTP sent to email",
      attorneyId: auth.id, 
    });
     
  } catch (error) {
    console.error("Signup Error:", error);
    console.error("Details:", error.errors);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
      details: error.errors,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const auth = await Auth.findOne({ email });
    if (!auth) {
      return res.status(404).json({ message: "auth not found" });
    }

    const isMatch = await bcrypt.compare(password, auth.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    if (!auth.isVerified) {
      return res.status(401).json({
        message: "Please verify OTP first",
      });
    }


    // Set Cookie
    // res.cookie("token", token, {
    //   httpOnly: true,       
    //   secure: false,       
    //   sameSite: "strict",
    //   // maxAge: 30 * 24 * 60 * 60 * 1000, 
    //    maxAge: 3 * 60 * 60 * 1000, 
    // });

    res.status(200).json({
      message: "Login successful",
      auth: {
        id: auth.id,
        fullName: auth.fullName,
        email: auth.email,
        token : generateToken(auth.id),
      },
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const {email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email & OTP required"
      });
    }

    const auth = await Auth.findOne({ email });
    if (!auth) {
      return res.status(404).json({ message: "auth not found" });
    }

    const isMatch = await bcrypt.compare(otp, auth.resetOtp);

    if (!isMatch) {
    return res.status(400).json({ message: "Invalid OTP" });
   }

    if (auth.resetOtpExpire < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }
    auth.status = "active";  
    auth.isVerified = true;
    auth.resetOtpVerified = true;
    await auth.save();

    return res.status(200).json({
      message: "OTP verified successfully"
    });

  } catch (error) {
    console.error("Verify OTP Error:", error);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const forgetPassword = async(req,res) => {
    try {
        
     const {email} = req.body;
      if (!email) {
      return res.status(400).json({ message: "Email is required" });
      }
  
      const auth = await Auth.findOne({email});
        if (!auth) {
      return res.status(404).json({ message: "auth not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    auth.resetOtp = await bcrypt.hash(otp, 10);
    auth.resetOtpExpire = Date.now() + 2 * 60 * 1000; 
    auth.resetOtpVerified = false;

    await auth.save();

    await sendEmail(auth.fullName, auth.email, otp);

    res.status(200).json({
      status: true,
      message: "OTP sent to your email",
    });
    
    } catch (error) {
      console.error(error);
     res.status(500).json({ message: error.message });
    }    
};


export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const auth = await Auth.findOne({ email });
    if (!auth) return res.status(404).json({ message: "auth not found" });

    if (!auth.resetOtpVerified) {
      return res.status(400).json({ message: "OTP not verified" });
    }

    auth.password = await bcrypt.hash(newPassword, 10);
    auth.resetOtp = undefined;
    auth.resetOtpExpire = undefined;
    auth.resetOtpVerified = false;

    await auth.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAuth = async (req, res) => {
  try {

    const auths = await Auth.find();  

    if(!auths){
      return res.status(404).json({message: "No auths found"})
    }

    res.status(200).json(
    {
        message: "auths retrieved successfully",
        count: auths.length,
        auths
    }
    );

  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};   

export const getAuthById = async (req, res) => {
  try {
    const { id } = req.params;    
    const auth = await Auth.findById(id);

    if (!auth) return res.status(404).json({ message: "auth not found" });  

    res.status(200).json({
      message: "auth retrieved successfully",
      auth
    });
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  } 
};  

export const deleteAuth = async (req, res) => {

  try {
    const { id } = req.params;

    const auth = await Auth.findByIdAndDelete(id);
    if (!auth) return res.status(404).json({ message: "auth not found" });  

    res.status(200).json({ message: "auth deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }       

};

export const updateAuth = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, password, address,role } = req.body;  

     const profileImage = req.file ? `/uploads/${req.file.filename} ` : null;

    const auth = await Auth.findById(id);
    if (!auth) return res.status(404).json({ message: "auth not found" });  

    auth.fullName = fullName || auth.fullName;
    auth.role = role || auth.role;
    auth.email = email || auth.email;
    auth.address = address || auth.address; 
    auth.profileImage = profileImage || auth.profileImage;
    
    if (password) {
      auth.password = await bcrypt.hash(password, 10);
    } 
    await auth.save();

    res.status(200).json({
      message: "auth updated successfully",
      auth
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};