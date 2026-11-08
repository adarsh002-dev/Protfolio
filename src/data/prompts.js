/*
 * ─────────────────────────────────────────────────────────────
 *  PROMPT LIBRARY — one entry per Instagram reel
 * ─────────────────────────────────────────────────────────────
 *  To publish a new guide:
 *    1. Copy the template entry below and paste it at the TOP of the list.
 *    2. Give it a unique `slug` — this becomes the shareable link:
 *         https://<your-site>/prompts/<slug>
 *    3. Fill in the fields, set `draft: false`, commit & push.
 *
 *  Field guide
 *    slug       url-safe id, lowercase-with-dashes (required, unique)
 *    title      headline shown on the card & page
 *    summary    1–2 sentences — also used for link previews
 *    reel       full Instagram reel URL (embedded on the page) or ""
 *    cover      reel cover image in /public/covers, e.g. "/covers/my-slug.jpg"
 *               (shown on cards, and used as the WhatsApp/Instagram link preview)
 *    date       "YYYY-MM-DD" — newest shows first
 *    category   one short word/phrase used for filters, e.g. "Web App"
 *    level      "Beginner" | "Intermediate" | "Advanced"
 *    time       rough build time, e.g. "20 min"
 *    tags       extra keywords for search
 *    tools      [{ name, url, note }] — what people need
 *    prompts    [{ label, text }]    — every prompt gets a Copy button
 *    steps      [{ title, body, code, lang, image, imageAlt, note }] — the build guide
 *               `body` supports **bold**, `inline code` and [links](https://…)
 *               separate paragraphs with a blank line ("\n\n")
 *               `image` is a screenshot in /public/guides, e.g. "/guides/shot.jpg"
 *               `note` shows a highlighted "heads up" box under the step
 *    tips       ["…"]                  — pro tips
 *    fixes      [{ problem, fix }]     — "Something went wrong?" troubleshooting
 *    resources  [{ label, url }]       — further links
 *    draft      true hides the entry on the live site (still visible on localhost)
 *
 *  Keep this file free of `import` statements — the build script reads it
 *  to generate link previews for every guide.
 */

