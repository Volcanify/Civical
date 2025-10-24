<script>
  import { base } from '$app/paths';
</script>

<header>
  <title>Civical</title>
</header>

<main class="flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4 py-8 space-y-12">
  <!-- Main title -->
  <h2 class="text-2xl font-medium text-center w-[50vw]">
    Civical is web based tool for making mundande civil engineering calculations easier and efficient.
  </h2>

  <!-- Cards section -->
  <div class="flex flex-col md:flex-row gap-8 mt-12">
    <!-- Card 1: Sieve Analysis -->
    <a href="{base}/sieve-analysis" class="block bg-card border border-border rounded-xl p-6 w-full md:w-80 shadow-md hover:shadow-lg transition-shadow hover:scale-105 transform">
      <h4 class="text-xl font-semibold mb-2">Sieve Analysis</h4>
      <p class="text-sm text-muted-foreground">
        A simple tool to calculate fineness modulus and graphical representation of particle size distribution.
      </p>
    </a>

    <!-- Card 2: Mix Design -->
    <a href="{base}/mix-design" class="block bg-card border border-border rounded-xl p-6 w-full md:w-80 shadow-md hover:shadow-lg transition-shadow hover:scale-105 transform">
      <h4 class="text-xl font-semibold mb-2">Mix Design</h4>
      <p class="text-sm text-muted-foreground">
        A simple tool to calculate mix proportions and amounts for concrete and mortar mix design.
      </p>
    </a>
  </div>
</main>
