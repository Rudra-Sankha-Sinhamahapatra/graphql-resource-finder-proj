import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Dialog, } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import type { User } from '../graphql/types/user';
import { useQuery } from '@apollo/client';
import { GET_USER_DETAILS } from '../graphql/queries/user.queries';
import { useAuthContext } from '../context/AuthContext';

const navigation = [
  { name: 'Resources', href: '/resources' },
  { name: 'My Resources', href: '/my-resources' },
  { name: 'Create Resource', href: '/create-resource' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}


export default function MainLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout, setUser } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const { loading: userLoading } = useQuery<{getUserDetails: User}>(GET_USER_DETAILS,{
    onCompleted: (data) => {
      setUser(data.getUserDetails);
    },
    onError: (error) => {
      if (error.message.includes('Unauthorized')) {
       logout();
      }
    }
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="text-2xl font-bold text-indigo-600">DevLink</span>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={classNames(
                  location.pathname === item.href
                    ? 'text-indigo-600'
                    : 'text-gray-900 hover:text-indigo-600',
                  'text-sm font-semibold leading-6'
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {userLoading ? (
              <div className="flex items-center gap-x-4">
                <div className="h-8 w-8 rounded-full bg-indigo-600 animate-pulse" />
                <div className="h-4 w-24 bg-gray-200 animate-pulse" />
              </div>
            ) : user ? (
              <div className="relative">
                <button
                  type="button"
                  className="flex items-center gap-x-4 text-sm font-semibold leading-6 text-gray-900"
                  onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                >
                  <span className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                    {user.username[0].toUpperCase()}
                  </span>
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="px-4 py-2 text-sm text-gray-700">
                      {user.username}
                    </div>
                    <Link to="/profile" 
                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setProfileMenuOpen(false)}
                    >
                    My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="text-2xl font-bold text-indigo-600">DevLink</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  {user ? (
                    <div>
                      <div className="px-4 py-2 text-base font-semibold">
                        <div className="flex items-center gap-x-4">
                          <span className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                            {user.username[0].toUpperCase()}
                          </span>
                          <span>{user.username}</span>
                        </div>
                      </div>
                      <Link to="/profile"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                      >
                        My Profile
                      </Link>
                      <button
                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                        onClick={() => {
                          handleLogout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        Log out
                      </button>
                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Log in
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2025 DevLink. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 