import { CardContainer, CardInfo } from "./styles";

export interface CardType {
  id: number,
  imgUrl: string,
  title: string, 
  staks: string
  link: string
}

interface CardProps{
  card: CardType
}

export function Cards({card}: CardProps){
  return (
    <section>
      <CardContainer>
        <a href={card.link} target="_blank">
          <div>
            <img src={card.imgUrl} alt="" />
          </div>
          <CardInfo>
            <h3>{card.title}</h3>
            <p>{card.staks}</p>
          </CardInfo>
        </a>
      </CardContainer>
    </section>
  );
}