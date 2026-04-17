import mongoose from "mongoose";

const newListingSchema = new mongoose.Schema(
  {

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    
    title: String,
    address: String,
    phone: String,

    images: [String],

    
      twitter: String,
      facebook: String,
      linkedin: String,
      youtube: String,
      instagram: String,
      whatsappNo: String,
    

     items : [
      {
        name:
        {
            type : String,  
        },
        price:  
        {
            type : Number,  
        }
      }
     ]  

  },
  {
     timestamps: true,
     collection: "newlisting"
    }
);

const newListing = mongoose.model("newListing", newListingSchema);
export default newListing;