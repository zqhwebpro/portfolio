const { useState, useRef, useEffect } = React;

function App() {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
        }
    }, [score, highScore]);

    useEffect(() => {
        if (gameOver) {
            const timer = setTimeout(() => setGameOver(false), 2500);
            return () => clearTimeout(timer);
        }
    }, [gameOver]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const keys = { controlLeft: false, controlRight: false };
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

        // Smaller Bumpers
        const bumpers = [
            { x: 120, y: 220, r: 7, score: 100, color: '#ffd700' },
            { x: 280, y: 220, r: 7, score: 100, color: '#ffd700' },
            { x: 200, y: 160, r: 8, score: 200, color: '#ffae00' },
        ];

        const handleKeyDown = (e) => {
            if (['Space', 'ControlLeft', 'ControlRight', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault();
            }

            if (e.code === 'Space' && ball.inPlunger) {
                ball.inPlunger = false;
                ball.vx = 0;
                ball.vy = -24.0; // Slower launch speed
                setScore(0);
                setGameOver(false);
            }

            if (e.code === 'ControlLeft') keys.controlLeft = true;
            if (e.code === 'ControlRight') keys.controlRight = true;
        };

        const handleKeyUp = (e) => {
            if (e.code === 'ControlLeft') keys.controlLeft = false;
            if (e.code === 'ControlRight') keys.controlRight = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const update = () => {
            animTime += 0.05;

            if (keys.controlLeft) {
                leftFlipper.angle = Math.max(leftFlipper.activeAngle, leftFlipper.angle - leftFlipper.speed);
            } else {
                leftFlipper.angle = Math.min(leftFlipper.restAngle, leftFlipper.angle + leftFlipper.speed);
            }

            if (keys.controlRight) {
                rightFlipper.angle = Math.min(rightFlipper.activeAngle, rightFlipper.angle + rightFlipper.speed);
            } else {
                rightFlipper.angle = Math.max(rightFlipper.restAngle, rightFlipper.angle - rightFlipper.speed);
            }

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
                // Gravity
                ball.vy += 0.28 / steps;

                // Move ball
                ball.x += (ball.vx * 0.9) / steps;
                ball.y += (ball.vy * 0.9) / steps;

                // Curve left when ball reaches the top of the launcher arch
                if (ball.x > 340 && ball.y < 70) {
                    ball.vx = -7.0;
                }

                // Random angular flux jitter outside launch tube
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

                // Playfield Boundaries
                if (ball.x - ball.radius < 30) {
                    ball.x = 30 + ball.radius;
                    ball.vx *= -0.6;
                }

                if (ball.x - ball.radius < 350 && ball.x + ball.radius > 340 && ball.y > 70) {
                    if (ball.x > 345) {
                        ball.x = 350 + ball.radius;
                        ball.vx = Math.abs(ball.vx) * 0.2;
                    } else {
                        ball.x = 350 - ball.radius;
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

                // Smaller Bumpers Collision
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

                // Flipper Collisions & 0.5s Slope Roll-Off Logic
                const checkFlipper = (f, isLeft) => {
                    const tipX = f.x + Math.cos(f.angle) * f.length;
                    const tipY = f.y + Math.sin(f.angle) * f.length;
                    const fx = tipX - f.x, fy = tipY - f.y;
                    const fLenSq = fx * fx + fy * fy;
                    let t = Math.max(0, Math.min(1, ((ball.x - f.x) * fx + (ball.y - f.y) * fy) / fLenSq));
                    const dist = Math.sqrt((ball.x - (f.x + t * fx)) ** 2 + (ball.y - (f.y + t * fy)) ** 2);

                    if (dist < ball.radius + f.baseRadius) {
                        isTouchingFlipper = true;
                        const isFlipping = (isLeft && keys.controlLeft) || (!isLeft && keys.controlRight);

                        if (isFlipping) {
                            ball.vy = -14.0;
                            ball.vx = isLeft ? 4.0 : -4.0;
                        } else {
                            // Bounce dampening
                            ball.vy = -2.5;
                            ball.vx = isLeft ? 1.5 : -1.5;

                            // Roll down slope if resting (> 0.5 seconds)
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

            // Track time spent touching flipper (~60 frames = 1s, 30 frames = 0.5s)
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

            ctx.fillStyle = '#ff00ff';

            ctx.fillRect(350, 70, 30, 500);

            ctx.beginPath();
            ctx.arc(320, 70, 60, Math.PI * 1.5, Math.PI * 2);
            ctx.lineTo(380, 70);
            ctx.lineTo(350, 70);
            ctx.arc(320, 70, 30, Math.PI * 2, Math.PI * 1.5, true);
            ctx.closePath();
            ctx.fill();

            ctx.fillStyle = '#a000a0';
            ctx.fillRect(362, 70, 6, 500);

            ctx.shadowBlur = 12;
            ctx.shadowColor = '#ff00ff';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 3;

            ctx.beginPath();
            ctx.moveTo(350, 570);
            ctx.lineTo(350, 70);
            ctx.arc(320, 70, 30, 0, Math.PI * 1.5, true);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(380, 570);
            ctx.lineTo(380, 70);
            ctx.arc(320, 70, 60, 0, Math.PI * 1.5, true);
            ctx.stroke();

            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            const offset = (animTime * 40) % 40;
            for (let y = 520; y > 60; y -= 40) {
                const drawY = y - offset;
                if (drawY > 70 && drawY < 530) {
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
            ctx.strokeRect(30, 30, 320, 540);

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

            // Smaller Bumpers
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

            // Ball
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#ffffff';
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fill();

            // Scanlines
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

    return (
        <div style={styles.container}>
            <div style={styles.arcadeBox}>
                <div style={styles.marquee}>
                    <span style={{ color: '#ffd700', textShadow: '2px 2px #ff8800' }}>REACT PIXEL PINBALL</span>
                </div>

                <div style={styles.screenFrame}>
                    <div style={styles.hud}>
                        <span>HIGH SCORE: {highScore.toString().padStart(6, '0')}</span>
                        <span>SCORE: {score.toString().padStart(6, '0')}</span>
                    </div>
                    {gameOver && <div style={styles.gameOverBanner}>GAME OVER</div>}
                    <canvas ref={canvasRef} width={400} height={580} style={styles.canvas} />
                </div>

                <div style={styles.controls}>
                    <div style={styles.keyLabel}><span style={styles.key}>CTRL L</span> LEFT FLIPPER</div>
                    <div style={styles.keyLabel}><span style={styles.key}>SPACE</span> LAUNCH</div>
                    <div style={styles.keyLabel}><span style={styles.key}>CTRL R</span> RIGHT FLIPPER</div>
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
        minHeight: '100vh',
        backgroundColor: '#0a0512',
        fontFamily: '"Press Start 2P", "Courier New", monospace',
    },
    arcadeBox: {
        backgroundColor: '#1b112c',
        border: '8px solid #00f0ff',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 0 30px #ff00aa, inset 0 0 15px #00f0ff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    marquee: {
        fontSize: '16px',
        fontWeight: 'bold',
        letterSpacing: '1px',
        marginBottom: '16px',
        padding: '8px 16px',
        backgroundColor: '#0d0718',
        border: '4px solid #ffd700',
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
    canvas: {
        border: '2px solid #00f0ff',
        display: 'block',
    },
    controls: {
        marginTop: '16px',
        display: 'flex',
        gap: '12px',
    },
    keyLabel: {
        color: '#88aaff',
        fontSize: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
    },
    key: {
        backgroundColor: '#ff0077',
        color: '#fff',
        padding: '4px 8px',
        borderRadius: '4px',
        border: '2px solid #fff',
        boxShadow: '0 0 6px #ff0077',
    },
};

window.App = App;