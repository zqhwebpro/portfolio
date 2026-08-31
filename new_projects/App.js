export default function PinballGame() {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Key states
        const keys = {
            space: false,
            controlLeft: false,
            controlRight: false,
        };

        // Game Objects State
        let animationFrameId;
        let currentScore = 0;

        const ball = {
            x: 365,
            y: 500,
            vx: 0,
            vy: 0,
            radius: 8,
            inPlunger: true,
        };

        const leftFlipper = {
            x: 130,
            y: 520,
            length: 60,
            angle: 0.3,
            restAngle: 0.3,
            activeAngle: -0.4,
            speed: 0.2,
        };

        const rightFlipper = {
            x: 250,
            y: 520,
            length: 60,
            angle: Math.PI - 0.3,
            restAngle: Math.PI - 0.3,
            activeAngle: Math.PI + 0.4,
            speed: 0.2,
        };

        const bumpers = [
            { x: 150, y: 180, r: 20, score: 100, color: '#f00' },
            { x: 230, y: 180, r: 20, score: 100, color: '#0f0' },
            { x: 190, y: 250, r: 20, score: 200, color: '#ff0' },
        ];

        // Event Listeners
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

        // Main Game Loop
        const update = () => {
            // 1. Plunger Launcher Logic
            if (ball.inPlunger) {
                ball.x = 365;
                ball.y = 520;
                if (keys.space) {
                    ball.vy = -16;
                    ball.vx = -1.5;
                    ball.inPlunger = false;
                }
            } else {
                // Apply Gravity
                ball.vy += 0.25;
                ball.x += ball.vx;
                ball.y += ball.vy;
            }

            // 2. Flipper Physics & Animation
            // Left Flipper
            if (keys.controlLeft) {
                leftFlipper.angle = Math.max(leftFlipper.activeAngle, leftFlipper.angle - leftFlipper.speed);
            } else {
                leftFlipper.angle = Math.min(leftFlipper.restAngle, leftFlipper.angle + leftFlipper.speed);
            }

            // Right Flipper
            if (keys.controlRight) {
                rightFlipper.angle = Math.min(rightFlipper.activeAngle, rightFlipper.angle + rightFlipper.speed);
            } else {
                rightFlipper.angle = Math.max(rightFlipper.restAngle, rightFlipper.angle - rightFlipper.speed);
            }

            // 3. Wall Collisions
            // Outer Walls
            if (ball.x - ball.radius < 30) { ball.x = 30 + ball.radius; ball.vx *= -0.7; }
            if (ball.x + ball.radius > 350 && !ball.inPlunger) { ball.x = 350 - ball.radius; ball.vx *= -0.7; }
            if (ball.x + ball.radius > 380) { ball.x = 380 - ball.radius; ball.vx *= -0.7; }
            if (ball.y - ball.radius < 30) { ball.y = 30 + ball.radius; ball.vy *= -0.7; }

            // Bumper Collisions
            bumpers.forEach((b) => {
                const dx = ball.x - b.x;
                const dy = ball.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < ball.radius + b.r) {
                    const angle = Math.atan2(dy, dx);
                    const force = 12;
                    ball.vx = Math.cos(angle) * force;
                    ball.vy = Math.sin(angle) * force;
                    currentScore += b.score;
                    setScore(currentScore);
                }
            });

            // Flipper Collisions
            const checkFlipperCollision = (f, isLeft) => {
                const tipX = f.x + Math.cos(f.angle) * f.length;
                const tipY = f.y + Math.sin(f.angle) * f.length;

                // Vector from pivot to tip
                const fx = tipX - f.x;
                const fy = tipY - f.y;
                const fLenSq = fx * fx + fy * fy;

                // Projection of ball onto line segment
                let t = ((ball.x - f.x) * fx + (ball.y - f.y) * fy) / fLenSq;
                t = Math.max(0, Math.min(1, t));

                const closestX = f.x + t * fx;
                const closestY = f.y + t * fy;
                const dx = ball.x - closestX;
                const dy = ball.y - closestY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < ball.radius + 6) {
                    const impulse = (isLeft && keys.controlLeft) || (!isLeft && keys.controlRight) ? -12 : -5;
                    ball.vy = impulse;
                    ball.vx += isLeft ? 2 : -2;
                }
            };

            checkFlipperCollision(leftFlipper, true);
            checkFlipperCollision(rightFlipper, false);

            // 4. Out of Bounds (Drain)
            if (ball.y > 600) {
                setGameOver(true);
                ball.inPlunger = true;
                ball.vx = 0;
                ball.vy = 0;
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Playfield Background
            ctx.fillStyle = '#111122';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Walls
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 4;
            ctx.strokeRect(30, 30, 320, 540);
            ctx.strokeRect(350, 100, 30, 470); // Plunger lane

            // Bumpers
            bumpers.forEach((b) => {
                ctx.fillStyle = b.color;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#fff';
                ctx.stroke();
            });

            // Left Flipper
            ctx.strokeStyle = '#ff0055';
            ctx.lineWidth = 8;
            ctx.beginPath();
            ctx.moveTo(leftFlipper.x, leftFlipper.y);
            ctx.lineTo(
                leftFlipper.x + Math.cos(leftFlipper.angle) * leftFlipper.length,
                leftFlipper.y + Math.sin(leftFlipper.angle) * leftFlipper.length
            );
            ctx.stroke();

            // Right Flipper
            ctx.strokeStyle = '#ff0055';
            ctx.beginPath();
            ctx.moveTo(rightFlipper.x, rightFlipper.y);
            ctx.lineTo(
                rightFlipper.x + Math.cos(rightFlipper.angle) * rightFlipper.length,
                rightFlipper.y + Math.sin(rightFlipper.angle) * rightFlipper.length
            );
            ctx.stroke();

            // Ball
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fill();
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
            {/* NES Cabinet Wrapper */}
            <div style={styles.cabinet}>
                <div style={styles.marquee}>NES PINBALL</div>

                <div style={styles.screenWrapper}>
                    <div style={styles.scoreBoard}>
                        <span>SCORE: {score.toString().padStart(6, '0')}</span>
                        {gameOver && <span style={{ color: '#ff0055' }}> GAME OVER</span>}
                    </div>
                    <canvas ref={canvasRef} width={400} height={580} style={styles.canvas} />
                </div>

                {/* NES Cabinet Controls Diagram / Decorative Graphics */}
                <div style={styles.controlsLegend}>
                    <div style={styles.btnLegend}>
                        <span style={styles.keyBadge}>CTRL L</span> Left Paddle
                    </div>
                    <div style={styles.btnLegend}>
                        <span style={styles.keyBadge}>SPACE</span> Launch Ball
                    </div>
                    <div style={styles.btnLegend}>
                        <span style={styles.keyBadge}>CTRL R</span> Right Paddle
                    </div>
                </div>
            </div>
        </div>
    );
}

