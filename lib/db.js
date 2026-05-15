const mongoose = await import("mongoose");
export  async function connectDB() {
    const MONGO_URI =
        process.env.MONGO_URI;
    if (!MONGO_URI) {
        throw new Error(
            "Mongo URI Missing"
        );
    }
    try {
        await mongoose.connect(MONGO_URI, {
            dbName: "student-referral-system",
            bufferCommands: false,
        });
        console.log("MongoDB connected");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

   