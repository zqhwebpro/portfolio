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
                    const duration = 1800;
                    const startTime = performance.now();

                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeProgress = 1 - Math.pow(1 - progress, 3);

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
            { threshold: 0.2 }
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
    // Optimized lightweight twinkling stars (16 points with GPU-accelerated opacity)
    const stars = React.useMemo(() => {
        return Array.from({ length: 16 }, (_, i) => ({
            id: i,
            top: `${(Math.random() * 95).toFixed(1)}%`,
            left: `${(Math.random() * 95).toFixed(1)}%`,
            size: `${(Math.random() * 1.6 + 1).toFixed(1)}px`,
            duration: `${(Math.random() * 2 + 2).toFixed(2)}s`,
            delay: `${(Math.random() * 2).toFixed(2)}s`
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
    const [submitted, setSubmitted] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const canvasRef = React.useRef(null);
    const heroCardRef = React.useRef(null);
    const planetWrapperRef = React.useRef(null);
    const giantSunRef = React.useRef(null);
    const solarDescentGlowRef = React.useRef(null);

    const mouseRef = React.useRef({ x: 0, y: 0 });
    const targetMouseRef = React.useRef({ x: 0, y: 0 });
    const currentScrollRef = React.useRef(0);

    const getDecodedEmail = () => {
        const parts = ["zqhwebpro", "gmail", "com"];
        return `${parts[0]}@${parts[1]}.${parts[2]}`;
    };

    // UNIFIED HIGH-PERFORMANCE ANIMATION ENGINE (Physics + Starfield Canvas in 1 RAF Loop)
    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        let animationFrameId;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

        const resizeCanvas = () => {
            // Keep DPR at 1.25 on iPad/touch to prevent GPU memory pressure, and 1.5 on Mac
            const dpr = Math.min(window.devicePixelRatio || 1, isTouchDevice ? 1.25 : 1.5);
            width = window.innerWidth;
            height = window.innerHeight;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });

        const createStarLayer = (count, minSize, maxSize) => {
            return Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * (maxSize - minSize) + minSize,
                pulseSpeed: Math.random() * 0.02 + 0.01,
                phase: Math.random() * Math.PI * 2
            }));
        };

        // Perfectly balanced star field for 60/120fps on iPad & Mac
        const starsDeep = createStarLayer(70, 0.9, 1.4);
        const starsMid = createStarLayer(45, 1.4, 2.0);
        const starsNear = createStarLayer(24, 2.0, 2.8);

        let time = 0;
        let isLightActive = false;
        let sunVisible = false;

        const loop = () => {
            time += 1;

            // 1. Responsive scroll physics (no sluggish lag on touch or Mac trackpad)
            const targetScroll = window.scrollY;
            const scrollDiff = targetScroll - currentScrollRef.current;
            if (Math.abs(scrollDiff) < 0.25) {
                currentScrollRef.current = targetScroll;
            } else {
                currentScrollRef.current += scrollDiff * 0.12;
            }
            const current = currentScrollRef.current;

            // 2. Mouse parallax interpolation
            const mouseDiffX = targetMouseRef.current.x - mouseRef.current.x;
            const mouseDiffY = targetMouseRef.current.y - mouseRef.current.y;
            mouseRef.current.x += mouseDiffX * 0.06;
            mouseRef.current.y += mouseDiffY * 0.06;
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            const winH = window.innerHeight;
            const docH = document.documentElement.scrollHeight;
            const maxScroll = Math.max(1, docH - winH);
            const progress = Math.min(Math.max(current / maxScroll, 0), 1);

            // 3. VIEWPORT CULLING: Only update hero elements if within or near viewport
            if (current < winH * 1.3) {
                if (planetWrapperRef.current) {
                    const now = performance.now();
                    const moonFloatY = Math.sin(now * 0.0006) * 12;
                    const moonFloatX = Math.cos(now * 0.0004) * 10;
                    const moonRot = Math.sin(now * 0.0003) * 3;
                    planetWrapperRef.current.style.transform = `scale(${1 + progress * 0.35}) translate3d(${moonFloatX}px, ${current * 0.12 + moonFloatY}px, 0) rotate(${moonRot}deg)`;
                }

                if (heroCardRef.current && !isTouchDevice) {
                    heroCardRef.current.style.transform = `rotateY(${mx * 0.018}deg) rotateX(${-my * 0.018}deg)`;
                }
            }

            // 4. VIEWPORT CULLING: Only update giant sun when scrolled down
            if (giantSunRef.current) {
                if (progress > 0.18) {
                    if (!sunVisible) {
                        giantSunRef.current.style.display = 'block';
                        sunVisible = true;
                    }
                    const sunOpacity = Math.min(1, Math.max(0, (progress - 0.22) / 0.65));
                    const sunRise = (1 - progress) * 260;
                    const sunScale = 0.35 + Math.pow(progress, 1.2) * 0.8;
                    giantSunRef.current.style.opacity = sunOpacity.toFixed(3);
                    giantSunRef.current.style.transform = `translate3d(-50%, ${sunRise.toFixed(1)}px, 0) scale(${sunScale.toFixed(3)})`;
                } else if (sunVisible) {
                    giantSunRef.current.style.display = 'none';
                    giantSunRef.current.style.opacity = '0';
                    sunVisible = false;
                }
            }

            // 5. Ambient solar glow fade
            if (solarDescentGlowRef.current) {
                if (progress > 0.1) {
                    solarDescentGlowRef.current.style.opacity = Math.pow(progress, 2.5).toFixed(3);
                } else {
                    solarDescentGlowRef.current.style.opacity = '0';
                }
            }

            // 6. Day / Night mode toggle
            const shouldBeLight = progress > 0.82;
            if (shouldBeLight !== isLightActive) {
                isLightActive = shouldBeLight;
                document.body.classList.toggle('solar-lit-active', shouldBeLight);
            }

            // 7. BATCHED CANVAS STARFIELD (Single-path draw calls for maximum 60/120fps efficiency)
            ctx.clearRect(0, 0, width, height);
            const starFillColor = isLightActive ? '#3c2a1e' : '#ffffff';

            const drawBatchLayer = (stars, mxMult, myMult, syMult, baseAlpha) => {
                ctx.save();
                ctx.translate(mx * mxMult, my * myMult);
                ctx.globalAlpha = baseAlpha;
                ctx.fillStyle = starFillColor;
                ctx.beginPath();
                for (let i = 0; i < stars.length; i++) {
                    const star = stars[i];
                    const yPos = (star.y - current * syMult) % height;
                    const wrappedY = yPos < 0 ? yPos + height : yPos;
                    const r = star.size * (0.8 + 0.35 * Math.sin(time * star.pulseSpeed + star.phase));
                    ctx.moveTo(star.x + r, wrappedY);
                    ctx.arc(star.x, wrappedY, r, 0, Math.PI * 2);
                }
                ctx.fill();
                ctx.restore();
            };

            drawBatchLayer(starsDeep, 0.02, 0.02, 0.08, isLightActive ? 0.35 : 0.55);
            drawBatchLayer(starsMid, 0.04, 0.04, 0.22, isLightActive ? 0.5 : 0.75);
            drawBatchLayer(starsNear, 0.08, 0.08, 0.4, isLightActive ? 0.65 : 0.9);

            animationFrameId = requestAnimationFrame(loop);
        };

        const handlePointerMove = (e) => {
            if (e.touches) return; // Prevent touch scroll hitching on iPad
            targetMouseRef.current = {
                x: (e.clientX / window.innerWidth - 0.5) * 22,
                y: (e.clientY / window.innerHeight - 0.5) * 22
            };
        };

        window.addEventListener('mousemove', handlePointerMove, { passive: true });

        // Start unified engine
        loop();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handlePointerMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    React.useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-active');
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

        const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
        const body = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}`
        );

        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
        setSubmitted(true);
        setIsSubmitting(false);
    };

    return (
        <div className="canvas-wrapper">
            <div className="fixed-space-texture-bg" aria-hidden="true" />
            <div ref={solarDescentGlowRef} className="solar-descent-glow" aria-hidden="true" />

            <canvas ref={canvasRef} className="galaxy-canvas" />

            {/* CASE STUDY BUTTON - commented out until ready to review
            <a
                href="./case-study.html"
                className="floating-brand-badge-bottom"
                title="View Project Case Study"
            >
                Case Study
            </a>
            */}

            {/* HERO SECTION */}
            <header className="hero-3d-wrapper">
                <div className="deep-space-nebula-container" aria-hidden="true">
                    <div className="nebula-swirl nebula-1"></div>
                    <div className="nebula-swirl nebula-2"></div>

                    <div ref={planetWrapperRef} className="solar-system-planet-wrapper">
                        <div className="planet-lunar-core">
                            <div className="lunar-maria maria-1"></div>
                            <div className="lunar-maria maria-2"></div>
                            <div className="lunar-maria maria-3"></div>
                            <div className="lunar-crater crater-1"></div>
                            <div className="lunar-crater crater-2"></div>
                            <div className="lunar-crater crater-3"></div>
                            <div className="lunar-crater crater-4"></div>
                            <div className="lunar-crater crater-5"></div>
                            <div className="lunar-shadow-overlay"></div>
                        </div>
                    </div>
                </div>

                <div className="hero-content-inner">
                    <HeroFlyingStars />
                    <div ref={heroCardRef} className="glass-card-3d hero-glass-portal">
                        <h1 className="hero-headline">
                            An Animated Journey from <span>Night to Day.</span>
                        </h1>
                        <p className="hero-description">
                            A high-performance promotional web experience engineered with procedural canvas starfields, dynamic mouse-gravity parallax, and zero external animation libraries—smoothly transitioning from deep-space night into daylight as you scroll.
                        </p>
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
                    <div className="scroll-reveal" style={{ marginBottom: '4rem' }}>
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

            {/* FOOTER */}
            <footer id="contact" className="footer-contact-3d">
                <div className="glass-card-3d contact-card-3d scroll-reveal">
                    <span className="section-tag reveal-content">ENJOY A SHINING NEW DAY</span>
                    <h2 className="section-title reveal-content">Contact me to build your next interactive experience.</h2>

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
                    <div ref={giantSunRef} className="giant-glowing-sun" />
                </div>
            </footer>
        </div>
    );
}

window.App = App;