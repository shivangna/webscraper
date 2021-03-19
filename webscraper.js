const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://news.ycombinator.com";

axios
    .get(url)
    .then((response) => {
        getData(response.data);
    })
    .catch((error) => {
        console.log(error);
    });

let getData = (html) => {
    data = [];
    const $ = cheerio.load(html);

    $("span.comhead").each(function () {
        let a = $(this).prev();

        let title = a.text();
        let link = a.attr("href");

        let subtext = a.parent().parent().next().children(".subtext").children();
        let user = $(subtext).eq(1).text();
        let points = $(subtext).eq(0).text();

        data.push({
            title: title,
            link: link,
            user: user,
            points: points,
        });
    });

    console.log(data);
};
