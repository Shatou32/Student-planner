import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Goal from './Goal.jsx'
import MyTask from './MyTask.jsx'
import Overview from './Overview.jsx'
import Timetable from './Timetable.jsx'

const NAVIGATION = [
  { label: 'Overview', icon: '⌂', target: 'overview' },
  { label: 'My tasks', icon: '✓', target: 'tasks' },
  { label: 'Timetable', icon: '▦', target: 'timetable' },
  { label: 'Goals & progress', icon: '↗', target: 'goals' },
]
const STORAGE_KEY = 'studymate-planner-v1'
const EMPTY_PLANNER = { tasks: [], sessions: [], goals: [] }

function loadPlanner() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return { planner: EMPTY_PLANNER, issue: '' }
    const parsed = JSON.parse(saved)
    if (
      !parsed ||
      !Array.isArray(parsed.tasks) ||
      !Array.isArray(parsed.sessions) ||
      !Array.isArray(parsed.goals)
    ) {
      throw new Error('Saved planner data has an unexpected format.')
    }
    return { planner: parsed, issue: '' }
  } catch (error) {
    console.error('Could not load saved StudyMate planner data.', error)
    return {
      planner: EMPTY_PLANNER,
      issue: 'Saved data could not be read. If you make a change, it will replace the unreadable saved data.',
    }
  }
}

