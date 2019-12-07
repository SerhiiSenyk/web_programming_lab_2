const key = "news";


document.addEventListener("DOMContentLoaded", function () {
    var news = [];
    var newsImage = document.getElementById("news-image");

    window.addEventListener("online", function (event) {
        storage.storage.get(key, function ($news) {
            if ($news) {
                all_news = $news;
                all_news.forEach(function (news) {
                    sendToServer(news.imgSrc, news.titleText, news.bodyText);
                });
            }
            storage.storage.delete(key);
            all_news = [];
        });
    });

    function validateInput(text) { return (text === "") ? false : true; }


    document.getElementById('addImage').addEventListener('click', function () {
        document.getElementById("add-image-button").click();
    });

    storage.storage.get(key, ($news) => {
        if ($news) {
            news = $news;
        }
    });

    if (isOnline()) {
        storage.storage.get(key, ($news) => {
            if ($news != null) {
                news = $news;
            }
        });
    }

    document.getElementById("add-image-button").addEventListener("change",
        function () { newsImage.src = URL.createObjectURL(this.files[0]); });



    document.getElementById("send-news-button").addEventListener('click', function () {
        var imageSrc = document.getElementById("news-image").getAttribute("src");
        var b64image = getBase64Image(newsImage);
        const newsBody = document.getElementById("news");
        const newsTitle = document.getElementById("news-title");
        if (!validateInput(newsBody.value.trim())) {
            alert("Edit news body");
        }
        else if (!validateInput(newsTitle.value.trim())) {
            alert("Edit news title");
        }
        else if (newsImage == "../images/insert_image.png") {
            alert("no image added");
        } else {
            if (isOnline()) {
                sendToServer(b64image, newsTitle.value.trim(), newsBody.value.trim());
            } else {
                news.push({
                    imgSrc: b64image,
                    titleText: newsTitle.value.trim(),
                    bodyText: newsBody.value.trim()
                });
                storage.storage.add(key, news);
                alert("Added to storage");
            }
            alert("News is sent");
            newsBody.value = "";
            newsTitle.value = "";
            newsImage.src = "../images/insert_image.png";
        }
    });

    function getBase64Image(img) {
        var canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        return dataURL;
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