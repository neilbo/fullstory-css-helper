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
    const htmlClasses = document.querySelector("#input").value;
    const cssSelector = htmlClasses
      .trim()
      .split(/\s+/)
      .map(cls => `.${cls}`)
      .join('');
    
    document.querySelector("#result").innerHTML = cssSelector;
    document.querySelector(".results-wrapper").removeAttribute("hidden");
  }

  function resetForm() {
    const form = document.getElementById("convertForm");
    form.reset();
    input.focus();
    
    const elements = ["#result", ".results-wrapper", "#toast"];
    elements.forEach(selector => {
      const element = document.querySelector(selector);
      element.innerHTML = selector === "#result" ? "" : null;
      element.hidden = true;
    });
  }

  let copyToClipboardButton = document.getElementById("copyToClipboard");
  copyToClipboardButton.addEventListener("click", copyToClipboard);

  async function copyToClipboard() {
    const toast = document.querySelector("#toast");
    toast.classList.remove("fade-away");
    
    const text = document.querySelector("#result").innerHTML;
    try {
      await navigator.clipboard.writeText(text);
      toast.hidden = false;
      toast.classList.add("fade-away");
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
});
