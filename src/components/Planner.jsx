const week = [
  { day: 'MON', date: '12', active: false },
  { day: 'TUE', date: '13', active: true },
  { day: 'WED', date: '14', active: false },
  { day: 'THU', date: '15', active: false },
  { day: 'FRI', date: '16', active: false },
]

function Planner() {
  return (
    <section className="week-preview" id="preview">
      <div className="week-copy">
        <span className="section-kicker">Make it your week</span>
        <h2>A plan that feels<br />like <span>yours.</span></h2>
        <p>See your week at a glance, give every subject its moment, and leave a little breathing room between the busy bits.</p>
        <a className="text-action purple-action" href="/dashboard">Your planner, your pace <span aria-hidden="true">→</span></a>
      </div>
      <div className="week-card">
        <div className="week-card-header">
          <div><span className="small-overline">YOUR OVERVIEW</span><h3>A week in balance</h3></div>
          <span className="week-dots" aria-hidden="true">···</span>
        </div>
        <div className="week-days">
          {week.map((item) => (
            <div className={`week-day${item.active ? ' selected' : ''}`} key={item.day}>
              <span>{item.day}</span><strong>{item.date}</strong>
            </div>
          ))}
        </div>
        <div className="week-bars" aria-label="Illustrative weekly study schedule">
          <div className="week-time-labels"><span>9 AM</span><span>11 AM</span><span>1 PM</span><span>3 PM</span></div>
          <div className="week-columns">
            <div className="week-column"><i className="bar bar-lavender bar-a" /><i className="bar bar-yellow bar-b" /></div>
            <div className="week-column selected-column"><i className="bar bar-purple bar-c" /><i className="bar bar-mint bar-d" /><i className="bar bar-lavender bar-e" /></div>
            <div className="week-column"><i className="bar bar-mint bar-f" /><i className="bar bar-lavender bar-g" /></div>
            <div className="week-column"><i className="bar bar-yellow bar-h" /><i className="bar bar-purple bar-i" /></div>
            <div className="week-column"><i className="bar bar-lavender bar-j" /><i className="bar bar-mint bar-k" /></div>
          </div>
        </div>
        <div className="week-legend"><span><i className="legend-dot dot-purple" /> Study session</span><span><i className="legend-dot dot-yellow" /> Break time</span></div>
        <p className="preview-disclaimer">Illustrative preview — your personal schedule will appear here once planner features are connected.</p>
      </div>
    </section>
  )
}

export default Planner
