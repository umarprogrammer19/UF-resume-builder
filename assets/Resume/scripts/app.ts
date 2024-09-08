// $ k error se bachne k liye lagaya hai warna type install karna parta;
declare const $: any;
$(document).ready(function () {
    // Initialize the repeater plugin
    $('.repeater').repeater({
        initEmpty: false,
        defaultValues: {
            'text-input': ''
        },
        show: function () {
            $(this).slideDown();
        },
        hide: function (deleteElement: boolean) {
            $(this).slideUp(deleteElement);
            setTimeout(() => {
                generateCV();
            }, 500);
        },
        isFirstItemUndeletable: true
    });
});
