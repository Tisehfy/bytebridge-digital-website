// 1. Select the elements we want JavaScript to control.
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const contactForm = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");
const year = document.getElementById("year");

// 2. Put the current year in the footer automatically.
year.textContent = new Date().getFullYear();

// 3. Open and close the navigation menu on small screens.
menuToggle.addEventListener("click", function () {
  navLinks.classList.toggle("show");

  const menuIsOpen = navLinks.classList.contains("show");
  menuToggle.setAttribute("aria-expanded", menuIsOpen);
  menuToggle.setAttribute(
    "aria-label",
    menuIsOpen ? "Close navigation menu" : "Open navigation menu"
  );
});

// Close the mobile menu after a navigation link is selected.
const navigationLinks = navLinks.querySelectorAll("a");

navigationLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("show");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// 4. Check the contact form when the visitor presses the submit button.
contactForm.addEventListener("submit", function (event) {
  // Stop the browser from reloading the page.
  event.preventDefault();

  // Read the text entered into each form field.
  const fullName = document.getElementById("full-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();

  // A simple pattern to check the general format of an email address.
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Check that no field has been left empty.
  if (!fullName || !email || !subject || !message) {
    showFeedback("Please complete all four fields.", "error");
    return;
  }

  // Check that the email looks valid.
  if (!emailPattern.test(email)) {
    showFeedback("Please enter a valid email address.", "error");
    return;
  }

  // Show a success message. This is a demonstration, not message delivery.
  showFeedback(
    "Your details passed validation. This demo has not sent your message.",
    "success"
  );

  // Clear the fields after successful validation.
  contactForm.reset();
});

// 5. Reusable function for showing feedback to the visitor.
function showFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = "form-feedback " + type;
}
