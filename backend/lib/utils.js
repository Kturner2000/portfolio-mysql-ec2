const jwt = require("jsonwebtoken");

async function generateToken(userId, res) {
    //sign({payload}, secret key, options)
    try {
        token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
      } catch (err) {
        console.error("Error generating JWT:", err.message);
        throw new Error("Could not generate token");
      }

    //By setting this cookie, you enable the client
    //  (e.g., a web browser) to store it and send it back with subsequent requests.
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // max age in ms.
        httpOnly: true, //prevents XSS attacks.
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks.
        secure: process.env.NODE_ENV !== "development",
    });

    return token;
}

module.exports = generateToken;