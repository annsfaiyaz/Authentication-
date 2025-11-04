import Image from "next/image";

const imageSources = [
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg",
    "/image4.jpg",
    "/image5.jpg",
];

export default function Hero() {
    const repeated = [...imageSources, ...imageSources];

    return (
        <section className="bg-primary overflow-hidden px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">
            <div className="mx-auto flex flex-col lg:flex-row">
                {/* Left content */}
                <div className="lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col gap-6 bg-secondary rounded-2xl">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-unbounded">
                        DESIGN INTERFACE THAT TRANSFORM DIGITAL EXPERIENCES
                    </h1>
                    <p className="text-gray-600 font-normal text-base sm:text-lg font-inter">
                        We craft wireframes that break traditional boundaries. Every pixel tells a story of
                        innovation and user-centered design.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <button className=" text-white bg-tertiary px-5 py-2.5 rounded-full w-full sm:w-auto font-inter">Explore</button>
                        <button className="border px-5 py-2.5 rounded-full w-full sm:w-auto font-inter">Learn</button>
                    </div>
                </div>

                {/* Right side: two marquees */}
                <div className="w-full lg:w-full flex flex-col translate-y-6 gap-4 sm:gap-6  ">
                    {/* Row 1 - moves left */}
                    <div className="marquee">
                        <div className="marquee__track px-2 sm:px-4">
                            {repeated.map((src, idx) => (
                                <div key={`top-${idx}`}>
                                    <Image
                                        src={src}
                                        alt="gallery"
                                        width={400}
                                        height={320}
                                        className="object-cover object-center rounded-2xl "
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Row 2 - moves right */}
                    <div className="marquee marquee--reverse">
                        <div className="marquee__track px-2 sm:px-4">
                            {repeated.map((src, idx) => (
                                <div key={`bottom-${idx}`}>
                                    <Image
                                        src={src}
                                        alt="gallery"
                                        width={400}
                                        height={320}
                                        className="object-cover object-center rounded-2xl"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}