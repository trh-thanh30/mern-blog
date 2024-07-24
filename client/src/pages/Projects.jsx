import CallToAction from "../components/CallToAction";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col items-center justify-center max-w-2xl min-h-screen gap-6 p-3 mx-auto">
      <h1 className="text-3xl font-semibold">Projects</h1>
      <p className="text-gray-500 text-md">
        Build fun and engaging projects while learning Next.js, React.js, and
        Node.js!
      </p>
      <CallToAction></CallToAction>
    </div>
  );
}
