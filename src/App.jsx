import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Code2, Layers3, ShoppingBag, Wrench, Menu, X, CheckCircle2, MoveUpRight, Sparkles, Globe2, MonitorSmartphone } from 'lucide-react'
import { projects } from './data/projects'
import { site } from './config/site'

const filters = ['All', 'Shopify', 'WordPress', 'E-commerce', 'Corporate']
const matchesFilter = (project, filter) => filter === 'All' || project.category === filter || project.platform === filter || (filter === 'WordPress' && project.platform.startsWith('WordPress'))
const services = [
  { n: '01', icon: Layers3, title: 'WordPress development', text: 'Professional websites shaped around your brand, content, and business goals.', points: ['Theme & page customization', 'Elementor and Gutenberg', 'Responsive redesigns'] },
  { n: '02', icon: ShoppingBag, title: 'Shopify development', text: 'Thoughtful storefronts with custom sections and smooth product experiences.', points: ['Custom Liquid sections', 'Product & collection pages', 'Theme customization'] },
  { n: '03', icon: Code2, title: 'E-commerce customization', text: 'Flexible storefront features that help customers explore and shop with confidence.', points: ['Product interfaces', 'Custom storefront components', 'Cart experience improvements'] },
  { n: '04', icon: Wrench, title: 'Website improvements', text: 'Make your existing website more consistent, responsive, and dependable.', points: ['Responsive fixes', 'Technical troubleshooting', 'Performance fundamentals'] },
]
const capabilities = ['Custom Shopify Liquid sections', 'WordPress theme customization', 'Responsive front-end implementation', 'Product and variant interfaces', 'Cross-device layout refinement', 'Website troubleshooting & maintenance']

