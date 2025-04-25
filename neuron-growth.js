// Neuron Growth Simulator JavaScript for Lion's Mane Interactive Webpage

document.addEventListener('DOMContentLoaded', function() {
    initNeuronGrowthSimulator();
});

function initNeuronGrowthSimulator() {
    const container = document.querySelector('.neuron-visualization');
    const slider = document.getElementById('growthSlider');
    
    // Set up SVG for neuron visualization
    const width = container.clientWidth;
    const height = container.clientHeight;
    
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Create two groups for control and lion's mane neurons
    const controlGroup = svg.append('g').attr('class', 'control-neuron');
    const lionsGroup = svg.append('g').attr('class', 'lions-mane-neuron');
    
    // Add labels
    svg.append('text')
        .attr('x', width / 4)
        .attr('y', 30)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', '#2c3e50')
        .text('Control');
    
    svg.append('text')
        .attr('x', 3 * width / 4)
        .attr('y', 30)
        .style('font-size', '14px')
        .attr('text-anchor', 'middle')
        .style('fill', '#8b5a2b')
        .text('Lion\'s Mane');
    
    // Define neuron cell body
    function drawNeuronCell(group, x, y, radius, color) {
        group.append('circle')
            .attr('cx', x)
            .attr('cy', y)
            .attr('r', radius)
            .style('fill', color)
            .style('opacity', 0.8);
    }
    
    // Define neuron dendrites
    function drawDendrites(group, x, y, growth, color) {
        const dendritesCount = 5;
        const angleStep = (Math.PI * 2) / dendritesCount;
        
        for (let i = 0; i < dendritesCount; i++) {
            const angle = i * angleStep;
            const length = 20 + growth * 30; // Base length + growth factor
            const endX = x + Math.cos(angle) * length;
            const endY = y + Math.sin(angle) * length;
            
            // Create a curved path for dendrites
            const path = d3.path();
            path.moveTo(x, y);
            
            // Control points for curve
            const cp1x = x + Math.cos(angle) * length * 0.4;
            const cp1y = y + Math.sin(angle) * length * 0.4;
            const cp2x = x + Math.cos(angle) * length * 0.6;
            const cp2y = y + Math.sin(angle) * length * 0.6;
            
            path.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, endX, endY);
            
            group.append('path')
                .attr('d', path.toString())
                .style('stroke', color)
                .style('stroke-width', 2)
                .style('fill', 'none');
            
            // Add small branches to dendrites if growth is sufficient
            if (growth > 0.3) {
                const branchCount = Math.floor(growth * 5); // More branches with more growth
                
                for (let j = 0; j < branchCount; j++) {
                    const branchStart = 0.4 + (j * 0.1); // Position along the dendrite
                    const branchX = x + Math.cos(angle) * length * branchStart;
                    const branchY = y + Math.sin(angle) * length * branchStart;
                    
                    const branchAngle = angle + (Math.random() * 1 - 0.5);
                    const branchLength = 5 + growth * 15; // Branch length based on growth
                    const branchEndX = branchX + Math.cos(branchAngle) * branchLength;
                    const branchEndY = branchY + Math.sin(branchAngle) * branchLength;
                    
                    group.append('line')
                        .attr('x1', branchX)
                        .attr('y1', branchY)
                        .attr('x2', branchEndX)
                        .attr('y2', branchEndY)
                        .style('stroke', color)
                        .style('stroke-width', 1.5)
                        .style('opacity', 0.7);
                }
            }
        }
    }
    
    // Define axon
    function drawAxon(group, x, y, growth, color) {
        const axonLength = 50 + growth * 100; // Base length + growth factor
        const axonEndX = x;
        const axonEndY = y + axonLength;
        
        // Main axon
        const path = d3.path();
        path.moveTo(x, y);
        path.bezierCurveTo(
            x, y + axonLength * 0.3,
            x, y + axonLength * 0.7,
            axonEndX, axonEndY
        );
        
        group.append('path')
            .attr('d', path.toString())
            .style('stroke', color)
            .style('stroke-width', 3)
            .style('fill', 'none');
        
        // Axon terminals
        if (growth > 0) {
            const terminalCount = 3 + Math.floor(growth * 5); // More terminals with more growth
            const terminalSpread = 30 + growth * 40; // Wider spread with more growth
            
            for (let i = 0; i < terminalCount; i++) {
                const terminalX = axonEndX + (i - (terminalCount - 1) / 2) * (terminalSpread / terminalCount);
                const terminalY = axonEndY + 10 + Math.random() * 10 * growth;
                
                const terminalPath = d3.path();
                terminalPath.moveTo(axonEndX, axonEndY);
                terminalPath.bezierCurveTo(
                    axonEndX, axonEndY + 5,
                    terminalX, terminalY - 5,
                    terminalX, terminalY
                );
                
                group.append('path')
                    .attr('d', terminalPath.toString())
                    .style('stroke', color)
                    .style('stroke-width', 2)
                    .style('fill', 'none');
                
                // Add terminal buttons
                group.append('circle')
                    .attr('cx', terminalX)
                    .attr('cy', terminalY)
                    .attr('r', 2 + growth * 2)
                    .style('fill', color)
                    .style('opacity', 0.9);
            }
        }
    }
    
    // Draw initial neurons
    const controlX = width / 4;
    const lionsX = 3 * width / 4;
    const centerY = height / 3;
    
    drawNeuronCell(controlGroup, controlX, centerY, 15, '#2c3e50');
    drawNeuronCell(lionsGroup, lionsX, centerY, 15, '#8b5a2b');
    
    // Initial growth is 0
    drawDendrites(controlGroup, controlX, centerY, 0, '#2c3e50');
    drawDendrites(lionsGroup, lionsX, centerY, 0, '#8b5a2b');
    
    drawAxon(controlGroup, controlX, centerY, 0, '#2c3e50');
    drawAxon(lionsGroup, lionsX, centerY, 0, '#8b5a2b');
    
    // Add growth factor indicators
    const controlIndicator = svg.append('text')
        .attr('x', controlX)
        .attr('y', height - 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', '#2c3e50')
        .text('Growth: 0%');
    
    const lionsIndicator = svg.append('text')
        .attr('x', lionsX)
        .attr('y', height - 20)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', '#8b5a2b')
        .text('Growth: 0%');
    
    // Add day indicator
    const dayIndicator = svg.append('text')
        .attr('x', width / 2)
        .attr('y', height - 50)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('fill', '#333')
        .text('Day 0');
    
    // Update neuron growth based on slider value
    slider.addEventListener('input', updateGrowth);
    
    function updateGrowth() {
        const growthValue = slider.value / 100;
        const day = Math.round(growthValue * 28); // 0 to 28 days
        
        // Clear previous neurons
        controlGroup.selectAll('*').remove();
        lionsGroup.selectAll('*').remove();
        
        // Control neuron grows slower
        const controlGrowth = growthValue * 0.5; // 50% slower growth
        
        // Lion's mane neuron grows faster
        const lionsGrowth = growthValue;
        
        // Draw updated neurons
        drawNeuronCell(controlGroup, controlX, centerY, 15, '#2c3e50');
        drawNeuronCell(lionsGroup, lionsX, centerY, 15, '#8b5a2b');
        
        drawDendrites(controlGroup, controlX, centerY, controlGrowth, '#2c3e50');
        drawDendrites(lionsGroup, lionsX, centerY, lionsGrowth, '#8b5a2b');
        
        drawAxon(controlGroup, controlX, centerY, controlGrowth, '#2c3e50');
        drawAxon(lionsGroup, lionsX, centerY, lionsGrowth, '#8b5a2b');
        
        // Update indicators
        controlIndicator.text(`Growth: ${Math.round(controlGrowth * 100)}%`);
        lionsIndicator.text(`Growth: ${Math.round(lionsGrowth * 100)}%`);
        dayIndicator.text(`Day ${day}`);
    }
    
    // Add information tooltip
    const infoButton = svg.append('circle')
        .attr('cx', width - 20)
        .attr('cy', 20)
        .attr('r', 10)
        .style('fill', '#8b5a2b')
        .style('cursor', 'pointer');
    
    svg.append('text')
        .attr('x', width - 20)
        .attr('y', 24)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('fill', 'white')
        .style('pointer-events', 'none')
        .text('i');
    
    const tooltip = d3.select(container)
        .append('div')
        .attr('class', 'neuron-tooltip')
        .style('position', 'absolute')
        .style('background', 'rgba(44, 62, 80, 0.9)')
        .style('color', 'white')
        .style('padding', '10px')
        .style('border-radius', '5px')
        .style('width', '250px')
        .style('top', '50px')
        .style('right', '20px')
        .style('display', 'none')
        .style('z-index', '100')
        .html(`
            <h4>About This Simulation</h4>
            <p>This visualization shows the difference in neuron growth between a control neuron and one exposed to lion's mane extract.</p>
            <p>Research has shown that neurons exposed to lion's mane extract can grow up to twice as long as control neurons, with more branching and connections.</p>
            <p>Use the slider to simulate growth over a 28-day period.</p>
        `);
    
    infoButton.on('click', function() {
        const currentDisplay = tooltip.style('display');
        tooltip.style('display', currentDisplay === 'none' ? 'block' : 'none');
    });
}
