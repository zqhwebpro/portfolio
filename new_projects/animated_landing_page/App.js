const BLOG_POSTS = [
    {
        num: "01",
        title: "Interactive Experience",
        body: "Static pages leave users reading a list of specs. Scroll-triggered animations and fluid depth transform passive browsing into an active journey, guiding visitors naturally toward your main call-to-action."
    },
    {
        num: "02",
        title: "Motion That Guides, Not Distracts",
        body: "Every animation and section layout follows an intentional narrative arc: hook attention early, build product clarity, and resolve with an intuitive next step for higher conversion rates."
    },
    {
        num: "03",
        title: "Full-Stack Execution",
        body: "With over a decade of hands-on web development experience, I take interactive prototypes and turn them into resilient, production-ready web applications that perform reliably under real traffic."
    }
];

const CRAFTSMANSHIP_PILLARS = [
    {
        title: "Direct Collaboration",
        body: "You work directly with the developer building your site. No account manager hand-offs, no lost requirements, and no agency overhead."
    },
    {
        title: "10+ Years Industry Experience",
        body: "A proven background spanning front-end engineering, UI/UX architecture, motion design, and performance optimization across live client launches."
    },
    {
        title: "Complete End-to-End Build",
        body: "From original layout concepts and motion physics to final deployment, hosting configuration, and ongoing performance tuning."
    }
];

