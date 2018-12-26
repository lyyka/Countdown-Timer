let total_h = 0;
let left_h = -1;
let left_m = -1;
let left_s = -1;
let int;
// colors taken from www.uigradients.com
const colors = [
{first: "#ffe259", second: "#ffa751"},
{first: "#bc4e9c", second: "#f80759"},
{first: "lightblue", second: "palegreen"},
{first: "#ffa751", second: "#f80759"},
{first: "#B24592" , second: "#B24592"},
{first: "#457fca" , second: "#5691c8"},
{first: "#eacda3", second: "#d6ae7b"},
{first: "#834d9b", second: "#d04ed6"},
{first: "#ff4b1f" , second: "#ff9068"},
{first: "#FF5F6D" , second: "#FFC371"},
{first: "#00d2ff" , second: "#928DAB"}
];
// random idnex from colors
const random_color_index = Math.floor((Math.random() * colors.length) + 1);
const pair = colors[random_color_index-1];
// // random color array
// var attr_old = pair.first;
// var attr =  "linear-gradient(to bottom right, " + pair.first + ", " + pair.second + ")";
// var attr_webkit = "-webkit-linear-gradient(to bottom right, " + pair.first + ", " + pair.second + ")";
// // attrs for button hover
// var inverted_attr_old = pair.second;
// var inverted_attr =  "linear-gradient(to top left, " + pair.first + ", " + pair.second + ")";
// var inverted_attr_webkit =  "-webkit-linear-gradient(to top left, " + pair.first + ", " + pair.second + ")";
$(document).ready(function(){
	// color the start-countdown button
	$("#sbmt").css({
		'background-color': pair.first
	});
	// add animations
	$("#form").addClass("animated fadeInRightBig");
	$("#footer").addClass("animated fadeIn");
	window.setTimeout(function(){
		// remove animation classess after some time
		$("#form").removeClass("animated fadeInRightBig");
		$("#footer").removeClass("animated fadeIn");
	},2000);
	$("#congrats-h").css("color",pair.first);
	// input focus in
	$(".input-field").focus(function(){
		var label = $(this).parent().find("label");
		$(this).css("border-bottom","1px solid " + GetRandomColor());
		HighlightLabel(label,pair.second);
	});
	// input focus out
	$(".input-field").blur(function(){
		const label = $(this).parent().find("label");
		$(this).css("border-bottom","1px solid black");
		RemoveHighlight(label);
	});
	// show congrats div
	$("#close-congrats").click(function(){
		$("#congrats-holder").css("display","none");
	});
	// button click
	$("#sbmt").click(function(){
		clearInterval(int);
		const evt_name = $("#event-name").val();
		const day = $("#day").val();
		const month = $("#month").val();
		const year = $("#year").val();
		if(CheckInput(evt_name,day,month,year)){
			$("#form").hide();
			$("#waiting-for-text").text("Time until " + evt_name);
			$("#waiting-for-text").css({
				"color": pair.first
			});
			$("#waiting-for-text").show();
			// set event name in congrats div
			$("#event-name-holder").text(evt_name);
			$("#event-name-holder").css({
				"color": pair.first
			});
			// date time getter
			var date = new Date();
			// current date
			var curr_day = date.getDate();
			var curr_month = date.getMonth()+1; // +1 because .getMonth() returns month index (from 0 to 11)
			var curr_year = date.getFullYear();
			// differences in days
			var day_diff = day - curr_day;
			// reseting total_h
			total_h = 0;
			// if the day is different
			if(day != curr_day){
				// current time
				var curr_hours = date.getHours();
				var curr_mins = date.getMinutes();
				var curr_seconds = date.getSeconds();
				// time until current day ends
				left_h = 24 - curr_hours - 1;
				left_m = 60 - curr_mins-1;
				left_s = 60 - curr_seconds;
				// if it is the same month
				if(month == curr_month && year == curr_year){
					total_h += ((day_diff-1)*24);
				}
				// if it is not the same month
				else if((curr_year == year && curr_month < month) || (curr_year < year)){
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
							curr_month++;
							if(curr_month > 12){
								curr_month = 1;
								curr_year++;
							}
							if(curr_month == month && curr_year == year){
								break;
							}
							else{
								total_h += (GetMonthDays(curr_year,curr_month)*24);
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
			// total h / 24 is days left
			// left h is h left
			// left m is minutes left
			// left s is seconds left
			if(total_h < 0 || left_h < 0 || left_m < 0 || left_s < 0){
				alert("The date is current date or is before current date.");
			}
			else{
				DisplayTimer(pair.first);
				StartCountDown();
			}
			
		}
	});
});
// gets random color from an array
function GetRandomColor(){
	var color = "";
	var color1 = pair.first;
	var color2 = pair.second;
	var rand = Math.floor((Math.random() * 2) + 1);
	if(rand == 1){
		color = color1;
	}
	if(rand == 2){
		color = color2;
	}
	return color;
}
// highlight label of the input
function RemoveHighlight(label){
	label.css("color","black");
}
function HighlightLabel(label,color){
	label.css("color",color);
}
// gets how much days does the current date have based on it's number and year(to see if it is a leap year)
function GetMonthDays(year,month_num){
	let days = 0;
	if(month_num == 1 || month_num == 3 || month_num == 5 || month_num == 7 || month_num == 8 || month_num == 10 || month_num == 12){
		days = 31;
	}
	if(month_num == 4 || month_num == 6 || month_num == 9 || month_num == 11){
		days = 30;
	}
	if(month_num == 2){
		if(year % 4 == 0 && year % 100 != 0 && year % 400 == 0){
			days = 29;
		}
		else{
			days = 28;
		}
	}
	return days;
}
function DisplayTimer(color){
	// displaying timer
	$("#timer").css("display","block");
	$(".number-div").css({
		"background-color": color
	});
	$("#timer").addClass("animated fadeInLeftBig");
	// displaying numbers
	UpdateTimer();
	// removing animation class from #timer
	window.setTimeout(function(){
		$("#timer").removeClass("animated fadeInLeftBig");
	},2000);
}
function CheckInput(evt_name, day, month, year){
	let pass = true;
	if(evt_name.left_h == 0 || day.length == 0 || month.length == 0 || year.length == 0){
		alert("Some fields are empty.");
		pass = false;
	}
	else if (day < 1 || day > 31){
		alert("Day is not valid.");
		pass = false;
	}
	else if (month < 1 || month > 12){
		alert("Month is not valid.");
		pass = false;
	}
	else if (year < (new Date()).getFullYear() || year > 3000){
		alert("Year is not valid (must be between " + (new Date()).getFullYear() + " and 3000).");
		pass = false;
	}
	return pass;
}
function StartCountDown(){
	int = setInterval(Count,1000);
}
function Count(){
	left_s--;
	if(left_s == 0){
		left_m--;
		left_s = 59;
		if(left_m == -1){
			left_h--;
			left_m = 59;
			if(left_h == -1){
				total_h -= 24;
				left_h = 24;
			}
		}
	}
	if(total_h == 0 && left_h == 0 && left_m == 0 && left_s == 0){
		clearInterval(int);
		$("#congrats-holder").show();
	}
	else{
		UpdateTimer();
	}
}
function UpdateTimer(){
	$("#days").text(total_h/24);
	$("#hours").text(left_h);
	$("#minutes").text(left_m);
	$("#seconds").text(left_s);
}