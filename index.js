//crée un systeme solaire en three.js

//crée la scene
const scene = new THREE.Scene();

//crée la camera
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

//crée le renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//donner au fond de la scene une image
const loader = new THREE.TextureLoader();
const texture = loader.load(
	"https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Solarsystemscope_texture_8k_stars.jpg/1600px-Solarsystemscope_texture_8k_stars.jpg?20201026210204"
);
scene.background = texture;

//crée le soleil et le definir comme le point central de la scène

sun = new THREE.Mesh(
	new THREE.SphereGeometry(1.2, 32, 32),
	//donner la texture au soleil
	new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load(
			"https://upload.wikimedia.org/wikipedia/commons/c/cb/Solarsystemscope_texture_2k_sun.jpg"
		)
	})
);
sun.position.set(0, 0, 0);

//crée les 5 premiere planète

const mercury = new THREE.Mesh(
	new THREE.SphereGeometry(0.1, 32, 32),
	new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load(
			"https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Solarsystemscope_texture_2k_mercury.jpg/1600px-Solarsystemscope_texture_2k_mercury.jpg?20201026210257"
		)
	})
);
mercury.position.set(1.5, 0, 0);

const venus = new THREE.Mesh(
	new THREE.SphereGeometry(0.2, 32, 32),
	new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load(
			"https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Solarsystemscope_texture_4k_venus_atmosphere.jpg/1600px-Solarsystemscope_texture_4k_venus_atmosphere.jpg?20201026210237"
		)
	})
);
venus.position.set(2.5, 0, 0);

const earth = new THREE.Mesh(
	new THREE.SphereGeometry(0.2, 32, 32),
	new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load(
			"https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Solarsystemscope_texture_8k_earth_daymap.jpg/1600px-Solarsystemscope_texture_8k_earth_daymap.jpg?20201026210214"
		)
	})
);

earth.position.set(3.3, 0, 0);
//crée la lune
const moon = new THREE.Mesh(
	new THREE.SphereGeometry(0.05, 32, 32),
	new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load(
			"https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Moon_texture.jpg/1600px-Moon_texture.jpg?20211211163514"
		)
	})
);

const mars = new THREE.Mesh(
	new THREE.SphereGeometry(0.15, 32, 32),
	new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load(
			"https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Solarsystemscope_texture_2k_mars.jpg/1600px-Solarsystemscope_texture_2k_mars.jpg?20201026210255"
		)
	})
);

mars.position.set(4, 0, 0);

const jupiter = new THREE.Mesh(
	new THREE.SphereGeometry(0.5, 32, 32),
	new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load(
			"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Solarsystemscope_texture_8k_jupiter.jpg/1600px-Solarsystemscope_texture_8k_jupiter.jpg?20201026210228"
		)
	})
);
jupiter.position.set(5, 0, 0);

const saturn = new THREE.Mesh(
	new THREE.SphereGeometry(0.5, 32, 32),
	new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load(
			"https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Solarsystemscope_texture_2k_saturn.jpg/1600px-Solarsystemscope_texture_2k_saturn.jpg?20201026210300"
		)
	})
);
saturn.position.set(8, 0, 0);

//faire l'anneaux avec un tore pour saturne
const ring = new THREE.Mesh(
	new THREE.TorusGeometry(0.7, 0.1, 2, 100),
	new THREE.MeshBasicMaterial({
		map: new THREE.TextureLoader().load(
			"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Solarsystemscope_texture_2k_saturn_ring_alpha.png/1600px-Solarsystemscope_texture_2k_saturn_ring_alpha.png?20201026210312"
		)
	})
);
//

//ajouter les planète a la scene
scene.add(sun);
scene.add(mercury);
scene.add(venus);
scene.add(earth);
scene.add(moon);
scene.add(mars);
scene.add(jupiter);
scene.add(saturn);
scene.add(ring);

function animate() {
	//faire tourner les planètes autour du soleil a la vitesse réelle
	mercury.position.x = sun.position.x + 1.5 * Math.cos(Date.now() / 2000);
	mercury.position.z = sun.position.z + 1.5 * Math.sin(Date.now() / 2000);

	venus.position.x = sun.position.x + 2.5 * Math.cos(Date.now() / 3000);
	venus.position.z = sun.position.z + 2.5 * Math.sin(Date.now() / 3000);

	earth.position.x = sun.position.x + 3.3 * Math.cos(Date.now() / 4000);
	earth.position.z = sun.position.z + 3.3 * Math.sin(Date.now() / 4000);

	mars.position.x = sun.position.x + 4 * Math.cos(Date.now() / 5000);
	mars.position.z = sun.position.z + 4 * Math.sin(Date.now() / 5000);

	jupiter.position.x = sun.position.x + 5 * Math.cos(Date.now() / 6000);
	jupiter.position.z = sun.position.z + 5 * Math.sin(Date.now() / 6000);

	saturn.position.x = sun.position.x + 6 * Math.cos(Date.now() / 7000);
	saturn.position.z = sun.position.z + 6 * Math.sin(Date.now() / 7000);

	//faire tourner la lune autour de la terre
	moon.position.x = earth.position.x + 0.3 * Math.cos(Date.now() / 1000);
	moon.position.z = earth.position.z + 0.3 * Math.sin(Date.now() / 1000);

	//faire tourner l'anneaux autour de saturne
	ring.position.x = saturn.position.x;
	ring.position.z = saturn.position.z;
	ring.rotation.x += 0.01;

	//faire tourner les planète sur elle meme
	mercury.rotation.y += 0.01;
	venus.rotation.y += 0.01;
	earth.rotation.y += 0.01;
	mars.rotation.y += 0.01;
	jupiter.rotation.y += 0.01;
	sun.rotation.y += 0.01;

	//positionner la camera pour qu'elle regarde le soleil en face
	camera.position.x = sun.position.x;
	camera.position.y = sun.position.y + 5;
	camera.position.z = sun.position.z + 4;
	camera.lookAt(sun.position);

	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

animate();
