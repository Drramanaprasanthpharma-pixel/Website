const container = document.getElementById('capsule-canvas');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Lighting
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);
const point = new THREE.PointLight(0x38bdf8, 1.2);
point.position.set(5, 5, 5);
scene.add(point);
const point2 = new THREE.PointLight(0x6366f1, 1);
point2.position.set(-5, -3, 4);
scene.add(point2);

// Capsule (two halves = medicine pill)
const group = new THREE.Group();

const half1 = new THREE.Mesh(
  new THREE.CapsuleGeometry(1, 2, 8, 24),
  new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.3, roughness: 0.25 })
);
group.add(half1);

// Cross highlight ring to sell the "capsule" look
const ring = new THREE.Mesh(
  new THREE.TorusGeometry(1.01, 0.05, 16, 100),
  new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.5, roughness: 0.2 })
);
ring.rotation.x = Math.PI / 2;
group.add(ring);

scene.add(group);

function animate() {
  requestAnimationFrame(animate);
  group.rotation.y += 0.01;
  group.rotation.x = Math.sin(Date.now() * 0.0006) * 0.3;
  renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
  const w = container.clientWidth, h = container.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});
