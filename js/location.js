$(document).ready(function(){
	
	//if(!$("#country").val()){
	function initialize() {
	  var componentForm = {
	      establishment:'long_name',
	      route: 'long_name',
	      locality: 'long_name',
	      administrative_area_level_1: 'long_name',
	      country: 'long_name',
	      postal_code: 'long_name',
	      sublocality:'long_name',
	 };
	
	  var input = /** @type {HTMLInputElement} */(
	      document.getElementById('pac-input'));
	  
	  var palce_options = {
	      types: ['geocode']
	    };
	
	      
	  var autocomplete = new google.maps.places.Autocomplete(input);
	
	  if(!$("#country").val()){
		   for (var component in componentForm) {
		        document.getElementById(component).value = '';
		        document.getElementById(component).disabled = false;
		      }
	  }
	
	  google.maps.event.addListener(autocomplete, 'place_changed', function() {
	     var place = autocomplete.getPlace();
	     if (!place.geometry) {
	       window.alert("Autocomplete's returned place contains no geometry");
	       return;
	     }
	
	    var address = '';
	   
	    if (place.address_components) {
	      address = [
	        (place.address_components[0] && place.address_components[0].short_name || ''),
	        (place.address_components[1] && place.address_components[1].short_name || ''),
	        (place.address_components[2] && place.address_components[2].short_name || '')
	      ].join(' ');
	    }
	    //console.log(place);
	   
	    for (var i = 0; i < place.address_components.length; i++) {
	        var addressType = place.address_components[i].types;
	        if ($.inArray(componentForm[addressType]), addressType) {
	          var val = place.address_components[i].long_name;
	          for (var j = 0; j < place.address_components[i].types.length; j++) {
	              var id = '';
	              id = place.address_components[i].types[j];
	              if(componentForm[id])
	                    document.getElementById(id).value = val;
	          }
	        }
	  	}
	  	if(	($("#establishment").val() != place.name) && 
	  		($("#route").val() != place.name) && 
	  		($("#sublocality").val() != place.name) && 
	  		($("#country").val() != place.name) && 
	  		($("#administrative_area_level_1").val() != place.name) && 
	  		($("#locality").val() != place.name)
	  	 ){
	  		 $("#establishment").val(place.name);
	  	}
	  
	  	
	  	$('#fs_addrs_form').removeClass('hide');
	    $("#pac-input").addClass("hide");
	    $(".new_addrs").addClass("hide");
	  
	  
	    
	  });
	
	}
	google.maps.event.addDomListener(window, 'load', initialize);
	
	
	$('body').on("click", "#reset_addrs", function(){
	    $("#establishment").val("");
	    $("#route").val("");
	    $("#sublocality").val("");
	    $("#country").val("");
	    $("#administrative_area_level_1").val("");
	    $("#locality").val("");
	    $("#postal_code").val("");
	    $("#pac-input").val("");
	    $("#fs_addrs_form").addClass("hide");
	    $("#pac-input").removeClass("hide");
	     $(".new_addrs").removeClass("hide");
	});
	
	$('body').on("click", ".new_addrs", function(){
	    $('#fs_addrs_form').removeClass('hide');
	    $("#pac-input").addClass("hide");
	    $(".new_addrs").addClass("hide");
	});
});
