

const key = "fans_appeal";
document.addEventListener("DOMContentLoaded", function () {
    var fansAppeals = [];
    window.addEventListener("online", function (event) {
        storage.storage.get(key, (appeals) => {
            if (appeals) {
                fansAppeals = appeals;
                fansAppeals.forEach(function (appeal) {
                    showAppealOnPage(appeal.text, appeal.date)
                });
            }
            storage.storage.delete(key);
            sendToServer();
            fansAppeals = [];
        });
    });

    if (isOnline()) {
        fansAppeals.forEach(function (appeal) {
            showAppealOnPage(appeal.text, appeal.date)
        });
        storage.storage.delete(key);
        //sendToServer();
        fansAppeals = [];
    }

    storage.storage.get(key, (appeals) => {
        if (appeals) {
            fansAppeals = appeals;
        }
    });

    function validateFansAppeal(text) {
        return (text === "") ? false : true;
    }

    document.getElementById('addFansAppeal').addEventListener('click', function () {
        var textAppeal = document.getElementById("comment");
        var text = textAppeal.value.trim();
        var date = getCurrentDate();
        if (!validateFansAppeal(text)) {
            alert("Write an appeal!");
            stop();
        } else {
            if (isOnline()) {
                showAppealOnPage(text, date);
                //sendToServer();
            } else {
                fansAppeals.push({ text: text, date: date });
                storage.storage.add(key, fansAppeals);
                alert("Added to storage");
            }
        }
        textAppeal.value = "";
    });

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

    function getCurrentDate() {
        const dateTime = new Date();
        return String((dateTime.getHours() < 10 ? "0" : "") + dateTime.getHours() + ":" +
            (dateTime.getMinutes() < 10 ? "0" : "") + dateTime.getMinutes() + ":" +
            (dateTime.getSeconds() < 10 ? "0" : "") + dateTime.getSeconds() + "<br>" +
            dateTime.getDate() + "." + (dateTime.getMonth() + 1) + "." + dateTime.getFullYear());
    }

});