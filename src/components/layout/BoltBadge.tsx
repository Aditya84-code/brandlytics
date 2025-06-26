import { motion } from 'framer-motion';

const BoltBadge = () => {
  return (
    <motion.div
      className="fixed bottom-4 left-4 z-50"
      initial={{ opacity: 0, rotateY: -90 }}
      animate={{ opacity: 1, rotateY: 0 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        delay: 1
      }}
    >
      <motion.a
        href="https://bolt.new/?rid=os72mi"
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-all duration-300 hover:shadow-2xl"
        whileHover={{ 
          scale: 1.1,
          rotate: 22,
          transition: { duration: 0.6, ease: "easeInOut" }
        }}
        whileTap={{ scale: 0.95 }}
      >
        <img
          src="https://storage.bolt.army/white_circle_360x360.png"
          alt="Built with Bolt.new badge"
          className="w-20 h-20 md:w-28 md:h-28 rounded-full shadow-lg"
          loading="lazy"
        />
      </motion.a>
    </motion.div>
  );
};

export default BoltBadge;