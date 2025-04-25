// Brain Visualization JavaScript for Lion's Mane Interactive Webpage

document.addEventListener('DOMContentLoaded', function() {
    initBrainVisualization();
});

function initBrainVisualization() {
    // Get the container element
    const container = document.querySelector('.brain-model');
    
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf9f3e9);
    
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
    
    // Add responsive behavior
    window.addEventListener('resize', function() {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    });
    
    // Create a simplified brain model
    const brainGeometry = new THREE.SphereGeometry(2, 32, 32);
    const brainMaterial = new THREE.MeshPhongMaterial({
        color: 0xe27d60,
        transparent: true,
        opacity: 0.8,
        shininess: 30
    });
    const brain = new THREE.Mesh(brainGeometry, brainMaterial);
    scene.add(brain);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create hotspots for different brain regions
    const hotspots = [
        { name: 'Hippocampus', position: new THREE.Vector3(0, 0, 2), info: 'Memory formation and spatial navigation. Lion\'s mane may enhance memory by promoting nerve growth in this region.' },
        { name: 'Prefrontal Cortex', position: new THREE.Vector3(0, 1.5, 1), info: 'Executive function and decision making. Lion\'s mane may improve focus and cognitive processing.' },
        { name: 'Amygdala', position: new THREE.Vector3(-1.5, -0.5, 1), info: 'Emotional processing. Lion\'s mane may help reduce anxiety and stress responses.' },
        { name: 'Cerebellum', position: new THREE.Vector3(0, -1.8, 0), info: 'Motor control and coordination. Lion\'s mane may support overall neurological function.' }
    ];
    
    // Create visual hotspots
    const hotspotGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const hotspotMaterial = new THREE.MeshBasicMaterial({ color: 0x8b5a2b });
    
    hotspots.forEach(hotspot => {
        const sphere = new THREE.Mesh(hotspotGeometry, hotspotMaterial);
        sphere.position.copy(hotspot.position);
        sphere.userData = { name: hotspot.name, info: hotspot.info };
        scene.add(sphere);
    });
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'brain-tooltip';
    tooltip.style.position = 'absolute';
    tooltip.style.padding = '10px';
    tooltip.style.backgroundColor = 'rgba(44, 62, 80, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.borderRadius = '5px';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.display = 'none';
    tooltip.style.zIndex = '100';
    tooltip.style.maxWidth = '250px';
    container.appendChild(tooltip);
    
    // Set up raycaster for interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Handle mouse movement for hotspot hover
    container.addEventListener('mousemove', function(event) {
        // Calculate mouse position in normalized device coordinates
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        
        // Update the raycaster
        raycaster.setFromCamera(mouse, camera);
        
        // Find intersections with hotspots
        const intersects = raycaster.intersectObjects(scene.children);
        
        if (intersects.length > 0 && intersects[0].object.userData && intersects[0].object.userData.name) {
            // Show tooltip
            const hotspot = intersects[0].object.userData;
            tooltip.innerHTML = `<strong>${hotspot.name}</strong><br>${hotspot.info}`;
            tooltip.style.display = 'block';
            tooltip.style.left = `${event.clientX - rect.left + 10}px`;
            tooltip.style.top = `${event.clientY - rect.top + 10}px`;
            
            // Highlight the hotspot
            intersects[0].object.material.color.set(0xd4a76a);
            document.body.style.cursor = 'pointer';
        } else {
            // Hide tooltip
            tooltip.style.display = 'none';
            
            // Reset hotspot colors
            scene.children.forEach(child => {
                if (child.userData && child.userData.name) {
                    child.material.color.set(0x8b5a2b);
                }
            });
            document.body.style.cursor = 'default';
        }
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the brain slowly
        brain.rotation.y += 0.005;
        
        // Update hotspot positions based on brain rotation
        hotspots.forEach((hotspot, index) => {
            const sphereHotspot = scene.children.find(child => 
                child.userData && child.userData.name === hotspot.name
            );
            
            if (sphereHotspot) {
                // Calculate new position based on brain rotation
                const rotatedPosition = hotspot.position.clone();
                rotatedPosition.applyAxisAngle(new THREE.Vector3(0, 1, 0), brain.rotation.y);
                sphereHotspot.position.copy(rotatedPosition);
            }
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}
