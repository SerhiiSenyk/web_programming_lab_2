
var localStorage = window.localStorage;
const key = "fans_appeal";

window.addEventListener("online",
    function () {
        if (isOnline() && localStorage.length > 0) {
            showAllAppealsFromLocalStorage();
            sendToServer();
        }
    });

if (isOnline() && localStorage.length > 0) {
    showAllAppealsFromLocalStorage();
}

function isOnline() {
    return window.navigator.onLine;
}

function validateFansAppeal(text) {
    return (text === "") ? false : true;
}

function addFansAppeal() {
    var textAppeal = document.getElementById("comment");
    var text = textAppeal.value.trim();
    var date = getCurrentDate();
    var fansAppeals = JSON.parse(localStorage.getItem(key));
    if (fansAppeals == null) {
        fansAppeals = [];
    }
    if (!validateFansAppeal(text)) {
        alert("Write an appeal!");
        stop();
    } else {
        if (isOnline()) {
            showAppealOnPage(text, date);
            //sendToServer();
        } else {
            fansAppeals.push({ text: text, date: date });
            addAppealToLocalStorage(fansAppeals);
            alert("Added to local storage");
        }
    }
    textAppeal.value = "";
}

function showAppealOnPage(appealText, dateTime) {
    var appeals = document.getElementById('appeals');
    var containerBlock = document.createElement("div");
    var rowBlock = document.createElement("div");
    var cardAppealBlock = document.createElement("div");
    var cardInfoBlock = document.createElement("div");
    containerBlock.className = "container";
    rowBlock.className = "row";
    cardAppealBlock.className = "card col-8";
    cardInfoBlock.className = "card";
    cardInfoBlock.innerHTML = "<p>" + "Serhii" + "<br>" + dateTime + "<p>";
    cardAppealBlock.appendChild(document.createTextNode(appealText.trim()));
    rowBlock.appendChild(cardInfoBlock);
    rowBlock.appendChild(cardAppealBlock);
    containerBlock.appendChild(rowBlock);
    appeals.appendChild(document.createElement('hr'));
    appeals.appendChild(containerBlock);
}

function addAppealToLocalStorage(appeals) {
    const appealsJSON = JSON.stringify(appeals);
    try {
        localStorage.setItem(key, appealsJSON);
    } catch (exeption) {
        if (exeption == 'QUOTA_EXCEEDED_ERR') {
            alert("Local storage is overflowed");
        }
    }
}

function showAllAppealsFromLocalStorage() {
    const fansAppeals = JSON.parse(localStorage.getItem(key));
    localStorage.removeItem(key);
    if (fansAppeals != null) {
        fansAppeals.forEach(function (appeal) {
            if (appeal != null) {
                showAppealOnPage(appeal.text, appeal.date);
            }
        });
    }
}

function sendToServer() {
    alert("Sent to server");
}


function getCurrentDate() {
    const dateTime = new Date();
    return String((dateTime.getHours() < 10 ? "0" : "") + dateTime.getHours() + ":" +
        (dateTime.getMinutes() < 10 ? "0" : "") + dateTime.getMinutes() + ":" +
        (dateTime.getSeconds() < 10 ? "0" : "") + dateTime.getSeconds() + "<br>" +
        dateTime.getDate() + "." + (dateTime.getMonth() + 1) + "." + dateTime.getFullYear());
}