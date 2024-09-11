'use client';
import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faExpand } from '@fortawesome/free-solid-svg-icons';
import type { Entity } from '../types';

interface NetworkGraphProps {
  data: Entity[];
}

const NetworkGraph: React.FC<NetworkGraphProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [filteredData] = useState(data);
  const [selectedNode, setSelectedNode] = useState<Entity | null>(null);

  useEffect(() => {
    drawGraph();
  }, [filteredData]);

  const drawGraph = () => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 800;
    const radius = Math.min(width, height) / 2;
    const svg = d3.select<SVGSVGElement, unknown>(svgRef.current);
    svg.selectAll('*').remove();

    const container = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const sectors = [
      { type: 'Character', startAngle: 0, endAngle: 120 },
      { type: 'Location', startAngle: 120, endAngle: 240 },
      { type: 'Object', startAngle: 240, endAngle: 360 }
    ];

    const radialScale = d3.scaleLinear().domain([0, 1]).range([0, radius]);

    filteredData.forEach((entity) => {
      entity.connections.forEach((conn) => {
        const target = filteredData.find((d) => d.id === conn.id);
        if (target) {
          container.append('line')
            .attr('x1', radialScale(entity.position.distance) * Math.cos((entity.position.angle * Math.PI) / 180))
            .attr('y1', radialScale(entity.position.distance) * Math.sin((entity.position.angle * Math.PI) / 180))
            .attr('x2', radialScale(target.position.distance) * Math.cos((target.position.angle * Math.PI) / 180))
            .attr('y2', radialScale(target.position.distance) * Math.sin((target.position.angle * Math.PI) / 180))
            .attr('stroke-width', conn.strength * 5)
            .attr('stroke', '#3AF');
        }
      });
    });

    const ringCount = 3;
    const ringRadius = radius / ringCount;
    for (let i = 1; i <= ringCount; i++) {
      container.append('circle')
        .attr('r', i * ringRadius)
        .attr('fill', 'none')
        .attr('stroke-width', 4)
        .attr('stroke', '#ccc');
    }

    // Add the center circle with label
    container.append('circle')
      .attr('r', 50)
      .attr('fill', 'white')
      .attr('stroke', 'none');

    // Add dividing lines between sectors
    const sectorAngles = [0, 120, 240]; // angles in degrees
    sectorAngles.forEach(angle => {
      const x2 = radius * Math.cos((angle * Math.PI) / 180);
      const y2 = radius * Math.sin((angle * Math.PI) / 180);
      container.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke', 'white')
        .attr('stroke-width', 4);
    });

    container.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '.2em')
      .style('fill', 'black')
      .style('font-size', '16px')
      .style('width', 50)
      .style('font-wrap', true)
      .text('suspicious');
    container.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '2em')
      .style('fill', 'black')
      .style('font-size', '16px')
      .style('width', 50)
      .style('font-wrap', true)
      .text('activities');

    const entityGroups = container
      .selectAll('g.entity')
      .data(filteredData)
      .enter()
      .append('g')
      .attr('class', 'entity')
      .attr('transform', (d) => {
        const sector = sectors.find(s => s.type === d.type);
        const angle = (sector!.startAngle + (d.position.angle % 120)) * (Math.PI / 180);
        const x = radialScale(d.position.distance) * Math.cos(angle);
        const y = radialScale(d.position.distance) * Math.sin(angle);
        return `translate(${x}, ${y})`;
      })
      .on('click', (event, d) => setSelectedNode(d));

    // Use foreignObject to render the FontAwesomeIcon component inside SVG
    entityGroups.append('foreignObject')
    .attr('width', 30)
    .attr('height', 30)
    .attr('x', -15) // Center the icon
    .attr('y', -15) // Center the icon
    .html((d) => {
      switch (d.type) {
        case 'Character': return `<div style="font-size: 20px; text-align: center; color: black;"><i class="fas fa-user"></i></div>`;
        case 'Location': return `<div style="font-size: 20px; text-align: center; color: black;"><i class="fas fa-map-marker-alt"></i></div>`;
        case 'Object': return `<div style="font-size: 20px; text-align: center; color: black;"><i class="fas fa-cube"></i></div>`;
        default: return '';
      }
    });

    entityGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '2em')
      .text((d) => d.name)
      .style('font-size', '12px')
      .style('pointer-events', 'none');
  }

  const handleZoomIn = () => {
    if (svgRef.current) {
      const zoomBehavior = d3.zoom<SVGSVGElement, unknown>();
      d3.select(svgRef.current).call(zoomBehavior.scaleBy, 1.2);
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current) {
      const zoomBehavior = d3.zoom<SVGSVGElement, unknown>();
      d3.select(svgRef.current).call(zoomBehavior.scaleBy, 1 / 1.2);
    }
  };

  const handleResetZoom = () => {
    if (svgRef.current) {
      const zoomBehavior = d3.zoom<SVGSVGElement, unknown>();
      d3.select(svgRef.current).call(zoomBehavior.transform, d3.zoomIdentity);
    }
  };

  return (
    <div className="relative">
      <svg ref={svgRef} className="w-full h-full border"></svg>
      <div className="absolute bottom-4 right-4 flex flex-col">
        <button className="p-2 shadow rounded-full mb-2" onClick={handleZoomIn}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <button className="p-2 shadow rounded-full mb-2" onClick={handleZoomOut}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <button className="p-2 shadow rounded-full" onClick={handleResetZoom}>
          <FontAwesomeIcon icon={faExpand} />
        </button>
      </div>

      {selectedNode && (
        <div className="absolute top-4 right-4 p-4 bg-white shadow-lg rounded-md w-80">
          <h3 className="text-xl font-bold mb-2 text-red-900">{selectedNode.name}</h3>
          <p className="text-red-400">{selectedNode.description}</p>
        </div>
      )}
    </div>
  );
};

export default NetworkGraph;
