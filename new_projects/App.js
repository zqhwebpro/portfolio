function App() {
    const canvasRef = React.useRef(null);
    const [score, setScore] = React.useState(0);
    const [gameOver, setGameOver] = React.useState(false);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        const keys = { space: false, controlLeft: false, controlRight: false };
        let animationFrameId;
        let currentScore = 0;

        // Ball: Pixel radius 7 for tight mechanics
        const ball = { x: 365, y: 520, vx: 0, vy: 0, radius: 7, inPlunger: true };

        // Flippers: Enlarged (length 95) with rounded pinball paddle geometry
        const leftFlipper = {
            x: 35,
            y: 510,
            length: 95,
            angle: 0.35,
            restAngle: 0.35,
            activeAngle: -0.3,
            speed: 0.18,
            baseRadius: 10,
            tipRadius: 5
        };

        const rightFlipper = {
            x: 345,
            y: 510,
            length: 95,
            angle: Math.PI - 0.35,
            restAngle: Math.PI - 0.35,
            activeAngle: Math.PI + 0.3,
            speed: 0.18,
            baseRadius: 10,
            tipRadius: 5
        };

        // Bumpers: Reduced to radius 8
        const bumpers = [
            { x: 100, y: 160, r: 8, score: 100, color: '#ff0055' },
            { x: 280, y: 160, r: 8, score: 100, color: '#00ffcc' },
            { x: 190, y: 220, r: 8, score: 200, color: '#ffcc00' },
            { x: 140, y: 120, r: 8, score: 150, color: '#ff00ff' },
            { x: 240, y: 120, r: 8, score: 150, color: '#00ff00' },
        ];

        const handleKeyDown = (e) => {
            if (e.code === 'Space') keys.space = true;
            if (e.code === 'ControlLeft') keys.controlLeft = true;
            if (e.code === 'ControlRight') keys.controlRight = true;
        };

        const handleKeyUp = (e) => {
            if (e.code === 'Space') keys.space = false;
            if (e.code === 'ControlLeft') keys.controlLeft = false;
            if (e.code === 'ControlRight') keys.controlRight = false;
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const update = () => {
            if (ball.inPlunger) {
                ball.x = 365;
                ball.y = 520;
                if (keys.space) {
                    // Strong vertical launch up the right plunger lane
                    ball.vy = -16.0;
                    ball.vx = 0;
                    ball.inPlunger = false;
                }
            } else {
                // Curve Guide at top right: Once ball reaches top of plunger lane (y < 65), apply high upward curve
                if (ball.x > 340 && ball.y < 65) {
                    ball.vx = -1.8;
                    ball.vy = -2.5; // Keeps ball moving up over top of bumpers before dropping
                }

                // Standard floaty gravity
                ball.vy += 0.11;
                ball.x += ball.vx;
                ball.y += ball.vy;
            }

            // Flipper Movement Controls
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

            // Playfield Wall Collisions
            if (ball.x - ball.radius < 30) { ball.x = 30 + ball.radius; ball.vx *= -0.6; }
            if (ball.x + ball.radius > 350 && ball.y > 70 && !ball.inPlunger) { ball.x = 350 - ball.radius; ball.vx *= -0.6; }
            if (ball.x + ball.radius > 380) { ball.x = 380 - ball.radius; ball.vx *= -0.6; }
            if (ball.y - ball.radius < 30) { ball.y = 30 + ball.radius; ball.vy *= -0.6; }

            // Bumper Collisions
            bumpers.forEach((b) => {
                const dx = ball.x - b.x;
                const dy = ball.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < ball.radius + b.r) {
                    const angle = Math.atan2(dy, dx);
                    ball.vx = Math.cos(angle) * 5.5;
                    ball.vy = Math.sin(angle) * 5.5;
                    currentScore += b.score;
                    setScore(currentScore);
                }
            });

            // Pinball Paddle Collision Detection (Capsule Line)
            const checkFlipper = (f, isLeft) => {
                const tipX = f.x + Math.cos(f.angle) * f.length;
                const tipY = f.y + Math.sin(f.angle) * f.length;
                const fx = tipX - f.x, fy = tipY - f.y;
                const fLenSq = fx * fx + fy * fy;
                let t = Math.max(0, Math.min(1, ((ball.x - f.x) * fx + (ball.y - f.y) * fy) / fLenSq));
                const dist = Math.sqrt((ball.x - (f.x + t * fx)) ** 2 + (ball.y - (f.y + t * fy)) ** 2);

                if (dist < ball.radius + f.baseRadius) {
                    ball.vy = (isLeft && keys.controlLeft) || (!isLeft && keys.controlRight) ? -7.5 : -3;
                    ball.vx += isLeft ? 2.0 : -2.0;
                }
            };

            checkFlipper(leftFlipper, true);
            checkFlipper(rightFlipper, false);

            // Drain Hole Condition
            if (ball.y > 580) {
                setGameOver(true);
                ball.inPlunger = true;
                ball.vx = 0;
                ball.vy = 0;
            }
        };

        // Helper to render realistic tapered pinball flippers
        const drawPinballFlipper = (f) => {
            const tipX = f.x + Math.cos(f.angle) * f.length;
            const tipY = f.y + Math.sin(f.angle) * f.length;

            ctx.save();
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ff0055';
            ctx.fillStyle = '#ff0055';
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;

            // Base circle
            ctx.beginPath();
            ctx.arc(f.x, f.y, f.baseRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Tip circle
            ctx.beginPath();
            ctx.arc(tipX, tipY, f.tipRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Connecting tapered body
            const angleNormal = f.angle + Math.PI / 2;
            const p1X = f.x + Math.cos(angleNormal) * f.baseRadius;
            const p1Y = f.y + Math.sin(angleNormal) * f.baseRadius;
            const p2X = tipX + Math.cos(angleNormal) * f.tipRadius;
            const p2Y = tipY + Math.sin(angleNormal) * f.tipRadius;
            const p3X = tipX - Math.cos(angleNormal) * f.tipRadius;
            const p3Y = tipY - Math.sin(angleNormal) * f.tipRadius;
            const p4X = f.x - Math.cos(angleNormal) * f.baseRadius;
            const p4Y = f.y - Math.sin(angleNormal) * f.baseRadius;

            ctx.beginPath();
            ctx.moveTo(p1X, p1Y);
            ctx.lineTo(p2X, p2Y);
            ctx.lineTo(p3X, p3Y);
            ctx.lineTo(p4X, p4Y);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Deep CRT Background
            ctx.fillStyle = '#05030a';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Grid background effect
            ctx.strokeStyle = 'rgba(255, 0, 128, 0.08)';
            ctx.lineWidth = 1;
            for (let x = 0; x < canvas.width; x += 20) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += 20) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }

            // Neon Walls
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#00f0ff';
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 4;
            ctx.strokeRect(30, 30, 320, 540);
            ctx.strokeRect(350, 70, 30, 500);

            // Top Plunger Arch Guide Line
            ctx.beginPath();
            ctx.arc(320, 70, 30, Math.PI * 1.5, Math.PI * 2);
            ctx.stroke();

            // Drain Guide Walls
            ctx.beginPath();
            ctx.moveTo(30, 480); ctx.lineTo(100, 560);
            ctx.moveTo(350, 480); ctx.lineTo(280, 560);
            ctx.stroke();

            // Bumpers (Extra Small Radius: 8)
            bumpers.forEach((b) => {
                ctx.shadowBlur = 12;
                ctx.shadowColor = b.color;
                ctx.fillStyle = b.color;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fill();
            });

            // Pinball Paddles Render
            drawPinballFlipper(leftFlipper);
            drawPinballFlipper(rightFlipper);

            // Pixelated Ball
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#ffffff';
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);

            // CRT Scanline Overlay
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
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
                    <span style={{ color: '#ff0077', textShadow: '2px 2px #00ffff' }}>PIXEL</span>
                    <span style={{ color: '#00ffff', textShadow: '2px 2px #ff0077' }}> PINBALL</span>
                </div>

                <div style={styles.screenFrame}>
                    <div style={styles.hud}>
                        <span>HIGH SCORE: 999900</span>
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
        fontSize: '22px',
        fontWeight: 'bold',
        letterSpacing: '2px',
        marginBottom: '16px',
        padding: '8px 20px',
        backgroundColor: '#0d0718',
        border: '4px solid #ff0077',
        borderRadius: '4px',
        boxShadow: '0 0 12px #ff0077',
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