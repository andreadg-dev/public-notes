function hljsHighlightAllExceptNql(root = document) {
  if (!window.hljs) return;

  root.querySelectorAll("pre code").forEach((codeEl) => {
    // skip NQL blocks so your highlightNQL() owns them
    if (codeEl.classList.contains("language-nql")) return;

    // optional: support manual opt-out too
    if (codeEl.classList.contains("nohighlight")) return;

    hljs.highlightElement(codeEl);
  });
}

function toggleNextElement(togglerElement) {
  //$(".aws-section-toggle").next().toggle()
  $(document).on("click", togglerElement, function () {
    $(this).next().toggle();
  });
}

function toggleCell(button) {
  const cellContent = button.closest(".cell-content");
  const isExpanded = cellContent.classList.toggle("expanded");

  button.textContent = isExpanded ? "-" : "+";
}

function copyAllCommands(parentElement, elementToCopy) {
  let arrayToCopyClipboard = [];
  $("#copyAllBtn").on("click", function () {
    $(parentElement).each(function () {
      if ($(this).is(":visible")) {
        let elementText = $(this).children(elementToCopy).text();
        arrayToCopyClipboard.push(elementText);
      }
    });

    // Remove empty values from the array
    arrayToCopyClipboard = arrayToCopyClipboard.filter(function (text) {
      return text.trim() !== "";
    });

    navigator.clipboard
      .writeText(arrayToCopyClipboard.join("\n"))
      .then(() => {
        console.log("Copied to clipboard:", arrayToCopyClipboard);
        // Optionally, display a notification or provide visual feedback to the user
      })
      .then(() => {
        arrayToCopyClipboard = [];
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });

    //Displays temporarily the alert div when copying a card-body to the clipboard
    $(".alert").addClass("show"); // Add class to show the alert
    // Set timeout to remove the class after 2 seconds
    setTimeout(function () {
      $(".alert").removeClass("show"); // Remove class to hide the alert
    }, 2000);
  });
}

function updateCounts(elementsToCount) {
  $("#filteredItemsCount").text($(`${elementsToCount}:visible`).length);
}

function filterItems(elementsToFilter) {
  // Filter function
  $("#filter").on("keyup", function () {
    let searchInput = $(this).val().toLowerCase();
    $(elementsToFilter).filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(searchInput) > -1);
    });
    updateCounts(elementsToFilter);
  });
}

//Function to parse google bookmarks into JSON
function parseGoogleBookmarks() {
  // Select all dt elements
  const dtElements = document.querySelectorAll("dt");

  // Initialize an array to store the extracted data
  const extractedData = [];

  // Loop through each dt element
  dtElements.forEach((dt) => {
    // Select the anchor element inside the dt
    const anchor = dt.querySelector("a");

    // Extract the href and title attributes
    const href = anchor.getAttribute("href");
    const title = anchor.textContent;

    // Create an object with the extracted data
    const data = {
      title: title,
      href: href,
      category: "",
    };

    // Add the object to the array
    extractedData.push(data);
  });

  // Convert the array to a JSON string
  const jsonString = JSON.stringify(extractedData, null, 2);

  // Output the JSON string
  console.log(jsonString);
}

