jQuery(function($) {

    $('.copyfight_content').show();

    $('body').on('copy', function(e) {
        parentEl = getSelectionParentElement();
        if ($(parentEl).hasClass('copyfight_content') || $(parentEl).parents('.copyfight_content').length) {
            $('#copyfight_notice').attr('type', 'text');
            $('#copyfight_notice').prop('disabled', false);
            $('#copyfight_notice').select();
            $('#copyfight_notice').hide();
            $('#copyfight_notice').fadeIn('slow');
            document.execCommand('copy');
            $(window).scrollTop($('#copyfight_notice').position().top);
            $('#copyfight_notice').prop('disabled', true);
        }
    });

    function getSelectionParentElement() {
        var parentEl = null, sel;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                parentEl = sel.getRangeAt(0).commonAncestorContainer;
                if (parentEl.nodeType != 1) {
                    parentEl = parentEl.parentNode.parentNode;
                }
            }
        } else if ( (sel = document.selection) && sel.type != "Control") {
            parentEl = sel.createRange().parentElement().parentElement();
        }
        return parentEl;
    }

});