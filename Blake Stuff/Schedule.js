import { useLoaderData, Link } from "react-router-dom";

import ScheduleCell from './ScheduleCell';
import './Calendar.css';

async function loadSchedule(request) {
    return await (await fetch(`http://localhost:3001/schedule/${request.params.userId}`)).json();
}

export default function Schedule() {
    var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    var times = [];
    for(var i = 6; i <= 20; i++) {
        times.push(i)
    }

    const userInfo = useLoaderData();

    // If possible, changing the days to be a list of strings like "Mon"... would be good, but no big deal if not
    const fakeInfo = {
        classes: [
            {
                class_name: "Test",
                instructor: "Test Instructor",
                days: {
                    mon: true,
                    tue: false,
                    wed: true,
                    thu: false,
                    fri: true,
                    sat: false,
                    sun: false
                },
                time: "12"
            }
        ]
    };

    return (
        <div className="Schedule Bordered">
            {
                days.map((day)=>{
                    return <p className={`DayLabel ${day}`}>{day}</p>
                })
            },

            {
                times.map((time)=>{
                    return <p className={`TimeLabel ${time}`}>{`${time}:00`}</p>
                })
            }

            {
                days.map((day)=>{
                    return times.map((time)=>{
                        for(let i = 0; i < fakeInfo.classes.length; i++) {
                            const course = fakeInfo.classes[i];
                            if(course.time == time) {
                                console.log(course.time + "   " + time);
                                if(day === "Mon" && course.days.mon
                                    || day === "Tue" && course.days.tue
                                    || day === "Wed" && course.days.wed
                                    || day === "Thu" && course.days.thu
                                    || day === "Fri" && course.days.fri
                                    || day === "Sat" && course.days.sat
                                    || day === "Sun" && course.days.sun
                                ) {
                                    return <ScheduleCell day={day} time={time} name={course.class_name} instructor={course.instructor}/>;  
                                }
                            }
                        }

                        return <ScheduleCell day={day} time={time}/>;
                    });
                })
            }
        </div>
    );
}

export {loadSchedule};