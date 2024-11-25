import ChefQuotesCard from "./chefQuotesCard";
import { useEffect, useState } from "react";
import "./chefQuotes.css";

export default function ChefQuotes() {
  const quotes = [
    {
      text: "Cooking is like love. It should be entered into with abandon or not at all.",
      author: "Harriet Van Horne",
      authorImage:
        "https://c8.alamy.com/comp/HD7010/whats-the-story-panelist-and-newspaper-columnist-harriet-van-horne-HD7010.jpg",
    },
    {
      text: "Cooking is a bit like cinema. It's the emotion that counts.",
      author: "Anne-Sophie Pic",
      authorImage:
        "https://www.swissdeluxehotels.com/media/wj2clvss/swiss-deluxe-hotels-stories-summer-2021-chefs-portrait-anne-sophie-pic-07-asp-officielle-2016_credit-anne-emmanuelle-thion_ecirgb.jpg?rxy=0.4974937343358396,0.44657860239655295&width=502&height=670&format=webp&v=1d9663fef5c80d0",
    },
    {
      text: "Food is art, and food is love. And we should show love and appreciation for those who cook it by eating it with relish.",
      author: "Mark Bittman",
      authorImage:
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Mark_Bittman_2017.jpg",
    },
    {
      text: "Eating is so intimate. It’s very sensual. When you invite someone to sit at your table and you want to cook for them, you’re inviting a person into your life.",
      author: "Maya Angelou",
      authorImage:
        "https://www.victoryforwomen.org/sites/default/files/share_bundle/Maya%20Angelou.jpg",
    },
    {
      text: "Cooking is all about people. Food is maybe the only universal thing that really has the power to bring everyone together. No matter what culture, everywhere around the world, people get together to eat.",
      author: "Guy Fieri",
      authorImage:
        "https://food.fnr.sndimg.com/content/dam/images/food/editorial/talent/guy-fieri/FN-TalentAvatar-Guy-Fieri-colorblock.jpg.rend.hgtvcom.616.616.suffix/1531174403377.jpeg",
    },
    {
      text: "The only real stumbling block is fear of failure. In cooking, you’ve got to have a what-the-hell attitude.",
      author: "Julia Child",
      authorImage:
        "https://hips.hearstapps.com/hmg-prod/images/gettyimages-82645345.jpg",
    },
    {
      text: "If you want to become a great chef, you have to work with great chefs. And that's exactly what I did.",
      author: "Gordon Ramsay",
      authorImage:
        "https://pbs.twimg.com/profile_images/1448696882746695683/Jp2_LEBL_400x400.jpg",
    },
    {
      text: "To me, there's no great chef without a great team.",
      author: "Daniel Boulud",
      authorImage:
        "https://americanpistachios.org/sites/default/files/pictures/2021-09/Daniel-Boulud-500x500.jpg",
    },
    {
      text: "One man’s trash is another man’s treasure, and the by-product from one food can be perfect for making another.",
      author: "Yotam Ottolenghi",
      authorImage:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Yotam_Ottolenghi.jpg/1200px-Yotam_Ottolenghi.jpg",
    },
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 8000); // Change quote every 8 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [quotes.length]);

  return (
    <div className="chef-quotes">
      <h2 className="chef-quotes-title">
        Flavors of Wisdom: Chef Quotes to Inspire
      </h2>
      <div className="chef-quotes-container">
        <ChefQuotesCard
          text={quotes[currentQuoteIndex].text}
          author={quotes[currentQuoteIndex].author}
          authorImage={quotes[currentQuoteIndex].authorImage}
        />
      </div>
    </div>
  );
}
