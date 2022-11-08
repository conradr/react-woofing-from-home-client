import React from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

function Faq() {

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

      const faqs = [
        {question : "I don't have a dog, can I still sign up?", answer : "Woofing From Home aims to put dog owners, fellow dog owners and non dog owners in touch who can help look after each others dogs. Not having a dog will make you very popular with dog owners." },
        {question : "How much does signing up cost?", answer : "There is no cost for signing up to Woofing From Home" },
        {question : "Is there a limit to how many people I can connect with?", answer : "Woofing From Home will aim to match you with as many different users as possible. There is no limit on the number of matches you can match and connect with." },
        {question : "Will I be matched with other dog owners who I can help?", answer : "If you are a dog owner who is Woofing From Home, then we will also match you with other dog owners who you may be able to help." },
        {question : "Can I sign up if I have multiple dogs?", answer : "You can have 101 Dalmations and still sign up to Woofing From Home. Just make sure you add all of your dogs onto your profile." },
        {question : "What are the different sizes of dogs?", answer : "Dogs weighing 10 kg or less are generally considered small dogs. Any breed between 10kg and 25kg's are usually considered a medium size dog. Any dog over 25kg is considered a large dog." },
        {question : "What are the different levels of exercise?", answer : "High - one or more walks over an hour a day. Medium - one or two walks over 30 minutes a day. Low - one or more walks over 15 minutes a day" },
        {question : "Do I need insurance to look after another persons dog?", answer : "Because Woofing From Home is an agreement between two parties to help other to look after their dog, you don't need insurance. Always check that the dog you are looking after is insured before you sit it. THIS IS NOT LEGAL ADVICE!" },
        {question : "Do I need to pay the person looking after my dog?", answer : "No. Woofing From Home is not a service for the payment of looking after or walking your, or another persons dog. If anyone breaks these guidelines then please report it to the Woofing From Home admin team." },

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