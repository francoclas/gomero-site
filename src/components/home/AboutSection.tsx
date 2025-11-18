import "@styles/home/about-Section.css";
import CarouselStack from "./CarouselStack";

export default function AboutSection() {
  return (
    <section className="acerca-section">
      <div className="acerca-container">
        
        <div className="acerca-card">
          <h2>Presentación 1</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Natus saepe, sunt ipsam, accusantium iusto soluta vero doloremque porro architecto obcaecati consequatur? Illum incidunt eaque deserunt doloribus in, labore molestiae magnam..
          </p>
        </div>

        <div className="acerca-card">
          <h2>Presentacion 2</h2>
          <p>
           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro, sed autem. Sunt voluptatum cupiditate ducimus nesciunt. Maiores consequuntur amet similique quidem tempore, in possimus neque, rem inventore tenetur a sapiente?
          </p>
        </div>
      </div>
      <div>
        <CarouselStack></CarouselStack>
      </div>
    </section>
    
  );
}