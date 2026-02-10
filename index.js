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

//Children function that appends const type 'list' to 'root' element - troubleshooting page
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

  let table = [`<table class="table">`];
  let headers = ["<thead><tr>"];
  let objectKeys = Object.keys(objArray[index].snippets[0]);
  objectKeys.slice(0, 2).map((header) => {
    headers.push(`<th>${header}</th>`);
  });
  headers.push("</tr></thead>");
  let tbody = ["<tbody>"];

  pageSnippets = objArray[index].snippets.map((snippet) => {
    return `<tr>
              <td class="troubleshoot-snippet">${snippet[objectKeys[0]]}</td>
              <td>
                <div class="cell-content">
                  <div class="snippet-description">${snippet[objectKeys[1]]}</div>
                  <div class="snippet-category"><span>CATEGORY:</span>${snippet[objectKeys[2]].split("_")[0].trim()}</div>
                  <div class="snippet-subcategory"><span>SUBCATEGORY:</span>${snippet[objectKeys[2]].split("_")[1].trim()}</div>
                  <div class="snippet-tags"><span>TAGS:</span>${snippet[objectKeys[3]]}</div>
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

//Children function that appends const type 'cards' to 'root' element
function appendToolsToRoot(objArray, index) {
  const finalTools = objArray[index].tools.map((item) => {
    return `<details class="tools" id="${item.title}-tool"><summary>${item.title}</summary>${item.component}</details>`;
  });

  $("#root").append(
    `<h1 class="pageTitle"><code>tools</code></h1><div class="markdown-body">${finalTools}</div>`,
  );
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

async function appendMdNotesToRoot() {
  const sortedMdPages = [...markdownNotes.pages].sort((a, b) =>
    a.replaceAll("_", " ").localeCompare(b.replaceAll("_", " "), undefined, {
      sensitivity: "base",
    }),
  );

  const md = window
    .markdownit({
      html: true,
      linkify: true,
      typographer: true,
    })
    .use(window.markdownItAnchor, {
      slugify: consistentSlugify,
    });

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
  hljs.highlightAll();
}

//Parent function to append item to 'root' element depending on the type
function appendToRoot(objArray, index) {
  objArray[index].type === "sections" && appendSectionsToRoot(objArray, index);

  objArray[index].type === "list" && appendListToRoot(objArray, index);

  objArray[index].type === "cards" && appendCardsToRoot(objArray, index);

  objArray[index].type === "list-items" &&
    appendListItemsToRoot(objArray, index);

  objArray[index].type === "tools" && appendToolsToRoot(objArray, index);

  objArray[index].type === "section-list" &&
    appendSectionListToRoot(objArray[index]);

  objArray[index].type === "markdown-pages" &&
    appendMdNotesToRoot(objArray[index]);
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

    hljs.highlightAll();
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
  const radioComponent = `<div>
                          <p class="filter_card_headers">CATEGORY FILTER</p>
                          <fieldset class="tablesRadioInput_fieldset">
                            <div>
                              <input type="radio" id="all" name="table" value="all" checked />
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
              <input type="radio" id="${category}" name="table" value="${category}" />
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

const spaceDiv = `<div class="mt-6"></div>`;
const customHorizontalLine = `<div style="height: 1px; background-color: #00ffef; margin: 10px 0 20px 0;">&nbsp;</div>`;

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

const markdownNotes = {
  title: "markdown notes",
  type: "markdown-pages",
  navcategory: "menu",
  pages: [
    "notes_typescript",
    "notes_react",
    "notes_nodejs",
    "notes_jquery",
    "notes_javascript",
    "notes_javascript_and_powershell",
    "notes_ethical_hacking",
    "notes_databases",
    "notes_cmd",
    "errors_misc",
    "errors_SSL_certificate_problem",
    "howto_remote_desktop_into_ubuntu",
    "howto_delete_git_repo_commit_history",
    "notes_aws_certified_developer",
  ],
};

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
