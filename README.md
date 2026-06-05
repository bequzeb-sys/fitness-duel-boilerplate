# Fitness Duel

<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1200" />
</div>

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Run the app:
   `npm run dev`
3. Open [http://localhost:3000](http://localhost:3000)

## Coach Alexandre IA

Coach Alexandre IA runs entirely offline — no API key needed. The fitness coaching responses are built directly into the app and match your message to one of 10 motivational categories (cardio, squats, challenges, rest, XP, diet, morning sessions, consistency, friends, and general motivation).

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Docker

```bash
docker build -t fitness-duel .
docker run -p 3000:3000 fitness-duel
```
