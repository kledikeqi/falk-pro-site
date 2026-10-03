# Falk Pro website (Next.js)

Languages: Italiano, English, Shqip, Deutsch (toggle in the header). All texts and facts live in `app/content.ts`.

## 1. Set up your MacBook (once)
1. Open **Terminal** (Cmd+Space, type "Terminal").
2. Install Homebrew: go to https://brew.sh and paste the one-line command shown there. Follow the "Next steps" it prints.
3. Install Node.js and Git: `brew install node git` (check: `node -v` shows v20 or higher).
4. Install VS Code: `brew install --cask visual-studio-code`.

## 2. Run the site locally
```bash
cd ~/Downloads/falk-pro-website      # the unzipped folder
npm install
npm run dev
```
Open http://localhost:3000. Edit files, the page refreshes by itself. Stop with Ctrl+C.
Check the production build before deploying: `npm run build`.

## 3. Deploy on Vercel (recommended: via GitHub)
1. Create a GitHub account and a new empty repository (e.g. `falk-pro-website`).
2. In the project folder:
```bash
git init && git add . && git commit -m "Falk Pro website"
git branch -M main
git remote add origin https://github.com/YOUR-USER/falk-pro-website.git
git push -u origin main
```
3. Go to https://vercel.com, log in with GitHub, click **Add New → Project**, import the repo, keep the detected **Next.js** settings, click **Deploy**.
4. Every later `git push` redeploys automatically.

To replace the existing falk-pro-website.vercel.app, push this code to the repo already connected to that project (or in Vercel: Project → Settings → Git to reconnect).

Alternative (no GitHub): `npm i -g vercel`, then `vercel` (first time) and `vercel --prod`.

## 4. Edit content
- Texts, numbers, contacts, references: `app/content.ts`
- Product slides: put images in `public/products/` and list them in `PRODUCTS`
- Photos / videos: `public/gallery/`, `public/video/`
- The contact form opens the visitor's email app (mailto). For a server-side form later, use Resend or Formspree.
