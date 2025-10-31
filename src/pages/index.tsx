import type { NextPage } from 'next'
import useSWR from 'swr'
import axios from 'axios'
import ProductCard from '@/components/ProductCard'
import { useDispatch } from 'react-redux'
import { addItem } from '@/store/slices/cartSlice'

const fetcher = (url: string) => axios.get(url).then(r => r.data)

const Home: NextPage = () => {
  const { data } = useSWR('/api/products', fetcher)
  const dispatch = useDispatch()
  const products = data?.products || []
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">MallickShop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <ProductCard key={p._id} id={p._id} name={p.name} price={p.price} image={p.images?.[0]} onAdd={() => dispatch(addItem({ productId: p._id, name: p.name, price: p.price, qty: 1 }))} />
        ))}
      </div>
    </main>
  )
}

export default Home
