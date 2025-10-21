<script>
  // import Table from '$lib/components/workers/sieve/astm-table.svelte';
  import Chart from '$lib/components/workers/sieve/chart.svelte';
  import Table from '$lib/components/workers/sieve/table.svelte';
</script>

<title>Civical - Sieve Analysis</title>
<h2 class="p-2 pl-14">Sieve Analysis Table and Particle Size Distribution Graph.</h2>
<hr>

<div class="flex flex-col md:flex-row gap-6 p-6">
  <div class="w-full md:w-1/2 pr-6 pl-6">
    <Table/>
  </div>
  <div class="hidden md:block w-px bg-border min-h-[calc(100vh-200px)]"></div>
  <div class="w-full md:w-1/2 pl-6 pr-6">
    <Chart/>
  </div>
</div>