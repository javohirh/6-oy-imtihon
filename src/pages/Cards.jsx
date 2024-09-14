import { useState } from "react";

function Cards() {
  const token = sessionStorage.getItem("token");
  if (!token) {
    window.location.replace("http://localhost:5173");
  }
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("Toshkent");
  const [events, setEvents] = useState([]);
  function handleDelete(id) {
    setEvents((prev) => {
      return prev.filter((event, index) => {
        return index !== id;
      });
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      title: title,
      date: date,

      location: location,
    };
    setEvents((prev) => {
      return [...prev, newEvent];
    });
    setDate("");
    setLocation("");
    setTitle("");
  };
  return (
    <>
      <h1 className="text-center mt-9 text-6xl">New Event</h1>
      <form
        onSubmit={handleSubmit}
        className=" rounded-lg mx-auto mt-8 flex flex-col w-80 p-5  bg-green-300"
      >
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
          className="my-2 p-1 rounded-md outline-none"
          type="text"
        />
        <input
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder="Event Date"
          className="my-2 p-1 rounded-md outline-none"
          type="date"
        />

        <select
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          className="my-2 p-1 rounded-md outline-none"
        >
          <option value="Toshkent">Toshkent</option>
          <option value="Buxoro">Buxoro</option>
          <option value="Samarqand">Samarqand</option>
          <option value="Andijon">Andijon</option>
        </select>
        <button className="my-2 p-1 rounded-md outline-none bg-gray-800 text-lg text-white hover:bg-gray-400">
          Qo'shish
        </button>
      </form>

      {events.length === 0 && (
        <h2 className="text-center text-2xl mt-3">No items yet :)</h2>
      )}

      {events.map((event, index) => {
        return (
          <div
            key={index}
            className="w-[70vw] mx-auto mt-6 rounded-lg px-6 pb-3 bg-lime-500"
          >
            <h2 className="text-white text-center text-5xl pt-3 ">
              {event.title}
            </h2>
            <p className="text-center mt-5 text-2xl pb-3 text-[gold]">
              {event.date}-{event.location}
            </p>
            <button
              className="bg-red-800 text-xl px-1 mx-auto block  mt-5 text-white rounded "
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
}

export default Cards;
