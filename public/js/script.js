$(document).ready(function() {
//console.log($("#abcd0").attr('id'));
/*	for(var i=0; i<100; i++){
	console.log($("#abcd"+i).attr('name')+" "+$("#abcd"+i).attr('age'));
	$("#abcd"+i).click(function(){
		$.post("/dbdelete",
		{
			name: $("#abcd"+i).attr('name'), 
			age: $("#abcd"+i).attr('age')
		}
	
		)
	});
	}*/

	$("button").click(function(){
		console.log($(this).attr('name')+"post");
		$.post("/dbdelete",
		{
			name: $(this).attr('name'),
			age: $(this).attr('age')
		});
		location.reload();
	});
	
});
