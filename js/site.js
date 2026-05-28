document.querySelectorAll(".navbar-toggler").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.bsTarget);
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    target?.classList.toggle("show", !isExpanded);
    button.setAttribute("aria-expanded", String(!isExpanded));
  });
});
