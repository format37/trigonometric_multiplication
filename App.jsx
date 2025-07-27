import React, { useState } from 'react';
import './App.css';

const Slider = ({ value, onValueChange, min, max, step }) => (
  <input
    type="range"
    min={min}
    max={max}
    step={step}
    value={value[0]}
    onChange={(e) => onValueChange([parseFloat(e.target.value)])}
    className="w-full"
  />
);

const TrigMultiplicationVisualizer = () => {
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  
  const product = a / Math.tan(Math.asin(1 / Math.sqrt(1 + b**2)));
  const hypotenuse = Math.sqrt(1 + b**2);
  const angle = Math.asin(1 / hypotenuse);
  
  const svgWidth = 600, svgHeight = 400, scale = 40;
  const originX = 100, originY = svgHeight - 100;
  
  const triangleBase = 1 * scale;
  const triangleHeight = b * scale;
  
  const P1 = [originX, originY];
  const P2 = [originX + triangleBase, originY];
  const P3 = [originX + triangleBase, originY - triangleHeight];
  const pointA = [originX + a * scale, originY];

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Trigonometric Multiplication Method</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div>
          <div style={{ marginBottom: '16px' }}>
            <label>Value a = {a.toFixed(2)}</label>
            <Slider value={[a]} onValueChange={(val) => setA(val[0])} min={0.5} max={8} step={0.1} />
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <label>Value b = {b.toFixed(2)}</label>
            <Slider value={[b]} onValueChange={(val) => setB(val[0])} min={0.5} max={6} step={0.1} />
          </div>
          
          <div style={{ background: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
            <h3>Results:</h3>
            <p><strong>a × b =</strong> {(a * b).toFixed(3)}</p>
            <p><strong>Trigonometric result =</strong> {product.toFixed(3)}</p>
            <p><strong>Difference =</strong> {Math.abs(a * b - product).toFixed(6)}</p>
          </div>
        </div>
        
        <div>
          <svg width={svgWidth} height={svgHeight} style={{ border: '1px solid #ccc' }}>
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="black" />
              </marker>
            </defs>
            
            {/* Grid lines */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <line 
                key={`grid-v-${i}`}
                x1={originX + i * scale} 
                y1={originY} 
                x2={originX + i * scale} 
                y2={50} 
                stroke="#e0e0e0" 
                strokeWidth="1"
              />
            ))}
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <line 
                key={`grid-h-${i}`}
                x1={originX} 
                y1={originY - i * scale} 
                x2={svgWidth - 50} 
                y2={originY - i * scale} 
                stroke="#e0e0e0" 
                strokeWidth="1"
              />
            ))}
            
            {/* Axes */}
            <line x1={originX} y1={originY} x2={svgWidth - 50} y2={originY} stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            <line x1={originX} y1={originY} x2={originX} y2={50} stroke="black" strokeWidth="2" markerEnd="url(#arrowhead)"/>
            
            {/* Axis ticks and values */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <g key={`x-${i}`}>
                <line x1={originX + i * scale} y1={originY - 5} x2={originX + i * scale} y2={originY + 5} stroke="black" strokeWidth="1"/>
                <text x={originX + i * scale} y={originY + 18} textAnchor="middle" fontSize="10">{i}</text>
              </g>
            ))}
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <g key={`y-${i}`}>
                <line x1={originX - 5} y1={originY - i * scale} x2={originX + 5} y2={originY - i * scale} stroke="black" strokeWidth="1"/>
                <text x={originX - 15} y={originY - i * scale + 4} textAnchor="middle" fontSize="10">{i}</text>
              </g>
            ))}
            
            {/* Similar triangles series */}
            {[1, 2, 3, 4, 5, 6, 7].map(i => {
              const baseLength = i * scale;
              const height = i * b * scale;
              const endX = originX + baseLength;
              const endY = originY - height;
              
              if (endX < svgWidth - 50 && endY > 50) {
                return (
                  <polygon 
                    key={`triangle-${i}`}
                    points={`${originX},${originY} ${endX},${originY} ${endX},${endY}`}
                    fill="none" 
                    stroke="rgba(59, 130, 246, 0.4)" 
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                );
              }
              return null;
            })}
            
            {/* Main reference triangle */}
            <polygon points={`${P1[0]},${P1[1]} ${P2[0]},${P2[1]} ${P3[0]},${P3[1]}`} fill="rgba(59, 130, 246, 0.2)" stroke="blue" strokeWidth="2"/>
            
            {/* Extended hypotenuse */}
            <line x1={P1[0]} y1={P1[1]} x2={pointA[0]} y2={pointA[1] - (a * b * scale)} stroke="gray" strokeWidth="2" strokeDasharray="5,5"/>
            
            {/* Vertical line from A */}
            <line x1={pointA[0]} y1={pointA[1]} x2={pointA[0]} y2={pointA[1] - (a * b * scale)} stroke="red" strokeWidth="2" strokeDasharray="5,5"/>
            
            {/* Points and labels */}
            <circle cx={pointA[0]} cy={pointA[1]} r="4" fill="red"/>
            <text x={pointA[0]} y={pointA[1] + 20} textAnchor="middle" fontSize="12" fill="red">a = {a.toFixed(1)}</text>
            
            <circle cx={pointA[0]} cy={pointA[1] - (a * b * scale)} r="4" fill="green"/>
            <text x={pointA[0] + 15} y={pointA[1] - (a * b * scale)} fontSize="12" fill="green">Product = {(a * b).toFixed(1)}</text>
            
            {/* Triangle labels */}
            <text x={originX + triangleBase/2} y={originY + 15} textAnchor="middle" fontSize="12" fill="blue">1</text>
            <text x={originX + triangleBase + 15} y={originY - triangleHeight/2} textAnchor="middle" fontSize="12" fill="blue">b = {b.toFixed(1)}</text>
            
            {/* Axis labels */}
            <text x={svgWidth - 30} y={originY + 15} fontSize="14">x</text>
            <text x={originX - 15} y={40} fontSize="14">y</text>
            <text x={originX - 10} y={originY + 15} fontSize="12">O</text>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default TrigMultiplicationVisualizer;