const orderOverlay = document.querySelector("[data-order-overlay]");
const openOrderButton = document.querySelector("[data-open-order-form]");
const closeOrderButtons = document.querySelectorAll("[data-close-order-form]");
const orderForm = document.querySelector(".order-form");

if (orderOverlay && openOrderButton) {
    const closeOrderForm = () => {
        orderOverlay.hidden = true;
        document.body.classList.remove("cart-page--modal-open");
    };

    openOrderButton.addEventListener("click", () => {
        orderOverlay.hidden = false;
        document.body.classList.add("cart-page--modal-open");
    });

    closeOrderButtons.forEach((button) => {
        button.addEventListener("click", closeOrderForm);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !orderOverlay.hidden) {
            closeOrderForm();
        }
    });
}

if (orderForm) {
    const nameInput = orderForm.querySelector('input[name="customer-name"]');
    const emailInput = orderForm.querySelector('input[name="customer-email"]');
    const phoneInput = orderForm.querySelector('input[name="customer-phone"]');
    const addressInput = orderForm.querySelector('textarea[name="customer-address"]');
    const paymentMethodInput = orderForm.querySelector('select[name="payment-method"]');

    const validateName = () => {
        const nameValue = nameInput.value.trim();
        const letterCount = nameValue.replace(/\s+/g, "").length;

        if (!nameValue) {
            nameInput.setCustomValidity("Name must be filled.");
        } else if (!/^[A-Za-z\s]+$/.test(nameValue)) {
            nameInput.setCustomValidity("Name must contain letters only.");
        } else if (letterCount > 20) {
            nameInput.setCustomValidity("Name must be maximum 20 letters.");
        } else {
            nameInput.setCustomValidity("");
        }
    };

    const validateEmail = () => {
        const emailValue = emailInput.value.trim().toLowerCase();

        if (!emailValue) {
            emailInput.setCustomValidity("Email must be filled.");
        } else if (!/^[^\s@]+@gmail\.com$/.test(emailValue)) {
            emailInput.setCustomValidity("Email must use @gmail.com.");
        } else {
            emailInput.setCustomValidity("");
        }
    };

    const validatePhone = () => {
        const phoneValue = phoneInput.value.trim();

        if (!phoneValue) {
            phoneInput.setCustomValidity("Phone number must be filled.");
        } else if (!/^\d+$/.test(phoneValue)) {
            phoneInput.setCustomValidity("Phone number must contain numbers only.");
        } else if (!phoneValue.startsWith("08")) {
            phoneInput.setCustomValidity("Phone number must begin with 08.");
        } else if (phoneValue.length > 12) {
            phoneInput.setCustomValidity("Phone number must be maximum 12 numbers.");
        } else if (phoneValue.length < 11) {
            phoneInput.setCustomValidity("Phone number must be minimum 11 numbers.");
        }else {
            phoneInput.setCustomValidity("");
        }
    };

    const validateAddress = () => {
        if (!addressInput.value.trim()) {
            addressInput.setCustomValidity("Address must be filled.");
        } else {
            addressInput.setCustomValidity("");
        }
    };

    const validatePaymentMethod = () => {
        if (!paymentMethodInput.value) {
            paymentMethodInput.setCustomValidity("Please select a payment method.");
        } else {
            paymentMethodInput.setCustomValidity("");
        }
    };

    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    phoneInput.addEventListener("input", validatePhone);
    addressInput.addEventListener("input", validateAddress);
    paymentMethodInput.addEventListener("change", validatePaymentMethod);

    orderForm.addEventListener("submit", (event) => {
        validateName();
        validateEmail();
        validatePhone();
        validateAddress();
        validatePaymentMethod();

        if (!orderForm.checkValidity()) {
            event.preventDefault();
            orderForm.reportValidity();
        }
    });
}
