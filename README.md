# Adarsh Priyadarshi - Professional Portfolio

A modern, responsive portfolio website showcasing my skills, experience, and projects as a Full Stack Developer.

## 🚀 Live Demo

[View Live Portfolio](https://adarshportfolio.netlify.app)

## 👨‍💻 About Me

I'm **Adarsh Priyadarshi**, a passionate Full Stack Developer with 3+ years of experience in MERN Stack development. Currently working at **Indian App Guy** as a Full Stack Developer, I specialize in creating innovative solutions using modern web technologies.

### 🏆 Achievements
- **National Merit-cum-Means Scholarship (NMMS)** recipient
- **First Employee** at Indian App Guy
- **Team Leader** experience in hiring and developing teams
- **3+ years** of professional experience in MERN Stack

## 💼 Experience

### Full Stack Developer | Indian App Guy (Aug 2023 - Present)
- Developed AI-powered applications and Chrome extensions
- Built scalable web applications using MERN Stack
- Implemented SEO techniques and solved complex bugs
- Led team development and hiring processes

### Core Member | Glucian (Aug 2021 - Mar 2023)
- Created professional designs and presentations
- Worked on business development and software development
- Provided teaching assistance and technical support

## 🎓 Education

- **Bachelor of Science in Computer Science** - Dhenkanal Autonomous College, Utkal University (2020-2023) - CGPA: 7.78/10
- **Higher Secondary Education** - R.P Residential Higher Secondary School (2018-2020) - 70.5%
- **Secondary Education** - K.P.P BidyaPitha (2016-2018) - 80%

## 🛠️ Technical Skills

- **Frontend:** HTML, CSS, JavaScript, React, NextJS
- **Backend:** NodeJS, ExpressJS
- **Database:** MongoDB
- **Programming:** C++, C
- **Tools:** Git, AWS
- **AI/ML:** Deepgram AI, LangChain

## 🚀 Featured Projects

### 1. Enterprise Exchange (Govish)
- **Tech Stack:** NextJS, NodeJS, Supabase, LangChain
- **Features:** Market place solution scraping and recommendation system
- [Live Demo](https://enterprise-exchange.vercel.app)

### 2. Caption Generator
- **Tech Stack:** React, Node, Deepgram AI, Ffmpeg
- **Features:** Video caption generation with audio extraction and text conversion
- [Live Demo](https://caption-generator.vercel.app)

### 3. Hotel Booking Application
- **Tech Stack:** React, NodeJS, MongoDB, Stripe, Twilio
- **Features:** Complete booking system with payment gateway and messaging
- [Live Demo](https://lookingcom.netlify.app)

### 4. URL Shortener
- **Tech Stack:** React, NodeJS, MongoDB, Redis
- **Features:** URL shortening with caching and analytics
- [Live Demo](https://urlconvertor.netlify.app)

## ⚡ Prompt Library — publishing a reel guide

Every Instagram reel gets its own shareable guide page at `/prompts/<slug>`.

1. Open `src/data/prompts.js` and copy the template entry to the top of the list.
2. Set a unique `slug`, fill in the title, summary, reel URL, prompts, steps and tips.
3. Set `draft: false`, then commit and push. Netlify rebuilds and the link is live:
   `https://<your-site>/prompts/<slug>`

Drafts (`draft: true`) show up on `localhost` only, so you can preview before publishing.
`npm run build` also generates per-guide link previews (title + summary) for WhatsApp, Instagram DMs, LinkedIn, etc.

## 🗂️ Editing content

| What | File |
| --- | --- |
| Name, bio, socials, resume links, stats | `src/data/profile.js` |
| Experience & education | `src/data/career.js` |
| Skills & marquee | `src/data/skills.js` |
| Projects | `src/data/projects.js` |
| Prompt guides | `src/data/prompts.js` |
| Design tokens (colours, fonts) | top of `src/styles.css` |

## 🛠️ Technologies Used

- **Frontend:** React 18, React Router, Framer Motion, CSS
- **Email Service:** EmailJS
- **Icons:** BoxIcons
- **Deployment:** Netlify (`public/_redirects` enables shareable deep links)

## 📱 Contact Information

- **Email:** adarshpriyadarshi001@gmail.com
- **Phone:** +91 7815002053
- **LinkedIn:** [linkedin.com/in/adarshpriyadarshi](https://www.linkedin.com/in/adarshpriyadarshi)
- **GitHub:** [github.com/Adarsh9-dev](https://github.com/Adarsh9-dev)
- **Portfolio:** [adarshportfolio.netlify.app](https://adarshportfolio.netlify.app)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/Adarsh9-dev/portfolio.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
src/
├── components/   # Layout (nav, ⌘K palette, footer), PromptCard, UI primitives
├── data/         # All site content — edit these files
├── lib/          # Hooks and prompt helpers
├── pages/        # Home, Prompts, PromptDetail, NotFound
├── assets/       # Images
└── styles.css    # Design system + all styles
scripts/
└── prerender-meta.mjs  # Post-build link previews for prompt guides
```

## 🤝 Contributing

Feel free to fork this project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Adarsh Priyadarshi**
