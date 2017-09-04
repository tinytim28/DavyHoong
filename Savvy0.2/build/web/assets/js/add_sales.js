/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {

  $("#AddSales").click(function() {
    $("#AddNewSale").modal("show");
  });


  $('#dateOpen').on('input', function() {
    document.getElementById("createButton").disabled = false;
  });

  $('#appointments').on('input', function() {
    document.getElementById("createButton").disabled = false;
  });

  $('#customerName').on('input', function() {
    document.getElementById("createButton").disabled = false;
  });

  $('#caseType').on('input', function() {
    document.getElementById("createButton").disabled = false;
  });
  
  $('#expectedFYC').on('input', function() {
    document.getElementById("createButton").disabled = false;
  });
  
  $('#remarks').on('input', function() {
    document.getElementById("createButton").disabled = false;
  });
  
  
  $('#createButton').on('click', function(){
    var dateOpen = document.getElementById("dateOpen").value;
    var appointments = document.getElementById("appointments").value;
    var customerName = document.getElementById("customerName").value;
    var caseType = document.getElementById("caseType").value;
    var expectedFYC = document.getElementById("expectedFYC").value;
    var remarks = document.getElementById("remarks").value;


      var data = {
        dateOpen: dateOpen,
        appointments: appointments,
        customerName: customerName,
        caseType: caseType,
        remarks: remarks,
        expectedFYC: expectedFYC,
        type: "create"
      };

      $.ajax({
        url: '/Savvy/SalesServlet',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function(data) {
          if (data.success) {
            //document.getElementById("newSale").reset();
            $("#trans_table").html("");
            refresh();
            showSuccessModal("New sale has been created successfully.");
          } else {
            showErrorModal("Creation Failed.");
          }
        },
        error: function(xhr, status, error) {
           alert(xhr.error);
        }
      });

  });

    
  refresh(); // by default

  $("table").on('click', '#DeleteSale', function() {
    var del = $(this).attr("name");
    $("#myModal").modal({ // wire up the actual modal functionality and show the dialog
      "backdrop": "static",
      "keyboard": true,
      "show": true // ensure the modal is shown immediately
    });
    $("#myModal #cfmDelete").on("click", function(e) {
      $("#myModal").modal('hide'); // dismiss the dialog

      var customerName = $("#customerName" + del).text();
      var caseType = $("#caseType" + del).text();
      // set request parameters
      var parameters = {
        customerName: customerName,
        caseType: caseType
      };

      parameters = JSON.stringify(parameters);

      // send json to servlet
      $.ajax({
        type: "POST",
        url: "/Savvy/SalesServlet?type=deleteSale",
        contentType: "application/json",
        dataType: "json",
        data: parameters
      });

      
      $("#trans_table").html("");
      showSuccessModal("Successfully delete sale!");
      refresh();
      
    });
    
  });

});

function showSuccessModal(successMessage) {
  document.getElementById("successMsg").innerHTML = successMessage;
  $('#successModal').modal('show');

  setTimeout(function() {
    $("#user_create").click(); //Delay the refresh to show the success message before refreshing
  }, 2500);

}

function showErrorModal(errorMessage) {
  document.getElementById("errorMsg").innerHTML = errorMessage;
  $('#errorModal').modal('show');
}

function refresh() {
  $.get("/Savvy/SalesServlet?type=retrieveAllByAgent",  {
    "_": $.now()
  }, 
    
    function(responseJson) {
    var strings = responseJson.split(",");
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
    $("#trans_table").html(htmlcode);
  });
}

function showUpdateUserModal() {
  $('#showUpdateUserModal').modal('show');
}

