import { useState } from "react";
import toast from "react-hot-toast";
import { FaCopy } from "react-icons/fa6";
import discover from "../../../assets/images/discover.png";
import visa from "../../../assets/images/visa.png";
import mastercard from "../../../assets/images/mastercard.png";

const DummyCards = () => {
  const [copiedCard, setCopiedCard] = useState(null);

  const handleCopyCardNumber = (cardNumber, cardType) => {
    navigator.clipboard
      .writeText(cardNumber)
      .then(() => {
        setCopiedCard(cardType);
        toast.success(`Card number copied to clipboard! (${cardType})`);
        setTimeout(() => setCopiedCard(null), 2000);
      })
      .catch(() => {
        toast.error("Failed to copy card number!");
      });
  };

  const cards = [
    {
      type: "Visa Card",
      number: "4242424242424242",
      image: visa,
      key: "visa",
    },
    {
      type: "Master Card",
      number: "5555555555554444",
      image: mastercard,
      key: "mastercard",
    },
    {
      type: "Discover",
      number: "6011000990139424",
      image: discover,
      key: "discover",
    },
  ];

  return (
    <div className="mt-4">
      <h1 className="font-bold">Dummy Cards:</h1>
      {cards.map((card) => (
        <p
          key={card.key}
          onClick={() => handleCopyCardNumber(card.number, card.type)}
          className="flex items-center mt-2 cursor-pointer"
        >
          <img src={card.image} className="w-[50px] mr-2" alt={card.type} />
          {card.number}
          <span
            className={`ml-2 ${
              copiedCard === card.key
                ? "text-green-500"
                : "hover:text-slate-400"
            }`}
          >
            <FaCopy />
          </span>
        </p>
      ))}
    </div>
  );
};

export default DummyCards;
