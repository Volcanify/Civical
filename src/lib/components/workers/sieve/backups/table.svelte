<script>
  import * as Table from "$lib/components/ui/table/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  import { finalTable } from './shared.svelte'
  import { Button } from "$lib/components/ui/button/index.js";

  function addNewRow() {
    finalTable.push({
      sieveSize: '', amountRetained: '', percentRetained: 0, cumulativePercentRetained: 0, percentFiner: 100 
    });
  }

  function updateSieve(index, field, value) {
    const numValue = parseFloat(value) || 0;
    finalTable[index][field] = numValue;

    const totalRetained = finalTable.reduce((sum, sieve) => sum + sieve.amountRetained, 0);

    if (totalRetained > 0) {
      let cumulative = 0;

      finalTable.forEach((sieve) => {
        sieve.percentRetained = (sieve.amountRetained / totalRetained) * 100;
        cumulative += sieve.percentRetained;
        sieve.cumulativePercentRetained = cumulative;
        sieve.percentFiner = 100 - cumulative;
      });
    } else {
      finalTable.forEach((sieve) => {
        sieve.percentRetained = 0;
        sieve.cumulativePercentRetained = 0;
        sieve.percentFiner = 100;
      });
    }
  }

  function handleKeyDown(e, index, field) {
    if (e.key === 'Enter' || e.key === 'ArrowDown') {
      e.preventDefault();

      const input = e.currentTarget;

      if (field === 'sieveSize') {
        if (index === finalTable.length - 1) {addNewRow()};

          setTimeout(() => {
            const inputs = document.querySelectorAll('input[data-field="sieveSize"]');
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
          }, 50);
        
      } else if (field === 'amountRetained') {

          if (input && input.value === '') {
            updateSieve(index, 'amountRetained', '0');
            input.value = '0';
          }

          setTimeout(() => {
            const inputs = document.querySelectorAll('input[data-field="amountRetained"]');
            const nextInput = inputs[index + 1];
            if (nextInput) nextInput.focus();
          }, 50);
      }
    }
  }

  let totalRetained = $derived(
    finalTable.reduce((sum, s) => sum + (Number(s.amountRetained) || 0), 0)
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
              updateSieve(i, 'sieveSize', e.currentTarget.value);
            }}
            onkeydown={(e) => handleKeyDown(e, i, 'sieveSize')}
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
              updateSieve(i, 'amountRetained', e.currentTarget.value);
            }}
            onkeydown={(e) => handleKeyDown(e, i, 'amountRetained')}
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
      <Table.Cell><Button class="font-semibold" {addNewRow}>Add Row (↲ )</Button></Table.Cell>
      <Table.Cell class="text-right font-medium font-semibold">Total: {totalRetained.toFixed(2)} gm</Table.Cell>
      <Table.Cell></Table.Cell>
      <Table.Cell></Table.Cell>
      <Table.Cell></Table.Cell>
    </Table.Row>
  </Table.Footer>
</Table.Root>