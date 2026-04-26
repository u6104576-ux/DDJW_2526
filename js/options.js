import {$} from "../library/jquery-4.0.0.slim.module.min.js";

var options = function(){
    const default_options = {
        selection: 2,
        difficulty: 'normal',
		mode: 'normal'
    }; 

    var selection = $('#select');
    var difficulty = $('#dif');
    var mode = $('#mode');

    var savedOptions = JSON.parse(localStorage.getItem('options')) || {};
	var groupSize = savedOptions.selection || 2;
	
    var options = {
		selection: savedOptions.selection || default_options.selection,
		difficulty: savedOptions.difficulty || default_options.difficulty,
		mode: savedOptions.mode || default_options.mode
	};
	
	selection.val(options.selection.toString());
	difficulty.val(options.difficulty);
	mode.val(options.mode);

    selection.on('change', function (){
        options.selection = parseInt(selection.val());
    });

    difficulty.on('change', function (){
        options.difficulty = difficulty.val();
    });
	
	mode.on('change', function (){
		options.mode = mode.val();
	});

    return {
        applyChanges: function(){
            localStorage.options = JSON.stringify(options);
        },
        defaultValues: function(){
            options = {...default_options};
			selection.val(options.selection.toString());
			difficulty.val(options.difficulty);
			mode.val(options.mode);
        }
    }
}();

$('#default').on('click', function(){
    options.defaultValues();
});

$('#apply').on('click', function(){
    options.applyChanges();
    location.assign("../");
});
	
$('#exit').on('click', function(){
	location.assign("../");
});