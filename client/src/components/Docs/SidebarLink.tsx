'use client'

const SidebarLink = () => {
  return (
    <>
      <li className="block">
        <a
          href={`/docs`}
          className={`flex w-full rounded-sm bg-stroke px-3 py-2 text-base text-black dark:bg-blackho dark:text-white`}
        >
          Introduction
        </a>
        <a
          href={`/docs`}
          className={`flex w-full rounded-sm px-3 py-2 text-base text-black dark:text-white `}
        >
          Bootstrap Template Guide
        </a>
        <a
          href={`/docs`}
          className={`flex w-full rounded-sm px-3 py-2 text-base text-black dark:text-white `}
        >
          Style Guide
        </a>
        <a
          href={`/docs`}
          className={`flex w-full rounded-sm px-3 py-2 text-base text-black dark:text-white `}
        >
          Using Tailwind Components
        </a>
      </li>
    </>
  )
}

export default SidebarLink
