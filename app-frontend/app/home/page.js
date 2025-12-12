"use client"
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-300 to-pink-200 flex  p-6">
      <div className="w-1/2  flex flex-col  space-y-1 ">
        <div>
          <img src="https://i.pinimg.com/1200x/d7/f3/92/d7f3925344fb1f37704fac60d240d67a.jpg" alt="Digital Diary" className=" mx-auto mb-8 w-24 h-24 rounded-full shadow-lg border-purple-800 border-2" />
      </div>
      <div>
        
      <div className="bg-white/40 backdrop-blur-md shadow-xl rounded-2xl p-10 max-w-2xl w-full ">

        <h1 className="text-4xl font-bold text-gray-800 mb-6 font-[marcellus]">
          Welcome to Digital Diary
        </h1>

        <p className="text-gray-700 text-lg mb-10">
          Organize your memories, track your mood, and reflect on your day.
        </p>

        <div className="flex flex-col gap-4">

          <a
            href="/add"
            className="w-full py-3 bg-blue-200 hover:bg-blue-300 transition-colors rounded-lg font-medium text-gray-800"
          >
            ➕ Add New Entry
          </a>

          <a
            href="/delete"
            className="w-full py-3 bg-red-200 hover:bg-red-300 transition-colors rounded-lg font-medium text-gray-800"
          >
            🗑️ Delete Entry
          </a>

          <a
            href="/about"
            className="w-full py-3 bg-purple-200 hover:bg-purple-300 transition-colors rounded-lg font-medium text-gray-800"
          >
            ℹ️ About Us
          </a>

        </div>
      </div>
    </div></div>
    <div className="grid grid-cols-2 mx-3 gap-5  w-1/2">
      <img className="border-purple-500 border-2 opacity-75 rounded-3xl "src="https://i.pinimg.com/1200x/d0/3f/3c/d03f3c262fff039e030213116e6c152a.jpg"/>
            <img className=" border-purple-500 border-2 rounded-3xl  opacity-75" src="https://i.pinimg.com/736x/9b/92/7b/9b927ba6e9010895a4a6e9d5068e9f3c.jpg"/>
             <img className="border-purple-500 border-2 opacity-75 rounded-3xl " src="https://i.pinimg.com/1200x/e5/a3/9f/e5a39f5562e03ffbae9e067e21910093.jpg"/>
<img className="border-purple-500 border-2 opacity-75 rounded-3xl " src="https://i.pinimg.com/736x/c8/5a/53/c85a532861625430d989e2172206d564.jpg"/>

      </div></div>
  );
}
