How to add a review (for non-technical users)

You can add reviews to the PCS page using the same markdown method that powers the blog. Follow these steps (GitHub web UI):

1. Open the repository on GitHub and click "Add file" → "Create new file".
2. Name the file under `content/reviews/` using a short slug, e.g. `jane-doe-2026.md`.
3. Paste frontmatter and content like the example below:

---
title: "Amazing PCS support"
author: "Jane Doe"
rating: 5
date: 2026-05-01
---

Short paragraph with the review text.

4. Commit directly to `main` (or create a PR if you prefer review).

The site will automatically pick up new reviews on the PCS page once the file is present.

If you'd like a more user-friendly interface (create PRs automatically or a simple admin form), we can add a tiny admin UI or integrate with GitHub's API—ask and I can implement that next.
