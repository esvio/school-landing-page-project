let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

document.addEventListener('DOMContentLoaded', function () {
    const scrollContainer = document.getElementById('section-latest_information');
    const scrollLeftButton = document.getElementById('scroll-left');
    const scrollRightButton = document.getElementById('scroll-right');
    const cards = Array.from(scrollContainer.querySelectorAll('.card'));
    const cardWidth = cards[0].offsetWidth + 20; // Width of a card including margin

    // Clone the first and last cards to create an infinite loop effect
    const cloneFirstCards = cards.map(card => card.cloneNode(true));
    const cloneLastCards = cards.map(card => card.cloneNode(true));

    cloneFirstCards.forEach(card => scrollContainer.appendChild(card));
    cloneLastCards.reverse().forEach(card => scrollContainer.insertBefore(card, scrollContainer.firstChild));

    // Set initial scroll position to the start of the original cards
    scrollContainer.scrollLeft = cards.length * cardWidth;

    // Function to handle infinite scrolling
    function infiniteScroll() {
        if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.offsetWidth)) {
            scrollContainer.scrollLeft = cards.length * cardWidth;
        } else if (scrollContainer.scrollLeft <= 0) {
            scrollContainer.scrollLeft = (scrollContainer.scrollWidth - 2 * cards.length * cardWidth);
        }
        scrollContainer.scrollBy({
            left: cardWidth,
            behavior: 'smooth'
        });
    }

    // Automatically scroll at regular intervals
    const autoScrollInterval = setInterval(infiniteScroll, 3000); // Adjust interval as needed

    // Event listeners for the buttons
    scrollRightButton.addEventListener('click', () => {
        clearInterval(autoScrollInterval);
        infiniteScroll();
    });

    scrollLeftButton.addEventListener('click', () => {
        clearInterval(autoScrollInterval);
        scrollContainer.scrollBy({
            left: -cardWidth,
            behavior: 'smooth'
        });
    });
});