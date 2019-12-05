const key = "news";

var localStorage = window.localStorage;

window.addEventListener("online",
    function () {
        if (isOnline() && localStorage.length > 0) {
            showNewsFromLocalStorage();
            sendToServer();
        }
    });

if (isOnline() && localStorage.length > 0) {
    showNewsFromLocalStorage();
}

function isOnline() {
    return window.navigator.onLine;
}

function showNewsFromLocalStorage() {
    const $news = JSON.parse(localStorage.getItem(key));
    localStorage.removeItem(key);
    if ($news != null) {
        $news.forEach(function (news) {
            if (news != null) {
                showNewsOnPage(news.imgSrc, news.titleText, news.bodyText);
            }
        });
    }
}


function showNewsOnPage(imgSrc, titleText, bodyText) {

    // const imgSrc = "../images/Beatles_-_Abbey_Road.jpg";
    // const titleText = "TEST SRUFHRFHR";
    // const bodyText = "FVREF VERFsvdwfk vmerfvn ejvnrej vnrkjefvnrkjv  re rejvrkj rj rjk  r ";

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


function sendToServer() {
    alert("Sent to server");
}