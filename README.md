# Ostaz Jawdat — Deployment Guide
## United Pharmacy | Talent Management Department

This guide deploys Ostaz Jawdat to Netlify so the full team can access it from any browser — no Claude account needed, PDF upload works, and report download works reliably.

**Time required:** ~45 minutes  
**Cost:** ~$5–15/month (Anthropic API usage only — Netlify hosting is free)

---

## What you need before starting

1. A computer with internet access
2. An email address to create accounts
3. That's it

---

## Step 1 — Get your Anthropic API key (10 minutes)

1. Go to **console.anthropic.com**
2. Click **Sign Up** and create an account (use your work email)
3. Once logged in, click **API Keys** in the left sidebar
4. Click **Create Key**
5. Give it a name: `ostaz-jawdat`
6. Copy the key — it looks like `sk-ant-api03-...`
7. **Save it somewhere safe.** You will only see it once.

> Add a billing method in the Console under **Billing**. Start with a $20 credit — that covers roughly 3–4 months of team usage.

---

## Step 2 — Create a Netlify account (5 minutes)

1. Go to **netlify.com**
2. Click **Sign up** → choose **Sign up with Email**
3. Verify your email
4. You now have a free Netlify account

---

## Step 3 — Deploy the app (15 minutes)

### Option A — Deploy via Netlify Drop (easiest, no terminal needed)

1. Open this folder (`ostaz_jawdat_deploy`) on your computer
2. Go to **app.netlify.com**
3. Click **Add new site** → **Deploy manually**
4. Drag and drop the entire `ostaz_jawdat_deploy` folder onto the page
5. Wait ~2 minutes for it to build

> **Note:** Option A skips the build step. For a production-quality deploy, use Option B below.

### Option B — Deploy via GitHub (recommended)

1. Create a free account at **github.com**
2. Click **New repository** → name it `ostaz-jawdat` → click **Create**
3. Upload all files from this folder to the repository (drag and drop in the GitHub UI)
4. In Netlify: **Add new site** → **Import an existing project** → **GitHub**
5. Select your `ostaz-jawdat` repository
6. Build settings (Netlify usually auto-detects these):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
7. Click **Deploy site**

---

## Step 4 — Add your API key (5 minutes)

This is the most important step. Your API key must never be in the code — it lives only in Netlify's environment variables.

1. In Netlify, go to your site → **Site configuration** → **Environment variables**
2. Click **Add a variable**
3. Key: `ANTHROPIC_API_KEY`
4. Value: paste your API key from Step 1 (`sk-ant-api03-...`)
5. Click **Save**
6. Go to **Deploys** → click **Trigger deploy** → **Deploy site**

---

## Step 5 — Test it (5 minutes)

1. Netlify gives you a URL like `https://funny-name-123.netlify.app`
2. Open it in your browser
3. Try submitting an output — PDF upload and report download should both work
4. Share this URL with your team

---

## Step 6 — Set a custom URL (optional, 5 minutes)

If you want a cleaner URL like `upc-quality.netlify.app`:

1. In Netlify → **Site configuration** → **Domain management**
2. Click **Options** → **Edit site name**
3. Type: `upc-quality` (or any name you prefer)
4. Your URL becomes `https://upc-quality.netlify.app`

---

## Updating the app

When Ostaz Jawdat gets a new version:

1. Replace `src/App.jsx` with the new `.jsx` file
2. If using GitHub: push the change — Netlify redeploys automatically
3. If using Netlify Drop: drag and drop the folder again

The URL stays the same. Your team doesn't need to do anything.

---

## Cost breakdown

| Item | Cost |
|---|---|
| Netlify hosting | Free |
| Anthropic API (est. 200 reviews/month) | ~$8–12/month |
| Anthropic API (est. 500 reviews/month) | ~$20–30/month |

You can set a usage limit in the Anthropic Console under **Billing → Usage limits** to avoid surprises.

---

## Troubleshooting

**"API key not configured" error**  
→ Check Step 4. Make sure the variable is named exactly `ANTHROPIC_API_KEY` and you triggered a redeploy after saving.

**Build fails on Netlify**  
→ Make sure all files are uploaded including `package.json`, `vite.config.js`, and `netlify.toml`.

**PDF upload still not working**  
→ Clear your browser cache and try again. If the issue persists, check the browser console for errors and share with your developer.

**Arabic text appears as boxes**  
→ This is a font issue in older browsers. Chrome and Safari both handle Arabic correctly.

---

## File structure reference

```
ostaz_jawdat_deploy/
├── index.html                  # App entry point
├── package.json                # Dependencies
├── vite.config.js              # Build config
├── netlify.toml                # Netlify settings
├── src/
│   ├── main.jsx                # React bootstrap
│   └── App.jsx                 # Ostaz Jawdat (main app)
├── netlify/
│   └── functions/
│       └── proxy.js            # API proxy (holds your key)
└── public/
    └── favicon.svg             # Browser tab icon
```

---

*United Pharmacy | Talent Management Department | For internal use only*
