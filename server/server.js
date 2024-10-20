const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

// Enable CORS and parse JSON bodies
app.use(
  cors({
    origin: "http://localhost:3000", // Ensure this matches your frontend URL
    methods: ["POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json()); // Built-in middleware for JSON parsing

app.post("/api/login", (req, res) => {
  console.log("Received request body:", req.body); // Log the request body to check if data is coming through

  const { email } = req.body;

  // Basic validation check
  if (!email) {
    console.log("Email is missing");
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  console.log("Received email:", email);

  // Simulate email verification
  const validEmails = ["test@example.com", "user@domain.com"];
  if (!validEmails.includes(email)) {
    console.log("Invalid email:", email);
    return res.status(401).json({ success: false, message: "Invalid email" });
  }

  // Respond with success message if email is valid
  res.status(200).json({ success: true, message: "Login successful" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
