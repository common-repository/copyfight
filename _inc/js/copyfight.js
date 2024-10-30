jQuery(function($) {

    //fouc protection
    $('#copyfight_content').show();

    //safari specific
    var is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
    var is_safari = navigator.userAgent.indexOf('Safari') > -1;
    if ((is_chrome) && (is_safari)) { is_safari = false; }
    if (is_safari) {
        $('.copyfight_copy_link').remove();
        $('.copyfight_download_link').remove();
    }

    //right click
    if (copyfight.copyfight_right_click == 'false') {
        $('#copyfight_content').contextmenu(function(e) {
            e.preventDefault();
            return false;
        });
    }

    //copy link
    $('.copyfight_copy_link').on('click', function(e) {
        $('body').css('cursor', 'progress');
        e.preventDefault();
        var selections = [];
        $('mark.copyfight').each(function (index, value) {
            selections[index] = value.innerText;
        });
        if (selections.length && !$('#copyfight_copy').val().length) {
            $.ajax({
                url: copyfight.ajax_url,
                type: 'POST',
                data: {
                    action: 'copyfight_ajax',
                    selections: selections,
                    postid: post.id
                },
                success: function(response) {
                    if (response.length) {
                        $('#copyfight_copy').attr('type', 'text');
                        $('#copyfight_copy').val(response);
                        $('#copyfight_copy').attr('type', 'hidden');
                        $('.copyfight_copy_link').trigger('click');
                    }
                }
            });
        } else {
            $('#copyfight_copy').attr('type', 'text');
            $('#copyfight_copy').select();
            document.execCommand('cut');
            $('#copyfight_copy').attr('type', 'hidden');
            $('body').css('cursor', 'default');
        }
        return false;
    });

    //download link
    $('.copyfight_download_link').on('click', function(e) {
        $('body').css('cursor', 'progress');
        e.preventDefault();
        var selections = [];
        $('mark.copyfight').each(function(index, value) {
            selections[index] = value.innerText;
        });
        if (selections.length) {
            $.ajax({
                url: copyfight.ajax_url,
                type: 'POST',
                data: {
                    action: 'copyfight_ajax',
                    selections: selections,
                    postid: post.id
                },
                success: function(response) {
                    if (response.length) {
                        uriContent = "data:application/octet-stream," + encodeURIComponent(response);
                        newWindow = window.open(uriContent, 'copyfight-download');
                        $('body').css('cursor', 'default');
                    }
                }
            });
        }
        return false;
    });

    //unselect link
    $('.copyfight_unselect_link').on('click', function(e) {
        $('body').css('cursor', 'default');
        e.preventDefault();
        $('mark').contents().unwrap();
        toggleEntryLinks();
        return false;
    });

    //text select
    if (copyfight.copyfight_select == 'true') {
        $('#copyfight_content').on('mousedown', function() {
            window.getSelection().removeAllRanges();
        });
        $('#copyfight_content').on('mouseup', function() {

            //remove non copyfight marks
            if (!$('mark.copyfight').length) {
                $('mark').contents().unwrap();
            }

            var selection = window.getSelection().getRangeAt(0);
            window.getSelection().removeAllRanges();

            //minimal selection length: 1
            if (selection.collapsed || Math.abs(selection.endOffset - selection.startOffset) <= 1) {
                return false;
            }

            //within copyfight content?
            if ($(selection.commonAncestorContainer).has('#copyfight_content').length == 1) {
                return false;
            }

            //wrap
            var content = selection.extractContents();
            var mark = document.createElement('mark');
            var timestamp = new Date().getTime();
            mark.setAttribute('data-timestamp', timestamp);
            mark.setAttribute('class', 'copyfight');
            mark.appendChild(content);
            selection.insertNode(mark);

            //merge marks
            var html = $('#copyfight_content').html().replace(/<\/mark><mark.*?>/g, '');
            $('#copyfight_content').html(html);
            $('mark.copyfight').each(function (index, value) {
                $(value).find('mark.copyfight').contents().unwrap();
            });

            //move in sight
            if (!isElementInViewport($('#copyfight_entry_links'))) {
                $('html, body').animate({
                    scrollTop: $("#copyfight_entry_links").offset().top - (window.innerHeight / 2 || document.documentElement.clientHeight / 2)
                }, 100);
            }

            toggleEntryLinks();

            return false;
        });
    }

    //print
    $('.copyfight_print_link').on('click', function(e) {
        e.preventDefault();
        window.print();
        return false;
    });

    //printscreen
    if (copyfight.copyfight_printscreen == 'false') {
        $(window).on('blur keydown', function() {
            blur();
        });
        $(window).on('focus keyup', function() {
            focus();
        });
        function blur() {
            $('#copyfight_content noindex').wrapInner('<p class="copyfight_blurred_lines"></p>');
        }
        function focus() {
            $('.copyfight_blurred_lines').contents().unwrap();
        }
    }

    //add entry links
    function toggleEntryLinks() {
        if ($('mark.copyfight').length) {
            $("#copyfight_entry_links a").show();
        } else {
            $('#copyfight_entry_links a').hide();
        }
    }

    //console
    if (copyfight.copyfight_console == 'false') {
        if (window.console) {
            console.log("%c" + copyfight.console_message, "background: #d54f27; color: #fff; font-size: x-large; padding: 3em;");
            window.console.log = function () {
                return copyfight.console_message;
            }
        }
    }

    function isElementInViewport (el) {
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
        );
    }

});