// NES Arcade Machine CSS Styles
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#0a0a0c',
        fontFamily: '"Courier New", Courier, monospace',
    },
    cabinet: {
        backgroundColor: '#383838',
        border: '12px solid #222222',
        borderRadius: '20px 20px 10px 10px',
        padding: '20px',
        boxShadow: '0 0 40px rgba(0, 0, 0, 0.9), inset 0 0 10px rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    marquee: {
        backgroundColor: '#d82800',
        color: '#f8f8f8',
        fontSize: '24px',
        fontWeight: 'bold',
        padding: '8px 40px',
        borderRadius: '4px',
        marginBottom: '15px',
        border: '4px solid #f8f8f8',
        boxShadow: '0 0 10px #d82800',
        textShadow: '2px 2px #000',
    },
    screenWrapper: {
        backgroundColor: '#000',
        border: '6px solid #888888',
        borderRadius: '10px',
        padding: '10px',
    },
    scoreBoard: {
        color: '#00ff00',
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '8px',
        display: 'flex',
        justifyContent: 'space-between',
    },
    canvas: {
        border: '2px solid #333',
        backgroundColor: '#111122',
        display: 'block',
    },
    controlsLegend: {
        marginTop: '15px',
        display: 'flex',
        gap: '15px',
    },
    btnLegend: {
        color: '#aaa',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
    },
    keyBadge: {
        backgroundColor: '#d82800',
        color: '#fff',
        padding: '2px 6px',
        borderRadius: '3px',
        fontWeight: 'bold',
    },
};