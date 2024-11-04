import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Lines from '@/components/Lines'
import ScrollToTop from '@/components/ScrollToTop'
import ToasterContext from '@/context/ToastContext'

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Lines />
      <Header />
      {children}
      <ScrollToTop />
      <Footer />
      <ToasterContext />
    </>
  )
}

export default DefaultLayout
