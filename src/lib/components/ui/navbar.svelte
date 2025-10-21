<script>
  import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
  import Themer from "./themer.svelte";
</script>

<nav class="flex items-center justify-between px-6 py-0.5 border-b bg-background text-foreground">
  <div class="flex items-center gap-6">
    <a class="cursor-pointer font-semibold text-lg" href="/">
      Civical
    </a>

    <NavigationMenu.Root>
      <NavigationMenu.List class="flex space-x-6">
        <NavigationMenu.Item>
          <NavigationMenu.Link class="cursor-pointer text-sm font-medium hover:text-primary transition-colors" href="/sieve-analysis">
            Sieve Analysis
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Item>
          <NavigationMenu.Link class="cursor-pointer text-sm font-medium hover:text-primary transition-colors" href="/mix-design">
            Mix Design
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  </div>

  <!-- Right: Home + About + Themer -->
  <div class="flex items-center gap-6">
    <NavigationMenu.Root>
      <NavigationMenu.List class="flex space-x-6">
        <NavigationMenu.Item>
          <NavigationMenu.Link class="cursor-pointer text-sm font-medium hover:text-primary transition-colors" href="/about">
            About
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>

    <Themer />
  </div>
</nav>