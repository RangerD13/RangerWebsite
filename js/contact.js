const contactEmail = "support@rangergasco.com";
const contactModal = document.getElementById("contactModal");
const contactForm = document.querySelector(".contact-form");
const contactModalTitle = document.getElementById("contactModalLabel");
const contactMessageLabel = document.getElementById("contactMessageLabel");
let activeModalTrigger = null;

function buildMailtoLink(form) {
  const formData = new FormData(form);
  const email = String(formData.get("email") || "").trim();
  const message = String(formData.get("message") || "").trim();
  const subject = form.dataset.subject || "Website inquiry from rangergasco.com";
  const body = `From: ${email}\n\n${message}`;

  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function syncContactModal(trigger) {
  if (!contactModal || !contactForm || !trigger) {
    return;
  }

  contactForm.reset();
  contactForm.classList.remove("was-validated");
  contactForm.dataset.subject = trigger.dataset.contactSubject || "Website inquiry from rangergasco.com";
  contactModalTitle.textContent = trigger.dataset.contactTitle || "Contact Ranger Gas Co.";
  contactMessageLabel.textContent = trigger.dataset.contactLabel || "How can we help? (max 1000 characters) *";
}

function openContactModal(trigger) {
  syncContactModal(trigger);
  activeModalTrigger = trigger;

  contactModal.style.display = "block";
  contactModal.removeAttribute("aria-hidden");
  contactModal.setAttribute("aria-modal", "true");
  contactModal.setAttribute("role", "dialog");
  contactModal.classList.add("show");
  document.body.classList.add("modal-open");

  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop fade show";
  backdrop.dataset.modalBackdrop = "contact";
  document.body.append(backdrop);

  contactModal.querySelector("input")?.focus();
}

function closeContactModal() {
  contactModal.classList.remove("show");
  contactModal.style.display = "none";
  contactModal.setAttribute("aria-hidden", "true");
  contactModal.removeAttribute("aria-modal");
  contactModal.removeAttribute("role");
  document.body.classList.remove("modal-open");
  document.querySelector('[data-modal-backdrop="contact"]')?.remove();
  activeModalTrigger?.focus();
  activeModalTrigger = null;
}

document.querySelectorAll('[data-bs-toggle="modal"][data-bs-target="#contactModal"]').forEach((trigger) => {
  trigger.addEventListener("click", () => openContactModal(trigger));
});

document.querySelectorAll('[data-bs-dismiss="modal"]').forEach((button) => {
  button.addEventListener("click", closeContactModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && contactModal?.classList.contains("show")) {
    closeContactModal();
  }
});

document.querySelectorAll(".navbar-toggler").forEach((button) => {
  button.addEventListener("click", () => {
    const target = document.querySelector(button.dataset.bsTarget);
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    target?.classList.toggle("show", !isExpanded);
    button.setAttribute("aria-expanded", String(!isExpanded));
  });
});

if (contactForm) {

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    contactForm.classList.add("was-validated");

    if (!contactForm.checkValidity()) {
      return;
    }

    window.location.href = buildMailtoLink(contactForm);
  });
}
