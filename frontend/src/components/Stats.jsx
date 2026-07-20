function Stats() {
  const stats = [
    { number: "500+", label: "Students" },
    { number: "50+", label: "Events" },
    { number: "20+", label: "Clubs" },
    { number: "95%", label: "Attendance" },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition"
          >
            <h2 className="text-4xl font-bold text-blue-600">
              {item.number}
            </h2>

            <p className="mt-2 text-gray-600">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;