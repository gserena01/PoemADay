var poem = "Loading poem...";

var srcNum = Math.random() * 14;
var srcInt = ~~srcNum;
//var srcInt = 7;

if (srcInt == 7){

    fetch('http://poetrydb.org/author,title/Shakespeare;Sonnet').then(r => r.text()).then(result => {
      // Result now contains the response text, do what you want...
        //Convert result to JSON object array
       var sonnets = '{ "sonnets" : '+ result + '}';
        var poem = JSON.parse(sonnets);
      //Choose a random sonnet number, and cast it to an integer value 
       var lgth = poem.sonnets.length;
       var num = (Math.random() * lgth);
       var intNum = ~~num;
       //find the chosen poem's title, author, and lines
       var title = poem.sonnets[intNum].title.toString();
       var author = poem.sonnets[intNum].author.toString();
       var lines = poem.sonnets[intNum].lines.toString();
       var link = "https://www.poemist.com/william-shakespeare";
       function getLink() {
            document.getElementById("authorLink").href = link;
       }
       getLink();
       //parse code to fit normal formatting standards
       lines = lines.replace(/,  /g, "COMMASPACESPACE");
       lines = lines.replace(/, /g, "COMMASPACE");
       lines = lines.replace(/,,/g , ",<br>");
       lines = lines.replace(/,/g, "<br>");
       lines = lines.replace(/COMMASPACESPACE/g, "<br> &nbsp &nbsp &nbsp");
       lines = lines.replace(/COMMASPACE/g, ", ");
       lines = lines.replace(/<br><br>/g, "<br>")
       lines = lines.replace(/<br>-/g, "-");
       lines = lines.replace(/<br>' /g, "'");
       lines = lines.replace(/<br>'<br>/g, "'<br>");
       //display poem's title, author, and lines
       document.getElementById("title").innerHTML = title;
       document.getElementById("author").innerHTML = author;
       document.getElementById("lines").innerHTML = lines;
    },
    error => {
       var poem = "Could not find a poem."
       document.getElementById("title").innerHTML = poem;
    }); 
} else {
    fetch('https://www.poemist.com/api/v1/randompoems').then(r => r.text()).then(result => {
    //https://www.programmableweb.com/api/poemist-rest-api-v10 For more info.
    //https://poemist.github.io/poemist-apidoc/#misc-services For more info.
    //https://www.poemist.com/api/v1/randompoems to see examples
    // Result now contains the response text, do what you want...
    //Convert result to JSON object array
    var poems = '{ "poems" : '+ result + '}';
    var poem = JSON.parse(poems);
    //find title, lines, and name
    var title = poem.poems[0].title.toString();
    var name = poem.poems[0].poet.name.toString();
    var lines = poem.poems[0].content;
    //To add link
    var link = poem.poems[0].poet.url.toString();
    function getLink() {
        document.getElementById("authorLink").href = link;
    }
    getLink();
    //parse code to fit normal formatting standards
    lines = lines.replace(/\n/g, "<br>");
    title = title.replace(/&Mdash;/g, "--");
    //display poem's title, author, and lines
    document.getElementById("title").innerHTML = title;
    document.getElementById("author").innerHTML = name;
    document.getElementById("lines").innerHTML = lines;
},
error => {
    var poem = "Could not find a poem."
    document.getElementById("title").innerHTML = poem;
}); 
}

//set onClick listener for Search button to be below function
document.getElementById("searchPoems").addEventListener("click", findPoem);

//function for searching for poems
function findPoem() {
    var inputPoet = document.getElementById("authorIP").value;
    console.log(inputPoet);
    var inputTitle = document.getElementById("titleIP").value;
    console.log(inputTitle);
    if (inputPoet === "" && inputTitle === ""){
        //cannot display a poem without inputs
        document.getElementById("searchMessage").innerHTML = "Please input a poet or title before searching."
    } else if (inputPoet === "") {
        //display a poem based on the title, if possible
        var link = "https://poetrydb.org/title/" + inputTitle;
        fetch(link).then(r => r.text()).then(result => {
            //Convert result to JSON object array
            var poems = '{ "poems" : '+ result + '}';
            var poem = JSON.parse(poems);
            console.log(poem);
            //find title, lines, and name
            var title = poem.poems[0].title.toString();
            var name = poem.poems[0].author.toString();
            var lines = poem.poems[0].lines.toString();
            console.log(title);
            console.log(lines);
            lines = lines.replace(/\n/g, "<br>");
            title = title.replace(/&Mdash;/g, "--");
            //display poem's title, author, and lines
            document.getElementById("title").innerHTML = title;
            document.getElementById("author").innerHTML = name;
            document.getElementById("lines").innerHTML = lines;
            //TODO there is a bug in the author link
        },
        error => {
           var poem = "Could not find a poem."
           document.getElementById("title").innerHTML = poem;
        });     
    } else if (inputTitle === "") {
        //display random poet by the provided author, if possible
    } else {
        //use both to display specific poem, if possible
    }
}


document.getElementById("title").innerHTML = poem;