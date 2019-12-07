const key = "news";

document.addEventListener("DOMContentLoaded", function () {
    var all_news = [];
    window.addEventListener("online", function (event) {
        storage.storage.get(key, function ($news) {
            storage.storage.delete(key);
            if ($news) {
                all_news = $news;
                all_news.forEach(function (news) {
                    //showNewsOnPage(news.imgSrc, news.titleText, news.bodyText);
                    sendToServer(news.imgSrc, news.titleText, news.bodyText);
                });
            }
            storage.storage.delete(key);
            all_news = [];
            window.location.reload();
        });
        getFromServer();
    });

    storage.storage.get("news", (news) => {
        if (news) {
            all_news = news;
        }
    });

    if (isOnline()) {
        if (all_news) {
            all_news.forEach(function (news) {
                //showNewsOnPage(news.imgSrc, news.titleText, news.bodyText);
                sendToServer(news.imgSrc, news.titleText, news.bodyText);
            });
        }
        storage.storage.delete(key);
        all_news = [];
        getFromServer();
    }

    function showNewsOnPage(imgSrc, titleText, bodyText) {
        var newsID = document.getElementById('news');
        const column = document.createElement("div");
        const cardBlock = document.createElement("div");
        var image = document.createElement("img");
        const news = document.createElement("article");
        const title = document.createElement("h6");
        image.src = imgSrc;
        image.alt = "Album";
        image.id = "news-image";
        title.innerHTML = titleText;
        news.innerHTML = "<p>" + bodyText + "</p>";
        cardBlock.appendChild(image);
        cardBlock.appendChild(title);
        cardBlock.appendChild(news);
        column.appendChild(cardBlock);
        newsID.appendChild(column);
        cardBlock.className = "card";
        column.className = "col-sm-12 col-md-6 col-lg-4";
    }

    function getFromServer() {
        const request = new XMLHttpRequest();
        request.open("GET", "/news", true);
        request.send();
        request.onreadystatechange = function () {
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status == 200) {
                    $news = JSON.parse(request.responseText);
                    $news.forEach(function (news) {
                        showNewsOnPage(news.imgSrc, news.titleText, news.bodyText)
                    });
                }
                else {
                    alert("Error get from server!");
                }
            }
        }
    }

    function sendToServer(imgSrc, titleText, bodyText) {
        try {
            fetch("/news", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    imgSrc: imgSrc,
                    titleText: titleText,
                    bodyText: bodyText
                }),
            })
            alert("News sent to server!");
        }
        catch{
            (error => console.error(error));
        }

    }

});