import ImageBanner from "@/components/ImageBanner";
import Products from "@/components/Products";


export async function getProducts() {
    try {

        const baseURL = process.env.NEXT_PUBLIC_BASE_URL
        const response = await fetch(baseURL + '/api/products')
        console.log("Fetching:", baseURL + '/api/products');

        const products = await response.json()
        return products
    } catch (err) {
        console.log(err.stack)
        console.log(err.message)
        return []
    }
}

export default async function Home(props) {

  const products = await getProducts()
  
  let planner = null
  let stickers = [] // inspect > console on web page to see array of products

  for (let product of products) {
    if (product.name === 'Medieval Dragon Month Planner.jpeg') {
      planner = product
      continue
    }
    stickers.push(product) // push the current product onto the array
  }

  return (
    < >
      <ImageBanner/>
      <section>
        <Products planner={planner} stickers={stickers} />
      </section>
    </>
  );
}