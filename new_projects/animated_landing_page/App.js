const ENGAGEMENT_DATA_SET = [
    {
        target: 40,
        prefix: "+",
        suffix: "%",
        decimals: 0,
        label: "Session Duration",
        body: "Interactive scroll triggers and smooth motion loops hold active user attention significantly longer, increasing overall time spent across high-priority landing pages."
    },
    {
        target: 245,
        prefix: "",
        suffix: "%",
        decimals: 0,
        label: "Attention Duration",
        body: "Eye-tracking studies demonstrate that dynamic motion design holds visual attention up to 2.5 times longer than static layouts, generating significantly higher fixation counts and boosting initial feature discovery."
    },
    {
        target: 2.5,
        prefix: "",
        suffix: "x",
        decimals: 1,
        label: "Brand Recall",
        body: "Tactile micro-interactions create engaging feedback loops during exploration, driving higher ongoing brand recall and sustained long-session retention."
    }
];

function CountUpStat({ item }) {
    const [displayVal, setDisplayVal] = React.useState(item.isFraction ? "0/4" : `${item.prefix}0${item.suffix}`);
    const ref = React.useRef(null);
    const hasAnimated = React.useRef(false);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 2000; // 2 seconds
                    const startTime = performance.now();

                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeProgress = 1 - Math.pow(1 - progress, 2);

                        if (item.isFraction) {
                            const currentNum = (easeProgress * item.numeratorTarget).toFixed(1);
                            setDisplayVal(`${currentNum}/${item.denominator}`);
                        } else {
                            const currentNum = (easeProgress * item.target).toFixed(item.decimals);
                            setDisplayVal(`${item.prefix}${currentNum}${item.suffix}`);
                        }

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            if (item.isFraction) {
                                setDisplayVal(`${item.numeratorTarget}/${item.denominator}`);
                            } else {
                                setDisplayVal(`${item.prefix}${item.target}${item.suffix}`);
                            }
                        }
                    };

                    requestAnimationFrame(animate);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [item]);

    return (
        <span ref={ref} className="stat-number-glow">
            {displayVal}
        </span>
    );
}

