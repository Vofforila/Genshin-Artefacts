function filterTable(filterIndex) {
  const input = document.querySelectorAll('#artefactsTable input[type="text"]')[
    filterIndex
  ];
  const filter = input.value.toLowerCase().trim();
  const table_body = document.getElementById("artefactsTableBody");

  // Clear existing table rows
  table_body.innerHTML = "";

  const keys = [
    "set_image",
    "flower",
    "plume",
    "sands",
    "goblet",
    "circlet",
    "character",
    "set_type",
  ];

  const filterKey = keys[filterIndex];

  // Helper function to compare stat combinations
  function matchesStatCombination(itemStats, filterStats) {
    if (!filterStats) return true; // If no filter, match everything

    // Convert strings to arrays of individual stats
    const itemStatArray = itemStats
      .toLowerCase()
      .split("+")
      .map((s) => s.trim());
    const filterStatArray = filterStats
      .toLowerCase()
      .split("+")
      .map((s) => s.trim());

    // Check if all filter stats exist in the item stats
    return filterStatArray.every((filterStat) => {
      // Count how many times this stat appears in filter
      const filterCount = filterStatArray.filter(
        (s) => s === filterStat
      ).length;
      // Count how many times this stat appears in item
      const itemCount = itemStatArray.filter((s) => s === filterStat).length;
      // Make sure item has at least as many occurrences as filter
      return itemCount >= filterCount;
    });
  }

  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/database/artefacts.json", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const jsonData = JSON.parse(xhr.responseText);

      jsonData.forEach((build) => {
        let matchesFilter = true;

        if (filter) {
          if (
            ["flower", "feather", "zonya", "goblet", "circlet"].includes(
              filterKey
            )
          ) {
            // Use stat combination matching for artifact stats
            matchesFilter = matchesStatCombination(build[filterKey], filter);
          } else if (filterKey === "set_image") {
            // For set_image, filter by set_type as before
            matchesFilter = build.set_type.toLowerCase().includes(filter);
          } else {
            // For other fields, use simple includes
            const valueToCheck =
              build[filterKey]?.toString().toLowerCase() || "";
            matchesFilter = valueToCheck.includes(filter);
          }
        }

        if (matchesFilter) {
          const row = table_body.insertRow();

          var color;
          keys.forEach((key) => {
            switch (key) {
              case "flower":
                color = "#27AE60"; // Emerald green
                break;
              case "feather":
                color = "#C0392B"; // Dark red
                break;
              case "zonya":
                color = "#2980B9"; // Strong blue
                break;
              case "goblet":
                color = "#8E44AD"; // Deep purple
                break;
              case "circlet":
                color = "#2C3E50"; // Dark blue-gray
                break;
              case "character":
                color = "#16A085"; // Dark teal
                break;
            }

            if (key === "set_image") {
              const cell = row.insertCell();
              const img = document.createElement("img");
              img.src = `/img/${build[key]}`;
              img.alt = build.set_type;
              cell.appendChild(img);
            } else if (key !== "set_type") {
              const cell = row.insertCell();
              cell.style["background-color"] = color;
              cell.textContent = build[key] || "";
            }
          });
        }
      });
    } else {
      console.error("Error loading the JSON file:", xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error("Request failed");
  };

  xhr.send();
}

function AddId() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/database/artefacts.json", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const jsonData = JSON.parse(xhr.responseText);
      jsonData.forEach((artefact, index) => {
        artefact.id = index + 1;
      });

      console.log(JSON.stringify(jsonData, null, 2));
    } else {
      console.error("Error loading the JSON file:", xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error("Request failed");
  };

  xhr.send();
}

// AddId();

testArtefact(0);
