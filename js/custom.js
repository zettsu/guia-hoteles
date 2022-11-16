let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
let popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
});

var myCarousel = document.querySelector('#carousel')
var carousel = new bootstrap.Carousel(myCarousel, {
    interval: 4000,
    wrap: false
})