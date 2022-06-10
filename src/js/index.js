window.onload = async () => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',      
    });
    const product = await fetch('/json/product.json').then(res => res.json())
    // Make divs for each product
    const productDivs = product.map(p => {
        const div = document.createElement('div')
        div.className = p.id
        div.innerHTML = `
            <img src="${p.images[0]}">
            <h1>${p.name}</h1>
            <p>${p.short_desc}</p>
            <hr>
            <p>Giá tiền: ${formatter.format(p.price)}</p>
        `
        div.addEventListener('click', () => {
            window.location.href = `/view-product/${p.id}`
        })
        return div
    })
    // Append divs to the DOM
    const productDiv = document.body.getElementsByClassName('product-container')[0]
    productDivs.forEach(p => productDiv.appendChild(p))
}