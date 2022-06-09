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

    const productImage = document.body.getElementById('product-image')

    const buyButton = document.getElementById('buyButton')
    buyButton.addEventListener('click', () => {
        window.location.href = `/confirm/${product.id}`
    })
}