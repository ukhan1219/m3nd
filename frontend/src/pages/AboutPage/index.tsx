import CrewCarousel from '../../components/CrewCarousel';
import girl from './../../assets/girl-journal.png';
import guy from './../../assets/guy-shrug.png';

const AboutPage = () => {
  return (
    <div className="flex flex-col bg-pearl items-center max-[430px]:pt-5 max-sm:pt-12 pt-[2rem]">
      <div className="max-w-[1020px] py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-16 max-w-screen-xl mx-auto">
          {/* Image 1 - appears first on mobile, second on desktop */}
          <div className="order-1 md:order-2 flex justify-center items-center">
            <img
              src={girl}
              alt="Girl journaling"
              className="w-80 h-80 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Paragraph 1 - second on mobile, first on desktop */}
          <div className="order-2 md:order-1 flex flex-col justify-center">
            <h2 className="text-3xl pb-2 font-bold text-midblue text-left font-Kanit">What is Mend?</h2>
            <p className="font-semibold text-darkblue text-left 2xl:text-xl text-lg">
              Mend is a platform designed to support mental well-being through journaling and self-reflection.
            </p>
          </div>

          {/* Image 2 - third on mobile, fourth on desktop */}
          <div className="order-3 md:order-3 flex justify-center items-center">
            <img
              src={guy}
              alt="Guy shrugging"
              className="w-80 h-80 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Paragraph 2 - fourth on mobile, third on desktop */}
          <div className="order-4 md:order-4 flex flex-col justify-center">
            <h2 className="text-3xl pb-2 font-bold text-left text-midblue font-Kanit">Why did we make Mend?</h2>
            <p className="font-semibold text-left text-darkblue 2xl:text-xl text-lg">
              We created Mend to provide a safe, supportive space for emotional growth and personal insight.
            </p>
          </div>
        </section>
      </div>

      {/* Crew Cards Carousel */}
      <CrewCarousel />
    </div>
  );
};

export default AboutPage;
