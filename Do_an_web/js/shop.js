/* Phụ trách: Huỳnh Phước Khải - B2408856 */
function setCardLinks() {
    const cards = document.querySelectorAll(".card");
    cards.forEach(function (card) {
        const link = card.querySelector(".card-link");
        const idEl = card.querySelector(".item-id");
        if (link && idEl) {
            const id = idEl.textContent.trim();
            link.setAttribute("href", "detail.html?id=" + id);
        }
    });
}
document.addEventListener("DOMContentLoaded", function () {
    updateCartBadge();
    initCategoryFilter();
    addEventToAllCartButtons();
    setCardLinks();
});