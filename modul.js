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
var objectEleresiUtvonal; //betöltéshez az út
var objectMaterialEleresiUtvonal; //betöltéshez az út
var objectName; // betöltéshez a bútor neve
var mouse = new THREE.Vector2(), INTERSECTED;
var butorok; //global scene.childeren

window.onload = function () {
	init();
}

//INIT////////////////////////////////////////////////////////////////////////////////////////////////
function init() {

	//raycaster
	raycaster = new THREE.Raycaster();

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

	//alap kocka a teszteléshez
	var geometry = new THREE.BoxBufferGeometry(1, 1, 1);
	var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));
	object.castShadow = true;
	object.receiveShadow = true;
	object.position.set(0, 0, 0);
	object.name = "tesztKocka";

	//alap kocka jelenethez adása
	scene.add(object);


	//myObject.name = "objectName"; név
	//var object = scene.getObjectByName("objectName"); getter
	//var object = scene.getObjectById(4);
	//scene.remove(object); törlés


	//axes, segít átlátni a projektet
	//var axesHelper = new THREE.AxesHelper(5);
	//scene.add(axesHelper);

	//renderer beállítások
	//labert material miatt kell lámpa meg árnyékok
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFShadowMap;

	//alap
	alap();

	orbit = new OrbitControls(camera, renderer.domElement);
	orbit.update();
	orbit.addEventListener('change', render);

	control = new TransformControls(camera, renderer.domElement);
	control.addEventListener('change', render);
	control.addEventListener('dragging-changed', function (event) {
		orbit.enabled = !event.value;
	});
	scene.add(control);
	control.attach(object);

	//RESIZE
	window.addEventListener('resize', onWindowResize, false);
	window.addEventListener('keydown', function (event) {
		switch (event.keyCode) {
			case 17: // Ctrl
				control.setTranslationSnap(100);
				control.setRotationSnap(THREE.Math.degToRad(15));
				break;
			case 87: // W
				control.setMode("translate");
				break;
			case 69: // E
				control.setMode("rotate");
				break;
			case 82: // R
				control.setMode("scale");
				break;
			case 187:
			case 107: // +, =, num+
				control.setSize(control.size + 0.1);
				break;
			case 189:
			case 109: // -, _, num-
				control.setSize(Math.max(control.size - 0.1, 0.1));
				break;
			case 88: // X
				control.showX = !control.showX;
				break;
			case 89: // Y
				control.showY = !control.showY;
				break;
			case 90: // Z
				control.showZ = !control.showZ;
				break;
			case 32: // Spacebar
				control.enabled = !control.enabled;
				break;
		}
	});

	window.addEventListener('keyup', function (event) {
		switch (event.keyCode) {
			case 17: // Ctrl
				control.setTranslationSnap(null);
				control.setRotationSnap(null);
				break;
		}
	});


	document.addEventListener('mousedown', onMouseDown, false);
	window.requestAnimationFrame(render);



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
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(scene.children);
	butorok = scene.children;
	/*
	if (intersects.length > 0) {
		if (INTERSECTED != intersects[0].object) {
			if (INTERSECTED) {
				control.detach(INTERSECTED);
			}
			INTERSECTED = intersects[0].object; 
			control.detach(INTERSECTED.attached);
			control.attach(INTERSECTED);

			//////////////////////////////////////////
			butorok = scene.children;
			console.log(scene.children);
			console.log(butorok);
			console.log(butorok.length);
		}
	} else {
		if (INTERSECTED){ 
			control.detach(INTERSECTED);
		}
		INTERSECTED = null;
	}*/
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
	scene.add(mesh);

	geometry = new THREE.PlaneGeometry(5, 5, 32);
	texture = new THREE.TextureLoader().load('texture/fal.jpg');
	material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
	mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.y = 1.57; //90 fok
	mesh.position.set(0, 2.5, 2.5);
	scene.add(mesh);

	geometry = new THREE.PlaneGeometry(5, 5, 32);
	texture = new THREE.TextureLoader().load('texture/fal.jpg');
	material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
	mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(2.5, 2.5, 0);
	scene.add(mesh);
}



