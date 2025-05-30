import { Link } from 'react-router-dom';
import GradientPattern from '../GradientPattern';

export default function CTASection() {
  return (
    <div className="relative isolate mt-16 px-6 py-24 sm:mt-24 sm:py-32 lg:px-8">
      <GradientPattern id="cta" />
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Ready to get started?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
          Join our community of developers and start sharing your knowledge today. Create an account to get started!
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/register"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline  focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get started
          </Link>
          <Link to="/resources" className="text-sm font-semibold leading-6 text-gray-900">
            Browse resources <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 