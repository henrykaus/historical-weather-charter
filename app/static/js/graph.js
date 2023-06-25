// Color constants
const colors = {
  RED: '#ff4a2e',
  RED_LIGHT: 'rgba(255,73,46,0.4)',
  BLUE: '#4bc0c0',
  BLUE_LIGHT: 'rgba(75,192,192,0.4)',
  WHITE: '#ffffff',
  LIGHT_GRAY: '#b1afbc',
};

// Chart defaults
Chart.defaults.font.family = "'Roboto Mono', monospace";
Chart.defaults.color = colors.LIGHT_GRAY;

function renderGraph(graph_labels, graph_maxes, graph_mins) {
  // Graph canvas from HTML
  let ctx = document.getElementById('weather-graph').getContext('2d');

  // Default options for datasets
  const dataDefaults = {
    fill: false,
    tension: 0.1,
    borderCapStyle: 'round',
    pointBackgroundColor: colors.WHITE,
    pointBorderWidth: 1,
    pointHoverRadius: 7,
    pointHoverBorderColor: colors.WHITE,
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
        backgroundColor: colors.RED_LIGHT,
        borderColor: colors.RED,
        pointBorderColor: colors.RED,
        pointHoverBackgroundColor: colors.RED,
        ...dataDefaults,
      },
      {
        label: 'Min Temp (°F)',
        data: graph_mins,
        backgroundColor: colors.BLUE_LIGHT,
        borderColor: colors.BLUE,
        pointBorderColor: colors.BLUE,
        pointHoverBackgroundColor: colors.BLUE,
        ...dataDefaults,
      },
    ],
  };

  // Options to customize labels/tooltips
  const options = {
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          callback: function (index) {
            let label = this.getLabelForValue(index);
            let month = label.slice(5);
            return month === '01' ? label.slice(0, 4) : '';
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
            let color = context.dataset.label.startsWith('Max')
              ? colors.RED
              : colors.BLUE;

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
