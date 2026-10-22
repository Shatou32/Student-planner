export default function Goal({ goals, openModal, deleteEntry }) {
  return (
    <section className="dashboard-panel progress-panel" id="goals">
      <div className="panel-heading">
        <div><span className="panel-eyebrow">KEEP GROWING</span><h2>Goals &amp; progress</h2></div>
        <button className="small-action" onClick={() => openModal('goal')} type="button">+ Add goal</button>
      </div>
      {goals.length ? (
        <div className="goal-list">
          {goals.map((goal) => {
            const progress = Math.min(100, Math.round((goal.current / goal.target) * 100))
            return (
              <article className="goal-card" key={goal.id}>
                <div className="goal-card-heading"><strong>{goal.title}</strong><span>{goal.current} / {goal.target} {goal.unit}</span></div>
                <div className="goal-progress-track" role="progressbar" aria-label={`${goal.title} progress`} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"><span style={{ width: `${progress}%` }} /></div>
                <div className="goal-card-footer"><small>{progress >= 100 ? 'Goal complete!' : `${progress}% complete`}</small><span className="item-actions"><button aria-label={`Edit ${goal.title}`} onClick={() => openModal('goal', goal)} type="button">Edit</button><button aria-label={`Delete ${goal.title}`} onClick={() => deleteEntry('goal', goal.id)} type="button">Delete</button></span></div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="progress-empty-state">
          <div className="empty-chart" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /></div>
          <strong>Set a goal to start tracking progress</strong>
          <p>Choose a target and update your progress as you go.</p>
          <button className="text-button" onClick={() => openModal('goal')} type="button">Create a study goal</button>
        </div>
      )}
    </section>
  )
}
