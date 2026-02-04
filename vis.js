// ===== SVG Visualization Module =====

// Initialize visualizations when the DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const dataVizElement = document.getElementById('dataVisualization');
    const creativeArtElement = document.getElementById('creativeArt');

    if (dataVizElement) {
        createDataVisualization(dataVizElement);
    }

    if (creativeArtElement) {
        createCreativeArt(creativeArtElement);
    }
});

// ===== Data Visualization: Programming Language Popularity =====
function createDataVisualization(svgElement) {
    // Data: Programming languages and their popularity scores
    const data = [
        { language: 'JavaScript', popularity: 85, color: '#f7df1e' },
        { language: 'Python', popularity: 90, color: '#3776ab' },
        { language: 'Java', popularity: 75, color: '#007396' },
        { language: 'C#', popularity: 70, color: '#239120' },
        { language: 'TypeScript', popularity: 82, color: '#3178c6' },
        { language: 'React', popularity: 88, color: '#61dafb' },
        { language: 'CSS', popularity: 78, color: '#563d7c' }
    ];

    // SVG dimensions
    const svgWidth = 600;
    const svgHeight = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 80 };
    const chartWidth = svgWidth - margin.left - margin.right;
    const chartHeight = svgHeight - margin.top - margin.bottom;

    // Clear the SVG
    while (svgElement.firstChild) {
        svgElement.removeChild(svgElement.firstChild);
    }

    // Set SVG attributes
    svgElement.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
    svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Create main group
    const mainGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    mainGroup.setAttribute('transform', `translate(${margin.left},${margin.top})`);

    // Calculate scales
    const maxPopularity = Math.max(...data.map(d => d.popularity));
    const barWidth = chartWidth / (data.length * 1.5);
    const barSpacing = chartWidth / data.length;

    // Draw bars
    data.forEach((item, index) => {
        const barHeight = (item.popularity / maxPopularity) * chartHeight;
        const x = index * barSpacing + (barSpacing - barWidth) / 2;
        const y = chartHeight - barHeight;

        // Create group for each bar
        const barGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        barGroup.setAttribute('class', 'bar-group');

        // Create bar
        const bar = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        bar.setAttribute('x', x);
        bar.setAttribute('y', y);
        bar.setAttribute('width', barWidth);
        bar.setAttribute('height', barHeight);
        bar.setAttribute('fill', item.color);
        bar.setAttribute('class', 'bar');
        bar.style.transition = 'all 0.3s ease';
        bar.style.cursor = 'pointer';

        // Add hover effect
        bar.addEventListener('mouseenter', function() {
            this.style.opacity = '0.7';
            this.style.transform = 'scale(1.05)';
        });

        bar.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });

        // Create label
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', x + barWidth / 2);
        label.setAttribute('y', chartHeight + 15);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('font-size', '12');
        label.setAttribute('fill', '#333');
        label.textContent = item.language;

        // Create value label
        const valueLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        valueLabel.setAttribute('x', x + barWidth / 2);
        valueLabel.setAttribute('y', y - 5);
        valueLabel.setAttribute('text-anchor', 'middle');
        valueLabel.setAttribute('font-size', '12');
        valueLabel.setAttribute('font-weight', 'bold');
        valueLabel.setAttribute('fill', item.color);
        valueLabel.textContent = item.popularity;

        barGroup.appendChild(bar);
        barGroup.appendChild(label);
        barGroup.appendChild(valueLabel);
        mainGroup.appendChild(barGroup);
    });

    // Draw X-axis
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', 0);
    xAxis.setAttribute('y1', chartHeight);
    xAxis.setAttribute('x2', chartWidth);
    xAxis.setAttribute('y2', chartHeight);
    xAxis.setAttribute('stroke', '#ddd');
    xAxis.setAttribute('stroke-width', '2');
    mainGroup.appendChild(xAxis);

    // Draw Y-axis
    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', 0);
    yAxis.setAttribute('y1', 0);
    yAxis.setAttribute('x2', 0);
    yAxis.setAttribute('y2', chartHeight);
    yAxis.setAttribute('stroke', '#ddd');
    yAxis.setAttribute('stroke-width', '2');
    mainGroup.appendChild(yAxis);

    // Draw Y-axis labels
    for (let i = 0; i <= 5; i++) {
        const value = (maxPopularity / 5) * i;
        const y = chartHeight - ((chartHeight / 5) * i);

        const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        gridLine.setAttribute('x1', 0);
        gridLine.setAttribute('y1', y);
        gridLine.setAttribute('x2', chartWidth);
        gridLine.setAttribute('y2', y);
        gridLine.setAttribute('stroke', '#f0f0f0');
        gridLine.setAttribute('stroke-width', '1');
        mainGroup.appendChild(gridLine);

        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', -10);
        label.setAttribute('y', y + 3);
        label.setAttribute('text-anchor', 'end');
        label.setAttribute('font-size', '12');
        label.setAttribute('fill', '#999');
        label.textContent = Math.round(value);
        mainGroup.appendChild(label);
    }

    // Add title
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', chartWidth / 2);
    title.setAttribute('y', -5);
    title.setAttribute('text-anchor', 'middle');
    title.setAttribute('font-size', '16');
    title.setAttribute('font-weight', 'bold');
    title.setAttribute('fill', '#2c3e50');
    title.textContent = 'Language Popularity Score';
    mainGroup.appendChild(title);

    svgElement.appendChild(mainGroup);
}

