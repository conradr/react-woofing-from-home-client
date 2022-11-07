import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-800" aria-labelledby="footer-heading">
    <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
      <div className="xl:grid xl:grid-cols-3 xl:gap-8">
        <div className="grid grid-cols-2 gap-8 xl:col-span-2">
          <div className="md:grid md:grid-cols-2 md:gap-8">

            </div>
          </div>
        </div>
        <div className="mt-8 xl:mt-0">
          <h3 className="text-base font-medium text-white">Subscribe to our newsletter</h3>
          <p className="mt-4 text-base text-gray-300">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form className="mt-4 sm:flex sm:max-w-md">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="w-full min-w-0 appearance-none rounded-md border border-transparent bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 focus:border-white focus:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              placeholder="Enter your email"
            />
            <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-500 py-2 px-4 text-base font-medium text-white hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
        <div className="flex space-x-6 md:order-2">
          {/* {navigation.social.map((item) => (
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))} */}
        </div>
        <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
          &copy; 2020 Your Company, Inc. All rights reserved.
        </p>
      </div>
  </footer>
  )
}

export default Footer