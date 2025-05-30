import { useState } from 'react';
import { mockResources } from '../utils/mockData';
import type { Resource } from '../utils/mockData';
import { LinkIcon, BookmarkIcon } from '@heroicons/react/24/outline';

export default function Resources() {
  const [resources] = useState<Resource[]>(mockResources);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Learning Resources</h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Discover valuable resources shared by the community.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {resources.map((resource) => (
            <article key={resource.id} className="flex flex-col items-start">
              <div className="relative w-full">
                <img
                  src={resource.imageUrl}
                  alt={resource.name}
                  className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={resource.createdAt} className="text-gray-500">
                    {new Date(resource.createdAt).toLocaleDateString()}
                  </time>
                  <span className="text-gray-500">By {resource.user?.username}</span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      <span className="absolute inset-0" />
                      {resource.name}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{resource.description}</p>
                </div>
                <div className="mt-8 flex items-center gap-x-4">
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-x-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    <LinkIcon className="h-4 w-4" />
                    Visit Resource
                  </a>
                  <button
                    type="button"
                    className="flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800"
                  >
                    <BookmarkIcon className="h-4 w-4" />
                    Save
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
} 