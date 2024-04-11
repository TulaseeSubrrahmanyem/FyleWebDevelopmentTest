
  document.getElementById('taxForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const grossIncome = parseFloat(document.getElementById('grossIncome').value);
    const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
    const deductions = parseFloat(document.getElementById('deductions').value) || 0;
    const age = parseInt(document.getElementById('age').value);

    if (isNaN(grossIncome) || isNaN(age) || age <= 0) {
      document.getElementById('age').setAttribute('title', 'Please enter a valid age');
      document.getElementById('age').classList.add('is-invalid');
      return;
    } else {
      document.getElementById('age').removeAttribute('title');
      document.getElementById('age').classList.remove('is-invalid');
    }

    let taxableIncome = grossIncome + extraIncome - deductions;
    let tax = 0;

    if (taxableIncome > 800000) {
      if (age < 40) tax = 0.3 * (taxableIncome - 800000);
      else if (age < 60) tax = 0.4 * (taxableIncome - 800000);
      else tax = 0.1 * (taxableIncome - 800000);
    }

    const overallIncomeAfterTax = grossIncome + extraIncome - deductions - tax;
    const modalBody = `
      <h3>Your overall income will be</h3>
      <p class="overalAmount">₹${overallIncomeAfterTax}<br/><span style="font-size: 14px;">after tax deductions</span></p>
    `;
    document.getElementById('modalBody').innerHTML = modalBody;

    const taxModal = new bootstrap.Modal(document.getElementById('taxModal'));
    taxModal.show();
  });

  const inputFields = document.querySelectorAll('input[type="text"]');
  inputFields.forEach(function(input) {
    input.addEventListener('input', function() {
      const value = this.value;
      const isValid = /^\d+$/.test(value);
      if (!isValid) {
        this.classList.add('is-invalid');

      } else {
        this.classList.remove('is-invalid');
      }
    });
  });

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  });

