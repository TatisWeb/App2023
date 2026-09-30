import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, ArrowDown, ArrowRight, Menu, X, Asterisk, MoveUpRight } from 'lucide-react';
import './style.css';
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const projects = [
  { n: '01', name: 'GRAVIROVKA', type: 'Лендинг · разработка', year: '2024', image: '/project-editorial.jpg', url: 'https://www.gravirovka-lg.ru/', className: 'project-warm' },
  { n: '02', name: 'CM STORE', type: 'Интернет-магазин · e-commerce', year: '2024', image: '/project-product.jpg', url: 'https://cmstore.ru/', className: 'project-violet' },
  { n: '03', name: 'CLEAN HOME', type: 'Лендинг · дизайн', year: '2023', image: '/hero-sculpture.jpg', url: 'https://cleanhome61.ru/', className: 'project-dark' },
];
const services = [
  { n: '01', title: 'Дизайн сайтов', description: 'Визуальный язык, который выделяет бренд и превращает первое впечатление в доверие.', tags: 'UI/UX · АЙДЕНТИКА' },
  { n: '02', title: 'Разработка', description: 'Быстрые, адаптивные и продуманные сайты. От эффектного лендинга до интернет-магазина.', tags: 'REACT · WEB · CMS' },
  { n: '03', title: 'Продвижение', description: 'Помогаю вашему продукту находить свою аудиторию и расти вместе с вашим бизнесом.', tags: 'SEO · МАРКЕТИНГ' },
];
function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { nodes.forEach(n => n.classList.add('visible')); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
    nodes.forEach(n => observer.observe(n));
    return () => observer.disconnect();
  }, []);
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef(null);
  useReveal();
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(max > 0 ? y / max * 100 : 0);
        if (heroRef.current && !reduce.matches) heroRef.current.style.setProperty('--scroll-y', `${Math.min(y, 950)}px`);
        frame = 0;
      });
    };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return <>
    <div className="progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />
    <header className="site-header container">
      <a className="brand" href="#top" onClick={closeMenu} aria-label="TatisWeb — наверх"><span className="brand-mark">t<span>.</span></span><span className="brand-text">TATIS<span>WEB</span><small>DESIGN & DEVELOPMENT</small></span></a>
      <nav className={menuOpen ? 'nav open' : 'nav'} aria-label="Основная навигация">
        <a href="#about" onClick={closeMenu}>Обо мне</a><a href="#services" onClick={closeMenu}>Услуги</a><a href="#work" onClick={closeMenu}>Проекты</a>
        <a className="mobile-contact" href="#contact" onClick={closeMenu}>Обсудить проект <ArrowUpRight size={18}/></a>
      </nav>
      <a className="header-cta" href="#contact">Обсудить проект <ArrowUpRight size={16}/></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menuOpen}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>
    <main>
      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-art" aria-hidden="true"><img src={asset("hero-sculpture.jpg")} alt="" fetchPriority="high"/><div className="art-shade"/></div>
        <div className="hero-grain" aria-hidden="true"/>
        <div className="container hero-content">
          <div className="hero-topline"><span className="status-dot"/> НЕЗАВИСИМЫЙ DIGITAL-ДИЗАЙНЕР <span className="topline-number">МОСКВА / РАБОТАЮ ПО ВСЕМУ МИРУ</span></div>
          <div className="hero-main"><p className="eyebrow hero-intro">ПРИВЕТ, Я СЕРГЕЙ ТАРАСЕНКО <span className="line"/></p><h1>САЙТЫ,<br/>КОТОРЫЕ <span className="outline-word">ЧУВСТВУЮТ.</span></h1><div className="hero-bottom"><p>Создаю цифровые пространства, в которых эстетика встречается со смыслом, а идеи становятся результатом.</p><a className="round-link" href="#work" aria-label="Смотреть проекты"><ArrowDown size={25} strokeWidth={1.5}/></a></div></div>
          <div className="hero-footer"><span>DESIGN <span className="plus">✳</span> CODE <span className="plus">✳</span> IMPACT</span><span>ЛИСТАЙТЕ ВНИЗ <ArrowDown size={13}/></span></div>
        </div>
        <span className="hero-vertical" aria-hidden="true">ПОРТФОЛИО / 2026</span>
      </section>
      <div className="ticker" aria-label="Дизайн, разработка, впечатления"><div className="ticker-track">{Array.from({length: 4}, (_,i) => <span key={i}>ДИЗАЙН <Asterisk/> РАЗРАБОТКА <Asterisk/> ВПЕЧАТЛЕНИЕ <Asterisk/></span>)}</div></div>
      <section className="about section container" id="about"><div className="section-kicker reveal"><span className="dot"/> 01 / ЗНАКОМСТВО</div><div className="about-grid"><h2 className="display-title reveal">НЕ ПРОСТО<br/><em>КРАСИВО.</em><br/>ПО ДЕЛУ.</h2><div className="about-copy reveal"><span className="asterisk">✳</span><p className="large-copy">Я верю, что хороший сайт — это не просто набор страниц. Это ощущение, которое остаётся с человеком.</p><p>Меня зовут Сергей Тарасенко. Я разрабатываю сайты и цифровые продукты, объединяя выразительный дизайн, современные технологии и задачи бизнеса. В каждом проекте ищу то, что делает его по-настоящему вашим.</p><a className="text-link" href="#contact">Давайте знакомиться <ArrowUpRight size={18}/></a></div></div><div className="about-bottom reveal"><span>ПОДХОД, В КОТОРОМ ЕСТЬ ХАРАКТЕР</span><span>01 — 03</span></div></section>
      <section className="services section" id="services"><div className="container"><div className="section-kicker reveal"><span className="dot"/> 02 / ЧТО Я ДЕЛАЮ</div><div className="section-heading reveal"><h2 className="display-title">ОТ ИДЕИ<br/>ДО <em>ВАУ.</em></h2><p>Работаю на пересечении дизайна, технологий и стратегии — чтобы каждое решение было красивым и полезным.</p></div><div className="service-list">{services.map(s => <div className="service-row reveal" key={s.n}><span className="service-num">/{s.n}</span><h3>{s.title}</h3><div className="service-detail"><p>{s.description}</p><span>{s.tags}</span></div><ArrowUpRight className="service-arrow" size={26} strokeWidth={1.4}/></div>)}</div><a href="#contact" className="pill-link">Обсудить задачу <ArrowUpRight size={18}/></a></div></section>
      <section className="work section container" id="work"><div className="section-kicker reveal"><span className="dot"/> 03 / ИЗБРАННЫЕ ПРОЕКТЫ</div><div className="section-heading work-heading reveal"><h2 className="display-title">РАБОТЫ,<br/><em>КОТОРЫЕ</em> ГОВОРЯТ.</h2><span>НЕКОТОРЫЕ ПРОЕКТЫ / 2023—2026</span></div><div className="project-grid">{projects.map((p, i) => <a className={`project-card reveal ${p.className} ${i === 0 ? 'project-featured' : ''}`} key={p.n} href={p.url} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} — открыть сайт в новой вкладке`}><div className="project-image"><img src={asset(p.image)} alt={`Визуальная иллюстрация проекта ${p.name}`} loading="lazy"/><span className="project-open"><ArrowUpRight size={23}/></span><span className="project-index">{p.n} / 03</span></div><div className="project-info"><div><h3>{p.name}</h3><p>{p.type}</p></div><span>{p.year}</span></div></a>)}</div><p className="work-note reveal">Каждый проект — новая задача, новый взгляд и своя история.</p></section>
      <section className="contact" id="contact"><div className="contact-glow" aria-hidden="true"/><div className="container contact-inner"><div className="section-kicker reveal"><span className="dot"/> 04 / СЛЕДУЮЩИЙ ШАГ</div><p className="contact-pre reveal">ЕСТЬ ИДЕЯ? ДАВАЙТЕ СДЕЛАЕМ ЕЁ РЕАЛЬНОСТЬЮ.</p><h2 className="reveal">ДАВАЙТЕ<br/><em>СОЗДАВАТЬ</em><br/>ВМЕСТЕ<span className="period">.</span></h2><a className="contact-button reveal" href="https://t.me/sergeytatis" target="_blank" rel="noopener noreferrer">Написать в Telegram <ArrowUpRight size={25}/></a><div className="contact-divider"/><div className="contact-links"><span>НА СВЯЗИ, ГДЕ ВАМ УДОБНО</span><div><a href="https://vk.com/sergeytatis" target="_blank" rel="noopener noreferrer">VK <MoveUpRight size={15}/></a><a href="https://t.me/sergeytatis" target="_blank" rel="noopener noreferrer">TELEGRAM <MoveUpRight size={15}/></a><a href="https://max.ru/u/f9LHodD0cOJLjXxk797uTQWgZkalJo3JuqF-VfGREAimyHbR5HoRrIhkz2M" target="_blank" rel="noopener noreferrer">MAX <MoveUpRight size={15}/></a></div></div></div></section>
    </main><footer className="footer container"><a href="#top" className="footer-brand">TATIS<span>WEB</span><span className="period">.</span></a><span>© {new Date().getFullYear()} СЕРГЕЙ ТАРАСЕНКО</span><a href="#top">НАВЕРХ ↑</a></footer>
  </>;
}
createRoot(document.getElementById('root')).render(<App/>);
