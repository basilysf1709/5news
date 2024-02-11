import Typewriter from "typewriter-effect";

type MovingWordsProps = {
  text: string;
};

export const MovingWords: React.FC<MovingWordsProps> = ({ text }) => {
  return (
    <div className="mx-20 my-16 text-3xl font-semibold leading-relaxed text-gray-700 md:text-4xl">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString(text)
            .pauseFor(2500)
            .callFunction(() => {
              typewriter.stop();
            })
            .start();
        }}
        options={{
          autoStart: true,
          loop: false,
        }}
      />
    </div>
  );
};
