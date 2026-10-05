# Avvero Grow-Up

Aplicație independentă pentru prezentările Avvero. Include prima prezentare, logoul secundar, butonul mic de încărcare în dreapta sus și drag and drop oriunde în pagină. Nu folosește ChatGPT sau serviciul Sites. Nu are dependențe externe.

## Pornire

Instalează Node.js 22.9 sau mai nou. Rulează `npm start` în folderul proiectului. Deschide http://localhost:3000.

Pentru configurare, copiază `.env.example` ca `.env`. Setează `UPLOAD_PASSWORD` înainte de publicarea online. Vizitatorii pot deschide prezentările, iar parola protejează adăugarea lor. Nu pune `.env` în GitHub.

## GitHub și găzduire

Dezarhivează ZIP-ul. Urcă în repository conținutul folderului `avvero-grow-up`.

GitHub păstrează codul. Pentru funcționare online ai nevoie de un serviciu care rulează Node.js și oferă un disc persistent. Comanda de pornire este `npm start`. Configurează un disc persistent și variabila `DATA_DIR` către acel disc. Configurează `UPLOAD_PASSWORD` ca variabilă secretă pe serviciul de găzduire.

GitHub Pages nu poate rula serverul sau salva prezentările încărcate. Sistemele cu disc temporar nu păstrează aceste fișiere între reporniri. Pentru o găzduire fără disc persistent trebuie adaptată stocarea la un serviciu extern.

## Utilizare

Apasă „Adaugă” în dreapta sus sau trage un fișier HTML oriunde în pagină. Confirmă titlul și introdu parola, dacă ai configurat-o. Prezentarea apare ca buton. Apasă butonul ca să o deschizi într-o filă nouă.

Fișierele trebuie să includă imaginile și resursele în HTML sau să utilizeze adrese absolute. Încărcarea unui index.html nu include automat fișierele din folderul lui. Limita este 20 MB. Aplicația evită duplicarea fișierelor identice.

Serverul salvează prezentările în `DATA_DIR`, implicit `data`. Ele rămân disponibile după reîncărcare și repornire, pentru toate dispozitivele care accesează același server. Fă backup acestui folder. Prezentarea inițială se află în `presentations/compania-avvero.html`.

## Verificare

Rulează `npm run check` pentru verificarea sintaxei.
