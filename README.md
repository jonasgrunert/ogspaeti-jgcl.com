# Website für die OG Späti Termine

[![Netlify Status](https://api.netlify.com/api/v1/badges/b39d8f87-3aaf-41b7-9a1d-4d391145ff77/deploy-status)](https://app.netlify.com/sites/og-spaeti/deploys)

[Website](https://ogspaeti-jgcl.com/)

Wird mit Node gebaut und benötigt Daten in der data.json.

```
{
  /* für die Terminfindung mit Doodle*/
  "doodle": {
    /* Soll der LInk gezeigt werden */
    "visible": boolean,
    /* Webadresse der Umfrage */
    "link": string
  },
  /* Welche Terffen es gibt */
  "dates": {
    /* Datumsformat ist YYYY-MM-DDTHH:MM:SS */
    "date": string,
    /* Thema oder Titile des nächsten Treffens */
    "theme": string,
    /* Ort des Treffens */
    "place": string,
    /* Person, die das Treffen organisiert */,
    "person": string
  }
}
```
