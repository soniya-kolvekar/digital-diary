"use client";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#C8E0F5] via-[#F3C9D8] to-[#FBC7E0] text-gray-800 px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-12">

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold font-[marcellus]">About Us</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
            We are committed to creating meaningful digital experiences through thoughtful design,
            innovation, and user-focused development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          
          <div className="space-y-4 bg-white/40 backdrop-blur-md shadow-xl rounded-2xl p-10" >
            <h2 className="text-2xl font-bold font-[marcellus]">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
              What started as a simple idea evolved into a mission to build elegant, accessible,
              and impactful digital solutions. Our team believes in blending creativity with
              technology to bring purposeful products to life.
            </p>
          </div>

          <div className="space-y-4 bg-white/40 backdrop-blur-md shadow-xl rounded-2xl p-10">
            <h2 className="text-2xl font-bold font-[marcellus]">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              We aim to empower people through clean design, modern tools, and intuitive
              user experiences. Every project we create is crafted with precision, passion,
              and a deep understanding of user needs.
            </p>
          </div>

        </div>

        <div className="space-y-6 ">
          <h2 className="text-2xl font-bold text-center font-[marcellus]">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-6 border rounded-xl hover:shadow-lg transition bg-white/40 backdrop-blur-md shadow-xl rounded-2xl p-10">
              <h3 className="font-semibold text-xl font-[marcellus]">Innovation</h3>
              <p className="text-gray-600 mt-2">
                We believe in pushing boundaries and thinking differently.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-lg transition bg-white/40 backdrop-blur-md shadow-xl rounded-2xl p-10">
              <h3 className="font-semibold text-xl font-[marcellus]">Integrity</h3>
              <p className="text-gray-600 mt-2">
                Transparency and honesty guide everything we do.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-lg transition bg-white/40 backdrop-blur-md shadow-xl rounded-2xl p-10">
              <h3 className="font-semibold text-xl">Excellence</h3>
              <p className="text-gray-600 mt-2">
                We focus on quality, craftsmanship, and constant improvement.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
