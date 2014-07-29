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

	$(".deletebutton").click(function(){
		console.log($(this).attr('name')+"post");
		$.post("/dbdelete",
		{
			name: $(this).attr('name'),
			age: $(this).attr('age')
		});
		location.reload();
	});
	
	$(".updatebutton").click(function(){
		$.post("/dbupdate",
		{
			currentname: $(this).parent().siblings(".username").children().eq(0).children().eq(0).attr("value"),
			currentage: $(this).prev().children().eq(0).attr("value"),
			newname: $(this).parent().siblings(".username").children().eq(0).children().eq(0).prop("value"),
			newage: $(this).prev().children().eq(0).prop("value")
		});
		location.reload();
	});

	$(".createbutton").click(function(){
		$.post("/dbcreate",
		{
			name: $(this).parent().siblings(".namep").children().eq(0).prop("value"),
			age: $(this).parent().siblings(".agep").children().eq(0).prop("value")
		});
		location.reload()
	});
		
});





