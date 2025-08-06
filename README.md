# Virtual Space - Live Collaborative Whiteboard

A real-time collaborative whiteboard application that enables multiple users to work together seamlessly with live cursors, video/audio communication, and an infinite canvas experience.

![Virtual Space Demo](https://img.shields.io/badge/demo-live-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

### 🎨 **Real-time Collaborative Canvas**

- Infinite pannable and zoomable canvas
- Live cursor tracking with user names and colors
- Real-time synchronization across all connected users
- Mobile-responsive touch interactions

### 🎪 **Interactive Elements**

- **Stickers**: Add fun visual elements to your canvas
- **Polaroids**: Create note-like elements with custom colors
- Drag and drop functionality for all canvas items

### 🎥 **Video & Audio Integration**

- Built-in video/audio rooms using 100ms
- Mute/unmute controls
- Join with audio/video disabled by default
- Real-time user presence indicators

### 🗺️ **Navigation & UI**

- **Minimap**: Quick navigation across large canvas areas
- **Toolbar**: Easy access to canvas tools and options
- **Pan Mode**: Navigate the canvas efficiently
- Online user counter
- Responsive design for desktop and mobile

### 🎨 **Customization**

- Personal color picker for user identification
- Custom usernames (up to 10 characters)
- Modern, clean UI with dark/light themes

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
NEXT_PUBLIC_LIVEBLOCKS_KEY=your_liveblocks_public_key
NEXT_PUBLIC_HMS_ROOM_ID=your_100ms_room_code
```

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/virtual-space.git
   cd virtual-space
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   - Get your Liveblocks API key from [Liveblocks Dashboard](https://liveblocks.io/dashboard)
   - Get your 100ms room code from [100ms Dashboard](https://dashboard.100ms.live/)
   - Add them to your `.env.local` file

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

### **Frontend Framework**

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety

### **Real-time Collaboration**

- **Liveblocks** - Real-time collaboration infrastructure
- **100ms** - Video/audio communication platform

### **State Management**

- **Jotai** - Atomic state management
- **Jotai DevTools** - Development debugging

### **UI & Styling**

- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **Framer Motion** - Animation library
- **React Color** - Color picker component
- **Vaul** - Drawer component

### **Development Tools**

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```text
virtual-space/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (user setup)
│   └── room/              # Collaborative room
│       └── page.tsx       # Main whiteboard interface
├── components/
│   ├── providers/         # Context providers
│   │   ├── 100ms-provider.tsx    # Video/audio provider
│   │   ├── jotai-provider.tsx    # State management
│   │   └── liveblocks-room.tsx   # Real-time collaboration
│   ├── ui/                # Reusable UI components
│   └── whiteboard/        # Whiteboard-specific components
│       ├── canvas.tsx     # Main canvas component
│       ├── cursor.tsx     # User cursor display
│       ├── minimap.tsx    # Canvas minimap
│       ├── note.tsx       # Note/polaroid elements
│       ├── other-cursors.tsx     # Other users' cursors
│       └── toolbar.tsx    # Canvas toolbar
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities and configuration
│   ├── constants.ts       # App constants
│   ├── jotai-state.ts    # Global state atoms
│   ├── type.ts           # TypeScript type definitions
│   └── utils.ts          # Utility functions
├── public/               # Static assets
│   └── stickers/         # Sticker assets
└── liveblocks.config.ts  # Liveblocks configuration
```

## 🎮 Usage

### **Getting Started**

1. Enter your username (max 10 characters)
2. Pick a unique color for your cursor
3. Click "Join Room" to enter the collaborative space

### **Canvas Navigation**

- **Mouse/Trackpad**: Scroll to pan around the canvas
- **Touch**: Use pinch and drag gestures on mobile
- **Minimap**: Click to jump to different areas

### **Adding Elements**

- Use the toolbar to add stickers and polaroids
- Drag elements around the canvas
- Elements are synced in real-time with other users

### **Video/Audio**

- Video/audio features are automatically available
- Users join with audio/video muted by default
- Use 100ms controls to manage your media

## ⚠️ Important Notes

- **Public Canvas**: This is a public workspace accessible to anyone
- **No Data Persistence**: Video, audio, and user data are not stored
- **Demo Project**: Intended for demonstration and testing purposes
- **Security**: While effort has been made to ensure security, use responsibly

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Demo](https://your-deployment-url.com)
- [Liveblocks Documentation](https://liveblocks.io/docs)
- [100ms Documentation](https://docs.100ms.live/)
- [Next.js Documentation](https://nextjs.org/docs)

## 🙏 Acknowledgments

- [Liveblocks](https://liveblocks.io/) for real-time collaboration infrastructure
- [100ms](https://100ms.live/) for video/audio capabilities
- [Radix UI](https://radix-ui.com/) for accessible components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vercel](https://vercel.com/) for deployment platform

---

**Built with ❤️ using Next.js, Liveblocks, and 100ms**
