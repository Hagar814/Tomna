function hideListViewButtonForOperationUser() {


    // check if "Operation user" exists in frappe.user_roles (case-insensitive)
    const hasRole = frappe.user_roles.some(
        r => r.toLowerCase() === "operation user".toLowerCase()
    );

    if (!hasRole) {
        return;
    }


    document.querySelectorAll('.custom-btn-group-label').forEach(el => {
        if (el.innerText.trim() === "List View") {
            let btn = el.closest("button");
            if (btn) {
                btn.style.display = "none";
            }
        }
    });


}

frappe.listview_settings['Operation'] = {
    onload: function(listview) {
        setTimeout(hideListViewButtonForOperationUser, 500);
    }
};
