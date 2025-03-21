import { useState } from 'react';
import mainImage from './../../assets/main.png';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  isLast: boolean;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, index, isLast }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={` ${index < 2 ? 'border-b-2 border-darkblue' : ''}`}>
      <button
        className="w-full text-left transition-all ease-in-out duration-500 font-semibold font-Kanit text-pearl flex justify-between items-center py-4 pl-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <span className="px-4">{isOpen ? '-' : '+'}</span>
      </button>

      <div
        className={`transition-[max-height] duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-40' : 'max-h-0'
        }`}
      >
        <p
          className={`pl-4 text-darkblue font-Kanit font-normal bg-pearl p-4 mt-3 max-sm:p-2 ${
            isLast ? 'rounded-b-[20px]' : ''
          }`}
        >
          {answer}
        </p>
      </div>
    </div>
  );
};


const LandingPage = () => {
  return (
      <div className="flex flex-col items-center w-full bg-lavender pt-20">
          {/* Hero Section */}
          <div className="flex flex-col lg:flex-row items-center justify-center max-w-6xl py-16 px-6 max-lg:gap-8 lg:gap-28">
              <div className="max-sm:w-64 w-96 h-auto">
                  <img src={mainImage} alt="Mend_Hero" className="rounded-2xl shadow-lg" />
              </div>
              <div className="max-[425px]:w-auto mx-auto max-xl:w-96 xl:w-[500px] text-darkblue font-Kanit">
                  <h2 className="text-3xl font-bold text-left max-lg:text-center text-darkblue mb-4 font-outline-2">Why is Mend Important?</h2>
                  <p className="2xl:text-xl text-lg mb-6 text-left">
                    Mend is a digital platform designed to help individuals heal. This app provides a safe and supportive environment for users to journal their thoughts and emotions, reflect on their experiences, and develop healthy habits. With its user-friendly interface and use of AI to analyze behavior, Mend empowers individuals to take control of their mental health and cultivate a more positive and resilient mindset.                  
                  </p>
                    <button className="bg-midblue hover:bg-darkblue transition-all duration-300 border-2 border-darkblue text-pearl lg:flex gl:justify-start px-8 py-2 rounded-full shadow-md"><a href="/about">Learn More</a></button>
              </div>
          </div>

          {/* FAQ Section */}
          <div className="w-full bg-pearl font-Kanit py-16 px-6 ">
              <h2 className="text-3xl font-bold text-center text-darkblue mb-8">Frequently Asked Questions</h2>
              <div className="bg-midblue max-sm:w-full sm:w-7/12 lg:w-6/12 rounded-3xl max-w-3xl font-Kanit text-left mx-auto font-light border-4 border-darkblue 2xl:text-xl text-md min-[342px]:text-lg">
                <FAQItem question="How does Mend analyze my journal entries?" answer="Mend uses AI to detect patterns in your writing and provide insights to help you build healthy habits and coping strategies." index={0} isLast={false} />
                <FAQItem question="Is my data private and secure?" answer="Yes! Your journal entries are encrypted and stored securely to ensure your privacy." index={1} isLast={false} />
                <FAQItem question="Can I use Mend for free?" answer="Mend is completely free, ensuring everyone has access to the tools they need for self-improvement and emotional well-being. " index={2} isLast={true} />
              </div>


          </div>
      </div>
  );
}

export default LandingPage;