export const prompts = [
  // ───────────── Ek Prompt Mein #01 ─────────────
  {
    slug: "diwali-website",
    title: "Diwali greeting website with your friend's name",
    summary:
      "Glowing diyas, your friend's name in gold, and fireworks on every tap — one prompt in Claude, a free Netlify link, sent on WhatsApp.",
    // After posting the reel, paste its link here, e.g. "https://www.instagram.com/reel/XXXXXXXX/"
    reel: "",
    cover: "/covers/diwali-website.jpg",
    series: "Ek Prompt Mein #01",
    date: "2026-11-08",
    category: "Web App",
    level: "Beginner",
    time: "10 min",
    tags: ["diwali", "greeting", "whatsapp", "netlify", "claude", "html", "fireworks", "festival"],
    tools: [
      { name: "Claude", url: "https://claude.ai", note: "Writes the whole website from one prompt" },
      { name: "Netlify (free account)", url: "https://app.netlify.com/drop", note: "Free hosting — no credit card needed" },
      { name: "A laptop or computer", url: "", note: "Needed for the drag-and-drop step" },
      { name: "WhatsApp", url: "", note: "To send your friend their personal link" },
    ],
    prompts: [
      {
        label: "The prompt — paste this into Claude",
        text: `Build a single-file HTML Diwali greeting page. Mobile-first, looks premium.
- Dark background with animated glowing diyas and slow-floating gold particles.
- Sender and receiver names come from the URL (?from=Adarsh&to=Rahul) and appear in elegant gold text: "Happy Diwali, [to]" and "— [from]". If no names are given, show "Happy Diwali" and open the form.
- Tapping the screen launches a colourful firework animation and plays a soft bell sound made with the Web Audio API (no audio files).
- A "Make your own" button opens a small form (your name, friend's name) that creates the new link and has "Copy link" and "Share on WhatsApp" buttons.
- No backend, no external files, runs by opening the file.`,
      },
      {
        label: "Optional follow-up — make it yours",
        text: `Update the page: add "Shubh Deepavali" in Hindi (शुभ दीपावली) above the greeting, add a slowly rotating rangoli behind the names, and make the fireworks bigger on the first tap. Return the complete updated file.`,
      },
    ],
    steps: [
      {
        title: "Paste the prompt into Claude",
        body:
          "Tap **Copy** on the prompt above. Open [claude.ai](https://claude.ai) (free account is fine), start a **new chat**, paste the prompt and send it.\n\nWait about a minute. Claude shows a **preview** of your Diwali page next to the chat — tap it to see the fireworks.",
        note: "Do steps 2–4 on a laptop or computer. Dragging a folder into Netlify doesn't work on a phone.",
      },
      {
        title: "Download the file and put it in a folder",
        body:
          "In the preview, click **Download** at the top of the preview (if you don't see it, open the **⋯** menu there) to save the file.\n\nNow do two small things:\n\n**1.** Rename the downloaded file to exactly `index.html` (all small letters).\n\n**2.** Make a new folder on your Desktop called `happy-diwali` and move the file inside it.",
        note: "The name must be exactly index.html — otherwise your link shows “Page not found”.",
      },
      {
        title: "Drag the folder into Netlify Drop",
        body:
          "Open [app.netlify.com/drop](https://app.netlify.com/drop). Drag the whole **happy-diwali folder** from your Desktop and drop it on the box in the middle of the page.\n\nIn a few seconds you'll see **“Voilà, your project is live”** with your new link, like `https://startling-clafoutis-e2ea49.netlify.app`.",
      },
      {
        title: "Claim the site — don't skip this!",
        body:
          "Right now your site is **locked with a password** (`My-Drop-Site`) and will be **deleted in 1 hour**. If you send the link now, your friends will see a password box instead of your greeting.\n\nClick **Claim this site** and sign up for Netlify — you can use Google, GitHub or email. It's **free and needs no credit card**.\n\nOnce claimed, the password is removed and your link works forever.",
        image: "/guides/netlify-claim-site.jpg",
        imageAlt: "Netlify Drop screen showing “Voilà, your project is live” and the Claim this site button with a 1-hour timer",
        note: "Check it worked: open your link in a private / incognito window. If the Diwali page opens without asking for a password, you're done.",
      },
      {
        title: "Send it to your friend on WhatsApp",
        body:
          "Open your link, tap **Make your own**, type your name and your friend's name, then tap **Share on WhatsApp**. Pick your friend — done! 🪔\n\nYour friend can tap **Make your own** too and send their own version to someone else.",
      },
    ],
    tips: [
      "Want a nicer link? In Netlify open your site → **Site configuration → Change site name**, e.g. `happy-diwali-adarsh.netlify.app`. Your old link stops working, so rename before you share.",
      "Want to change the design? Use the optional follow-up prompt, download the new file, rename it to `index.html` again, and in Netlify open your site → **Deploys** → drag the folder there. Your link stays the same.",
      "Whoever you send it to can make their own link from yours — that's how it spreads.",
    ],
    fixes: [
      {
        problem: "My friend sees a password box",
        fix: "You haven't claimed the site yet. Go back to the Netlify Drop page and click **Claim this site** (step 4). If the hour has already passed, drag the folder into Netlify Drop again and claim it straight away.",
      },
      {
        problem: "The link says “Page not found”",
        fix: "The file isn't named `index.html`. Rename it, then drag the folder into Netlify Drop again.",
      },
      {
        problem: "The link stopped working after a while",
        fix: "The site wasn't claimed, so Netlify deleted it after 1 hour. Repeat steps 3 and 4 — this time claim it.",
      },
      {
        problem: "No bell sound",
        fix: "Tap the screen once — phones only allow sound after a tap. On iPhone, also turn off **silent mode** (the switch on the side).",
      },
      {
        problem: "Names don't show, or show strange symbols",
        fix: "Don't type names into the link by hand. Open your link, tap **Make your own**, fill in both names and share from there.",
      },
      {
        problem: "Claude gave code but no preview / no download button",
        fix: "Reply to Claude: **“Give me this as a single HTML file I can download.”** Then continue from step 2.",
      },
    ],
    resources: [
      { label: "Claude", url: "https://claude.ai" },
      { label: "Netlify Drop", url: "https://app.netlify.com/drop" },
      { label: "Change your Netlify site name", url: "https://docs.netlify.com/site-deploys/manage-deploys/#change-site-name" },
    ],
    draft: false,
  },

  // ───────────── TEMPLATE / EXAMPLE (draft — only visible on localhost) ─────────────
  {
    slug: "portfolio-website-with-one-prompt",
    title: "Build a portfolio website with one AI prompt",
    summary:
      "Turn your resume into a fast, animated personal website using a single structured prompt — then deploy it for free in minutes.",
    reel: "",
    date: "2026-11-08",
    category: "Web App",
    level: "Beginner",
    time: "30 min",
    tags: ["portfolio", "react", "netlify", "claude", "chatgpt"],
    tools: [
      { name: "Claude or ChatGPT", url: "https://claude.ai", note: "Writes the code from the prompt" },
      { name: "Node.js 18+", url: "https://nodejs.org", note: "Runs the project locally" },
      { name: "Netlify", url: "https://www.netlify.com", note: "Free hosting with a public link" },
    ],
    prompts: [
      {
        label: "Main prompt",
        text: `You are a senior frontend engineer and designer.

Build a single-page personal portfolio website using React + Vite and plain CSS.

About me:
- Name: [YOUR NAME]
- Role: [YOUR ROLE]
- Skills: [SKILL 1, SKILL 2, SKILL 3]
- Projects: [PROJECT NAME — one-line description — link]
- Contact: [EMAIL], [GITHUB], [LINKEDIN]

Requirements:
1. Sections: Hero, About, Skills, Projects, Contact.
2. Dark theme, one accent colour, large bold typography.
3. Subtle scroll-reveal animations; respect prefers-reduced-motion.
4. Fully responsive down to 360px wide.
5. Keep all my content in one data file so I can edit it later.

Return the full folder structure, then every file in full.`,
      },
      {
        label: "Follow-up: polish",
        text: `Now improve the design: add a cursor-following glow on the hero, hover states on project cards, and a sticky navbar that highlights the active section. Only return the files you changed.`,
      },
    ],
    steps: [
      {
        title: "Fill in the prompt",
        body:
          "Copy the **main prompt** above and replace every `[PLACEHOLDER]` with your real details. The more specific you are about your projects, the better the result.",
      },
      {
        title: "Create the project",
        body: "Open a terminal and scaffold an empty React app:",
        code: "npm create vite@latest my-portfolio -- --template react\ncd my-portfolio\nnpm install",
        lang: "bash",
      },
      {
        title: "Paste the AI's code",
        body:
          "Send the prompt to the AI. For every file it returns, create the same file path inside `my-portfolio` and paste the code in.\n\nIf the answer gets cut off, reply with **continue**.",
      },
      {
        title: "Run it locally",
        body: "Start the dev server and open the link it prints:",
        code: "npm run dev",
        lang: "bash",
      },
      {
        title: "Deploy for free",
        body:
          "Build the site, then drag the `dist` folder onto [Netlify Drop](https://app.netlify.com/drop). You get a public link instantly.",
        code: "npm run build",
        lang: "bash",
      },
    ],
    tips: [
      "Ask for one data file for your content — editing later becomes a two-minute job.",
      "If something breaks, paste the exact error message back to the AI instead of describing it.",
      "Use the follow-up prompt only after the first version runs.",
    ],
    resources: [
      { label: "Vite docs", url: "https://vite.dev/guide/" },
      { label: "Netlify Drop", url: "https://app.netlify.com/drop" },
    ],
    draft: true,
  },
];
