import enterpriseExchange from "../assets/enterprise_exchange.png";
import hotelBooking from "../assets/Hotel2.png";
import urlShortener from "../assets/urlShortner.png";

// `image: null` renders a generated cover instead of a screenshot.
export const projects = [
  {
    title: "GoViShi — Enterprise Exchange",
    kind: "AI · Marketplace",
    image: enterpriseExchange,
    description:
      "Scrapes solutions from marketplaces, recommends the best fit for a user's requirement and guides them through building the product. Presented in a funding round.",
    stack: ["Next.js", "Node.js", "Supabase", "LangChain"],
    github: "https://github.com/Adarsh9-dev/Enterprise_Exchaange",
    live: "https://enterprise-exchaange.vercel.app/",
    featured: true,
  },
  {
    title: "Caption Generator",
    kind: "AI · Video",
    image: null,
    description:
      "Extracts audio with FFmpeg, transcribes it with Deepgram and burns the text back onto the video as captions.",
    stack: ["React", "Node.js", "Deepgram", "FFmpeg"],
    github: "https://github.com/Adarsh9-dev",
    live: "https://caption-generator.vercel.app",
  },
  {
    title: "Looking — Hotel Booking",
    kind: "Full Stack · Payments",
    image: hotelBooking,
    description:
      "Search hotels, pick rooms, pay with Stripe and get SMS confirmations through Twilio. Multiple APIs power the data layer.",
    stack: ["React", "Node.js", "MongoDB", "Stripe", "Twilio"],
    github: "https://github.com/Adarsh9-dev/Looking",
    live: "https://lookingcom.netlify.app",
  },
  {
    title: "URL Shortener",
    kind: "Backend · Caching",
    image: urlShortener,
    description: "Long-to-short URL API built with nanoid, with Redis caching in front of MongoDB.",
    stack: ["React", "Node.js", "MongoDB", "Redis"],
    github: "https://github.com/Adarsh9-dev/URL_Shortner",
    live: "https://urlconvertor.netlify.app",
  },
  {
    title: "Book Management API",
    kind: "Backend · REST",
    image: null,
    description: "User auth with JWT, CRUD for books and reviews, and cover images stored on AWS S3.",
    stack: ["Node.js", "MongoDB", "JWT", "AWS S3"],
    github: "https://github.com/Adarsh9-dev/Book_management",
    live: null,
  },
];