function HeroFlyingStars() {
    const stars = React.useMemo(() => {
        return Array.from({ length: 120 }, (_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 2 + 1}px`,
            duration: `${(Math.random() * 3 + 2).toFixed(2)}s`,
            delay: `${(Math.random() * 4).toFixed(2)}s`
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
                        animationDuration: s.duration,
                        animationDelay: s.delay
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
            currentScrollRef.current += (targetScrollRef.current - currentScrollRef.current) * 0.05;
            const current = currentScrollRef.current;

            setSmoothScroll(current);

            const winH = window.innerHeight;
            const docH = document.documentElement.scrollHeight;
            const maxScroll = Math.max(1, docH - winH);

            const overallProgress = Math.min(Math.max(current / maxScroll, 0), 1);
            setSolarJourneyProgress(overallProgress);

            if (overallProgress > 0.82) {
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
            // Handle high-DPI/Retina screens for smooth circular arcs
            const dpr = window.devicePixelRatio || 1;
            const width = window.innerWidth;
            const height = Math.max(
                document.documentElement.scrollHeight,
                window.innerHeight
            );

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.scale(dpr, dpr);
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const createStarLayer = (count, minSize, maxSize) => {
            return Array.from({ length: count }, () => ({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight * 4,
                size: Math.random() * (maxSize - minSize) + minSize,
                pulseSpeed: Math.random() * 0.03 + 0.015,
                phase: Math.random() * Math.PI * 2,
                baseAlpha: Math.random() * 0.3 + 0.2
            }));
        };

        const starsDeep = createStarLayer(250, 1.0, 1.6);
        const starsMid = createStarLayer(150, 1.6, 2.4);
        const starsNear = createStarLayer(80, 2.4, 3.8);

        let time = 0;

        const renderGalaxy = () => {
            time += 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Enable maximum smoothing for smooth circular arcs
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const sy = currentScrollRef.current;

            const isLightActive = document.body.classList.contains('solar-lit-active');
            const starFillColor = isLightActive ? '#3c2a1e' : '#ffffff';

            const drawLayer = (stars, mxMult, myMult, syMult, maxOpacity) => {
                ctx.save();
                ctx.translate(mx * mxMult, my * myMult - sy * syMult);

                stars.forEach((star) => {
                    const twinkle = (Math.sin(time * star.pulseSpeed + star.phase) + 1) / 2;
                    const currentAlpha = (star.baseAlpha + twinkle * (1 - star.baseAlpha)) * maxOpacity;

                    ctx.fillStyle = starFillColor;
                    ctx.globalAlpha = Math.min(1, Math.max(0, currentAlpha));

                    ctx.beginPath();
                    // Drawing with explicit arc parameters ensures perfect circles
                    ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2, false);
                    ctx.closePath();
                    ctx.fill();
                });

                ctx.restore();
            };

            drawLayer(starsDeep, 0.03, 0.03, 0.15, isLightActive ? 0.4 : 0.65);
            drawLayer(starsMid, 0.1, 0.1, 0.4, isLightActive ? 0.55 : 0.85);
            drawLayer(starsNear, 0.22, 0.22, 0.75, isLightActive ? 0.7 : 1.0);

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
        setIsSubmitting(true);

        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const recipient = getDecodedEmail();

        // Construct structured mailto parameters
        const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`
        );

        // Launch email client with pre-filled content
        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

        // Mark form as submitted to update UI
        setSubmitted(true);
        setIsSubmitting(false);
    };

    return (
        <div className="canvas-wrapper">
            <div className="fixed-space-texture-bg" aria-hidden="true" />

            <div
                className="solar-descent-glow"
                style={{ opacity: Math.pow(solarJourneyProgress, 3.2) }}
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
                        <h1 className="hero-headline">
                            Bringing Static Sites to Life <span>Through Motion & Modern Code.</span>
                        </h1>
                        <a href="#contact" className="btn-3d-glow" title="Contact for Front-End Web Development">
                            Straight to Contact
                        </a>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT SECTION */}
            <main>
                <section id="article" className="section-container">
                    <article className="glass-card-3d about-3d-container scroll-reveal">
                        <div className="graphic-art-container reveal-content">
                            <svg
                                viewBox="0 0 330 500"
                                className="connecting-art-svg"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g transform="translate(135, 15)">
                                    <path
                                        d="M30 10 C16 10 10 21 10 31 C10 40 20 45 20 53 L40 53 C40 45 50 40 50 31 C50 21 44 10 30 10 Z"
                                        stroke="var(--svg-accent, #00f0ff)"
                                        strokeWidth="2.5"
                                        fill="rgba(0, 240, 255, 0.1)"
                                    />
                                    <path d="M24 31 L28 23 L32 23 L36 31" stroke="var(--svg-accent, #00f0ff)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                    <line x1="21" y1="57" x2="39" y2="57" stroke="var(--svg-accent, #00f0ff)" strokeWidth="2.5" strokeLinecap="round" />
                                    <line x1="23" y1="62" x2="37" y2="62" stroke="var(--svg-accent, #00f0ff)" strokeWidth="2.5" strokeLinecap="round" />
                                    <path d="M26 66 C26 69 34 69 34 66 Z" fill="var(--svg-accent, #00f0ff)" />

                                    <line x1="30" y1="2" x2="30" y2="-3" stroke="var(--svg-accent, #00f0ff)" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="5" y1="17" x2="0" y2="13" stroke="var(--svg-accent, #00f0ff)" strokeWidth="2" strokeLinecap="round" />
                                    <line x1="55" y1="17" x2="60" y2="13" stroke="var(--svg-accent, #00f0ff)" strokeWidth="2" strokeLinecap="round" />
                                </g>

                                <path
                                    d="M 165 85 L 165 125 L 50 125 L 50 210 L 280 210 L 280 305 L 80 305 L 80 380 L 165 380 L 165 415"
                                    stroke="var(--svg-accent, #00f0ff)"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    className="dotted-line-path"
                                />

                                <g transform="translate(133, 418) scale(0.82)">
                                    <rect x="0" y="0" width="76" height="48" rx="6" stroke="var(--svg-accent, #00f0ff)" strokeWidth="2.5" fill="rgba(0, 240, 255, 0.08)" />
                                    <line x1="8" y1="38" x2="68" y2="38" stroke="var(--svg-accent, #00f0ff)" strokeWidth="1.5" />
                                    <path d="M30 48 L46 48 L50 60 L26 60 Z" stroke="var(--svg-accent, #00f0ff)" strokeWidth="2" fill="rgba(0, 240, 255, 0.12)" />
                                    <line x1="18" y1="60" x2="58" y2="60" stroke="var(--svg-accent, #00f0ff)" strokeWidth="2.5" strokeLinecap="round" />
                                </g>
                            </svg>
                        </div>

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

                {/* SECTION 3: DATA SETS WITH ANIMATED COUNTERS */}
                <section className="section-container" aria-label="Page Engagement Data">
                    <div className="scroll-reveal" style={{ marginBottom: '4.5rem' }}>
                        <div className="reveal-content">
                            <span className="section-tag">What Keeps a User Engaged Longer with Motion?</span>
                            <h2 className="section-title">Engaging Data Points</h2>
                        </div>
                    </div>

                    <div className="uniform-grid">
                        {ENGAGEMENT_DATA_SET.map((post, idx) => (
                            <article
                                key={idx}
                                className="glass-card-3d standard-card scroll-reveal"
                            >
                                <div className="stat-callout-wrapper reveal-content">
                                    <CountUpStat item={post} />
                                    <span className="stat-label">
                                        {post.label}
                                    </span>
                                </div>

                                <p className="box-copy reveal-content" style={{ marginTop: '1.25rem' }}>
                                    {post.body}
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            </main>

            {/* FOOTER & RE-CALIBRATED SUN ZOOM ANIMATION */}
            <footer id="contact" className="footer-contact-3d">
                <div className="glass-card-3d contact-card-3d scroll-reveal">
                    <span className="section-tag reveal-content">Reach Out</span>
                    <h2 className="section-title reveal-content">Contact Me About Opportunities</h2>

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
                                placeholder="Contact me to find out more about what I can do for you..."
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
                            transform: `translate3d(-50%, ${(1 - solarJourneyProgress) * 280}px, 0) scale(${0.4 + solarJourneyProgress * 0.8})`
                        }}
                    />
                </div>
            </footer>
        </div>
    );
}

window.App = App;