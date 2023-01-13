// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

//---------------------------Variables used for JavaScript Functions:
var timeDisplayEl = $('#date-display');
var timePast
var timePresent
var timeFuture
var timeBlockEntry = $('#description');
// var hour9 = moment().hours(9).minutes(00).format('hh:mm A');
// var hour10 = moment().hours(10).minutes(00).format('hh:mm A'); 
// var hour11 = moment().hours(11).minutes(00).format('hh:mm A');
// var hour12 = moment().hours(12).minutes(00).format('hh:mm A');  
// var hour1 = moment().hours(1).minutes(00).format('hh:mm A');
// var hour2 = moment().hours(2).minutes(00).format('hh:mm A');
// var hour3 = moment().hours(3).minutes(00).format('hh:mm A');
// var hour4 = moment().hours(4).minutes(00).format('hh:mm A');
// var hour5 = moment().hours(5).minutes(00).format('hh:mm A');
// var hour = [hour9, hour10, hour11, hour12, hour1, hour2, hour3, hour4, hour5];


//---------------------------FUNCTION: for Displaying the date in header 
function displayDate() {
  var rightNow = dayjs().format('dddd, MMMM DD');
  timeDisplayEl.text(rightNow);
}


function readScheduleFromStorage() {
  var timeBlockEntry = localStorage.getItem('schedule');
  if (schedule) {
    schedule = JSON.parse(schedule);
  } else { 
      schedule = [];
}
return schedule;
}
//---------------------------FUNCTION: Saves Aray of project and store in local storage
function saveScheduleToStorage(schedule) {
    localStorage.setItem('schedule', JSON.stringify(schedule));
}

//---------------------------FUNCTION: Retreives local storage and displays it
function printScheduleData() {

//----------clears current page
    // timeBlockEntry.empty();

//-----------Retrieves projects keyed in from loacal storage
    var schedule = readScheduleFromStorage();

//------------------LOOP: creates a row for each project input
// for (var i = 0; i < hour.length; i += 1) {
//     var schedule = schedule[i];
//     var projectHour = dayjs(schedule.hour);

//-----------gets date/time for start of today
    var hour = dayjs().startOf('hour');

//-----------Add class to row by comparing project date to today's date
if (calendarTime.isBefore(hour)) {
  timeBlockEntry.addClass('past');
} else if (calendarTime.isSame(hour)) {
  timeBlockEntry.addClass('present');
} else (calendarTime.isAfter(hour)); {
  timeBlockEntry.addClass('future');
}

//-----------add project to local storage
var schedule = readScheduleFromStorage();
schedule.push(newschedule);
saveScheduleToStorage(schedule);

//-----------print project data
printProjectData();

}


    

// $(function () {

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

// });

//---------------------------Running the timer updating every second
displayDate();
