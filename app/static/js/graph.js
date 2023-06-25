// Chart defaults
Chart.defaults.font.family = "'Roboto Mono', monospace";
Chart.defaults.color = '#b1afbc';

// Color constants
const RED = 'rgba(255,73,46,1)';
const RED_LIGHT = 'rgba(255,73,46,0.4)';
const BLUE = 'rgba(75,192,192,1)';
const BLUE_LIGHT = 'rgba(75,192,192,0.4)';

function renderGraph(graph_labels, graph_maxes, graph_mins) {
  // Graph canvas from HTML
  let ctx = document.getElementById('weather-graph').getContext('2d');

  // Default options for datasets
  const dataDefaults = {
    fill: false,
    lineTension: 0.1,
    borderCapStyle: 'round',
    borderJoinStyle: 'miter',
    pointBackgroundColor: '#ffffff',
    pointBorderWidth: 1,
    pointHoverRadius: 7,
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 2,
    pointHitRadius: 12,
  };

  // Data and labels for Graph
  const data = {
    labels: graph_labels,
    datasets: [
      {
        label: 'Max Temp (°F)',
        data: graph_maxes,
        backgroundColor: RED_LIGHT,
        borderColor: RED,
        pointBorderColor: RED,
        pointHoverBackgroundColor: RED,
        ...dataDefaults,
      },
      {
        label: 'Min Temp (°F)',
        data: graph_mins,
        backgroundColor: BLUE_LIGHT,
        borderColor: BLUE,
        pointBorderColor: BLUE,
        pointHoverBackgroundColor: BLUE,
        ...dataDefaults,
      },
    ],
  };

  // Options to customize labels/tooltips
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        display: true,
        ticks: {
          autoSkip: false,
          callback: function (index) {
            let fullLabel = this.getLabelForValue(index);
            let month = fullLabel.slice(5);
            return month === '01' ? fullLabel.slice(0, 4) : '';
          },
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          labelColor: function (context) {
            let color = context.dataset.label.includes('Max') ? RED : BLUE;

            return {
              backgroundColor: color,
              borderRadius: 2,
            };
          },
        },
      },
    },
  };

  // Create the graph
  var graph = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options,
  });
}
