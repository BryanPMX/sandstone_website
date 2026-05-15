How to add a review

## Locally (dev)
On your local machine, reviews are added via the admin form at `http://localhost:3000/admin/reviews` and committed directly to GitHub using a bot token.

## Production (Vercel) Setup

The reviews system commits files to the GitHub repo via the API. To enable this:

### 1. Create a Personal Access Token (PAT) or use a bot account

- Go to GitHub → Settings → Developer settings → Personal access tokens
- Create a new token with `repo` scope (full control of private/public repos)
- Copy the token → set as `GITHUB_BOT_TOKEN` in Vercel environment variables

### 2. Add environment variables to Vercel

Go to Vercel project settings → Environment Variables and add:

```
GITHUB_BOT_TOKEN=ghp_xxxxx (your PAT or bot token)
GITHUB_OWNER=sandstone-group
GITHUB_REPO=sandstone_website
GITHUB_BRANCH=main
```

### 3. Use the admin form

Visit `sandstone.homes/admin` and log in with GitHub (OAuth), then navigate to **Reviews** and submit. 

The review will be committed to `content/reviews/` and automatically appear on `/pcs` after the next build/redeploy.

### Alternative: Bypass GitHub and edit directly in the repo

You can always add reviews manually by creating files in `content/reviews/` on GitHub:

1. Create a new file: `content/reviews/my-review-slug.md`
2. Use frontmatter like:

```
---
title: "Great experience"
author: "Your Name"
rating: 5
date: 2026-05-15
---

Your review text here.
```

3. Commit to main branch → Vercel redeploys automatically
