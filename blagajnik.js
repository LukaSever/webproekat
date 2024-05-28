$(function ()
{
    $('#lokacije').hide();
    $('#uloge').on('click',function ()
    {
        if($(this).val()==='blagajnik')
            $('#lokacije').show();
        else
            $('#lokacije').hide();
    });

    $('#snimanje').on('click', function(e)
    {
        e.preventDefault();


        var form = new FormData();
        form.append("name", $('#ime_prezime').val());
        form.append("email", $('#email').val());
        form.append("phone", $('#telefon').val());
        form.append("password", $('#lozinka').val());
        form.append("userRoleId", $('#uloge').val());
        form.append("locationId", $('#lokacije').val());
        form.append("apitoken", $('meta[name="apitoken"]').attr('content'));

        $.ajax
        ({
            "url": "https://vsis.mef.edu.rs/projekat/ulaznice/public_html/api/korisnik",
            "method": "POST",
            "timeout": 0,
            "headers":
                {
                "Accept": "application/json",
                "Authorization": "Bearer" + localStorage.getItem('token')
                },
            "processData": false,
            "mimeType": "multipart/form-data",
            "contentType": false,
            "data": form,
            "success": function (response)
            {
                if( $('#email').val().length > 0 )
                {
                    $('#registruj_se').css('outline','none');
                    $('#p_email').text('');
                }
                else
                {
                    $('#registruj_se').css('outline','solid 1px orange');
                    $('#p_email').text("Niste uneli email").css('color','orange');
                }
                console.log(response);
            },
            "error": function (response)
            {
                if (response.responseJSON !== undefined)
                    console.log(response.responseJSON.error);
            }
        });
    });
});