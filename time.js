var today = new Date();
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var date = days[today.getDay()] + ", " + (today.getMonth() + 1) + "/" + today.getDate() + "/" + today.getFullYear();
document.getElementById("date").innerHTML = date;