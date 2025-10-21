<script>
  import * as Table from "$lib/components/ui/table/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { CornerDownLeft } from "@lucide/svelte";

  import {
    finalTable,
    updateSieve,
    handleKeyDown,
    keyNavigation,
    addNewRow,
  } from "./shared.svelte";

  let totalRetained = $derived(
    finalTable.reduce((sum, s) => sum + (Number(s.amountRetained) || 0), 0),
  );
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Sieve Size (mm)</Table.Head>
      <Table.Head>Amount Retained (gm)</Table.Head>
      <Table.Head>% Retained</Table.Head>
      <Table.Head>Cumulative % Retained</Table.Head>
      <Table.Head>% Finer</Table.Head>
    </Table.Row>
  </Table.Header>

  <Table.Body>
    {#each finalTable as sieve, i}
      <Table.Row>
        <Table.Cell>
          <Input
            type="number"
            placeholder="0"
            min="0"
            step="0.001"
            autocomplete="off"
            value={sieve.sieveSize}
            data-field="sieveSize"
            oninput={(e) => {
              updateSieve(i, "sieveSize", e.currentTarget.value);
            }}
            onkeydown={(e) => {
              keyNavigation(e, i, "sieveSize");
              handleKeyDown(e, i, "sieveSize");
            }}
            onwheel={(e) => e.preventDefault()}
          />
        </Table.Cell>
        <Table.Cell>
          <Input
            type="number"
            placeholder="0"
            min="0"
            autocomplete="off"
            value={sieve.amountRetained}
            data-field="amountRetained"
            oninput={(e) => {
              updateSieve(i, "amountRetained", e.currentTarget.value);
            }}
            onkeydown={(e) => {
              keyNavigation(e, i, "amountRetained");
              handleKeyDown(e, i, "amountRetained");
            }}
            onwheel={(e) => e.preventDefault()}
          />
        </Table.Cell>
        <Table.Cell>{sieve.percentRetained.toFixed(2)}%</Table.Cell>
        <Table.Cell>{sieve.cumulativePercentRetained.toFixed(2)}%</Table.Cell>
        <Table.Cell>{sieve.percentFiner.toFixed(2)}%</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>

  <Table.Footer>
    <Table.Row>
      <Table.Cell
        ><Button variant="outline" class="font-semibold" onclick={addNewRow}
          >Add Row <CornerDownLeft /></Button
        ></Table.Cell
      >
      <Table.Cell class="text-right font-semibold"
        >Total: {totalRetained.toFixed(2)} gm</Table.Cell
      >
      <Table.Cell></Table.Cell>
      <Table.Cell></Table.Cell>
      <Table.Cell></Table.Cell>
    </Table.Row>
  </Table.Footer>
</Table.Root>
