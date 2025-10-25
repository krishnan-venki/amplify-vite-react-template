import React, { useEffect, useRef } from 'react';
import { sankey, sankeyLinkHorizontal, SankeyGraph, SankeyNode, SankeyLink } from 'd3-sankey';
import { VisualizationData } from '../../types/insight';

interface ReallocationFlowChartProps {
  data: VisualizationData[];
  gradient?: string;
  compact?: boolean;
}

interface FlowNode {
  name: string;
}

interface FlowLink {
  source: number;
  target: number;
  value: number;
}

/**
 * Sankey diagram showing money reallocation from spending categories to a goal
 * Data format: [
 *   { label: "Dining", value: -200, type: "source" },
 *   { label: "Entertainment", value: -150, type: "source" },
 *   { label: "Emergency Fund", value: 350, type: "target" }
 * ]
 */
const ReallocationFlowChart: React.FC<ReallocationFlowChartProps> = ({ 
  data, 
  gradient,
  compact = false 
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.abs(value));
  };

  useEffect(() => {
    if (!svgRef.current || !data.length) return;

    // Parse data into nodes and links
    const sources = data.filter(d => d.type === 'source' || (d.value < 0));
    const targets = data.filter(d => d.type === 'target' || (d.value > 0));

    if (sources.length === 0 || targets.length === 0) return;

    // Color palette for different source categories
    const sourceColors = [
      '#f59e0b', // amber/orange
      '#8b5cf6', // purple
      '#ef4444', // red
      '#06b6d4', // cyan
      '#ec4899', // pink
      '#f97316', // orange
    ];

    // Create nodes: sources first, then targets
    const nodes: FlowNode[] = [
      ...sources.map(s => ({ name: s.label || 'Source' })),
      ...targets.map(t => ({ name: t.label || 'Target' })),
    ];

    // Create links from each source to each target (proportionally)
    const links: FlowLink[] = [];
    const totalTarget = targets.reduce((sum, t) => sum + Math.abs(t.value), 0);

    sources.forEach((source, sourceIdx) => {
      targets.forEach((target, targetIdx) => {
        const targetNodeIdx = sources.length + targetIdx;
        // Distribute source proportionally across targets
        const proportion = Math.abs(target.value) / totalTarget;
        const linkValue = Math.abs(source.value) * proportion;
        
        links.push({
          source: sourceIdx,
          target: targetNodeIdx,
          value: linkValue,
        });
      });
    });

    // Set up dimensions
    const width = compact ? 400 : 600;
    const height = compact ? 250 : 350;
    const margin = { top: 20, right: 120, bottom: 20, left: 120 };

    // Clear previous content
    const svg = svgRef.current;
    svg.innerHTML = '';
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());

    // Create sankey generator
    const sankeyGenerator = sankey<FlowNode, FlowLink>()
      .nodeWidth(compact ? 15 : 20)
      .nodePadding(compact ? 15 : 20)
      .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]]);

    // Generate the sankey layout
    const graph: SankeyGraph<FlowNode, FlowLink> = sankeyGenerator({
      nodes: nodes.map(d => ({ ...d })),
      links: links.map(d => ({ ...d })),
    });

    // Create SVG group
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    svg.appendChild(g);

    // Draw links (flows) - each link gets the color of its source
    graph.links.forEach((link: SankeyLink<FlowNode, FlowLink>) => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      const pathData = sankeyLinkHorizontal()(link);
      if (pathData) {
        // Get the source node index to determine color
        const sourceIdx = typeof link.source === 'number' ? link.source : (link.source as any).index || 0;
        const linkColor = sourceColors[sourceIdx % sourceColors.length];
        
        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', linkColor);
        path.setAttribute('stroke-opacity', '0.65');
        path.setAttribute('stroke-width', Math.max(1, (link.width || 0)).toString());
        
        // Hover effect
        path.addEventListener('mouseenter', () => {
          path.setAttribute('stroke-opacity', '0.75');
        });
        path.addEventListener('mouseleave', () => {
          path.setAttribute('stroke-opacity', '0.65');
        });
        
        g.appendChild(path);
      }
    });

    // Draw nodes
    graph.nodes.forEach((node: SankeyNode<FlowNode, FlowLink>, idx: number) => {
      const isSource = idx < sources.length;
      // Use different colors for each source, green for target
      const color = isSource 
        ? sourceColors[idx % sourceColors.length]
        : '#10b981'; // green for target

      // Node rectangle
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', (node.x0 || 0).toString());
      rect.setAttribute('y', (node.y0 || 0).toString());
      rect.setAttribute('width', ((node.x1 || 0) - (node.x0 || 0)).toString());
      rect.setAttribute('height', ((node.y1 || 0) - (node.y0 || 0)).toString());
      rect.setAttribute('fill', color);
      rect.setAttribute('rx', '4');
      g.appendChild(rect);

      // Node label
      const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      const xPos = isSource ? (node.x0 || 0) - 8 : (node.x1 || 0) + 8;
      const yPos = ((node.y0 || 0) + (node.y1 || 0)) / 2;
      
      text.setAttribute('x', xPos.toString());
      text.setAttribute('y', yPos.toString());
      text.setAttribute('dy', '0.35em');
      text.setAttribute('text-anchor', isSource ? 'end' : 'start');
      text.setAttribute('font-size', compact ? '11px' : '13px');
      text.setAttribute('font-weight', '600');
      text.setAttribute('fill', gradient === '#ffffff' ? '#1f2937' : '#ffffff');
      text.textContent = node.name;
      g.appendChild(text);

      // Value label
      const valueText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      valueText.setAttribute('x', xPos.toString());
      valueText.setAttribute('y', (yPos + (compact ? 14 : 16)).toString());
      valueText.setAttribute('dy', '0.35em');
      valueText.setAttribute('text-anchor', isSource ? 'end' : 'start');
      valueText.setAttribute('font-size', compact ? '10px' : '11px');
      valueText.setAttribute('font-weight', '500');
      valueText.setAttribute('fill', gradient === '#ffffff' ? '#6b7280' : '#d1d5db');
      
      const originalValue = isSource 
        ? sources[idx]?.value 
        : targets[idx - sources.length]?.value;
      valueText.textContent = formatCurrency(originalValue || 0);
      g.appendChild(valueText);
    });

  }, [data, compact]);

  if (!data.length) {
    return (
      <div style={{
        padding: compact ? '20px' : '40px',
        textAlign: 'center',
        color: '#9ca3af',
      }}>
        No reallocation data available
      </div>
    );
  }

  // Parse sources and targets for legend
  const sources = data.filter(d => d.type === 'source' || (d.value < 0));
  const targets = data.filter(d => d.type === 'target' || (d.value > 0));
  
  // Color palette matching the one in useEffect
  const sourceColors = [
    '#f59e0b', // amber/orange
    '#8b5cf6', // purple
    '#ef4444', // red
    '#06b6d4', // cyan
    '#ec4899', // pink
    '#f97316', // orange
  ];

  return (
    <div style={{
      padding: compact ? '12px' : '16px',
      background: gradient || 'transparent',
      overflow: 'auto',
    }}>
      {/* Header */}
      <div style={{
        marginBottom: compact ? '12px' : '16px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: compact ? '13px' : '14px',
          fontWeight: 600,
          color: gradient === '#ffffff' ? '#1f2937' : '#ffffff',
          marginBottom: '4px',
        }}>
          Reallocation Plan Proposal
        </div>
        <div style={{
          fontSize: compact ? '11px' : '12px',
          color: gradient === '#ffffff' ? '#6b7280' : '#d1d5db',
        }}>
          Money flow from spending categories to goal
        </div>
      </div>

      {/* Sankey diagram */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <svg ref={svgRef} style={{ overflow: 'visible' }} />
      </div>

      {/* Legend - Dynamic based on sources */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '16px',
        marginTop: compact ? '12px' : '16px',
        fontSize: compact ? '11px' : '12px',
      }}>
        {sources.map((source, idx) => (
          <div key={`source-${idx}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: sourceColors[idx % sourceColors.length],
              borderRadius: '2px',
            }} />
            <span style={{ color: gradient === '#ffffff' ? '#6b7280' : '#d1d5db' }}>{source.label}</span>
          </div>
        ))}
        {targets.map((target, idx) => (
          <div key={`target-${idx}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              background: '#10b981',
              borderRadius: '2px',
            }} />
            <span style={{ color: gradient === '#ffffff' ? '#6b7280' : '#d1d5db' }}>{target.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReallocationFlowChart;
