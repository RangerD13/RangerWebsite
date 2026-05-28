const contactEmail = "support@rangergasco.com";

function buildMailtoLink(form) {
  const formData = new FormData(form);
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const subject = form.dataset.subject || "Website inquiry from rangergasco.com";
  const body = `From: ${email}\n\n${message}`;

  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

document.querySelectorAll(".contact-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    form.classList.add("was-validated");

    if (!form.checkValidity()) {
      return;
    }

    window.location.href = buildMailtoLink(form);
  });
});
