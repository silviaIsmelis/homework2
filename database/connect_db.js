import mongoose from "mongoose";



try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("BD conectada satisfactoriamente...");
} catch (error) {
    console.log("Error de conexion a MongoDB..." + error);
}



