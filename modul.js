import * as THREE from '../node_modules/three/build/three.module.js';
import { TransformControls } from '../node_modules/three/examples/jsm/controls/TransformControls.js';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from '../node_modules/three/examples/jsm/loaders/OBJLoader.js';
import { Raycaster } from '../node_modules/three/src/core/Raycaster.js';

var canvasDiv;
var camera, scene, raycaster, renderer;
var control;
var orbit;
var loader; //obj loader
var loaderId; //id a betöltéshez
var projektLoaderId; //id a projektbetöltéshez
var objectEleresiUtvonal; //betöltéshez az út
var objectMaterialEleresiUtvonal; //betöltéshez az út
var objectName; // betöltéshez a bútor neve
var mouse;
var butorok; //global scene.childeren

window.onload = function () {
	init();
}

//INIT////////////////////////////////////////////////////////////////////////////////////////////////
function init() {

	//raycaster
	raycaster = new THREE.Raycaster();

	//egér
	mouse = new THREE.Vector2();

	//renderer
	renderer = new THREE.WebGLRenderer({ antialias: true });

	//canvas
	var canvasDiv = document.getElementById('canvasDiv');
	canvasDiv.appendChild(renderer.domElement);

	//kamera
	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(7, 7, 7);
	camera.lookAt(0, 0, 0);

	//jelenet
	scene = new THREE.Scene();
	scene.background = new THREE.Color(0x4a4a4a);

	//betöltő
	loader = new OBJLoader();

	//fény
	scene.add(new THREE.AmbientLight(0x505050));
	var light = new THREE.SpotLight(0xffffff, 1.5);
	light.position.set(0, 500, 2000);
	light.angle = Math.PI / 9;
	light.castShadow = true;
	light.shadow.camera.near = 1000;
	light.shadow.camera.far = 4000;
	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;
	scene.add(light);

	//myObject.name = "objectName"; név
	//var object = scene.getObjectByName("objectName"); getter
	//var object = scene.getObjectById(4);
	//scene.remove(object); törlés

	//renderer beállítások
	//labert material miatt kell lámpa meg árnyékok
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;

	control = new TransformControls(camera, renderer.domElement);
	//minden eseményváltozásra fusson le a render
	control.addEventListener('change', render);
	//legyen tiltva az orbit működése ameddig a control húzást érzékel
	control.addEventListener('dragging-changed', function (event) {
		orbit.enabled = !event.value;
	});
	scene.add(control);

	window.addEventListener('keydown', function (event) {
		switch (event.keyCode) {
			case 48: // 0
				control.setMode("translate");
				break;
			case 49: // 1
				control.setMode("rotate");
				break;
			case 50: // 2
				control.setMode("scale");
				break;
		}
	});

	orbit = new OrbitControls(camera, renderer.domElement);
	//minden eseményváltozásra fusson le a render
	orbit.addEventListener('change', render);
	//frissítse az orbit helyzetét
	orbit.update();


	window.addEventListener('resize', onWindowResize, false);
	document.addEventListener('mousedown', onMouseDown, false);
	window.requestAnimationFrame(render);

	//alap
	alap();


}
//INIT VÉGE//////////////////////////////////////////////////////////////////////

//reszponzívitásért felelős
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
	render();
}

