require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const port = 3001;

// Replace these with your actual GitHub OAuth App credentials
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const GITHUB_REDIRECT_URI = "http://localhost:3001/api/github/callback";

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// Existing login route
app.post("/api/login", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });
  }

  const validEmails = ["test@example.com", "user@domain.com"];
  if (!validEmails.includes(email)) {
    return res.status(401).json({ success: false, message: "Invalid email" });
  }

  res.status(200).json({ success: true, message: "Login successful" });
});

// Initiate GitHub OAuth flow
app.get("/api/github/login", (req, res) => {
  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URI}&scope=user:email`;
  res.json({ url: githubAuthUrl });
});

// Handle GitHub OAuth callback
app.get("/api/github/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: GITHUB_REDIRECT_URI,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const accessToken = tokenResponse.data.access_token;

    // Get user data
    const userResponse = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const userData = userResponse.data;

    // Here you would typically create a session or JWT for the user
    // For this example, we'll just send the user data back to the client
    res.redirect(
      `http://localhost:3000/auth-success?user=${encodeURIComponent(
        JSON.stringify(userData)
      )}`
    );
  } catch (error) {
    console.error("Error during GitHub OAuth:", error);
    res.redirect("http://localhost:3000/auth-error");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
