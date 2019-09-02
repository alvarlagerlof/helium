import { randInt } from "../utils/math-utils";
import VoxelWorld from "./voxel-world"

class Scene {
    constructor() {
        this.renderRequested = false;

        this.options = {
            cellSize: 16,
            worldSize: 16,
            tileSize: 16,
            tileTextureWidth: 256,
            tileTextureHeight: 64,
            camera: {
                fov: 75,
                aspect: 2,
                near: 0.1,
                far: 1000
            }
        }

        this.cellIdToMesh = {};
        this.neighborOffsets = [
            [ 0,  0,  0], // self
            [-1,  0,  0], // left
            [ 1,  0,  0], // right
            [ 0, -1,  0], // down
            [ 0,  1,  0], // up
            [ 0,  0, -1], // back
            [ 0,  0,  1], // front
        ];
    }

    setup() {
        // Init THREE and canvas
        this.canvas = document.querySelector('#c');
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });
        
        this.camera = new THREE.PerspectiveCamera(
            this.options.camera.fov, 
            this.options.camera.aspect, 
            this.options.camera.near, 
            this.options.camera.far
        );

        this.camera.position.set(
            this.options.cellSize * .3, 
            this.options.cellSize * .8, 
            -this.options.cellSize * .3
        );

        this.controls = new THREE.OrbitControls(
            this.camera, 
            this.canvas
        );

        this.controls.target.set(
            this.options.cellSize / 2, 
            this.options.cellSize / 3, 
            this.options.cellSize / 2
        );

        this.controls.update();

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('lightblue');

        // TODO: Do with imports instead
        const loader = new THREE.TextureLoader();
        const texture = loader.load('../src/resources/flourish-cc-by-nc-sa.png', this.render);
        texture.magFilter = THREE.NearestFilter;
        texture.minFilter = THREE.NearestFilter;

        this.material = new THREE.MeshLambertMaterial({
            map: texture,
            side: THREE.DoubleSide,
            alphaTest: 0.1,
            transparent: true,
        });

        this.addLight(-1, 2, 4);
        this.addLight(1, -1, -2);       

    
        // Init world
        this.world = new VoxelWorld({
            cellSize: this.options.cellSize,
            tileSize: this.options.tileSize,
            tileTextureWidth: this.options.tileTextureWidth,
            tileTextureHeight: this.options.tileTextureHeight,
        });

        // Handle resizing of the browser window
        this.controls.addEventListener('change', this.requestRenderIfNotRequested);
        window.addEventListener('resize', this.requestRenderIfNotRequested);

        // Start render cycle
        this.render();

        // while (true) {
        //     this.addRandomCell();
        // }

    }

    addLight(x, y, z) {
        const color = 0xFFFFFF;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(x, y, z);
        this.scene.add(light);
    }

    addRandomVoxel() {
        let x = randInt(0, this.options.cellSize*5);
        let y = randInt(0, this.options.cellSize*5);
        let z = randInt(0, this.options.cellSize*5);

        this.world.setVoxel(x, y, z, randInt(1, 17));
        this.updateVoxelGeometry(x, y, z);
        this.requestRenderIfNotRequested();
    }

    async addRandomCell() {
        this.world.clear();

        let cellX = randInt(0, 20);
        let cellY = randInt(0, 20);
        let cellZ = randInt(0, 20);
        
    
        for (var i = 0; i < 100; i++) {
            let x = cellX*this.options.cellSize + randInt(0, this.options.cellSize);
            let y = cellY*this.options.cellSize + randInt(0, this.options.cellSize);
            let z = cellZ*this.options.cellSize + randInt(0, this.options.cellSize);
            this.world.setVoxel(x, y, z, randInt(1, 17));
        }

        for (var i = 0; i < this.options.cellSize; i++) {
            const block = 13;

            // this.world.setVoxel(
            //     cellX*this.options.cellSize + i, 
            //     cellY*this.options.cellSize, 
            //     cellZ*this.options.cellSize, 
            //     block
            // );

            // this.world.setVoxel(
            //     cellX*this.options.cellSize, 
            //     cellY*this.options.cellSize + i, 
            //     cellZ*this.options.cellSize, 
            //     block
            // );

            // this.world.setVoxel(
            //     cellX*this.options.cellSize, 
            //     cellY*this.options.cellSize, 
            //     cellZ*this.options.cellSize + i, 
            //     block
            // );
        }

        this.updateCellGeometry(cellX*this.options.cellSize, cellY*this.options.cellSize, cellZ*this.options.cellSize);
        this.requestRenderIfNotRequested();
       
    }

    updateCellGeometry(x, y, z) {
        const cellX = Math.floor(x / this.options.cellSize);
        const cellY = Math.floor(y / this.options.cellSize);
        const cellZ = Math.floor(z / this.options.cellSize);
        const cellId = this.world.computeCellId(x, y, z);
        let mesh = this.cellIdToMesh[cellId];
        if (!mesh) {
          const geometry = new THREE.BufferGeometry();
          const positionNumComponents = 3;
          const normalNumComponents = 3;
          const uvNumComponents = 2;
    
          geometry.addAttribute(
              'position',
              new THREE.BufferAttribute(new Float32Array(0), positionNumComponents));
          geometry.addAttribute(
              'normal',
              new THREE.BufferAttribute(new Float32Array(0), normalNumComponents));
          geometry.addAttribute(
              'uv',
              new THREE.BufferAttribute(new Float32Array(0), uvNumComponents));
    
          mesh = new THREE.Mesh(geometry, this.material);
          mesh.name = cellId;
          this.cellIdToMesh[cellId] = mesh;
          this.scene.add(mesh);
          mesh.position.set(cellX * this.options.cellSize, cellY * this.options.cellSize, cellZ * this.options.cellSize);
        }
    
        const {positions, normals, uvs, indices} = this.world.generateGeometryDataForCell(cellX, cellY, cellZ);
        const geometry = mesh.geometry;
        geometry.getAttribute('position').setArray(new Float32Array(positions)).needsUpdate = true;
        geometry.getAttribute('normal').setArray(new Float32Array(normals)).needsUpdate = true;
        geometry.getAttribute('uv').setArray(new Float32Array(uvs)).needsUpdate = true;
        geometry.setIndex(indices);
        geometry.computeBoundingSphere();
    }

    updateVoxelGeometry(x, y, z) {
        const updatedCellIds = {};
        for (const offset of this.neighborOffsets) {
            const ox = x + offset[0];
            const oy = y + offset[1];
            const oz = z + offset[2];
            const cellId = this.world.computeCellId(ox, oy, oz);
            if (!updatedCellIds[cellId]) {
                updatedCellIds[cellId] = true;
                this.updateCellGeometry(ox, oy, oz);
            }
        }
    }


    requestRenderIfNotRequested() {
        if (!this.renderRequested) {
            this.renderRequested = true;
            requestAnimationFrame(() => this.render());
        }
    }

    render() {
        this.renderRequested = false;

        if (this.canvas.width !== window.innerWidth || 
            this.canvas.height !== window.innerHeight
        ) {
            this.renderer.setSize(window.innerWidth, window.innerHeight, false);
            this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
            setTimeout(() => {
                this.canvas.style.width = window.innerWidth + "px";
                this.canvas.style.height = window.innerHeight + "px";
            }, 0);
            this.camera.updateProjectionMatrix();
        }

        this.addRandomCell();

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

export default Scene;