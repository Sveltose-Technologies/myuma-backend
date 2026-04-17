import mongoose from "mongoose";

const homeBannerSchema = new mongoose.Schema({

    bannerImage : {
        type : String,
        required : true
    },

    tag : {
        type : String,   
    },
    
    title : {
        type : String
    },

    contant : {
        type : String,
    },  

},
{
    timestamps : true,
    collection : "homeBanner"
});

const HomeBanner = mongoose.model("HomeBanner", homeBannerSchema);

export default HomeBanner;