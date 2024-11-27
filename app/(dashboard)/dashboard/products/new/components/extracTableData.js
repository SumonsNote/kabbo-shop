export function extractTableData(htmlTable) {
  const result = {};
  const table = new DOMParser().parseFromString(htmlTable, "text/html");
  let currentSection = "";

  table.querySelectorAll("thead, tbody").forEach((section) => {
    const heading = section.querySelector(".heading-row")?.textContent.trim();

    if (heading) {
      currentSection = heading;
      result[currentSection] = {};
    } else if (currentSection) {
      const rows = section.querySelectorAll("tr");

      rows.forEach((row) => {
        const name = row.querySelector(".name")?.textContent.trim();
        const value = row.querySelector(".value")?.textContent.trim();

        if (name && value) {
          result[currentSection][name] = value;
        }
      });
    }
  });

  return result;
}

export function extractTableDataFromSimpleTable(htmlTable) {
  const result = {};
  const table = new DOMParser().parseFromString(htmlTable, "text/html");

  table.querySelectorAll("tbody tr").forEach((row) => {
    const key = row.querySelector("th")?.textContent.trim();
    const value = row.querySelector("td")?.textContent.trim();

    if (key && value) {
      result[key] = value;
    }
  });

  return result;
}
