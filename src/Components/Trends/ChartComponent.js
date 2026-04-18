import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const ChartComponent = ({ dataItemArray, propertyLabel }) => {
  const chartData = useMemo(() => {
    // Check if there are any valid values
    const hasData = dataItemArray.some(item => item.value !== null);

    if (!hasData && dataItemArray.length > 0) {
      return null;
    }

    return {
      labels: dataItemArray.map(item => item.label),
      datasets: [
        {
          label: propertyLabel,
          data: dataItemArray.map(item => item.value),
          borderColor: 'rgba(56, 189, 248, 1)', // Light blue (matches dark aesthetic)
          backgroundColor: 'rgba(56, 189, 248, 0.2)', // Semi-transparent fill
          pointBackgroundColor: 'rgba(255, 255, 255, 1)',
          pointBorderColor: 'rgba(56, 189, 248, 1)',
          pointHoverBackgroundColor: 'rgba(56, 189, 248, 1)',
          pointHoverBorderColor: 'rgba(255, 255, 255, 1)',
          pointRadius: 5,
          pointHoverRadius: 8,
          borderWidth: 3,
          fill: true,
          tension: 0.3, // Smooth transitions
          spanGaps: true // Connect line over null/missing values
        },
      ],
    };
  }, [dataItemArray, propertyLabel]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 800,
      easing: 'easeOutQuart'
    },
    hover: {
      mode: 'nearest',
      intersect: true
    },
    plugins: {
      legend: {
        display: false // Using a more customized external legend if necessary, or none as title is clear
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: 'rgba(56, 189, 248, 1)',
        bodyColor: '#ffffff',
        titleFont: { size: 14, family: "'Inter', sans-serif" },
        bodyFont: { size: 14, family: "'Inter', sans-serif" },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          title: (context) => {
            const index = context[0].dataIndex;
            return dataItemArray[index].fullTitle;
          },
          label: (context) => {
            const val = context.parsed.y;
            return val !== null ? `${propertyLabel}: ${val}` : 'Data not available';
          }
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#94a3b8',
          font: { family: "'Inter', sans-serif" }
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.05)',
          drawBorder: false
        },
        ticks: {
          color: '#94a3b8',
          font: { family: "'Inter', sans-serif" }
        }
      }
    }
  };

  if (!dataItemArray || dataItemArray.length === 0) {
    return <div className="no-data-msg">No structural data available to plot.</div>;
  }

  if (!chartData) {
    return <div className="no-data-msg">No {propertyLabel.toLowerCase()} data available for this selection.</div>;
  }

  return (
    <div style={{ height: '400px', width: '100%', position: 'relative' }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartComponent;
