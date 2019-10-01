const fs = require("fs").promises;
const minify = require("minify");

const getMonth = month =>
  [
    "Januar",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "Novermber",
    "Dezember"
  ][month];

const template = info => `
<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE-edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>OG Späti</title>
    <link rel="stylesheet" type="text/css" href="index.css">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#082c50">
    <meta name="msapplication-TileColor" content="#082c50">
    <meta name="theme-color" content="#082c50">
    <script src="https://kit.fontawesome.com/c839156e18.js" crossorigin="anonymous"></script>
    <script type="text/javascript" src="https://addevent.com/libs/atc/1.6.1/atc.min.js" async defer></script>
  </head>
  <body>
    <img src="j-gcl-logo.svg" alt="JGCL Logo" style="width: 10rem;">
    <h2>OG Späti</h2>
    ${
      info.doodle.visible
        ? `<a href="${info.doodle.link}" class="doodle">Terminfindung</a>`
        : ""
    }
    <div class="information">
      ${info.dates
        .filter(date => Date.now() < date.date)
        .map(
          date => `
        <div class="addeventatc details">
          <span><i class="fab fa-stack-exchange"></i>${date.theme}</span>
          <span><i class="far fa-calendar-alt"></i>${date.date.toLocaleDateString()}</span>
          <span><i class="far fa-clock"></i>${date.date.toLocaleTimeString()}</span>
          <span><i class="fas fa-location-arrow"></i>${date.place}</span>
          <span><i class="fas fa-street-view"></i>${date.person}</span>
          <span class="start">${date.date.toISOString()}</span>
          <span class="end">${new Date(
            date.date.getFullYear(),
            date.date.getMonth(),
            date.date.getDate(),
            24,
            00
          ).toISOString()}</span>
          <span class="timezone">Europe/Berlin</span>
          <span class="title">OG Späti - ${getMonth(
            date.date.getMonth()
          )}</span>
          <span class="description">${date.theme} gestaltet von ${
            date.person
          }</span>
          <span class="location">${date.place}</span>
        </div>`
        )
        .join("")}
        ${
          info.dates.filter(date => Date.now() > date.date).length > 0
            ? `<h4>Vorheriger Termine</h4>${info.dates
                .filter(date => Date.now() > date.date)
                .map(
                  date => `
          <div class="details">
            <span><i class="fab fa-stack-exchange"></i>${date.theme}</span>
            <span><i class="far fa-calendar-alt"></i>${date.date.toLocaleDateString()}</span>
            <span><i class="far fa-clock"></i>${date.date.toLocaleTimeString()}</span>
            <span><i class="fas fa-location-arrow"></i>${date.place}</span>
            <span><i class="fas fa-street-view"></i>${date.person}</span>
          </div>`
                )
                .join("")}`
            : ""
        }
    </div>
    <div class="links">
        <a href="https://instagram.com/jgcl.berlin"><span><i class="fab fa-instagram"></i></span></a>
        <a href="http://jgcl-berlin.de/"><span><i class="fas fa-globe"></i></span></a>
    </div>
  </body>
</html>
`;

const build = async () => {
  const data = JSON.parse(await fs.readFile("./data.json"));
  const html = template({
    ...data,
    dates: data.dates.map(d => {
      const date = new Date(d.date);
      return {
        ...d,
        date
      };
    })
  });
  await fs.writeFile("index.html", html);
  const minifiedHtml = await minify("./index.html");
  const minifiedCss = await minify("./index.css");
  await fs.writeFile("./public/index.html", minifiedHtml);
  await fs.writeFile("./public/index.css", minifiedCss);
};

build();
