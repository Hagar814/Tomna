
// Function to hide search bar for Operation users
function hideSearchBarForOperationUser() {
    const roles = frappe.boot?.user?.roles || [];

    if (roles.includes("Operation user")) {
        // Use the exact selector for the search bar container
        let searchBar = document.querySelector(".input-group.search-bar");
        if (searchBar) {
            searchBar.style.display = "none";
            console.log("✅ Search bar hidden for Operation user");
        }

        // Disable Ctrl+G shortcut
        frappe.ui.keys.off("ctrl+g");
    }
}
function hideActionsForOperationUser() {
    const roles = frappe.boot?.user?.roles || [];
    const currentPath = window.location.pathname;

    if (roles.includes("Operation user")) {
        const restrictedPaths = [
            "/app/sales-order",
            "/app/delivery-note",
            "/app/batch",
            "/app/material-request",
            "/app/purchase-receipt",
            "/app/supplier-quotation"
        ];

        if (restrictedPaths.includes(currentPath)) {
            // Hide list view toolbar
            // let listActions = document.querySelector(".flex.col.page-actions.justify-content-end");
            // if (listActions) {
            //     listActions.style.display = "none";
            //     console.log("🚫 List actions hidden:", currentPath);
            // }

            // Hide the "List View" dropdown button
            let listViewBtn = document.querySelector(".custom-actions.hidden-xs.hidden-md");
            if (listViewBtn) {
                listViewBtn.style.display = "none";
                console.log("🚫 List View dropdown hidden:", currentPath);
            }
        }
    }
}




// function hideListViewButtonIfRestricted() {
//     const roles = frappe.boot?.user?.roles || [];
//     console.log("Current User Roles:", roles);

//     if (!roles.includes("Operation user")) return;

//     const blocked_doctypes = [
//         "Sales Order",
//         "Delivery Note",
//         "Material Request",
//         "Supplier Quotation",
//         "Purchase Receipt",
//         "Batch"
//     ];

//     const route = frappe.get_route() || [];
//     console.log("📍 Current Route:", route);

//     let current_doctype = null;

//     // Case 1: /app/doctype
//     if (route[0] === "app" && route[1]) {
//         current_doctype = route[1].replace(/-/g, " ");
//     }

//     // Case 2: ["List", "Batch", "List"]
//     if (route[0] === "List" && route[1]) {
//         current_doctype = route[1];
//     }

//     if (current_doctype && blocked_doctypes.map(dt => dt.toLowerCase()).includes(current_doctype.toLowerCase())) {
//         // Find the button that has "List View" label inside
//     document.querySelectorAll('.custom-btn-group-label').forEach(el => {
//         if (el.innerText.trim() === "List View") {
//             let btn = el.closest("button");
//             if (btn) {
//                 btn.style.display = "none";
//             }
//         }
//     });
//     }
// }






// Run after ajax
frappe.after_ajax(() => {
    hideSearchBarForOperationUser();
    hideActionsForOperationUser();

    // Also run after every route change
    frappe.router.on("change", () => {
          hideSearchBarForOperationUser();
        hideActionsForOperationUser();
    });
});




