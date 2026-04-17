import ContactUs from "../model/contectUs.model.js"
import nodemailer from "nodemailer"

export const sendMessage = async(req,res) => {
    try {
        const {fullName, email, contactNo, address, message} = req.body
        if(!fullName || !email || !contactNo || !message){
           return res.status(400).json({
                message : " fullName email contactNo message are required"
            })
        };

        const contact = await ContactUs.create({ fullName, email, contactNo, address, message })

         try {
     const transporter = nodemailer.createTransport({
    //   host: "smtp.hostinger.com",
    //   port: 465,
         service: "gmail",
         auth: {
           user: process.env.EMAIL,   
           pass: process.env.PASSWORD,
         },
       });

const mailOptions = {
  from: `"${fullName}" <${process.env.EMAIL}>`,
  to: process.env.EMAIL,
  replyTo: `"${fullName}" <${email}>`,
  subject: "📩 New Contact Form Message",
  html: `
  <div style="margin:0;padding:0;background:#F8FAFC;font-family: Arial, sans-serif;">
    
    <div style="max-width:600px;margin:30px auto;background:#FFFFFF;border-radius:12px;border:1px solid #E5E7EB;overflow:hidden;">
      
      <!-- Header -->
      <div style="background:linear-gradient(90deg,#0B2C4D,#0F3A68);color:white;padding:20px;text-align:center;">
        <h2 style="margin:0;font-size:20px;">
          My<span style="color:#F59E0B;">Uma</span> - New Message
        </h2>
      </div>

      <!-- Body -->
      <div style="padding:20px;color:#1F2937;">
        
        <p style="font-size:14px;color:#6B7280;margin-bottom:20px;">
          You have received a new message from your 
          <b>My<span style="color:#F59E0B;">Uma</span></b> website contact form.
        </p>

        <!-- Info Box -->
        <div style="border:1px solid #E5E7EB;border-radius:10px;overflow:hidden;">
          
          <div style="padding:12px;border-bottom:1px solid #E5E7EB;">
            <b>Full Name:</b> ${fullName}
          </div>

          <div style="padding:12px;border-bottom:1px solid #E5E7EB;">
            <b>Email:</b> ${email}
          </div>

          <div style="padding:12px;border-bottom:1px solid #E5E7EB;">
            <b>Contact No:</b> ${contactNo}
          </div>

          <div style="padding:12px;border-bottom:1px solid #E5E7EB;">
            <b>Address:</b> ${address || "N/A"}
          </div>

          <div style="padding:12px;background:#F9FAFB;">
            <b>Message:</b>
            <div style="margin-top:8px;line-height:1.6;color:#374151;">
              ${message}
            </div>
          </div>

        </div>

        <!-- Button -->
        <div style="margin-top:25px;text-align:center;">
          <a href="mailto:${email}" 
             style="background:#F59E0B;color:#FFFFFF;padding:12px 22px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;display:inline-block;">
             Reply to User
          </a>
        </div>

      </div>

      <!-- Footer -->
      <div style="text-align:center;padding:15px;font-size:12px;color:#6B7280;background:#F3F4F6;">
        © My<span style="color:#F59E0B;font-weight:600;">Uma</span> • Connecting you with top-rated local businesses
      </div>

    </div>
  </div>
  `,
};
      await transporter.sendMail(mailOptions);
    } catch (mailError) {
      console.log("User mail failed:", mailError.message);
    }
    // ====================================================

        res.status(201).json({message : "message Send Successfully", contact})

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const messageGetAll = async(req,res) => {
    try {

        const contact = await ContactUs.find().sort({ createdAt: -1 });

        if(!contact){
           return res.status(400).json({
                message : "contact Details not found"
            })
        };

        res.status(201).json({message : "contact Details find Successfully",
              count : contact.length,
            contact})

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const messageGetById = async(req,res) => {
    try {

        const contact = await ContactUs.findById(req.params.id)

        if(!contact){
           return res.status(400).json({
                message : "contact Detail not found"
            })
        };

        res.status(201).json({message : "contact Detail find Successfully",contact})

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const messageUpdate = async(req,res) => {
    try {

        const contact = await ContactUs.findByIdAndUpdate(req.params.id, req.body, {new : true})

        if(!contact){
           return res.status(400).json({
                message : "contact Detail not found"
            })
        };

        res.status(201).json({message : "contact Detail update Successfully",contact})

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

export const messageDelete = async(req,res) => {
    try {

        const contact = await ContactUs.findByIdAndDelete(req.params.id)

        if(!contact){
           return res.status(400).json({
                message : "contact Detail not found"
            })
        };

        res.status(201).json({message : "contact Detail Delete Successfully",contact})

    } catch (error) {
        res.status(500).json({message : error.message})
    }
}