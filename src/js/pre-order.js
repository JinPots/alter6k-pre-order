const url = window.location.href
const id = url.split('/')[url.split('/').length - 1]

window.onload = async () => {
    const products = await fetch('/json/product.json').then(res => res.json())
    const product = products.find(p => p.id === id)
    if (product === undefined) {
        const notfound = document.createElement('div')
        notfound.innerHTML = `
            <h1>404</h1>
            <p>Không tìm thấy sản phẩm</p>
        `
        notfound.style.textAlign = 'center'
        notfound.style.fontFamily = 'var(--primary-font)'
        notfound.style.position = 'absolute'
        notfound.style.top = '20%'
        notfound.style.left = '45%'
        notfound.style.color = 'var(--jetbrain-clion)'
        document.body.appendChild(notfound)
    }
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    })
    const productDiv = document.createElement('div')
    productDiv.className = 'product'
    productDiv.innerHTML = `
        <h1>${product.name}</h1>
        <p>Thông tin: ${product.description}</p>
        <p>Giá: ${formatter.format(product.price)}</p>
        <button id="buyButton">Mua deo noi nhieu kkk</button>
    `
    const productContainer = document.body.getElementsByClassName('product-container')[0]
    productContainer.appendChild(productDiv)

    const productImageContainer = document.createElement('div')
    productImageContainer.className = 'product-image-container'
    product.images.forEach(img => {
        const imageDiv = document.createElement('div')
        imageDiv.className = 'image'
        imageDiv.innerHTML = `
            <img src="${img}" alt="${product.name}" width="90%" height="256px">
        `
        productImageContainer.appendChild(imageDiv)
    });    
    productContainer.appendChild(productImageContainer)

    const buyButton = document.getElementById('buyButton')
    buyButton.addEventListener('click', () => {
        window.location.href = `/confirm-pre-order/${product.id}`
    })
}