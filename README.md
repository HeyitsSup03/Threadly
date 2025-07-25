

---

# 🧵 Threadly – A Neo-Brutalist Reddit Clone (Frontend Only)

**Threadly** is a **frontend-only** Reddit-inspired web app built with a bold, uncompromising **neo-brutalist** design aesthetic. It replicates core Reddit behaviors such as browsing threads, posting, and commenting—wrapped in a minimal yet striking UI.

---

## 🚀 Features

* 🧵 Browse and read threads
* 🗨️ Add comments to discussions
* ✏️ Create new posts
* 👤 View user profiles (static)
* 📱 Mobile-friendly with adaptive navigation
* 🎨 Neo-brutalist custom-built UI components

---

## 🗂️ Project Structure

```
Threadly/
├── index.html
├── index.css
├── main.tsx
├── App.tsx
├── components/
│   ├── ChatModule.tsx
│   ├── CommentSection.tsx
│   ├── CreatePostArea.tsx
│   ├── Footer.tsx
│   ├── Header.tsx
│   ├── MobileNavigation.tsx
│   ├── SidebarNav.tsx
│   ├── ThreadItem.tsx
│   └── ThreadsList.tsx
├── pages/
│   ├── Home.tsx
│   ├── CategoryView.tsx
│   ├── ThreadDetail.tsx
│   ├── UserProfile.tsx
│   └── not-found.tsx
├── ui/
│   ├── brutal-button.tsx
│   ├── brutal-card.tsx
│   └── [More modular UI components...]
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   ├── localStorage.ts
│   ├── queryClient.ts
│   ├── types.ts
│   └── utils.ts
```

---

## 🎨 Design Philosophy

**Threadly** embraces the **neo-brutalism** design movement: raw, bold interfaces, heavy typography, visible grids, and intentional aesthetic constraints—while preserving accessibility and usability.

> Think Reddit, but redesigned with Bauhaus minimalism and an edge.

---

## 🧰 Tech Stack

* ⚛️ **React** (with TypeScript)
* ⚡ **Vite** for blazing-fast dev environment
* 🧱 **Custom UI system** (see `ui/`) inspired by brutalist web design
* 🧪 Lightweight hooks and logic (no backend)

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/threadly.git
cd threadly
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

---

## 📁 Key Pages

| Page           | File                     | Description            |
| -------------- | ------------------------ | ---------------------- |
| 🏠 Home        | `pages/Home.tsx`         | Main feed with threads |
| 📂 Categories  | `pages/CategoryView.tsx` | Filtered category view |
| 💬 Thread View | `pages/ThreadDetail.tsx` | Post and comments      |
| 👤 Profile     | `pages/UserProfile.tsx`  | Static user view       |
| 🚫 404         | `pages/not-found.tsx`    | Not found screen       |

---

## 💡 Ideas for Expansion

* 🔐 Auth & user login
* 🆙 Upvote/downvote system
* 🔔 Real-time notifications
* 🖋️ Rich-text editor for posts
* 🌐 Backend/API integration

---


Licensed under the [MIT License](LICENSE).

---

Would you like me to generate badge markdown (e.g., for React, Vite, TypeScript), or a deployment guide for Vercel or Netlify?

 
