const initialTable = [{ sieveSize: '', amountRetained: '', percentRetained: 0, cumulativePercentRetained: 0, percentFiner: 100 }];

let finalTable = $state(initialTable);
export { finalTable };

export function updateSieve(index, field, value) {
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

export function addNewRow() {
  finalTable.push({
    sieveSize: '', amountRetained: '', percentRetained: 0, cumulativePercentRetained: 0, percentFiner: 100 
  });
}

export function keyNavigation(e, index, field) {
  // Arrow key navigation
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
    e.preventDefault();
    
    const sieveSizeInputs = document.querySelectorAll('input[data-field="sieveSize"]');
    const amountRetainedInputs = document.querySelectorAll('input[data-field="amountRetained"]');
    
    if (e.key === 'ArrowUp') {
      // Move up one row in the same column
      if (index > 0) {
        if (field === 'sieveSize') {
          sieveSizeInputs[index - 1]?.focus();
        } else if (field === 'amountRetained') {
          amountRetainedInputs[index - 1]?.focus();
        }
      }
    } else if (e.key === 'ArrowDown') {
      // Move down one row in the same column
      if (index < finalTable.length - 1) {
        if (field === 'sieveSize') {
          sieveSizeInputs[index + 1]?.focus();
        } else if (field === 'amountRetained') {
          amountRetainedInputs[index + 1]?.focus();
        }
      }
    } else if (e.key === 'ArrowLeft') {
      // Move to previous column (amountRetained -> sieveSize)
      if (field === 'amountRetained') {
        sieveSizeInputs[index]?.focus();
      }
    } else if (e.key === 'ArrowRight') {
      // Move to next column (sieveSize -> amountRetained)
      if (field === 'sieveSize') {
        amountRetainedInputs[index]?.focus();
      }
    }
  }
}

export function handleKeyDown(e, index, field) {
  if (e.key === 'Enter') {
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