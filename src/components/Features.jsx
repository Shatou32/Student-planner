const features = [
  {
    icon: '✓',
    title: 'Stay on top of tasks',
    description:
      'Keep assignments, deadlines, and priorities in one calm, organized space.',
    tone: 'lavender',
  },
  {
    icon: '▦',
    title: 'Build a better routine',
    description:
      'Plan focused study sessions across your week and make time for every subject.',
    tone: 'peach',
  },
  {
    icon: '↗',
    title: 'See your progress',
    description:
      'Turn small study habits into visible progress toward the goals that matter.',
    tone: 'mint',
  },
]

function Features() {
  return (
    <section className="features-section" id="features">
      <div className="section-heading">
        <span className="section-kicker">A planner that gets you</span>
        <h2>Less juggling. More <span>you.</span></h2>
        <p>Everything you need to feel more in control of your study week.</p>
      </div>
      <div className="feature-grid">
        {features.map((feature, index) => (
          <article className="feature-card" key={feature.title}>
            <div className={`feature-icon ${feature.tone}`} aria-hidden="true">{feature.icon}</div>
            <span className="feature-number">0{index + 1}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Features
