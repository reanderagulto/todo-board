import { Outlet } from 'react-router-dom';

const DefaultLayout = ({
  children
}) => {
  return (
    <main>
      <article className="flex flex-col items-center justify-center mt-[120px]">
        {children}
      </article>
    </main>
  )
}

export default DefaultLayout
