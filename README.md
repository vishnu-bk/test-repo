# Run and deploy your AI Studio app

This contains everything you need to run your app locally or deploy it to Vercel.

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:  
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:  
   `npm run dev`

## Deploy to Vercel

1. Push your code to GitHub.
2. Import your repository in [Vercel Dashboard](https://vercel.com/dashboard).
3. **Set the environment variable**:  
   - Add `GEMINI_API_KEY` with your Gemini API key in Vercel's Project Settings → Environment Variables.
4. Vercel will automatically detect and run the build (`vite build`).
5. Your site will be live after deployment.
