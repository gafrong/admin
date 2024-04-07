export const PageTitle = ({ children }) => (
  <h1 className="scroll-m-20 pb-8 text-2xl font-extrabold tracking-tight lg:text-2xl">
    {children}
  </h1>
)

export const PageContainer = ({ children }) => (
  <div className="mt-5 py-10 pl-5">{children}</div>
)
