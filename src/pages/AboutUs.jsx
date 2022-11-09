import React from "react";

function AboutUs() {
  const people = [

    {
      name: "Katie Booth",
      role: "Front and Back End Development",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/woofing-from-home.appspot.com/o/images%2Fkatie-web.jpeg?alt=media&token=e72c4ba0-06bf-47e8-8ab6-0ac219dee9a2",

      bio: "Katie is a junior software developer and avid dog lover. Her background is in insurance and finance and she has recently returned from three years in Hong Kong.",

      twitterUrl: "#",
      linkedinUrl: "https://www.linkedin.com/in/katie-booth-598995159/",
    },
    {
      name: "Ben Cutler-Ames",
      role: "Front and Back End Development",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/woofing-from-home.appspot.com/o/BCAHeadshot.jpg?alt=media&token=27ecb47e-7070-4398-9158-5e177add92ee",
      bio: "After a decade in Education, Ben decided to retrain as a Software Developer. Disappointed that he couldn't find a bootcamp that appealed to him as much as CodeClan he did what any reasonable person would do ... moved 400 miles to Edinburgh.",
      twitterUrl: "#",
      linkedinUrl: "https://www.linkedin.com/in/bencutlerames/",
    },
    {
      name: "Callum Donaldson",
      role: "Front and Back End Development",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/woofing-from-home.appspot.com/o/images%2Fcallum-web.jpeg?alt=media&token=995c440d-afdf-47ce-9879-48fb2a6e684c",
      bio: "A former Police Officer with over six years experience in front line and detective roles. Callum likes to combine the investigatory skill set he developed as a detective with his passion for software development.",
      twitterUrl: "#",
      linkedinUrl: "https://www.linkedin.com/in/calgdon",
    },
    {
      name: "Conrad Roussouw",
      role: "Front and Back End Development",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/woofing-from-home.appspot.com/o/images%2FeV53u9iw6bVABwdURK26Wi09i5r2-conrad-flo.jpeg-037b9927-c4c5-4469-b26d-0e0451f654a2?alt=media&token=481c7b5e-3045-4bfd-9a1f-ef6797dab29e",
      bio: "A junior software developer with over 10 years experience in digital product management, both as a product owner and agile coach. Prior to that, Conrad spent 5 years as a web developer. He changed careers, because the more he worked with developers the more he wanted to be involved in building software.",
      twitterUrl: "#",
      linkedinUrl: "https://www.linkedin.com/in/conradr/",
    },
  ];

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
          <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
            <div className="space-y-5 sm:space-y-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Our Team
              </h2>
              <p className="text-xl text-gray-500">
                Built by 4 budding software engineers as their capstone project
                during a 16 week software development course with CodeClan. All
                of the data contained on this application is ficticious and in
                no way represents real life persons or animals. The application
                was built with HTML, React, JavaScript, Tailwind, Spring and
                Java. Feel free to reach out to us on LinkedIn.
              </p>
            </div>
            <div className="lg:col-span-2">
              <ul
                className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8"
              >
                {people.map((person) => (
                  <li key={person.name}>
                    <div className="space-y-4">
                      <div className="aspect-w-3 aspect-h-2">
                        <img
                          className="rounded-lg object-cover shadow-lg"
                          src={person.imageUrl}
                          alt=""
                        />
                      </div>
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3>{person.name}</h3>
                        <p className="text-indigo-600">{person.role}</p>
                      </div>
                      <div className="text-lg">
                        <p className="text-gray-500">{person.bio}</p>
                      </div>

                      <ul className="flex space-x-5">
                        <li>
                          <a
                            href={person.linkedinUrl} target="_blank" rel="noreferrer"
                            className="text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">LinkedIn</span>
                            <svg
                              className="h-5 w-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutUs;
