$(document).ready(function () {
  // Initialize fullCalendar plugin
  $("#calendar").fullCalendar({
    // Set options for the calendar
    // header: {
    //   //   left: "prev,next",
    //   left: "",
    //   center: "title",
    //   right: "",
    // },
    selectable: false,
    selectHelper: false,
    editable: false,
    eventLimit: true,
    // events: [
    //   // Add your events here
    //   {
    //     title: "Event 1",
    //     start: "2023-04-01",
    //     end: "2023-04-01",
    //   },
    //   {
    //     title: "Event 2",
    //     start: "2023-04-05T12:30:00",
    //     allDay: false,
    //   },
    //   {
    //     title: "Event 3",
    //     start: "2023-04-09T16:30:00",
    //     allDay: false,
    //   },
    // ],
    // Define what happens when a date is clicked
    dayClick: function (date, jsEvent, view) {
      // Construct URL for markdown file based on clicked date
      var url = "markdown/" + moment(date).format("YYYY-MM-DD") + ".md";

      // Fetch markdown file using AJAX
      $.ajax({
        url: url,
        success: function (data) {
          // Set modal title and content
          //   $("#calendarModal .modal-title").html(
          //     moment(date).format("MMMM Do, YYYY")
          //   );
          $("#calendarModal .modal-body").html(marked(data));

          // Open modal popup
          $("#calendarModal").modal();
        },
        error: function () {
          // Show error message if markdown file not found
          //   alert("Error: Markdown file not found.");
          //   alert("No issue reported on this date.");
          $("#calendarModal .modal-body").html(
            marked("<p class='text-center'>No issue reported on this date.</p>")
          );
          $("#calendarModal").modal();
        },
      });
    },
  });
});
