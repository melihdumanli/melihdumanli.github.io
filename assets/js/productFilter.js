function filterProducts() {
    const categoryCheckboxes = document.querySelectorAll('.categories input[type=checkbox]');
    const publisherCheckboxes = document.querySelectorAll('.filters input[type=checkbox]');
    const products = document.querySelectorAll('.single-product');
    const node = document.querySelector('.selected-content');
    const content = document.querySelector('.content');
    const noResulPage = document.querySelector('.no-results-found');

    while (node.firstChild) {
        node.removeChild(node.lastChild);
    }

    let selections = [];
    let selectedProducts = [];

    publisherCheckboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            selections.push(checkbox.value);
        }
    });

    if (selections.length > 0) {
        categoryCheckboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                selections = selections.map(selection => selection.concat('-', checkbox.value))
            }
        })
    } else {
        categoryCheckboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                selections.push(checkbox.value);
            }
        })
    }

    if (selections.length < 1) {
        content.style.display = "grid"
        node.style.display = "none"
        return
    } else {
        node.style.display = "grid"
    }

    products.forEach(function (product) {
        let cloneNode = product.cloneNode(true)
        let filterValue = product.getAttribute('id');
        selections.forEach(function (selection) {
            if (filterValue.includes(selection)) {
                selectedProducts.push(cloneNode)
            }
        });
    });

    if (selectedProducts.length > 0) {
        selectedProducts.forEach(function (product) {
            node.appendChild(product)
        });
        content.style.display = "none";
    } else {
        noResulPage.style.display = "block"
        content.style.display = "none";
    }
}