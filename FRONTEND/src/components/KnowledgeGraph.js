import React, { useRef, useEffect } from 'react';

const KnowledgeGraph = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const svg = svgRef.current;
    const width = 900;
    const height = 600;
    
    // Clear previous content
    svg.innerHTML = '';

    // Debug: Log the data structure
    console.log('KnowledgeGraph data:', data);

    // Create nodes data
    const nodes = [];
    const links = [];

    // Center node (title) - positioned in center
    const centerX = width / 2;
    const centerY = height / 2;
    const centerNode = {
      id: 'title',
      label: data.title || 'Research Paper',
      fullLabel: data.title || 'Research Paper',
      x: centerX,
      y: centerY,
      type: 'center',
      radius: 60
    };
    nodes.push(centerNode);

    // Category node - positioned to the right of title
    if (data.category) {
      const categoryShort = getCategoryShort(data.category);
      const categoryNode = {
        id: 'category',
        label: categoryShort,
        fullLabel: data.category,
        x: centerX + 250,
        y: centerY,
        type: 'category',
        radius: 45
      };
      nodes.push(categoryNode);
      links.push({ source: 'title', target: 'category' });
    }

    // Author nodes - positioned in inner ring with collision detection
    if (data.authors && data.authors.length > 0) {
      const authorCount = Math.min(data.authors.length, 12);
      const authorRadius = 160;
      const authorAngleStep = (2 * Math.PI) / authorCount;
      const minDistance = 80; // Minimum distance between nodes

      data.authors.slice(0, authorCount).forEach((author, index) => {
        const authorName = typeof author === 'string' ? author : author.name || author;
        const initials = getInitials(authorName);
        let angle = index * authorAngleStep - Math.PI / 2;
        
        // Adjust angle to avoid overlap with category
        if (data.category) {
          const categoryAngle = Math.atan2(0, 250); // Category is to the right
          const angleDiff = Math.abs(angle - categoryAngle);
          if (angleDiff < Math.PI / 6) { // If too close to category
            angle += Math.PI / 3; // Adjust angle
          }
        }
        
        const authorNode = {
          id: `author-${index}`,
          label: initials,
          fullLabel: authorName,
          x: centerX + authorRadius * Math.cos(angle),
          y: centerY + authorRadius * Math.sin(angle),
          type: 'author',
          radius: 32
        };
        
        // Check for collisions and adjust position
        let adjustedNode = adjustNodePosition(authorNode, nodes, minDistance);
        nodes.push(adjustedNode);
        links.push({ source: 'title', target: `author-${index}` });
      });
    }

    // Keyword nodes - positioned in outer ring with collision detection
    if (data.keywords && data.keywords.length > 0) {
      const keywordCount = Math.min(data.keywords.length, 10);
      const keywordRadius = 250;
      const keywordAngleStep = (2 * Math.PI) / keywordCount;
      const angleOffset = Math.PI / keywordCount; // Offset to avoid overlap with authors
      const minDistance = 90; // Minimum distance between nodes

      data.keywords.slice(0, keywordCount).forEach((keyword, index) => {
        const keywordText = typeof keyword === 'string' ? keyword : keyword.term || keyword;
        const initials = getInitials(keywordText);
        let angle = index * keywordAngleStep - Math.PI / 2 + angleOffset;
        
        const keywordNode = {
          id: `keyword-${index}`,
          label: initials,
          fullLabel: keywordText,
          x: centerX + keywordRadius * Math.cos(angle),
          y: centerY + keywordRadius * Math.sin(angle),
          type: 'keyword',
          radius: 30
        };
        
        // Check for collisions and adjust position
        let adjustedNode = adjustNodePosition(keywordNode, nodes, minDistance);
        nodes.push(adjustedNode);
        links.push({ source: 'title', target: `keyword-${index}` });
      });
    }

    // Helper function to adjust node position to avoid collisions
    function adjustNodePosition(newNode, existingNodes, minDistance) {
      let attempts = 0;
      const maxAttempts = 10;
      
      while (attempts < maxAttempts) {
        let hasCollision = false;
        
        for (const existingNode of existingNodes) {
          const distance = Math.sqrt(
            Math.pow(newNode.x - existingNode.x, 2) + 
            Math.pow(newNode.y - existingNode.y, 2)
          );
          
          if (distance < minDistance) {
            hasCollision = true;
            break;
          }
        }
        
        if (!hasCollision) {
          return newNode;
        }
        
        // Adjust position by moving slightly
        const angle = Math.atan2(newNode.y - centerY, newNode.x - centerX);
        const currentRadius = Math.sqrt(
          Math.pow(newNode.x - centerX, 2) + 
          Math.pow(newNode.y - centerY, 2)
        );
        
        newNode.x = centerX + (currentRadius + 20) * Math.cos(angle);
        newNode.y = centerY + (currentRadius + 20) * Math.sin(angle);
        
        attempts++;
      }
      
      return newNode;
    }

    // Helper function to get initials
    function getInitials(name) {
      const words = name.trim().split(' ');
      if (words.length === 1) {
        return words[0].charAt(0).toUpperCase();
      }
      return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
    }

    // Helper function to get category short form
    function getCategoryShort(category) {
      if (!category) return '';
      
      // Common category abbreviations
      const categoryMap = {
        'Animal Studies': 'AS',
        'Cross-Cutting Themes & Technologies': 'CCT',
        'Human & Human Cell Studies': 'HCS',
        'Microbial Studies': 'MS',
        'Plant Studies': 'PS',
        'Plant Biology': 'PB',
        'Human Biology': 'HB',
        'Microbiology': 'MB',
        'Biotechnology': 'BT'
      };
      
      // Check if we have a direct mapping
      if (categoryMap[category]) {
        return categoryMap[category];
      }
      
      // If no direct mapping, create abbreviation from first letters
      const words = category.split(' ');
      if (words.length <= 2) {
        return words.map(word => word.charAt(0).toUpperCase()).join('');
      }
      
      // For longer categories, take first letter of first 3 words
      return words.slice(0, 3).map(word => word.charAt(0).toUpperCase()).join('');
    }

    // Draw links
    links.forEach(link => {
      const sourceNode = nodes.find(n => n.id === link.source);
      const targetNode = nodes.find(n => n.id === link.target);
      
      if (sourceNode && targetNode) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', sourceNode.x);
        line.setAttribute('y1', sourceNode.y);
        line.setAttribute('x2', targetNode.x);
        line.setAttribute('y2', targetNode.y);
        line.setAttribute('stroke', '#06b6d4');
        line.setAttribute('stroke-width', '2');
        line.setAttribute('opacity', '0.6');
        svg.appendChild(line);
      }
    });

    // Create tooltip group with high z-index - append at the end to ensure it's on top
    const tooltipGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    tooltipGroup.setAttribute('id', 'tooltip-group');
    tooltipGroup.setAttribute('visibility', 'hidden');
    tooltipGroup.setAttribute('style', 'z-index: 9999; pointer-events: none;');
    
    // Tooltip background
    const tooltipBg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    tooltipBg.setAttribute('id', 'tooltip-bg');
    tooltipBg.setAttribute('rx', '8');
    tooltipBg.setAttribute('ry', '8');
    tooltipBg.setAttribute('fill', 'rgba(0, 0, 0, 0.95)');
    tooltipBg.setAttribute('stroke', '#3b82f6');
    tooltipBg.setAttribute('stroke-width', '2');
    tooltipBg.setAttribute('filter', 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4))');
    
    // Tooltip text
    const tooltip = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    tooltip.setAttribute('id', 'tooltip-text');
    tooltip.setAttribute('x', '12');
    tooltip.setAttribute('y', '20');
    tooltip.setAttribute('fill', 'white');
    tooltip.setAttribute('font-size', '14');
    tooltip.setAttribute('font-weight', 'bold');
    tooltip.setAttribute('font-family', 'Arial, sans-serif');
    tooltip.setAttribute('pointer-events', 'none');
    tooltip.textContent = '';
    
    tooltipGroup.appendChild(tooltipBg);
    tooltipGroup.appendChild(tooltip);

    // Draw nodes
    nodes.forEach(node => {
      // Create group for each node
      const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      
      // Node circle
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', node.x);
      circle.setAttribute('cy', node.y);
      circle.setAttribute('r', node.radius);
      
      // Set colors based on node type
      switch (node.type) {
        case 'center':
          circle.setAttribute('fill', '#1e40af');
          circle.setAttribute('stroke', '#3b82f6');
          break;
        case 'category':
          circle.setAttribute('fill', '#7c3aed');
          circle.setAttribute('stroke', '#8b5cf6');
          break;
        case 'author':
          circle.setAttribute('fill', '#059669');
          circle.setAttribute('stroke', '#10b981');
          break;
        case 'keyword':
          circle.setAttribute('fill', '#dc2626');
          circle.setAttribute('stroke', '#ef4444');
          break;
        default:
          circle.setAttribute('fill', '#6b7280');
          circle.setAttribute('stroke', '#9ca3af');
      }
      
      circle.setAttribute('stroke-width', '2');
      circle.setAttribute('cursor', 'pointer');
      
      // Add hover events
      circle.addEventListener('mouseenter', (e) => {
        const rect = svg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        tooltipGroup.setAttribute('visibility', 'visible');
        tooltipGroup.setAttribute('transform', `translate(${x + 15}, ${y - 50})`);
        tooltip.textContent = node.fullLabel;
        
        // Calculate text width for background
        const textLength = node.fullLabel.length;
        const textWidth = Math.max(textLength * 8 + 20, 100); // Minimum width
        const textHeight = 25;
        
        tooltipBg.setAttribute('x', '0');
        tooltipBg.setAttribute('y', '0');
        tooltipBg.setAttribute('width', textWidth);
        tooltipBg.setAttribute('height', textHeight);
        
        // Only change stroke width, keep opacity at 1
        circle.setAttribute('stroke-width', '4');
        circle.setAttribute('opacity', '1');
      });
      
      circle.addEventListener('mousemove', (e) => {
        const rect = svg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        tooltipGroup.setAttribute('transform', `translate(${x + 15}, ${y - 50})`);
      });
      
      circle.addEventListener('mouseleave', () => {
        tooltipGroup.setAttribute('visibility', 'hidden');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('opacity', '1');
      });
      
      group.appendChild(circle);

      // Node text
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      text.setAttribute('x', node.x);
      text.setAttribute('y', node.y);
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.setAttribute('fill', 'white');
      text.setAttribute('font-size', node.type === 'center' ? '8' : '10');
      text.setAttribute('font-weight', 'bold');
      text.setAttribute('pointer-events', 'none');
      
      // For center node, show truncated title
      let displayText = node.label;
      if (node.type === 'center') {
        if (displayText.length > 15) {
          displayText = displayText.substring(0, 12) + '...';
        }
      }
      
      text.textContent = displayText;
      group.appendChild(text);
      
      svg.appendChild(group);
    });

    // Append tooltip group at the end to ensure it's on top
    svg.appendChild(tooltipGroup);

  }, [data]);

  if (!data) {
    return (
      <div className="bg-gray-800 rounded-lg p-8 text-center">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        </div>
        <p className="text-gray-400">No knowledge graph data available</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-xl font-bold text-white mb-4 text-center">Knowledge Graph</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[900px] flex justify-center">
          <svg
            ref={svgRef}
            width="900"
            height="600"
            className="border border-gray-600 rounded-lg bg-gray-900"
          />
        </div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-blue-400"></div>
          <span className="text-gray-300">Title (Center)</span>
        </div>
        {data.category && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-600 rounded-full border-2 border-purple-400"></div>
            <span className="text-gray-300">Category (Right)</span>
          </div>
        )}
        {data.authors && data.authors.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded-full border-2 border-green-400"></div>
            <span className="text-gray-300">Authors (Inner Ring) ({data.authors.length})</span>
          </div>
        )}
        {data.keywords && data.keywords.length > 0 && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-red-400"></div>
            <span className="text-gray-300">Keywords (Outer Ring) ({data.keywords.length})</span>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-4 text-center text-sm text-gray-400">
        <p>💡 Hover over nodes to see full names - tooltip follows your cursor</p>
        {(!data.authors || data.authors.length === 0) && (!data.keywords || data.keywords.length === 0) && (
          <p>No additional data available for visualization</p>
        )}
        {data.authors && data.authors.length > 12 && (
          <p>Showing first 12 of {data.authors.length} authors</p>
        )}
        {data.keywords && data.keywords.length > 10 && (
          <p>Showing first 10 of {data.keywords.length} keywords</p>
        )}
      </div>
    </div>
  );
};

export default KnowledgeGraph;
