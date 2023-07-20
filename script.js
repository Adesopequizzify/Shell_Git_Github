// Fetch data from time.json and populate the timetable
function fetchTimetable() {
  fetch('time.json')
    .then(response => response.json())
    .then(data => {
      const timetableDiv = document.getElementById('timetable');
      let content = '';

      data.weeks.forEach((week, index) => {
        content += `
          <div class="col-md-4">
            <h2>${week.title}</h2>
            <ul>
              ${week.topics.map(topic => `<li>${topic}</li>`).join('')}
            </ul>
          </div>
        `;

        // Update the progress bar (week 5 is for project work)
        if (index < 4) {
          updateProgressBar((index + 1) * week.topics.length, 20);
        } else if (index === 4) {
          updateProgressBar(30, 30);
        }
      });

      timetableDiv.innerHTML = content;
    })
    .catch(error => {
      console.error('Error fetching timetable data:', error);
    });
}

// Update the progress bar based on the number of completed sessions
function updateProgressBar(completedSessions, totalSessions) {
  const progressPercentage = (completedSessions / totalSessions) * 100;
  $('.progress-bar').css('width', progressPercentage + '%').attr('aria-valuenow', progressPercentage);
}

// Load the timetable on page load
window.addEventListener('load', fetchTimetable);
