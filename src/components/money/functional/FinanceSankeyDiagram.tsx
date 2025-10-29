import React, { useEffect, useRef, useState } from 'react';
import { sankey, sankeyLinkHorizontal, SankeyGraph, SankeyNode as D3SankeyNode, SankeyLink as D3SankeyLink } from 'd3-sankey';
import type { SankeyDataResponse } from '../../../types/finance';
import { formatCurrency } from '../../../types/finance';

interface FinanceSankeyDiagramProps {
  data: SankeyDataResponse;
  onCategoryClick?: (categoryId: string, categoryName: string) => void;
  compact?: boolean;
}

interface FlowNode {
  id: string;
  name: string;
  color: string;
}

interface FlowLink {
  source: number;
  target: number;
  value: number;
  sourceId: string;
  targetId: string;
}

/**
 * Finance Sankey Diagram - Shows money flow from Income to Categories/Savings
 * Uses D3 Sankey layout for visualization
 */
export const FinanceSankeyDiagram: React.FC<FinanceSankeyDiagramProps> = ({ 
  data, 
  onCategoryClick,
  compact = false 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !data.nodes.length || !data.links.length) return;

    // Calculate dynamic height based on number of nodes
    // More categories = taller diagram to prevent cramping
    const categoryCount = data.nodes.filter(n => n.id.startsWith('cat_')).length;
    const baseHeight = isMobile ? 400 : (compact ? 350 : 500);
    const heightPerCategory = isMobile ? 35 : 40; // Increased from 30 to 40
    const minHeight = baseHeight;
    const maxHeight = isMobile ? 1000 : 1200; // Increased max height
    
    // Calculate dynamic height: base + extra space per category
    const calculatedHeight = Math.min(
      Math.max(minHeight, baseHeight + (categoryCount * heightPerCategory)),
      maxHeight
    );

    // Responsive dimensions with more width for labels
    const width = isMobile ? 380 : (compact ? 550 : 900); // Increased width
    const height = calculatedHeight;
    const margin = { 
      top: 30, // Increased top margin
      right: isMobile ? 120 : 160, // More space for right labels
      bottom: 30, // Increased bottom margin
      left: isMobile ? 120 : 160  // More space for left labels
    };

    console.log(`📊 Sankey dimensions: ${categoryCount} categories, height=${height}px, width=${width}px`);

    // Clear previous content
    const svg = svgRef.current;
    svg.innerHTML = '';
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

    // Create node ID to index mapping
    const nodeIdToIndex = new Map<string, number>();
    data.nodes.forEach((node, index) => {
      nodeIdToIndex.set(node.id, index);
    });

    // Prepare nodes for D3
    const nodes: FlowNode[] = data.nodes.map(node => ({
      id: node.id,
      name: node.name,
      color: node.color,
    }));

    // Prepare links for D3 (convert IDs to indices)
    const links: FlowLink[] = data.links.map(link => {
      const sourceIndex = nodeIdToIndex.get(link.source);
      const targetIndex = nodeIdToIndex.get(link.target);
      
      if (sourceIndex === undefined || targetIndex === undefined) {
        console.warn('Invalid link:', link);
        return null;
      }

      return {
        source: sourceIndex,
        target: targetIndex,
        value: link.value,
        sourceId: link.source,
        targetId: link.target,
      };
    }).filter((link): link is FlowLink => link !== null);

    // Create sankey generator with dynamic node sizing
    const nodeWidth = isMobile ? 18 : (compact ? 20 : 25); // Slightly thicker nodes
    const nodePadding = Math.max(12, Math.min(40, (height - margin.top - margin.bottom) / categoryCount - 8)); // More padding
    
    const sankeyGenerator = sankey<FlowNode, FlowLink>()
      .nodeWidth(nodeWidth)
      .nodePadding(nodePadding)
      .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]]);

    console.log(`📊 Node padding: ${nodePadding}px for ${categoryCount} categories`);

    // Generate the sankey layout
    const graph: SankeyGraph<FlowNode, FlowLink> = sankeyGenerator({
      nodes: nodes.map(d => ({ ...d })),
      links: links.map(d => ({ ...d })),
    });

    // Create SVG group
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    svg.appendChild(g);

    // Create <defs> for gradient definitions
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    svg.appendChild(defs);

    // Draw links (flows) with gradients
    graph.links.forEach((link: D3SankeyLink<FlowNode, FlowLink>) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const pathData = sankeyLinkHorizontal()(link);
      
      if (pathData) {
        const sourceNode = link.source as D3SankeyNode<FlowNode, FlowLink>;
        const targetNode = link.target as D3SankeyNode<FlowNode, FlowLink>;
        const sourceColor = sourceNode.color || '#94A3B8';
        const targetColor = targetNode.color || '#94A3B8';
        const linkId = `${sourceNode.id}-${targetNode.id}`;
        const gradientId = `gradient-${linkId}`;
        
        // Create linear gradient for this link
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', gradientId);
        gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
        gradient.setAttribute('x1', (sourceNode.x1 || 0).toString());
        gradient.setAttribute('y1', (((sourceNode.y0 || 0) + (sourceNode.y1 || 0)) / 2).toString());
        gradient.setAttribute('x2', (targetNode.x0 || 0).toString());
        gradient.setAttribute('y2', (((targetNode.y0 || 0) + (targetNode.y1 || 0)) / 2).toString());
        
        // Start color (source node color)
        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', sourceColor);
        stop1.setAttribute('stop-opacity', hoveredLink === linkId ? '0.85' : '0.5');
        
        // End color (target node color)
        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', targetColor);
        stop2.setAttribute('stop-opacity', hoveredLink === linkId ? '0.85' : '0.5');
        
        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        
        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', `url(#${gradientId})`);
        path.setAttribute('stroke-width', Math.max(1, (link.width || 0)).toString());
        path.style.cursor = 'pointer';
        path.style.transition = 'opacity 0.2s ease';
        
        // Hover effects - just increase opacity, no tooltip
        path.addEventListener('mouseenter', () => {
          setHoveredLink(linkId);
          // Update gradient opacity on hover
          const stops = gradient.querySelectorAll('stop');
          stops.forEach(stop => stop.setAttribute('stop-opacity', '0.85'));
        });
        
        path.addEventListener('mouseleave', () => {
          setHoveredLink(null);
          // Reset gradient opacity
          const stops = gradient.querySelectorAll('stop');
          stops.forEach(stop => stop.setAttribute('stop-opacity', '0.5'));
        });
        
        // Click to filter by category
        path.addEventListener('click', () => {
          if (onCategoryClick && targetNode.id !== 'income' && targetNode.id !== 'savings') {
            onCategoryClick(targetNode.id, targetNode.name);
          }
        });
        
        g.appendChild(path);
      }
    });

    // Draw nodes
    graph.nodes.forEach((node: D3SankeyNode<FlowNode, FlowLink>) => {
      const isIncome = node.id === 'income';
      const nodeColor = node.color || '#94A3B8';

      // Node rectangle
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', (node.x0 || 0).toString());
      rect.setAttribute('y', (node.y0 || 0).toString());
      rect.setAttribute('width', ((node.x1 || 0) - (node.x0 || 0)).toString());
      rect.setAttribute('height', ((node.y1 || 0) - (node.y0 || 0)).toString());
      rect.setAttribute('fill', nodeColor);
      rect.setAttribute('rx', '4');
      rect.style.cursor = isIncome ? 'default' : 'pointer';
      
      // Click handler for category nodes
      if (!isIncome && node.id !== 'savings' && onCategoryClick) {
        rect.addEventListener('click', () => {
          onCategoryClick(node.id, node.name);
        });
      }
      
      g.appendChild(rect);

      // Node label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      const xPos = isIncome ? (node.x0 || 0) - 8 : (node.x1 || 0) + 8;
      const yPos = ((node.y0 || 0) + (node.y1 || 0)) / 2;
      
      text.setAttribute('x', xPos.toString());
      text.setAttribute('y', yPos.toString());
      text.setAttribute('dy', '0.35em');
      text.setAttribute('text-anchor', isIncome ? 'end' : 'start');
      text.setAttribute('font-size', isMobile ? '11px' : (compact ? '12px' : '14px'));
      text.setAttribute('font-weight', '600');
      text.setAttribute('fill', '#f3f4f6');
      text.textContent = node.name;
      g.appendChild(text);

      // Value label (below name)
      const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      valueText.setAttribute('x', xPos.toString());
      valueText.setAttribute('y', (yPos + (isMobile ? 14 : (compact ? 15 : 17))).toString());
      valueText.setAttribute('dy', '0.35em');
      valueText.setAttribute('text-anchor', isIncome ? 'end' : 'start');
      valueText.setAttribute('font-size', isMobile ? '10px' : (compact ? '11px' : '12px'));
      valueText.setAttribute('font-weight', '500');
      valueText.setAttribute('fill', '#9ca3af');
      
      // Calculate node value from links
      const nodeValue = isIncome 
        ? data.summary.total_income
        : graph.links
            .filter((l: any) => (l.target as any).id === node.id)
            .reduce((sum: number, l: any) => sum + (l.value || 0), 0);
      
      valueText.textContent = formatCurrency(nodeValue);
      g.appendChild(valueText);
    });

  }, [data, compact, isMobile, hoveredLink, onCategoryClick]);

  if (!data.nodes.length || !data.links.length) {
    return (
      <div style={{
        padding: compact ? '20px' : '40px',
        textAlign: 'center',
        color: '#9ca3af',
        fontSize: '14px',
      }}>
        No money flow data available for this month
      </div>
    );
  }

  return (
    <div style={{
      padding: isMobile ? '12px' : (compact ? '16px' : '20px'),
      overflow: 'auto',
      position: 'relative',
    }}>
      {/* Instruction text - top right corner */}
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        fontSize: isMobile ? '11px' : '12px',
        color: '#d1d5db',
        fontStyle: 'italic',
        textAlign: 'right',
        maxWidth: isMobile ? '180px' : '250px',
        lineHeight: '1.4',
        zIndex: 10,
      }}>
        Click any flow or category to filter transactions
      </div>

      {/* Sankey diagram */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        overflowX: 'auto',
        marginTop: isMobile ? '32px' : '0',
      }}>
        <svg 
          ref={svgRef} 
          style={{ 
            overflow: 'visible',
            maxWidth: '100%',
            height: 'auto',
          }} 
        />
      </div>
    </div>
  );
};

export default FinanceSankeyDiagram;
