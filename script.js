document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("aggregateForm")
  const resultSection = document.getElementById("result")

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    calculateAggregate()
  })

  function calculateAggregate() {
    // Update button text to show calculation in progress
    const calculateBtn = document.querySelector(".calculate-btn")
    const originalText = calculateBtn.textContent
    calculateBtn.textContent = "Calculating..."
    calculateBtn.disabled = true

    // Get input values
    const matricMarks = Number.parseFloat(document.getElementById("matricMarks").value)
    const matricTotal = Number.parseFloat(document.getElementById("matricTotal").value)
    const fscMarks = Number.parseFloat(document.getElementById("fscMarks").value)
    const fscTotal = Number.parseFloat(document.getElementById("fscTotal").value)
    const testMarks = Number.parseFloat(document.getElementById("testMarks").value)
    const testTotal = Number.parseFloat(document.getElementById("testTotal").value)

    // Validate inputs
    if (!validateInputs(matricMarks, matricTotal, fscMarks, fscTotal, testMarks, testTotal)) {
      // Reset button if validation fails
      calculateBtn.textContent = originalText
      calculateBtn.disabled = false
      return
    }

    // Small delay to show the calculating state
    setTimeout(() => {
      // Calculate components according to the formula
      const matricComponent = (matricMarks / matricTotal) * 100
      const fscComponent = (fscMarks / fscTotal) * 400
      const testComponent = (testMarks / testTotal) * 500

      // Calculate total aggregate
      const totalAggregate = matricComponent + fscComponent + testComponent

      // Display results
      displayResults(matricComponent, fscComponent, testComponent, totalAggregate)

      // Show result section
      resultSection.style.display = "block"
      resultSection.scrollIntoView({ behavior: "smooth" })

      // Reset button
      calculateBtn.textContent = originalText
      calculateBtn.disabled = false
    }, 500)
  }

  function validateInputs(matricMarks, matricTotal, fscMarks, fscTotal, testMarks, testTotal) {
    const inputs = [
      { value: matricMarks, name: "Matric obtained marks" },
      { value: matricTotal, name: "Matric total marks" },
      { value: fscMarks, name: "FSC obtained marks" },
      { value: fscTotal, name: "FSC total marks" },
      { value: testMarks, name: "Test obtained marks" },
      { value: testTotal, name: "Test total marks" },
    ]

    // Check if all inputs are valid numbers
    for (const input of inputs) {
      if (isNaN(input.value) || input.value < 0) {
        alert(`Please enter a valid ${input.name}`)
        return false
      }
    }

    // Check if obtained marks don't exceed total marks
    if (matricMarks > matricTotal) {
      alert("Matric obtained marks cannot be greater than total marks")
      return false
    }

    if (fscMarks > fscTotal) {
      alert("FSC obtained marks cannot be greater than total marks")
      return false
    }

    if (testMarks > testTotal) {
      alert("Test obtained marks cannot be greater than total marks")
      return false
    }

    // Check if total marks are greater than 0
    if (matricTotal <= 0 || fscTotal <= 0 || testTotal <= 0) {
      alert("Total marks must be greater than 0")
      return false
    }

    return true
  }

  function displayResults(matricComponent, fscComponent, testComponent, totalAggregate) {
    // Update component values
    document.getElementById("matricComponent").textContent = matricComponent.toFixed(2)
    document.getElementById("fscComponent").textContent = fscComponent.toFixed(2)
    document.getElementById("testComponent").textContent = testComponent.toFixed(2)
    document.getElementById("totalAggregate").textContent = totalAggregate.toFixed(2)

    // Update merit status
    updateMeritStatus(totalAggregate)
  }

  function updateMeritStatus(aggregate) {
    const meritStatus = document.getElementById("meritStatus")
    let statusText = ""
    let statusClass = ""

    // Merit categories (these are approximate and may vary by program)
    if (aggregate >= 850) {
      statusText = "🎉 Excellent! You have a very strong chance for admission in top programs."
      statusClass = "merit-excellent"
    } else if (aggregate >= 750) {
      statusText = "👍 Good aggregate! You should have good chances for most programs."
      statusClass = "merit-good"
    } else if (aggregate >= 650) {
      statusText = "📚 Average aggregate. Consider improving your test score for better chances."
      statusClass = "merit-average"
    } else {
      statusText = "⚠️ Below average aggregate. Focus on improving your entry test preparation."
      statusClass = "merit-low"
    }

    meritStatus.textContent = statusText
    meritStatus.className = statusClass
  }

  // Add some sample data for demonstration
  function loadSampleData() {
    document.getElementById("matricMarks").value = "850"
    document.getElementById("matricTotal").value = "1050"
    document.getElementById("fscMarks").value = "900"
    document.getElementById("fscTotal").value = "1100"
    document.getElementById("testMarks").value = "120"
    document.getElementById("testTotal").value = "200"
  }

  // Add a button to load sample data (for testing purposes)
  const sampleButton = document.createElement("button")
  sampleButton.textContent = "Load Sample Data"
  sampleButton.type = "button"
  sampleButton.style.cssText = `
        background: #28a745;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        margin-bottom: 20px;
        font-size: 0.9rem;
    `
  sampleButton.addEventListener("click", loadSampleData)

  // Insert sample button before the form
  form.parentNode.insertBefore(sampleButton, form)
})
