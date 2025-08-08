import { useEffect, useRef, useState } from "react";

export const SnakeGame = () => {
  const canvasRef = useRef(null);
  const gridSize = 20;
  const tileCount = 30;
  const snake = useRef([{ x: 10, y: 10 }]);
  const velocity = useRef({ x: 1, y: 0 });
  const food = useRef({ x: 15, y: 15 });
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = gridSize * tileCount;
    canvas.height = gridSize * tileCount;

    const updateTheme = () => {
      const dark = document.documentElement.classList.contains("dark");
      setIsDark(dark);
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowUp":
          if (velocity.current.y === 0) velocity.current = { x: 0, y: -1 };
          break;
        case "ArrowDown":
          if (velocity.current.y === 0) velocity.current = { x: 0, y: 1 };
          break;
        case "ArrowLeft":
          if (velocity.current.x === 0) velocity.current = { x: -1, y: 0 };
          break;
        case "ArrowRight":
          if (velocity.current.x === 0) velocity.current = { x: 1, y: 0 };
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const gameLoop = setInterval(() => {
      const newHead = {
        x: snake.current[0].x + velocity.current.x,
        y: snake.current[0].y + velocity.current.y,
      };

      if (
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= tileCount ||
        newHead.y >= tileCount ||
        snake.current.some((seg) => seg.x === newHead.x && seg.y === newHead.y)
      ) {
        snake.current = [{ x: 10, y: 10 }];
        velocity.current = { x: 1, y: 0 };
        food.current = { x: 15, y: 15 };
        return;
      }

      snake.current.unshift(newHead);

      if (newHead.x === food.current.x && newHead.y === food.current.y) {
        food.current = {
          x: Math.floor(Math.random() * tileCount),
          y: Math.floor(Math.random() * tileCount),
        };
      } else {
        snake.current.pop();
      }

      ctx.fillStyle = isDark ? "#000" : "#f9f9f9";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = isDark ? "#0f0" : "#007000";
      snake.current.forEach((seg) => {
        ctx.fillRect(seg.x * gridSize, seg.y * gridSize, gridSize - 2, gridSize - 2);
      });

      ctx.fillStyle = isDark ? "#f00" : "#900";
      ctx.fillRect(food.current.x * gridSize, food.current.y * gridSize, gridSize - 2, gridSize - 2);
    }, 100);

    return () => {
      clearInterval(gameLoop);
      document.removeEventListener("keydown", handleKeyDown);
      observer.disconnect();
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full opacity-25 z-0 pointer-events-none transition-all duration-700"
    />
  );
};