"use client";
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#95c9f7] via-[#ffcedf] to-[#FBC7E0] text-gray-800 px-6 py-16">
      <div className="max-w-5xl mx-auto space-y-12">

        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold font-[marcellus]">About Us</h1>
          <p className="text-gray-700 max-w-2xl mx-auto">
           We are building a digital diary designed to be reliable, responsive, and deeply personal. Our platform combines a modern ReactJS interface with a high-performance C++ backend, connected through secure HTTP communication and structured JSON data exchange. This architecture allows us to deliver a smooth user experience while maintaining efficiency, scalability, and data clarity.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          
          <div className="space-y-4 bg-white/40 backdrop-blur-md shadow-xl rounded-2xl p-10" >
            <h2 className="text-2xl font-bold font-[marcellus]">Our Story</h2>
            <p className="text-gray-600 leading-relaxed">
             The idea began with a simple question: How can personal thoughts be stored digitally without losing their privacy, structure, or authenticity?
Instead of relying on heavy frameworks or overcomplicated systems, we chose a lightweight yet powerful approach — pairing a dynamic frontend with a fast, low-level backend. This balance shaped our diary into something both intuitive for users and robust behind the scenes.
            </p>
          </div>

          <div className="space-y-4 bg-white/40 backdrop-blur-md shadow-xl rounded-2xl p-10">
            <h2 className="text-2xl font-bold font-[marcellus]">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Our mission is to create a digital space where users can record their thoughts with confidence and ease. By using clear data communication (JSON) and reliable request handling (HTTP), we ensure that every entry is handled accurately, consistently, and securely — without unnecessary complexity.
            </p>
          </div>

        </div>

        <div className="space-y-6 ">
          <h2 className="text-2xl font-bold text-center font-[marcellus]">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">

            <div className="p-6 border rounded-xl hover:shadow-lg transition bg-white/40 backdrop-blur-md shadow-xl rounded-2xl p-10">
              <h3 className="font-semibold text-xl font-[marcellus]">Innovation</h3>
              <p className="text-gray-600 mt-2">
                We embrace practical innovation — choosing technologies that solve real problems. ReactJS enables a responsive, interactive interface, while C++ ensures performance and control at the system level. Together, they form a solution that is both modern and efficient.
              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-lg transition bg-white/40 backdrop-blur-md shadow-xl rounded-2xl p-10">
              <h3 className="font-semibold text-xl font-[marcellus]">Integrity</h3>
              <p className="text-gray-600 mt-2">
Data integrity is fundamental to a diary. Our backend architecture prioritizes structured data handling and predictable communication, ensuring entries remain accurate, consistent, and dependable over time.              </p>
            </div>

            <div className="p-6 border rounded-xl hover:shadow-lg transition bg-white/40 backdrop-blur-md shadow-xl rounded-2xl p-10">
              <h3 className="font-semibold text-xl font-[marcellus]">Excellence</h3>
              <p className="text-gray-600 mt-2">
Excellence is reflected in attention to detail — from smooth UI interactions to optimized backend processing. Every design and technical decision is made to enhance reliability, performance, and user trust.              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
