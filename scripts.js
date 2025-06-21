document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".biodata-form");
  const inputs = form.querySelectorAll("input, select, textarea");

  const patterns = {
    fullName: /^[a-zA-Z\s]{3,50}$/,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^[0-9]{11,15}$/,
    studentId: /^[a-zA-Z0-9-]{4,20}$/,
    department: /^[a-zA-Z\s]{2,50}$/,
    batch: /^[a-zA-Z0-9\s-]{2,20}$/,
    emergencyName: /^[a-zA-Z\s]{3,50}$/,
    relationship: /^[a-zA-Z\s]{2,30}$/,
    emergencyPhone: /^[0-9]{11,15}$/,
  };

  inputs.forEach((input) => {
    if (
      input.type !== "submit" &&
      input.type !== "reset" &&
      input.type !== "select-one"
    ) {
      const iconContainer = document.createElement("div");
      iconContainer.className = "validation-icon";
      input.parentElement.classList.add("input-container");
      input.parentElement.appendChild(iconContainer);
    }
  });

  // Validation function
  function validateInput(input) {
    if (input.type === "radio" || input.type === "checkbox") {
      return true;
    }

    if (input.type === "select-one") {
      return input.value !== "";
    }

    const iconContainer = input.parentElement.querySelector(".validation-icon");
    let isValid = true;

    input.classList.remove("valid", "invalid");
    if (iconContainer) iconContainer.innerHTML = "";

    if (!input.required && !input.value) {
      return true;
    }

    switch (input.type) {
      case "text":
        if (patterns[input.id]) {
          isValid = patterns[input.id].test(input.value);
        } else {
          isValid = input.value.trim().length > 0;
        }
        break;
      case "email":
        isValid = patterns.email.test(input.value);
        break;
      case "tel":
        isValid = patterns[input.id]
          ? patterns[input.id].test(input.value)
          : patterns.phone.test(input.value);
        break;
      case "date":
        isValid = input.value.trim() !== "";
        break;
      case "select-one":
        isValid = input.value !== "";
        break;
      case "textarea":
        isValid = input.value.trim().length > 0;
        break;
    }

    if (isValid) {
      input.classList.add("valid");
      if (iconContainer) {
        iconContainer.innerHTML =
          '<img src="assets/checked.png" alt="Valid input" class="valid-icon">';
      }
    } else {
      input.classList.add("invalid");
      if (iconContainer) {
        iconContainer.innerHTML =
          '<img src="assets/delete.png" alt="Invalid input" class="invalid-icon">';
      }
    }

    return isValid;
  }

  // Add event listeners to all inputs
  inputs.forEach((input) => {
    if (input.type !== "submit" && input.type !== "reset") {
      input.addEventListener("blur", function () {
        validateInput(this);
      });

      input.addEventListener("input", function () {
        if (this.classList.contains("invalid")) {
          validateInput(this);
        }
      });
    }
  });

  // ...existing code...

  form.addEventListener("submit", function (event) {
    let formIsValid = true;

    inputs.forEach((input) => {
      if (
        input.type !== "submit" &&
        input.type !== "reset" &&
        input.type !== "radio" &&
        input.type !== "checkbox"
      ) {
        if (!validateInput(input) && input.required) {
          formIsValid = false;
        }
      }
    });

    if (!formIsValid) {
      event.preventDefault();
      alert("Please fill in all required fields correctly.");
    }
  });

  form.addEventListener("submit", function (event) {
    let formIsValid = true;

    inputs.forEach((input) => {
      if (input.type !== "submit" && input.type !== "reset") {
        if (!validateInput(input) && input.required) {
          formIsValid = false;
        }
      }
    });

    if (!formIsValid) {
      event.preventDefault();
      alert("Please fill in all required fields correctly.");
    }
  });
});
