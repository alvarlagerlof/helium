import "./style.css";

import Scene from "./core/scene";

document.addEventListener('DOMContentLoaded', (_) => {
    const sc = new Scene();
    sc.setup();
});

//import VoxelWorld from "./core/voxel-world.js"

// function main() {
//     const canvas = document.querySelector('#c');
//     const renderer = new THREE.WebGLRenderer({
//         canvas
//     });

//     const cellSize = 16;

//     const fov = 75;
//     const aspect = 2; // the canvas default
//     const near = 0.1;
//     const far = 1000;
//     const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
//     camera.position.set(-cellSize * .3, cellSize * .8, -cellSize * .3);

//     const controls = new THREE.OrbitControls(camera, canvas);
//     controls.target.set(cellSize / 2, cellSize / 3, cellSize / 2);
//     controls.update();

//     const scene = new THREE.Scene();
//     scene.background = new THREE.Color('lightblue');

//     function addLight(x, y, z) {
//         const color = 0xFFFFFF;
//         const intensity = 1;
//         const light = new THREE.DirectionalLight(color, intensity);
//         light.position.set(x, y, z);
//         scene.add(light);
//     }
//     addLight(-1, 2, 4);
//     addLight(1, -1, -2);

//     const loader = new THREE.TextureLoader();
//     const texture = loader.load('../src/resources/flourish-cc-by-nc-sa.png', render);
//     texture.magFilter = THREE.NearestFilter;
//     texture.minFilter = THREE.NearestFilter;

//     const tileSize = 16;
//     const tileTextureWidth = 256;
//     const tileTextureHeight = 64;
//     const world = new VoxelWorld({
//         cellSize,
//         tileSize,
//         tileTextureWidth,
//         tileTextureHeight,
//     });

//     const worldSize = 16;

//     for (let y = 0; y < worldSize; ++y) {
//         for (let z = 0; z < worldSize; ++z) {
//             for (let x = 0; x < worldSize; ++x) {
//                 //world.setVoxel(x, y, z, randInt(1, 17));
//                 const height = (Math.sin(x / cellSize * Math.PI * 2) + Math.sin(z / cellSize * Math.PI * 3)) * (cellSize / 6) + (cellSize / 2);
//                 if (y < height) {
//                     //world.setVoxel(x, y, z, randInt(1, 17));
//                 }
//             }
//         }
//     }

//     const {positions, normals, uvs, indices} = world.generateGeometryDataForCell(0, 0, 0);
//     const geometry = new THREE.BufferGeometry();
//     const material = new THREE.MeshLambertMaterial({
//         map: texture,
//         side: THREE.DoubleSide,
//         alphaTest: 0.1,
//         transparent: true,
//     });

//     const cellIdToMesh = {};
//     function updateCellGeometry(x, y, z) {
//       const cellX = Math.floor(x / cellSize);
//       const cellY = Math.floor(y / cellSize);
//       const cellZ = Math.floor(z / cellSize);
//       const cellId = world.computeCellId(x, y, z);
//       let mesh = cellIdToMesh[cellId];
//       if (!mesh) {
//         const geometry = new THREE.BufferGeometry();
//         const positionNumComponents = 3;
//         const normalNumComponents = 3;
//         const uvNumComponents = 2;
  
//         geometry.addAttribute(
//             'position',
//             new THREE.BufferAttribute(new Float32Array(0), positionNumComponents));
//         geometry.addAttribute(
//             'normal',
//             new THREE.BufferAttribute(new Float32Array(0), normalNumComponents));
//         geometry.addAttribute(
//             'uv',
//             new THREE.BufferAttribute(new Float32Array(0), uvNumComponents));
  
//         mesh = new THREE.Mesh(geometry, material);
//         mesh.name = cellId;
//         cellIdToMesh[cellId] = mesh;
//         scene.add(mesh);
//         mesh.position.set(cellX * cellSize, cellY * cellSize, cellZ * cellSize);
//       }
  
//       const {positions, normals, uvs, indices} = world.generateGeometryDataForCell(cellX, cellY, cellZ);
//       const geometry = mesh.geometry;
//       geometry.getAttribute('position').setArray(new Float32Array(positions)).needsUpdate = true;
//       geometry.getAttribute('normal').setArray(new Float32Array(normals)).needsUpdate = true;
//       geometry.getAttribute('uv').setArray(new Float32Array(uvs)).needsUpdate = true;
//       geometry.setIndex(indices);
//       geometry.computeBoundingSphere();
//     }

//     const neighborOffsets = [
//         [ 0,  0,  0], // self
//         [-1,  0,  0], // left
//         [ 1,  0,  0], // right
//         [ 0, -1,  0], // down
//         [ 0,  1,  0], // up
//         [ 0,  0, -1], // back
//         [ 0,  0,  1], // front
//     ];

//     function updateVoxelGeometry(x, y, z) {
//         const updatedCellIds = {};
//         for (const offset of neighborOffsets) {
//             const ox = x + offset[0];
//             const oy = y + offset[1];
//             const oz = z + offset[2];
//             const cellId = world.computeCellId(ox, oy, oz);
//             if (!updatedCellIds[cellId]) {
//                 updatedCellIds[cellId] = true;
//                 updateCellGeometry(ox, oy, oz);
//             }
//         }
//     }

//     const positionNumComponents = 3;
//     const normalNumComponents = 3;
//     const uvNumComponents = 2;
//     geometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(positions), positionNumComponents));
//     geometry.addAttribute('normal', new THREE.BufferAttribute(new Float32Array(normals), normalNumComponents));
//     geometry.addAttribute('uv', new THREE.BufferAttribute(new Float32Array(uvs), uvNumComponents));
//     geometry.setIndex(indices);
//     const mesh = new THREE.Mesh(geometry, material);
//     scene.add(mesh);
    


//     function randInt(min, max) {
//         return Math.floor(Math.random() * (max - min) + min);
//     }

//     function resizeRendererToDisplaySize(renderer) {
//         const canvas = renderer.domElement;
//         const width = window.innerWidth;
//         const height = window.innerHeight;

//         //console.log(height);

//         const needResize = canvas.width !== width || canvas.height !== height;
//         if (needResize) {
//             renderer.setSize(width, height, false);
//         }
//         return needResize;
//     }

//     let renderRequested = false;



//     function render() {
//         renderRequested = undefined;

//         if (resizeRendererToDisplaySize(renderer)) {
//             const canvas = renderer.domElement;
//             camera.aspect = canvas.clientWidth / canvas.clientHeight;
//             setTimeout(function() {
//                 canvas.style.width = window.innerWidth + "px";
//                 canvas.style.height = window.innerHeight + "px";
//             }, 0);
//             camera.updateProjectionMatrix();
//         }

//         world.setVoxel(randInt(0, cellSize), randInt(0, cellSize), randInt(0, cellSize), randInt(1, 17));
//         updateVoxelGeometry(randInt(0, cellSize), randInt(0, cellSize), randInt(0, cellSize));
//         requestRenderIfNotRequested();

//         controls.update();
//         renderer.render(scene, camera);
//     }

//     render();

//     function requestRenderIfNotRequested() {
//         if (!renderRequested) {
//             renderRequested = true;
//             requestAnimationFrame(render);
//         }
//     }

//     controls.addEventListener('change', requestRenderIfNotRequested);
//     window.addEventListener('resize', requestRenderIfNotRequested);
// }

// main();