/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function () {
    $.get("/Savvy0.2/UserServlet?type=retrieveUser",
            function (responseJson) {
                var strings = responseJson.split(",");
                var htmlcode = "";
                if (responseJson) {

                    var count = 1;
                    htmlcode += "<tr>";
                    htmlcode += "<th>Username<\/th>";
                    htmlcode += "<th>Action<\/th>";
                    htmlcode += "<\/tr>";
                    for (var i = 0; i < strings.length; i += 5) {
                        htmlcode += "<tr class='record' id='" + count + "'>";
                        htmlcode += "<td class='username' id='username" + count + "'>" + strings[i + 2] + "<\/td>";
                        htmlcode += "<td><button id='viewtwelvemonths' type='button' class='btn btn-info' name='" + count + "'>Next 12 Months<\/button><\/td>";
                        count++;
                        htmlcode += "<\/tr>";
                    }
                    htmlcode += "<\/select>";
                    $("#trans_table").html(htmlcode);
                }
            });

    $("table").on('click', '#viewtwelvemonths', function () {
        var view = $(this).attr("name");
        var username = $("#username" + view).text();
        var data = {
            username: username,
            type: "forecastAgentTwelveMonths"
        }

        $.ajax({
            type: "POST",
            url: "/Savvy0.2/ForecastServlet",
            datatype: 'json',
            data: data,
            success: function (responseJson) {

                var strings = responseJson.split(",");
                ctx = document.getElementById('myChart').getContext('2d');
                myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: [strings[0], strings[1], strings[2], strings[3], strings[4], strings[5], strings[6], strings[7], strings[8], strings[9], strings[10], strings[11]],
                        datasets: [{
                                label: 'Current Sales',
                                data: [strings[12], strings[13], strings[14], strings[15], strings[16], strings[17], strings[18], strings[19], strings[20], strings[21], strings[22], strings[23]],
                                backgroundColor: "rgba(153,255,51,0.4)"
                            }]
                    }
                });

            },
            error: function (xhr, status, error) {
                alert(error);
            }

        });
    });

});




function showSuccessModal(successMessage) {
    document.getElementById("successMsg").innerHTML = successMessage;
    $('#successModal').modal('show');

    setTimeout(function () {
        $("#user_create").click(); //Delay the refresh to show the success message before refreshing
    }, 2500);

}

function showErrorModal(errorMessage) {
    document.getElementById("errorMsg").innerHTML = errorMessage;
    $('#errorModal').modal('show');
}






