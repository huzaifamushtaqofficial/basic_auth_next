import jwt from "jsonwebtoken";

/**
 * getDataToken - Extracts and verifies JWT from request
 * Supports both cookie and Authorization header
 *
 * @param {NextRequest} request
 * @returns {string|null} userId if token valid, otherwise null
 */
export const getDataToken = (request) => {
  try {
    // 1️⃣ Try cookie first
    let token = request.cookies.get("token")?.value;

    // 2️⃣ If cookie missing, check Authorization header
    if (!token) {
      const authHeader = request.headers.get("authorization");
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }

    // 3️⃣ If still no token, return null
    if (!token) return null;

    // 4️⃣ Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5️⃣ Return userId from token
    return decoded.userId || null;

  } catch (error) {
    console.log("Error in getDataToken:", error.message);
    return null; // never throw, just return null for consistency
  }
};
