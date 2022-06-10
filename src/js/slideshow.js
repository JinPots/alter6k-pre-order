let slideIndex = 1;
setTimeout(() => {showSlides(1)}, 500);

function changeSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i

    let slides = document.getElementsByClassName("image-slide")
    if (n > slides.length) slideIndex = 1
    if (n < 1) slideIndex = slides.length
    for (i = 0; i < slides.length; i++) slides[i].style.display = "none"

    slides[slideIndex - 1].style.display = "block"
}

setInterval(function() {changeSlides(1)}, 3500)