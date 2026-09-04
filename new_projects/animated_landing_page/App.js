const SERVICES = [
    {
        num: "01",
        title: "Modern Web Design",
        body: "High-converting, ultra-fast custom websites built with dynamic 3D visuals, smooth motion, and mobile-first responsiveness."
    },
    {
        num: "02",
        title: "Managed Web Hosting",
        body: "Worry-free, ultra-secure managed hosting with automatic SSL, daily backups, sub-second load speeds, and 99.9% uptime."
    },
    {
        num: "03",
        title: "Small Business Growth",
        body: "Local search optimization (SEO), conversion rate tuning, lead-generation funnels, and dynamic tools tailored to win local markets."
    }
];

const WHY_REASONS = [
    {
        title: "Local & Dedicated",
        body: "Based in York, PA, offering direct 1-on-1 collaboration with no middleman or overseas outsourcing."
    },
    {
        title: "10+ Years Craftsmanship",
        body: "A decade-plus spent engineering high-performance web systems and digital marketing engines."
    },
    {
        title: "Full-Stack Care",
        body: "From original concept and 3D visual design to custom coding, cloud hosting, and long-term search growth."
    }
];

/* HERO FLYING STARS LAYER */
function HeroFlyingStars() {
    const stars = React.useMemo(() => {
        return Array.from({ length: 60 }, (_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 1.5 + 0.8}px`,
            duration: `${Math.random() * 4 + 2.5}s`,
            delay: `${Math.random() * 3}s`,
            opacity: Math.random() * 0.4 + 0.25,
            tx: `${(Math.random() - 0.5) * 40}px`,
            ty: `${(Math.random() - 0.5) * 40}px`
        }));
    }, []);

    return (
        <div className="hero-flying-stars-container" aria-hidden="true">
            {stars.map((s) => (
                <div
                    key={s.id}
                    className="hero-flying-star"
                    style={{
                        top: s.top,
                        left: s.left,
                        width: s.size,
                        height: s.size,
                        opacity: s.opacity,
                        backgroundColor: '#ffffff',
                        boxShadow: `0 0 6px #ffffff, 0 0 12px rgba(255, 255, 255, 0.8)`,
                        animationDuration: s.duration,
                        animationDelay: s.delay,
                        '--tx': s.tx,
                        '--ty': s.ty
                    }}
                />
            ))}
        </div>
    );
}

/* ASTEROID DIVIDER — MOUNTED DIRECTLY UNDER CARD 03 */
function RocketDivider({ innerRef, progress = 0 }) {
    const angle = 26;
    const distanceY = progress * 850;

    // Fades in immediately high up, remains fully opaque across a long path, then softly vanishes at the bottom
    const opacity = progress < 0.05
        ? progress * 20
        : progress > 0.90
            ? Math.max(0, (1 - progress) * 10)
            : 1;

    return (
        <div className="rocket-divider-container" ref={innerRef} aria-hidden="true">
            <div
                className="diagonal-track-wrapper"
                style={{
                    transform: `rotate(${angle}deg)`,
                    transformOrigin: 'top center'
                }}
            >
                <div
                    className="shooting-star-wrapper"
                    style={{
                        transform: `translate3d(0, ${distanceY}px, 0) scale(${0.7 + progress * 0.4})`,
                        opacity: opacity
                    }}
                >
                    <div className="star-trail-tail"></div>
                    <svg className="shooting-star-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <radialGradient id="starCoreGlow" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="40%" stopColor="#ffe600" />
                                <stop offset="100%" stopColor="#ff0055" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="starBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#ffffff" />
                                <stop offset="50%" stopColor="#ffcc00" />
                                <stop offset="100%" stopColor="#ff3300" />
                            </linearGradient>
                        </defs>

                        <circle cx="50" cy="50" r="44" fill="url(#starCoreGlow)" opacity="1" />
                        <path
                            d="M50,2 Q50,50 98,50 Q50,50 50,98 Q50,50 2,50 Q50,50 50,2 Z"
                            fill="url(#starBodyGrad)"
                            stroke="#ffffff"
                            strokeWidth="1.5"
                        />
                        <circle cx="50" cy="50" r="8" fill="#ffffff" />
                    </svg>
                </div>
            </div>
        </div>
    );
}

