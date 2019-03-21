{
    get("footer.html", "text").then(function (html) {
        footer.innerHTML = html
    })
}