function HeroFlyingStars() {
    const stars = React.useMemo(() => {
        return Array.from({ length: 120 }, (_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 1.5 + 0.5}px`,
            duration: `${Math.random() * 6 + 6}s`
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
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [smoothScroll, setSmoothScroll] = React.useState(0);
    const [solarJourneyProgress, setSolarJourneyProgress] = React.useState(0);

    const canvasRef = React.useRef(null);
    const mouseRef = React.useRef({ x: 0, y: 0 });

    const targetScrollRef = React.useRef(0);
    const currentScrollRef = React.useRef(0);

    const getDecodedEmail = () => {
        const parts = ["zqhwebpro", "gmail", "com"];
        return `${parts[0]}@${parts[1]}.${parts[2]}`;
    };

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

    /* PARALLAX STARFIELD CANVAS WITH SLOWER TWINKLE */
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
                twinkleSpeed: Math.random() * 0.008 + 0.003,
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
                const alpha = Math.max(0, (Math.sin(time * star.twinkleSpeed + star.phase) + 1) / 2);
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = alpha * 0.7;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.restore();

            ctx.save();
            ctx.translate(mx * 0.1, my * 0.1 - sy * 0.4);
            starsMid.forEach((star) => {
                const alpha = Math.max(0, (Math.sin(time * star.twinkleSpeed + star.phase) + 1) / 2);
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = alpha * 0.85;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.restore();

            ctx.save();
            ctx.translate(mx * 0.22, my * 0.22 - sy * 0.75);
            starsNear.forEach((star) => {
                const alpha = Math.max(0, (Math.sin(time * star.twinkleSpeed + star.phase) + 1) / 2);
                ctx.fillStyle = '#ffffff';
                ctx.globalAlpha = alpha;
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

    React.useEffect(() => {
        document.title = "Interactive Web Development & Front-End Engineering | Portfolio";

        const metaDescription = document.querySelector('meta[name="description"]') || document.createElement('meta');
        metaDescription.name = "description";
        metaDescription.content = "Custom interactive landing pages, web applications, and conversion-focused front-end engineering built with modern web technologies and 10+ years of experience.";
        if (!document.querySelector('meta[name="description"]')) document.head.appendChild(metaDescription);

        const schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "name": "Interactive Web Development Services",
            "description": "High-performance front-end engineering, motion design, and conversion-focused landing page development.",
            "url": "https://zqhwebpro.github.io/portfolio/2026/",
            "provider": {
                "@type": "Person",
                "name": "Web Developer & UI/UX Engineer",
                "jobTitle": "Front-End Engineer"
            }
        });
        document.head.appendChild(schemaScript);

        return () => {
            if (document.head.contains(schemaScript)) document.head.removeChild(schemaScript);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const recipient = getDecodedEmail();
        const formData = new FormData(e.target);

        try {
            const response = await fetch(`https://formspree.io/f/xknkyqpg`, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            if (response.ok) {
                setSubmitted(true);
            } else {
                window.location.href = `mailto:${recipient}?subject=Portfolio Contact&body=${encodeURIComponent(formData.get('message'))}`;
                setSubmitted(true);
            }
        } catch (err) {
            window.location.href = `mailto:${recipient}?subject=Portfolio Contact`;
            setSubmitted(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="canvas-wrapper">
            <div className="fixed-space-texture-bg" aria-hidden="true" />

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
                title="View Full Interactive Portfolio"
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
                        <span className="section-tag">Interactive Portfolio & Front-End Engineering</span>
                        <h1 className="hero-headline">
                            Bringing Static Sites to Life <span>Through Motion & Modern Code.</span>
                        </h1>
                        <a href="#contact" className="btn-3d-glow" title="Contact for Front-End Web Development">
                            Get in Touch ↗
                        </a>
                    </div>
                </div>
            </header>

            {/* MAIN ESSAY SECTION */}
            <main>
                <section id="article" className="section-container">
                    <article className="glass-card-3d about-3d-container scroll-reveal">

                        {/* CLEAN ROCKET ASCII (NO TRAILS OR TRAIL GRAPHICS) */}
                        <div className="ascii-astronaut-container reveal-content">
                            <pre className="ascii-astronaut" aria-hidden="true">
                                {`         /\\
        /  \\
       / /\\ \\
      | /  \\ |
      | |  | |
      | |  | |
     /| |  | |\\
    / | |  | | \\
   |  | |__| |  |
   |  |/    \\|  |
   |  |      |  |
   |  |______|  |
   | /        \\ |
   |/          \\|
      /| || |\\
     / | || | \\
    /  |_||_|  \\`}
                            </pre>
                        </div>

                        {/* TEXT CONTENT ON THE RIGHT */}
                        <div className="about-text-content reveal-content">
                            <h2 className="section-title">Why Motion Drives Higher Engagement</h2>
                            <p>
                                Modern web users evaluate a digital experience in seconds. Static content often gets skimmed, but purposeful animation creates a tactile feedback loop that holds attention, communicates value instantly, and leads users through a planned story arc.
                            </p>
                            <p>
                                Building these experiences requires balancing high-impact visual design with clean, high-performance code. Every scroll interaction on this page is engineered to remain smooth, accessible, and conversion-focused across device types.
                            </p>
                        </div>

                    </article>
                </section>

                {/* DEVELOPMENT FOCUS PILLARS */}
                <section className="section-container" aria-label="Development Focus">
                    <div className="scroll-reveal" style={{ marginBottom: '4.5rem' }}>
                        <div className="reveal-content">
                            <span className="section-tag">Development Focus</span>
                            <h2 className="section-title">What Makes an Animated Page Convert</h2>
                        </div>
                    </div>

                    <div className="uniform-grid">
                        {BLOG_POSTS.map((post, idx) => (
                            <article
                                key={idx}
                                className="glass-card-3d standard-card scroll-reveal"
                            >
                                <span className="ui-num-badge reveal-content">
                                    {post.num}
                                </span>
                                <h3 className="box-title reveal-content">
                                    {post.title}
                                </h3>
                                <p className="box-copy reveal-content">{post.body}</p>
                            </article>
                        ))}
                    </div>
                </section>

                {/* AUTHOR / DIRECT COLLABORATION */}
                <section className="section-container" aria-label="Direct Technical Partnership">
                    <div className="scroll-reveal" style={{ marginBottom: '4.5rem' }}>
                        <div className="reveal-content">
                            <span className="section-tag">Craftsmanship</span>
                            <h2 className="section-title">Direct Technical Partnership</h2>
                            <p style={{ maxWidth: '680px', fontSize: '1.1rem' }} className="location-intro-text">
                                From initial interactive prototype to final production build, you work directly with a seasoned developer focused on clean code, strong performance, and measurable conversion gains.
                            </p>
                        </div>
                    </div>

                    <div className="uniform-grid">
                        {CRAFTSMANSHIP_PILLARS.map((item, idx) => (
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
            </main>

            {/* FOOTER CTA & SECURE CONTACT FORM */}
            <footer id="contact" className="footer-contact-3d">
                <div className="glass-card-3d contact-card-3d scroll-reveal">
                    <span className="section-tag reveal-content">Start a Project</span>
                    <h2 className="section-title reveal-content">Ready to Upgrade Your Web Experience?</h2>
                    <p className="reveal-content box-copy" style={{ marginBottom: '1.5rem' }}>
                        Send a direct message below to discuss interactive landing pages, custom web applications, or front-end engineering collaborations.
                    </p>

                    {submitted ? (
                        <div className="submitted-msg-box" role="alert">
                            🚀 Message sent successfully! I will reach out to you shortly.
                        </div>
                    ) : (
                        <form className="contact-form reveal-content" onSubmit={handleSubmit} aria-label="Contact Form">
                            <input
                                id="user-name"
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                required
                                className="form-input-3d"
                                aria-required="true"
                            />
                            <input
                                id="user-email"
                                type="email"
                                name="email"
                                placeholder="Your Email Address"
                                required
                                className="form-input-3d"
                                aria-required="true"
                            />
                            <textarea
                                id="user-message"
                                name="message"
                                placeholder="Tell me about your project or web development goals..."
                                required
                                className="form-input-3d"
                                rows="4"
                                aria-required="true"
                            ></textarea>
                            <button
                                type="submit"
                                className="btn-3d-glow"
                                style={{ justifyContent: 'center' }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Sending..." : "Send Message ↗"}
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