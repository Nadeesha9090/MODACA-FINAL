  var household = null;

window.onload = function() {
	

	$('#btnHouseholds').click(function() {
		$.ajax({
			url : 'http://localhost/MoDACA/api/households/getAll', // getHouseholds => getAll
			async : false,
			type : 'post',
			success : function(result) {
				
				var id = homeIds.value;
		//		var lastFive = id.substr(id.length - 5); // => "Tabs1"
				var lastChar = id.substr(id.length - 1); // => "1"
			
		//		household = getObjByID(result,2);
				
				household = getObjByID(result,lastChar);
				console.log(household['lastChar']);
				alert(household['leader_name']);
				
			},
			error : function(xhr, status, err) {
				console.log(xhr);
				console.log(status);
				console.log(err);
			}
		});
	});

	$('#btnHouse').click(function() {
		$.ajax({
			url : 'http://localhost/MoDACA/api/bmis/getByID/1', // getHousehold => getByID // RUN THis
			async : false,
			type : 'post',
			success : function(result) {
				
				household = getObjByID(result);
				console.log(household);
				//alert(household['leader_name']);
			},
			error : function(xhr, status, err) {
				console.log(xhr);
				console.log(status);
				console.log(err);
			}
		});
	});

	$('#btnSave').click(function() {
		$.ajax({
			url: 'http://localhost/MoDACA/api/households/save', // setHouseholds => save
			async : false,
			data : JSON.stringify(household),
			dataType : 'json',
			type: 'post',
			success: function(result) {
				console.log(result);
				//var res = jQuery.parseJSON(result);
				alert(result);
			},
			error: function(xhr, status, err) {
				console.log(xhr);
				console.log(status);
				console.log(err);
			}
		})
	});
	
	// this function takes the result of the API call and the ID you want to extract
	function getObjByID(result, id) {
		var temp = jQuery.parseJSON(result);
		temp = temp['data']['data'];
		var objAry = jQuery.parseJSON(temp);
		if(typeof id === 'undefined' ) {
			return objAry;
		} else 
			return objAry[id];
	}
};