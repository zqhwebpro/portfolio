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

/* SPARKLING HERO STARS LAYER */
function HeroFlyingStars() {
    const stars = React.useMemo(() => {
        return Array.from({ length: 95 }, (_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 2 + 1}px`,
            duration: `${Math.random() * 3 + 2}s`,
            delay: `${Math.random() * 2}s`,
            opacity: Math.random() * 0.4 + 0.6,
            tx: `${(Math.random() - 0.5) * 40}px`,
            ty: `${(Math.random() - 0.5) * 40}px`
        }));
    }, []);

    return (
        <div className="hero-flying-stars-container" aria-hidden="true">
            {stars.map((s) => (
                <div
                    key={s.id}
                    className="hero-sparkle-star"
                    style={{
                        top: s.top,
                        left: s.left,
                        width: s.size,
                        height: s.size,
                        opacity: s.opacity,
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

function App() {
    const [mouse, setMouse] = React.useState({ x: 0, y: 0 });
    const [submitted, setSubmitted] = React.useState(false);

    const [smoothScroll, setSmoothScroll] = React.useState(0);
    const [solarProgress, setSolarProgress] = React.useState(0);

    const canvasRef = React.useRef(null);
    const mouseRef = React.useRef({ x: 0, y: 0 });

    const targetScrollRef = React.useRef(0);
    const currentScrollRef = React.useRef(0);

    const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        setMouse({ x, y });
        mouseRef.current = { x, y };
    };

    React.useEffect(() => {
        let animationFrameId;

        const updatePhysics = () => {
            currentScrollRef.current += (targetScrollRef.current - currentScrollRef.current) * 0.12;
            const current = currentScrollRef.current;

            setSmoothScroll(current);

            const winH = window.innerHeight;
            const docH = document.documentElement.scrollHeight;
            const totalHeight = docH - winH;

            const footerStart = totalHeight - 1100;
            let progress = 0;
            if (current > footerStart) {
                progress = Math.min(Math.max((current - footerStart) / 900, 0), 1);
            }
            setSolarProgress(progress);

            if (progress > 0.55) {
                document.body.classList.add('solar-lit-active');
                document.body.classList.remove('solar-lit-preglow');
            } else if (progress > 0.15) {
                document.body.classList.add('solar-lit-preglow');
                document.body.classList.remove('solar-lit-active');
            } else {
                document.body.classList.remove('solar-lit-preglow', 'solar-lit-active');
            }

            animationFrameId = requestAnimationFrame(updatePhysics);
        };

        const handleScroll = () => {
            targetScrollRef.current = window.scrollY;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });
        updatePhysics();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    /* CANVAS DYNAMIC SPARKLING PARALLAX */
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

        const starsFar = Array.from({ length: 240 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 3,
            size: Math.random() * 0.6 + 0.3,
            alpha: Math.random() * 0.4 + 0.5,
            speed: Math.random() * 0.008 + 0.003
        }));

        const starsMid = Array.from({ length: 170 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 3,
            size: Math.random() * 1.0 + 0.5,
            alpha: Math.random() * 0.5 + 0.5,
            speed: Math.random() * 0.012 + 0.005
        }));

        const starsNear = Array.from({ length: 130 }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight * 3,
            size: Math.random() * 1.6 + 0.8,
            alpha: Math.random() * 0.4 + 0.6,
            speed: Math.random() * 0.018 + 0.008
        }));

        const renderGalaxy = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const sy = currentScrollRef.current;

            ctx.save();
            ctx.translate(mx * 0.04, my * 0.04 - sy * 0.15);
            starsFar.forEach((star) => {
                star.alpha += star.speed;
                if (star.alpha > 0.95 || star.alpha < 0.4) star.speed = -star.speed;
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = star.alpha;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.restore();

            ctx.save();
            ctx.translate(mx * 0.2, my * 0.2 - sy * 0.45);
            starsMid.forEach((star) => {
                star.alpha += star.speed;
                if (star.alpha > 0.98 || star.alpha < 0.5) star.speed = -star.speed;
                ctx.fillStyle = '#00f0ff';
                ctx.globalAlpha = star.alpha;
                ctx.shadowColor = '#00f0ff';
                ctx.shadowBlur = 6;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.restore();

            ctx.save();
            ctx.translate(mx * 0.55, my * 0.55 - sy * 0.9);
            starsNear.forEach((star) => {
                star.alpha += star.speed;
                if (star.alpha > 1.0 || star.alpha < 0.6) star.speed = -star.speed;
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = star.alpha;
                ctx.shadowColor = '#ffffff';
                ctx.shadowBlur = 12;
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
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-active');
                    } else {
                        entry.target.classList.remove('reveal-active');
                    }
                });
            },
            { threshold: 0.12 }
        );

        const revealElements = document.querySelectorAll('.scroll-reveal');
        revealElements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="canvas-wrapper">
            <div className="fixed-space-texture-bg" aria-hidden="true" />
            <canvas ref={canvasRef} className="galaxy-canvas" />

            <a
                href="https://zqhwebpro.github.io/portfolio/2026/"
                target="_blank"
                rel="noopener noreferrer"
                className="floating-brand-badge-bottom"
            >
                Portfolio
            </a>

            {/* HERO SECTION */}
            <header className="hero-3d-wrapper">
                <div className="deep-space-nebula-container" aria-hidden="true">
                    <div className="nebula-swirl nebula-1"></div>
                    <div className="nebula-swirl nebula-2"></div>
                    <div className="nebula-swirl nebula-3"></div>
                    <div className="nebula-swirl nebula-4"></div>

                    <div className="solar-system-planet-wrapper">
                        <div className="planet-sun-core"></div>
                    </div>
                </div>

                <div className="hero-content-inner">
                    <HeroFlyingStars />
                    <div
                        className="glass-card-3d hero-glass-portal"
                        style={{
                            transform: `rotateY(${mouse.x * 0.18}deg) rotateX(${-mouse.y * 0.18}deg)`
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
                </div>
            </header>

            {/* ABOUT */}
            <section className="section-container">
                <div className="glass-card-3d about-3d-container scroll-reveal">
                    <div className="about-text-content reveal-content">
                        <span className="section-tag">ABOUT ME</span>
                        <h2 className="section-title">Who I Am</h2>
                        <p>
                            I'm Zach Heindel, a developer, UI/UX designer, and digital craftsman with over 10 years of experience building modern web architectures[cite: 1].
                        </p>
                        <p>
                            Unlike traditional agencies that pass you between account managers, I partner directly with small business owners to engineer bespoke web systems that look extraordinary and generate real revenue[cite: 1].
                        </p>
                    </div>
                    <div className="glass-card-3d experience-badge-3d reveal-content">
                        <div className="exp-number">10+</div>
                        <div style={{ marginTop: '0.5rem' }}>
                            Years of Hands-On Digital Experience[cite: 1]
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="section-container">
                <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
                    <div className="reveal-content">
                        <span className="section-tag">SERVICES</span>
                        <h2 className="section-title">What I Do For Small Businesses</h2>
                    </div>
                </div>

                <div className="unified-grid">
                    {SERVICES.map((s, idx) => (
                        <div key={idx} className="glass-card-3d service-box-3d scroll-reveal">
                            <div className="box-icon-3d reveal-content">{s.num}</div>
                            <h3 className="box-title reveal-content">{s.title}</h3>
                            <p className="box-copy reveal-content">{s.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* LOCATION */}
            <section className="section-container">
                <div className="scroll-reveal" style={{ marginBottom: '2.5rem' }}>
                    <div className="reveal-content">
                        <span className="section-tag">LOCATION &amp; ADVANTAGE</span>
                        <h2 className="section-title">Based in York, PA — Serving Growth Worldwide</h2>
                        <p style={{ maxWidth: '640px', color: 'var(--text-sub)' }}>
                            Located in York, Pennsylvania, I offer local small businesses hands-on digital partnership combined with enterprise-grade web engineering.
                        </p>
                    </div>
                </div>

                <div className="unified-grid">
                    {WHY_REASONS.map((item, idx) => (
                        <div key={idx} className="glass-card-3d why-card scroll-reveal">
                            <h3 className="reveal-content" style={{ fontFamily: 'var(--font-3d)', fontSize: '1.35rem', marginBottom: '0.8rem', color: 'var(--neon-cyan)' }}>
                                {item.title}
                            </h3>
                            <p className="reveal-content" style={{ color: 'var(--text-sub)' }}>{item.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CONTACT FOOTER */}
            <footer id="contact" className="footer-contact-3d">
                <div className="glass-card-3d contact-card-3d scroll-reveal">
                    <span className="section-tag reveal-content">GET IN TOUCH</span>
                    <h2 className="section-title reveal-content">Ready to Elevate Your Business?</h2>
                    <p className="reveal-content" style={{ color: 'var(--text-sub)', marginBottom: '1rem' }}>
                        Send a message to discuss your web design, hosting, or business growth goals.
                    </p>

                    {submitted ? (
                        <div style={{ padding: '2rem', background: 'rgba(255, 140, 0, 0.2)', borderRadius: '16px', marginTop: '2rem', color: '#ff6600', fontWeight: 'bold' }}>
                            🚀 Message received! I'll get back to you shortly.
                        </div>
                    ) : (
                        <form className="contact-form reveal-content" onSubmit={handleSubmit}>
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
                            transform: `translate3d(-50%, ${(1 - solarProgress) * 100}px, 0) scale(${0.85 + solarProgress * 0.4})`
                        }}
                    ></div>
                </div>
            </footer>
        </div>
    );
}