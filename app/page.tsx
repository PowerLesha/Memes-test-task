export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-8 py-12 px-4 text-center">
      <h2 className="text-sm leading-relaxed w-full max-w-xl">
        <span className="block mb-1">Are you scared?</span>
        <span className="block mb-1">Don't be afraid</span>
        <span className="block mb-1">I’m a friend, I won’t hurt you</span>
        <span className="block mb-1">Come here, come to me</span>
        <span className="block mb-1">Sit next to me</span>
        <span className="block">Look at my memes</span>
      </h2>

      <div className="relative">
        <img
          src="https://i.ibb.co/dsZhXkPR/13-11-3-1280x1280.jpg"
          alt="Meme Image"
          width={200}
          height={200}
          className="rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
}
