import { getUser } from "@/lib/getUser";
import {connectDB} from "@/lib/db";
import Transaction from "@/models/Transactions";

export async function GET() {
    try {
        await connectDB();
  
        // 🔐 verify token safely
        const userData = await getUser();

        // 📌 fetch transactions
        const transactions = await Transaction.find({
            user: userData.id,
        }).sort({ createdAt: -1 });

        return Response.json({
            success: true,
            transactions,
        });

    } catch (error) {
        return Response.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}