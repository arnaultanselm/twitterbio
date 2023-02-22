import React, { useRef, useEffect } from "react";

type MermaidChartProps = {
  chartDefinition: string;
};

const MermaidChart: React.FC<MermaidChartProps> = ({ chartDefinition }) => {
  const mermaidRef = useRef(null);

  useEffect(() => {
    if (mermaidRef.current) {
      // Load mermaid from CDN
      const mermaidCDN = document.createElement("script");
      mermaidCDN.type = "text/javascript";
      mermaidCDN.async = true;
      mermaidCDN.src = "https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js";
      document.body.appendChild(mermaidCDN);

      // Initialize mermaid
      mermaidCDN.onload = () => {
        mermaid.initialize({
          startOnLoad: true,
        });
        mermaid.init(undefined, mermaidRef.current);
      };
    }
  }, [chartDefinition]);

  return (
    <div ref={mermaidRef}>
      {chartDefinition && <div className="mermaid">{chartDefinition}</div>}
    </div>
  );
};

export default MermaidChart;