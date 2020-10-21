$(function (){
    var finalScore, level, cpLevel;
    var scores = [];
    var totalWeight = 0;
    var table = '';

    //unit headings
    unitHeadings = "<thead><tr class='row-header'><th width='10%'> </th> <th width='20%'>Unit #:</th> <th width='30%'>Unit code:</th> <th width='30%'>Mark:</th> <th width='10%'>Credit points:</th></thead></tr><tbody id>";
    
    //a new row html
    row = "<tr class='unit-row'><td><button class='delete-line'> - </button></td><td id=unit> </td><td> <input type='text' class='unit_code' placeholder='Optional' size='7'> </td> <td> <input type='number' class='mark' placeholder='e.g. 65' size='3'></td> <td> <select name='credit_points'> <option value='6'>6</option> <option value='12'>12</option> <option value='18'>18</option> <option value='24'>24</option></select></td></tr>"
    
    //adds 8 rows to start
    table += unitHeadings;
        for (var i = 0; i < 8; i++) {
            table += row;
        }

    //creation of table conents
    $('<table id=myTable>' + table + '</tbody></table>').appendTo('#tableArea');
    updateRowNumber();

    //adding new unit
    $("#new-unit").on('click', function(){
        $('#myTable tbody:last').append(row);
        updateRowNumber();
        
    })
    
    //deleting unit
    $(document).on('click', '.delete-line', function(){
        $(this).parents('tr').remove();
        updateRowNumber();
        calculate();
    })

    //autoupdate
    $('#myTable').on('change paste keyup', 'input, select',function() {
        calculate();
    })

    //updates the unit number list
    function updateRowNumber(){
        $(".unit-row").each(function (i){
           $(this).find('#unit').html(i+1 + ".");
        });
    }

    //clear all
    $("#clear-all").on('click', function(){
         $('#myTable input').each(function () {
            $(this).val("");
             x=1;
         });
            $('#myTable input').first().focus(); 
        
    })
    
    //calculate
    function calculate(){
        $('#myTable tbody').find('tr').each(function (){
            var unitCode = $(this).find("td:eq(2) input[type='text']").val();
            var mark = $(this).find("td:eq(3) input[type='number']").val();
            var cPoints = $(this).find("td:eq(4) select[name=credit_points]").val();
            
            var unitScore;
            
            //FIT3002 is 3rd Year level and FIT1002 is 1st year level
            if(unitCode.charAt(3) == 1){
                level = 0.5;
            }
            else if(unitCode.charAt(3) == (2||3) ){
                level = 1;
            }
            else{
                level = 0;
            }
                
            
            cpLevel = cPoints/6;
            unitScore = mark * level * cpLevel;
            
            if(unitScore !== 0){
                totalWeight += (level*cpLevel);
                scores.push(unitScore);
            }
        })
    
        var total = 0;
        for(var i = 0; i < scores.length; i++) {
            total += scores[i];
        }
        var finalScore = (total / totalWeight).toFixed(2) || 0;
            $('#calculated_WAM').html(getNum(finalScore));
        
        //makes sure it doesnt show NaN
        function getNum(val) {
            if (isNaN(val)) {
                return 0;
            }
            return val;
        }
        
        //reset values
        totalWeight = 0;
        scores = [];
    }


    
  
})