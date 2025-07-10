import { Button } from "@/components/Button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <h1>Current component list - </h1>
        <div className="flex flex-col">
          <p>Button:</p>
          <code className="px-4 py-2 bg-slate-800 rounded-md mb-4">
            {` <Button 
            text='Get Started' 
            variant="primary" 
            size="sm" 
            animated={true} 
            glow={true}
            />`}
          </code>
          <p>Example:</p>
          <Button text='Get Started' variant="primary" size="sm" animated={true} glow={true}/>
        </div>
      </div>
    </>
  );
}
