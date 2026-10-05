# Avvero Grow-Up

Aplicație independentă pentru prezentări HTML, cu fundal despre lentile oftalmice, butoane liquid glass și efect luminos la apăsare. Nu include prezentări preinstalate.

## Actualizarea proiectului existent

1. Dezarhivează și înlocuiește fișierele proiectului GitHub cu conținutul folderului avvero-grow-up. Nu încărca folderul părinte ca subfolder.
2. Șterge din GitHub vechiul fișier public/presentations/compania-avvero.html și vechiul folder presentations dacă există din versiunea inițială. Arhiva nouă nu le conține.
3. Păstrează store-ul Blob privat conectat și UPLOAD_PASSWORD în Vercel. Aplicația suportă atât OIDC (BLOB_STORE_ID și BLOB_WEBHOOK_PUBLIC_KEY adăugate de Vercel), cât și BLOB_READ_WRITE_TOKEN. Nu copia manual un token dacă proiectul folosește OIDC.
4. Salvează modificările prin Commit. Vercel va publica actualizarea automat dacă repository-ul este conectat.

Prezentările încărcate anterior în Blob sunt păstrate. Pentru a începe și cu lista încărcărilor goală, folosește butonul Șterge pentru fiecare prezentare.

## Utilizare

Butonul mic Adaugă este în dreapta sus. Poți adăuga câte un fișier index.html prin selecție sau drag and drop. Introdu titlul și parola configurată în UPLOAD_PASSWORD. Limita unui fișier este 20 MB.

Fiecare prezentare are un buton Șterge. Ștergerea cere confirmare și aceeași parolă de administrare și elimină definitiv fișierul din Blob.

Prezentările se deschid în pagină, într-un vizualizator izolat. Vizualizatorul ocupă toată pagina, fără bară suplimentară. Butonul Înapoi al browserului revine la listă când ai deschis prezentarea din hub. Linkurile scurte funcționează și la acces direct sau reîncărcare. Exemplu: titlul 01 Compania AVVERO generează /compania-avvero. Linkurile vechi cu ?presentation= rămân compatibile. Pentru titluri identice, aplicația adaugă un identificator la linkul celei de-a doua prezentări. Fișierele trebuie să fie HTML autonome, cu resurse incluse sau URL-uri absolute; imaginile locale din alte fișiere nu sunt încărcate automat.

## Prima instalare pe Vercel

Încarcă proiectul în GitHub și importă repository-ul în Vercel. Framework: Other, build: npm run build, output: public. Creează și conectează un store Vercel Blob cu acces Private. Adaugă UPLOAD_PASSWORD în Settings → Environment Variables pentru Production. Folosește o parolă proprie. Fă Redeploy după configurarea variabilelor.

Parola și tokenul se păstrează numai în Vercel, nu în GitHub.

## Verificare

Node.js 24. Rulează npm ci, npm run check, npm test și npm run build.
