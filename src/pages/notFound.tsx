import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <main className='flex min-h-empty items-center justify-center bg-surface-canvas p-4'>
      <section className='w-full max-w-lg rounded-xl border border-line bg-white p-6 text-center shadow-sm sm:p-8'>
        <p className='text-xs font-semibold uppercase tracking-eyebrow text-brand'>
          Page not found
        </p>
        <h1 className='mt-3 text-2xl font-semibold text-ink-strong'>
          This workspace page is unavailable
        </h1>
        <p className='mt-2 text-sm leading-6 text-ink-muted'>
          The link may be outdated, or the page is outside the current launch workspace.
        </p>
        <Link
          to='/van-arsdel/home'
          className='mt-5 inline-flex rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-hover'
        >
          Back to launch overview
        </Link>
      </section>
    </main>
  )
}

export default NotFoundPage
