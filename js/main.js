// CSS
import '@/style/global.scss'

// OTHER
import '@/js/components'
import '@/js/icons'


document.querySelector('#previous').addEventListener('click', previousSlide)
document.querySelector('#next').addEventListener('click', nextSlide)
// current index of slide
let slideIndex = 1
showSlides(slideIndex)

// index of next slide
function nextSlide() {
    showSlides((slideIndex += 1))
}

// index of previous slide
function previousSlide() {
    showSlides((slideIndex -= 1))
}

// current slide
function currentSlide(n) {
    showSlides((slideIndex = n))
}

// slider function

function showSlides(n) {
    const slides = document.querySelectorAll('.slider-news__item')
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }

    /* Проходим по каждому слайду в цикле for */
    for (const slide of slides) {
        slide.style.display = 'none'
    }
    slides[slideIndex - 1].style.display = 'block'
}


// sfffa
// const swiper = new Swiper(".mySwiper", {
//     slidesPerView: 3,
//     spaceBetween: 30,
//     slidesPerGroup: 1,
//     loop: true,
//     loopFillGroupWithBlank: true,
//     pagination: {
//         el: ".swiper-pagination",
//         clickable: true
//     },
//     navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev"
//     }
// });

if (document.documentElement.clientWidth > 1200) {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 15,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    })
} else if (document.documentElement.clientWidth > 700) {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 2,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    })
} else {
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    })
}

const tabLinks = document.querySelectorAll(".tabs a");
const tabPanels = document.querySelectorAll(".tabs-panel");

for (let el of tabLinks) {
    el.addEventListener("click", e => {
        e.preventDefault();

        document.querySelector('.tabs li.active').classList.remove("active");
        document.querySelector('.tabs-panel.active').classList.remove("active");

        const parentListItem = el.parentElement;
        console.log(parentListItem);
        parentListItem.classList.add("active");
        const index = [...parentListItem.parentElement.children].indexOf(parentListItem);

        const panel = [...tabPanels].filter(el => el.getAttribute("data-index") == index);
        panel[0].classList.add("active");
    });
}