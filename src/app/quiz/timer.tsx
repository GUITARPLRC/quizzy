import { useEffect, useState } from "react";

interface Props {
  timeInSeconds: number;
  onTimeExpired: () => void;
  index: number
}

const Timer = ({ timeInSeconds, onTimeExpired, index }: Props) => {
  const [timeLeft, setTimeLeft] = useState(timeInSeconds);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        onTimeExpired();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onTimeExpired]);

  useEffect(() => {
    setTimeLeft(timeInSeconds);
  }, [index]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center justify-center" style={styles.container}>
      <div className="rounded-lg p-4">
        <div className="flex items-center justify-center mb-2"> 
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6 text-gray-800 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.78 14.55a1.176 1.176 0 11-1.662-1.664 5.125 5.125 0 00-3.614-9.796V2.176a1.176 1.176 0 112.352 0v1.914a5.125 5.125 0 003.614 9.796zm-2.822-1.78a1.176 1.176 0 110-2.352 2.773 2.773 0 01-1.96-4.735V2.176a1.176 1.176 0 112.352 0v3.908a2.773 2.773 0 01-1.392 4.446z"
              clipRule="evenodd"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-800">{`Time Remaining:`}</h3>
        </div>
        <h2 className="text-3xl font-bold text-gray-800">
          {`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
        </h2>
      </div>
    </div>
  );
};

const styles = {
	container: {
		background: "linear-gradient(to right, #2196f3, #32cd32)",
	}
  }

export default Timer;
