import { motion } from 'framer-motion';
import { Testimonial } from '@/types';
import { Quote } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    role: 'Marketing Director',
    company: 'CreativeLab',
    quote: 'Brandlytics has completely transformed my personal brand. The insights helped me increase my LinkedIn engagement by 300% in just two months.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    role: 'Freelance Designer',
    company: 'Self-employed',
    quote: 'As a freelancer, my personal brand is everything. Brandlytics provided actionable insights that helped me land three major clients in a month!',
    image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'Tech Entrepreneur',
    company: 'InnovateTech',
    quote: 'The competitive analysis from Brandlytics gave me the edge I needed. I now understand exactly how to position my personal brand in a crowded market.',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="gradient-background py-20 md:py-32 lg:py-40">
      <div className="container">
        <div className="mb-12 lg:mb-16 text-center space-y-4 lg:space-y-6">
          <motion.h2 
            className="mb-4 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Success Stories from Our Users
          </motion.h2>
          <motion.p 
            className="mx-auto max-w-[800px] text-muted-foreground md:text-lg lg:text-xl leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            See how Brandlytics has helped professionals transform their digital presence
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {testimonials.map((testimonial) => (
            <motion.div 
              key={testimonial.id}
              variants={item}
              className="relative rounded-2xl bg-background p-6 lg:p-8 shadow-lg"
            >
              <div className="mb-4 lg:mb-6 text-primary">
                <Quote className="h-8 w-8 lg:h-10 lg:w-10" />
              </div>
              <blockquote className="mb-4 lg:mb-6">
                <p className="italic text-foreground leading-relaxed lg:text-lg">{testimonial.quote}</p>
              </blockquote>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 lg:h-14 lg:w-14">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold lg:text-lg">{testimonial.name}</p>
                  <p className="text-sm lg:text-base text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;