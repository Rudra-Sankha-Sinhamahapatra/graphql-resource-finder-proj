import { BookmarkIcon, ShareIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Share Knowledge',
    description: 'Share valuable learning resources with the community.',
    icon: ShareIcon,
  },
  {
    name: 'Save for Later',
    description: 'Bookmark resources to access them when you need them.',
    icon: BookmarkIcon,
  },
  {
    name: 'Community Driven',
    description: 'Discover resources shared by other developers.',
    icon: UserGroupIcon,
  },
];

export default function FeatureSection() {
  return (
    <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-16 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-base font-semibold leading-7 text-indigo-600">Everything you need</h2>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          All-in-one platform
        </p>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          DevLink provides everything you need to share and discover learning resources.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                  <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                {feature.name}
              </dt>
              <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">{feature.description}</p>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
} 