function getLocalDate(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDate(dateString, options = { month: 'short', day: 'numeric' }) {
  if (!dateString) return 'No date'
  const [year, month, day] = dateString.split('-').map(Number)
  return new Intl.DateTimeFormat(undefined, options).format(new Date(year, month - 1, day))
}

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export default function DashboardPage() {
  const [initialState] = useState(loadPlanner)
  const [planner, setPlanner] = useState(initialState.planner)
  const [storageIssue, setStorageIssue] = useState(initialState.issue)
  const [modal, setModal] = useState(null)
  const [modalError, setModalError] = useState('')
  const [taskFilter, setTaskFilter] = useState('all')
  const [subjectFilter, setSubjectFilter] = useState('all')
  const [notice, setNotice] = useState('')
  const [weekOffset, setWeekOffset] = useState(0)

  const savePlanner = (nextPlanner) => {
    setPlanner(nextPlanner)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPlanner))
      setStorageIssue('')
    } catch (error) {
      console.error('Could not save StudyMate planner data.', error)
      setStorageIssue('Your latest changes could not be saved in this browser. Check browser storage settings and try again.')
    }
    setNotice('')
  }

  const openModal = (type, entry = null) => {
    setModalError('')
    setModal({ type, entry })
  }
  const closeModal = () => {
    setModalError('')
    setModal(null)
  }
  const today = getLocalDate()
  const completedCount = planner.tasks.filter((task) => task.completed).length
  const pendingCount = planner.tasks.length - completedCount
  const overdueCount = planner.tasks.filter(
    (task) => !task.completed && task.dueDate && task.dueDate < today,
  ).length
  const subjects = [...new Set(planner.tasks.map((task) => task.subject).filter(Boolean))].sort()

  const visibleTasks = useMemo(() => {
    return planner.tasks.filter((task) => {
      if (subjectFilter !== 'all' && task.subject !== subjectFilter) return false
      if (taskFilter === 'pending') return !task.completed
      if (taskFilter === 'completed') return task.completed
      if (taskFilter === 'overdue') return !task.completed && task.dueDate && task.dueDate < today
      if (['low', 'medium', 'high'].includes(taskFilter)) {
        return task.priority.toLowerCase() === taskFilter
      }
      return true
    }).sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1
      return (a.dueDate || '9999-12-31').localeCompare(b.dueDate || '9999-12-31')
    })
  }, [planner.tasks, subjectFilter, taskFilter, today])

  const currentWeekStart = new Date()
  currentWeekStart.setDate(
    currentWeekStart.getDate() - ((currentWeekStart.getDay() + 6) % 7) + weekOffset * 7,
  )
  const weekDays = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(currentWeekStart)
    date.setDate(currentWeekStart.getDate() + index)
    return getLocalDate(date)
  })
  const todaysSessions = planner.sessions
    .filter((session) => session.date === today)
    .sort((a, b) => a.startTime.localeCompare(b.startTime))

  function submitEntry(event) {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget).entries())
    const existing = modal.entry
    const id = existing?.id ?? createId()

    if (modal.type === 'task') {
      const task = {
        id,
        title: values.title.trim(),
        subject: values.subject.trim(),
        description: values.description.trim(),
        dueDate: values.dueDate,
        priority: values.priority,
        completed: existing?.completed ?? false,
      }
      savePlanner({
        ...planner,
        tasks: existing
          ? planner.tasks.map((item) => item.id === id ? task : item)
          : [...planner.tasks, task],
      })
      setNotice(existing ? 'Task updated.' : 'Task added.')
    } else if (modal.type === 'session') {
      if (values.endTime <= values.startTime) {
        setModalError('End time must be later than start time.')
        return
      }
      const session = {
        id,
        subject: values.subject.trim(),
        date: values.date,
        startTime: values.startTime,
        endTime: values.endTime,
        notes: values.notes.trim(),
      }
      savePlanner({
        ...planner,
        sessions: existing
          ? planner.sessions.map((item) => item.id === id ? session : item)
          : [...planner.sessions, session],
      })
      setNotice(existing ? 'Study session updated.' : 'Study session added.')
    } else {
      const goal = {
        id,
        title: values.title.trim(),
        target: Number(values.target),
        current: Number(values.current),
        unit: values.unit.trim(),
      }
      savePlanner({
        ...planner,
        goals: existing
          ? planner.goals.map((item) => item.id === id ? goal : item)
          : [...planner.goals, goal],
      })
      setNotice(existing ? 'Goal updated.' : 'Goal added.')
    }
    closeModal()
  }

  function deleteEntry(type, id) {
    const label = type === 'task' ? 'task' : type === 'session' ? 'study session' : 'goal'
    if (!window.confirm(`Delete this ${label}?`)) return
    const key = type === 'task' ? 'tasks' : type === 'session' ? 'sessions' : 'goals'
    savePlanner({ ...planner, [key]: planner[key].filter((item) => item.id !== id) })
    setNotice(`${label.charAt(0).toUpperCase()}${label.slice(1)} deleted.`)
  }

  function toggleTask(task) {
    savePlanner({
      ...planner,
      tasks: planner.tasks.map((item) =>
        item.id === task.id ? { ...item, completed: !item.completed } : item,
      ),
    })
  }

  return (
    <div className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <Link className="dashboard-brand" to="/">
          <span className="brand-mark" aria-hidden="true"><span /><span /><span /></span>
          <span>study<span className="brand-emphasis">mate</span></span>
        </Link>
        <div className="dashboard-side-label">STUDY SPACE</div>
        <nav className="dashboard-nav" aria-label="Student dashboard">
          {NAVIGATION.map((item, index) => (
            <a
              className={`dashboard-nav-link${index === 0 ? ' dashboard-nav-active' : ''}`}
              href={`#${item.target}`}
              key={item.label}
            >
              <span aria-hidden="true">{item.icon}</span>{item.label}
            </a>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <span aria-hidden="true">✦</span>
            <strong>Your private study space</strong>
            <p>Your planner saves only in this browser. It is not synced to an account.</p>
          </div>
          <Link className="sidebar-home-link" to="/">← Back to home</Link>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="preview-banner">
          <span className="preview-banner-dot" />
          Local planner <span>— data is saved only on this device and browser.</span>
        </div>
        <header className="dashboard-topbar">
          <div className="dashboard-breadcrumb">Study space <span>/</span> Overview</div>
          <div className="dashboard-profile">
            <span className="profile-avatar">S</span>
            <span><strong>StudyMate</strong><small>Local planner</small></span>
          </div>
        </header>

        <div className="dashboard-content" id="overview">
          <Overview
            completedCount={completedCount}
            openModal={openModal}
            overdueCount={overdueCount}
            pendingCount={pendingCount}
            taskCount={planner.tasks.length}
          />

          <div className="dashboard-panel-grid">
            <MyTask
              deleteEntry={deleteEntry}
              formatDate={formatDate}
              openModal={openModal}
              setSubjectFilter={setSubjectFilter}
              setTaskFilter={setTaskFilter}
              subjectFilter={subjectFilter}
              subjects={subjects}
              taskFilter={taskFilter}
              tasks={planner.tasks}
              toggleTask={toggleTask}
              visibleTasks={visibleTasks}
            />
            <Timetable
              deleteEntry={deleteEntry}
              formatDate={formatDate}
              openModal={openModal}
              sessions={planner.sessions}
              setWeekOffset={setWeekOffset}
              today={today}
              todaysSessions={todaysSessions}
              weekDays={weekDays}
            />
            <Goal deleteEntry={deleteEntry} goals={planner.goals} openModal={openModal} />
          </div>

          {notice && <div aria-live="polite" className="notice-message">{notice}<button aria-label="Dismiss message" onClick={() => setNotice('')} type="button">×</button></div>}
          {storageIssue && <div aria-live="assertive" className="storage-warning">{storageIssue}</div>}
          <p className="dashboard-footnote">Your planner is stored in this browser only. Clearing browser data removes it; it does not sync between devices.</p>
        </div>
      </main>

      {modal && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) closeModal() }}>
          <section aria-labelledby="planner-modal-title" aria-modal="true" className="planner-modal" role="dialog">
            <div className="modal-heading">
              <div><span className="panel-eyebrow">{modal.entry ? 'UPDATE YOUR PLAN' : 'MAKE A PLAN'}</span><h2 id="planner-modal-title">{modal.entry ? 'Edit' : 'Add'} {modal.type === 'session' ? 'study session' : modal.type === 'goal' ? 'study goal' : 'task'}</h2></div>
              <button aria-label="Close dialog" className="modal-close" onClick={closeModal} type="button">×</button>
            </div>
            <form className="planner-form" onSubmit={submitEntry}>
              {modal.type === 'task' && (
                <>
                  <label>Task title<input autoFocus defaultValue={modal.entry?.title ?? ''} maxLength="120" name="title" placeholder="e.g. Review biology notes" required /></label>
                  <label>Subject<input defaultValue={modal.entry?.subject ?? ''} maxLength="60" name="subject" placeholder="e.g. Biology" /></label>
                  <label>Description<textarea defaultValue={modal.entry?.description ?? ''} maxLength="500" name="description" placeholder="Add a note (optional)" rows="3" /></label>
                  <div className="form-row">
                    <label>Due date<input defaultValue={modal.entry?.dueDate ?? ''} name="dueDate" type="date" /></label>
                    <label>Priority<select defaultValue={modal.entry?.priority ?? 'Medium'} name="priority"><option>Low</option><option>Medium</option><option>High</option></select></label>
                  </div>
                </>
              )}
              {modal.type === 'session' && (
                <>
                  <label>Subject<input autoFocus defaultValue={modal.entry?.subject ?? ''} maxLength="60" name="subject" placeholder="e.g. Mathematics" required /></label>
                  <label>Date<input defaultValue={modal.entry?.date ?? today} name="date" required type="date" /></label>
                  <div className="form-row">
                    <label>Start time<input defaultValue={modal.entry?.startTime ?? '09:00'} name="startTime" required type="time" /></label>
                    <label>End time<input defaultValue={modal.entry?.endTime ?? '10:00'} name="endTime" required type="time" /></label>
                  </div>
                  <label>Notes<textarea defaultValue={modal.entry?.notes ?? ''} maxLength="300" name="notes" placeholder="Optional notes" rows="3" /></label>
                </>
              )}
              {modal.type === 'goal' && (
                <>
                  <label>Goal name<input autoFocus defaultValue={modal.entry?.title ?? ''} maxLength="100" name="title" placeholder="e.g. Complete revision chapters" required /></label>
                  <div className="form-row">
                    <label>Target<input defaultValue={modal.entry?.target ?? 10} min="1" name="target" required type="number" /></label>
                    <label>Unit<input defaultValue={modal.entry?.unit ?? 'sessions'} maxLength="30" name="unit" placeholder="e.g. hours" required /></label>
                  </div>
                  <label>Current progress<input defaultValue={modal.entry?.current ?? 0} min="0" name="current" required type="number" /></label>
                </>
              )}
              {modalError && <p aria-live="assertive" className="form-error">{modalError}</p>}
              <div className="modal-actions">
                <button className="button button-secondary" onClick={closeModal} type="button">Cancel</button>
                <button className="button button-primary" type="submit">{modal.entry ? 'Save changes' : 'Add to planner'}</button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  )
}
