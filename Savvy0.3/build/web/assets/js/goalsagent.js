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
                    var Q1_update = $("#Q1" + edit).text();
                    $("#Q1_update").val(Q1_update);
                    break;
                case 1:
                    var Q2_update = $("#Q2" + edit).text();
                    $("#Q2_update").val(Q2_update);
                    break;
                case 2:
                    var Q3_update = $("#Q3" + edit).text();
                    $("#Q3_update").val(Q3_update);
                    break;
                case 3:
                    var Q4_update = $("#Q4" + edit).text();
                    $("#Q4_update").val(Q4_update);
                    break;
            }
        }
    });
    
    $('#CreateGoal').on('click', function () {
        var Q1new = document.getElementById("Q1new").value;
        var Q2new = document.getElementById("Q2new").value;
        var Q3new = document.getElementById("Q2new").value;
        var Q4new = document.getElementById("Q2new").value;
  
        if (err === "") {
            if (document.getElementById("ErrorMessage") !== null) {
                var parent = document.getElementById("newUser");
                var child = document.getElementById("ErrorMessage");
                parent.removeChild(child);
            }
            var data = {
                Q1new: Q1new,
                Q2new: Q2new,
                Q3new: Q3new,
                Q4new: Q4new,
                type: "setGoal"
            }

            $.ajax({
                url: '/Savvy0.3/GoalServlet',
                type: 'POST',
                dataType: 'json',
                data: data,
                success: function (data) {
                    if (data.success) {
                        document.getElementById("newUser").reset();
                        $("#trans_table").html("");
                        refresh();
                        showSuccessModal("Goal Set!");
                    } else {
                        showErrorModal("Creation Failed.");
                    }
                },
                error: function (xhr, status, error) {
                    alert(data);
                }
            });
        } else {
            showErrorModal(err);
        }
    })
    
    $("#UpdateGoal").click(function () {
        var Q1 = document.getElementById("Q1_update").value;
        var Q2 = document.getElementById("Q2_update").value;
        var Q3 = document.getElementById("Q3_update").value;
        var Q4 = document.getElementById("Q4_update").value;
        var username = document.getElementById("username").value;
        var changeleft = document.getElementById("changeleft").value;
        // disable search button and clear table
        $("#showUpdateGoalModal").modal('hide');

        var data = {
            Q1: Q1,
            Q2: Q2,
            Q3: Q3,
            Q4: Q4,
            username : username,
            changeleft: changeleft,
            type: "changeGoals"
        }
        // send json to servlet
        $.ajax({
            type: "POST",
            url: "/Savvy0.3/GoalServlet",
            datatype: 'json',
            data: data,
            success: function (data) {
                refresh();
                showSuccessModal("Successfully updated goal!");


            },
            error: function (xhr, status, error) {
                alert(pName);
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
    $.get("/Savvy0.3/GoalServlet?type=viewOwnGoals", {
        "_": $.now()
    }, function (responseJson) {
        var strings = responseJson.split(",");
        var htmlcode = "";
        var htmlcode1 = "";
        if (responseJson) {
            htmlcode += "<tr>";
            htmlcode += "<th>Approval<\/th>";
            htmlcode += "<th>Changes Left<\/th>";
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
            for (var i = 0; i < strings.length; i += 8) {
                htmlcode1 += "<tr class='record' id='" + count + "'>";
                htmlcode1 += "<td class='Q1' id='Q1" + count + "'>" + strings[i + 1] + "<\/td>";
                htmlcode1 += "<td class='Q2' id='Q2" + count + "'>" + strings[i + 2] + "<\/td>";
                htmlcode1 += "<td class='Q3' id='Q3" + count + "'>" + strings[i + 3] + "<\/td>";
                htmlcode1 += "<td class='Q4' id='Q4" + count + "'>" + strings[i + 4] + "<\/td>";
                htmlcode1 += "<td class='total' id='total" + count + "'>" + strings[i + 5] + "<\/td>";
                htmlcode1 += "<\/tr>";
                htmlcode += "<td class='approval' id='aprroval" + count + "'>" + strings[i + 6] + "<\/td>";
                htmlcode += "<td class='changeleft' id='changeleft" + count + "'>" + strings[i + 7] + "<\/td>";
                if (strings[i + 6] === "Pending Approval" || strings[i + 7] === "0") {
                    htmlcode += "<td><button id='EditGoal' type='button' class='btn btn-xs btn-primary' name='" + count + "'><span class='glyphicon glyphicon-pencil' aria-hidden='true'><\/span> Edit<\/button><\/td>";
                } else {
                    htmlcode += "<td><button id='EditGoal' type='button' class='btn btn-xs btn-primary' name='" + count + "'><span class='glyphicon glyphicon-pencil' aria-hidden='true'><\/span> Edit<\/button><\/td>";
                }
                count++;
            }
            htmlcode += "<\/select>";
            $("#trans_table").html(htmlcode);
            $("#trans_table_2").html(htmlcode1);
            $.get("/Savvy0.3/GoalServlet?type=viewOwnGoals", {
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
                    for (var i = 0; i < strings.length; i += 8) {
                        htmlcode3 += "<tr class='record' id='" + count + "'>";
                        htmlcode3 += "<td class='currentQ1d'";
                        if (quarter === 2) {
                            htmlcode3 += "style='background-color:cyan;'";
                        }
                        htmlcode3 += " id='currentQ1d" + count + "'>" + strings[i + 1] + "<\/td>";

                        htmlcode3 += "<td class='currentQ2d'";
                        if (quarter === 3) {
                            htmlcode3 += "style='background-color:cyan;'";
                        }
                        htmlcode3 += " id='currentQ2d" + count + "'>" + strings[i + 2] + "<\/td>";

                        htmlcode3 += "<td class='currentQ3d'";
                        if (quarter === 4) {
                            htmlcode3 += "style='background-color:cyan;'";
                        }
                        htmlcode3 += " id='currentQ3d" + count + "'>" + strings[i + 3] + "<\/td>";

                        htmlcode3 += "<td class='currentQ4d'";
                        if (quarter === 1) {
                            htmlcode3 += "style='background-color:cyan;'";
                        }
                        htmlcode3 += " id='currentQ4d" + count + "'>" + strings[i + 4] + "<\/td>";

                        htmlcode3 += "<td class='currenttotal' id='currenttotal" + count + "'>" + strings[i + 5] + "<\/td>";
                        htmlcode3 += "<\/tr>";
                        count++;
                    }


                    htmlcode3 += "<\/select>";
                    $("#trans_table_3").html(htmlcode3);
                }
            });
        } else {
            htmlcode += "<form id='newGoal' name='newGoal'><th><h2>Goal Creation</h2></th><div>";
            htmlcode += "<div class='form-group'><label class='col-sm-1 control-label'>Q1 <font color='red'>*</font></label><div class='col-sm-1'><input class='form-control' id='Q1new' name='Q1new' type='number'></div></div>";
            htmlcode += "<div class='form-group'><label class='col-sm-1 control-label'>Q2 <font color='red'>*</font></label><div class='col-sm-1'><input class='form-control' id='Q2new' name='Q2new' type='number'></div></div>";
            htmlcode += "<div class='form-group'><label class='col-sm-1 control-label'>Q3 <font color='red'>*</font></label><div class='col-sm-1'><input class='form-control' id='Q3new' name='Q3new' type='number'></div></div>";
            htmlcode += "<div class='form-group'><label class='col-sm-1 control-label'>Q4 <font color='red'>*</font></label><div class='col-sm-1'><input class='form-control' id='Q4new' name='Q4new' type='number'></div></div>";
            htmlcode += "<div class='form-group'><label class='col-sm-1 control-label'><button class='btn btn-primary' id='CreateGoal' name='CreateGoal' type='button'>Create</button></div></div>";
            htmlcode += "</div></form>";
            $("#trans_table_2").html(htmlcode);
        }
    });



}

function showUpdateGoalModal() {
    $('#showUpdateGoalModal').modal('show');
}

function getQuarter(d) {
    d = d || new Date();
    var m = Math.floor(d.getMonth() / 3) + 2;
    return m > 4 ? m - 4 : m;
}

