# Website für die OG Späti Termine

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
