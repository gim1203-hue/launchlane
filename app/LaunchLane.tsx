"use client";
import { useEffect, useState } from "react";

const steps = [
  ["Define the promise", "Write one clear sentence explaining the result your idea creates."],
  ["Listen before building", "Ask three people what frustrates them and what they use today."],
  ["Choose the useful core", "Keep one essential outcome and postpone everything else."],
  ["Build the first version", "Create the smallest experience someone can understand and use."],
  ["Test with real people", "Watch five people use it and record every confusing moment."],
  ["Polish what matters", "Improve trust, clarity, speed, accessibility, and mobile usability."],
  ["Tell the launch story", "Show the problem, the transformation, and one clear next action."],
  ["Launch and learn", "Share with a focused group, gather feedback, and improve again."],
];

export default function LaunchLane() {
  const [project, setProject] = useState("My next project");
  const [audience, setAudience] = useState("people who want a simpler way forward");
  const [hours, setHours] = useState(6);
  const [done, setDone] = useState<number[]>([]);
  const [focus, setFocus] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let saved: { project?: string; audience?: string; hours?: number; done?: number[] } | null = null;
    try {
      saved = JSON.parse(localStorage.getItem("launchlane") || "null");
    } catch {
      saved = null;
    }
    queueMicrotask(() => {
      if (saved) {
        setProject(saved.project || "My next project");
        setAudience(saved.audience || "people who want a simpler way forward");
        setHours(saved.hours || 6);
        setDone(saved.done || []);
      }
      setReady(true);
    });
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("launchlane", JSON.stringify({ project, audience, hours, done })); }, [project, audience, hours, done, ready]);

  const progress = Math.round(done.length / steps.length * 100);
  const next = steps.findIndex((_, i) => !done.includes(i));
  const toggle = (i:number) => setDone((d) => d.includes(i) ? d.filter((n) => n !== i) : [...d, i]);

  return <main>
    <nav className="nav shell"><a className="brand" href="#top"><b>LL</b>LaunchLane</a><div className="links"><a href="#planner">Planner</a><a href="#method">Method</a></div><a className="btn small" href="#planner">Build my plan</a></nav>
    <section className="hero shell" id="top">
      <div><p className="eyebrow">FROM MAYBE TO MOMENTUM</p><h1>Turn your next idea into a launch you can finish.</h1><p className="lead">A focused four-week roadmap, a realistic workload, and one clear next step—without the noise.</p><div className="actions"><a className="btn" href="#planner">Create my roadmap</a><a href="#method" className="learn">See how it works →</a></div><div className="trust"><span>✓ No account</span><span>✓ Saves on this device</span><span>✓ Free to use</span></div></div>
      <div className="snapshot"><div className="snaphead"><span>● &nbsp;PROJECT SNAPSHOT</span><b>{progress}%</b></div><h2>{project}</h2><p>For {audience}</p><div className="bar"><i style={{width:`${progress}%`}} /></div><div className="stats"><div><small>PACE</small><strong>{hours} hrs/week</strong></div><div><small>NEXT MOVE</small><strong>{next < 0 ? "Launch complete" : steps[next][0]}</strong></div></div></div>
    </section>
    <section className="planner" id="planner"><div className="shell"><header className="sectionhead"><p className="eyebrow">YOUR LAUNCH WORKSPACE</p><h2>A practical plan, shaped around your time.</h2><p>Change the details. Your roadmap updates instantly and saves automatically on this device.</p></header>
      <div className="workspace"><aside className="setup"><label>Project name<input value={project} onChange={e=>setProject(e.target.value)} maxLength={48}/></label><label>Who is it for?<textarea value={audience} onChange={e=>setAudience(e.target.value)} rows={3} maxLength={120}/></label><label>Hours each week <output>{hours}</output><input aria-label="Hours available each week" className="range" type="range" min="2" max="20" value={hours} onChange={e=>setHours(+e.target.value)}/></label><div className="capacity"><small>SUGGESTED RHYTHM</small><strong>{Math.max(1,Math.round(hours/2))} hours, twice a week</strong></div><button className="reset" onClick={()=>setDone([])}>Reset progress</button></aside>
      <section className="roadmap"><div className="roadhead"><div><small>{progress}% COMPLETE</small><h3>{focus ? "Today’s focus" : "Four-week roadmap"}</h3></div><div className="tabs"><button className={!focus?"active":""} onClick={()=>setFocus(false)}>Full plan</button><button className={focus?"active":""} onClick={()=>setFocus(true)}>Next step</button></div></div>
      {focus ? <div className="focus"><span>NEXT ACTION</span><h3>{next < 0 ? "Roadmap complete" : steps[next][0]}</h3><p>{next < 0 ? "Review what you learned and choose the next small improvement." : steps[next][1]}</p>{next>=0&&<button className="btn" onClick={()=>toggle(next)}>Mark complete</button>}</div> : <div>{[0,1,2,3].map(w=><div className="week" key={w}><div className="weekname"><b>0{w+1}</b><span><strong>Week {w+1}</strong><small>{["Listen & define","Shape & build","Test & refine","Share & learn"][w]}</small></span></div><div>{steps.slice(w*2,w*2+2).map((s,j)=>{const i=w*2+j;return <button className={`task ${done.includes(i)?"done":""}`} key={i} onClick={()=>toggle(i)}><i>{done.includes(i)?"✓":""}</i><span><strong>{s[0]}</strong><small>{s[1]}</small></span></button>})}</div></div>)}</div>}
      </section></div></div></section>
    <section className="method shell" id="method"><header className="sectionhead"><p className="eyebrow">BUILT FOR REAL PROGRESS</p><h2>Less performance. More forward motion.</h2></header><div className="cards"><article><b>01</b><h3>Start with evidence</h3><p>Listen before you build, so your energy goes toward a problem people truly care about.</p></article><article><b>02</b><h3>Protect the core</h3><p>A small, useful project finished well creates more value than a large idea that never ships.</p></article><article><b>03</b><h3>Learn in public</h3><p>Launch to a focused group and let real feedback shape what comes next.</p></article></div></section>
    <section className="cta"><div className="shell"><p className="eyebrow">YOUR IDEA DESERVES A FAIR START</p><h2>Make the next step small enough to begin today.</h2><a className="btn light" href="#planner">Open my launch plan</a></div></section>
    <footer className="shell"><a className="brand" href="#top"><b>LL</b>LaunchLane</a><p>Your plan stays private on this device.</p><a href="#top">Back to top ↑</a></footer>
  </main>
}
