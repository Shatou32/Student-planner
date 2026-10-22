export default function MyTask({
  tasks,
  visibleTasks,
  subjects,
  taskFilter,
  setTaskFilter,
  subjectFilter,
  setSubjectFilter,
  toggleTask,
  openModal,
  deleteEntry,
  formatDate,
}) {
  return (
    <section className="dashboard-panel task-panel" id="tasks">
      <div className="panel-heading">
        <div><span className="panel-eyebrow">YOUR CHECKLIST</span><h2>Study tasks</h2></div>
        <button className="small-action" onClick={() => openModal('task')} type="button">+ Add task</button>
      </div>
      <div className="task-toolbar">
        <label className="visually-hidden" htmlFor="task-filter">Filter tasks</label>
        <select id="task-filter" onChange={(event) => setTaskFilter(event.target.value)} value={taskFilter}>
          <option value="all">All tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="overdue">Overdue</option>
          <option value="high">High priority</option>
          <option value="medium">Medium priority</option>
          <option value="low">Low priority</option>
        </select>
        <label className="visually-hidden" htmlFor="subject-filter">Filter by subject</label>
        <select id="subject-filter" onChange={(event) => setSubjectFilter(event.target.value)} value={subjectFilter}>
          <option value="all">All subjects</option>
          {subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
        </select>
      </div>
      {visibleTasks.length ? (
        <ul className="planner-list">
          {visibleTasks.map((task) => (
            <li className={`planner-list-item${task.completed ? ' item-completed' : ''}`} key={task.id}>
              <button
                aria-label={task.completed ? `Mark ${task.title} incomplete` : `Mark ${task.title} complete`}
                className={`task-toggle${task.completed ? ' task-toggle-done' : ''}`}
                onClick={() => toggleTask(task)}
                type="button"
              >{task.completed ? '✓' : ''}</button>
              <div className="planner-item-copy">
                <strong>{task.title}</strong>
                <small>{task.subject || 'No subject'} · {task.dueDate ? `Due ${formatDate(task.dueDate)}` : 'No due date'}</small>
                {task.description && <p>{task.description}</p>}
              </div>
              <span className={`priority-label priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
              <div className="item-actions">
                <button aria-label={`Edit ${task.title}`} onClick={() => openModal('task', task)} type="button">Edit</button>
                <button aria-label={`Delete ${task.title}`} onClick={() => deleteEntry('task', task.id)} type="button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="dashboard-empty-state compact-empty">
          <span className="empty-state-icon" aria-hidden="true">✓</span>
          <strong>{tasks.length ? 'No tasks match these filters' : 'Your task list starts here'}</strong>
          <p>{tasks.length ? 'Try a different filter or subject.' : 'Add an assignment or reminder to get organized.'}</p>
          {!tasks.length && <button className="text-button" onClick={() => openModal('task')} type="button">Add your first task</button>}
        </div>
      )}
    </section>
  )
}
