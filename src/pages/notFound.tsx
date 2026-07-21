import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <main className='flex min-h-[60vh] items-center justify-center bg-[#F6F6F9] p-4'>
      <section className='w-full max-w-lg rounded-xl border border-[#E1E1E8] bg-white p-6 text-center shadow-sm sm:p-8'>
        <p className='text-xs font-semibold uppercase tracking-[0.16em] text-[#5B5FC7]'>
          Page not found
        </p>
        <h1 className='mt-3 text-2xl font-semibold text-[#242424]'>
          This workspace page is unavailable
        </h1>
        <p className='mt-2 text-sm leading-6 text-[#616161]'>
          The link may be outdated, or the page is outside the current launch workspace.
        </p>
        <Link
          to='/van-arsdel/home'
          className='mt-5 inline-flex rounded-lg bg-[#5B5FC7] px-4 py-2 text-sm font-medium text-white hover:bg-[#4F52B2]'
        >
          Back to launch overview
        </Link>
      </section>
    </main>
  )
}

export default NotFoundPage