// ===== Creative SVG Art: Interactive Pattern Generator =====
function createCreativeArt(svgElement) {
    const svgWidth = 600;
    const svgHeight = 400;

    // Clear the SVG
    while (svgElement.firstChild) {
        svgElement.removeChild(svgElement.firstChild);
    }

    // Set SVG attributes
    svgElement.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
    svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Create background
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('width', svgWidth);
    background.setAttribute('height', svgHeight);
    background.setAttribute('fill', '#f8f9fa');
    svgElement.appendChild(background);

    // Create defs for gradients
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Create gradient
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'artGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');

    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', '#3498db');

    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', '#e74c3c');

    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svgElement.appendChild(defs);

    // Create interactive circles pattern
    const rows = 4;
    const cols = 5;
    const circleRadius = 25;
    const spacingX = svgWidth / (cols + 1);
    const spacingY = svgHeight / (rows + 1);

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cx = spacingX * (col + 1);
            const cy = spacingY * (row + 1);

            // Create group for each circle
            const circleGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            circleGroup.setAttribute('class', 'interactive-circle');

            // Create outer circle (for interaction area)
            const outerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            outerCircle.setAttribute('cx', cx);
            outerCircle.setAttribute('cy', cy);
            outerCircle.setAttribute('r', circleRadius);
            outerCircle.setAttribute('fill', '#3498db');
            outerCircle.setAttribute('opacity', '0.3');
            outerCircle.style.transition = 'all 0.3s ease';

            // Create inner circle
            const innerCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            innerCircle.setAttribute('cx', cx);
            innerCircle.setAttribute('cy', cy);
            innerCircle.setAttribute('r', circleRadius / 2);
            innerCircle.setAttribute('fill', 'url(#artGradient)');
            innerCircle.style.transition = 'all 0.3s ease';

            // Add interactivity
            circleGroup.addEventListener('mouseenter', function() {
                outerCircle.setAttribute('r', circleRadius * 1.5);
                outerCircle.setAttribute('opacity', '0.6');
                innerCircle.setAttribute('r', (circleRadius / 2) * 1.3);
            });

            circleGroup.addEventListener('mouseleave', function() {
                outerCircle.setAttribute('r', circleRadius);
                outerCircle.setAttribute('opacity', '0.3');
                innerCircle.setAttribute('r', circleRadius / 2);
            });

            // Create connecting lines
            if (col < cols - 1) {
                const nextCx = spacingX * (col + 2);
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', cx);
                line.setAttribute('y1', cy);
                line.setAttribute('x2', nextCx);
                line.setAttribute('y2', cy);
                line.setAttribute('stroke', '#ecf0f1');
                line.setAttribute('stroke-width', '1');
                line.style.transition = 'stroke 0.3s ease';
                svgElement.appendChild(line);
            }

            circleGroup.appendChild(outerCircle);
            circleGroup.appendChild(innerCircle);
            svgElement.appendChild(circleGroup);
        }
    }

    // Add title and description
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.setAttribute('x', svgWidth / 2);
    title.setAttribute('y', 25);
    title.setAttribute('text-anchor', 'middle');
    title.setAttribute('font-size', '16');
    title.setAttribute('font-weight', 'bold');
    title.setAttribute('fill', '#2c3e50');
    title.textContent = 'Interactive Pattern - Hover to Interact';
    svgElement.appendChild(title);

    const description = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    description.setAttribute('x', svgWidth / 2);
    description.setAttribute('y', svgHeight - 10);
    description.setAttribute('text-anchor', 'middle');
    description.setAttribute('font-size', '12');
    description.setAttribute('fill', '#999');
    description.textContent = 'This creative visualization demonstrates interactive SVG elements';
    svgElement.appendChild(description);
}

// ===== Utility: Responsive SVG Sizing =====
window.addEventListener('resize', debounce(function() {
    const dataVizElement = document.getElementById('dataVisualization');
    const creativeArtElement = document.getElementById('creativeArt');

    if (dataVizElement && dataVizElement.parentElement) {
        createDataVisualization(dataVizElement);
    }

    if (creativeArtElement && creativeArtElement.parentElement) {
        createCreativeArt(creativeArtElement);
    }
}, 250));

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

console.log('Visualizations loaded successfully!');
