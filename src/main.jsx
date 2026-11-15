import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const promises = [
  { number: '01', title: 'Pause before I react', copy: 'When I feel overwhelmed, I will take a breath and give myself a moment instead of letting frustration choose my words.' },
  { number: '02', title: 'Listen to understand', copy: 'I will make room for your feelings without interrupting, minimising them, or turning the conversation into a defence.' },
  { number: '03', title: 'Let my actions speak', copy: 'I know consistency matters more than a beautiful promise. I want you to feel the difference in how I show up.' }
];

const chapters = [
  { eyebrow: '01 / HONESTY', title: 'I was wrong to speak that way.', copy: 'I have been thinking about our fight and the things I said. I was angry, but anger does not make hurtful words okay. You did not deserve them. I am not going to hide behind the moment or make excuses for how I made you feel.' },
  { eyebrow: '02 / ACCOUNTABILITY', title: 'Your feelings deserve room.', copy: 'I cannot take those words back, and I will not pretend they did not hurt. I want to hear how it felt for you — properly, patiently, and without interrupting to explain myself. I am sorry for the hurt I caused.' },
  { eyebrow: '03 / WHAT I MEAN', title: 'I want to love you more carefully.', copy: 'I want us to be able to disagree without making each other feel small. I want to bring patience into the difficult moments, not only the easy ones. I know that has to show in what I do next.' }
];

