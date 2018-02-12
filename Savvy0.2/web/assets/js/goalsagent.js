/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//start of jquery
$(document).ready(function () {
    $("table").on('click', '#EditGoal', function () {
        showUpdateGoalModal();
        var edit = $(this).attr("name");
        //alert(edit);
        var tr = document.getElementById(edit);
        var tds = tr.getElementsByTagName("td");
        //alert(tds.length);
        for (var i = 0; i < tds.length; i++) {
            switch (i) {
                case 0:
                    var Q1update = $("#Q1" + edit).text();
                    $("#Q1update").val(Q1update);
                    break;
                case 1:
                    var Q2update = $("#Q2" + edit).text();
                    $("#Q2update").val(Q2update);
                    break;
                case 2:
                    var Q3update = $("#Q3" + edit).text();
                    $("#Q3update").val(Q3update);
                    break;
                case 3:
                    var Q4update = $("#Q4" + edit).text();
                    $("#Q4update").val(Q4update);
                    break;
            }
        }
    });

    $('#AddNewGoal').on('click', function () {
        $("#showCreateGoalModal").modal("show");
    });

    $('#CreateGoal').on('click', function () {
        var Q1new = document.getElementById("Q1new").value;
        var Q2new = document.getElementById("Q2new").value;
        var Q3new = document.getElementById("Q3new").value;
        var Q4new = document.getElementById("Q4new").value;


        if (document.getElementById("ErrorMessage") !== null) {
            var child = document.getElementById("ErrorMessage");
            parent.removeChild(child);
        }
        var data = {
            first: Q1new,
            second: Q2new,
            third: Q3new,
            fourth: Q4new,
            type: "setGoal"
        }

        $.ajax({
            url: '/Savvy0.2/GoalServlet',
            type: 'POST',
            dataType: 'json',
            data: data,
            success: function (data) {
                if (data.success) {
                    $("#trans_table").html("");
                    refresh();
                    showSuccessModal("Goal Set!");
                    hideCreateGoalModal();
                } else {
                    showErrorModal("Creation Failed.");
                }
            },
            error: function (xhr, status, error) {
                alert(data);
            }
        });

    })

    $("#updateGoal").click(function () {
        
        var Q1update = document.getElementById("Q1update").value;      
        var Q2update = document.getElementById("Q2update").value;
        var Q3update = document.getElementById("Q3update").value;
        var Q4update = document.getElementById("Q4update").value;
        var changeLeft = '1';
        // disable search button and clear table
        $("#showUpdateGoalModal").modal('hide');
        var data = {
            first: Q1update,
            second: Q2update,
            third: Q3update,
            fourth: Q4update,
            changeLeft: changeLeft,
            type: "changeGoals"
        }
        // send json to servlet
        $.ajax({
            type: "POST",
            url: "/Savvy0.2/GoalServlet",
            datatype: 'json',
            data: data,
            success: function (data) {
                refresh();
                showSuccessModal("Successfully updated goal!");


            },
            error: function (xhr, status, error) {
            }
        });



    });

    //end of edit/update goal
    refresh();


});
//end of jquery


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

