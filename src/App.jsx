import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [inputData, setInputData] = useState({ name: "", age: "", job: "", imgUrl: "" });
  const [cards, setCards] = useState([]);

  // Sahifa yuklanganda localStorage'dan ma'lumotlarni o'qib olish
  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem("cards"));
    if (savedCards) {
      setCards(savedCards);
    }
  }, []);

  // Cards state o'zgarganda localStorage'ga saqlash
  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  // Form inputlarini boshqarish
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  // Form submit bo'lganda yangi card qo'shish
  const handleSubmit = (e) => {
    e.preventDefault();
    setCards([...cards, inputData]);
    setInputData({ name: "", age: "", job: "", imgUrl: "" });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          name="name"
          value={inputData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="number"
          name="age"
          value={inputData.age}
          onChange={handleChange}
          placeholder="Age"
          required
        />
        <input
          type="text"
          name="job"
          value={inputData.job}
          onChange={handleChange}
          placeholder="Job"
          required
        />
        <input
          type="text"
          name="imgUrl"
          value={inputData.imgUrl}
          onChange={handleChange}
          placeholder="Image URL"
          required
        />
        <button type="submit">Add Card</button>
      </form>

      <div className="cards-container">
        {cards.map((card, index) => (
          <div key={index} className="card">
            <img src={card.imgUrl} alt={card.name} className="card-image" />
            <h3>{card.name}</h3>
            <p>Age: {card.age}</p>
            <p>Job: {card.job}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
