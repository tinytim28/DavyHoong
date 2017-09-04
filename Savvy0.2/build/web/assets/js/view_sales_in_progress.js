/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {

  $("#showUpdateUserModal").on("hide", function() { // remove the event listeners when the dialog is dismissed
    $("#showUpdateUserModal a.btn").off("click");
  });

  $("#showUpdateUserModal").on("hidden", function() { // remove the actual elements from the DOM when fully hidden
    $("#showUpdateUserModal").remove();
  });
  
  $("table").on('click', '#viewusersales', function() {      
    showUpdateUserModal();  
    var view = $(this).attr("name");
    $("#myModal").modal({ // wire up the actual modal functionality and show the dialog
      "backdrop": "static",
      "keyboard": true,
      "show": true // ensure the modal is shown immediately
    });
    
      $("#myModal").modal('hide'); // dismiss the dialog

      var agentName = $("#agentName" + view).text();
      
      var parameters = {
        agentName: agentName
      };
      parameters = JSON.stringify(parameters);
      
      $.ajax({
        type: "GET",
        url: "/Savvy/SalesServlet?type=adminRetrieveSales",
        contentType: "application/json",
        dataType: "json",
        data: parameters
      },function(responseJson) {
        var strings = responseJson.split(",");
        alert(responseJson);
        var htmlcode = "";
    
            htmlcode += "<tr>";
            htmlcode += "<th>Agent Name<\/th>";
            htmlcode += "<th>Date Opened<\/th>";
            htmlcode += "<th>Appointments<\/th>";
            htmlcode += "<th>Customer Name<\/th>";
            htmlcode += "<th>Case Type<\/th>";
            htmlcode += "<th>Expected FYC<\/th>";
            htmlcode += "<th>Remarks<\/th>";
            htmlcode += "<th>Action<\/th>";
            htmlcode += "<\/tr>";

            var count = 1;
            for (var i = 0; i < strings.length; i += 7) {
              agentName = strings[i];
              htmlcode += "<tr class='record' id='" + count + "'>";
              htmlcode += "<td class='agentName' id='agentName" + count + "'>" + strings[i] + "<\/td>";
              htmlcode += "<td class='dateOpen' id='dateOpen" + count + "'>" + strings[i + 1] + "<\/td>";
              htmlcode += "<td class='appointments' id='appointments" + count + "'>" + strings[i + 2] + "<\/td>";
              htmlcode += "<td class='customerName' id='customerName" + count + "'>" + strings[i + 3] + "<\/td>";
              htmlcode += "<td class='caseType' id='caseType" + count + "'>" + strings[i + 4] + "<\/td>";
              htmlcode += "<td class='expectedFYC' id='expectedFYC" + count + "'>" + strings[i + 5] + "<\/td>";
              htmlcode += "<td class='remarks' id='remarks" + count + "'>" + strings[i + 6] + "<\/td>";
              htmlcode += "<td> <button id='DeleteSale' type='button' class='btn btn-xs btn-danger' name='" + count + "'><span class='glyphicon glyphicon-trash' aria-hidden='true'><\/span> Delete<\/button><\/td>";

              htmlcode += "<\/tr>";
              count++;
            }
            htmlcode += "<\/select>";
            $("#trans_view").html(htmlcode);
            showUpdateUserModal();
          }
      
     );
    
    
  });
  
  refresh(); // by default

});


function refresh() {
  $.get("/Savvy/UserServlet?type=retrieveUser", {
    "_": $.now()
  }, function(responseJson) {
    //alert(responseJson);
    var strings = responseJson.split(",");
    var htmlcode = "";

    htmlcode += "<tr>";
    htmlcode += "<th>Username<\/th>";
    htmlcode += "<th>First Name<\/th>";
    htmlcode += "<th>Last Name<\/th>";
    htmlcode += "<th>User Type<\/th>";
    htmlcode += "<th>Action<\/th>";
    htmlcode += "<\/tr>";

    var count = 1;
    for (var i = 0; i < strings.length; i += 4) {
      htmlcode += "<tr class='record' id='" + count + "'>";
      htmlcode += "<td class='username' id='username" + count + "'>" + strings[i] + "<\/td>";
      htmlcode += "<td class='firstname' id='firstname" + count + "'>" + strings[i + 1] + "<\/td>";
      htmlcode += "<td class='lastname' id='lastname" + count + "'>" + strings[i + 2] + "<\/td>";
      htmlcode += "<td id='isAdmin" + count + "'>" + strings[i + 3] + "<\/td>";
      htmlcode += "<td><button id='viewusersales' type='button' class='btn btn-xs btn-primary' name='" + count + "'><span class='glyphicon glyphicon-eye-open' aria-hidden='true'><\/span> View<\/button><\/td>";

      htmlcode += "<\/tr>";
      count++;
    }
    htmlcode += "<\/select>";
    $("#trans_table").html(htmlcode);
  });
}

function search() {
  var counter = 0;
  var questionNameSearch = $('#usernameSearch').val().trim().toLowerCase();
  $.each($(".record"), function(i) {
    var question_name = $(this).children(".username").text().toLowerCase();
    var first_name = $(this).children(".firstname").text().toLowerCase();
    var last_name = $(this).children(".lastname").text().toLowerCase();
    if (question_name.indexOf(questionNameSearch) != -1 || first_name.indexOf(questionNameSearch) != -1 || last_name.indexOf(questionNameSearch) != -1) {
      $(this).show();
      counter++;
    } else {
      $(this).hide();
    }
  });
  //$("#recordsLength").text(counter);
}

function showUpdateUserModal() {
  $('#showUpdateUserModal').modal('show');
}