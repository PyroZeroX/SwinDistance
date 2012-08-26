$(document).ready(function()
{
	console.log('start');
	$('#resultModal').modal(
	{
		keyboard:true,
		show: false
	})

});

$('#btnsubmit').click(function(){ 
	var lat = $('#lat').val();
	var lon = $('#lon').val();
	var error = false;

	if(lat == null || lat == "") // || extra validation
	{
		$('#latgroup').addClass('error');
		error = true;
	}
	else $('#latgroup').removeClass('error');

	
	if(lon == null || lon == "")
	{
		$('#longroup').addClass('error');
		error = true;
	}
	else $('#longroup').removeClass('error');

	if(error){ return false; }
	else
	{
		//console.log("OK!");
		var distance = findDistance(lat, lon);
		$('#resultLat').html(lat);
		$('#resultLon').html(lon);
		$('#resultKM').html(distance);
		$('#resultModal').modal('show');
	}

});

//source: http://andrew.hedges.name/experiments/haversine/
//Was altered to cut down the lines
function findDistance(lat, lon)
{
	var radius = 6373; // mean radius of the earth (km) at 39 degrees from the equator
	var swinLat = -37.8212633; //latitude of swin
	var swinLon = 145.0400497; //longitude of swin
	var lat1, lon1, lat2, lon2, dlat, dlon, a, c, km;
	
	// toRad
	lat1 = lat * Math.PI/180;
	lon1 = lon * Math.PI/180;
	lat2 = swinLat * Math.PI/180;
	lon2 = swinLon * Math.PI/180;
	
	// difference between two loc
	dlat = lat2 - lat1;
	dlon = lon2 - lon1;
	
	a  = Math.pow(Math.sin(dlat/2),2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2),2);
	c  = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); // great circle distance in radians
	
	km = c * radius; // great circle distance in km
	
	// round the results down to the nearest 1/1000
	km = Math.round(km * 1000) / 1000
	
	// return the result
	return km;
}

