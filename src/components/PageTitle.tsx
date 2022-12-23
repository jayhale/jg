type PageTitleProps = {
  title: string
  subtitle?: string
  tracker?: string
}

const PageTitle = ({ title, subtitle, tracker }: PageTitleProps) => (
  <div className="bg-white">
    <div className="max-w-7xl mx-auto py-12 px-4 sm:py-18 sm:px-6 lg:px-8">
      <div className="text-center">
        {tracker && (
          <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">
            {tracker}
          </h2>
        )}
        <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
          {title}
        </p>
        {subtitle && (
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  </div>
)

export { PageTitle }
