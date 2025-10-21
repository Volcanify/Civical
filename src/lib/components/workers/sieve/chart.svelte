<script>
  import { onMount } from 'svelte';
  import Chart from 'chart.js/auto';
  import { finalTable } from './shared.svelte';

  let chartCanvas;
  let chartInstance;

  let chartData = $derived.by(() => {
    const validData = finalTable
      .filter((s) => s.sieveSize > 0)
      .sort((a, b) => a.sieveSize - b.sieveSize);

    return {
      labels: validData.map(d => d.sieveSize),
      datasets: [{
        label: '% Finer',
        data: validData.map(d => ({ x: d.sieveSize, y: d.percentFiner })),
        borderColor: '#a3a3a3',
        backgroundColor: '#a3a3a3',
        pointBackgroundColor: '#a3a3a3',
        pointBorderColor: '#a3a3a3',
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0
      }]
    };
  });

  $effect(() => {
    if (!chartCanvas) return;

    if (chartInstance) {
      chartInstance.data = chartData;
      chartInstance.update();
    } else {
      chartInstance = new Chart(chartCanvas, {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: false,
          scales: {
            x: {
              type: 'logarithmic',
              min: 0.01,
              max: chartData.datasets[0].data.length > 0 
                ? Math.max(...chartData.datasets[0].data.map(d => d.x)) * 1.3 
                : 100,
              title: {
                display: true,
                text: 'Particle Size (mm)',
                font: { size: 16 }
              },
              ticks: {
                callback: function(value) {
                  if (value < 1) return value.toFixed(3);
                  if (value < 10) return value.toFixed(2);
                  return value.toFixed(1);
                }
              },
              grid: {
                color: 'rgba(127, 127, 127, 0.8)',
                lineWidth: 1,
              }
            },
            y: {
              min: 0,
              max: 100,
              title: {
                display: true,
                text: '% Finer',
                font: { size: 16 }
              },
              ticks: {
                callback: function(value) {
                  return value.toFixed(0);
                }
              },
              grid: {
                color: 'rgba(127, 127, 127, 0.8)',
                lineWidth: 1
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `Sieve Size: ${context.parsed.x.toFixed(3)}mm, % Finer: ${context.parsed.y.toFixed(2)}%`;
                }
              }
            }
          }
        }
      });
    }
  });


  onMount(() => {
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  });
</script>

<div class="w-full h-[400px] relative">
  <canvas bind:this={chartCanvas}></canvas>
  {#if chartData.datasets[0].data.length === 0}
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <p class="text-muted-foreground text-sm">Enter sieve data to generate chart</p>
    </div>
  {/if}
</div>