function CreateArtefact(_artefact, _prefect_artefact) {
  const substats = _artefact.substats
    .map((substat) => `<p class="medium">${substat.key} +${substat.value}</p>`)
    .join("");
  return `
    <div class="artefact">
    <p class="header">${_artefact.setKey}</p>
    <div class="artefact-horizontal-container">
            <div class="artefact-vertical-container">
              <p class="big">${_artefact.slotKey}</p>
              <p class="big">${_artefact.mainStatKey}</p>
            </div>
            <img class="artefact-image" src="/img/${_prefect_artefact.set_image}" />
          </div>
          <div class="artefact-substats">
            <p class="medium">Substats:</p>
            ${substats}
          </div>
        </div>
    `;
}

function CreatePerfectArtefact(_prefect_artefact) {
  return `
     <div class="perfect-artefact">
          <p class="header">${_prefect_artefact.character}</p>
          <div class="artefact-horizontal-container">
            <div class="artefact-vertical-container">
              <p class="big">${_prefect_artefact.setKey}</p>
              <p class="medium">Description: ${_prefect_artefact.description}</p>
            </div>
            <img
              class="artefact-image"
              src="/img/${_prefect_artefact.set_image}"
            />
          </div>
          <div class="artefact-substats">
            <p class="medium">Flower: ${_prefect_artefact.flower}</p>
            <p class="medium">Plume: ${_prefect_artefact.plume}</p>
            <p class="medium">Sands: ${_prefect_artefact.sands}</p>
            <p class="medium">Goblet: ${_prefect_artefact.goblet}</p>
            <p class="medium">Circlet: ${_prefect_artefact.circlet}</p>
          </div>
        </div>
      </div>
  `;
}

function testArtefact(_file_location) {
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
    return fetchData(_file_location).then((test_artefacts) => {
      for (const test_artefact of test_artefacts) {
        for (const perfect_artefact of perfect_artefacts) {
          if (test_artefact.setKey === perfect_artefact.setKey) {
            var type = test_artefact.slotKey;
            const perfect_substat_types = perfect_artefact[type].split(" + ");

            var test_mainstat_type;
            var count = 0;

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

            if (
              perfect_substat_types[0] === test_mainstat_type ||
              type === "flower" ||
              type === "plume"
            ) {
              test_artefact.substats.forEach((substat) => {
                switch (substat.key) {
                  case "atk":
                    substat.key = "ATK";
                    break;
                  case "atk_":
                    substat.key = "ATK";
                    break;
                  case "hp":
                    substat.key = "HP";
                    break;
                  case "hp_":
                    substat.key = "HP";
                    break;
                  case "enerRech_":
                    substat.key = "EC";
                    break;
                  case "eleMas":
                    substat.key = "EM";
                    break;
                  case "def":
                    substat.key = "DEF";
                    break;
                  case "def_":
                    substat.key = "DEF";
                    break;
                  case "critDMG_":
                    substat.key = "CRIT";
                    break;
                  case "critRate_":
                    substat.key = "CRIT";
                    break;
                  case "heal_":
                    substat.key = "HEAL";
                    break;
                  case "hydro_dmg_":
                    substat.key = "HYDRO";
                    break;
                  case "electro_dmg_":
                    substat.key = "ELECTRO";
                    break;
                  case "anemo_dmg_":
                    substat.key = "ANEMO";
                    break;
                  case "dendro_dmg_":
                    substat.key = "DENDRO";
                    break;
                  case "cryo_dmg_":
                    substat.key = "CRYO";
                    break;
                  case "pyro_dmg_":
                    substat.key = "PYRO";
                    break;
                  case "geo_dmg_":
                    substat.key = "GEO";
                    break;
                }
                for (
                  let index = 0;
                  index < perfect_substat_types.length;
                  index++
                ) {
                  const perfect_substat = perfect_substat_types[index];

                  if (index !== 0 && perfect_substat === substat.key) {
                    count++;
                    break;
                  }
                }
              });
              if (count >= 3) {
                const artefact_list = document.getElementById("artefact-list");
                const perfect_artefact_list = document.getElementById(
                  "perfect-artefact-list"
                );

                artefact_list.innerHTML += CreateArtefact(
                  test_artefact,
                  perfect_artefact
                );

                perfect_artefact_list.innerHTML +=
                  CreatePerfectArtefact(perfect_artefact);

                // console.log(test_artefact);
                // console.log(perfect_artefact);
                // console.log(count);
                count = 0;
                break;
              }
            }
          }
        }
      }
    });
  });
}

// testArtefact("/database/nexi.json");
testArtefact("/database/vofforila.json");
