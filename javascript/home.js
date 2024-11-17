function filterTable(filterIndex) {
   const input = document.querySelectorAll(
      '#artefactsTable input[type="text"]'
   )[filterIndex];
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
                  matchesFilter = matchesStatCombination(
                     build[filterKey],
                     filter
                  );
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

function testArtefact(filterIndex) {
   const input = document.querySelectorAll(
      '#artefactsTable input[type="text"]'
   )[filterIndex];
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

   function fetchData(url) {
      return fetch(url)
         .then((response) => {
            if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
         })
         .catch((error) => {
            console.error(`Error fetching data from ${url}:`, error);
            throw error;
         });
   }

   fetchData("/database/artefacts.json").then((perfect_artefacts) => {
      return fetchData("/database/test_artefacts.json").then(
         (test_artefacts) => {
            for (const test_artefact of test_artefacts) {
               for (const perfect_artefact of perfect_artefacts) {
                  if (test_artefact.setKey === perfect_artefact.set_type) {
                     var type = test_artefact.slotKey;
                     // console.log(type);
                     // console.log(perfect_artefact[type]);

                     var count = 0;

                     const perfect_substat_types =
                        perfect_artefact[type].split(" + ");

                     var test_mainstat_type;
                     switch (test_artefact.mainStatKey) {
                        case "atk":
                           test_mainstat_type = "ATK";
                           break;
                        case "atk_":
                           test_mainstat_type = "ATK";
                           break;
                        case "hp":
                           test_mainstat_type = "HP";
                           break;
                        case "hp_":
                           test_mainstat_type = "HP";
                           break;
                        case "enerRech_":
                           test_mainstat_type = "EC";
                           break;
                        case "eleMas":
                           test_mainstat_type = "EM";
                           break;
                        case "def":
                           test_mainstat_type = "DEF";
                           break;
                        case "def_":
                           test_mainstat_type = "DEF";
                           break;
                        case "critDMG_":
                           test_mainstat_type = "CRIT";
                           break;
                        case "critRate_":
                           test_mainstat_type = "CRIT";
                           break;
                        case "heal_":
                           test_mainstat_type = "HEAL";
                           break;
                        case "hydro_dmg_":
                           test_mainstat_type = "HYDRO";
                           break;
                        case "electro_dmg_":
                           test_mainstat_type = "ELECTRO";
                           break;
                        case "anemo_dmg_":
                           test_mainstat_type = "ANEMO";
                           break;
                        case "dendro_dmg_":
                           test_mainstat_type = "DENDRO";
                           break;
                        case "cryo_dmg_":
                           test_mainstat_type = "CRYO";
                           break;
                        case "pyro_dmg_":
                           test_mainstat_type = "PYRO";
                           break;
                        case "geo_dmg_":
                           test_mainstat_type = "GEO";
                           break;
                     }

                     if (perfect_substat_types[0] === test_mainstat_type) {
                        test_artefact.substats.forEach((substat) => {
                           var test_substat_type;

                           switch (substat.key) {
                              case "atk":
                                 test_substat_type = "ATK";
                                 break;
                              case "atk_":
                                 test_substat_type = "ATK";
                                 break;
                              case "hp":
                                 test_substat_type = "HP";
                                 break;
                              case "hp_":
                                 test_substat_type = "HP";
                                 break;
                              case "enerRech_":
                                 test_substat_type = "EC";
                                 break;
                              case "eleMas":
                                 test_substat_type = "EM";
                                 break;
                              case "def":
                                 test_substat_type = "DEF";
                                 break;
                              case "def_":
                                 test_substat_type = "DEF";
                                 break;
                              case "critDMG_":
                                 test_substat_type = "CRIT";
                                 break;
                              case "critRate_":
                                 test_substat_type = "CRIT";
                                 break;
                              case "heal_":
                                 test_substat_type = "HEAL";
                                 break;
                              case "hydro_dmg_":
                                 test_substat_type = "HYDRO";
                                 break;
                              case "electro_dmg_":
                                 test_substat_type = "ELECTRO";
                                 break;
                              case "anemo_dmg_":
                                 test_substat_type = "ANEMO";
                                 break;
                              case "dendro_dmg_":
                                 test_substat_type = "DENDRO";
                                 break;
                              case "cryo_dmg_":
                                 test_substat_type = "CRYO";
                                 break;
                              case "pyro_dmg_":
                                 test_substat_type = "PYRO";
                                 break;
                              case "geo_dmg_":
                                 test_substat_type = "GEO";
                                 break;
                           }

                           perfect_substat_types.forEach(
                              (perfect_substat_type) => {
                                 if (
                                    perfect_substat_type === test_substat_type
                                 ) {
                                    count++;
                                 }
                              }
                           );
                        });
                        if (count >= 3) {
                           console.log(test_artefact);
                           console.log(count);
                           count = 0;
                           break;
                        }
                     }
                  }
               }
            }
         }
      );
   });
}

testArtefact(0);
