$(document).ready(function(){
	$("#timer").css("display","none");
	// random color array
	var colors = [
	{first: "#ffe259", second: "#ffa751"},
	{first: "#bc4e9c", second: "#f80759"},
	{first: "lightblue", second: "palegreen"},
	{first: "#ffa751", second: "#f80759"}
	];
	var random_index = Math.floor((Math.random() * colors.length) + 1);
	var pair = colors[random_index-1];
	var attr =  "linear-gradient(to bottom right, " + pair.first + ", " + pair.second + ")";
	$("#sbmt").css("background", attr);
	$("#sbmt").click(function(){
		// final dan mesec godina
		var day = $("#day").val();
		var month = $("#month").val();
		var year = $("#year").val();
		var total_h = 0;
		if(CheckInput(day,month,year)){
			// date time getter
			var date = new Date();
			// current date
			var curr_day = date.getDate();
			var curr_month = date.getMonth()+1;
			var curr_year = date.getFullYear();
			// current time
			var curr_hours = date.getHours();
			var curr_mins = date.getMinutes();
			var curr_seconds = date.getSeconds();
			// differences in dates
			var day_diff = day - curr_day;
			var month_diff = month-curr_month-1;
			var year_diff = year - curr_year;
			// if the day is different
			if(day != curr_day){
				// time until current day ends
				var left_h = 24 - curr_hours - 1;
				total_h += left_h;
				var left_m = 60 - curr_mins;
				var left_s = 60 - curr_seconds;
				// if it is the same month
				if(month == curr_month && year == curr_year){
					total_h += ((day_diff-1)*24);
				}
				// if it is not the same month
				else if(curr_month != month && (curr_month <= month && curr_year <= year)){
					// time until current month ends
					total_h += ((GetMonthDays(curr_year,curr_month) - curr_day - 1)*24);
					curr_month++;
					// time between current and finish month
					if(curr_year == year){
						while(curr_month != month){
							total_h += (GetMonthDays(curr_year,curr_month)*24);
							curr_month++;
							if(curr_month > 12){
								curr_month = 1;
								curr_year++;
							}
						}
					}
					else{
						while(true){
							total_h += (GetMonthDays(curr_year,curr_month)*24);
							curr_month++;
							if(curr_month > 12){
								curr_month = 1;
								curr_year++;
							}
							if(curr_month == month && curr_year == year){
								break;
							}
						}
					}
					// time in finish month
					var day_count = 1;
					while(day_count <= day){
						total_h += 24;
						day_count++;
					}
				}
			}
			else{
				left_h = -1;
				left_m = -1;
				left_s = -1;
			}
			if(total_h > 0){
				total_h -= left_h;
			}
			
			// total h / 24 is days left
			// left h is h left
			// left m is minutes left
			// left s is seconds left
			if(total_h < 0 || left_h < 0 || left_m < 0 || left_s < 0){
				alert("The date is current date or is before current date.");
			}
			else{
				DisplayTimer(attr,total_h,left_h,left_m,left_s);
			}
			
		}
	});
});
// gets how much days does the current date have based on it's number and year(to see if it is a leap year)
function GetMonthDays(year,month_num){
	if(month_num == 1 || month_num == 3 || month_num == 5 || month_num == 7 || month_num == 8 || month_num == 10 || month_num == 12){
		return 31;
	}
	if(month_num == 4 || month_num == 6 || month_num == 9 || month_num == 11){
		return 30;
	}
	if(month_num == 2){
		if(year % 4 == 0 && year % 100 != 0 && year % 400 == 0){
			return 29;
		}
		else{
			return 28;
		}
	}
}
function DisplayTimer(attr,total_h,left_h,left_m,left_s){
	// displaying timer and choosing random color pair for text
	$("#timer").css("display","block");
	$(".number-div").css("background", attr);
	$("#timer").addClass("animated fadeInLeft");
	// end of displaying timer
	$("#days").html(total_h/24);
	$("#hours").html(left_h);
	$("#minutes").html(left_m);
	$("#seconds").html(left_s);
}
function CheckInput(day,month,year){
	var pass = 1;
	if(day == "" || month == "" || year == ""){
		alert("Some fields are empty.");
		pass = -1;
	}
	else if (day <= 0 || day > 31){
		alert("Day is not valid.");
		pass = -1;
	}
	else if (month < 1 || month > 12){
		alert("Month is not valid.");
		pass = -1;
	}
	else if (year < 2018 || year > 3000){
		alert("Year is not valid.");
		pass = -1;
	}
	if(pass == 1){
		return true;
	}
	else{
		return false;
	}
}