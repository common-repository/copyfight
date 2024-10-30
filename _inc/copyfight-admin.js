jQuery(function($) {

    /* Default settings */

    $('#copyfight-config select').keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });

    $('#copyfight-config input').keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });

    $('#copyfight_api_key_reset').click(function() {
        if ($('#copyfight_api_key').val() == '') {
            alert(copyfight.noticeEmptyApiKey);
            return false;
        } else if ($("#copyfight_api_key").is('[readonly]')) {
            $('#copyfight_api_key').val('');
        }
    });

    $('#copyfight_typeface').change(function() {
        $('.copyfight_typeface_info').hide();
        if ($('#copyfight_typeface').val().length) {
            $('#copyfight_typeface_info_loader').show();
            $.ajax({
                url: copyfight.ajax_url,
                type: 'POST',
                data: {
                    action: 'copyfight_ajax',
                    typeface: $('#copyfight_typeface').val()
                },
                success: function(response) {
                    if (response.length) {
                        $('#copyfight_typeface_info_link').attr('title', $('#copyfight_typeface option:selected').text());
                        $('#copyfight_typeface_info').html(response);
                        $('.copyfight_typeface_info').show();
                    }
                    $('#copyfight_typeface_info_loader').hide();
                }
            });
        }
    });

    /* Subscription plans */

    $('#free_plan').click(function() {
        $('input[name*="cmd"]').val('_donations');
        $('#free_plan').val('Free plan');
        $('#subscription_plan').submit();
    });
    $('#premium_plan').click(function() {
        $('input[name*="cmd"]').val('_s-xclick');
        $('#selected_plan').val('Premium plan');
        $('#subscription_plan').submit();
    });
    $('#business_plan').click(function() {
        $('input[name*="cmd"]').val('_s-xclick');
        $('#selected_plan').val('Business plan');
        $('#subscription_plan').submit();
    });
    $('#enterprise_plan').click(function() {
        $('input[name*="cmd"]').val('_s-xclick');
        $('#selected_plan').val('Enterprise plan');
        $('#subscription_plan').submit();
    });

});
