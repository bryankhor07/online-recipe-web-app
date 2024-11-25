import "./chefQuotesCard.css";

export default function ChefQuotesCard(props) {
  return (
    <div className="chef-quotes-card">
      <i className="chef-quotes-text">{props.text}</i>
      <div className="chef-quotes-author-container">
        <p className="chef-quotes-author">- {props.author}</p>
        <img src={props.authorImage} />
      </div>
    </div>
  );
}
