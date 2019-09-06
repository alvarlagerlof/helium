import { randInt } from "../utils/math-utils";
import VoxelWorld from "./voxel-world"


class Scene {
    constructor() {
        this.renderRequested = false;

        this.offset = 0;
        this.players = [];

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

        this.controls.enableDamping = true;   //damping 
        this.controls.dampingFactor = 0.25;   //damping inertia
        this.controls.enableZoom = true;      //Zooming
        this.controls.enablePan = false;

        this.controls.keys = {
            LEFT: 37, //left arrow
            UP: 38, // up arrow
            RIGHT: 39, // right arrow
            BOTTOM: 40 // down arrow
        };


        this.controls.rotateSpeed = 0.4;
        this.controls.zoomSpeed = 1.2;

        this.controls.update();

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color('lightblue');
        window.scene = this.scene;

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
        this.controls.addEventListener('change', () => this.requestRenderIfNotRequested());
        window.addEventListener('resize', () => this.requestRenderIfNotRequested());

        // Start render cycle
        this.render();

        this.addRandomCell();

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

    addRandomCell() {
        this.world.clear();

        const scale = 5;

        for (let y = 0; y < this.options.cellSize*scale; ++y) {
            for (let z = 0; z < this.options.cellSize*scale; ++z) {
                for (let x = 0; x < this.options.cellSize*scale; ++x) {
                    const height = (Math.sin((x+this.offset) / this.options.cellSize * Math.PI * 1.1) + Math.sin((z+this.offset) / this.options.cellSize * Math.PI * 1.1)) * (this.options.cellSize / 6) + (this.options.cellSize / 2);
                    if (y < height) {
                        this.world.setVoxel(x, y, z, Math.round(height));
                    }
                }
            }
        }

        for (let y = 0; y < scale; ++y) {
            for (let z = 0; z < scale; ++z) {
                for (let x = 0; x < scale; ++x) {
                    this.updateCellGeometry(x*this.options.cellSize, y*this.options.cellSize, z*this.options.cellSize);
                }
            }
        }

        this.offset += 1;

        // const cellX = randInt(0, 10);
        // const cellY = randInt(0, 10);
        // const cellZ = randInt(0, 10);
                
        // for (var i = 0; i < 100; i++) {
        //     let x = cellX*this.options.cellSize + randInt(0, this.options.cellSize);
        //     let y = cellY*this.options.cellSize + randInt(0, this.options.cellSize);
        //     let z = cellZ*this.options.cellSize + randInt(0, this.options.cellSize);
        //     this.world.setVoxel(x, y, z, block);
        // }

        // for (var i = 0; i < this.options.cellSize; i++) {
        //     const block = 13;

        //     this.world.setVoxel(
        //         cellX*this.options.cellSize + i, 
        //         cellY*this.options.cellSize, 
        //         cellZ*this.options.cellSize, 
        //         block
        //     );

        //     this.world.setVoxel(
        //         cellX*this.options.cellSize, 
        //         cellY*this.options.cellSize + i, 
        //         cellZ*this.options.cellSize, 
        //         block
        //     );

        //     this.world.setVoxel(
        //         cellX*this.options.cellSize, 
        //         cellY*this.options.cellSize, 
        //         cellZ*this.options.cellSize + i, 
        //         block
        //     );
        // }

        //this.updateCellGeometry(cellX*this.options.cellSize, cellY*this.options.cellSize, cellZ*this.options.cellSize);

        //this.addRandomCell();
        //this.requestRenderIfNotRequested();
        
       
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

    onEvent(type, player) {
        //console.log(type, player)
        let p = player;
        switch (type) {
            case "PLAYER_ADD":
                if (this.players.filter(x => x.uuid == p.uuid).length == 0) {
                    let geometry = new THREE.BoxGeometry( 1, 2, 1 );
                    let material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
                    let cube = new THREE.Mesh( geometry, material );

                    cube.position.x = p.x;
                    cube.position.y = p.y;
                    cube.position.z = p.z;


                    this.players.push({...p, ...{cube}});
                    this.scene.add(cube);
                    this.players.find(x => x.uuid == p.uuid).cube.add(this.camera);

                }
                break;
            case "PLAYER_REMOVE": 
                this.players = this.players.filter(x => x.uuid != p.uuid);
                console.log(this.players.find(x => x.uuid == p.uuid))
                this.scene.remove(this.players.find(x => x.uuid == p.uuid).cube)
                break;
            case "PLAYER_UPDATE":
                let fp = this.players.find(x => x.uuid == p.uuid);
                if (fp && fp.cube) {
                    let cube = fp.cube;
                    this.players[this.players.findIndex(el => el.uuid == p.uuid)] = {...p, ...{cube}};
                    cube.position.x = player.x;
                    cube.position.y = player.y - 60;
                    cube.position.z = player.z;
                    cube.rotation.y = player.yaw * Math.PI/-180;
                    cube.geometry.computeBoundingSphere();

                    this.controls.target.set(
                        cube.position.x, 
                        cube.position.y, 
                        cube.rotation.y
                    );

    
                }
                
                break;
        }
        this.requestRenderIfNotRequested();
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

        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }
}

export default Scene;