document.addEventListener("DOMContentLoaded", function () {
    var submitBtn = document.querySelector("#submit");
    var currTime = "";
    var alarmTime = [];
    var audio = new Audio("audio/alarm1.wav");

    submitBtn.addEventListener("click", function (event) {
        event.preventDefault();

        var hr = document.querySelector("#hours");
        var min = document.querySelector("#minutes");
        var sec = document.querySelector("#seconds");
        var ampm = document.querySelector("#ampm");

        var selectedHr = hr.options[hr.selectedIndex].textContent;
        var selectedMin = min.options[min.selectedIndex].textContent;
        var selectedSec = sec.options[sec.selectedIndex].textContent;
        var selectedAmPm = ampm.options[ampm.selectedIndex].textContent;

        var alarmTimeStr = selectedHr + ":" + selectedMin + ":" + selectedSec + " " + selectedAmPm;

        addElementToList(alarmTimeStr);
    });

    function addElementToList(timeStr) {
        var alarmsList = document.querySelector("#active-alarms");
        var newDiv = document.createElement("div");
        newDiv.classList.add("li-div");

        var listItem = document.createElement("li");
        var btnItem = document.createElement("button");

        btnItem.textContent = "Delete";
        btnItem.classList.add("delete-btn", "btn", "btn-outline-light");
        listItem.textContent = timeStr;

        btnItem.addEventListener("click", function () {
            // Remove the corresponding alarm when the "Delete" button is clicked
            alarmsList.removeChild(newDiv);
            removeAlarm(timeStr);
        });

        // Append listItem and btnItem to newDiv
        newDiv.appendChild(listItem);
        newDiv.appendChild(btnItem);

        // Append the newDiv to alarmsList
        alarmsList.appendChild(newDiv);

        alarmTime.push(timeStr);
    }

    function removeAlarm(timeStr) {
        // Find the index of the alarm to remove
        var index = alarmTime.indexOf(timeStr);

        if (index !== -1) {
            // Remove the alarm from the array
            alarmTime.splice(index, 1);
        }
    }

    function updateTime() {
        var today = new Date();
        var hr = today.getHours();
        var min = today.getMinutes();
        var sec = today.getSeconds();
        var ampm = hr >= 12 ? "PM" : "AM";

        hr = hr % 12 || 12;
        hr = hr < 10 ? "0" + hr : hr;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;

        var time = hr + " : " + min + " : " + sec + "  " + ampm;
        currTime = time;
        document.querySelector(".current-time").textContent = time;
    }

    function alarmRingCheck() {
        if (alarmTime.length > 0) {
            alarmTime.forEach(function (alarm) {
                if (currTime === alarm) {
                    // Alarm is ringing
                    console.log("Alarm is ringing!");
                    audio.play();
                }
            });
        }
    }

    setInterval(updateTime, 1000);
    setInterval(alarmRingCheck, 1000);
});
