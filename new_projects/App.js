const { useState, useRef, useEffect } = React;

function App() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    // Dynamic scaling & viewport tracking state
    const [scale, setScale] = useState(1);
    const [isMobile, setIsMobile] = useState(false);

    // Shared input refs to prevent closure stale states inside requestAnimationFrame
    const inputsRef = useRef({
        leftFlipper: false,
        rightFlipper: false,
        launchTriggered: false
    });

    // Handle high score tracking
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
        }
    }, [score, highScore]);

    // Game over timer reset
    useEffect(() => {
        if (gameOver) {
            const timer = setTimeout(() => setGameOver(false), 2500);
            return () => clearTimeout(timer);
        }
    }, [gameOver]);

    // Handle dynamic responsiveness scaling to fit any screen resolution perfectly
    useEffect(() => {
        const updateScale = () => {
            const mobileCheck = window.innerWidth <= 768;
            setIsMobile(mobileCheck);

            // Responsive padding allowance
            const verticalPadding = mobileCheck ? 12 : 64;
            const horizontalPadding = mobileCheck ? 12 : 32;

            const targetWidth = 432;  // Total unscaled pixel width of arcadeBox
            const targetHeight = 740; // Total unscaled pixel height of arcadeBox

            const availableWidth = window.innerWidth - horizontalPadding;
            const availableHeight = window.innerHeight - verticalPadding;

            const scaleX = availableWidth / targetWidth;
            const scaleY = availableHeight / targetHeight;

            // Constrain scale so the cabinet always fits vertically & horizontally
            const newScale = Math.min(scaleX, scaleY, 1.1);
            setScale(Math.max(newScale, 0.40));
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    // Main Canvas Game Loop & Inputs
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let animationFrameId;
        let animTime = 0;
        let flipperRestTimer = 0;

        const ball = { x: 365, y: 520, vx: 0, vy: 0, radius: 6, inPlunger: true };

        const leftFlipper = {
            x: 32,
            y: 510,
            length: 100,
            angle: 0.35,
            restAngle: 0.35,
            activeAngle: -0.35,
            speed: 0.22,
            baseRadius: 9,
            tipRadius: 4
        };

        const rightFlipper = {
            x: 348,
            y: 510,
            length: 100,
            angle: Math.PI - 0.35,
            restAngle: Math.PI - 0.35,
            activeAngle: Math.PI + 0.35,
            speed: 0.22,
            baseRadius: 9,
            tipRadius: 4
        };

        const bumpers = [
            { x: 120, y: 220, r: 7, score: 100, color: '#ffd700' },
            { x: 280, y: 220, r: 7, score: 100, color: '#ffd700' },
            { x: 200, y: 160, r: 8, score: 200, color: '#ffae00' },
        ];

        // --- Keyboard Controls ---
        const handleKeyDown = (e) => {
            if (['Space', 'ControlLeft', 'ControlRight', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault();
            }

            if (e.code === 'Space') {
                inputsRef.current.launchTriggered = true;
            }
            if (e.code === 'ControlLeft' || e.code === 'ArrowLeft') {
                inputsRef.current.leftFlipper = true;
            }
            if (e.code === 'ControlRight' || e.code === 'ArrowRight') {
                inputsRef.current.rightFlipper = true;
            }
        };

        const handleKeyUp = (e) => {
            if (e.code === 'ControlLeft' || e.code === 'ArrowLeft') {
                inputsRef.current.leftFlipper = false;
            }
            if (e.code === 'ControlRight' || e.code === 'ArrowRight') {
                inputsRef.current.rightFlipper = false;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // --- Physics Update Loop ---
        const update = () => {
            animTime += 0.05;

            // Handle Ball Launch Trigger
            if (inputsRef.current.launchTriggered) {
                if (ball.inPlunger) {
                    ball.inPlunger = false;
                    ball.vx = 0;
                    ball.vy = -24.0;
                    setScore(0);
                    setGameOver(false);
                }
                inputsRef.current.launchTriggered = false;
            }

            // Flipper Rotation Motion
            if (inputsRef.current.leftFlipper) {
                leftFlipper.angle = Math.max(leftFlipper.activeAngle, leftFlipper.angle - leftFlipper.speed);
            } else {
                leftFlipper.angle = Math.min(leftFlipper.restAngle, leftFlipper.angle + leftFlipper.speed);
            }

            if (inputsRef.current.rightFlipper) {
                rightFlipper.angle = Math.min(rightFlipper.activeAngle, rightFlipper.angle + rightFlipper.speed);
            } else {
                rightFlipper.angle = Math.max(rightFlipper.restAngle, rightFlipper.angle - rightFlipper.speed);
            }

            // Ball Resting state in Plunger
            if (ball.inPlunger) {
                ball.x = 365;
                ball.y = 520;
                ball.vx = 0;
                ball.vy = 0;
                flipperRestTimer = 0;
                return;
            }

            let isTouchingFlipper = false;
            const steps = 4;

            for (let step = 0; step < steps; step++) {
                ball.vy += 0.28 / steps;

                ball.x += (ball.vx * 0.9) / steps;
                ball.y += (ball.vy * 0.9) / steps;

                if (ball.x > 340 && ball.y < 70) {
                    ball.vx = -7.0;
                }

                if (ball.y > 110 && ball.x < 340) {
                    const speed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
                    if (speed > 0.1) {
                        let currentAngle = Math.atan2(ball.vy, ball.vx);
                        let angleVariation = (Math.random() - 0.5) * (10 * Math.PI / 180) / steps;

                        if (Math.random() < (0.03 / steps)) {
                            angleVariation += (Math.random() - 0.5) * (40 * Math.PI / 180);
                        }

                        currentAngle += angleVariation;
                        ball.vx = Math.cos(currentAngle) * speed;
                        ball.vy = Math.sin(currentAngle) * speed;
                    }
                }

                if (ball.x - ball.radius < 30) {
                    ball.x = 30 + ball.radius;
                    ball.vx *= -0.6;
                }

                if (ball.x - ball.radius < 350 && ball.x + ball.radius > 345 && ball.y > 70) {
                    if (ball.x > 347) {
                        ball.x = 347 + ball.radius;
                        ball.vx = Math.abs(ball.vx) * 0.2;
                    } else {
                        ball.x = 345 - ball.radius;
                        ball.vx = -Math.abs(ball.vx) * 0.6;
                    }
                }

                if (ball.x + ball.radius > 380) {
                    ball.x = 380 - ball.radius;
                    ball.vx *= -0.4;
                }

                if (ball.y - ball.radius < 30) {
                    ball.y = 30 + ball.radius;
                    ball.vy = Math.abs(ball.vy) * 0.3;
                }

                bumpers.forEach((b) => {
                    const dx = ball.x - b.x;
                    const dy = ball.y - b.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < ball.radius + b.r) {
                        const angle = Math.atan2(dy, dx);
                        ball.vx = Math.cos(angle) * 5.5;
                        ball.vy = Math.sin(angle) * 5.5;
                        setScore((prev) => prev + b.score);
                    }
                });

                const checkFlipper = (f, isLeft) => {
                    const tipX = f.x + Math.cos(f.angle) * f.length;
                    const tipY = f.y + Math.sin(f.angle) * f.length;
                    const fx = tipX - f.x, fy = tipY - f.y;
                    const fLenSq = fx * fx + fy * fy;
                    let t = Math.max(0, Math.min(1, ((ball.x - f.x) * fx + (ball.y - f.y) * fy) / fLenSq));
                    const dist = Math.sqrt((ball.x - (f.x + t * fx)) ** 2 + (ball.y - (f.y + t * fy)) ** 2);

                    if (dist < ball.radius + f.baseRadius) {
                        isTouchingFlipper = true;
                        const isFlipping = (isLeft && inputsRef.current.leftFlipper) || (!isLeft && inputsRef.current.rightFlipper);

                        if (isFlipping) {
                            ball.vy = -14.0;
                            ball.vx = isLeft ? 4.0 : -4.0;
                        } else {
                            ball.vy = -2.5;
                            ball.vx = isLeft ? 1.5 : -1.5;

                            if (flipperRestTimer > 30) {
                                const slideDir = isLeft ? Math.cos(f.angle) : -Math.cos(f.angle);
                                ball.vx += slideDir * 1.8;
                                ball.vy += Math.sin(f.angle) * 1.2;
                            }
                        }
                    }
                };

                checkFlipper(leftFlipper, true);
                checkFlipper(rightFlipper, false);
            }

            if (isTouchingFlipper && Math.abs(ball.vx) < 1.0 && Math.abs(ball.vy) < 1.0) {
                flipperRestTimer++;
            } else {
                flipperRestTimer = 0;
            }

            if (ball.y > 570) {
                setGameOver(true);
                ball.inPlunger = true;
                ball.vx = 0;
                ball.vy = 0;
            }
        };

        const drawStylizedFlipper = (f) => {
            const tipX = f.x + Math.cos(f.angle) * f.length;
            const tipY = f.y + Math.sin(f.angle) * f.length;
            const angleNormal = f.angle + Math.PI / 2;

            ctx.save();
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff2255';

            const p1X = f.x + Math.cos(angleNormal) * f.baseRadius;
            const p1Y = f.y + Math.sin(angleNormal) * f.baseRadius;
            const p3X = tipX - Math.cos(angleNormal) * f.tipRadius;
            const p3Y = tipY - Math.sin(angleNormal) * f.tipRadius;

            const grad = ctx.createLinearGradient(f.x, f.y, tipX, tipY);
            grad.addColorStop(0, '#ff0055');
            grad.addColorStop(0.5, '#ff5500');
            grad.addColorStop(1, '#ffff00');

            ctx.fillStyle = grad;
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1.5;

            ctx.beginPath();
            ctx.arc(f.x, f.y, f.baseRadius, angleNormal, angleNormal + Math.PI);
            ctx.lineTo(p3X, p3Y);
            ctx.arc(tipX, tipY, f.tipRadius, angleNormal + Math.PI, angleNormal);
            ctx.lineTo(p1X, p1Y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(f.x, f.y, f.baseRadius * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.fill();

            ctx.restore();
        };

        const drawOpaqueMagentaLauncher = () => {
            ctx.save();
            ctx.fillStyle = '#1a001a';
            ctx.fillRect(345, 60, 40, 510);

            ctx.fillStyle = '#ff00aa';
            ctx.fillRect(341, 60, 4, 510);
            ctx.fillRect(385, 60, 4, 510);
            ctx.fillRect(341, 56, 48, 8);

            ctx.fillStyle = '#d40088';
            ctx.fillRect(345, 60, 2, 510);
            ctx.fillRect(383, 60, 2, 510);

            ctx.shadowBlur = 8;
            ctx.shadowColor = '#ff00aa';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;

            ctx.beginPath();
            ctx.moveTo(345, 570);
            ctx.lineTo(345, 60);
            ctx.lineTo(385, 60);
            ctx.lineTo(385, 570);
            ctx.stroke();

            ctx.strokeStyle = '#ffff00';
            ctx.lineWidth = 2;
            const offset = (animTime * 40) % 40;
            for (let y = 520; y > 60; y -= 40) {
                const drawY = y - offset;
                if (drawY > 65 && drawY < 530) {
                    ctx.beginPath();
                    ctx.moveTo(358, drawY + 6);
                    ctx.lineTo(365, drawY);
                    ctx.lineTo(372, drawY + 6);
                    ctx.stroke();
                }
            }

            ctx.restore();
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#05030a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = 'rgba(255, 0, 128, 0.06)';
            ctx.lineWidth = 1;
            for (let x = 0; x < canvas.width; x += 20) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += 20) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }

            drawOpaqueMagentaLauncher();

            ctx.shadowBlur = 8;
            ctx.shadowColor = '#00f0ff';
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 4;
            ctx.strokeRect(30, 30, 315, 540);

            const springTopY = ball.inPlunger ? 530 : 550;
            ctx.shadowBlur = 6;
            ctx.shadowColor = '#ff0055';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;

            ctx.beginPath();
            ctx.moveTo(365, springTopY);
            ctx.lineTo(365, 570);
            ctx.stroke();

            ctx.strokeStyle = '#ff0055';
            ctx.lineWidth = 2;
            ctx.beginPath();
            const coils = 6;
            const springLen = 570 - springTopY;
            for (let i = 0; i <= coils; i++) {
                const currY = springTopY + (i / coils) * springLen;
                const offsetX = (i % 2 === 0 ? -6 : 6);
                if (i === 0) ctx.moveTo(365, currY);
                else ctx.lineTo(365 + offsetX, currY);
            }
            ctx.stroke();

            bumpers.forEach((b) => {
                ctx.save();
                ctx.shadowBlur = 10;
                ctx.shadowColor = b.color;

                const grad = ctx.createRadialGradient(b.x, b.y, 1, b.x, b.y, b.r);
                grad.addColorStop(0, '#ffffff');
                grad.addColorStop(0.4, b.color);
                grad.addColorStop(1, '#996600');

                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#ffffff';
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.restore();
            });

            drawStylizedFlipper(leftFlipper);
            drawStylizedFlipper(rightFlipper);

            ctx.shadowBlur = 12;
            ctx.shadowColor = '#ffffff';
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            for (let i = 0; i < canvas.height; i += 4) {
                ctx.fillRect(0, i, canvas.width, 2);
            }
        };

        const gameLoop = () => {
            update();
            render();
            animationFrameId = requestAnimationFrame(gameLoop);
        };

        gameLoop();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    // Multi-touch handler routing (left screen, right screen, or launcher zone)
    const handleTouchStart = (e) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();

        for (let i = 0; i < e.touches.length; i++) {
            const touch = e.touches[i];
            const touchX = (touch.clientX - rect.left) / scale;

            if (touchX > 340) {
                inputsRef.current.launchTriggered = true;
            } else if (touchX < 200) {
                inputsRef.current.leftFlipper = true;
            } else {
                inputsRef.current.rightFlipper = true;
            }
        }
    };

    const handleTouchEnd = (e) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();

        let leftActive = false;
        let rightActive = false;

        for (let i = 0; i < e.touches.length; i++) {
            const touch = e.touches[i];
            const touchX = (touch.clientX - rect.left) / scale;

            if (touchX < 200) leftActive = true;
            else if (touchX >= 200 && touchX <= 340) rightActive = true;
        }

        inputsRef.current.leftFlipper = leftActive;
        inputsRef.current.rightFlipper = rightActive;
    };

    return (
        <div style={{
            ...styles.container,
            padding: isMobile ? '6px' : '32px 16px'
        }}>
            {/* Bottom Left Portfolio Button */}
            <a
                href="https://zqhwebpro.github.io/portfolio/2026/"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.portfolioBtn}
            >
                See Portfolio
            </a>


            <div
                ref={containerRef}
                style={{
                    ...styles.arcadeBox,
                    transform: `scale(${scale})`,
                    transformOrigin: 'center center'
                }}
            >
                <div style={styles.marquee}>
                    <span style={{ color: '#ffd700', textShadow: '2px 2px #ff8800' }}>REACT PIXEL PINBALL</span>
                </div>

                <div style={styles.screenFrame}>
                    <div style={styles.hud}>
                        <span>HIGH SCORE: {highScore.toString().padStart(6, '0')}</span>
                        <span>SCORE: {score.toString().padStart(6, '0')}</span>
                    </div>
                    {gameOver && <div style={styles.gameOverBanner}>GAME OVER</div>}

                    <div
                        style={styles.canvasWrapper}
                        onTouchStart={handleTouchStart}
                        onTouchEnd={handleTouchEnd}
                        onTouchCancel={handleTouchEnd}
                    >
                        <canvas ref={canvasRef} width={400} height={580} style={styles.canvas} />
                    </div>
                </div>

                {/* Touch-Ready On-Screen Control Buttons */}
                <div style={styles.controls}>
                    <button
                        style={{ ...styles.button, ...styles.leftButton }}
                        onTouchStart={(e) => { e.preventDefault(); inputsRef.current.leftFlipper = true; }}
                        onTouchEnd={(e) => { e.preventDefault(); inputsRef.current.leftFlipper = false; }}
                        onMouseDown={() => inputsRef.current.leftFlipper = true}
                        onMouseUp={() => inputsRef.current.leftFlipper = false}
                    >
                        CTRL + LEFT
                    </button>

                    <button
                        style={{ ...styles.button, ...styles.launchButton }}
                        onTouchStart={(e) => { e.preventDefault(); inputsRef.current.launchTriggered = true; }}
                        onMouseDown={() => inputsRef.current.launchTriggered = true}
                    >
                        SPACE / LAUNCH
                    </button>

                    <button
                        style={{ ...styles.button, ...styles.rightButton }}
                        onTouchStart={(e) => { e.preventDefault(); inputsRef.current.rightFlipper = true; }}
                        onTouchEnd={(e) => { e.preventDefault(); inputsRef.current.rightFlipper = false; }}
                        onMouseDown={() => inputsRef.current.rightFlipper = true}
                        onMouseUp={() => inputsRef.current.rightFlipper = false}
                    >
                        CTRL + RIGHT
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100dvh', // Replaces min-height to fix canvas box overflow
        boxSizing: 'border-box',
        backgroundColor: '#0a0512',
        fontFamily: '"Press Start 2P", "Courier New", monospace',
        overflow: 'hidden',
        touchAction: 'none',
        userSelect: 'none',
        position: 'relative',
    },

    portfolioBtn: {
        position: 'fixed',
        bottom: '16px',
        left: '16px',
        padding: '10px 14px',
        backgroundColor: '#0d0718',
        color: '#ffd700',
        border: '2px solid #ffd700',
        borderRadius: '6px',
        boxShadow: '0 0 12px rgba(255, 215, 0, 0.6)',
        fontSize: '10px',
        fontWeight: 'bold',
        textDecoration: 'none',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'inherit',
        letterSpacing: '0.5px',
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
    },

    floatingHelpBtn: {
        position: 'fixed',
        top: '16px',
        right: '16px',
        width: '42px',
        height: '42px',
        borderRadius: '50%',
        backgroundColor: '#ff00aa',
        color: '#ffffff',
        border: '3px solid #ffffff',
        boxShadow: '0 0 15px #ff00aa',
        fontSize: '20px',
        fontWeight: 'bold',
        cursor: 'pointer',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'inherit',
    },

    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(10, 5, 18, 0.85)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 200,
    },

    modalContent: {
        backgroundColor: '#1b112c',
        border: '4px solid #ff00aa',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 0 25px #ff00aa',
        color: '#ffffff',
        maxWidth: '300px',
        width: '80%',
    },

    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '14px',
        color: '#ffd700',
        marginBottom: '16px',
    },

    closeBtn: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#ff0055',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontFamily: 'inherit',
    },

    controlsList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        fontSize: '10px',
        lineHeight: '2.2',
    },

    keyTag: {
        backgroundColor: '#0d0718',
        border: '1px solid #00f0ff',
        color: '#00f0ff',
        padding: '2px 6px',
        borderRadius: '4px',
        marginRight: '8px',
    },

    arcadeBox: {
        backgroundColor: '#1b112c',
        border: '8px solid #00f0ff',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 0 30px #ff00aa, inset 0 0 15px #00f0ff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        touchAction: 'none',
        boxSizing: 'border-box',
        flexShrink: 0, // Prevents flex container from distorting the arcade box aspect ratio
    },
    marquee: {
        fontSize: '14px',
        fontWeight: 'bold',
        letterSpacing: '1px',
        marginBottom: '12px',
        padding: '6px 12px',
        backgroundColor: '#0d0718',
        border: '3px solid #ffd700',
        borderRadius: '4px',
        boxShadow: '0 0 12px #ffd700',
    },
    screenFrame: {
        backgroundColor: '#000',
        border: '6px solid #ff00aa',
        borderRadius: '8px',
        padding: '8px',
        position: 'relative',
        boxShadow: 'inset 0 0 20px rgba(0,240,255,0.4)',
    },
    hud: {
        color: '#33ff00',
        fontSize: '11px',
        marginBottom: '8px',
        display: 'flex',
        justifyContent: 'space-between',
        textShadow: '0 0 5px #33ff00',
    },
    gameOverBanner: {
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#ff0055',
        fontSize: '20px',
        fontWeight: 'bold',
        textShadow: '3px 3px #000, 0 0 10px #ff0055',
        zIndex: 10,
        pointerEvents: 'none',
    },
    canvasWrapper: {
        position: 'relative',
        touchAction: 'none',
    },
    canvas: {
        border: '2px solid #00f0ff',
        display: 'block',
        touchAction: 'none',
    },
    controls: {
        marginTop: '14px',
        display: 'flex',
        gap: '12px',
        width: '100%',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: '#ff0077',
        color: '#fff',
        padding: '12px 10px',
        borderRadius: '6px',
        border: '2px solid #fff',
        boxShadow: '0 0 8px #ff0077',
        fontSize: '10px',
        fontWeight: 'bold',
        cursor: 'pointer',
        touchAction: 'manipulation',
        flex: 1,
        fontFamily: 'inherit',
    },
    leftButton: {
        backgroundColor: '#ff0055',
    },
    launchButton: {
        backgroundColor: '#ffd700',
        color: '#000',
        boxShadow: '0 0 8px #ffd700',
    },
    rightButton: {
        backgroundColor: '#ff0055',
    },
};

window.App = App;