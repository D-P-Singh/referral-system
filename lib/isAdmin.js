
import { getUser } from "@/lib/getUser";

export async function isAdmin() {

    const user = await getUser();

    if (!user || user.role !== "admin") {

        return null;
    }

    return user;
}
