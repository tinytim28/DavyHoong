/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function() {

  refresh(); // by default

});


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
    htmlcode += "<\/tr>";

    var count = 1;
    for (var i = 0; i < strings.length; i += 6) {
      agentName = strings[i];
      htmlcode += "<tr class='record' id='" + count + "'>";
      htmlcode += "<td class='agentName' id='agentName" + count + "'>" + strings[i] + "<\/td>";
      htmlcode += "<td class='dateOpen' id='dateOpen" + count + "'>" + strings[i + 1] + "<\/td>";
      htmlcode += "<td class='appointments' id='appointments" + count + "'>" + strings[i + 2] + "<\/td>";
      htmlcode += "<td class='customerName' id='customerName" + count + "'>" + strings[i + 3] + "<\/td>";
      htmlcode += "<td class='caseType' id='caseType" + count + "'>" + strings[i + 4] + "<\/td>";
      htmlcode += "<td class='expectedFYC' id='expectedFYC" + count + "'>" + strings[i + 5] + "<\/td>";
      htmlcode += "<td class='remarks' id='remarks" + count + "'>" + strings[i + 6] + "<\/td>";

      htmlcode += "<\/tr>";
      count++;
    }
    htmlcode += "<\/select>";
    $("#trans_table").html(htmlcode);
  });
}



