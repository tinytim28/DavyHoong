/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {

    //==============start toggle visibility of modals========================================
    $("#showUpdateUserModal").on("hide", function() {    // remove the event listeners when the dialog is dismissed
        $("#showUpdateUserModal a.btn").off("click");
    });
    $("#showUpdateUserModal").on("hidden", function() {  // remove the actual elements from the DOM when fully hidden
        $("#showUpdateUserModal").remove();
    });

    function showSuccessModal(successMessage) {
        $('#errorModal').modal('hide');
        document.getElementById("successMsg").innerHTML = successMessage;
        $('#successModal').modal('show');
    }

    // for error messages
    function showErrorModal(errorMessage) {
        document.getElementById("errorMsg").innerHTML = errorMessage;
        $('#errorModal').modal('show');
    }

    function showUpdateProductModal() {
        $('#showUpdateProductModal').modal('show');
    }

    $("#CloseSuccess").click(function() {
        $('#errorModal').modal('hide');
    });


    function search() {
        var counter = 0;

        var bankNameSearch = $("#bankNameSearch").val();
        var productNameSearch = $("#productNameSearch").val();

        if(bankNameSearch != null)    {
            bankNameSearch = $("#bankNameSearch").val().trim().toLowerCase();
        }
        
        if(productNameSearch != null)    {
            productNameSearch = $("#productNameSearch").val().trim().toLowerCase();
        }

        // get text based on value
        bankNameSearch = $("#bankNameSearch option[value='" + bankNameSearch + "']").text().toLowerCase();
        productNameSearch = $("#productNameSearch option[value='" + productNameSearch + "']").text().toLowerCase();

        //alert(bankNameSearch);
        //alert(productNameSearch);

        $.each($(".record"), function(i) {
            var bankName = $(this).children(".bank_name").text().toLowerCase();
            var productName = $(this).children(".product_name").text().toLowerCase();

            if (productName == productNameSearch && bankName == bankNameSearch) {
                $(this).show();
                counter++;
            } else {
                $(this).hide();
            }
        });

        $("#recordsLength").text(counter);
    }

    // activate search function
    $("#productNameSearch, #bankNameSearch").on("change", function() {
        search();
    });

    // product options
    $.getJSON("/WebApp/ProductServlet?type=getProductNames", function(data) {
        var htmlCode = "";
        $.each(data, function(i) {
            var productId = data[i]["product_id"];
            var product_name = data[i]["product_name"];
            htmlCode += "<option value='" + productId + "'>" + product_name + "</option>";
        });

        $("#productNameSearch, #product_nameUpdate").append(htmlCode);
    });

    // bank options
    $.getJSON("/WebApp/ProductServlet?type=getBankNames", function(data) {
        //prompt(data, data);            
        var htmlCode = "";
        $.each(data, function(i) {
            var bank_id = data[i]["bank_id"];
            var bank_name = data[i]["bank_name"];
            htmlCode += "<option value='" + bank_id + "'>" + bank_name + "</option>";
        });

        $("#bankNameSearch, #bank_nameUpdate").append(htmlCode);
    });

    //==============end toggle visibility of modals=========================================
    //=================to load/reload records=================================================
    $("#trans_table").on('click', '.edit', function() {
        showUpdateProductModal();

        var edit = $(this).attr("name");

        var bank_name = $("#bank_name" + edit).text();
        var product_name = $("#product_name" + edit).text();
        var interest_rate = $("#interest_rate" + edit).text();
        var penalty_rate = $("#penalty_rate" + edit).text();
        var min_opening_balance = $("#min_opening_balance" + edit).text();
        var max_ltv_ratio = $("#max_ltv_ratio" + edit).text();
        var repayment_penalty_threshold = $("#repayment_penalty_threshold" + edit).text();
        var term = $("#term" + edit).text();

        // assign dropdown list values based on bank name and product name            
        $("#bank_nameUpdate option").each(function() {
            if ($(this).text() == bank_name) {
                $(this).attr('selected', 'selected');
            }
        });

        $("#product_nameUpdate option").each(function() {
            if ($(this).text() == product_name) {
                $(this).attr('selected', 'selected');
            }
        });

        $("#interest_rateUpdate").val(interest_rate);
        $("#penalty_rateUpdate").val(penalty_rate);
        $("#min_opening_balanceUpdate").val(min_opening_balance);
        $("#max_ltv_ratioUpdate").val(max_ltv_ratio);
        $("#repayment_penalty_thresholdUpdate").val(repayment_penalty_threshold);
        $("#termUpdate").val(term);

        $("#updateButton").attr("name", edit);

    });
    
    // when update button is clicked
    $("#updateButton").click(function() {
        $("#showUpdateProductModal").modal('hide');

        var edit = $(this).attr("name");
        var bank_nameOriginal = $("#bank_name" + edit).text();
        var bank_idOriginal = null;

        $("#bank_nameUpdate option").each(function() {
            if ($(this).text().trim() == bank_nameOriginal) {
                bank_idOriginal = $(this).val().trim();
            }
        });

        var product_nameOriginal = $("#product_name" + edit).text();
        var product_idOriginal = null;

        $("#product_nameUpdate option").each(function() {
            if ($(this).text().trim() == product_nameOriginal) {
                product_idOriginal = $(this).val().trim();
            }
        });

        var interest_rateOriginal = $("#interest_rate" + edit).text();
        var penalty_rateOriginal = $("#penalty_rate" + edit).text();
        var min_opening_balanceOriginal = $("#min_opening_balance" + edit).text();
        var max_ltv_ratioOriginal = $("#max_ltv_ratio" + edit).text();
        var repayment_penalty_thresholdOriginal = $("#repayment_penalty_threshold" + edit).text();
        var termOriginal = $("#term" + edit).text();

        var bank_id = $("#bank_nameUpdate").val();
        var bank_name = null;

        $("#bank_nameUpdate option").each(function() {
            if ($(this).val().trim() == bank_id) {
                bank_name = $(this).text().trim();
            }
        });

        var product_id = $("#product_nameUpdate").val();
        var product_name = null;

        $("#product_nameUpdate option").each(function() {
            if ($(this).val().trim() == product_id) {
                product_name = $(this).text().trim();
            }
        });

        var interest_rate = $("#interest_rateUpdate").val().trim();
        var penalty_rate = $("#penalty_rateUpdate").val().trim();
        var min_opening_balance = $("#min_opening_balanceUpdate").val().trim();
        var max_ltv_ratio = $("#max_ltv_ratioUpdate").val().trim();
        var repayment_penalty_threshold = $("#repayment_penalty_thresholdUpdate").val().trim();
        var term = $("#termUpdate").val().trim();


        // data validations here
        if (interest_rate == "" | penalty_rate == "" | min_opening_balance == "" | max_ltv_ratio == "" | repayment_penalty_threshold == "" | term == "") {
            showErrorModal("Required fields cannot be blank!");
        } else if (!isNaN(interest_rate) & !isNaN(penalty_rate) & !isNaN(min_opening_balance) & !isNaN(max_ltv_ratio) & !isNaN(repayment_penalty_threshold) & !isNaN(term)) {
            // send json to servlet
            var parameters = {
                bankIdOriginal: bank_idOriginal,
                productIdOriginal: product_idOriginal,
                productNameOriginal: product_nameOriginal,
                interestRateOriginal: interest_rateOriginal,
                penaltyRateOriginal: penalty_rateOriginal,
                minOpeningBalanceOriginal: min_opening_balanceOriginal,
                maxLtvRatioOriginal: max_ltv_ratioOriginal,
                repaymentPenaltyThresholdOriginal: repayment_penalty_thresholdOriginal,
                termOriginal: termOriginal,

                bankId: bank_id,
                productId: product_id,
                productName: product_name,
                interestRate: interest_rate,
                penaltyRate: penalty_rate,
                minOpeningBalance: min_opening_balance,
                maxLtvRatio: max_ltv_ratio,
                repaymentPenaltyThreshold: repayment_penalty_threshold,
                term: term,
                type: "update"
            };

            //console.log(parameters);

            //alert(JSON.stringify(parameters));

            $.ajax({
                type: "POST",
                url: "/WebApp/ProductServlet",
                data: parameters,
                success: function(data) {
                    if (data.trim() == "Successfully updated record!") {
                        showSuccessModal(data);
                    } else {
                        showErrorModal(data.trim());
                    }

                    refresh();
                }
            });
        } else {
            showErrorModal("Invalid fields!");
        }
    });
    
    function refresh() {
        // for update of service endpoint details
        // show update modal and map values together

        var userType = $("#userType").val().trim();

        $.getJSON("/WebApp/ProductServlet?type=read", function(data) {
            $("#recordsLength").text(data.length);

            var htmlcode = "";
            htmlcode += "<tr>";
            htmlcode += "<th>Bank Name</th>";
            htmlcode += "<th>Product Name</th>";
            htmlcode += "<th>Interest Rate</th>";
            htmlcode += "<th>Penalty Rate</th>";
            htmlcode += "<th>Min Opening Balance</th>";
            htmlcode += "<th>Max LTV Ratio</th>";
            htmlcode += "<th>Repayment Penalty Threshold</th>";
            htmlcode += "<th>Term</th>";

            if (userType != "Guest") {
                htmlcode += "<th class='action'>Action</th>";
            }
            htmlcode += "</tr>";

            $.each(data, function(count, v) {
                var bank_name = v["bank_name"];
                var product_name = v["product_name"];
                var interest_rate = v["interest_rate"];
                var penalty_rate = v["penalty_rate"];
                var min_opening_balance = v["min_opening_balance"];
                var max_ltv_ratio = v["max_ltv_ratio"];
                var repayment_penalty_threshold = v["repayment_penalty_threshold"];
                var term = v["term"];

                htmlcode += "<tr class='record'>";
                htmlcode += "<td id='bank_name" + count + "' class='bank_name'>" + bank_name + "</td>";
                htmlcode += "<td id='product_name" + count + "' class='product_name'>" + product_name + "</td>";
                htmlcode += "<td id='interest_rate" + count + "'>" + interest_rate + "</td>";
                htmlcode += "<td id='penalty_rate" + count + "'>" + penalty_rate + "</td>";
                htmlcode += "<td id='min_opening_balance" + count + "'>" + min_opening_balance + "</td>";
                htmlcode += "<td id='max_ltv_ratio" + count + "'>" + max_ltv_ratio + "</td>";
                htmlcode += "<td id='repayment_penalty_threshold" + count + "'>" + repayment_penalty_threshold + "</td>";
                htmlcode += "<td id='term" + count + "'>" + term + "</td>";

                if (userType != "Guest") {
                    htmlcode += "<td><button type='button' class='btn btn-xs btn-primary edit' name='" + count + "'><span class='glyphicon glyphicon-pencil' aria-hidden='true'></span> Edit</button></td>";
                }

                htmlcode += "</tr>";
            });

            if (data.length == 0) {
                htmlcode += "<tr><td align='center' colspan='10'>No records found</td></tr>";
            }
            $("#trans_table_main").show();
            $("#trans_table").html(htmlcode);
            
            search();
        });

        search();
    }
    
    refresh();

}); // end document ready