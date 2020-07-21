var poem = "Loading poem...";

//Parsing function for poem lines
function parseLines(lines) {
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
    lines = lines.replace(/<br>' /g, '"');
    lines = lines.replace(/<br>"<br>/g, '"<br>');
    lines = lines.replace(/1<br>,Note/g, "<br> 1, Note");
    lines = lines.replace(/_./g, ".");
    lines = lines.replace(/_,/g, ",");
    lines = lines.replace(/ _/g, " ");
    lines = lines.replace(/_/g, " ");
    return lines;
}

fetch('https://poetrydb.org/random').then(r => r.text()).then(result => {
    // Result now contains the response text, do what you want...
    //Convert result to JSON object array
    var poems = '{ "poems" : ['+ result + ']}';
    var poem = JSON.parse(poems);
    console.log(poem);
    //find title, lines, and name
    var title = poem.poems[0].title.toString();
    var name = poem.poems[0].author.toString();
    var lines = poem.poems[0].lines.toString();
    var urlName = name.toLowerCase();
    urlName = urlName.replace(/ /g, "-");
    var link = "https://www.poemist.com/" + urlName;
    function getLink() {
        document.getElementById("authorLink").href = link;
    }
    getLink();
    //parse code to fit normal formatting standards
    lines = parseLines(lines);
    //display poem's title, author, and lines
    document.getElementById("title").innerHTML = title;
    document.getElementById("author").innerHTML = name;
    document.getElementById("lines").innerHTML = lines;
},
error => {
    var poem = "Could not find a poem."
    document.getElementById("title").innerHTML = poem;
}); 

//set onClick listener for Search button to be below function
document.getElementById("searchPoems").addEventListener("click", findPoem);

//function for searching for poems
function findPoem() {
    var inputPoet = document.getElementById("authorIP").value;
    var inputTitle = document.getElementById("titleIP").value;
    if (inputPoet === "" && inputTitle === ""){
        //cannot display a poem without inputs
        document.getElementById("searchMessage").innerHTML = "Please input a poet or title before searching.";
    } else if (inputPoet === "") {
        //display a poem based on the title, if possible
        var link = "https://poetrydb.org/title/" + inputTitle;
        fetch(link).then(r => r.text()).then(result => {
            //Convert result to JSON object array to check for errors
            var poems = '{ "poems" : ['+ result + ']}';
            var poem = JSON.parse(poems);
            //check to see if result has an error
            console.log(poem.poems[0]);
            console.log(typeof poem.poems[0][0] == 'undefined')
            if (typeof poem.poems[0][0] == 'undefined'){
                document.getElementById("searchMessage").innerHTML = "Please try again.";
            }
            else {
            var poems = '{ "poems" : '+ result + '}';
            var poem = JSON.parse(poems);
            //find title, lines, and name
            var title = poem.poems[0].title.toString();
            var name = poem.poems[0].author.toString();
            var lines = poem.poems[0].lines.toString();
            console.log(title);
            console.log(lines);
           //parse code to fit normal formatting standards
            lines = parseLines(lines);
            //display poem's title, author, and lines
            document.getElementById("title").innerHTML = title;
            document.getElementById("author").innerHTML = name;
            document.getElementById("lines").innerHTML = lines;
            //create link using author's name
            var urlName = name.toLowerCase();
            urlName = urlName.replace(/ /g, "-");
            var link = "https://www.poemist.com/" + urlName;
            function getLink() {
            document.getElementById("authorLink").href = link;
            }
            getLink(); 
            document.getElementById("searchMessage").innerHTML = "";
        }},
        error => {
           var poem = "Could not find a poem."
           document.getElementById("title").innerHTML = poem;
        });     
    } else if (inputTitle === "") {
        //display random poem by the provided author, if possible
        var link = "https://poetrydb.org/author,poemcount/" + inputPoet + ";10000";
        fetch(link).then(r => r.text()).then(result => {
            //Convert result to JSON object array to check for errors
            var poems = '{ "poems" : ['+ result + ']}';
            var poem = JSON.parse(poems);
            //check to see if result has an error
            if (typeof poem.poems[0][0] == 'undefined'){
                document.getElementById("searchMessage").innerHTML = "Please try again.";
            } else {
            var poems = '{ "poems" : '+ result + '}';
            var poem = JSON.parse(poems);
            var num = Math.random() * poem.poems.length;
            var intNum = ~~num;
            //find title, lines, and name
            var title = poem.poems[intNum].title.toString();
            var name = poem.poems[intNum].author.toString();
            var lines = poem.poems[intNum].lines.toString();
           //parse code to fit normal formatting standards
            lines = parseLines(lines);
            //display poem's title, author, and lines
            document.getElementById("title").innerHTML = title;
            document.getElementById("author").innerHTML = name;
            document.getElementById("lines").innerHTML = lines;
            //create link using author's name
            var urlName = name.toLowerCase();
            urlName = urlName.replace(/ /g, "-");
            var link = "https://www.poemist.com/" + urlName;
            function getLink() {
            document.getElementById("authorLink").href = link;
            }
            getLink(); 
            document.getElementById("searchMessage").innerHTML = "";
        }},
        error => {
           var poem = "Could not find a poem."
           document.getElementById("title").innerHTML = poem;
        });  
    } else {
        //use both to display specific poem, if possible
        //display a poem based on the title, if possible
        var optn = "success";
        var link = "https://poetrydb.org/title/" + inputTitle;
        fetch(link).then(r => r.text()).then(result => {
            //Convert result to JSON object array to check for errors
            var poems = '{ "poems" : ['+ result + ']}';
            var poem = JSON.parse(poems);
            //check to see if result has an error
            console.log(poem.poems.length);
            console.log(poem.poems);
            //Nothing matches title, display random poem by author
            if (typeof poem.poems[0][0] == 'undefined'){
                optn = "randAuth";
                console.log("randomauthor");
                //display random poem by the provided author, if possible
                var link = "https://poetrydb.org/author,poemcount/" + inputPoet + ";10000";
                fetch(link).then(r => r.text()).then(result => {
                    //Convert result to JSON object array to check for errors
                    var poems = '{ "poems" : ['+ result + ']}';
                    var poem = JSON.parse(poems);
                    //check to see if result has an error
                    if (poem.poems.length < 3){
                        optn = "fail";
                        document.getElementById("searchMessage").innerHTML = "Please try again.";
                    } else {
                    var poems = '{ "poems" : '+ result + '}';
                    var poem = JSON.parse(poems);
                    var num = Math.random() * poem.poems.length;
                    var intNum = ~~num;
                    //find title, lines, and name
                    var title = poem.poems[intNum].title.toString();
                    var name = poem.poems[intNum].author.toString();
                    var lines = poem.poems[intNum].lines.toString();
                //parse code to fit normal formatting standards
                    lines = parseLines(lines);
                    //display poem's title, author, and lines
                    document.getElementById("title").innerHTML = title;
                    document.getElementById("author").innerHTML = name;
                    document.getElementById("lines").innerHTML = lines;
                    //create link using author's name
                    var urlName = name.toLowerCase();
                    urlName = urlName.replace(/ /g, "-");
                    var link = "https://www.poemist.com/" + urlName;
                    function getLink() {
                    document.getElementById("authorLink").href = link;
                    }
                    getLink(); 
                    document.getElementById("searchMessage").innerHTML = "Error. Finding random poem by author.";
                } },
                error => {
                var poem = "Could not find a poem."
                document.getElementById("title").innerHTML = poem;
                });
            } else {
            var poems = '{ "poems" : '+ result + '}';
            var poem = JSON.parse(poems);
            //find title, lines, and name
            var title = poem.poems[0].title.toString();
            var name = poem.poems[0].author.toString();
            var lines = poem.poems[0].lines.toString();
            console.log(title);
            console.log(lines);
           //parse code to fit normal formatting standards
            lines = parseLines(lines);
            //display poem's title, author, and lines
            document.getElementById("title").innerHTML = title;
            document.getElementById("author").innerHTML = name;
            document.getElementById("lines").innerHTML = lines;
            //create link using author's name
            var urlName = name.toLowerCase();
            urlName = urlName.replace(/ /g, "-");
            var link = "https://www.poemist.com/" + urlName;
            //display appropriate message
            if (optn === "success") { 
                document.getElementById("searchMessage").innerHTML = "";
            } else if (optn === "randAuth") {
                document.getElementById("searchMessage").innerHTML = "Error. Finding random poem by author.";
            } else {
                document.getElementById("searchMessage").innerHTML = "Please try again.";
            }
            function getLink() {
            document.getElementById("authorLink").href = link;
            }
            getLink();
        }},
        error => {
           var poem = "Could not find a poem."
           document.getElementById("title").innerHTML = poem;
        });   
    }
}


document.getElementById("title").innerHTML = poem;