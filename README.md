# japanese International — Full-Stack Website

> Premier Japanese Language Institute Website — Industry-level React application built with Vite + Tailwind CSS + React Router.

---
## 
<img width="1846" height="979" alt="image" src="https://github.com/user-attachments/assets/b319cfa8-54a3-466d-b7a0-c79310e5c330" />
<img width="1854" height="980" alt="image" src="https://github.com/user-attachments/assets/6352d487-ec58-40d7-af72-005f030ff533" />
<img width="1853" height="977" alt="image" src="https://github.com/user-attachments/assets/70a932d7-0cd6-46e8-80fd-a537d0703a9a" />
<img width="1854" height="981" alt="image" src="https://github.com/user-attachments/assets/54337f13-c84c-48d7-9e39-93b987848315" />
<img width="1003" height="974" alt="image" src="https://github.com/user-attachments/assets/be0bdd01-ef0f-45ca-945a-75d3905077e1" />
<img width="1120" height="970" alt="image" src="https://github.com/user-attachments/assets/47245e17-846f-4c86-938f-7383fe53e952" />
<img width="1852" height="963" alt="image" src="https://github.com/user-attachments/assets/9496e0ba-3c03-4f4a-ba33-8e8f31fdf74f" />
<img width="1859" height="982" alt="image" src="https://github.com/user-attachments/assets/b67eb61f-8f49-4a53-a2c1-0d182949d427" />

##  Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open browser
http://localhost:5173
```

---

##  Demo Login Credentials

| Role    | Email                          | Password    |
|---------|-------------------------------|-------------|
| Admin   | admin@japanese.international    | admin123    |
| Student | tanaka@japanese.international   | student123  |

---

## 📁 Project Structure

```
japanese-international/
├── index.html                        # HTML entry point (Google Fonts loaded here)
├── vite.config.js                    # Vite bundler config
├── tailwind.config.js                # Tailwind theme (colors, fonts, shadows)
├── postcss.config.js
├── package.json
│
└── src/
    ├── main.jsx                      # React DOM mount
    ├── App.jsx                       # Router + route definitions
    ├── index.css                     # Global styles + Tailwind directives
    │
    ├── context/
    │   └── AuthContext.jsx           # Auth state (login, logout, user session)
    │
    ├── utils/
    │   └── mockData.js               # All mock data (students, videos, questions, etc.)
    │
    ├── components/
    │   └── layout/
    │       ├── Navbar.jsx            # Public navigation bar (sticky + mobile menu)
    │       ├── Footer.jsx            # Public footer with links
    │       ├── PublicLayout.jsx      # Wraps public pages (Navbar + Footer)
    │       ├── AdminLayout.jsx       # Admin sidebar + top bar shell
    │       └── StudentLayout.jsx     # Student sidebar + profile card shell
    │
    └── pages/
        ├── public/
        │   ├── HomePage.jsx          # Hero, courses, process overview, testimonials, CTA
        │   ├── AboutPage.jsx         # Mission, history timeline, team, values
        │   ├── ContactPage.jsx       # Contact form, office info, WhatsApp CTA
        │   ├── VacanciesPage.jsx     # Live vacancy listings, interview tips, documents
        │   ├── ExamDatesPage.jsx     # JLPT / CELI / JPT exam dates table
        │   ├── ProcessPage.jsx       # Full 8-step enrollment process + FAQ
        │   ├── ClassDatesPage.jsx    # Intake batches, class schedule, durations
        │   └── FAQPage.jsx           # Searchable FAQ with category filters
        │
        ├── auth/
        │   └── LoginPage.jsx         # Role-based login (Student / Admin)
        │
        ├── admin/
        │   ├── AdminDashboard.jsx    # Stats, enrollment chart, level distribution
        │   ├── AdminStudents.jsx     # Full CRUD student management + modal
        │   ├── AdminContent.jsx      # Videos, PDFs, class links, updates, question bank
        │   ├── AdminSchedule.jsx     # Calendar events, class/exam/holiday management
        │   ├── AdminNotifications.jsx # Broadcast notifications to all students
        │   └── AdminVacancies.jsx    # Vacancy CRUD from partner companies
        │
        └── student/
            ├── StudentDashboard.jsx  # Progress chart, quick links, upcoming events
            ├── VideoLessons.jsx      # Searchable video grid with player modal
            ├── Downloads.jsx         # PDF download center with level filters
            ├── MCQTests.jsx          # Interactive MCQ test with scoring
            └── NotificationsPage.jsx # Read/delete notifications
```

---

## 🎨 Design System

| Token            | Value                                    |
|-----------------|------------------------------------------|
| Primary          | Red `#dc2626` (JLPT exam card red)       |
| Background       | `#0d1117` deep ink                       |
| Surface          | `#1a2030` ink-900                        |
| Gold accent      | `#c9a84c` for decorative use             |
| Display Font     | Playfair Display (serif)                 |
| Body Font        | DM Sans (sans-serif)                     |
| Mono Font        | JetBrains Mono                           |
| Japanese Font    | Noto Serif JP                            |

---

## 🗺 Route Map

```
/                     → Public Home
/about                → About page
/contact              → Contact form
/vacancies            → Job vacancies
/exam-dates           → JLPT/CELI exam dates
/process              → Enrollment process steps
/class-dates          → Class start dates & batches
/faq                  → FAQ

/login                → Role-based login

/admin                → Admin Dashboard
/admin/students       → Student management
/admin/content        → Content management
/admin/schedule       → Calendar & schedule
/admin/notifications  → Broadcast notifications
/admin/vacancies      → Vacancy management

/student              → Student Dashboard
/student/lessons      → Video lessons
/student/downloads    → PDF downloads
/student/tests        → MCQ Tests
/student/notifications → Notifications
```

---

## 🛠 Tech Stack

| Layer            | Technology                      |
|-----------------|----------------------------------|
| Frontend         | React 18 + Vite                  |
| Routing          | React Router v6                  |
| Styling          | Tailwind CSS v3                  |
| Charts           | Recharts                         |
| Icons            | Lucide React                     |
| State            | React Context API                |
| Animations       | Pure CSS (keyframes)             |
| Fonts            | Google Fonts (Playfair, DM Sans) |

---

## 📌 Notes

- All data is mock/in-memory (no backend required to run)
- Auth sessions persist in `sessionStorage` within browser tab
- To connect a real backend, replace `mockData.js` and `AuthContext` login function with API calls
- The project structure is designed for easy backend integration (REST or Supabase)
