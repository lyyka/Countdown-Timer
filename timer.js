$(document).ready(function(){
	$("#sbmt").click(function(){
		// final dan mesec godina
		var day = $("#day").val();
		var month = $("#month").val();
		var year = $("#year").val();
		var total_h = 0;
		if(day != "" && month != "" && year != ""){
			// trenutni dan mesec godina
			var date = new Date();
			// danasnji datum
			var curr_day = date.getDate();
			var curr_month = date.getMonth()+1;
			var curr_year = date.getFullYear();
			// vreme
			var curr_hours = date.getHours();
			var curr_mins = date.getMinutes();
			var curr_seconds = date.getSeconds();
			// razlike (datum)
			var day_diff = day - curr_day;
			var month_diff = month-curr_month-1;
			var year_diff = year - curr_year;
			// ako nije isti dan, izracunaj vreme do kraja dana
			if(day != curr_day){
				// vreme do kraja danasnjeg dana
				var left_h = 24 - curr_hours - 1;
				total_h += left_h;
				var left_m = 60 - curr_mins;
				var left_s = 60 - curr_seconds;
				if(month == curr_month && year == curr_year){
					total_h += ((day_diff-1)*24);
				}
				else if(curr_month != month){
					// vreme do kraja trenutnog meseca	
					total_h += ((GetMonthDays(curr_year,curr_month) - curr_day)*24);
					curr_month++;
					// vreme izmedju trenutnog meseca i zadnjeg meseca
					while(curr_month != month || curr_year != year){
						total_h += (GetMonthDays(curr_year,curr_month)*24);
						curr_month++;
						if(curr_month > 12){
							curr_month = 1;
							curr_year++;
						}
					}
					// dovrsi kranji mesec
					var day_count = 1;
					while(day_count <= day){
						total_h += 24;
						day_count++;
					}
				}
			}
			total_h -= 24;
			total_h -= left_h;
			alert(total_h / 24 + " dana, "+ left_h + ":" + left_m + ":" + left_s);
		}
		else{
			alert("Nisu uneti svi podaci.");
		}
	});
});
function GetMonthDays(year,month_num){
	if(month_num == 1 || month_num == 3 || month_num == 5 || month_num == 7 || month_num == 8 || month_num == 10 || month_num == 12){
		return 31;
	}
	if(month_num == 4 || month_num == 6 || month_num == 9 || month_num == 1){
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