//INFO//////////////////////////////////////////////////////////////////////////////////
document.getElementById('infoId').onclick = function () {
	//template string
	alert(`Szia!

Üdvözöllek a Truebox dobozban ahol összeállíthatod a saját megálmodott szobád!

W - mozgatás
E - forgatás
R - méretezés
+ - segéd nagyítás
- - segéd kicsinyítés
Tartsd lenyomva a "Ctrl" billenytűt a tér mozgatásához
X - nyíl látszik/nem látszik
Y - nyíl látszik/nem látszik
Z - nyíl látszik/nem látszik | "Spacebar" segéd tiltás

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

//BETÖLTÉS///////////////////////////////////////////////////////////////
//projekt betöltés
$("#projectBetoltes").click(function (event) {
	event.preventDefault();
	console.log('valami');
	var loadId = $('#loadId').val();
	$.ajax({
		url: 'load.php',
		method: 'POST',
		data: {
			action: 'load',
			loadId: loadId
		},
		success: function (data) {
			console.log("Ez az amit visszaad: " + data);
			//fel kell dolgozni a tömböt
			var adatTomb = data;

			//objectEleresiUtvonal = ;
			//objectMaterialEleresiUtvonal = ;
			//objectName = ;
			//betolto(objectEleresiUtvonal, objectMaterialEleresiUtvonal, objectName);
			objectEleresiUtvonal = null;
			objectMaterialEleresiUtvonal = null;
			objectName = null;
		},
		error: function (jqxhr, status, exception) {
			console.log('Hiba: ', exception);
		}
	});
});

//kijelölés
document.addEventListener('click', function (event) {
	var img = document.getElementById('kattinthatoKepek');
	var kattinthatoKepek = img.getElementsByTagName("img");
	for (var i = 0; i < kattinthatoKepek.length; i++) {
		var kattintvaLettE = kattinthatoKepek[i].contains(event.target);
		if (kattintvaLettE) {
			kattinthatoKepek[i].style.border = '5px solid lime';
		}
	}
});

//kijelölés törlése
document.addEventListener('click', function (event) {
	var img = document.getElementById('kattinthatoKepek');
	var kattinthatoKepek = img.getElementsByTagName("img");
	for (var i = 0; i < kattinthatoKepek.length; i++) {
		var kattintvaLettE = kattinthatoKepek[i].contains(event.target);
		if (!kattintvaLettE) {
			kattinthatoKepek[i].style.border = 'none';
		}
	}
});

//ez a button végzi a betöltést
document.getElementById("loaderButton").onclick = function () {
	if (objectEleresiUtvonal == null) {
		alert("Jelölj ki egy képet!");
	} else {
		//függvény
		betolto(objectEleresiUtvonal, objectMaterialEleresiUtvonal, objectName);

		//biztonság kedvéért
		objectEleresiUtvonal = null;
		objectMaterialEleresiUtvonal = null;
		objectName = null;

		//alert
		alert("Sikeresen hozzáadva!");
	}
}

function betolto(objectEleresiUtvonal, objectMaterialEleresiUtvonal, objectName) {
	// függvény ami paramétereket vár
	loader.load(
		//1. elérés
		objectEleresiUtvonal,

		//2. függvény
		//a meghívás után itt konfigurálható
		function (object) {

			//pozíció
			object.position.set(2.5, 0, 2.5);
			document.getElementById('inputX').value = object.position.x;
			document.getElementById('inputY').value = object.position.y;
			document.getElementById('inputZ').value = object.position.z;

			//scale
			object.scale.set(2, 2, 2);
			document.getElementById('inputScale').value = object.scale.x;

			//material-t ad neki
			object.traverse(function (child) {
				if (child instanceof THREE.Mesh) {
					var texture = new THREE.TextureLoader().load(objectMaterialEleresiUtvonal);
					var material = new THREE.MeshLambertMaterial({ map: texture, side: THREE.DoubleSide });
					child.material = material;
				}
			});

			//MENTÉSHEZ!!!
			object.name = "inner" + objectName;

			//jelenethez adás
			scene.add(object);

			//kijelölés
			control.detach(INTERSECTED);
			control.attach(object);
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

