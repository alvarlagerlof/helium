'use strict';

/* global THREE */

function main() {
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGLRenderer({canvas});

  const cellSize = 64;

  const fov = 90;
  const aspect = 1;  // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(-cellSize * .3, cellSize * .8, -cellSize * .3);

  const controls = new THREE.OrbitControls(camera, canvas);
  controls.target.set(cellSize / 2, cellSize / 3, cellSize / 2);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('white');

  {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  // const cell = new Uint8Array(cellSize * cellSize * cellSize);
  // for (let y = 0; y < cellSize; ++y) {
  //   for (let z = 0; z < cellSize; ++z) {
  //     for (let x = 0; x < cellSize; ++x) {
  //       const height = (Math.sin(x / cellSize * Math.PI * 4) + Math.sin(z / cellSize * Math.PI * 6)) * 20 + cellSize / 2;
  //       if (height > y && height < y + 1) {
  //         const offset = y * cellSize * cellSize +
  //                      z * cellSize +
  //                      x;
  //         cell[offset] = 1;
  //       }
  //     }
  //   }
  // }

  // console.log(cell[0]);

  // const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
  // const material = new THREE.MeshPhongMaterial({color: 'green'});

  // for (let y = 0; y < cellSize; ++y) {
  //   for (let z = 0; z < cellSize; ++z) {
  //     for (let x = 0; x < cellSize; ++x) {
  //       const offset = y * cellSize * cellSize +
  //                      z * cellSize +
  //                      x;
  //       const block = cell[offset];
  //       if (block) {
  //         const mesh = new THREE.Mesh(geometry, material);
  //         mesh.position.set(x, y, z);
  //         scene.add(mesh);
  //       }
  //     }
  //   }
  // }

  const s = 10;

  const data = {
    x1z0: {
      updated: false, 
      blocks: [
        [[{type: "block", "material": "wood", object: null}]],
        [[{type: "block", "material": "wood", object: null}]],
        [[{type: "block", "material": "wood", object: null}]],
        [[{type: "block", "material": "leaf", object: null}]]
      ]
    },
    x0z1: {
      updated: false, 
      blocks: [
        [
          [
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "sand", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "sand", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "sand", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "sand", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "sand", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "sand", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "sand", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "sand", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ]
        ],
        [
          [
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "air", object: null},
            {type: "block", "material": "sand", object: null},
            {type: "block", "material": "air", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "air", object: null},
            {type: "block", "material": "sand", object: null},
            {type: "block", "material": "air", object: null},
            {type: "block", "material": "sand", object: null},
            {type: "block", "material": "air", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "air", object: null},
            {type: "block", "material": "sand", object: null},
            {type: "block", "material": "air", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "air", object: null},
            {type: "block", "material": "sand", object: null},
            {type: "block", "material": "air", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "air", object: null},
            {type: "block", "material": "sand", object: null},
            {type: "block", "material": "air", object: null},
            {type: "block", "material": "sand", object: null},
            {type: "block", "material": "air", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "air", object: null},
            {type: "block", "material": "sand", object: null},
            {type: "block", "material": "air", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ],
          [
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "grass", object: null},
            {type: "block", "material": "water", object: null},
            {type: "block", "material": "grass", object: null},
          ]
        ],
        
    ]
    }
  }

  for (const key of Object.keys(data)) {
    if (!data[key].updated) {
      
      let chunkCords = {
        x: key.substring(key.lastIndexOf("x") + 1, key.lastIndexOf("z")),
        z: key.split('z').pop()
      }

      for (let y = 0; y < data[key].blocks.length; y++) {
        for (let x = 0; x < data[key].blocks[y].length; x++) {
          for (let z = 0; z < data[key].blocks[y][x].length; z++) {
            if (data[key].blocks[y][x][z].material != "air") {
              const geometry = new THREE.BoxBufferGeometry(1*s, 1*s, 1*s);
              const material = new THREE.MeshPhongMaterial({color: materialToColor(data[key].blocks[y][x][z].material)});
            
              const mesh = new THREE.Mesh(geometry, material);
              mesh.position.set((x+(chunkCords.x*16))*s, y*s, (z+(chunkCords.z*16))*s);
              scene.add(mesh);
              data[key].blocks[y][x][z].object = mesh;
            }
          }
        }
      }
    }
  }

  function materialToColor(material) {
    switch(material) {
      case "grass":
        return "lime";
      case "water":
        return "blue";
      case "sand":
        return "yellow";
      case "wood":
          return "brown";
      case "leaf":
        return "green";
    }
  }

  let socket = new WebSocket("ws://ravla.org:8080");

  socket.onopen = function(e) {
    console.log("[open] Connection established");
    console.log("Sending to server");
    socket.send("My name is John");
  };

  socket.onmessage = function(event) {
    console.log(`[message] Data received from server: ${event.data}`);
  };

  socket.onclose = function(event) {
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log('[close] Connection died');
    }
  };

  socket.onerror = function(error) {
    console.log(`[error] ${error.message}`);
  };

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  let renderRequested = false;

  function render() {
    renderRequested = undefined;

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    controls.update();
    renderer.render(scene, camera);
  }
  render();

  function requestRenderIfNotRequested() {
    if (!renderRequested) {
      renderRequested = true;
      requestAnimationFrame(render);
    }
  }

  controls.addEventListener('change', requestRenderIfNotRequested);
  window.addEventListener('resize', requestRenderIfNotRequested);
}

main();