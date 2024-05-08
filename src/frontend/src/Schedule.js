import React, { useEffect, useState, useContext } from 'react';
import { Link, useRouteMatch, useParams, useNavigate,} from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Schedule.css';
import UserContext from './UserContext';

const localizer = momentLocalizer(moment);

function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();

    const { userId } = useParams();


  useEffect(() => {
    fetch(`http://localhost:3001/schedule/${userId}`)
      .then(response => response.json())
    //   console.log(userId);
    //   .then(data => {
    //     const events = data
    //       .filter(classItem => classItem.name && classItem.start && classItem.end)
    //       .map(classItem => ({
    //         title: classItem.name,
    //         start: new Date(classItem.start),
    //         end: new Date(classItem.end),
    //       }));
    //     setSchedule(events);
    //   });
  }, []);

  return (
    <div className="schedule-page">
      <h2>Your Class Schedule</h2>
      {Array.isArray(schedule) && schedule.every(event => event.title) && (
        <Calendar
            localizer={localizer}
            events={schedule}
            startAccessor="start"
            endAccessor="end"
            // views={['work_week']}
            style={{ height: 500 }}
        />
      )}
    <Link to={`/schedule/new/${userId}`} className="add-class-button">Add New Class</Link>    
    </div>
  );
}

export default Schedule;