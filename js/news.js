const key = "news";

//var localStorage = window.localStorage;
document.addEventListener("DOMContentLoaded", function () {
    var all_news = [];
    window.addEventListener("online", function (event) {
            storage.storage.get(key, function ($news) {
                if ($news) {
                    all_news = $news;
                    all_news.forEach(function (news) {
                        showNewsOnPage(news.imgSrc, news.titleText, news.bodyText);
                    });
                }
                storage.storage.delete(key);
                sendToServer();
                all_news = [];
            });
    });

    storage.storage.get("news", (news) => {
        if (news) {
            all_news = news;
        }
    });

    if (isOnline()) {
        // all_news.forEach(function (news) {
        //     showNewsOnPage(news.imgSrc, news.titleText, news.bodyText);
        // });
        // storage.storage.delete(key);
        // sendToServer();
        // all_news = [];
        storage.storage.get(key, function ($news) {
            if ($news) {
                all_news = $news;
                all_news.forEach(function (news) {
                    showNewsOnPage(news.imgSrc, news.titleText, news.bodyText);
                });
            }
            storage.storage.delete(key);
            sendToServer();
            all_news = [];
        });
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


});