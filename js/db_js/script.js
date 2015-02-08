var household = null;
window.onload = function() {
	$('#btnHouseholds').click(function() {
		$.ajax({
			url : 'http://modaca.k2vsoftware.com/api/households/getAll',
			async : false,
			type : 'post',
			success : function(result) {
				
				var id = homeIds.value;
				var temp = jQuery.parseJSON(result);
				temp = temp['data']['data'];
				var objAry = jQuery.parseJSON(temp);
				
				for(var i in objAry)
				{
					if(objAry[i].household_identifier==id)
					{
					
						userInput.homeId.value = objAry[i].household_identifier;
						userInput.owner.value = objAry[i].leader_name;
						userInput.contactNo.value = objAry[i].contact_no;
						userInput.address.value = objAry[i].address;
						userInput.race.value = objAry[i].race;
						userInput.income.value = objAry[i].income;
						userInput.numberMembers.value = objAry[i].no_of_members;
						userInput.pregnentMothers.value = objAry[i].no_of_pregnant_mothers;
						userInput.numberBaby.value = objAry[i].no_of_babies;
						userInput.note.value = objAry[i].note;
					}
				}
				
			},
			error : function(xhr, status, err) {
				console.log(xhr);
				console.log(status);
				console.log(err);
			}
		});
	});

	function getObjByID(result, id) {
		var temp = jQuery.parseJSON(result);
		temp = temp['data']['data'];
		var objAry = jQuery.parseJSON(temp);
		return objAry[id];
		
	}
	
	$('#userInput').submit(function(e) {
		e.preventDefault();
		
		var Geo={};

        if (navigator.geolocation) {
           navigator.geolocation.getCurrentPosition(success, error);
        }

        //Get the latitude and the longitude;
        function success(position) {
            Geo.lat = position.coords.latitude;
            Geo.lng = position.coords.longitude;
            //populateHeader(Geo.lat, Geo.lng);
        }

        function error(){
            console.log("Geocoder failed");
        }
		
		var data = $('#userInput').serialize();
		console.log(data);
		$.post('http://modaca.k2vsoftware.com/api/households/save', data, function(e, status, jqXHR ) {
		console.log(e);
		console.log(status);
		console.log(jqXHR);
		});
	});
};