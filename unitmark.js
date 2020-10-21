$(function (){
    var tableNumber = 1;

        //HTML for Assignment Calculator
        //unit table headings
        unitRow = "<tr class='row-header'> <td> <input type='text' class='unit-name' placeholder='Unit code:'> </input></td> <td></td> <td> <button class='delete-unit'> x </button></td> </tr>";

        //unit table Calculated row
        resultRow = "<tr class = 'calculate-row'> <td> <h5 class='' > Your final result is:  </h5> </td> <td> <h1' class='result'> __________ </h1> </td> <td> <button class='calculate'> Calculate </button></td> </tr>";

        //unit table edit line
        editLine = "<td> <button class='new-assignment-line'> + </button> <button class='delete-assignment-line'> - </button> </td> <td> </td> <td> </td>";

        //unit table assignment row
        assignmentRow = "<tr class='ass-row'><td><input type='text' class='assessment' placeholder='Assessment name:'> </input></td><td><input type='number' class='weight' placeholder='Weight %' min='0' max='100'> </input></td><td><input type='number' class='score' placeholder='Score %' min='0' max='100'></input></td></tr>";

    //Assignment calculator
    $('#new-table').click(function () {
        var unitTable = '';


        //specifies how many lines of assignments & adds lines into the unitTable
        unitTable += unitRow;
            for (var i = 0; i < 4; i++) {
                unitTable += assignmentRow;
            }
        unitTable += editLine;
        unitTable += resultRow;

        //creation of unitTable table contents
        $('<table id=unitTable' + tableNumber + ' class=unitTableC >' + unitTable + '</table>').appendTo('#tableArea2')
        tableNumber++;
    })

    //specifies how many tables there are in the panel2
    for (var i = 0; i < 2; i++) {
        $("#new-table").trigger("click");
    }
    
    
    //add row
    $("#tableArea2").on("click", ".new-assignment-line", function (event) {
        tableElement = $(this).parent().parent().parent().parent();
            // $(row).insertBefore("#table1 .calculate-row");
            $(assignmentRow).insertAfter((tableElement.find('.ass-row:last')))
        
    })
    
    //delete row
    $("#tableArea2").on("click", ".delete-assignment-line", function (event) {
            tableElement = $(this).parent().parent().parent().parent();
            var junk = $(tableElement.find('tr:last')).prev().prev()
            
            //3 lines must exist: unitcode, edit, result
            if ($(tableElement.find('tr')).length > 3) {
                junk.remove();
            }
        })

    //delete table
    $("#tableArea2").on("click", ".delete-unit", function (event) {
            tableElement = $(this).parent().parent().parent().parent();
            tableElement.remove();
    })
    
    //calculate
    $("#tableArea2").on("click", ".calculate", function (event) {
            tableElement = $(this).parent().parent().parent().parent();
            var weight = new Array()
            var score = new Array()
            var result = 0
            //create an array with the weightage
            $(tableElement.find('.weight')).each(function () {
                weight.push($(this).val())
            })
            //create an array with the scores
            $(tableElement.find('.score')).each(function () {
                score.push($(this).val())
            })
            //calculate results totals
            $(tableElement.find('.score')).each(function (index) {
                result += ((weight[index] / 100) * score[index])
            })
            //$('assessment-row').appendTo('body');
            $($(tableElement.find('.result'))).html(result + '%')

            if (result > 100 || result < 0) {
                $($(tableElement.find('.result'))).css({
                    "color": 'red'
                });

            }
        })
    
    //autocalculate
    
    
    
    
    
    
});