// Interactive Charts JavaScript for Lion's Mane Interactive Webpage

document.addEventListener('DOMContentLoaded', function() {
    initComparisonChart();
    initResearchTimeline();
});

function initComparisonChart() {
    const container = document.querySelector('.comparison-chart');
    
    // Set up SVG for cognitive performance comparison
    const width = container.clientWidth;
    const height = container.clientHeight;
    const margin = { top: 50, right: 50, bottom: 70, left: 80 };
    
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Cognitive metrics data
    const metrics = [
        { name: 'Memory', control: 65, lionsMane: 85 },
        { name: 'Processing Speed', control: 70, lionsMane: 90 },
        { name: 'Focus', control: 60, lionsMane: 75 },
        { name: 'Mood', control: 55, lionsMane: 80 }
    ];
    
    // Set up scales
    const xScale = d3.scaleBand()
        .domain(metrics.map(d => d.name))
        .range([margin.left, width - margin.right])
        .padding(0.3);
    
    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height - margin.bottom, margin.top]);
    
    // Add X axis
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale))
        .selectAll('text')
        .style('font-size', '12px')
        .style('text-anchor', 'middle');
    
    // Add Y axis
    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale))
        .selectAll('text')
        .style('font-size', '12px');
    
    // Add Y axis label
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', margin.left / 3)
        .attr('x', -(height / 2))
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .text('Performance Score (%)');
    
    // Add title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text('Cognitive Performance Comparison');
    
    // Create a group for each metric
    const groups = svg.selectAll('.metric-group')
        .data(metrics)
        .enter()
        .append('g')
        .attr('class', 'metric-group')
        .attr('transform', d => `translate(${xScale(d.name)},0)`);
    
    // Add bars for control group
    groups.append('rect')
        .attr('x', 0)
        .attr('y', d => yScale(d.control))
        .attr('width', xScale.bandwidth() / 2)
        .attr('height', d => height - margin.bottom - yScale(d.control))
        .attr('fill', '#2c3e50')
        .attr('rx', 3)
        .attr('ry', 3);
    
    // Add bars for lion's mane group
    groups.append('rect')
        .attr('x', xScale.bandwidth() / 2)
        .attr('y', d => yScale(d.lionsMane))
        .attr('width', xScale.bandwidth() / 2)
        .attr('height', d => height - margin.bottom - yScale(d.lionsMane))
        .attr('fill', '#8b5a2b')
        .attr('rx', 3)
        .attr('ry', 3);
    
    // Add value labels for control group
    groups.append('text')
        .attr('x', xScale.bandwidth() / 4)
        .attr('y', d => yScale(d.control) - 5)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text(d => d.control);
    
    // Add value labels for lion's mane group
    groups.append('text')
        .attr('x', 3 * xScale.bandwidth() / 4)
        .attr('y', d => yScale(d.lionsMane) - 5)
        .attr('text-anchor', 'middle')
        .style('font-size', '12px')
        .text(d => d.lionsMane);
    
    // Add legend
    const legend = svg.append('g')
        .attr('transform', `translate(${width - margin.right - 100}, ${margin.top})`);
    
    // Control group legend
    legend.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', '#2c3e50');
    
    legend.append('text')
        .attr('x', 20)
        .attr('y', 12)
        .style('font-size', '12px')
        .text('Control');
    
    // Lion's mane group legend
    legend.append('rect')
        .attr('x', 0)
        .attr('y', 25)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', '#8b5a2b');
    
    legend.append('text')
        .attr('x', 20)
        .attr('y', 37)
        .style('font-size', '12px')
        .text('Lion\'s Mane');
}

