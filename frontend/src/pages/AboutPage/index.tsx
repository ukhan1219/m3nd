import CrewCarousel from '../../components/CrewCarousel';
const AboutPage = () => {
  return (
    <div className="flex flex-col items-center max-[430px]:pt-5 max-sm:pt-12 pt-[2rem]">
      <div className="w-full bg-pearl py-12">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 p-16 max-w-screen-xl mx-auto">
          <div className="flex flex-col">
            <h2 className="text-3xl pb-2 font-bold text-midblue text-left font-Kanit">What is Mend?</h2>
            <p className="font-semibold text-darkblue text-left 2xl:text-xl text-lg">
              Mend is a platform designed to support mental well-being through journaling and self-reflection.
            </p>
          </div>
          <div className="w-40 h-40 bg-gray-300 rounded-lg"></div>
          <div className="w-40 h-40 bg-gray-300 rounded-lg"></div>
          <div className="flex flex-col">
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
