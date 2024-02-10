function init() {
  // Set up scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('container').appendChild(renderer.domElement);

  // Add Furniture
  const bedGeometry = new THREE.BoxGeometry(2, 0.50, 3); 
  const bedMaterial = new THREE.MeshPhongMaterial({ color: 0x4682b4 });
  const bed = new THREE.Mesh(bedGeometry, bedMaterial);
  scene.add(bed);

  const pillowGeometry = new THREE.BoxGeometry(1.5, 0.25, 0.75); 
  const pillowMaterial = new THREE.MeshPhongMaterial({ color: 0xb0c4de });
  const pillow = new THREE.Mesh(pillowGeometry, pillowMaterial);
  scene.add(pillow);

  const bedboard1Geometry = new THREE.BoxGeometry(2, 1, 0.25); 
  const bedboard1Material = new THREE.MeshPhongMaterial({ color: 0x003366 });
  const bedboard1 = new THREE.Mesh(bedboard1Geometry, bedboard1Material);
  scene.add(bedboard1);

  const bedboard2Geometry = new THREE.BoxGeometry(2, 1, 0.25); 
  const bedboard2Material = new THREE.MeshPhongMaterial({ color: 0x003366 });
  const bedboard2 = new THREE.Mesh(bedboard2Geometry, bedboard2Material);
  scene.add(bedboard2);

  const bedboard3Geometry = new THREE.BoxGeometry(2., 0.10, 3); 
  const bedboard3Material = new THREE.MeshPhongMaterial({ color: 0x003366 });
  const bedboard3 = new THREE.Mesh(bedboard3Geometry, bedboard3Material);
  scene.add(bedboard3);

  const tableGeometry = new THREE.BoxGeometry(2.75, 0.15, 1.25); 
  const tableMaterial = new THREE.MeshPhongMaterial({ color: 0x5f9ea0 });
  const table = new THREE.Mesh(tableGeometry, tableMaterial);
  scene.add(table);

  const tableleg1Geometry = new THREE.BoxGeometry(0.15 , 0.80, 1.25); 
  const tableleg1Material = new THREE.MeshPhongMaterial({ color: 0x5f9ea0 });
  const tableleg1 = new THREE.Mesh(tableleg1Geometry, tableleg1Material);
  scene.add(tableleg1);

  const tableleg2Geometry = new THREE.BoxGeometry(0.15 , 0.80, 1.25); 
  const tableleg2Material = new THREE.MeshPhongMaterial({ color: 0x5f9ea0 });
  const tableleg2 = new THREE.Mesh(tableleg2Geometry, tableleg2Material);
  scene.add(tableleg2);

  const chairGeometry = new THREE.BoxGeometry(1 , 1.20, 0.10); 
  const chairMaterial = new THREE.MeshPhongMaterial({ color: 0x367588 });
  const chair = new THREE.Mesh(chairGeometry, chairMaterial);
  scene.add(chair);

  const chairseatGeometry = new THREE.BoxGeometry(1 , 0.10, 0.60); 
  const chairseatMaterial = new THREE.MeshPhongMaterial({ color: 0x367588 });
  const chairseat = new THREE.Mesh(chairseatGeometry, chairseatMaterial);
  scene.add(chairseat);

  const chairlegGeometry = new THREE.BoxGeometry(1 , 0.50, 0.10); 
  const chairlegMaterial = new THREE.MeshPhongMaterial({ color: 0x367588 });
  const chairleg = new THREE.Mesh(chairlegGeometry, chairlegMaterial);
  scene.add(chairleg);

  const keyboardGeometry = new THREE.PlaneGeometry(1.30, 0.50);
  const keyboardMaterial = new THREE.MeshPhongMaterial({ color: 0x36454f });
  const keyboard = new THREE.Mesh(keyboardGeometry, keyboardMaterial);
  keyboard.rotation.x = -Math.PI / 2;
  scene.add(keyboard);

  const monitorGeometry = new THREE.BoxGeometry(1.15 , 0.75, 0.10); 
  const monitorMaterial = new THREE.MeshPhongMaterial({ color: 0x36454f });
  const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
  scene.add(monitor);
  
  const monitorScreenGeometry = new THREE.PlaneGeometry(1.05, 0.65);
  const monitorScreentextureLoader = new THREE.TextureLoader();
  const monitorScreenMaterial = new THREE.MeshPhongMaterial({ side: THREE.DoubleSide });
  monitorScreentextureLoader.load('images/monitor_wallpaper.jpg', function (texture) {
    monitorScreenMaterial.map = texture;
    monitorScreenMaterial.needsUpdate = true;
    renderer.render(scene, camera);
  });
  const monitorScreen = new THREE.Mesh(monitorScreenGeometry, monitorScreenMaterial);
  monitor.add(monitorScreen);
  
  const carpetRadius = 2.5;
  const carpetSegments = 32;
  const carpetGeometry = new THREE.CircleGeometry(carpetRadius, carpetSegments);
  const carpetMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      void main() {
        float distance = length(vUv - vec2(0.5));
        vec3 centerColor = vec3(13.0/255.0, 152.0/255.0, 186.0/255.0);  
        vec3 outerColor = vec3(49.0/255.0, 145.0/255.0, 119.0/255.0);  
        vec3 carpetColor = mix(centerColor, outerColor, smoothstep(0.3, 0.5, distance));
  
        gl_FragColor = vec4(carpetColor, 1.0);
      }
    `,
    side: THREE.DoubleSide
  });
  const carpet = new THREE.Mesh(carpetGeometry, carpetMaterial);
  carpet.rotation.x = -Math.PI / 2;
  carpet.position.y = -0.99; 
  scene.add(carpet);

  const mouseWidth = 0.15;
  const mouseGeometry = new THREE.SphereBufferGeometry(mouseWidth, 32, 16, 0, Math.PI);
  const mouseMaterial = new THREE.MeshPhongMaterial({ color: 0x36454f }); 
  const mouseMesh = new THREE.Mesh(mouseGeometry, mouseMaterial);
  mouseMesh.rotation.x = -Math.PI / 2;
  scene.add(mouseMesh);

  const trashcanRadiusTop = 0.30;
  const trashcanRadiusBottom = 0.30;
  const trashcanHeight = 0.5;
  const trashcanSegments = 32;
  const trashcanGeometry = new THREE.CylinderGeometry(trashcanRadiusTop, trashcanRadiusBottom, trashcanHeight, trashcanSegments);
  const trashcanMaterial = new THREE.MeshPhongMaterial({ color: 0x36454f });
  const trashcan = new THREE.Mesh(trashcanGeometry, trashcanMaterial);
  scene.add(trashcan);

  const standHeight = 0.25;
  const standRadiusTop = 0.05;
  const standRadiusBottom = 0.15;
  const standSegments = 32;
  const standGeometry = new THREE.CylinderGeometry(standRadiusTop, standRadiusBottom, standHeight, standSegments);
  const standMaterial = new THREE.MeshPhongMaterial({ color: 0x36454f });
  const stand = new THREE.Mesh(standGeometry, standMaterial);
  const shadeHeight = 0.25;
  const shadeRadiusTop = 0.15;
  const shadeRadiusBottom = 0.35;
  const shadeSegments = 32;
  const shadeGeometry = new THREE.CylinderGeometry(shadeRadiusTop, shadeRadiusBottom, shadeHeight, shadeSegments);
  const shadeMaterial = new THREE.MeshPhongMaterial({ color: 0xb0c4de, side: THREE.DoubleSide });
  const shade = new THREE.Mesh(shadeGeometry, shadeMaterial);
  shade.position.y = standHeight;
  const lamp = new THREE.Group();
  lamp.add(stand);
  lamp.add(shade);
  scene.add(lamp);

  const sidetableGeometry = new THREE.BoxGeometry(1, 0.55, 0.55); 
  const sidetableMaterial = new THREE.MeshPhongMaterial({ color: 0x367588 });
  const sidetable = new THREE.Mesh(sidetableGeometry, sidetableMaterial);
  scene.add(sidetable);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(ambientLight);

  // Add light to shadows
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 5, 5);
  scene.add(directionalLight);

  // Shadow properties
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;

  // Camera position
  camera.position.set(0, 1, 0);
  camera.lookAt(0, 1, 0);

  // Furniture position
  bed.position.set(-3, -0.65, -2.95); 
  pillow.position.set(-3,-0.30,-3.85);
  bedboard1.position.set(-3, -0.50, -4.55); 
  bedboard2.position.set(-3, -0.50, -1.35); 
  bedboard3.position.set(-3, -0.95, -2.95); 
  table.position.set(1.20,-0.15,-3.95);
  tableleg1.position.set(-0.10,-0.60,-3.95);
  tableleg2.position.set(2.50,-0.60,-3.95);
  chair.position.set(1.20,-0.40,-2.55);
  chairseat.position.set(1.20,-0.45,-2.90);
  chairleg.position.set(1.20,-0.75,-3.15);
  keyboard.position.set(1.20,-0.05,-3.65);
  monitor.position.set(1.20,0.30,-4.10);
  monitorScreen.position.set(0, 0, 0.055); 
  mouseMesh.position.set(2.10, -0.10, -3.65);
  trashcan.position.set(3.10, -0.75, -3.85);
  lamp.position.set(-1, -0.30, -3.90);
  sidetable.position.set(-1.05, -0.70, -4.10);

  // Enable shadows for furniture
  bed.castShadow = true;
  bed.receiveShadow = true;

  pillow.castShadow = true;
  pillow.receiveShadow = true;
  
  bedboard1.castShadow = true;
  bedboard1.receiveShadow = true;

  bedboard2.castShadow = true;
  bedboard2.receiveShadow = true;

  bedboard3.castShadow = true;
  bedboard3.receiveShadow = true;

  table.castShadow = true;
  table.receiveShadow = true;

  tableleg1.castShadow = true;
  tableleg1.receiveShadow = true;

  tableleg2.castShadow = true;
  tableleg2.receiveShadow = true;

  chair.castShadow = true;
  chair.receiveShadow = true;

  chairseat.castShadow = true;
  chairseat.receiveShadow = true;

  chairleg.castShadow = true;
  chairleg.receiveShadow = true;

  keyboard.castShadow = true;
  keyboard.receiveShadow = true;

  monitor.castShadow = true;
  monitor.receiveShadow = true;

  mouseMesh.castShadow = true;
  mouseMesh.receiveShadow = true;

  trashcan.castShadow =  true;
  trashcan.receiveShadow = true;

  sidetable.castShadow = true;
  sidetable.receiveShadow = true;

  lamp.castShadow = true;
  lamp.receiveShadow = true;

  // Create floor
  const floorGeometry = new THREE.PlaneGeometry(10, 10);
  const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x004953 });
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2; 
  floor.position.y = -1; 
  floor.receiveShadow = true;
  scene.add(floor);

  const floorTextureLoader = new THREE.TextureLoader();
  floorTextureLoader.load('images/floor_texture.jpg',
  function (texture) {
    const floorTextureMaterial = new THREE.MeshPhongMaterial({ map: texture, opacity: 0.5 });
    floor.material = floorTextureMaterial;
    renderer.render(scene, camera);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error('Error loading texture:', error);
  }
);
  // Create walls
  const wallMaterial = new THREE.MeshPhongMaterial({ color: 0x002147 });
  const wallGeometry = new THREE.BoxGeometry(10, 3, 0.1);

  // Wall position
  const wall1 = new THREE.Mesh(wallGeometry, wallMaterial);
  wall1.position.set(0, 0.5, -5);
  wall1.receiveShadow = true;
  scene.add(wall1);

  const wall2 = new THREE.Mesh(wallGeometry, wallMaterial);
  wall2.position.set(-5, 0.5, 0); 
  wall2.rotation.y = Math.PI / 2; 
  wall2.receiveShadow = true;
  scene.add(wall2);

  const wallTextureLoader = new THREE.TextureLoader();
  wallTextureLoader.load('images/wall_texture.jpg',
  function (texture) {
    const wallTextureMaterial = new THREE.MeshPhongMaterial({ map: texture, opacity: 0.5 });
    wall1.material = wallTextureMaterial;
    wall2.material = wallTextureMaterial;
    renderer.render(scene, camera);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error('Error loading texture:', error);
  }
);

  // Create window frame
  const windowFrameGeometry = new THREE.PlaneGeometry(3.75, 1.75);
  const windowFrameMaterial = new THREE.MeshPhongMaterial({ color: 0x1b1b1b, side: THREE.DoubleSide});
  const windowFrame = new THREE.Mesh(windowFrameGeometry, windowFrameMaterial);
  windowFrame.position.set(0.25, 0.15, 0.10);  
  wall2.add(windowFrame);

  // Create window surface
  const windowSurfaceGeometry = new THREE.BoxGeometry(0.25 , 0.15, 3.75); 
  const windowSurfaceMaterial = new THREE.MeshPhongMaterial({ color: 0x1b1b1b });
  const windowSurface = new THREE.Mesh(windowSurfaceGeometry, windowSurfaceMaterial);
  windowSurface.position.set(-4.80, -0.15, -0.25);
  scene.add(windowSurface);

  // Create window view
  const windowPlaneGeometry = new THREE.PlaneGeometry(3.5, 1.5);
  const windowPlanetextureLoader = new THREE.TextureLoader();
  windowPlanetextureLoader.load('images/pixel_night.png',
    function (texture) {
      const windowPlaneMaterial = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide });
      const windowPlane = new THREE.Mesh(windowPlaneGeometry, windowPlaneMaterial);
      windowPlane.position.set(0.25, 0.15, 0.11);
      wall2.add(windowPlane);
      renderer.render(scene, camera);
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.error('Error loading texture:', error);
    }
  );

    // Create wall poster
    const wallPosterGeometry = new THREE.PlaneGeometry(1.5, 1.5);
    const wallPostertextureLoader = new THREE.TextureLoader();
    wallPostertextureLoader.load('images/wall_poster.jpg',
      function (texture) {
        const wallPosterMaterial = new THREE.MeshPhongMaterial({ map: texture, side: THREE.DoubleSide });
        const wallPoster = new THREE.Mesh(wallPosterGeometry, wallPosterMaterial);
        wallPoster.position.set(-1.05, 0.15, 0.11);
        wall1.add(wallPoster);
        renderer.render(scene, camera);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error) {
        console.error('Error loading texture:', error);
      }
    );
}

// Run
window.onload = init;
