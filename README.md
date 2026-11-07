# SOUL AI — by Adinath

A responsive red-and-black personal-assistant website starter.

## Included
- Responsive laptop and mobile layout
- Animated red SOUL orb
- Chat interface with demo replies
- Browser voice input (where supported) and spoken replies
- No build tools required

## Deploy to Vercel (free hosting tier)
1. Create a GitHub repository named `soul-ai`.
2. Upload `index.html`, `style.css`, and `app.js` from this folder to the repository root.
3. Visit https://vercel.com and sign in with GitHub.
4. Select **Add New → Project**, import `soul-ai`, and deploy.
5. Vercel will give you a public website address.

## Important
This is the first working interface, not a connected AI service yet. It runs in demo mode. To make it answer with a real AI model, choose an AI provider and add its API key as a Vercel Environment Variable, then add a server-side API route. Never put a private API key in `app.js` or any public frontend file.

Voice input requires browser support and microphone permission. It normally works on HTTPS (Vercel provides HTTPS).
