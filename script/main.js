const units = {
    Length: ["Millimeter", "Centimeter", "Foot", "Yard", "Meter", "Kilometer", "Miles"],
    Area: ["Square-Foot", "Square-Yard", "Square-Meter", "Square-Kilometer", "Hectare", "Acre"],
    Volume: ["Milliliter", "Centiliter", "Liter", "Gallon", "Cubic-Tons"]
  };
  
  function populateDropdown(selectElement, options) {
    selectElement.innerHTML = '';
    for (let option of options) {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      selectElement.appendChild(optionElement);
    }
  }
  
  function convert() {
    const inputValue = parseFloat(document.getElementById("input-value").value);
    const fromUnit = document.getElementById("from-unit").value;
    const toUnit = document.getElementById("to-unit").value;
  
    if (fromUnit === "" || toUnit === "" || fromUnit === toUnit) {
      displayResult("Please select valid units for conversion.");
      return;
    }
  
    let result;
  
    if (units.Length.includes(fromUnit)) {
      result = convertLength(inputValue, fromUnit, toUnit);
    } else if (units.Area.includes(fromUnit)) {
      result = convertArea(inputValue, fromUnit, toUnit);
    } else if (units.Volume.includes(fromUnit)) {
      result = convertVolume(inputValue, fromUnit, toUnit);
    }
  
    if (result !== undefined) {
      displayResult(`Result: ${result}`);
    }
  }
  
  function convertLength(value, fromUnit, toUnit) {
    const lengthConversions = {
      Millimeter: 0.001,
      Centimeter: 0.01,
      Foot: 0.3048,
      Yard: 0.9144,
      Meter: 1,
      Kilometer: 1000,
      Miles: 1609.34
    };
    const convertedValue = value * lengthConversions[fromUnit];
    return convertedValue / lengthConversions[toUnit];
  }
  
  function convertArea(value, fromUnit, toUnit) {
    const areaConversions = {
      "Square-Foot": 0.092903,
      "Square-Yard": 0.836127,
      "Square-Meter": 1,
      "Square-Kilometer": 1000000,
      Hectare: 10000,
      Acre: 4046.86
    };
    const convertedValue = value * areaConversions[fromUnit];
    return convertedValue / areaConversions[toUnit];
  }
  
  function convertVolume(value, fromUnit, toUnit) {
    const volumeConversions = {
      Milliliter: 0.001,
      Centiliter: 0.01,
      Liter: 1,
      Gallon: 3.78541,
      "Cubic-Tons": 254.358
    };
    const convertedValue = value * volumeConversions[fromUnit];
    return convertedValue / volumeConversions[toUnit];
  }
  
  function displayResult(message) {
    const resultElement = document.getElementById("result");
    resultElement.textContent = message;
    resultElement.style.display = "block";
  }
  
  document.getElementById("from-unit").addEventListener("change", function () {
    const selectedCategory = this.selectedOptions[0].parentNode.label;
    const toUnitDropdown = document.getElementById("to-unit");
    const toUnitOptions = units[selectedCategory].filter(option => option !== this.value);
    populateDropdown(toUnitDropdown, toUnitOptions);
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const selectedCategory = document.getElementById("from-unit").selectedOptions[0].parentNode.label;
    const toUnitDropdown = document.getElementById("to-unit");
    const toUnitOptions = units[selectedCategory].filter(option => option !== document.getElementById("from-unit").value);
    populateDropdown(toUnitDropdown, toUnitOptions);
  });
  