function SectionHeading({ eyebrow, title, copy }) { return <motion.div className="section-heading" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ duration: 0.55, ease: 'easeOut' }}><span className="eyebrow"><i />{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</motion.div> }
function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [['Services', '#services'], ['Work', '#work'], ['About', '#about'], ['Contact', '#contact']]
  return <header className="navbar"><a className="brand" href="#home" aria-label="Travish Shaikh home"><span className="brand-mark">T<span>.</span></span><span>TRAVISH SHAIKH<small>INDEPENDENT DEVELOPER</small></span></a><nav className={open ? 'nav-links open' : 'nav-links'}>{links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-cta" href="#contact" onClick={() => setOpen(false)}>Start a project <ArrowUpRight size={15}/></a></nav><button className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button></header>
}
function Hero() { return <section id="home" className="hero container"><div className="hero-copy"><motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }} className="availability"><span className="pulse"/> AVAILABLE FOR SELECT PROJECTS</motion.div><motion.h1 initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .08 }}>I build websites that <em>move businesses forward.</em></motion.h1><motion.p className="hero-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .25 }}>I'm Travish Shaikh, a WordPress and Shopify developer helping businesses create modern websites, customized storefronts, and thoughtful digital experiences.</motion.p><motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .35 }}><a className="button button-lime" href="#work">Explore my work <ArrowDown size={16}/></a><a className="text-link" href="#contact">Discuss a project <ArrowUpRight size={16}/></a></motion.div><div className="hero-tech"><span>MY TOOLKIT</span><div>WordPress <b>·</b> Shopify <b>·</b> Liquid <b>·</b> JavaScript <b>·</b> CSS</div></div></div><motion.div className="hero-art" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }}><div className="art-grid"/><div className="browser browser-back"><div className="browser-top"><i/><i/><i/><span>storefront.liquid</span></div><div className="code-lines"><i/><i/><i/><i/><i/><i/><i/><i/></div></div><div className="browser browser-front"><div className="browser-top"><i/><i/><i/><span>your next website</span></div><div className="mock-page"><div className="mock-brand">STUDIO / 01</div><div className="mock-title">Good ideas,<br/><em>built well.</em></div><div className="mock-button">EXPLORE <ArrowUpRight size={12}/></div><div className="mock-bottom"><span>DESIGN</span><span>DEVELOPMENT</span></div></div></div><div className="art-chip chip-top"><Sparkles size={15}/><span>Thoughtful by design</span></div><div className="art-chip chip-bottom"><span className="chip-check"><CheckCircle2 size={16}/></span><span>Responsive by default</span></div><div className="art-index">01 <span>/</span> DIGITAL CRAFT</div></motion.div><a className="scroll-cue" href="#services"><span>SCROLL TO EXPLORE</span><ArrowDown size={14}/></a></section> }
function Services() { return <section id="services" className="section container"><SectionHeading eyebrow="WHAT I CAN HELP WITH" title={<>Digital solutions,<br/><em>built around your business.</em></>} copy="From launching a new website to improving an existing store, I help businesses create digital experiences that are practical, polished, and easy to use."/><div className="services-grid">{services.map(s => <article className="service-card" key={s.n}><div className="service-top"><span>{s.n}</span><s.icon size={21}/></div><h3>{s.title}</h3><p>{s.text}</p><ul>{s.points.map(p => <li key={p}>{p}</li>)}</ul><a href="#contact" aria-label={`Discuss ${s.title}`} className="round-arrow"><ArrowUpRight size={18}/></a></article>)}</div></section> }
function ProjectCard({ project, index }) {
  const [screenshotFailed, setScreenshotFailed] = useState(false)
  const screenshotUrl = `https://image.thum.io/get/width/900/crop/600/noanimate/${project.url}`
  return <motion.article className={`project-card project-${index % 2}`} layout initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .45, delay: (index % 2) * .06 }}>
    <a className={`project-image image-${project.image}`} href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.name}`}>
      {!screenshotFailed ? <img className="project-screenshot" src={screenshotUrl} alt={`Screenshot preview of ${project.name} website`} loading="lazy" onError={() => setScreenshotFailed(true)} /> : <div className="preview-browser"><div className="preview-bar"><span/><span/><span/><small>{new URL(project.url).hostname}</small></div><div className="preview-content"><span className="preview-kicker">{project.category.toUpperCase()} / SELECTED WORK</span><div className="preview-heading">{project.name}<i>.</i></div><div className="preview-rule"/><div className="preview-lines"><i/><i/><i/></div><div className="preview-orb"/><div className="preview-foot">EXPLORE MORE <ArrowUpRight size={13}/></div></div></div>}
      <span className="image-visit">Visit website <ArrowUpRight size={14}/></span>
    </a>
    <div className="project-info"><div><span className="project-category">{project.category} <i>·</i> {project.platform}</span><h3>{project.name}</h3><p>{project.description}</p><div className="tags">{project.technologies.map(t => <span key={t}>{t}</span>)}</div></div><a className="project-arrow" href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}><ArrowUpRight size={20}/></a></div>
  </motion.article>
}
function Projects() { const [filter, setFilter] = useState('All'); const visible = useMemo(() => projects.filter(p => p.contributionVerified && matchesFilter(p, filter)), [filter]); return <section id="work" className="section work-section"><div className="container"><SectionHeading eyebrow="SELECTED WORK · 2024—2026" title={<>A selection of websites<br/><em>I've worked on.</em></>} copy="A growing collection of business websites and e-commerce experiences across platforms and industries."/><div className="filter-row" role="group" aria-label="Filter projects">{filters.map(f => <button key={f} className={filter === f ? 'filter active' : 'filter'} onClick={() => setFilter(f)}>{f}<span>{f === 'All' ? projects.filter(p=>p.contributionVerified).length : projects.filter(p=>p.contributionVerified && matchesFilter(p, f)).length}</span></button>)}</div><div className="projects-grid">{visible.map((p, i) => <ProjectCard key={p.id} project={p} index={i}/>)}</div><div className="work-note"><span className="note-mark">↗</span><p>Have a project with a different set of challenges? <a href="#contact">Let's talk about it.</a></p></div></div></section> }
function About() { return <section id="about" className="section container about-section"><div className="about-left"><SectionHeading eyebrow="THE PERSON BEHIND THE CODE" title={<>Thoughtful development.<br/><em>Practical solutions.</em></>} /><p className="about-copy">I'm Travish Shaikh, a web developer specializing in WordPress and Shopify. I work on websites that need thoughtful layouts, reliable functionality, and a polished user experience—from customizing Shopify themes and building Liquid sections to developing WordPress pages and improving responsive interfaces.</p><a href="#contact" className="text-link">A little more about working together <ArrowUpRight size={16}/></a></div><div className="about-right"><div className="about-stat"><span className="stat-symbol">{`{ }`}</span><div><strong>Design-minded</strong><p>Care for the details that make a digital experience feel right.</p></div></div><div className="about-stat"><span className="stat-symbol"><MonitorSmartphone size={23}/></span><div><strong>Built for real devices</strong><p>Responsive layouts that work across screen sizes.</p></div></div><div className="about-stat"><span className="stat-symbol"><Globe2 size={23}/></span><div><strong>Business-first</strong><p>Practical implementation shaped around your needs.</p></div></div></div></section> }
function Capabilities() { return <section className="capabilities-section"><div className="container capabilities-layout"><div><span className="eyebrow"><i/> THE DETAILS MATTER</span><h2>Good work lives<br/>in the <em>details.</em></h2><p className="cap-intro">From the first responsive breakpoint to the final interaction, the small things add up.</p></div><div className="cap-list">{capabilities.map((c, i) => <div className="cap-item" key={c}><span>0{i+1}</span><p>{c}</p><ArrowUpRight size={16}/></div>)}</div></div></section> }
function Process() { const steps = [['01','Discover','Understand the business, audience, requirements, and existing setup.'],['02','Plan','Define scope, page structure, functionality, and visual direction.'],['03','Build','Implement the experience and refine it across devices.'],['04','Deliver','Test the details and prepare a clean handoff.']]; return <section className="section container process-section"><SectionHeading eyebrow="A CLEAR PROCESS" title={<>From first conversation<br/><em>to launch day.</em></>} copy="A straightforward, collaborative process keeps the project focused and the next step clear."/><div className="process-grid">{steps.map(([n,t,d])=><article className="process-step" key={n}><span className="step-number">{n}</span><div className="step-line"/><h3>{t}</h3><p>{d}</p></article>)}</div></section> }
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', type: 'WordPress Website', budget: 'Not sure yet', message: '' })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const update = e => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = async e => {
    e.preventDefault()
    if (isSubmitting) return
    const honey = e.currentTarget.querySelector('[name="_honey"]')?.value || ''
    if (honey) { setStatus('Unable to send this inquiry.'); return }
    if (!site.email) { setStatus('The contact email is not configured. Please try again later.'); return }
    setIsSubmitting(true)
    setStatus('Sending your inquiry…')
    try {
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...form,
          _subject: `Portfolio inquiry — ${form.type}`,
          _replyto: form.email,
          _honey: honey
        })
      })
      let result
      try {
        result = await response.json()
      } catch {
        throw new Error('The email service returned an unreadable response. Please check the deployed site and try again.')
      }
      if (!response.ok || String(result.success) !== 'true') {
        throw new Error(result.message || 'The email service rejected this inquiry. Check the recipient activation email and try again.')
      }
      setStatus(`Inquiry submitted successfully. If this is your first submission, check ${site.email} for a FormSubmit activation email and confirm it to enable delivery.`)
      setForm({ name: '', email: '', company: '', type: 'WordPress Website', budget: 'Not sure yet', message: '' })
    } catch (error) {
      console.error('Portfolio contact form submission failed:', error)
      const reason = error instanceof Error && error.message ? error.message : 'A network or browser request error occurred.'
      setStatus(`Could not send inquiry: ${reason} If needed, email ${site.email} directly.`)
    } finally {
      setIsSubmitting(false)
    }
  }
  return <section id="contact" className="contact-section"><div className="container contact-layout">
    <div className="contact-copy"><span className="eyebrow"><i/> HAVE SOMETHING IN MIND?</span><h2>Your next website<br/>starts <em>with a conversation.</em></h2><p>Tell me what you're building, improving, or trying to solve. We'll figure out the right next step together.</p><div className="contact-direct"><span>DIRECT INQUIRIES</span>{site.email ? <a href={`mailto:${site.email}`}>{site.email} <ArrowUpRight size={15}/></a> : <p>Contact email is not configured.</p>}</div><div className="contact-socials">{site.linkedin && <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14}/></a>}{site.github && <a href={site.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14}/></a>}</div></div>
    <form className="contact-form" onSubmit={submit}>
      <div className="honeypot" aria-hidden="true"><label>Leave this field empty<input name="_honey" tabIndex="-1" autoComplete="off" /></label></div>
      <div className="form-heading"><span>PROJECT INQUIRY</span><p>Tell me a little about your project.</p></div>
      <div className="form-two"><label>Your name<input name="name" value={form.name} onChange={update} placeholder="Jane Smith" required autoComplete="name"/></label><label>Email address<input name="email" value={form.email} onChange={update} type="email" placeholder="jane@company.com" required autoComplete="email"/></label></div>
      <label>Company or brand <small>OPTIONAL</small><input name="company" value={form.company} onChange={update} placeholder="Your business name"/></label>
      <div className="form-two"><label>Project type<select name="type" value={form.type} onChange={update}>{['WordPress Website','Shopify Development','E-commerce Customization','Website Redesign','Website Maintenance','Other'].map(x=><option key={x}>{x}</option>)}</select></label><label>Estimated budget<select name="budget" value={form.budget} onChange={update}>{['Not sure yet','Under ₹10,000','₹10,000–₹25,000','₹25,000–₹50,000','₹50,000+'].map(x=><option key={x}>{x}</option>)}</select></label></div>
      <label>Project details<textarea name="message" value={form.message} onChange={update} placeholder="What would you like to build or improve?" rows="4" required/></label>
      <button className="button button-lime submit-button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending inquiry…' : 'Send project inquiry'} <ArrowUpRight size={16}/></button>
      {status && <p className="form-status" role="status">{status}</p>}
      <p className="form-privacy">Your information is used only to respond to your inquiry.</p>
    </form>
  </div></section>
}
function Footer() { return <footer className="footer container"><a className="brand footer-brand" href="#home"><span className="brand-mark">T<span>.</span></span><span>TRAVISH SHAIKH<small>INDEPENDENT DEVELOPER</small></span></a><p>Building better experiences for the web.</p><div><a href="#home">Back to top ↑</a><span>© {new Date().getFullYear()} Travish Shaikh</span></div></footer> }
function FlowCursor() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setEnabled(finePointer.matches && !reducedMotion.matches)
    sync()
    finePointer.addEventListener?.('change', sync)
    reducedMotion.addEventListener?.('change', sync)
    if (!finePointer.matches || reducedMotion.matches) return () => {
      finePointer.removeEventListener?.('change', sync)
      reducedMotion.removeEventListener?.('change', sync)
    }
    document.body.classList.add('has-custom-cursor')
    const aura = document.querySelector('.cursor-aura')
    const ring = document.querySelector('.cursor-ring')
    const dot = document.querySelector('.cursor-dot')
    let frame = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    const move = event => {
      x = event.clientX
      y = event.clientY
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        for (const element of [aura, ring, dot]) {
          if (element) element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
        }
      })
    }
    const hoverOn = event => { if (event.target.closest('a, button, input, textarea, select, [role="button"]')) document.body.classList.add('cursor-hover') }
    const hoverOff = event => { if (event.target.closest('a, button, input, textarea, select, [role="button"]')) document.body.classList.remove('cursor-hover') }
    const down = () => document.body.classList.add('cursor-press')
    const up = () => document.body.classList.remove('cursor-press')
    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', hoverOn)
    document.addEventListener('pointerout', hoverOff)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', hoverOn)
      document.removeEventListener('pointerout', hoverOff)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
      finePointer.removeEventListener?.('change', sync)
      reducedMotion.removeEventListener?.('change', sync)
      document.body.classList.remove('cursor-hover', 'cursor-press', 'has-custom-cursor')
    }
  }, [])
  return <div className={enabled ? 'custom-cursor' : 'custom-cursor cursor-disabled'} aria-hidden="true"><span className="cursor-aura"/><span className="cursor-ring"/><span className="cursor-dot"/></div>
}
export default function App() { return <><FlowCursor/><Navbar/><main><Hero/><div className="marquee"><div>WORDPRESS <i>✳</i> SHOPIFY <i>✳</i> CUSTOM LIQUID <i>✳</i> RESPONSIVE DEVELOPMENT <i>✳</i> WORDPRESS <i>✳</i> SHOPIFY <i>✳</i> CUSTOM LIQUID <i>✳</i></div></div><Services/><Projects/><About/><Capabilities/><Process/><Contact/></main><Footer/></> }
