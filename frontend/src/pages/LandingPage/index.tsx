import { useState } from 'react';
import mainImage from './../../assets/main.png';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
      <div className=" py-2">
          <button 
              className="w-full text-left transition-all ease-in-out duration-300 font-semibold font-Kanit text-pearl flex justify-between items-center py-2" 
              onClick={() => setIsOpen(!isOpen)}
          >
              {question}
              <span >{isOpen ? '-' : '+'}</span>
          </button>
          {isOpen && <p className="text-darkblue font-Kanit font-normal bg-pearl rounded-xl p-4 mt-2">{answer}</p>}
      </div>
  );
};


const LandingPage = () => {
  return (
      <div className="flex flex-col items-center w-full bg-lavender pt-20">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center justify-center max-w-6xl py-16 px-6 max-lg:gap-8 lg:gap-28">
              <div className="max-sm:w-64 w-96 h-auto">
                  <img src={mainImage} alt="Mend_Hero" className="rounded-[48px] shadow-lg" />
              </div>
              <div className="max-[425px]:w-auto mx-auto max-xl:w-96 xl:w-[500px] text-darkblue font-Kanit">
                  <h2 className="text-3xl font-bold text-left text-darkblue mb-4">Why is Mend Important?</h2>
                  <p className="text-lg mb-6 text-left">
                    Mend is a digital platform designed to help individuals heal. This app provides a safe and supportive environment for users to journal their thoughts and emotions, reflect on their experiences, and develop healthy habits. With its user-friendly interface and use of AI to analyze behavior, Mend empowers individuals to take control of their mental health and cultivate a more positive and resilient mindset.                  </p>
                  <button className="bg-midblue text-pearl lg:flex gl:justify-start px-8 py-2 rounded-full shadow-md">Learn More</button>
              </div>
          </div>

          {/* FAQ Section */}
          <div className="w-full bg-pearl font-Kanit py-16 px-6">
              <h2 className="text-2xl font-bold text-center text-darkblue mb-8">Frequently Asked Questions</h2>
              <div className="bg-midblue p-4 rounded-3xl max-w-3xl font-Kanit text-left mx-auto font-light">
                  <FAQItem question="How does Mend analyze my journal entries?" answer="Mend uses AI to detect patterns in your writing and provide insights to help you build healthy habits and coping strategies." />
                  <FAQItem question="Is my data private and secure?" answer="Yes! Your journal entries are encrypted and stored securely to ensure your privacy." />
                  <FAQItem question="Can I use Mend for free?" answer="Yes, Mend offers a free plan with essential features, as well as premium options for additional insights and customization." />

              </div>
          </div>
      </div>
  );
}

export default LandingPage;
