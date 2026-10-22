export default function Overview({ taskCount, completedCount, pendingCount, overdueCount, openModal }) {
  const stats = [
    { label: 'Total tasks', icon: '✓', accent: 'stat-purple', value: taskCount },
    { label: 'Completed', icon: '◎', accent: 'stat-green', value: completedCount },
    { label: 'Still to do', icon: '◷', accent: 'stat-peach', value: pendingCount },
    { label: 'Overdue', icon: '!', accent: 'stat-blue', value: overdueCount },
  ]

  return (
    <>
      <div className="dashboard-welcome">
        <div>
          <span className="section-kicker">YOUR STUDY OVERVIEW</span>
          <h1>Your study space</h1>
          <p>A clearer view of what you’re working toward, one step at a time.</p>
        </div>
        <button className="button button-primary" onClick={() => openModal('task')} type="button">+ Add a task</button>
      </div>

      <div className="dashboard-stat-grid" aria-label="Study summary">
        {stats.map((stat) => (
          <article className="dashboard-stat-card" key={stat.label}>
            <span className={`dashboard-stat-icon ${stat.accent}`} aria-hidden="true">{stat.icon}</span>
            <span className="dashboard-stat-label">{stat.label}</span>
            <strong className="stat-placeholder stat-value">{stat.value}</strong>
            <small>{stat.label === 'Overdue' ? 'Past due date and incomplete' : 'From tasks in this browser'}</small>
          </article>
        ))}
      </div>
    </>
  )
}
