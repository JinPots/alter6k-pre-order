const url = window.location.href
const id = url.split('/')[url.split('/').length - 1]

window.onload = async () => {
    const products = await fetch('/json/product.json').then(res => res.json())
    const product = products.find(p => p.id === id)

    if (product === undefined) window.location.href = '/error'

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND',
    })

    // adding product image previews
    const productImage = document.body.querySelector('#product-images')

    product.images.forEach(image => {
        const img = document.createElement('img')
        img.src = image
        img.classList.add('image-slide')
        productImage.appendChild(img)
    });

    // product name and price
    document.body.querySelector('#product-name').innerHTML = product.name
    document.body.querySelector('#price').innerHTML = formatter.format(product.price)

    // product description
    document.body.querySelector('#description-text').innerHTML = product.description

    const buyButton = document.getElementById('buyButton')
    buyButton.addEventListener('click', () => {
        window.location.href = `/confirm/${product.id}`
    })
}