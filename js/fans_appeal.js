function validateFansAppeal(text){
    return (text === "") ? false:true;
}

function getCurrentDate(){
    const dateTime = new Date();
    return  String((dateTime.getHours() < 10 ? "0" : "") + dateTime.getHours() + ":" +
             (dateTime.getMinutes() < 10 ? "0" : "") + dateTime.getMinutes() + ":" +
             (dateTime.getSeconds() < 10 ? "0" : "") + dateTime.getSeconds() + "<br>" +
             dateTime.getDate() + "." + (dateTime.getMonth() + 1) + "." + dateTime.getFullYear());
}

function addFansAppeal(){
    var appeals = document.getElementById('appeals');
    var containerBlock = document.createElement("div");
    var rowBlock = document.createElement("div");
    var cardAppealBlock = document.createElement("div");
    var cardInfoBlock = document.createElement("div");
    var textAppeal = document.getElementById("comment");
    var text = textAppeal.value.trim();
    if(!validateFansAppeal(text)){
        alert("Write an appeal!");
        stop();
    } else{
        containerBlock.className = "container";
        rowBlock.className = "row";
        cardAppealBlock.className = "card col-8";
        cardInfoBlock.className = "card"; 
        cardInfoBlock.innerHTML = "<p>" + "Serhii" + "<br>"  + getCurrentDate() + "<p>";
        cardAppealBlock.appendChild(document.createTextNode(text.trim()));
        rowBlock.appendChild(cardInfoBlock);
        rowBlock.appendChild(cardAppealBlock);
        containerBlock.appendChild(rowBlock);
        appeals.appendChild(document.createElement('hr'));
        appeals.appendChild(containerBlock);   
    }
    textAppeal.value = "";
}