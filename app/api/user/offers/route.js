import Offer from "@/models/Offer";

export async function GET() {
    const offers = await Offer.find({
        isActive: true,
        $or: [
            { startDate: { $lte: new Date() } },
            { startDate: null },
        ],
        $or: [
            { endDate: { $gte: new Date() } },
            { endDate: null },
        ],
    }).sort({ priority: -1 });

    return Response.json({ offers });
}