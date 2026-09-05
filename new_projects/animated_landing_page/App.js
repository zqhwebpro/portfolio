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

function HeroFlyingStars() {
    const stars = React.useMemo(() => {
        return Array.from({ length: 120 }, (_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 1.5 + 0.5}px`,
            opacity: Math.random() * 0.5 + 0.5,
            duration: `${Math.random() * 3 + 2}s`
        }));
    }, []);

    return (
        <div className="hero-flying-stars-container" aria-hidden="true">
            {stars.map((s) => (
                <div
                    key={s.id}
                    className="hero-space-star twinkling-star"
                    style={{
                        top: s.top,
                        left: s.left,
                        width: s.size,
                        height: s.size,
                        opacity: s.opacity,
                        animationDuration: s.duration
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
    const [solarJourneyProgress, setSolarJourneyProgress] = React.useState(0);

    const canvasRef = React.useRef(null);
    const mouseRef = React.useRef({ x: 0, y: 0 });

    const targetScrollRef = React.useRef(0);
    const currentScrollRef = React.useRef(0);

    const handleMouseMove = (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 25;
        const y = (e.clientY / window.innerHeight - 0.5) * 25;
        setMouse({ x, y });
        mouseRef.current = { x, y };
    };

    React.useEffect(() => {
        let animationFrameId;

        const updatePhysics = () => {
            currentScrollRef.current += (targetScrollRef.current - currentScrollRef.current) * 0.1;
            const current = currentScrollRef.current;

            setSmoothScroll(current);

            const winH = window.innerHeight;
            const docH = document.documentElement.scrollHeight;
            const maxScroll = Math.max(1, docH - winH);

            const overallProgress = Math.min(Math.max(current / maxScroll, 0), 1);
            setSolarJourneyProgress(overallProgress);

            // Light Mode activates gradually when reaching the final sections & footer sun
            if (overallProgress > 0.65) {
                document.body.classList.add('solar-lit-active');
            } else {
                document.body.classList.remove('solar-lit-active');
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

    /* PARALLAX STARFIELD CANVAS */
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

        const createStarLayer = (count, minSize, maxSize) => {
            return Array.from({ length: count }, () => ({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight * 4,
                size: Math.random() * (maxSize - minSize) + minSize,
                baseAlpha: Math.random() * 0.5 + 0.3,
                twinkleSpeed: Math.random() * 0.03 + 0.01,
                phase: Math.random() * Math.PI * 2
            }));
        };

        const starsDeep = createStarLayer(300, 0.3, 0.8);
        const starsMid = createStarLayer(200, 0.8, 1.4);
        const starsNear = createStarLayer(100, 1.4, 2.2);

        let time = 0;

        const renderGalaxy = () => {
            time += 0.05;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const sy = currentScrollRef.current;

            ctx.save();
            ctx.translate(mx * 0.03, my * 0.03 - sy * 0.15);
            starsDeep.forEach((star) => {
                const alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.phase) * 0.25;
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = Math.max(0.1, Math.min(1, alpha));
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.restore();

            ctx.save();
            ctx.translate(mx * 0.1, my * 0.1 - sy * 0.4);
            starsMid.forEach((star) => {
                const alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.phase) * 0.3;
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = Math.max(0.15, Math.min(1, alpha));
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.restore();

            ctx.save();
            ctx.translate(mx * 0.22, my * 0.22 - sy * 0.75);
            starsNear.forEach((star) => {
                const alpha = star.baseAlpha + Math.sin(time * star.twinkleSpeed + star.phase) * 0.35;
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = Math.max(0.2, Math.min(1, alpha));
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
            { threshold: 0.1 }
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

            {/* SOFT CONTINUOUS ATMOSPHERIC GLOW GRADIENT */}
            <div
                className="solar-descent-glow"
                style={{ opacity: Math.pow(solarJourneyProgress, 2) }}
                aria-hidden="true"
            />

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

                    <div
                        className="solar-system-planet-wrapper"
                        style={{
                            transform: `scale(${1 + solarJourneyProgress * 0.9}) translate3d(0, ${smoothScroll * 0.18}px, 0)`
                        }}
                    >
                        <div className="planet-lunar-core">
                            <div className="lunar-maria maria-1"></div>
                            <div className="lunar-maria maria-2"></div>
                            <div className="lunar-maria maria-3"></div>
                            <div className="lunar-crater crater-1"></div>
                            <div className="lunar-crater crater-2"></div>
                            <div className="lunar-crater crater-3"></div>
                            <div className="lunar-crater crater-4"></div>
                            <div className="lunar-crater crater-5"></div>
                            <div className="lunar-crater crater-6"></div>
                            <div className="lunar-crater crater-7"></div>
                            <div className="lunar-crater crater-8"></div>
                            <div className="lunar-shadow-overlay"></div>
                        </div>
                    </div>
                </div>

                <div className="hero-content-inner">
                    <HeroFlyingStars />
                    <div
                        className="glass-card-3d hero-glass-portal"
                        style={{
                            transform: `rotateY(${mouse.x * 0.12}deg) rotateX(${-mouse.y * 0.12}deg)`
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
                        <div style={{ marginTop: '0.75rem', fontWeight: 500 }}>
                            Years of Hands-On Digital Experience[cite: 1]
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES */}
            <section className="section-container">
                <div className="scroll-reveal" style={{ marginBottom: '4.5rem' }}>
                    <div className="reveal-content">
                        <span className="section-tag">SERVICES</span>
                        <h2 className="section-title">What I Do For Small Businesses</h2>
                    </div>
                </div>

                <div className="uniform-grid">
                    {SERVICES.map((s, idx) => (
                        <div
                            key={idx}
                            className="glass-card-3d standard-card scroll-reveal"
                        >
                            <div className="box-icon-3d reveal-content">{s.num}</div>
                            <h3 className="box-title reveal-content">{s.title}</h3>
                            <p className="box-copy reveal-content">{s.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* LOCATION */}
            <section className="section-container">
                <div className="scroll-reveal" style={{ marginBottom: '4.5rem' }}>
                    <div className="reveal-content">
                        <span className="section-tag">LOCATION &amp; ADVANTAGE</span>
                        <h2 className="section-title">Based in York, PA — Serving Growth Worldwide</h2>
                        <p style={{ maxWidth: '680px', fontSize: '1.1rem' }} className="location-intro-text">
                            Located in York, Pennsylvania, I offer local small businesses hands-on digital partnership combined with enterprise-grade web engineering.
                        </p>
                    </div>
                </div>

                <div className="uniform-grid">
                    {WHY_REASONS.map((item, idx) => (
                        <div
                            key={idx}
                            className="glass-card-3d standard-card scroll-reveal"
                        >
                            <h3 className="reveal-content why-card-title">
                                {item.title}
                            </h3>
                            <p className="reveal-content box-copy">{item.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CONTACT FOOTER */}
            <footer id="contact" className="footer-contact-3d">
                <div className="glass-card-3d contact-card-3d scroll-reveal">
                    <span className="section-tag reveal-content">GET IN TOUCH</span>
                    <h2 className="section-title reveal-content">Ready to Elevate Your Business?</h2>
                    <p className="reveal-content box-copy" style={{ marginBottom: '1.5rem' }}>
                        Send a message to discuss your web design, hosting, or business growth goals.
                    </p>

                    {submitted ? (
                        <div className="submitted-msg-box">
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

                <div className="footer-stage-wrapper">
                    <div
                        className="giant-glowing-sun"
                        style={{
                            transform: `translate3d(-50%, ${(1 - solarJourneyProgress) * 400}px, 0) scale(${0.7 + solarJourneyProgress * 0.5})`
                        }}
                    />
                </div>
            </footer>
        </div>
    );
}