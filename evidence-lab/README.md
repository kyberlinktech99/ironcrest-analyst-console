# Evidence Lab (public drop)
Static page for the Ironcrest Analyst Console repo. No frameworks, no CDN.

- `index.html` is the whole page. Put this folder at `<repo>/evidence-lab/`.
- `packs/` holds one JSON case file per student, named by a hash of the access code. Generate them with the private engine and copy `build/public/evidence-lab/packs/*` here. Packs contain NO plain answers (salted hashes only).
- Never commit the private folder (answer keys, review sheets, students.csv).
- Needs https (GitHub Pages is fine) because answer checks use Web Crypto.
- Add a link from the console nav to `evidence-lab/`.
