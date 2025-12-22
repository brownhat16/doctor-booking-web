# Doctor Booking Chatbot - Web Application

A modern, AI-powered doctor booking system with progressive result refinement.

## Features

- 🤖 Intelligent conversation interface
- 🔍 Progressive doctor search and filtering
- 📅 Schedule viewing and appointment booking
- 💬 Natural language understanding with DeepSeek V3.1
- 🎨 Modern, responsive UI with Tailwind CSS

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### Option 1: Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: GitHub Integration

1. Push to GitHub
2. Import repository in Vercel dashboard
3. Add environment variable: `NVIDIA_API_KEY`
4. Deploy

## Environment Variables

You need to set the following environment variable in Vercel:

- `NVIDIA_API_KEY`: Your NVIDIA API key for DeepSeek

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **AI**: DeepSeek V3.1 via NVIDIA API
- **Deployment**: Vercel

## Project Structure

```
doctor-booking-web/
├── app/
│   ├── page.tsx           # Main chat page
│   └── api/
│       └── chat/
│           └── route.ts   # Chat API endpoint
├── components/
│   ├── ChatInterface.tsx  # Main chat component
│   ├── MessageBubble.tsx  # Message display
│   └── DoctorCard.tsx     # Doctor cards
└── vercel.json            # Vercel configuration
```

## Usage Examples

**Search for doctors:**
- "I have fever"
- "Find a cardiologist"
- "Need a skin doctor"

**Filter results:**
- "under ₹1000"
- "4 stars and above"
- "available after 5pm"

**View slots:**
- "What are the slots for Dr. Patel?"

**Book appointment:**
- "Book Dr. Patel at 5:30pm"
