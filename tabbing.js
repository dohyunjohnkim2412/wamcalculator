$(function(){
    //showing panels
    $('.menu .menu_list li').on('click', function(){
        $('.menu .menu_list li.active').removeClass('active');
        $(this).addClass('active');
        
        
        //figure out which panel to show
        var panelToShow = $(this).attr('rel');
        
        
        //hide current panel
        $('.panel.active').toggle(1, showNextPanel); 
           
        
        //show next panel
        function showNextPanel(){
            $(this).removeClass('active');
        
            $('#' + panelToShow).toggle(1, function(){
                $(this).addClass('active');
            });
        };      
        
    });
 
});