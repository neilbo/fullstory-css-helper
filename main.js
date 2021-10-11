document.addEventListener("DOMContentLoaded", async () => {
  let input = document.getElementById("input");
  input.autofocus;
  input.addEventListener("blur", () => {
    convertToCSS();
  });

  let form = document.getElementById("convertForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.checkValidity()) {
      convertToCSS();
    }
  });

  let clearFormButton = document.getElementById("clearForm");
  clearFormButton.addEventListener("click", () => {
    resetForm();
  });

  input.addEventListener("search", (event) => {
    // when user clicks on "x" reset the form
    resetForm();
  });

  function convertToCSS() {
    let htmlClasses = document.querySelector("#input").value;
    let putDotsInfrontOfEachWord = htmlClasses.trim().replace(/(^|\s+)/g, "$1.").trim();
    let removeSpaces = putDotsInfrontOfEachWord.replace(/\s/g, "")
    document.querySelector("#result").innerHTML = removeSpaces;
    document.querySelector(".results-wrapper").removeAttribute("hidden");
  }

  function resetForm() {
    let form = document.getElementById("convertForm");
    form.reset();
    input.autofocus;
    document.querySelector("#result").innerHTML = "";
    document.querySelector(".results-wrapper").setAttribute("hidden", true);
    document.querySelector("#toast").setAttribute("hidden", true);
  }

  let copyToClipboardButton = document.getElementById("copyToClipboard");
  copyToClipboardButton.addEventListener("click", () => {
    // remove fade-away class to start
    document.querySelector("#toast").classList.remove("fade-away");
    // Copy To Clipboard
    let string = document.querySelector("#result").innerHTML;
    const el = document.createElement("textarea");
    el.value = string;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    // Notify user that it was copied
    document.querySelector("#toast").removeAttribute("hidden");
    document.querySelector("#toast").classList.add("fade-away");
  });
});
