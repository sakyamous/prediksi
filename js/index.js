

$(".placed").css('display', 'none', '!important')
$(".not-placed").css('display', 'none', '!important')


function predictClicked(e) {

    let loading = document.getElementById("loading");
    let secondary = $('#LuasLahan').val();
    let seniorSecondary = $('#JumlahBibit').val();
    let college = $('#JumlahPakan').val();
    $(".placed").css('display', 'none', '!important')
    $(".not-placed").css('display', 'none', '!important')

    if (secondary == "" || college == "" || seniorSecondary == "") {
        $("#emptyAlert").css("display", 'block');
        setTimeout(() => {
            $("#emptyAlert").css("display", 'none');
        }, 2000);
        return;
    }

    if (Number(secondary) > 100 || Number(seniorSecondary) > 100 || Number(college) > 100) {
        $("#valuesAlert").css("display", 'block');
        setTimeout(() => {
            $("#valuesAlert").css("display", 'none');
        }, 2000);
        return;
    }
    $(loading).show();
    $('#nosel').hide();

    let obj = {
        "secondary": secondary,
        "college": college,
        "seniorSecondary": seniorSecondary
    }
    obj = JSON.stringify(obj);

    $.post('http://127.0.0.1:50/predict', obj, (json) => {
        console.log(json)
        let data = JSON.parse(json)
        let ans = data[1]
        if (ans == '1') {
            $(loading).hide();
            console.log(" Placed ")
            $(".result-div").css('background-image', `url('./images/congobg.webp')`)
            $(".result-div").css('background-repeat', `no-repeat`)
            $(".placed").css('display', 'block', '!important')


        } else {
            console.log("Not placed ")
            $(".result-div").css('background-image', `url('./images/congobg.webp')`)
            $(".result-div").css('background-repeat', `no-repeat`)
            $(".not-placed").css('display', 'block', '!important')
            $(loading).hide();

        }
    })

}

