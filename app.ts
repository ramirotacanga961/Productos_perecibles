const searchInput = document.querySelector("#search") as HTMLInputElement;
const categorySelect = document.querySelector("#category") as HTMLSelectElement;
const productCards = document.querySelectorAll(".product-card");
const cartCount = document.querySelector("#cart-count") as HTMLSpanElement;
const noResults = document.querySelector("#no-results") as HTMLParagraphElement;
const toast = document.querySelector("#toast") as HTMLDivElement;

let cartItems = 0;

function filterProducts(): void {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categorySelect.value;
    let visibleProducts = 0;

    productCards.forEach((card) => {
        const name = card.getAttribute("data-name") || "";
        const category = card.getAttribute("data-category") || "";
        const matchesSearch = name.includes(searchText);
        const matchesCategory = selectedCategory === "todos" || category === selectedCategory;
        const showCard = matchesSearch && matchesCategory;

        (card as HTMLElement).hidden = !showCard;
        if (showCard) visibleProducts++;
    });

    noResults.hidden = visibleProducts > 0;
}

searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);

document.querySelectorAll(".add-button").forEach((button) => {
    button.addEventListener("click", () => {
        cartItems++;
        cartCount.textContent = String(cartItems);
        const productName = button.getAttribute("data-product") || "Producto";
        toast.textContent = productName + " añadido al carrito";
        toast.classList.add("show");
        window.setTimeout(() => toast.classList.remove("show"), 2200);
    });
});