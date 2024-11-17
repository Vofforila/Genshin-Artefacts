// The artefact creation function
function createArtefactSet(
   flower,
   feather,
   zonya,
   goblet,
   circlet,
   character,
   set_type
) {
   return {
      flower,
      feather,
      zonya,
      goblet,
      circlet,
      character,
      set_type,
   };
}

// Array to hold all artefact sets
const artefactSets = [];

// Example data extraction from HTML
const rows = document.querySelectorAll("tr"); // Assuming rows contain artefact data
let currentSetType = null; // To store the current artefact set type

rows.forEach((row) => {
   const cells = row.querySelectorAll("td");

   if (cells.length === 7) {
      // Row contains the set_type marker (7th row)
      currentSetType = cells[0].textContent.trim(); // Extract set_type (e.g., Seii Set)
   } else if (cells.length === 6) {
      // Row contains artefact data
      const [flower, feather, zonya, goblet, circlet, character] = [
         ...cells,
      ].map((cell) => cell.textContent.trim());

      // Create an artefact set and add it to the array
      const artefactSet = createArtefactSet(
         flower,
         feather,
         zonya,
         goblet,
         circlet,
         character,
         currentSetType
      );
      artefactSets.push(artefactSet);
   }
});

// // Log the artefact sets (or save them to a file)
// console.log(artefactSets);
