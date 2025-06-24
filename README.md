# 🎓 TechEd Institute — Professional Training Website

A production-ready Next.js 15 application showcasing **11 professional training courses** (technology & management), complete with responsive design, email-enabled application/contact forms, SEO, analytics, Docker & more.

---
📍 Live Demo
You can view the live version of the project here:
🔗 Live Site – https://kzmoa2w5p80zn6snf41l.lite.vusercontent.net/


## ✨ Feature Overview
| Category            | Highlights                                                                                  |
|---------------------|----------------------------------------------------------------------------------------------|
| **Frontend**        | Next.js (App Router) • TypeScript • Tailwind CSS • shadcn/ui • Responsive Bootstrap Carousel |
| **Courses**         | 11 in-depth course pages with filtering, duration options & full syllabus modals             |
| **Forms**           | “Apply Now” & Contact forms → send email via Resend API                                      |
| **SEO / Analytics** | Open Graph meta, JSON-LD schema, Google Analytics placeholder                               |
| **DevOps**          | Dockerfile, `.env.example`, Vercel-ready deployment, rate-limited APIs                      |

---

## 🚀 Quick Start

\`\`\`bash
# 1 . Install deps
npm install

# 2 . Create env vars
cp .env.example .env.local
#  – add RESEND_API_KEY & GMAIL_USER (+ optional GA id)

# 3 . Run dev server
npm run dev
\`\`\`

---

## 🛠️ Environment Variables

| Variable                 | Purpose                         |
|--------------------------|---------------------------------|
| `RESEND_API_KEY`         | HTTPS mail sending (Resend)     |
| `GMAIL_USER`             | Destination inbox               |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics         |

---

## 📂 Project Structure (excerpt)

\`\`\`
app/
 ├─ api/
 │   ├─ apply/route.ts    # POST / apply
 │   └─ contact/route.ts  # POST / contact
 ├─ page.tsx              # Home (hero slider, previews)
 ├─ courses/page.tsx      # Course catalogue
components/
 ├─ hero-slider.tsx
 ├─ apply-now-modal.tsx
 └─ …
public/images/            # AI-generated hero & course images
\`\`\`

---

## 📦 Deployment

1. **Vercel**  
   • Push to GitHub → “New Project” → Environment Variables section → deploy.  
2. **Docker**  
   \`\`\`bash
   docker build -t teched .
   docker run -p 3000:3000 --env-file .env.local teched
   \`\`\`

---

## 📄 License

MIT © 2025 TechEd Institute
