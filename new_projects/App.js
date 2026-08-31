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

        // Ball: Radius reduced to 9 for a tighter feel
        const ball = { x: 365, y: 520, vx: 0, vy: 0, radius: 9, inPlunger: true };

        // Flippers: Enlarged (length 110) to easily cover the drain gap
        const leftFlipper = {
            x: 30,
            y: 520,
            length: 110,
            angle: 0.35,
            restAngle: 0.35,
            activeAngle: -0.35,
            speed: 0.1
        };

        const rightFlipper = {
            x: 350,
            y: 520,
            length: 110,
            angle: Math.PI - 0.35,
            restAngle: Math.PI - 0.35,
            activeAngle: Math.PI + 0.35,
            speed: 0.1
        };

        // Bumpers: Reduced radius to 18 and placed in a high arc configuration
        const bumpers = [
            { x: 100, y: 160, r: 18, score: 100, color: '#f00', glow: '#ff0055' },
            { x: 280, y: 160, r: 18, score: 100, color: '#0f0', glow: '#00ff66' },
            { x: 190, y: 220, r: 18, score: 200, color: '#ff0', glow: '#ffff00' },
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
                    // Controlled initial launch velocity upwards
                    ball.vy = -7.5;
                    ball.vx = 0;
                    ball.inPlunger = false;
                }
            } else {
                // High-curving trajectory: smooth arch toward top left over the bumpers
                if (ball.x > 340 && ball.y < 80) {
                    ball.vx = -1.8;
                    ball.vy *= 0.85; // Decelerate upward push so it floats over top bumpers
                }

                // Very floaty, slow gravity for floaty physics
                ball.vy += 0.08;
                ball.x += ball.vx;
                ball.y += ball.vy;
            }

            if (keys.controlLeft) leftFlipper.angle = Math.max(leftFlipper.activeAngle, leftFlipper.angle - leftFlipper.speed);
            else leftFlipper.angle = Math.min(leftFlipper.restAngle, leftFlipper.angle + leftFlipper.speed);

            if (keys.controlRight) rightFlipper.angle = Math.min(rightFlipper.activeAngle, rightFlipper.angle - rightFlipper.speed);
            else rightFlipper.angle = Math.max(rightFlipper.restAngle, rightFlipper.angle + rightFlipper.speed);

            // Outer Walls Collision
            if (ball.x - ball.radius < 30) { ball.x = 30 + ball.radius; ball.vx *= -0.55; }
            if (ball.x + ball.radius > 350 && ball.y > 100 && !ball.inPlunger) { ball.x = 350 - ball.radius; ball.vx *= -0.55; }
            if (ball.x + ball.radius > 380) { ball.x = 380 - ball.radius; ball.vx *= -0.55; }
            if (ball.y - ball.radius < 30) { ball.y = 30 + ball.radius; ball.vy *= -0.55; }

            // Bumper Collisions
            bumpers.forEach((b) => {
                const dx = ball.x - b.x;
                const dy = ball.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < ball.radius + b.r) {
                    const angle = Math.atan2(dy, dx);
                    ball.vx = Math.cos(angle) * 4.5;
                    ball.vy = Math.sin(angle) * 4.5;
                    currentScore += b.score;
                    setScore(currentScore);
                }
            });

            // Flipper Collisions
            const checkFlipper = (f, isLeft) => {
                const tipX = f.x + Math.cos(f.angle) * f.length;
                const tipY = f.y + Math.sin(f.angle) * f.length;
                const fx = tipX - f.x, fy = tipY - f.y;
                const fLenSq = fx * fx + fy * fy;
                let t = Math.max(0, Math.min(1, ((ball.x - f.x) * fx + (ball.y - f.y) * fy) / fLenSq));
                const dist = Math.sqrt((ball.x - (f.x + t * fx)) ** 2 + (ball.y - (f.y + t * fy)) ** 2);

                if (dist < ball.radius + 8) {
                    ball.vy = (isLeft && keys.controlLeft) || (!isLeft && keys.controlRight) ? -6 : -2.5;
                    ball.vx += isLeft ? 1 : -1;
                }
            };

            checkFlipper(leftFlipper, true);
            checkFlipper(rightFlipper, false);

            if (ball.y > 600) {
                setGameOver(true);
                ball.inPlunger = true;
                ball.vx = 0;
                ball.vy = 0;
            }
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#080810';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // --- LIGHTING FX (Glow Effects) ---

            // Neon Outer Walls
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#00ffff';
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 4;
            ctx.strokeRect(30, 30, 320, 540);
            ctx.strokeRect(350, 70, 30, 500);

            // Glowing Bumpers
            bumpers.forEach((b) => {
                ctx.shadowBlur = 20;
                ctx.shadowColor = b.glow;
                ctx.fillStyle = b.color;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fill();
            });

            // Glowing Flippers
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#ff0055';
            ctx.strokeStyle = '#ff0055';
            ctx.lineWidth = 12;

            // Left Flipper
            ctx.beginPath();
            ctx.moveTo(leftFlipper.x, leftFlipper.y);
            ctx.lineTo(leftFlipper.x + Math.cos(leftFlipper.angle) * leftFlipper.length, leftFlipper.y + Math.sin(leftFlipper.angle) * leftFlipper.length);
            ctx.stroke();

            // Right Flipper
            ctx.beginPath();
            ctx.moveTo(rightFlipper.x, rightFlipper.y);
            ctx.lineTo(rightFlipper.x + Math.cos(rightFlipper.angle) * rightFlipper.length, rightFlipper.y + Math.sin(rightFlipper.angle) * rightFlipper.length);
            ctx.stroke();

            // Glowing White Ball
            ctx.shadowBlur = 18;
            ctx.shadowColor = '#ffffff';
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
            ctx.fill();

            // Reset shadow blur so text stays sharp
            ctx.shadowBlur = 0;
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0a0a0c', fontFamily: 'monospace' }}>
            <div style={{ backgroundColor: '#282828', border: '12px solid #1a1a1a', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 0 30px #000' }}>
                <div style={{ backgroundColor: '#d82800', color: '#fff', fontSize: '24px', fontWeight: 'bold', padding: '8px 40px', borderRadius: '4px', marginBottom: '15px', border: '4px solid #fff', boxShadow: '0 0 10px #d82800' }}>
                    REACT PINBALL
                </div>
                <div style={{ backgroundColor: '#000', border: '6px solid #666', borderRadius: '10px', padding: '10px' }}>
                    <div style={{ color: '#00ff00', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>SCORE: {score.toString().padStart(6, '0')}</span>
                        {gameOver && <span style={{ color: '#ff0055' }}> GAME OVER</span>}
                    </div>
                    <canvas ref={canvasRef} width={400} height={580} style={{ border: '2px solid #222', backgroundColor: '#080810', display: 'block' }} />
                </div>
                <div style={{ marginTop: '15px', display: 'flex', gap: '15px', color: '#aaa', fontSize: '12px' }}>
                    <div><span style={{ backgroundColor: '#d82800', color: '#fff', padding: '2px 6px', borderRadius: '3px', fontWeight: 'bold' }}>CTRL L</span> Left Paddle</div>
                    <div><span style={{ backgroundColor: '#d82800', color: '#fff', padding: '2px 6px', borderRadius: '3px', fontWeight: 'bold' }}>SPACE</span> Launch Ball</div>
                    <div><span style={{ backgroundColor: '#d82800', color: '#fff', padding: '2px 6px', borderRadius: '3px', fontWeight: 'bold' }}>CTRL R</span> Right Paddle</div>
                </div>
            </div>
        </div>
    );
}