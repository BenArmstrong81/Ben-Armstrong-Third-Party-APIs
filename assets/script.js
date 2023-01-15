// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

//---------------------------Variables used for JavaScript Functions:
// var timeDisplayEl = $('#date-display');
// var timePast = $('#textarea');
// var timePresent = $('#textarea');
// var timeFuture = $('#textarea');
// var timeBlockEntry = $('#description');

//---------------------------Variables used for JavaScript Functions:
var timeDisplayEl = $('#date-display');
var tableDisplayEl = $('#table-display')

//---------------------------FUNCTION: for Displaying the date in header 
function displayDate() {
  var rightNow = dayjs().format('dddd, MMMM DD');
  timeDisplayEl.text(rightNow);
}

//---------------------------Establish current date
var dateStatement = moment().format('dddd, MMMM Do YYYY');

//---------------------------Establish current hour
var currentHour = moment().hour()

//---------------------------Establish an arry of hours > use to loop through  
var hours = [];
var availableHours = moment('12');
new Array(24).fill().map((acc, index)=> {
    hours.push(availableHours.format('hA'))
    availableHours = availableHours.add(1, 'hour');
})

//---------------------------Loop through array of hours for 9 hours (available working hours in the day)
//---------------------------Add class & styles to elements as they are created
for(i = 0; i < 9; i++) {
    // set tableRowEl id to the index displayed on on the calendar to easily identify which row belongs to which hour
    tableRowEl = $('<tr>').attr('id', i+9).addClass('custom-row');
    timeCol = $('<td>').text(hours[i+9]).addClass('col-2 col-md-1 hour text-center py-3')
    activityCol = $('<td>').addClass('col-9').attr('class', 'note')
    activityTextarea = $('<textarea>').addClass('w-100 description').attr('data-id', i+9);
    saveCol = $('<td>').addClass('col-1 p-0')
    // Adding an eventlistener on each button that will run saveNote()
    saveBtn = $('<button>').addClass('saveBtn').on('click', saveNote);
    saveIcon = $('<i>').addClass('fas fa-save');

    // Add Past/Present/Future rules based on current index + 9 (the starting hour point)
    if(currentHour < (i + 9)) {
    activityCol.addClass('future')
    } else if (currentHour === (i + 9)) {
        activityCol.addClass('present')
    } else if (currentHour > i + 9){
        activityCol.addClass('past');
    }

//---------------------------Append created sections to the tableDisplayElement
    saveBtn.append(saveIcon);   
    activityCol.append(activityTextarea);
    saveCol.append(saveBtn);
    tableRowEl.append(
        timeCol,
        activityCol,
        saveCol
    );
    tableDisplayEl.append(tableRowEl);
}
//---------------------------Function to save note into local storage
function saveNote(event){
    // Establish variable to hold the id of the parent row used to identify which hour/row the note belongs to
    const parentId = $(this).parents('tr').attr('id');
    const activity = $(this).parent().siblings('.note').children('textarea').val();
    if (activity) {
        localStorage.setItem(parentId, activity)
    }
    return;
}

//---------------------------function to loadNotes on page refresh
function loadNotes(){
    for(i=9; i<18; i++){
       let storedNote = localStorage.getItem(i);

       if(storedNote){
        let noteEl = $("textarea[data-id=" + i + "]");
        noteEl.val(storedNote);
       }
    }
}
//---------------------------Function: To load stored notes on page load
loadNotes();

//---------------------------Function: Running the Date within the Header element:
displayDate();


