// TinyMCE
tinymce.init({
    selector: "textarea.tinymce",
    menubar: false,
    statusbar: false,
    plugins: "autolink code paste lists",
    paste_auto_cleanup_on_paste : true,
    paste_remove_styles: true,
    paste_remove_styles_if_webkit: true,
    paste_strip_class_attributes: "all",
    toolbar: "bold italic underline | bullist numlist outdent indent | styleselect | undo redo | code"
});

// dont block modals
$(document).on('focusin', function(e) {
    if ($(e.target).closest(".mce-window").length) {
        e.stopImmediatePropagation();
    }
});
