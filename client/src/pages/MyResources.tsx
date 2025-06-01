import { useQuery } from '@apollo/client';
import { PencilIcon, TrashIcon, LinkIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { GET_USER_RESOURCES } from '../graphql/mutations/resource';
import { toast } from 'react-hot-toast';
import type { Resource } from '../graphql/types/resources';

export default function MyResources() {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_USER_RESOURCES, {
    onError: (error) => {
      if (error.graphQLErrors[0]?.extensions?.code === 'UNAUTHENTICATED') {
        toast.error('Please login to view your resources');
        navigate('/login');
      } else {
        toast.error('Error loading resources');
      }
    },
  });

  if (loading) {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-gray-600">Loading resources...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && error.graphQLErrors[0]?.extensions?.code !== 'UNAUTHENTICATED') {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg text-red-600">Error loading resources. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  const resources = data?.findAllResourcesByUserId || [];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">My Resources</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Manage your shared resources.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0">
            <Link
              to="/create-resource"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Resource
            </Link>
          </div>
        </div>

        {resources.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="text-lg text-gray-600">You haven't added any resources yet.</p>
            <Link
              to="/create-resource"
              className="mt-4 inline-block text-indigo-600 hover:text-indigo-500"
            >
              Create your first resource
            </Link>
          </div>
        ) : (
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Name
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Description
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Created
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {resources.map((resource: Resource) => (
                      <tr key={resource.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {resource.name}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">{resource.description}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {new Date(resource.createdAt).toLocaleDateString()}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <div className="flex justify-end gap-x-4">
                            <a
                              href={resource.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <LinkIcon className="h-5 w-5" />
                              <span className="sr-only">Visit</span>
                            </a>
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-900"
                              onClick={() => {
                                // TODO: Handle edit - we'll implement this next
                              }}
                            >
                              <PencilIcon className="h-5 w-5" />
                              <span className="sr-only">Edit</span>
                            </button>
                            <button
                              type="button"
                              className="text-red-400 hover:text-red-900"
                              onClick={() => {
                                // TODO: Handle delete - we'll implement this next
                              }}
                            >
                              <TrashIcon className="h-5 w-5" />
                              <span className="sr-only">Delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 