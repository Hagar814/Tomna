
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


function updateNotificationBadge() {
    // Count unread notifications
    const unreadCount = document.querySelectorAll('.notification-item.unread').length;
    console.log("Unread notifications found:", unreadCount);

    // Target the nav item
    const navItem = document.querySelector('.nav-item.dropdown.dropdown-notifications.dropdown-mobile');
    if (!navItem) {
        console.warn("⚠️ Notification nav item not found!");
        return;
    }

    // Check if badge already exists
    let badge = document.getElementById("notification-badge");
    if (!badge) {
        badge = document.createElement("span");
        badge.id = "notification-badge";
        badge.style.position = "absolute";
        badge.style.top = "6px";
        badge.style.right = "6px";
        badge.style.background = "#007bff";   // blue
        badge.style.color = "#fff";           // white text
        badge.style.borderRadius = "50%";     // circle
        badge.style.minWidth = "18px";
        badge.style.height = "18px";
        badge.style.fontSize = "11px";
        badge.style.lineHeight = "18px";
        badge.style.textAlign = "center";
        badge.style.fontWeight = "bold";
        badge.style.display = "none";
        badge.style.zIndex = "10";

        // Append into the <a> instead of <button>
        const bellLink = navItem.querySelector("a.nav-link");
        if (bellLink) {
            bellLink.style.position = "relative"; // make <a> the positioning container
            bellLink.appendChild(badge);
        } else {
            console.warn("⚠️ Bell link not found inside nav item!");
            return;
        }
    }

    // Update number
    if (unreadCount > 0) {
        badge.textContent = unreadCount;
        badge.style.display = "inline-block";
    } else {
        badge.style.display = "none";
    }
}

// Run on load + watch for changes
setInterval(updateNotificationBadge, 2000);






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




