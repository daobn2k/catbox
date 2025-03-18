import { useEffect, useState } from "react";

function CountdownTimer({ seconds, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      onTimeUp();
    }

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const secondsLeft = timeLeft % 60;

  const formatTime = (time) => time.toString().padStart(2, "0");

  return (
    <p className="font-montserrat text-[14px] font-semibold leading-[20px] text-center decoration-none min-w-[60px]">
      {hours > 0 ? `${formatTime(hours)}:` : "00:"}
      {formatTime(minutes)}:{formatTime(secondsLeft)}
    </p>
  );
}

export default CountdownTimer;
