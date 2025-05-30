import { Link } from 'react-router-dom';
import GradientPattern from '../GradientPattern';

export default function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden">
      <GradientPattern id="hero" />
      <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-20">
        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="mx-auto max-w-2xl">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Share and discover learning resources
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                DevLink is a platform where developers can share and discover valuable learning resources.
                Join our community to contribute and grow together.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Link
                  to="/resources"
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Browse Resources
                </Link>
                <Link to="/register" className="text-sm font-semibold leading-6 text-gray-900">
                  Create account <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 sm:mt-16 lg:mt-0">
          <div className="relative">
            <div className="w-full overflow-hidden rounded-xl bg-indigo-600 lg:h-[540px]">
              <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                  <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 px-4 py-2 text-white">
                    DevLink
                  </div>
                </div>
              </div>
              <div className="px-6 pb-14 pt-6">
                <img
                  className="w-full h-[450px] rounded-md object-cover object-center"
                  src="https://ideogram.ai/assets/image/lossless/response/y15oUuAxQ0GgHlhLvPb4jQ"
                  alt="App screenshot"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 