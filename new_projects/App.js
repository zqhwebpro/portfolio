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

        const ball = { x: 365, y: 520, vx: 0, vy: 0, radius: 14, inPlunger: true };

        // Enlarged Left Flipper (length 95) positioned at outer border
        const leftFlipper = {
            x: 30,
            y: 520,
            length: 95,
            angle: 0.35,
            restAngle: 0.35,
            activeAngle: -0.35,
            speed: 0.12
        };

        // Enlarged Right Flipper (length 95) positioned at playfield divider border
        const rightFlipper = {
            x: 350,
            y: 520,
            length: 95,
            angle: Math.PI - 0.35,
            restAngle: Math.PI - 0.35,
            activeAngle: Math.PI + 0.35,
            speed: 0.12
        };

        // Bumpers: Enlarged radius to 28 and spread across top area
        const bumpers = [
            { x: 110, y: 150, r: 28, score: 100, color: '#f00' },
            { x: 270, y: 150, r: 28, score: 100, color: '#0f0' },
            { x: 190, y: 260, r: 28, score: 200, color: '#ff0' },
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
                    // Launch straight up through narrow plunger channel
                    ball.vy = -10;
                    ball.vx = 0;
                    ball.inPlunger = false;
                }
            } else {
                // Curve ball into main playfield once it reaches top of plunger channel
                if (ball.x > 350 && ball.y < 80) {
                    ball.vx = -3;
                }

                // Toned down gravity for slower ball speed
                ball.vy += 0.12;
                ball.x += ball.vx;
                ball.y += ball.vy;
            }

            if (keys.controlLeft) leftFlipper.angle = Math.max(leftFlipper.activeAngle, leftFlipper.angle - leftFlipper.speed);
            else leftFlipper.angle = Math.min(leftFlipper.restAngle, leftFlipper.angle + leftFlipper.speed);

            if (keys.controlRight) rightFlipper.angle = Math.min(rightFlipper.activeAngle, rightFlipper.angle + rightFlipper.speed);
            else rightFlipper.angle = Math.max(rightFlipper.restAngle, rightFlipper.angle - rightFlipper.speed);

            // Outer Walls Collision
            if (ball.x - ball.radius < 30) { ball.x = 30 + ball.radius; ball.vx *= -0.6; }
            if (ball.x + ball.radius > 350 && ball.y > 100 && !ball.inPlunger) { ball.x = 350 - ball.radius; ball.vx *= -0.6; }
            if (ball.x + ball.radius > 380) { ball.x = 380 - ball.radius; ball.vx *= -0.6; }
            if (ball.y - ball.radius < 30) { ball.y = 30 + ball.radius; ball.vy *= -0.6; }

            // Bumper Collisions
            bumpers.forEach((b) => {
                const dx = ball.x - b.x;
                const dy = ball.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < ball.radius + b.r) {
                    const angle = Math.atan2(dy, dx);
                    ball.vx = Math.cos(angle) * 6;
                    ball.vy = Math.sin(angle) * 6;
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
                    ball.vy = (isLeft && keys.controlLeft) || (!isLeft && keys.controlRight) ? -7.5 : -3.5;
                    ball.vx += isLeft ? 1.2 : -1.2;
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
            ctx.fillStyle = '#111122';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Playfield outer boundaries & plunger channel
            ctx.strokeStyle = '#00ffff';
            ctx.lineWidth = 4;
            ctx.strokeRect(30, 30, 320, 540);
            ctx.strokeRect(350, 70, 30, 500);

            // Larger Bumpers (No stroke)
            bumpers.forEach((b) => {
                ctx.fillStyle = b.color;
                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fill();
            });

            // Left Flipper
            ctx.strokeStyle = '#ff0055';
            ctx.lineWidth = 12;
            ctx.beginPath();
            ctx.moveTo(leftFlipper.x, leftFlipper.y);
            ctx.lineTo(leftFlipper.x + Math.cos(leftFlipper.angle) * leftFlipper.length, leftFlipper.y + Math.sin(leftFlipper.angle) * leftFlipper.length);
            ctx.stroke();

            // Right Flipper
            ctx.beginPath();
            ctx.moveTo(rightFlipper.x, rightFlipper.y);
            ctx.lineTo(rightFlipper.x + Math.cos(rightFlipper.angle) * rightFlipper.length, rightFlipper.y + Math.sin(rightFlipper.angle) * rightFlipper.length);
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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#0a0a0c', fontFamily: 'monospace' }}>
            <div style={{ backgroundColor: '#383838', border: '12px solid #222', borderRadius: '20px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ backgroundColor: '#d82800', color: '#fff', fontSize: '24px', fontWeight: 'bold', padding: '8px 40px', borderRadius: '4px', marginBottom: '15px', border: '4px solid #fff' }}>
                    REACT PINBALL
                </div>
                <div style={{ backgroundColor: '#000', border: '6px solid #888', borderRadius: '10px', padding: '10px' }}>
                    <div style={{ color: '#00ff00', fontSize: '18px', fontWeight: 'bold', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>SCORE: {score.toString().padStart(6, '0')}</span>
                        {gameOver && <span style={{ color: '#ff0055' }}> GAME OVER</span>}
                    </div>
                    <canvas ref={canvasRef} width={400} height={580} style={{ border: '2px solid #333', backgroundColor: '#111122', display: 'block' }} />
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