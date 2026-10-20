const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const productCards = document.querySelectorAll(".product-card");
const cartCount = document.querySelector("#cart-count");
const noResults = document.querySelector("#no-results");
const toast = document.querySelector("#toast");
let cartItems = 0;
function filterProducts() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categorySelect.value;
    let visibleProducts = 0;
    productCards.forEach((card) => {
        const name = card.getAttribute("data-name") || "";
        const category = card.getAttribute("data-category") || "";
        const matchesSearch = name.includes(searchText);
        const matchesCategory = selectedCategory === "todos" || category === selectedCategory;
        const showCard = matchesSearch && matchesCategory;
        card.hidden = !showCard;
        if (showCard)
            visibleProducts++;
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