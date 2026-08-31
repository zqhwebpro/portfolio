import React, { useState, useRef, useEffect } from 'react';

export default function App() {
    const canvasRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

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

        const keys = { space: false, controlLeft: false, controlRight: false };
        let animationFrameId;

        const ball = { x: 365, y: 520, vx: 0, vy: 0, radius: 6, inPlunger: true };

        const leftFlipper = {
            x: 32,
            y: 510,
            length: 100,
            angle: 0.35,
            restAngle: 0.35,
            activeAngle: -0.35,
            speed: 0.15,
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
            speed: 0.15,
            baseRadius: 9,
            tipRadius: 4
        };

        // Bumpers positioned closer together near the middle center of the board
        const bumpers = [
            { x: 160, y: 160, r: 12, score: 100, color: '#ffd700' },
            { x: 240, y: 160, r: 12, score: 100, color: '#ffd700' },
            { x: 200, y: 220, r: 12, score: 200, color: '#ffae00' },
        ];

        const handleKeyDown = (e) => {
            if (['Space', 'ControlLeft', 'ControlRight', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
                e.preventDefault();
            }

            if (e.code === 'Space') keys.space = true;
            if (e.code === 'ControlLeft') keys.controlLeft = true;
            if (e.code === 'ControlRight') keys.controlRight = true;

            setGameOver(false);
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
                    // Launch lob power (-19.0 vy)
                    ball.vy = -19.0;
                    ball.vx = -1.5;
                    ball.inPlunger = false;
                }
            } else {
                if (ball.x > 340 && ball.y < 150) {
                    ball.vx -= 0.12;
                }

                ball.vy += 0.05;
                ball.x += ball.vx * 0.7;
                ball.y += ball.vy * 0.7;
            }

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

            // Boundary collision handling
            if (ball.x - ball.radius < 30) { ball.x = 30 + ball.radius; ball.vx *= -0.6; }
            if (ball.x + ball.radius > 350 && ball.y > 70 && !ball.inPlunger) {
                ball.x = 350 - ball.radius;
                ball.vx *= -0.6;
            }
            if (ball.x + ball.radius > 380) { ball.x = 380 - ball.radius; ball.vx *= -0.6; }
            if (ball.y - ball.radius < 30) { ball.y = 30 + ball.radius; ball.vy *= -0.6; }

            bumpers.forEach((b) => {
                const dx = ball.x - b.x;
                const dy = ball.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < ball.radius + b.r) {
                    const angle = Math.atan2(dy, dx);
                    // Reduced bounce power from 3.5 down to 1.8 so it doesn't shoot up as high
                    ball.vx = Math.cos(angle) * 1.8;
                    ball.vy = Math.sin(angle) * 1.8;
                    setScore((prevScore) => prevScore + b.score);
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
                    const isFlipping = (isLeft && keys.controlLeft) || (!isLeft && keys.controlRight);
                    ball.vy = isFlipping ? -13.5 : -3.5;
                    ball.vx = isLeft ? 1.2 : -1.2;
                }
            };

            checkFlipper(leftFlipper, true);
            checkFlipper(rightFlipper, false);

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

            ctx.shadowBlur = 8;
            ctx.shadowColor = '#00f0ff';
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 4;
            ctx.strokeRect(30, 30, 320, 540);

            // Expanded drain hole to match the full gap between flippers (width: 120px, x: 140)
            ctx.fillStyle = '#110022';
            ctx.fillRect(140, 540, 120, 40);
            ctx.strokeStyle = '#ff0055';
            ctx.strokeRect(140, 540, 120, 40);

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

            ctx.shadowBlur = 10;
            ctx.shadowColor = '#ffffff';
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(ball.x - ball.radius, ball.y - ball.radius, ball.radius * 2, ball.radius * 2);

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