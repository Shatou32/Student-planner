export default function Timetable({
  sessions,
  todaysSessions,
  weekDays,
  today,
  setWeekOffset,
  openModal,
  deleteEntry,
  formatDate,
}) {
  return (
    <>
      <section className="dashboard-panel schedule-panel" id="timetable">
        <div className="panel-heading">
          <div><span className="panel-eyebrow">PLAN YOUR DAY</span><h2>Study timetable</h2></div>
          <div className="timetable-actions">
            <button aria-label="Previous week" className="week-nav-button" onClick={() => setWeekOffset((offset) => offset - 1)} type="button">‹</button>
            <button aria-label="Current week" className="week-nav-button week-current-button" onClick={() => setWeekOffset(0)} type="button">This week</button>
            <button aria-label="Next week" className="week-nav-button" onClick={() => setWeekOffset((offset) => offset + 1)} type="button">›</button>
            <button className="small-action" onClick={() => openModal('session')} type="button">+ Add session</button>
          </div>
        </div>
        <div className="timetable-week">
          {weekDays.map((date) => {
            const daySessions = sessions
              .filter((session) => session.date === date)
              .sort((a, b) => a.startTime.localeCompare(b.startTime))
            const dateObject = new Date(`${date}T12:00:00`)
            return (
              <div className={`timetable-day${date === today ? ' timetable-today' : ''}`} key={date}>
                <div className="timetable-day-heading">
                  <strong>{new Intl.DateTimeFormat(undefined, { weekday: 'short' }).format(dateObject)}</strong>
                  <span>{formatDate(date, { month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="timetable-day-sessions">
                  {daySessions.length ? daySessions.map((session) => (
                    <article className="session-card" key={session.id}>
                      <strong>{session.subject}</strong>
                      <span>{session.startTime}–{session.endTime}</span>
                      {session.notes && <small>{session.notes}</small>}
                      <div className="item-actions">
                        <button aria-label={`Edit ${session.subject} session`} onClick={() => openModal('session', session)} type="button">Edit</button>
                        <button aria-label={`Delete ${session.subject} session`} onClick={() => deleteEntry('session', session.id)} type="button">Delete</button>
                      </div>
                    </article>
                  )) : <span className="no-session">—</span>}
                </div>
              </div>
            )
          })}
        </div>
        <button className="text-button session-quick-add" onClick={() => openModal('session')} type="button">Create a study session</button>
      </section>

      <section className="dashboard-panel today-panel">
        <div className="panel-heading">
          <div><span className="panel-eyebrow">TODAY</span><h2>Today’s study sessions</h2></div>
        </div>
        {todaysSessions.length ? (
          <ul className="today-session-list">
            {todaysSessions.map((session) => (
              <li key={session.id}><span className="schedule-marker marker-purple" /><span><strong>{session.subject}</strong><small>{session.startTime}–{session.endTime}</small></span></li>
            ))}
          </ul>
        ) : <div className="dashboard-empty-state compact-empty"><strong>No sessions planned for today</strong><p>Add a study session to see it in your daily plan.</p></div>}
      </section>
    </>
  )
}
