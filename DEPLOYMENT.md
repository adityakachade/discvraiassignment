# 🚀 Deployment Guide

## Frontend Deployment (Choose one)

### Option 1: Vercel (Recommended)
1. **Install Vercel CLI**: `npm i -g vercel`
2. **Login**: `vercel login`
3. **Deploy**: `cd frontend && vercel --prod`
4. **Update environment**: Add backend URL to Vercel environment variables

### Option 2: Netlify
1. **Install Netlify CLI**: `npm i -g netlify-cli`
2. **Login**: `netlify login`
3. **Deploy**: `cd frontend && netlify deploy --prod --dir=build`
4. **Configure redirects**: Set up API redirects in Netlify dashboard

### Option 3: GitHub Pages
1. **Push to GitHub**: `git add . && git commit -m "Deploy" && git push`
2. **Enable Pages**: In repo settings → Pages → Source → Deploy from branch
3. **Configure**: Use `frontend/build` as publish directory

## Backend Deployment (Choose one)

### Option 1: Railway (Recommended)
1. **Install Railway CLI**: `npm i -g @railway/cli`
2. **Login**: `railway login`
3. **Deploy**: `cd backend && railway up`
4. **Set environment**: Add `PORT=3001` in Railway dashboard

### Option 2: Render
1. **Push to GitHub**: Create GitHub repo with your code
2. **Connect**: Sign up at render.com → Connect GitHub
3. **Configure**: Use `backend/render.yaml` configuration
4. **Deploy**: Automatic on push to main branch

### Option 3: Heroku
1. **Install Heroku CLI**: `npm i -g heroku`
2. **Login**: `heroku login`
3. **Create app**: `cd backend && heroku create`
4. **Deploy**: `git subtree push --prefix backend heroku main`

## Environment Variables Required

### Backend
- `PORT=3001` (Railway/Render sets this automatically)
- `GROQ_API_KEY=your_groq_key` (if using real AI)
- `OPENAI_API_KEY=your_openai_key` (if using OpenAI)

### Frontend
- `REACT_APP_API_URL=https://your-backend-url.com` (optional)

## Post-Deployment Steps

1. **Update CORS**: In backend, change `localhost:3000` to your frontend domain
2. **Test API**: Verify `/api/health` endpoint works
3. **Test Frontend**: Check product search functionality
4. **Monitor**: Set up error tracking and logging

## Quick Deploy Commands

```bash
# Frontend to Vercel
cd frontend && vercel --prod

# Backend to Railway  
cd backend && railway up

# Both with Docker
docker-compose up -d
```

## Domain Configuration

After deployment:
1. **Frontend URL**: `https://your-app.vercel.app`
2. **Backend URL**: `https://your-app.up.railway.app`
3. **Update frontend**: Change proxy to backend URL in `package.json`
4. **Update backend**: Change CORS to frontend URL in `index.js`
