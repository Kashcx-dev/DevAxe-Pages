import React from 'react';

const Schedule = () => {
  return (
    <section id="schedule">
      <h2 className="section-title">TIMELINE // EXECUTION</h2>
      <div className="glass-panel schedule-container">
        <div className="schedule-item">
          <h3>Oct 16 - Friday</h3>
          <ul>
            <li><span className="time">09:00 AM</span> - Problem Statements Released</li>
            <li><span className="time">09:00 AM</span> - Hacking Begins</li>
            <li><span className="time">Evening</span> - Mentor Check-ins</li>
          </ul>
        </div>
        <div className="schedule-item">
          <h3>Oct 17 - Saturday</h3>
          <ul>
            <li><span className="time">All Day</span> - Hacking Continues</li>
            <li><span className="time">Afternoon</span> - Mini Events & Workshops</li>
            <li><span className="time">Night</span> - Midnight Sync & Games</li>
          </ul>
        </div>
        <div className="schedule-item">
          <h3>Oct 18 - Sunday</h3>
          <ul>
            <li><span className="time">11:30 AM</span> - Submission Portal Opens</li>
            <li><span className="time">Night</span> - Submissions Close & Hacking Ends</li>
            <li><span className="time">TBD</span> - Project Demos & Awards</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
