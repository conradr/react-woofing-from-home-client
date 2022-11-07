import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

function Faq() {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

      const faqs = [
        {question : "I don't have a dog, can I still sign up?", answer : "This is the answer" },
        {question : "How much does signing up cost?", answer : "This is the answer" },
        {question : "Is there a limit to how many people I can connect with?", answer : "This is the answer" },
        {question : "Will I be matched with other dog owners who I can help?", answer : "This is the answer" },
        {question : "Can I sign up if I have multiple dogs?", answer : "This is the answer" },
        {question : "What are the different sizes of dogs?", answer : "This is the answer" },
        {question : "What are the different levels of exercise?", answer : "This is the answer" },
        {question : "Do I need insurance to look after another persons dog?", answer : "This is the answer" },
        {question : "Do I need to pay the person looking after my dog?", answer : "This is the answer" },

    ]

  return (
    
    <div className="bg-gray-50">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently asked questions
          </h2>


          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt className="text-lg">
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-400">
                        <span className="font-medium text-gray-900">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-6 w-6 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base text-gray-500">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
    



  )
}

export default Faq