function refresh() {
    $.get("/Savvy0.2/GoalServlet?type=viewOwnGoals", {
        "_": $.now()
    }, function (responseJson) {
        var strings = responseJson.split(",");
        var htmlcode = "";
        var htmlcode1 = "";
        if (responseJson) {
            document.getElementById("AddNewGoal").style.visibility = "hidden";
            htmlcode += "<tr>";
            htmlcode += "<th>Approval<\/th>";
            htmlcode += "<th>Action<\/th>";
            htmlcode += "<\/tr>";
            htmlcode1 += "<tr>";
            htmlcode1 += "<th>Q1<\/th>";
            htmlcode1 += "<th>Q2<\/th>";
            htmlcode1 += "<th>Q3<\/th>";
            htmlcode1 += "<th>Q4<\/th>";
            htmlcode1 += "<th>Current Total<\/th>";
            htmlcode1 += "<\/tr>";


            var count = 1;
            for (var i = 0; i < strings.length; i += 7) {
                htmlcode1 += "<tr class='record' id='" + count + "'>";
                htmlcode1 += "<td class='Q1' id='Q1" + count + "'>" + strings[i + 1] + "<\/td>";
                htmlcode1 += "<td class='Q2' id='Q2" + count + "'>" + strings[i + 2] + "<\/td>";
                htmlcode1 += "<td class='Q3' id='Q3" + count + "'>" + strings[i + 3] + "<\/td>";
                htmlcode1 += "<td class='Q4' id='Q4" + count + "'>" + strings[i + 4] + "<\/td>";
                htmlcode1 += "<td class='total' id='total" + count + "'>" + strings[i + 5] + "<\/td>";
                htmlcode1 += "<\/tr>";
                htmlcode += "<td class='approval' id='approval" + count + "'>" + strings[i + 6] + "<\/td>";
                if (strings[i + 6] === "Pending Approval") {
                    htmlcode += "<td><button id='EditGoal' disabled type='button' class='btn btn-xs btn-primary' name='" + count + "'><span class='glyphicon glyphicon-pencil' aria-hidden='true'><\/span> Edit<\/button><\/td>";
                } else {
                    htmlcode += "<td><button id='EditGoal' type='button' class='btn btn-xs btn-primary' name='" + count + "'><span class='glyphicon glyphicon-pencil' aria-hidden='true'><\/span> Edit<\/button><\/td>";
                }
                count++;
            }
            htmlcode += "<\/select>";
            $("#trans_table").html(htmlcode);
            $("#trans_table_2").html(htmlcode1);
            $.get("/Savvy0.2/GoalServlet?type=showCurrentQuarterlySales", {
                "_": $.now()
            }, function (responseJson) {
                var strings = responseJson.split(",");
                var htmlcode3 = "";
                var quarter = getQuarter();
                if (responseJson) {


                    htmlcode3 += "<tr>";
                    htmlcode3 += "<th class='currentQ1h'";
                    if (quarter === 2) {
                        htmlcode3 += "style='background-color:cyan;'";
                    }
                    htmlcode3 += "id='currentQ1h'>Q1<\/th>";

                    htmlcode3 += "<th class='currentQ2h'";
                    if (quarter === 3) {
                        htmlcode3 += "style='background-color:cyan;'";
                    }
                    htmlcode3 += "id='currentQ1h'>Q2<\/th>";

                    htmlcode3 += "<th class='currentQ3h'";
                    if (quarter === 4) {
                        htmlcode3 += "style='background-color:cyan;'";
                    }
                    htmlcode3 += "id='currentQ1h'>Q3<\/th>";

                    htmlcode3 += "<th class='currentQ4h'";
                    if (quarter === 1) {
                        htmlcode3 += "style='background-color:cyan;'";
                    }
                    htmlcode3 += "id='currentQ1h'>Q4<\/th>";

                    htmlcode3 += "<th>Current Total<\/th>";
                    htmlcode3 += "<\/tr>";

                    var count = 1;
                    for (var i = 0; i < strings.length; i += 4) {
                        htmlcode3 += "<tr class='record' id='" + count + "'>";
                        htmlcode3 += "<td class='currentQ1d'";
                        if (quarter === 2) {
                            htmlcode3 += "style='background-color:cyan;'";
                        }
                        htmlcode3 += " id='currentQ1d" + count + "'>" + strings[i] + "<\/td>";

                        htmlcode3 += "<td class='currentQ2d'";
                        if (quarter === 3) {
                            htmlcode3 += "style='background-color:cyan;'";
                        }
                        htmlcode3 += " id='currentQ2d" + count + "'>" + strings[i + 1] + "<\/td>";

                        htmlcode3 += "<td class='currentQ3d'";
                        if (quarter === 4) {
                            htmlcode3 += "style='background-color:cyan;'";
                        }
                        htmlcode3 += " id='currentQ3d" + count + "'>" + strings[i + 2] + "<\/td>";

                        htmlcode3 += "<td class='currentQ4d'";
                        if (quarter === 1) {
                            htmlcode3 += "style='background-color:cyan;'";
                        }
                        htmlcode3 += " id='currentQ4d" + count + "'>" + strings[i + 3] + "<\/td>";
                        var double = parseFloat(strings[i])+ parseFloat(strings[i+1]) + parseFloat(strings[i+2]) +parseFloat(strings[i+3]);
                        htmlcode3 += "<td class='currenttotal' id='currenttotal" + count + "'>" + double + "<\/td>";
                        htmlcode3 += "<\/tr>";
                        count++;
                    }


                    htmlcode3 += "<\/select>";
                    $("#trans_table_3").html(htmlcode3);
                }
            });
        } else {
            document.getElementById("AddNewGoal").style.visibility = "visible";
        }
    });



}

function showUpdateGoalModal() {
    $('#showUpdateGoalModal').modal('show');
}

function showCreateGoalModal() {
    $('#showCreateGoalModal').modal('show');
}

function hideCreateGoalModal() {
    $('#showCreateGoalModal').modal('hide');
}

function getQuarter(d) {
    d = d || new Date();
    var m = Math.floor(d.getMonth() / 3) + 2;
    return m > 4 ? m - 4 : m;
}

function showErrorModal(errorMessage) {
    document.getElementById("errorMsg").innerHTML = errorMessage;
    $('#errorModal').modal('show');
}


function showSuccessModal(successMessage) {
    document.getElementById("successMsg").innerHTML = successMessage;
    $('#successModal').modal('show');

    setTimeout(function () {
        $("#user_create").click(); //Delay the refresh to show the success message before refreshing
    }, 2500);

}