function App() {
    const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
    const [submitted, setSubmitted] = React.useState(false);

    const [smoothScroll, setSmoothScroll] = React.useState(0);
    const [solarProgress, setSolarProgress] = React.useState(0);
    const [rocketProgress, setRocketProgress] = React.useState(0);

    // Accessibility Mode State: false = Dark Mode (default), true = Light Mode
    const [isLightMode, setIsLightMode] = React.useState(false);

    const canvasRef = React.useRef(null);
    const rocketRef = React.useRef(null);
    const mouseRef = React.useRef({ x: 0, y: 0 });

    const targetScrollRef = React.useRef(0);
    const currentScrollRef = React.useRef(0);

    const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        setMouse({ x, y });
        mouseRef.current = { x, y };
    };

    const toggleAccessibilityMode = () => {
        setIsLightMode(prev => !prev);
    };

    /* LERP PHYSICS LOOP */
    React.useEffect(() => {
        let animationFrameId;

        const handleScroll = () => {
            targetScrollRef.current = window.scrollY;
        };

        const updatePhysics = () => {
            currentScrollRef.current += (targetScrollRef.current - currentScrollRef.current) * 0.08;
            const current = currentScrollRef.current;

            setSmoothScroll(current);

            const winH = window.innerHeight;
            const docH = document.documentElement.scrollHeight;
            const totalHeight = docH - winH;

            // Solar theme color transition: Starts earlier so background warms/lights up BEFORE sun blooms
            const footerStart = totalHeight - 1300;
            let progress = 0;
            if (current > footerStart) {
                progress = Math.min(Math.max((current - footerStart) / 1100, 0), 1);
            }
            setSolarProgress(progress);

            // Apply body classes for multi-stage ambient background lighting
            if (isLightMode) {
                document.body.classList.add('light-mode');
                if (progress > 0.65) {
                    document.body.classList.add('solar-dark-active');
                    document.body.classList.remove('solar-lit-preglow', 'solar-lit-active');
                } else if (progress > 0.2) {
                    document.body.classList.add('solar-lit-preglow');
                    document.body.classList.remove('solar-dark-active', 'solar-lit-active');
                } else {
                    document.body.classList.remove('solar-dark-active', 'solar-lit-preglow', 'solar-lit-active');
                }
            } else {
                document.body.classList.remove('light-mode', 'solar-dark-active');
                if (progress > 0.65) {
                    document.body.classList.add('solar-lit-active');
                    document.body.classList.remove('solar-lit-preglow');
                } else if (progress > 0.2) {
                    document.body.classList.add('solar-lit-preglow');
                    document.body.classList.remove('solar-lit-active');
                } else {
                    document.body.classList.remove('solar-lit-preglow', 'solar-lit-active');
                }
            }

            // Asteroid Calculation: Appears higher up during scroll and lasts over a longer distance
            if (rocketRef.current) {
                const rect = rocketRef.current.getBoundingClientRect();
                const startPoint = winH * 1.6;
                const endPoint = -winH * 0.4;
                const distanceScrolled = startPoint - rect.top;
                const totalRange = startPoint - endPoint;
                const p = Math.min(Math.max(distanceScrolled / totalRange, 0), 1);
                setRocketProgress(p);
            }

            animationFrameId = requestAnimationFrame(updatePhysics);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });
        updatePhysics();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isLightMode]);

    /* PARALLAX CANVAS WITH SMALL, TRANSPARENT, GLOWING WHITE STARS */
    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const starsFar = Array.from({ length: 180 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 3,
            size: Math.random() * 0.8 + 0.4,
            alpha: Math.random() * 0.35 + 0.15,
            speed: Math.random() * 0.006 + 0.002
        }));

        const starsMid = Array.from({ length: 140 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 3,
            size: Math.random() * 1.2 + 0.6,
            alpha: Math.random() * 0.4 + 0.25,
            speed: Math.random() * 0.01 + 0.003
        }));

        const starsNear = Array.from({ length: 110 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 3,
            size: Math.random() * 1.8 + 0.9,
            alpha: Math.random() * 0.4 + 0.35,
            speed: Math.random() * 0.014 + 0.004
        }));

        const renderGalaxy = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const sy = currentScrollRef.current;

            // FAR STARS
            ctx.save();
            ctx.translate(mx * 0.1, my * 0.1 - sy * 0.12);
            starsFar.forEach((star) => {
                star.alpha += star.speed;
                if (star.alpha > 0.55 || star.alpha < 0.15) star.speed = -star.speed;
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = Math.abs(star.alpha);
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.restore();

            // MID STARS
            ctx.save();
            ctx.translate(mx * 0.25, my * 0.25 - sy * 0.38);
            starsMid.forEach((star) => {
                star.alpha += star.speed;
                if (star.alpha > 0.65 || star.alpha < 0.2) star.speed = -star.speed;
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = Math.abs(star.alpha);
                ctx.shadowColor = '#ffffff';
                ctx.shadowBlur = 4;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.restore();

            // NEAR GLOWING STARS
            ctx.save();
            ctx.translate(mx * 0.5, my * 0.5 - sy * 0.85);
            starsNear.forEach((star) => {
                star.alpha += star.speed;
                if (star.alpha > 0.75 || star.alpha < 0.3) star.speed = -star.speed;
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = Math.abs(star.alpha);
                ctx.shadowColor = '#ffffff';
                ctx.shadowBlur = 8;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.restore();

            animationFrameId = requestAnimationFrame(renderGalaxy);
        };

        renderGalaxy();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    entry.target.classList.toggle('zoom-active', entry.isIntersecting);
                });
            },
            { threshold: 0.1 }
        );

        const zoomElements = document.querySelectorAll('.scroll-zoom');
        zoomElements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="canvas-wrapper">
            <canvas ref={canvasRef} className="galaxy-canvas" />

            {/* ACCESSIBILITY MODE TOGGLE BUTTON (ICON ONLY) */}
            <button
                onClick={toggleAccessibilityMode}
                className="accessibility-toggle-btn"
                aria-label="Toggle Mode"
                title="Toggle Mode"
            >
                <span className="btn-icon">{isLightMode ? '🌙' : '☀️'}</span>
            </button>

            <a
                href="https://zqhwebpro.github.io/portfolio/2026/"
                target="_blank"
                rel="noopener noreferrer"
                className="floating-brand-badge-bottom"
            >
                Portfolio
            </a>

            {/* HERO */}
            <header className="hero-3d-wrapper">
                <HeroFlyingStars />
                <div
                    className="glass-card-3d hero-glass-portal"
                    style={{
                        transform: `rotateY(${mouse.x * 0.25}deg) rotateX(${-mouse.y * 0.25}deg) translate3d(0, ${smoothScroll * -0.06}px, 0)`
                    }}
                >
                    <span className="section-tag">DIGITAL CRAFTSMANSHIP</span>
                    <h1 className="hero-headline">
                        Interactive 3D Web &amp; <span>Small Business Growth.</span>
                    </h1>
                    <p className="hero-description">
                        Hi, I'm Zach Heindel[cite: 1]. I construct high-impact, 3D web platforms and growth engines engineered to transform small businesses into dominant brands[cite: 1].
                    </p>
                    <a href="#contact" className="btn-3d-glow">
                        Launch Your Project ↗
                    </a>
                </div>
            </header>

            {/* ABOUT */}
            <section className="section-container">
                <div className="glass-card-3d about-3d-container scroll-zoom">
                    <div
                        className="about-text-content"
                        style={{ transform: `translate3d(0, ${(smoothScroll - 400) * -0.03}px, 0)` }}
                    >
                        <span className="section-tag">ABOUT ME</span>
                        <h2 className="section-title">Who I Am</h2>
                        <p>
                            I'm Zach Heindel, a developer, UI/UX designer, and digital craftsman with over 10 years of experience building modern web architectures[cite: 1].
                        </p>
                        <p>
                            Unlike traditional agencies that pass you between account managers, I partner directly with small business owners to engineer bespoke web systems that look extraordinary and generate real revenue[cite: 1].
                        </p>
                    </div>
                    <div
                        className="glass-card-3d experience-badge-3d"
                        style={{ transform: `translate3d(0, ${(smoothScroll - 400) * -0.05}px, 0)` }}
                    >
                        <div className="exp-number">10+</div>
                        <div style={{ marginTop: '0.5rem' }}>
                            Years of Hands-On Digital Experience[cite: 1]
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="section-container">
                <div className="scroll-zoom">
                    <span className="section-tag">SERVICES</span>
                    <h2 className="section-title">What I Do For Small Businesses</h2>
                </div>

                <div className="services-staggered-grid">
                    {SERVICES.map((s, idx) => (
                        <React.Fragment key={idx}>
                            <div
                                className={`glass-card-3d service-box-3d staggered-box-${idx + 1} scroll-zoom delay-${idx + 1}`}
                                style={{
                                    transform: `rotateY(${mouse.x * 0.15}deg) rotateX(${-mouse.y * 0.15}deg) translate3d(0, ${(smoothScroll - 1200) * (-0.02 * (idx + 1))}px, 0)`
                                }}
                            >
                                <div className="box-icon-3d">{s.num}</div>
                                <h3 className="box-title">{s.title}</h3>
                                <p className="box-copy">{s.body}</p>
                            </div>

                            {s.num === "03" && (
                                <RocketDivider innerRef={rocketRef} progress={rocketProgress} />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </section>

            {/* LOCATION */}
            <section className="section-container">
                <div className="scroll-zoom">
                    <span className="section-tag">LOCATION &amp; ADVANTAGE</span>
                    <h2 className="section-title">Based in York, PA — Serving Growth Worldwide</h2>
                    <p style={{ maxWidth: '620px', color: 'var(--text-sub)' }}>
                        Located in York, Pennsylvania, I offer local small businesses hands-on digital partnership combined with enterprise-grade web engineering.
                    </p>
                </div>

                <div className="why-staggered-grid">
                    {WHY_REASONS.map((item, idx) => (
                        <div
                            key={idx}
                            className={`glass-card-3d why-card staggered-why-${idx + 1} scroll-zoom delay-${idx + 1}`}
                            style={{
                                transform: `translate3d(0, ${(smoothScroll - 2000) * (-0.02 * (idx + 1))}px, 0)`
                            }}
                        >
                            <h3 style={{ fontFamily: 'var(--font-3d)', fontSize: '1.35rem', marginBottom: '0.8rem', color: 'var(--neon-cyan)' }}>
                                {item.title}
                            </h3>
                            <p style={{ color: 'var(--text-sub)' }}>{item.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CONTACT FOOTER */}
            <footer id="contact" className="footer-contact-3d">
                <div className="glass-card-3d contact-card-3d scroll-zoom">
                    <span className="section-tag">GET IN TOUCH</span>
                    <h2 className="section-title">Ready to Elevate Your Business?</h2>
                    <p style={{ color: 'var(--text-sub)', marginBottom: '1rem' }}>
                        Send a message to discuss your web design, hosting, or business growth goals.
                    </p>

                    {submitted ? (
                        <div style={{ padding: '1.8rem', background: 'rgba(255, 140, 0, 0.2)', borderRadius: '14px', marginTop: '1.8rem', color: '#ff6600', fontWeight: 'bold' }}>
                            🚀 Message received! I'll get back to you shortly.
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <input type="text" placeholder="Your Name" required className="form-input-3d" />
                            <input type="email" placeholder="Your Email Address" required className="form-input-3d" />
                            <textarea placeholder="Tell me about your project or business needs..." required className="form-input-3d"></textarea>
                            <button type="submit" className="btn-3d-glow" style={{ justifyContent: 'center' }}>
                                Send Message ↗
                            </button>
                        </form>
                    )}
                </div>

                <div className="footer-stage-wrapper" style={{ opacity: Math.min(solarProgress * 1.5, 1) }}>
                    <div
                        className="giant-glowing-sun"
                        style={{
                            transform: `translate3d(-50%, ${(1 - solarProgress) * 120}px, 0) scale(${0.8 + solarProgress * 0.45})`
                        }}
                    ></div>
                </div>
            </footer>
        </div>
    );
}