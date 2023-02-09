var xarr = document.getElementsByTagName("tr");
var x = [];
for (var i = 0; i < xarr.length; i++) {
    x.push(xarr[i]);
}
for (a of x) {
    console.log(a);
}
console.log(window.location.href);
var arr = [];
var incomplete = 0;
var isvalid = true;
console.log(x);
let counter = 0;
const promises = x.map(async row => {
    var starting = window.location.href;
    let next = x[counter].getElementsByTagName("span")[0].textContent;
    console.log(counter + ": " + next);
    var response = await fetch(window.location.href + ("/" + next + "/"));
    switch (response.status) {
        // status "OK"
        case 200:
            var template = await response.text();
            splitted = template.split("<td");
            console.log((template.split("<td").length-1)/(template.split("<tr").length-1));
            if ((template.split("<td").length-1)/(template.split("<tr").length-1) <= 3) {
                isvalid = false;
                break;
            }
            str = splitted[3].split(">")[1].split("<")[0];
            if (str.length == 0) {
                console.log("INCOMPLETE!");
                incomplete++;
            }
            break;
        // status "Not Found"
        case 404:
            console.log('Not Found');
            break;
    }
    counter++;
});
await Promise.all(promises);
if (!isvalid) {
    console.log("NOT VALID!");
} else {
    console.log("IS VALID");
    console.log("DONE");
    console.log("NUMBER INCOMPLETE: " + incomplete);
} 