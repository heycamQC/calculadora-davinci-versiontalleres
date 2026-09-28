import { useState, useEffect } from 'react';

const getTimeLeft = (targetDate) => {
  const difference = +new Date(targetDate) - +new Date();

  if (difference <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
  }

  return {
    dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
    horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((difference / 1000 / 60) % 60),
    segundos: Math.floor((difference / 1000) % 60),
  };
};

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const format = (value) => String(value || 0).padStart(2, '0');

  return (
    <div className="flex gap-2 sm:gap-3 justify-center mt-3 font-poppins">
      {[
        { label: 'Días', value: timeLeft.dias },
        { label: 'Horas', value: timeLeft.horas },
        { label: 'Min', value: timeLeft.minutos },
        { label: 'Seg', value: timeLeft.segundos }
      ].map((item, index) => (
        <div key={item.label} className="flex items-center">
          <div className="flex flex-col items-center">
            <div className="caja-contador text-2xl sm:text-3xl">
              {format(item.value)}
            </div>
            <span className="text-[10px] sm:text-xs uppercase font-bold mt-1.5 text-white tracking-widest">
              {item.label}
            </span>
          </div>
          {index < 3 && <span className="text-white/70 text-2xl sm:text-3xl font-black mx-1 sm:mx-2 -mt-4">:</span>}
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;