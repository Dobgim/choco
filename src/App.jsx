import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import ScrollToTop from './components/ScrollToTop.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Kittens from './pages/Kittens.jsx';
import KittenDetail from './pages/KittenDetail.jsx';
import Process from './pages/Process.jsx';
import Included from './pages/Included.jsx';
import Facilities from './pages/Facilities.jsx';
import Cams from './pages/Cams.jsx';
import Gallery from './pages/Gallery.jsx';
import Testimonials from './pages/Testimonials.jsx';
import Faq from './pages/Faq.jsx';
import Contact from './pages/Contact.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import NotFound from './pages/NotFound.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import AdminDashboard from './admin/AdminDashboard.jsx';
import AdminKittens from './admin/AdminKittens.jsx';
import AdminOrders from './admin/AdminOrders.jsx';
import AdminInquiries from './admin/AdminInquiries.jsx';
import AdminVideos from './admin/AdminVideos.jsx';

export default function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="site">
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main id="main-content">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/kittens" element={<Kittens />} />
            <Route path="/kittens/:id" element={<KittenDetail />} />
            <Route path="/purchase-process" element={<Process />} />
            <Route path="/whats-included" element={<Included />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/kitten-cams" element={<Cams />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="kittens" element={<AdminKittens />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="inquiries" element={<AdminInquiries />} />
              <Route path="videos" element={<AdminVideos />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
    </div>
  );
}
