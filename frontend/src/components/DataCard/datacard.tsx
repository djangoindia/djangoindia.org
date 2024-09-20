"use client"


// Define props type for StatCard component
interface StatCardProps {
  title: string;
  subText: string;
  startCount: number;
  count: number;
  icon: React.ReactNode;
}

export const DataCard  = () => {
  return (
    <div className="grid justify-center items-center lg:grid-cols-3 md:grid-cols-2 gap-6 w-full p-8">
      <StatCard
        title="Active Contributors"
        subText="& counting till date"
        startCount={0}
        count={20}
        icon={<FaCity className="text-[2rem]" />}
      />
      <StatCard
        title="Subscribers"
        subText="building Django India"
        startCount={10}
        count={100}
        icon={<FaUsers className="text-[3rem]" />}
      />
      <StatCard
        title="GitHub Stars"
        subText="till date"
        startCount={0}
        count={50}
        icon={<FaGithub className="text-[2rem]" />}
      />
    </div>
  );
}

// Define StatCard component with props typed
const StatCard: React.FC<StatCardProps> = ({ title, subText, count, startCount, icon }) => {
  const [number, setNumber] = useState(startCount);
  const { ref, inView } = useInView({
    threshold: 0.4,
  });
  const intervalTime = count === 31818 ? 1 : 100;

  useEffect(() => {
    let start = startCount;
    const interval = setInterval(() => {
      if (start <= count) {
        setNumber(start);
        start += 1;
      } else {
        clearInterval(interval);
      }
    }, intervalTime);
    return () => {
      clearInterval(interval);
    };
  }, [inView, startCount, count, intervalTime]);

  return (
    <div
      ref={ref}
      className="flex items-center p-4 border border-gray-400 rounded-lg"
    >
      <div className="flex flex-shrink-0 items-center justify-center bg-green-500 h-16 w-16 rounded">
        {icon}
      </div>
      <div className="flex-grow flex flex-col ml-4">
        <span className="text-4xl font-bold">
          {count === 50 ? "" : ""}
          {inView ? number : 0}+
        </span>
        <span className="text-xl font-bold">
          {title}
        </span>
        <div className="flex items-center justify-between">
          <span className="gradient font-bold">{subText}</span>
        </div>
      </div>
    </div>
  );
};

