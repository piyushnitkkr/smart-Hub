# Smart Study Hub

A free, open platform for **NIT Kurukshetra** students to share and access study materials — notes, question papers, and resources, organized by branch and year.

🔗 **Live**: [smart-hub-zrd3.vercel.app](https://smart-hub-zrd3.vercel.app)

---

## Features

- **Browse & Search** — Filter resources by branch, year, or keyword with instant debounced results
- **Upload Resources** — Share any file via a public URL (Google Drive, OneDrive, etc.)
- **Live Chat** — Real-time messaging with all users on the site, powered by Socket.IO
- **Responsive UI** — Works on mobile and desktop with a glassmorphism dark theme
- **Skeleton Loading** — Smooth shimmer placeholders while data loads
- **404 Handling** — Clean not-found page for invalid routes

---

## Tech Stack

| Layer      | Technology                              |
|------------|-----------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS, shadcn/ui |
| Backend    | Node.js, Express.js                     |
| Database   | MongoDB (Mongoose)                      |
| Real-time  | Socket.IO                               |
| Deployment | Vercel (frontend) · Render (backend)    |

---

## Project Structure

```
Project/
├── Backend/
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── control/
│   │   ├── chatController.js   # Socket.IO chat logic
│   │   └── resourceController.js
│   ├── models/
│   │   ├── Message.js
│   │   └── Resource.js
│   ├── server.js               # Express + Socket.IO entry
│   └── .env                    # Environment variables
│
└── smartHub/                   # React frontend (Vite)
    ├── public/
    │   ├── download.png        # Logo
    │   └── Smart.png           # Favicon
    ├── src/
    │   ├── components/
    │   │   ├── ui/             # shadcn/ui primitives
    │   │   ├── Header.jsx      # Sticky header with search & filters
    │   │   ├── Footer.jsx
    │   │   ├── LiveChat.jsx    # Socket.IO chat widget
    │   │   └── StudyMaterialCard.jsx
    │   ├── pages/
    │   │   ├── HomePage.jsx
    │   │   ├── BrowsePage.jsx
    │   │   ├── UploadPage.jsx
    │   │   ├── HelpPage.jsx
    │   │   └── NotFoundPage.jsx
    │   ├── lib/utils.jsx       # Tailwind class merge helper
    │   ├── App.jsx
    │   └── index.css           # Global styles + animations
    └── tailwind.config.js
```

---

## Local Development

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas URI)

### Backend

```sh
cd Backend
npm install
# create .env with:
#   MONGODB_URI=your_mongodb_connection_string
#   PORT=5000
npm run dev
```

### Frontend

```sh
cd smartHub
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:5000`.

> The frontend points to the production backend by default. To use local backend, update `BACKEND_URL` in `Header.jsx`, `HomePage.jsx`, `UploadPage.jsx`, and `LiveChat.jsx`.

---

## API Endpoints

| Method | Route      | Description                                      |
|--------|------------|--------------------------------------------------|
| GET    | `/`        | Fetch all resources                              |
| GET    | `/browse`  | Fetch resources with optional search/filter/page |
| POST   | `/upload`  | Upload a new resource                            |

### Query params for `GET /browse`

| Param        | Type   | Description                        |
|--------------|--------|------------------------------------|
| `search`     | string | Case-insensitive title search      |
| `department` | string | Exact match on department name     |
| `year`       | string | Exact match on year (`1`–`4`)      |
| `page`       | number | Page number (default `1`)          |
| `limit`      | number | Results per page (default `100`)   |

---

## Environment Variables

### Backend `.env`

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/smarthub
PORT=5000
```

---

## Deployment

- **Frontend** → Vercel (`smartHub/vercel.json` included)
- **Backend** → Render (`Backend/vercel.json` also available for Vercel serverless)

Both are configured with CORS allowing each other's origins.

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push and open a pull request

All contributions are welcome — new features, bug fixes, or even better study materials!

---

## License

MIT — free to use, modify, and distribute.

---

*Built with ❤️ by NIT Kurukshetra student.*
