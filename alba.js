// objects
var container;
var scene, camera, renderer;
var cubeMaterial, cube;
var sphereMaterial, sphere;
var particle1, particle2, particle3;
var setLight, light1, light2, light3;

// manipulations
var targetRotationY = 0;
var targetRotationYOnMouseDown = 0;
var targetRotationX = 0;
var targetRotationXOnMouseDown = 0;

// inputs
var mouseX = 0;
var mouseXOnMouseDown = 0;
var mouseY = 0;
var mouseYOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
	// location
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	// shot
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 1000 );
	camera.position.set( 0, 0, 150 );

	// actors
	cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, overdraw: true } );
	sphereMaterial = new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, overdraw: true } );

	cube = new THREE.Mesh(
		new THREE.CubeGeometry( 75,75,75 ),
		cubeMaterial );
	scene.add( cube );

	sphere = new THREE.Mesh(
		new THREE.SphereGeometry( 50,64,64 ),
		sphereMaterial );
	scene.add( sphere );	

	// lights
	setLight = new THREE.DirectionalLight( 0xffffff, 0.15 );
	setLight.position.set( 0, 200, 0 );
	scene.add( setLight );

	light1 = new THREE.PointLight( 0xff0040, 5, 100 );
	scene.add( light1 );

	light2 = new THREE.PointLight( 0x0040ff, 5, 100 );
	scene.add( light2 );

	light3 = new THREE.PointLight( 0x80ff80, 5, 100 );
	scene.add( light3 );

	// gaffers
	particle1Material = new THREE.MeshLambertMaterial( { emissive: 0xff0040, shading: THREE.FlatShading, wireframe: true, overdraw: true } );
	particle2Material = new THREE.MeshLambertMaterial( { emissive: 0x0040ff, shading: THREE.FlatShading, wireframe: true, overdraw: true } );
	particle3Material = new THREE.MeshLambertMaterial( { emissive: 0x80ff80, shading: THREE.FlatShading, wireframe: true, overdraw: true } );

	particle1 = new THREE.Mesh(
		new THREE.TetrahedronGeometry( 2,0 ),
		particle1Material );
	scene.add( particle1 );

	particle2 = new THREE.Mesh(
		new THREE.TetrahedronGeometry( 2,0 ),
		particle2Material );
	scene.add( particle2 );

	particle3 = new THREE.Mesh(
		new THREE.TetrahedronGeometry( 2,0 ),
		particle3Material );
	scene.add( particle3 );

	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	// action
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	// refresh
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onDocumentMouseDown( event ) {
	// acting
	event.preventDefault();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );

	mouseXOnMouseDown = event.clientX - windowHalfX;
	mouseYOnMouseDown = event.clientY - windowHalfY;
	targetRotationYOnMouseDown = targetRotationY;
	targetRotationXOnMouseDown = targetRotationX;
}

function onDocumentMouseMove( event ) {
	// acting
	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;

	targetRotationY = targetRotationYOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
	targetRotationX = targetRotationXOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.02;
}

function onDocumentMouseUp( event ) {
	// acting
	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentMouseOut( event ) {
	// acting
	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
}

function onDocumentTouchStart( event ) {
	// acting
	if ( event.touches.length == 1 ) {
		event.preventDefault();

		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
		targetRotationYOnMouseDown = targetRotationY;

		mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
		targetRotationXonMouseDown = targetRotationX;
	}
}

function onDocumentTouchMove( event ) {
	// acting
	if ( event.touches.length == 1 ) {
		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		targetRotatioY = targetRotationYOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

		mouseY = event.touches[ 0 ].pageY - windowHalfY;
		targetRotatioX = targetRotationXOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.05;
	}
}

function animate() {
	// film
	requestAnimationFrame( animate );
	render();
}

function render() {
	// drama
	var time = Date.now() * 0.0005;

	particle1.position.x = Math.sin( time * 0.7 ) * 80;
	particle1.position.y = Math.cos( time * 0.5 ) * 80;
	particle1.position.z = Math.cos( time * 0.3 ) * 100;

	light1.position.x = particle1.position.x;
	light1.position.y = particle1.position.y;
	light1.position.z = particle1.position.z;

	particle1.rotation.x += 0.01;
	particle1.rotation.y += 0.01;
	particle1.rotation.z += 0.01;

	particle2.position.x = Math.cos( time * 0.3 ) * 100;
	particle2.position.y = Math.sin( time * 0.5 ) * 80;
	particle2.position.z = Math.sin( time * 0.7 ) * 80;

	light2.position.x = particle2.position.x;
	light2.position.y = particle2.position.y;
	light2.position.z = particle2.position.z;

	particle2.rotation.x += 0.01;
	particle2.rotation.y += 0.01;
	particle2.rotation.z += 0.01;

	particle3.position.x = Math.sin( time * 0.7 ) * 80;
	particle3.position.y = Math.cos( time * 0.3 ) * 100;
	particle3.position.z = Math.sin( time * 0.5 ) * 80;

	light3.position.x = particle3.position.x;
	light3.position.y = particle3.position.y;
	light3.position.z = particle3.position.z;

	particle3.rotation.x += 0.01;
	particle3.rotation.y += 0.01;
	particle3.rotation.z += 0.01;
	
	cube.rotation.x += ( targetRotationX - cube.rotation.x ) * 0.005;
	cube.rotation.y += ( targetRotationY - cube.rotation.y ) * 0.005;
	//cube.rotation.z = cube.rotation.z + ( targetRotationX - cube.rotation.x ) * 0.0025 + ( targetRotationY - cube.rotation.y ) * 0.0025;

	sphere.rotation.x += (targetRotationX - sphere.rotation.x) * 0.005;
	sphere.rotation.y += (targetRotationY - sphere.rotation.y) * 0.005;
	//sphere.rotation.z = cube.rotation.z + (targetRotationX - sphere.rotation.x) * 0.0025 + ( targetRotationY - cube.rotation.y ) * 0.0025;

	renderer.render( scene, camera );
}