// Function to copy element to clipboard
function copySingleItemToClipBoard(elementToCopy) {
  $(elementToCopy).on("click", function () {
    let ptrContent = $(this)
      .text()
      .trim()
      .replace(/[ \t]+/g, " ");
    navigator.clipboard
      .writeText(ptrContent)
      .then(() => {
        console.log("Copied to clipboard:", ptrContent);
        // Optionally, display a notification or provide visual feedback to the user
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  });
}

// Add event listeners to highlight/unhighlight the table rows
function highlightElement(element) {
  $(element).on("click", function () {
    $(this).addClass("highlight"); // Add class to show the alert
    // Set timeout to remove the class after 2 seconds
    setTimeout(() => {
      $(this).removeClass("highlight"); // Remove class to hide the alert
    }, 700);
  });
}

function updateHeadingBasedOnDevice() {
  const isMobile = window.innerWidth <= 768;

  isMobile
    ? $("#root h1").css("font-size", "1.5rem")
    : $("#root h1").css("font-size", "2.5rem");

  $("#root h1,#root h2").each(function () {
    const currentText = $(this).text();
    isMobile
      ? $(this).text(currentText.replace(/_/g, " "))
      : $(this).text(currentText.replace(/ /g, "_"));
    // Replace underscores with spaces on a table/laptop screen and the opposite on a mobile
  });
}

function setCopyright() {
  $("#copyright").html(
    `Copyright ©${new Date().getFullYear()} ${$("#copyright").html()}`,
  );
}

function escapeHTML(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

//Children function that appends const type 'sections' to 'root' element
function appendSectionsToRoot(objArray, index) {
  const snippetTitleRegex = /^\s*(?:\/\/## |### |::## |REM## )(.+?) ##/gm;
  const endCodeSnippetRegex = /^\s*(?:\/\/|#|::|REM)={3,}/gm;
  let pageBody = [];

  pageSnippets = objArray[index].snippets.map((snippet) => {
    let processedSnippet = escapeHTML(snippet.code)
      .replace(
        snippetTitleRegex,
        `<div class="snippet"><h2 class="snippet-title">$1</h2><pre><div class="abbreviation">${objArray[index].abbreviation}</div><code class="language-${objArray[index].language}">`, //
      )
      .replace(endCodeSnippetRegex, "</code></pre></div>");
    return `${spaceDiv}<div><h1>${snippet.title}</h1>${processedSnippet}`;
  });

  pageBody.push(pageSnippets.join(""));
  $("#root").append(pageBody);
}

//Children function that appends const type 'list-items' to 'root' element -nextjs page
function appendListItemsToRoot(objArray, index) {
  let table = [`<table class="table">`];
  let headers = ["<thead><tr>"];
  let objectKeys = Object.keys(objArray[index].items[0]);
  objectKeys.map((header) => {
    if (header !== "logo") {
      headers.push(`<th>${header}</th>`);
    }
  });
  headers.push("</tr></thead>");
  let tbody = ["<tbody>"];

  pageItems = objArray[index].items.map((item) => {
    return `<tr>
              <td class="nextjs-snippet">
                <div style="display:flex;gap:1rem;">
                  <span>
                    <img class="logo" 
                         src="./images/${item.logo}.png" 
                         alt="${item.logo}-logo" 
                         height="25px" 
                         width="25px"/>
                  </span>
                  <span>${item[objectKeys[0]]}</span>
                </div>
              </td>
              <td style="white-space:normal">${
                item[objectKeys[1]]
              }</td><td style="white-space:normal;"><a target='_blank' href='${
                item[objectKeys[2]]
              }' target="_blank">${item[objectKeys[2]]}</a></td></tr>`;
  });
  tbody.push(pageItems.join(""));
  tbody.push("</tbody>");

  table.push(headers.join(""));
  table.push(tbody.join(""));
  table.push("</table>");
  let finalTable = `<h1 class="pageTitle"><code>${objArray[index].title}</code></h1>
  <div class="custom-body">
  ${copiedToClipboardAlert}${searchCard(
    objArray[index].items.length,
    false,
  )}${table.join("")}</div>`;

  console.log(finalTable);
  $("#root").append(finalTable);

  updateCounts("tbody tr");
  filterItems("tbody tr");
  copyAllCommands("tr", "td:nth-child(1)");
  copySingleItemToClipBoard("td");
  highlightElement();
}

//Children function that appends const type 'cards' to 'root' element
function appendCardsToRoot(objArray, index) {
  let cards = [];

  const linksGroupedByCat = objArray[index].links.reduce((acc, link) => {
    const category =
      link.category.trim() === "" ? "no_defined_category" : link.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(link);
    return acc;
  }, {});

  // Sort items in each category by title
  Object.keys(linksGroupedByCat).forEach((category) => {
    linksGroupedByCat[category].sort((a, b) =>
      a.title.localeCompare(b.title, undefined, { sensitivity: "base" }),
    );
  });

  // Sort categories alphabetically
  Object.keys(linksGroupedByCat)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .forEach((category) => {
      cards.push(
        `<h2 class="link-cat-title" style="margin-top:2rem;">${category}</h2><div class="linksGrid" id="links${category}">`,
      );
      linksGroupedByCat[category].forEach((item) => {
        //console.log(item);
        cards.push(
          card
            .replace("{{title}}", `${item.title}`)
            .replace("{{link}}", `${item.href}`),
        );
      });
      cards.push(`</div>`);
    });

  let finalCards = `<h1 class="pageTitle"><code>${objArray[index].title}</code></h1>
  <div class="custom-body">${searchCard(objArray[index].links.length)}<div>${cards.join("")}</div></div>`;

  $("#root").append(finalCards);
  updateCounts(".col");
  filterItems(".col");
}

function appendSectionListToRoot(object) {
  let awssections = [];
  Object.keys(object).map((awscert) => {
    if (["title", "type", "navcategory"].includes(awscert)) return;

    let finalSection = [`<div class="aws-section">`];
    if (object[awscert].title) {
      const awscerttitle = `<h2>${object[awscert].title}</h2>`;
      finalSection.push(awscerttitle);
    }

    const awssection = object[awscert];

    Object.keys(awssection).map((awssectionkey) => {
      const awssectiontitle =
        awssectionkey !== "title"
          ? `<div style="margin-left: 1.5rem;"><h5 class="aws-section-toggle">${awssection[awssectionkey].title}</h5><ul>`
          : null;
      if (awssectiontitle) {
        finalSection.push(awssectiontitle);
      }
      const awssectioncontent = awssection[awssectionkey];

      if (typeof awssectioncontent !== "object") return;

      Object.keys(awssectioncontent).map((key) => {
        key !== "title" &&
          finalSection.push(`<li>${awssectioncontent[key]}</li>`);
      });

      finalSection.push(`</ul></div>`);
    });

    finalSection.push(`</div>`);

    awssections.push(finalSection.join(""));
  });

  $("#root").append(`${spaceDiv}<h1>aws</h1>${awssections.join("")}`);
}

function consistentSlugify(str) {
  return (
    str
      .toLowerCase()
      .trim()
      // remove everything except letters, numbers, space, - and _
      .replace(/[^a-z0-9\s_-]/g, "")
      // replace whitespace ONLY with -
      .replace(/\s+/g, "-")
  );
}

const md = window
  .markdownit({
    html: true,
    linkify: true,
    typographer: true,
  })
  .use(window.markdownItAnchor, {
    slugify: consistentSlugify,
  });

//Table section
function appendListToRoot(objArray, index) {
  /*   objArray[index].snippets.sort((a, b) =>
    a.item.localeCompare(b.item, undefined, { sensitivity: "base" })
  ); */

  const radioInputs = createTablesRadioInputs(objArray[index].snippets);

  // ensure tags arrays are sorted alphabetically (case-insensitive) before rendering
  objArray[index].snippets.forEach((s) => {
    if (Array.isArray(s.tags)) {
      s.tags.sort((a, b) =>
        a
          .toString()
          .localeCompare(b.toString(), undefined, { sensitivity: "base" }),
      );
    }
  });

  // sort by category, then by item (case-insensitive, handles missing values)
  objArray[index].snippets.sort((a, b) => {
    const catA = (a.category || "").toString();
    const catB = (b.category || "").toString();
    const catCmp = catA.localeCompare(catB, undefined, { sensitivity: "base" });
    if (catCmp !== 0) return catCmp;
    const itemA = (a.item || "").toString();
    const itemB = (b.item || "").toString();
    return itemA.localeCompare(itemB, undefined, { sensitivity: "base" });
  });

  let table = [`<table class="table responsive-table">`];
  let headers = ["<thead><tr>"];
  let objectKeys = Object.keys(objArray[index].snippets[0]);
  objectKeys.slice(0, 2).map((header) => {
    headers.push(`<th>${header}</th>`);
  });
  headers.push("</tr></thead>");
  let tbody = ["<tbody>"];

  pageSnippets = objArray[index].snippets.map((snippet) => {
    //Rendering snippet using md
    const mdSnippet = snippet[objectKeys[0]];
    const parsedSnippet = md.render(mdSnippet);
    const cleanParsedSnippet = DOMPurify.sanitize(parsedSnippet);

    //Rendering snippet description using md
    const mdSnippetDescription = snippet[objectKeys[1]];
    const parsedSnippetDescription = md.render(mdSnippetDescription);
    const cleanParsedSnippetDescription = DOMPurify.sanitize(
      parsedSnippetDescription,
    );

    return `<tr>
              <td data-label="item" class="troubleshoot-snippet">${cleanParsedSnippet}</td>
              <td data-label="description">
                <div class="cell-content">
                  <div class="snippet-description">${cleanParsedSnippetDescription}</div>
                  <div class="snippet-category"><span class="bold mr-10">CATEGORY:</span>${snippet[objectKeys[2]].split("_")[0].trim()}</div>
                  <div class="snippet-subcategory"><span class="bold mr-10">SUBCATEGORY:</span>${snippet[objectKeys[2]].split("_")[1].trim()}</div>
                  <div class="snippet-tags"><span class="bold mr-10">TAGS:</span>${snippet[objectKeys[3]]}</div>
                  <div class="expand-button" onclick="toggleCell(this)">+</div>
                </div>
              </td>
            </tr>`;
  });
  tbody.push(pageSnippets.join(""));
  tbody.push("</tbody>");

  table.push(headers.join(""));
  table.push(tbody.join(""));
  table.push("</table>");
  let finalTable = `<h1 class="pageTitle"><code>${objArray[index].title}</code></h1>
  <div class="custom-body">
  ${copiedToClipboardAlert}
  ${searchCard(objArray[index].snippets.length, true, radioInputs)}${table.join("")}</div>`;

  $("#root").append(finalTable);

  updateCounts("tbody tr");
  filterItems("tbody tr");
  copyAllCommands("tr", "td:nth-child(1)");
  copySingleItemToClipBoard(".troubleshoot-snippet");
  copySingleItemToClipBoard(".snippet-description");
  highlightElement(".snippet-description");
  highlightElement(".troubleshoot-snippet");
  highlightNQL();
  //hljs.highlightAll();
  //addSnippetLineCounter();
}

//Tools section
function appendToolsToRoot(objArray, index) {
  const finalTools = objArray[index].tools.map((item) => {
    return `<details class="tools" id="${item.title}-tool"><summary>${item.title}</summary>${item.component}</details>${customHorizontalLine}`;
  });

  $("#root").append(
    `<h1 class="pageTitle"><code>tools</code></h1><div class="markdown-body">${finalTools.join("")}</div>`,
  );
}

//Markdown notes section
async function appendMdNotesToRoot(objArray, index) {
  const sortedMdPages = [...objArray[index].pages].sort((a, b) =>
    a.replaceAll("_", " ").localeCompare(b.replaceAll("_", " "), undefined, {
      sensitivity: "base",
    }),
  );

  const mdPagesParsedToHtml = await Promise.all(
    sortedMdPages.map(async (mdPage, index) => {
      const res = await fetch(`./markdown_notes/${mdPage}.md`);
      if (!res.ok) return "";

      const mdPageContent = await res.text();

      const parsedMd = md.render(mdPageContent);
      const cleanParsedMd = DOMPurify.sanitize(parsedMd);

      const mdClass = mdPage.includes("notes_")
        ? "md_notes"
        : mdPage.includes("errors_")
          ? "md_errors"
          : mdPage.includes("howto_")
            ? "md_howto"
            : "md_undefined";

      return `<details class="${mdClass}"><summary>KB${String(index).padStart(5, "0")} - <span style="text-transform: capitalize;">${mdPage.replaceAll("_", " ").toLowerCase().replace("howto", "how to")}</span></summary>${cleanParsedMd}</details>`;
    }),
  );

  $("#root").append(
    `<h1 class="pageTitle"><code>markdown notes</code></h1><div class="markdown-body">${mdPagesParsedToHtml.join(customHorizontalLine)}</div>${spaceDiv}`,
  );

  hljsHighlightAllExceptNql();
  addSnippetLineCounter();
  highlightNQL();
}

//Parent function to append item to 'root' element depending on the type
function appendToRoot(objArray, index) {
  /*   
  objArray[index].type === "sections" && appendSectionsToRoot(objArray, index);
  
  objArray[index].type === "cards" && appendCardsToRoot(objArray, index);

  objArray[index].type === "list-items" && appendListItemsToRoot(objArray, index);

  objArray[index].type === "section-list" && appendSectionListToRoot(objArray[index]); 
  */

  objArray[index].type === "list" && appendListToRoot(objArray, index);

  objArray[index].type === "markdown-pages" &&
    appendMdNotesToRoot(objArray, index);

  objArray[index].type === "tools" && appendToolsToRoot(objArray, index);
}

/* function appendSectionToNavbar(objArray) {
  let navItems = [];
  objArray.forEach((element, index) => {
    let navItem = `<li class="nav-item ${
      index === 0 ? "active" : ""
    }" id="navitem${index}"><a class="nav-link" href="#">${
      element.title
    }</a></li>`;
    navItems.push(navItem);
  });
  $("#navbar").append(navBar.replace("{{navItems}}", navItems.join("")));
  appendToRoot(objArray, 0);
} */

function htmlEncode(input) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/'/g, "&#39;")
    .replace(/"/g, "&quot;");
}

function appendSectionToNavbar(objArray) {
  let navDevItems = [];
  let navMenuItems = [];
  objArray.forEach((element, index) => {
    let navItem = `<a class="dropdown-item ${
      index === 0 ? "active" : ""
    }" href="#" id="navitem${index}">${element.title}</a>`;

    element.navcategory === "dev" && navDevItems.push(navItem);
    element.navcategory === "menu" && navMenuItems.push(navItem);
  });

  let navbarComponent = navBarWithDropDowns.replace(
    "{{navMenuItems}}",
    navMenuItems.join(""),
  );
  //replace("{{navDevItems}}", navDevItems.join(""))

  $("#navbar").append(navbarComponent);
  appendToRoot(objArray, 0);
}

function displaySectionOnClick(objArray) {
  $(document).on("click", ".dropdown-item", function () {
    $(".dropdown-item").each(function (index, element) {
      $(element).removeClass("active");
    });
    $(this).addClass("active");
    $("#root").empty();
    appendToRoot(objArray, Number($(this).attr("id").replace("navitem", "")));

    hljsHighlightAllExceptNql();
    addSnippetLineCounter();
    highlightNQL();
    createDynamicInputFields();
    updateDynamicInputFields();
  });
}

function decodeJWT(token) {
  try {
    if (
      !token ||
      typeof token !== "string" ||
      !token.startsWith("eyJ") ||
      !token.includes(".")
    ) {
      return "The token you provided is not a valid JWT token.";
    }

    if (token.split(".").length !== 3) {
      return "The token you provided is not a valid JWT token.";
    }

    let parsedBase64Url = [];
    for (let i = 0; i < token.split(".").length; i++) {
      let element = token.split(".")[i].replace("-", "+").replace("_", "/");
      switch (element.length % 4) {
        case 0:
          break;
        case 2:
          element += "==";
          break;
        case 3:
          element += "=";
          break;
      }

      parsedBase64Url.push(element);
    }

    let decodedJWT = parsedBase64Url.map((part, index) => {
      if (index !== 2) {
        return JSON.parse(atob(part));
      } //only decode header and payload
      if (index === 2) {
        return { sig: part };
      } //do not decode signature
    });

    const fullDecodedJWT = Object.assign({}, ...decodedJWT);
    console.log(fullDecodedJWT);

    return JSON.stringify(fullDecodedJWT, null, 2);
  } catch (error) {
    return "Error encountered while decoding the JWT token: " + error.message;
  }
}

function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

function createTablesRadioInputs(snippetArray) {
  //Generating tables radio inputs component
  const radioComponent = `<div id="category_filter_component">
                          <p class="filter_card_headers">CATEGORY FILTER</p>
                          <fieldset class="tablesRadioInput_fieldset">
                            <div>
                              <input type="radio" id="all" name="category" value="all" checked />
                              <label for="all">All</label>
                            </div>

                            {{otherRadioInputs}}

                          </fieldset>
                        </div>`;

  const groupedByCategory = snippetArray.reduce((acc, item) => {
    const category = item.category.split("_")[0];
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const radioInputs = Object.keys(groupedByCategory).map((category) => {
    return `<div>
              <input type="radio" id="${category}" name="category" value="${category}" />
              <label for="${category}">${category}</label>
            </div>`;
  });

  return radioComponent.replace("{{otherRadioInputs}}", radioInputs.join(""));
}

function createSubcategoryRadioInputs(snippetArray, category) {
  //Generating tables radio inputs component
  const radioComponent = `<div id="subcategory_filter_component"><hr/>
                          <p class="filter_card_headers">SUBCATEGORY FILTER</p>
                          <fieldset class="tablesRadioInput_fieldset">

                            {{otherRadioInputs}}

                          </fieldset>
                        </div>`;

  const filteredSnippetArray = snippetArray.filter((snippet) => {
    return snippet.category.includes(category);
  });

  const groupedByCategory = filteredSnippetArray.reduce((acc, item) => {
    const category = item.category.split("_")[1];
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  const radioInputs = Object.keys(groupedByCategory).map((category) => {
    return `<div>
              <input type="radio" id="${category}" name="subcategory" value="${category}" />
              <label for="${category}">${category}</label>
            </div>`;
  });

  return radioComponent.replace("{{otherRadioInputs}}", radioInputs.join(""));
}

function createDynamicInputFields() {
  let placeholderValues = [];
  $(".placeholder").each(function () {
    placeholderValues.push($(this).html());
  });
  let uniqueplaceholderValues = placeholderValues.filter(onlyUnique);

  let placeholderInputElements = [];
  uniqueplaceholderValues.forEach((value) => {
    const placeholderClass = value
      .replaceAll("{", "")
      .replaceAll("}", "")
      .replaceAll("/", "")
      .replaceAll(" ", "")
      .toLowerCase();

    const placeholderLabel = value
      .replaceAll("{", "")
      .replaceAll("}", "")
      .toLowerCase();

    const placeholderInputElement = `<div class="placeholder-input">
              <label for="ph-${placeholderClass}">${placeholderLabel}: </label>
              <input class="ph-inputfield" type="text" name="ph-${placeholderClass}" id="${placeholderClass}" placeholder="Type a ${placeholderLabel}..."/>
            </div>`;

    placeholderInputElements.push(placeholderInputElement);
  });

  if (placeholderInputElements.length > 0) {
    $("#filterCard .card-body").append(
      `<hr/><div id="placeholderComponent"><p class="filter_card_headers">DYNAMIC VALUES</p>
      <div style="display: flex; gap: 1rem; flex-wrap: wrap">${placeholderInputElements.join(
        "",
      )}</div></div>`,
    );
  }
}

function updateDynamicInputFields() {
  $(document).on("input", ".ph-inputfield", function () {
    const name = $(this).attr("name"); // e.g. "ph-device_serial_number"
    const value = $(this).val(); // what the user typed

    // Find the matching placeholder span
    const $matchedSpan = $("span.placeholder").filter(function () {
      return $(this).hasClass(name);
    });

    // Update it (or do whatever you want)
    $matchedSpan.text(value);

    console.log("Updated:", name, "→", value);
  });
}

function getLanguageLabel(item) {
  if (typeof item === "string") {
    text = item.toLowerCase();
  }

  if ((typeof item === "object") & (item.length > 0)) {
    text = item.map((item) => {
      return item.toLowerCase();
    });
  }

  if (text.includes("text") || text.includes("plaintext")) return "Plain Text";
  if (text.includes("-js") || text.includes("javascript")) return "JavaScript";
  if (text.includes("-sh") || text.includes("bash")) return "Bash";
  if (text.includes("cmd") || text.includes("dos")) return "DOS";
  if (text.includes("sql")) return "SQL";
  if (text.includes("html")) return "HTML/XML";
  if (text.includes("xml")) return "HTML/XML";
  if (text.includes("ps1") || text.includes("powershell")) return "PowerShell";
  if (text.includes("json")) return "JSON";
  if (text.includes("ejs")) return "EJS";
  if (text.includes("nql") || text.includes("nexthink")) return "Nexthink NQL";
  if (text.includes("css")) return "CSS";
  if (
    text.includes("-ts") ||
    text.includes("typescript") ||
    text.includes("-tsx")
  )
    return "TypeScript";

  return "Unidentified";
}

function addSnippetLineCounter() {
  $("pre")
    .not(".processed")
    .each(function () {
      const pre = $(this);
      pre.addClass("code-body processed");

      const code = pre.find("code").first();
      if (!code.length) return;

      // ---- 1) determine label from classes (works with "language-ts", etc.)
      const languageLabel = getLanguageLabel(code.attr("class"));

      // ---- 2) get raw source text before hljs
      const rawText = code.text().replace(/\n$/, "");

      // ---- 3) run hljs on the RAW TEXT and capture highlighted HTML
      // Use highlightAuto only if no language class is present.
      // If you DO have language-xxx, prefer highlight(code, {language}).
      const classTokens = (code.attr("class") || "").toLowerCase().split(/\s+/);
      const langToken = classTokens.find((t) => t.startsWith("language-"));
      const lang = langToken ? langToken.replace("language-", "") : null;

      const skipHljs = lang === "nql";

      let highlightedHtml;
      if (!skipHljs && window.hljs) {
        if (lang && hljs.getLanguage(lang)) {
          highlightedHtml = hljs.highlight(rawText, { language: lang }).value;
        } else {
          highlightedHtml = hljs.highlightAuto(rawText).value;
        }
      } else {
        // plain escaped text when skipping hljs (NQL) or when hljs missing
        highlightedHtml = rawText
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replaceAll("'", "&#39;");
      }

      // ---- 4) split highlighted HTML into lines without breaking tag structure
      // We convert "\n" into <br>, then iterate nodes separated by <br>.
      const container = document.createElement("div");
      container.innerHTML = highlightedHtml.replace(/\n/g, "<br>");

      const lineFragments = [];
      let current = [];

      container.childNodes.forEach((node) => {
        if (node.nodeName === "BR") {
          lineFragments.push(current);
          current = [];
        } else {
          current.push(node);
        }
      });
      lineFragments.push(current);

      // ---- 5) build final wrapped HTML preserving hljs spans inside each line
      const finalLinesHtml = lineFragments
        .map((nodes, i) => {
          const lineDiv = document.createElement("div");
          nodes.forEach((n) => lineDiv.appendChild(n.cloneNode(true)));

          const lineInner = lineDiv.innerHTML || "&nbsp;";

          return `
            <span class="snippet-line">
              <span class="snippet-line-counter">${i + 1}</span>
              <span class="snippet-code-line">${lineInner}</span>
            </span>`;
        })
        .join("\n");

      // ---- 6) apply to DOM (DO NOT call hljs.highlightElement after this)
      code.html(finalLinesHtml);
      code.addClass("hljs processed");

      // ---- 7) header + wrapper
      pre.before(
        snippetCodeHeader.replace("{{programming-language}}", languageLabel),
      );
      const codeHeader = pre.prev();
      $(codeHeader).add(pre).wrapAll('<div class="code-wrapper"></div>');
    });
}

function highlightNQL() {
  const keywords = [
    "include",
    "with",
    "compute",
    "where",
    "list",
    "limit",
    "sort",
    "asc",
    "desc",
    "in",
    "during",
    "past",
    "from",
    "to",
    "and",
    "or",
    "ago",
    "summarize",
    "by",
  ];

  const keywordRegex = new RegExp("\\b(" + keywords.join("|") + ")\\b", "gi");

  $("code.language-nql .snippet-code-line").each(function () {
    let html = $(this).text();

    // STRINGS (single and double quotes)
    html = html.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, function (match) {
      return '<span class="mtk5">' + match + "</span>";
    });

    //PIPE SYMBOLS (add indentation)
    html = html.replace(/(\n\s*)\|/g, function (match, prefix) {
      return prefix + '<span class="mtkPipe">|</span>';
    });

    // DATES (2026-03-06 or datetime)
    html = html.replace(
      /\b\d{4}-\d{2}-\d{2}(?:\s\d{2}:\d{2}:\d{2})?\b/g,
      function (match) {
        return '<span class="mtk6">' + match + "</span>";
      },
    );

    // NUMBERS + TIME (15min, 1h, 1d)
    html = html.replace(/\b\d+(?:min|h|d)\b/gi, function (match) {
      return '<span class="mtk6">' + match + "</span>";
    });

    // NUMBERS
    html = html.replace(/\b\d+(\.\d+)?\b/g, function (match) {
      return '<span class="mtk6">' + match + "</span>";
    });

    // METHODS (.method())
    html = html.replace(/\.([a-zA-Z_]\w*)(?=\(\))/g, function (match, method) {
      return '.<span class="mtk19">' + method + "</span>";
    });

    // DOTS COMMAS COLONS
    html = html.replace(/[\.,:]/g, function (match) {
      return '<span class="mtk11">' + match + "</span>";
    });

    // KEYWORDS
    html = html.replace(keywordRegex, function (match) {
      return '<span class="mtk8">' + match + "</span>";
    });

    $(this).html(html);
  });
}

const spaceDiv = `<div class="mt-6"></div>`;
const customHorizontalLine = `<div style="height: 1px; background-color: #00ffef; margin: 10px 0 20px 0;">&nbsp;</div>`;

const snippetCodeHeader = `<div class="code-header">
      <div class="code-header-left">
        <svg
          class="code-header-code-svg"
          fill="currentColor"
          aria-hidden="true"
          width="1em"
          height="1em"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6ZM4 6c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Zm4.85 1.85a.5.5 0 1 0-.7-.7l-2.5 2.5a.5.5 0 0 0 0 .7l2.5 2.5a.5.5 0 0 0 .7-.7L6.71 10l2.14-2.15Zm3-.7a.5.5 0 0 0-.7.7L13.29 10l-2.14 2.15a.5.5 0 0 0 .7.7l2.5-2.5a.5.5 0 0 0 0-.7l-2.5-2.5Z"
            fill="currentColor"
          ></path>
        </svg>
        <div class="code-header-language">{{programming-language}}</div>
      </div>

      <div class="code-header-right">
        <div aria-label="Copy" title="Copy" class="snippet-copy-button">
          <span
            ><svg
              class="copy-button-svg"
              fill="currentColor"
              aria-hidden="true"
              width="1em"
              height="1em"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 2a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h6a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8ZM7 4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V4ZM4 6a2 2 0 0 1 1-1.73V14.5A2.5 2.5 0 0 0 7.5 17h6.23A2 2 0 0 1 12 18H7.5A3.5 3.5 0 0 1 4 14.5V6Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
        </div>
        <div class="snippet-check-icon hidden">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              class="bi bi-check"
              viewBox="0 0 20 20"
            >
              <path
                d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>`;

const searchCard = (
  totalItemsCount,
  copyAllCommands = false,
  tablesRadioInput,
) => {
  let searchCard = `<div id="filterCard">
                      <div class="card-body">
                        <div>
                          <p style="justify-content:space-between;display:flex"><span class="filter_card_headers">SEARCH</span><span style="font-weight:bold;">results: <span id="filteredItemsCount">{{filteredItemsCount}}</span>/<span id="totalItemsCount">${totalItemsCount}</span></span></p>
                          <input type="text" id="filter" class="form-control" placeholder="Type a keyword..."/>
                        </div>
                        ${tablesRadioInput && `<hr/>${tablesRadioInput}`}
                      </div>
                    </div>

    ${
      copyAllCommands
        ? `<div class="buttonDiv">
        <button class="btn btn-dark btn-lg" id="copyAllBtn">
          Copy all commands!
        </button>
    </div>`
        : ``
    }`;

  //console.log(searchCard);
  return searchCard;
};

const copiedToClipboardAlert = `<div class="alert">
      <span
        ><i class="bi bi-info-circle"></i
        ><span> Copied to clipboard!</span></span
      >
    </div>`;

const card = `<div class="col" style="display:flex;justify-content:center;">
    <div class="card text-white bg-dark mb-3" style="width: 18rem; min-height:12rem; border: solid 1px white;border-radius:1rem;">
      <div class="card-body">
        <h5 class="card-title" style="min-height:6rem;">{{title}}</h5>
        <a target='_blank' href="{{link}}" class="btn btn-info">Take me there</a>
      </div>
    </div>
</div>`;

const navBarWithDropDowns = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
  <div id="navbarBrand">
    <a class="navbar-brand" href="#"><img src="favicon.png" alt="brand-image" style="height:50px"></a>
    <div id="navbarAppName"><code>myNotes</code></div>
  </div>
	<div class="dropdown dropstart">
	  <div class="dropdown-toggle" type="button" id="dropdownMenuButtonOther" data-bs-toggle="dropdown" aria-expanded="false">
		X
	  </div>
	  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButtonOther" id="dropdownmenuOther">
		{{navMenuItems}}
	  </ul>
	</div>
  </div>
</nav>
`;

/*   <div id="navbarNav">
    <div class="dropdown">
	  <div class="dropdown-toggle" type="button" id="dropdownMenuButtonDev" data-bs-toggle="dropdown" aria-expanded="false">
		dev
	  </div>
	  <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButtonDev">
		{{navDevItems}}
	  </ul>
	</div> */

/* const navBar = `
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                    <a class="navbar-brand" href="#">{a}</a>
                    <div id="navbarNav">
                        <ul class="navbar-nav">{{navItems}}</ul>
                    </div>
                    </nav>
                    `; */

const languageHljs = [
  "bash",
  "c",
  "cpp",
  "csharp",
  "css",
  "diff",
  "go",
  "graphql",
  "ini",
  "java",
  "json",
  "kotlin",
  "less",
  "lua",
  "makefile",
  "markdown",
  "objectivec",
  "perl",
  "php",
  "php_template",
  "plaintext",
  "python",
  "python_repl",
  "r",
  "ruby",
  "rust",
  "scss",
  "shell",
  "sql",
  "swift",
  "typescript",
  "vbnet",
  "wasm",
  "xml",
  "yaml",
];

const tools = {
  title: "tools",
  type: "tools",
  navcategory: "menu",
  tools: [
    {
      title: "EncoderDecoder Tool",
      component: `<div id="encoderDecoder">
      <div style="display: flex; flex-wrap: wrap; gap: 20px; margin: 1rem 2rem 0.5rem; justify-content: center;">
        <button id="encodeHTMLButton" class="btn btn-warning btn-tools">
            <span>Encode HTML</span>
        </button>
        <button id="decodeJWTButton" class="btn btn-info btn-tools">
            <span>Decode JWT</span>
        </button>
      </div>
      <div style="display: flex; flex-wrap: wrap; gap: 20px; justify-content: center;">
        <textarea
          id="inputBox"
          rows="20"
          cols="70"
          placeholder="Paste your code here..."
          required=""
        ></textarea>
        <textarea id="outputBox" rows="20" cols="70"></textarea>
      </div>
    </div>`,
    },
  ],
};
