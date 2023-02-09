var complete = new Boolean(true);
var exerciseLinks = document.getElementsByTagName("a");
for(let j=2; j<exerciseLinks.length; j++) {
	const exercisehtml = (await (await fetch(exerciseLinks[j].href)).text());
	const exerciseDoc = new DOMParser().parseFromString(exercisehtml, 'text/html');
	let links = exerciseDoc.getElementsByTagName("a");
	for(let i=2; i<links.length; i++) {
		const html = (await (await fetch(links[i].href)).text());
		const doc = new DOMParser().parseFromString(html, 'text/html');
		if (doc.getElementsByClassName("value")[0].getAttribute("data-type")==="none") {
			complete = false;
			console.log("not complete: " + links[i].href);	
		}
	}
}
console.log(complete);