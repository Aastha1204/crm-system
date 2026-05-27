function StatsCard({ title, value }) {

  return (

    <div className="bg-[#111827]/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl hover:scale-105 transition">

      <h2 className="text-gray-400 text-lg">

        {title}

      </h2>

      <p className="text-5xl font-bold mt-4 text-white">

        {value}

      </p>

    </div>

  );

}

export default StatsCard;