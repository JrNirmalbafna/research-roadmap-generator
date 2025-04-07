const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

// In-memory user storage (replace with a database in production)
const users = [];

const GITHUB_CLIENT_ID = 'Ov23liKobjaQsOxHAMYv';
const GITHUB_CLIENT_SECRET = '8ec9a1ee4b94c8a31fd38c4a47a8ca0303587076';

// Google OAuth credentials
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
const GOOGLE_CLIENT_SECRET = 'YOUR_GOOGLE_CLIENT_SECRET';
const GOOGLE_REDIRECT_URI = 'https://localhost:3005/auth/google/callback';

// Frontend URL
const FRONTEND_URL = 'https://localhost:3005';

// Google OAuth routes
app.get('/auth/google', (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      code,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: 'authorization_code',
    });

    const accessToken = tokenResponse.data.access_token;

    // Get user data
    const userResponse = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Redirect to frontend with user data
    res.redirect(`${FRONTEND_URL}/dashboard?google_user=${encodeURIComponent(JSON.stringify(userResponse.data))}`);
  } catch (error) {
    console.error('Google OAuth Error:', error);
    res.redirect(`${FRONTEND_URL}/signin?error=google_auth_failed`);
  }
});

// GitHub OAuth routes
app.get('/auth/github', (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${FRONTEND_URL}/auth/github/callback`;
  res.redirect(url);
});

app.get('/auth/github/callback', async (req, res) => {
  const { code } = req.query;

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code,
    }, {
      headers: {
        Accept: 'application/json',
      },
    });

    const accessToken = tokenResponse.data.access_token;

    // Get user data
    const userResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // Redirect to frontend with user data
    res.redirect(`${FRONTEND_URL}/dashboard?github_user=${encodeURIComponent(JSON.stringify(userResponse.data))}`);
  } catch (error) {
    console.error('GitHub OAuth Error:', error);
    res.redirect(`${FRONTEND_URL}/signin?error=github_auth_failed`);
  }
});

// Signup endpoint
app.post('/signup', async (req, res) => {
  try {
    const { fullName, email, password, researchField, institution } = req.body;

    // Check if user already exists
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: users.length + 1,
      fullName,
      email,
      password: hashedPassword,
      researchField,
      institution,
      createdAt: new Date()
    };

    // Save user (in memory for now)
    users.push(newUser);

    // Return success without password
    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Failed to create account' });
  }
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 