function App() {
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState('');
  const [opened, setOpened] = useState(false);
  const [entered, setEntered] = useState(false);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    let cancelled = false;
    const revealIntro = () => {
      // Let the stylesheet and the intro DOM reach the browser before
      // removing the static first-paint cover.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (cancelled) return;
        document.body.classList.remove('booting');
        document.getElementById('boot-screen')?.remove();
      }));
    };
    if (document.readyState === 'complete') {
      if (document.fonts?.ready) document.fonts.ready.then(revealIntro);
      else revealIntro();
    } else {
      window.addEventListener('load', revealIntro, { once: true });
    }
    return () => {
      cancelled = true;
      window.removeEventListener('load', revealIntro);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    let id = 0;
    const timer = window.setInterval(() => {
      const next = { id: ++id, left: 5 + Math.random() * 90, size: 10 + Math.random() * 14 };
      setHearts(items => [...items.slice(-11), next]);
    }, 1900);
    return () => window.clearInterval(timer);
  }, []);

  const go = next => {
    setStep(Math.max(0, Math.min(5, next)));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const restart = () => { setAnswer(''); setOpened(false); setEntered(false); go(0); };

  return (
    <main className="site-shell">
      <div className="film-grain" aria-hidden="true" />
      <div className="orb orb-one" aria-hidden="true" />
      <div className="orb orb-two" aria-hidden="true" />
      <div className="floating-hearts" aria-hidden="true">
        {hearts.map(heart => <span key={heart.id} style={{ left: heart.left + '%', fontSize: heart.size + 'px' }}>♡</span>)}
      </div>

      {!entered && <section className="cinema-intro" aria-label="A little note for Princess">
        <div className="cinema-letterbox top" /><div className="cinema-letterbox bottom" />
        <div className="cinema-light" aria-hidden="true" />
        <div className="cinema-scene-art" aria-hidden="true"><span className="scene-heart">♡</span><span className="scene-spark spark-a">✦</span><span className="scene-spark spark-b">✧</span><span className="scene-spark spark-c">✦</span></div>
        <div className="cinema-frame">
          <span className="cinema-overline">A MESSAGE I SHOULD HAVE SAID SOONER</span>
          <div className="cinema-beat beat-one">In every story,</div>
          <div className="cinema-beat beat-two">there are moments</div>
          <div className="cinema-beat beat-three">we wish we could rewrite.</div>
          <div className="cinema-title-wrap"><div className="cinema-title-rule" /><p>but some people</p><h1>are worth <em>everything.</em></h1><div className="cinema-title-rule" /></div>
          <div className="cinema-name"><span>FOR MY</span><strong>Princess<span>.</span></strong></div>
          <p className="cinema-subtitle">This is for you. And only you.</p>
          <button className="button-primary cinema-enter" onClick={() => setEntered(true)}>Begin <span>↗</span></button>
          <span className="cinema-foot">TAKE YOUR TIME · READ WITH YOUR HEART</span>
        </div>
      </section>}

      <header className="masthead">
        <button className="brand" onClick={restart} aria-label="Start again">a little love note <span>✳</span></button>
        <div className="masthead-right"><span>PRIVATE LETTER</span><i>✦</i><span>MADE FOR YOU</span></div>
      </header>

      <div className="journey-track" aria-label={'Chapter ' + (step + 1) + ' of 5'}>
        <span style={{ width: Math.min(((step + 1) / 5) * 100, 100) + '%' }} />
      </div>

      {step === 0 && (
        <section className="scene opening" key="opening">
          <div className="eyebrow"><span /> A NOTE FROM MY HEART <span /></div>
          <div className="hero-emblem" aria-hidden="true"><div className="emblem-ring">✧</div><span>♡</span></div>
          <p className="script-line">for my</p>
          <h1>Princess<span className="rose-dot">.</span></h1>
          <p className="opening-copy">Some things deserve more than a quick message.<br />I wanted to say this with all the care I should have shown.</p>
          <button className="button-primary" onClick={() => { setOpened(true); go(1); }}>Read my letter <span>↗</span></button>
          <p className="whisper">A quiet moment. No rush. Just us.</p>
          <div className="scroll-cue"><span /> TAKE YOUR TIME</div>
        </section>
      )}

      {step === 1 && (
        <section className="scene letter-scene" key="letter">
          <div className="section-kicker">A LETTER, JUST FOR YOU <span>✦</span></div>
          <div className={'letter-stage ' + (opened ? 'is-open' : '')}>
            <div className="envelope-back" />
            <article className="paper">
              <div className="paper-top"><span>FROM MY HEART</span><span>♡</span></div>
              <h2>My Princess,</h2>
              <p>I am truly sorry for the things I said when we fought. I know words can stay with someone long after an argument ends, and I hate that mine may have made you feel hurt, unappreciated, or anything less than loved.</p>
              <p>I was upset, but that is not an excuse. You deserved patience, care, and respect from me — especially in a difficult moment. I should have handled my feelings differently.</p>
              <p>I love you, and I am sorry I did not show that in the way I spoke.</p>
              <div className="letter-signoff">with all my heart,<strong>me <span>♡</span></strong></div>
            </article>
            <div className="envelope-front" />
            <div className="wax-seal">♡</div>
          </div>
          <p className="letter-caption">Not an excuse. Not a request to forget. Just an apology I mean.</p>
          <button className="button-primary" onClick={() => go(2)}>There is more I want you to know <span>↗</span></button>
        </section>
      )}

      {step === 2 && (
        <section className="scene words-scene" key="words">
          <div className="section-kicker">A FEW THINGS I NEED TO OWN <span>✦</span></div>
          <div className="chapter-stack">
            {chapters.map((chapter, index) => (
              <article className="chapter-card" key={chapter.eyebrow}>
                <div className="chapter-meta"><span>{chapter.eyebrow}</span><i>0{index + 1}</i></div>
                <h2>{chapter.title}</h2>
                <p>{chapter.copy}</p>
              </article>
            ))}
          </div>
          <div className="quiet-quote"><span>“</span><p>I want to understand the hurt, not win the argument.</p></div>
          <button className="button-primary" onClick={() => go(3)}>What I want to change <span>↗</span></button>
        </section>
      )}

      {step === 3 && (
        <section className="scene promises-scene" key="promises">
          <div className="section-kicker">MORE THAN WORDS <span>✦</span></div>
          <p className="script-line">I want to</p>
          <h2 className="display-heading">do better<span>.</span></h2>
          <p className="promise-intro">Not perfectly overnight. But honestly, deliberately, and consistently.</p>
          <div className="promise-grid">
            {promises.map(item => (
              <article className="promise-card" key={item.number}>
                <div className="promise-number">{item.number}<span> / 03</span></div>
                <div className="promise-icon">♡</div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
          <p className="promise-footnote">I know trust is built in the moments after this letter, not by the letter itself.</p>
          <button className="button-primary" onClick={() => go(4)}>One last thing <span>↗</span></button>
        </section>
      )}

      {step === 4 && (
        <section className="scene ending-scene" key="ending">
          <div className="ending-halo" aria-hidden="true"><span>♡</span></div>
          <p className="script-line">more than being right,</p>
          <h2 className="display-heading">I choose <em>us.</em></h2>
          <p className="ending-copy">I don't want to lose what we have over a moment I wish I had handled differently. I love you. I miss being okay with you. And I want to keep learning how to love you better.</p>
          <div className="ending-divider"><span />♡<span /></div>
          <h3>Can you forgive me, Princess?</h3>
          <p className="gentle-note">You do not have to answer before you are ready. Your feelings matter, and I will respect the time you need.</p>
          {!answer ? (
            <div className="answer-actions">
              <button className="button-primary" onClick={() => { setAnswer('yes'); go(5); }}>I forgive you <span>♡</span></button>
              <button className="button-quiet" onClick={() => setAnswer('time')}>I need a little time</button>
            </div>
          ) : (
            <div className="response-note" role="status">
              <div>{answer === 'yes' ? '♡' : '✧'}</div>
              <h4>{answer === 'yes' ? 'Thank you, my Princess.' : 'That is okay, my Princess.'}</h4>
              <p>{answer === 'yes' ? 'I will not take your forgiveness for granted. I want my actions to show you how much you mean to me.' : 'Take all the time you need. I am here when you feel ready to talk. I love you, and I respect how you feel.'}</p>
            </div>
          )}
          <div className="final-signature">always, <strong>me <span>♡</span></strong></div>
          <button className="restart-link" onClick={restart}>↺ &nbsp; read this again</button>
        </section>
      )}

      {step === 5 && (
        <section className="scene smile-scene" key="smile">
          <div className="smile-orbit" aria-hidden="true"><span>♡</span><i>✦</i></div>
          <div className="section-kicker">A LITTLE BONUS, ONLY IF YOU FEEL LIKE IT <span>✦</span></div>
          <p className="script-line">if your heart feels a little lighter,</p>
          <h2 className="display-heading">send me a <em>smile.</em></h2>
          <p className="smile-copy">If you really have forgiven me and feel like sharing it, send me a photo of that beautiful smile of yours. It would make my day to see it.</p>
          <p className="smile-gentle">No pressure, Princess. No photo is needed to prove anything. Your forgiveness, your time, and your feelings are yours — and I will respect them.</p>
          <div className="smile-ornament">♡ <span>✧</span> ♡</div>
          <p className="smile-signoff">I hope I give you more reasons to smile. <strong>Always, me.</strong></p>
          <button className="restart-link" onClick={restart}>↺ &nbsp; read this again</button>
        </section>
      )}

      {step < 5 && <footer className="bottom-bar">
        {step > 0 ? <button onClick={() => go(step - 1)}>← BACK</button> : <span />}
        <div className="chapter-dots" aria-label="Choose a chapter">
          {[0, 1, 2, 3, 4].map(n => <button key={n} className={step === n ? 'active' : ''} onClick={() => go(n)} aria-label={'Go to chapter ' + (n + 1)} />)}
        </div>
        {step < 4 ? <button onClick={() => go(step + 1)}>CONTINUE →</button> : <span />}
      </footer>}
      <div className="copyright">MADE WITH LOVE, JUST FOR YOU <span>♡</span></div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
