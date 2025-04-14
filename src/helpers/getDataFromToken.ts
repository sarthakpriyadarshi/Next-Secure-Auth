import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || '';
        interface DecodedToken {
            id: string;
            [key: string]: unknown; // Add additional fields if necessary
        }
        const decodedToken: DecodedToken = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
        return decodedToken.id
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }

}