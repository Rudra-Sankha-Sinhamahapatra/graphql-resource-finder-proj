import { useQuery } from "@apollo/client";
import { GET_USER_DETAILS } from "../graphql/queries/user.queries";
import type { User } from "../graphql/types/user";


export default function Profile() {
    const { data,loading } = useQuery<{getUserDetails: User}>(GET_USER_DETAILS);
    const user = data?.getUserDetails;

    if(loading) {
      return (
        <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"/>
        </div>
      )
    }

    if(!user) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 my-20">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">My Profile</h1>
      <div className="bg-white shadow rounded-lg p-6 space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl">
            {user.username[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{user.username}</h2>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <dl className="space-y-4">
            <div>
              <dt className="text-sm font-medium text-gray-500">Member since</dt>
              <dd className="text-sm text-gray-900">
                {new Date(user.createdAt).toLocaleDateString()}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Last updated</dt>
              <dd className="text-sm text-gray-900">
                {new Date(user.updatedAt).toLocaleDateString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}