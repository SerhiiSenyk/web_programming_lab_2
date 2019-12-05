const key = "news";
var newsImage = document.getElementById("news-image");

function validateInput(text){ return (text === "") ? false:true;}
function addImage(){ document.getElementById("add-image-button").click();}
document.getElementById("add-image-button").addEventListener("change", 
function () { newsImage.src = URL.createObjectURL(this.files[0]);});

function isOnline() {
    return window.navigator.onLine;
}

function sendNews(){
    //var imageSrc = document.getElementById("news-image").getAttribute("src");


    var b64image = getBase64Image(newsImage);
    const newsBody = document.getElementById("news");
    const newsTitle = document.getElementById("news-title");
    var news = JSON.parse(localStorage.getItem(key));
    if (news == null) {
        news = [];
    }
    if(!validateInput(newsBody.value.trim())){
        alert("Edit news body");
    }
    else if(!validateInput(newsTitle.value.trim())){
        alert("Edit news title");
    }
    else if(newsImage == "../images/insert_image.png"){
        alert("no image added");
    } else{
            if (isOnline()) {
                sendToServer();
            } else {
                news.push({ imgSrc : b64image,
                     titleText : newsTitle.value.trim() , 
                     bodyText : newsBody.value.trim()});
                addNewsToLocalStorage(news);
                alert("Added to local storage");
            }
        alert("News is sent");
        newsBody.value = "";
        newsTitle.value = "";
        newsImage.src = "../images/insert_image.png";
    }
}

function addNewsToLocalStorage(news) {
    const newsJSON = JSON.stringify(news);
    try {
        localStorage.setItem(key, newsJSON);
    } catch (exeption) {
        if (exeption == 'QUOTA_EXCEEDED_ERR') {
            alert("Local storage is overflowed");
        }
    }
}

function sendToServer() {
    alert("Sent to server");
}

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var context = canvas.getContext("2d");
    context.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
}