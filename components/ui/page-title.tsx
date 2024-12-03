interface PageTitleProps {
  title: string
}

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
    </div>
  )
}

export default PageTitle
