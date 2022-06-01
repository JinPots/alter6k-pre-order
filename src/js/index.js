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
            <h1>${p.name}</h1>
            <p>Thông tin: ${p.description}</p>
            <p>Giá: ${formatter.format(p.price)}</p>
        `
        div.addEventListener('click', () => {
            window.location.href = `/pre-order/${p.id}`
        })
        return div
    })
    // Append divs to the DOM
    const productDiv = document.body.getElementsByClassName('product-container')[0]
    productDivs.forEach(p => productDiv.appendChild(p))
}