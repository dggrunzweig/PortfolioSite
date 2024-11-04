import ProductCard from "./ProductCard";
import "./ProductCardDemo.css";
const ProductCardDemo = () => {
  return (
    <div className="product-card-viewer">
      <ProductCard
        name="Contour Jacket"
        price={575.0}
        full_desc="A lightweight textured nylon jacket, in a relaxed fit. CORDURA® pads the chest and neck, adding contrast to the zip area and a technical affect. Sleeves carry a deep hem and internal cuff. On the body, curved panels build a long, asymmetric seam running from front to back hem."
        id="1"
        image_url={[
          "acw_jacket/acw_1.webp",
          "acw_jacket/acw_2.webp",
          "acw_jacket/acw_3.webp",
          "acw_jacket/acw_4.webp",
        ]}
        onClickBuy={(id: string): void => {
          console.log("Attempting to buy: " + id);
        }}
      />
      <ProductCard
        name="Frontage Knit Crewneck"
        price={535.0}
        full_desc="A Merino wool crewneck. The layering effect is achieved through a double-bed jacquard technique. This is augmented by the fashioning of threads throughout."
        id="2"
        image_url={[
          "acw_sweater/sweater-1.webp",
          "acw_sweater/sweater-2.webp",
          "acw_sweater/sweater-3.webp",
          "acw_sweater/sweater-4.webp",
        ]}
        onClickBuy={(id: string): void => {
          console.log("Attempting to buy: " + id);
        }}
      />
      <ProductCard
        name="J123A-GT Bomber Jacket"
        price={1655.0}
        full_desc="
Windproof, water-repellent, breathable, and lightweight. GORE-TEX® stretch laminate stand collar, hem, and cuffs. Zip closure. Zip pockets. Velcro tabs at front and sleeves. Concealed bungee-style drawstring at hem. Zip expansion panel at sides seams. Flap pocket at sleeve. Locker loop at back collar. Detachable elasticized shoulder strap at interior. Taped seams. Unlined. Includes studded and logo-printed velcro tape"
        id="3"
        image_url={[
          "ACRONYM-Jacket/jacket-1.avif",
          "ACRONYM-Jacket/jacket-2.avif",
          "ACRONYM-Jacket/jacket-3.avif",
          "ACRONYM-Jacket/jacket-4.avif",
        ]}
        onClickBuy={(id: string): void => {
          console.log("Attempting to buy: " + id);
        }}
      />
    </div>
  );
};

export default ProductCardDemo;
