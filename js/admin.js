var newsImage = document.getElementById("news-image");
function validateInput(text){ return (text === "") ? false:true;}
function addImage(){ document.getElementById("add-image-button").click();}
document.getElementById("add-image-button").addEventListener("change", 
function () {newsImage.src = URL.createObjectURL(this.files[0]);});
function sendNews(){
    const newsBody = document.getElementById("news");
    const newsTitle = document.getElementById("news-title");
    if(!validateInput(newsBody.value.trim())){
        alert("Edit news body");
    }
    else if(!validateInput(newsTitle.value.trim())){
        alert("Edit news title");
    }
    else if((newsImage === "../images/insert_image.png")){
        alert("no image added");
    } else{
        alert("News is sent");
        newsBody.value = "";
        newsTitle.value = "";
        newsImage.src = "../images/insert_image.png";
    }
}