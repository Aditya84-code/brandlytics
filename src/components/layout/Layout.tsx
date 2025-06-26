import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import BoltBadge from './BoltBadge';
import { motion } from 'framer-motion';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <motion.main 
        className="flex-1 pt-[5rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
      <Footer />
      <BoltBadge />
    </div>
  );
};

export default Layout;