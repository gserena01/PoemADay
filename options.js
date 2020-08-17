//set onClick listener for author checkbox to be below function
document.getElementById("myCheck").addEventListener("click", displayAuthors);
let authorList = [];
let authorSelect = document.getElementById("authorSpinner");
let options = "<option>Choose an author</option>";

//Populate List of Author Names
fetch('https://poetrydb.org/author').then(r => r.text()).then(result => {
  // Result now contains the response text, do what you want...
  //Convert result to JSON object array
  var authors = JSON.parse(result);
  for (var i in authors.authors) {
    authorList.push(authors.authors[i]);
  }
  //Now Put these names into the spinner
  for (var i = 0; i < authorList.length; i++) {
    var opt = authorList[i];
    console.log(opt);
    options += "<option value = '" + opt + " '>" + opt + "</option>";
  }
  authorSelect.innerHTML = options;
},
  error => {
    authorList = ["Unable to load authors."]
    options += "<option>" + authorList[0] + "</option>";
    authorSelect.innerHTML = options;
  });

//Function to display Author Spinner
function displayAuthors() {
  var checkBox = document.getElementById("myCheck");
  var text = document.getElementById("authorSpinner");
  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}


//document.getElementById("checkLabel").innerHTML = authorSelect.value;
console.log(authorSelect.value);



