//from https://stackoverflow.com/questions/14446447/how-to-read-a-local-text-file
function getFillerData(filename) {
	let file = filename + '.txt';
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, true);
	rawFile.responseType = 'text';
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4) {
			if (rawFile.status === 200 || rawFile.status == 0) {
				var allText = rawFile.responseText;
				fillOptions(allText.split(/\r?\n/), filename);
			}
		}
	}
	rawFile.send(null);
}

function fillOptions(array, optName) {
	optList = document.getElementById("options");
	options = "";
	for (let i = 0; i < array.length; i++) {
		options = options + "<option>" + array[i] + "</option>";
	}
	optList.innerHTML = options;
	optList.name = optName;
}

function pdfPrint() {
	document.getElementById('printbutton').style = "display:none;";
	window.print();
	return false;

}

function addFillerClickListener() {
	let elem = document.getElementsByClassName("filler");
	[].forEach.call(elem, function (el) {
		el.addEventListener("click", function (event) {
			let cm = document.getElementById("fillerPopup");
			cm.style.top = (event.clientY + cm.offsetHeight > window.innerHeight) ? window.innerHeight - cm.offsetHeight + "px" : event.clientY + "px";
			cm.style.left = (event.clientX + cm.offsetWidth > window.innerWidth) ? window.innerWidth - cm.offsetWidth + "px" : event.clientX + "px";
			cm.classList.add("active");
			getFillerData(el.parentNode.id);
		});
	});
}
function dateTimeFiller() {
	let today = new Date();
	let dateTime = today.toLocaleString("ru", { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
	let onlyDate = today.toLocaleString("ru", { year: 'numeric', month: 'numeric', day: 'numeric' });
	let timeFillers = document.getElementsByName("datetime");
	let dateFillers = document.getElementsByName("onlydate");
	for (let i = 0; i < timeFillers.length; i++) {
		timeFillers[i].innerHTML = dateTime;
	}
	for (let i = 0; i < dateFillers.length; i++) {
		dateFillers[i].innerHTML = onlyDate;
	}
}
addFillerClickListener();
document.getElementById('content').contentEditable = 'true';
dateTimeFiller();