function initResearchTimeline() {
    const container = document.querySelector('.research-timeline');
    
    // Set up SVG for research timeline
    const width = container.clientWidth;
    const height = container.clientHeight;
    const margin = { top: 40, right: 50, bottom: 40, left: 50 };
    
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Research timeline data
    const timelineData = [
        { year: 2009, event: 'First clinical trial on mild cognitive impairment', type: 'clinical' },
        { year: 2013, event: 'Neurotrophic properties study published', type: 'neurological' },
        { year: 2018, event: 'Effects on depression and anxiety in menopausal women', type: 'cognitive' },
        { year: 2020, event: 'Review of neuroprotective effects published', type: 'neurological' },
        { year: 2023, event: 'Study on neuron growth doubling published', type: 'neurological' },
        { year: 2023, event: 'Effects on cognitive function in young adults', type: 'cognitive' }
    ];
    
    // Set up scales
    const xScale = d3.scaleLinear()
        .domain([2008, 2024])
        .range([margin.left, width - margin.right]);
    
    // Add timeline axis
    svg.append('line')
        .attr('x1', margin.left)
        .attr('y1', height / 2)
        .attr('x2', width - margin.right)
        .attr('y2', height / 2)
        .style('stroke', '#333')
        .style('stroke-width', 2);
    
    // Add year markers
    for (let year = 2010; year <= 2023; year += 1) {
        svg.append('line')
            .attr('x1', xScale(year))
            .attr('y1', height / 2 - 5)
            .attr('x2', xScale(year))
            .attr('y2', height / 2 + 5)
            .style('stroke', '#333')
            .style('stroke-width', 1);
        
        svg.append('text')
            .attr('x', xScale(year))
            .attr('y', height / 2 + 20)
            .attr('text-anchor', 'middle')
            .style('font-size', '10px')
            .text(year);
    }
    
    // Add title
    svg.append('text')
        .attr('x', width / 2)
        .attr('y', margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .text('Key Research Timeline');
    
    // Add events
    const eventGroups = svg.selectAll('.event')
        .data(timelineData)
        .enter()
        .append('g')
        .attr('class', 'event')
        .attr('transform', d => `translate(${xScale(d.year)},${height / 2})`);
    
    // Add event dots
    eventGroups.append('circle')
        .attr('r', 8)
        .attr('fill', d => {
            if (d.type === 'clinical') return '#e27d60';
            if (d.type === 'neurological') return '#8b5a2b';
            return '#2c3e50';
        });
    
    // Add event labels
    eventGroups.append('text')
        .attr('y', d => (timelineData.indexOf(d) % 2 === 0) ? -15 : 30)
        .attr('text-anchor', 'middle')
        .style('font-size', '10px')
        .style('font-weight', 'bold')
        .text(d => d.year);
    
    // Add event descriptions with wrapping
    eventGroups.each(function(d, i) {
        const g = d3.select(this);
        const isEven = i % 2 === 0;
        
        const text = g.append('text')
            .attr('y', isEven ? -30 : 45)
            .attr('text-anchor', 'middle')
            .style('font-size', '9px');
        
        const words = d.event.split(' ');
        let line = '';
        let lineNumber = 0;
        const lineHeight = 12;
        
        words.forEach(word => {
            const testLine = line + word + ' ';
            
            if (testLine.length > 20) {
                text.append('tspan')
                    .attr('x', 0)
                    .attr('dy', lineNumber === 0 ? 0 : lineHeight)
                    .text(line);
                
                line = word + ' ';
                lineNumber++;
            } else {
                line = testLine;
            }
        });
        
        text.append('tspan')
            .attr('x', 0)
            .attr('dy', lineNumber === 0 ? 0 : lineHeight)
            .text(line);
    });
    
    // Add legend
    const legend = svg.append('g')
        .attr('transform', `translate(${width - margin.right - 120}, ${margin.top})`);
    
    // Clinical legend
    legend.append('circle')
        .attr('cx', 7)
        .attr('cy', 7)
        .attr('r', 7)
        .attr('fill', '#e27d60');
    
    legend.append('text')
        .attr('x', 20)
        .attr('y', 10)
        .style('font-size', '10px')
        .text('Clinical');
    
    // Neurological legend
    legend.append('circle')
        .attr('cx', 7)
        .attr('cy', 27)
        .attr('r', 7)
        .attr('fill', '#8b5a2b');
    
    legend.append('text')
        .attr('x', 20)
        .attr('y', 30)
        .style('font-size', '10px')
        .text('Neurological');
    
    // Cognitive legend
    legend.append('circle')
        .attr('cx', 7)
        .attr('cy', 47)
        .attr('r', 7)
        .attr('fill', '#2c3e50');
    
    legend.append('text')
        .attr('x', 20)
        .attr('y', 50)
        .style('font-size', '10px')
        .text('Cognitive');
}
