let popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
});

let myCarousel = document.querySelector('#carousel');
new bootstrap.Carousel(myCarousel, {
    interval: 4000,
    wrap: false
});

let modalContact = $("#contact");
let btnContact = $("#btnContact");

modalContact.on('show.bs.modal', function (e){
    console.log("shown modal, instance method show is called, not visible");
    if (!btnContact.prop("disabled")) {
        btnContact.prop("disabled", true);
    }
    if (!btnContact.hasClass("btn-primary")) {
        btnContact.removeClass("btn-primary");
    }
    if (!btnContact.hasClass("btn-danger")) {
        btnContact.addClass("btn-danger");
    }
});

modalContact.on('hide.bs.modal', function (e){
    console.log("hide modal, instance event hide is called, visible");
});

modalContact.on('shown.bs.modal', function (e){
    console.log("shown modal, modal is visible");
});

modalContact.on('hidden.bs.modal', function (e){
    console.log("hidden modal, modal is successfully hidden(not visible)");
    if (btnContact.prop("disabled")) {
        btnContact.prop("disabled", false);
    }
    if (!btnContact.hasClass("btn-primary")) {
        btnContact.addClass("btn-primary");
    }
    if (btnContact.hasClass("btn-danger")) {
        btnContact.removeClass("btn-danger");
    }
});
