/* eslint-disable react/prop-types */

const getColor = (percentage) => {
    if (percentage >= 0.7) return "lime";
    if (percentage >= 0.4) return "#ff8c1a";
    return "red";
  };
  

const CircularProgressBar = ({ percentage, radius = 50, strokeWidth = 8 }) => {
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - percentage * circumference;
    const viewBoxSize = radius * 2 + strokeWidth; 
    
    return (
      <div className="relative">
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx={viewBoxSize / 2}
            cy={viewBoxSize / 2}
            r={radius}
            fill="black"
            stroke="rgba(255, 255, 255, 1)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={viewBoxSize / 2}
            cy={viewBoxSize / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            stroke={getColor(percentage)}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />

        </svg>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-sm font-bold">{(percentage * 100).toFixed(0)}
            <span className="text-xs">%</span>

          </span>
        </div>
      </div>
    );
};
export {CircularProgressBar};
