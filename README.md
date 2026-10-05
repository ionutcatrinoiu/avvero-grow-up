# Avvero Grow-Up pentru Vercel

Aplicație independentă pentru GitHub și Vercel. Include prima prezentare Avvero, butonul mic „Adaugă” în dreapta sus și drag and drop pe toată pagina.

## Înlocuirea versiunii anterioare

1. În repository-ul `ionutcatrinoiu/avvero-grow-up`, elimină fișierele versiunii vechi. În special, elimină `server.js` și `app-server.js`. Nu amesteca cele două versiuni.
2. Dezarhivează pachetul. Urcă în rădăcina repository-ului conținutul folderului `avvero-grow-up`, nu folderul exterior și nu arhiva ZIP.
3. În Vercel, deschide proiectul `avvero-presentations`. Dacă ai setări Build & Development cu Override, dezactivează-le. `vercel.json` setează Framework Preset „Other”, Build Command `npm run build` și Output Directory `public`. Root Directory trebuie să corespundă folderului care conține `package.json` și `vercel.json`.
4. Prima pagină și prezentarea inițială pot funcționa fără configurarea stocării. Pentru upload, continuă cu pașii de mai jos.

## Activarea încărcării permanente

1. În proiectul Vercel, intră în Storage. Creează un store Vercel Blob cu acces „Private” și conectează-l la proiectul `avvero-presentations`. Folosește un store dedicat acestei aplicații. Vercel adaugă automat `BLOB_READ_WRITE_TOKEN`.
2. În Settings > Environment Variables, adaugă `UPLOAD_PASSWORD` cu parola pe care vrei să o folosești la adăugarea prezentărilor. Activează variabilele pentru Production și Preview. Tokenul Blob și parola sunt secrete. Nu le pune în GitHub.
3. Fă Redeploy după conectarea store-ului și după setarea parolei.
4. Deschide pagina, apasă „Adaugă”, alege un fișier HTML, confirmă titlul și introdu parola. Poți trage fișierul oriunde în pagină. Upload-ul merge direct din browser în Blob. Serverul nu salvează fișiere pe discul Vercel.

Prezentările noi rămân în Blob după reporniri și redeploy. Toate dispozitivele accesează aceeași listă. Fișierele identice nu se adaugă din nou. Dacă ai activat Vercel Deployment Protection, aceasta controlează separat cine poate deschide site-ul. Parola aplicației protejează numai încărcarea.

## Fișierele HTML

Maximum 20 MB per prezentare. Folosește HTML cu imaginile incluse sau cu adrese absolute pentru resurse. Aplicația nu încarcă automat imaginile din folderul unui index.html. Prima prezentare se află în `public/presentations/compania-avvero.html`.

## Verificare și dezvoltare

Necesită Node.js 24. Rulează `npm ci`, `npm run check`, `npm test` și `npm run build`. Pentru dezvoltare completă, folosește `npx vercel dev`. Copiază `.env.example` în `.env.local` și completează variabilele pentru store-ul de test. Nu folosi datele de producție pentru teste.

## De ce diferă de prima versiune

Prima versiune crea un folder `data` la pornire și salva fișiere pe discul unui server Node.js. Această variantă folosește funcții Vercel și un store Blob persistent. Pagina principală și resursele inițiale sunt statice. Nu există un server care trebuie să pornească înainte de afișarea paginii.

Documentație: https://vercel.com/docs/vercel-blob/client-upload și https://vercel.com/docs/functions/runtimes/node-js.
