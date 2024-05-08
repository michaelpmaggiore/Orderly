import './Calendar.css'

export default function ScheduleCell({day, time, name, instructor}) {
    const cssName = `${day} Hour${time} Bordered`;
    return (
        <div className={cssName}>
            <p>{name}</p>
            <p>{instructor}</p>
        </div>
    );
}