function onMouseDown(event) {
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

function render() {
	butorok = scene.children;
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(scene.children);
	for (var i = 0; i < intersects.length; i++) {
		if (intersects[i].object.name.includes('inner')) {
			control.attach(intersects[i].object);
			break;
		}

	}
	renderer.render(scene, camera);
}

//ALAP, 3db lap amin textúra van
function alap() {

	var geometry = new THREE.PlaneGeometry(5, 5, 32);
	var texture = new THREE.TextureLoader().load('texture/padlo.jpg');
	var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
	var mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.x = 1.57; //90 fok
	mesh.position.set(2.5, 0, 2.5);
	mesh.name = 'alap';
	scene.add(mesh);

	geometry = new THREE.PlaneGeometry(5, 5, 32);
	texture = new THREE.TextureLoader().load('texture/fal.jpg');
	material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
	mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.y = 1.57; //90 fok
	mesh.position.set(0, 2.5, 2.5);
	mesh.name = 'alap';
	scene.add(mesh);

	geometry = new THREE.PlaneGeometry(5, 5, 32);
	texture = new THREE.TextureLoader().load('texture/fal.jpg');
	material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(2.5, 2.5, 0);
	mesh.name = 'alap';
	scene.add(mesh);
}



//INFO//////////////////////////////////////////////////////////////////////////////////
document.getElementById('infoId').onclick = function () {
	//template string
	alert(`Szia!

Üdvözöllek a Truebox dobozban ahol összeállíthatod a saját megálmodott szobád!

0 - mozgatás
1 - forgatás
2 - méretezés

Az 'Új Projekt' gombbal hozol létre üres szobát.

A 'Bútorválasztó'-ra kattintva nyitsz meg egy bútorokkal teli könyvtárat`);

}

//EXPORTKÉP//////////////////////////////////////////////////////////////////////////////
var exportButton = document.getElementById('exportButton');
exportButton.addEventListener('click', function () {

	var rendererExport = new THREE.WebGLRenderer({ antialias: true });
	rendererExport.setSize(window.innerWidth, window.innerHeight);

	var a = document.createElement("a");

	rendererExport.render(scene, camera);
	const dataURL = rendererExport.domElement.toDataURL('image/png');
	a.href = dataURL;
	a.download = "export.png";
	a.click();
	//document.body.removeChild(a);

});

//MENTÉS//////////////////////////////////////////////////////////////////////////////////
function getFurnitureDataJson() {
	var objectArray = [];
	for (var i = 0; i < butorok.length; i++) {
		if (butorok[i].name.includes("inner")) {
			var actualName = butorok[i].name.replace('inner', '');
			objectArray.push({
				x: butorok[i].position.x,
				y: butorok[i].position.y,
				z: butorok[i].position.z,
				xr: butorok[i].rotation.x,
				yr: butorok[i].rotation.y,
				zr: butorok[i].rotation.z,
				scale: butorok[i].scale.x,
				furniture_name: actualName
			});
		}
	}
	var myJSON = JSON.stringify(objectArray);
	console.log(objectArray);
	//console.log(myJSON);
	return myJSON;
}


$("#mentesButton").click(function (event) {
	event.preventDefault();
	$.ajax({
		url: 'save.php',
		method: 'POST',
		data: {
			action: 'save',
			furnituresJsonData: getFurnitureDataJson()
		},
		success: function (data) {
			console.log("Ez az amit visszaad: " + data);
			$("#kiiratashelye").html(data);

		},
		error: function (jqxhr, status, exception) {
			console.log('Hiba: ', exception);
		}
	});
});

//projektNévadás
$("#projectNameButton").click(function (event) {
	event.preventDefault();
	var input = $("#projectNameInput").val();
	$.ajax({
		url: 'save.php',
		method: 'POST',
		data: {
			saveNameAction: 'saveName',
			projectName: input
		},
		success: function (data) {
			console.log("Ez az amit visszaad: " + data);
			$("#projektNevHelye").html("Projektnév: " + data);
		},
		error: function (jqxhr, status, exception) {
			console.log('Hiba: ', exception);
		}
	});
});

//BETÖLTÉS///////////////////////////////////////////////////////////////
//kijelölés
document.addEventListener('click', function (event) {
	var img = document.getElementById('kattinthatoKepek');
	var kattinthatoKepek = img.getElementsByTagName("img");
	for (var i = 0; i < kattinthatoKepek.length; i++) {
		var kattintvaLettE = kattinthatoKepek[i].contains(event.target);
		if (kattintvaLettE) {
			//ajax!!!
			kattinthatoKepek[i].style.border = '5px solid lime';
			loaderId = kattinthatoKepek[i].nextElementSibling.value;
			console.log('kattban');
			console.log(loaderId);
		} else if (!kattintvaLettE) {
			kattinthatoKepek[i].style.border = 'none';
		}
	}
});

//projekt kijelölés
document.addEventListener('click', function (event) {
	var img = document.getElementById('projektLista');
	var projektLista = img.getElementsByClassName("letter");
	for (var i = 0; i < projektLista.length; i++) {
		var kattintvaLettE = projektLista[i].contains(event.target);
		if (kattintvaLettE) {
			//ajax!!!
			projektLista[i].style.backgroundColor = 'lime';
			projektLoaderId = projektLista[i].nextElementSibling.value;
			console.log('kattban');
			console.log(projektLoaderId);
		} else if (!kattintvaLettE) {
			projektLista[i].style.backgroundColor = 'white';
		}
	}
});


//ez a button végzi a bútor betöltést
var loaderButton = document.getElementById('loaderButton');
loaderButton.addEventListener('click', () => {
	if (loaderId == null) {
		alert("Jelölj ki egy képet!");
		console.log("félrefut");
	} else {
		console.log("fv-ben");
		console.log(loaderId);
		$.ajax({
			url: 'load.php',
			method: 'POST',
			data: {
				loaderId: loaderId,
				loaderAction: 'load'
			},
			success: function (data) {
				console.log("Ez az amit visszaad: " + data);
				var obj = JSON.parse(data);
				console.log(obj[0]);
				//betölt
				objectName = obj[0];
				objectEleresiUtvonal = obj[1];
				objectMaterialEleresiUtvonal = obj[2];
				betolto(objectEleresiUtvonal, objectMaterialEleresiUtvonal, objectName);
			},
			error: function (jqxhr, status, exception) {
				console.log('Hiba: ', exception);
			}
		});
	}
});

//projektbetöltés
var projectBetoltesButton = document.getElementById('projectBetoltesButton');
projectBetoltesButton.addEventListener('click', () => {
	if (projektLoaderId == null) {
		alert("Jelölj ki projektet!");
		console.log("félrefut");
	} else {
		console.log("fv-ben");
		console.log(projektLoaderId);
		$.ajax({
			url: 'load.php',
			method: 'POST',
			data: {
				projektLoaderId: projektLoaderId,
				projectLoaderAction: 'projectload'
			},
			success: function (data) {
				console.log("Ez az amit visszaad: " + data);
				/*$("#kiiratashelye").html(data);*/
				var obj = JSON.parse(data);
				console.log(obj);
				var projectName = obj[0][0].project_name;
				$("#projektNevHelye").html("Projektnév: " + projectName);

				for (var i = 0; i < obj.length; i++) {

					objectName = obj[i].furniture_name;
					objectEleresiUtvonal = obj[i][0].furniture_path;
					objectMaterialEleresiUtvonal = obj[i][0].furniture_material_path;
					var x = obj[i][0].x;
					var y = obj[i][0].y;
					var z = obj[i][0].z;
					var xr = obj[i][0].xr;
					var yr = obj[i][0].yr;
					var zr = obj[i][0].zr;
					var scale = obj[i][0].scale;
					betolto(objectEleresiUtvonal,
						objectMaterialEleresiUtvonal,
						objectName,
						x, y, z, xr, yr, zr, scale
					);
				}
			},
			error: function (jqxhr, status, exception) {
				console.log('Hiba: ', exception);
			}
		});
	}
});

function betolto(objectEleresiUtvonal, objectMaterialEleresiUtvonal, objectName, x = 2.5, y = 0, z = 2.5, xr = 0, yr = 0, zr = 0, scale = 2) {
	// függvény ami paramétereket vár
	loader.load(
		//1. elérés
		objectEleresiUtvonal,

		//2. függvény
		//a meghívás után itt konfigurálható
		function (object) {

			//material-t ad neki
			object.traverse(function (child) {
				if (child instanceof THREE.Mesh) {
					var texture = new THREE.TextureLoader().load(objectMaterialEleresiUtvonal);
					var material = new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide });
					child.material = material;
				}
			});
			//ez lesz a mesh mivel az object egy Group típus
			var mesh = object.children[0];

			//pozíció
			mesh.position.set(x, y, z);
			document.getElementById('inputX').value = mesh.position.x;
			document.getElementById('inputY').value = mesh.position.y;
			document.getElementById('inputZ').value = mesh.position.z;

			//forgás
			mesh.rotation.set(xr, yr, zr);

			//scale
			mesh.scale.set(scale, scale, scale);
			document.getElementById('inputScale').value = mesh.scale.x;

			//MENTÉSHEZ!!!
			mesh.name = "inner" + objectName;

			//jelenethez adás
			scene.add(mesh);

			//kijelölés
			control.attach(mesh);

		},
		//amíg tölt a file ez történik
		function (xhr) {
			console.log((xhr.loaded / xhr.total * 100) + '% betöltve');
		},
		//hibakezelés
		function (error) {
			console.log('Hiba: ' + error);
		}
	);
}

