'use client';
import { Button } from "@/app/components/Button";
import { Navbar } from "@/app/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <h1>Current component list - </h1>
        <div className="flex flex-col mt-2">
          <p>Button 1:</p>
          <code className="px-4 py-2 bg-slate-800 rounded-md mb-4">
            {` <Button 
            text='Get Started' 
            variant="primary" 
            size="sm" 
            animated={false} 
            glow={false}
            />`}
          </code>
          <p>Example:</p>
          <Button text='Get Started' variant="primary" size="sm" animated={false} glow={false}/>
        </div>
        <div className="flex flex-col mt-2">
          <p>Button 2:</p>
          <code className="px-4 py-2 bg-slate-800 rounded-md mb-4">
            {` <Button 
            text='Get Started' 
            variant="secondary" 
            size="sm" 
            animated={true} 
            glow={true}
            />`}
          </code>
          <p>Example:</p>
          <Button text='Get Started' variant="secondary" size="sm" animated={true} glow={true} onClick={() => console.log(process.env.AUTH_GOOGLE_ID)}/>
        </div>
      </div>
    </>
  );
}
