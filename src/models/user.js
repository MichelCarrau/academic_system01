import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        trim: true //Sirve para quitar los espacios de más

    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,

    },
    
    password: {
        type: String,
        required: true,

    },
    

}, {
    timestamps: true
});

export default mongoose.model('User', userSchema); //El nombre del modelo es User y el esquema es userSchema