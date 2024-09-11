import NetworkGraph from "./components/NetworkGraph";
import { data } from "./data";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-green-600">
      <NetworkGraph data={data} />
    </div>
  );
}
