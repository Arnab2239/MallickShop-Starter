import React from 'react'

type Props = { id: string; name: string; price: number; image?: string; onAdd?: () => void }

export default function ProductCard({ name, price, image, onAdd }: Props) {
  return (
    <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
      <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center">{image ? <img src={image} alt={name} className="max-h-full" /> : <span>No Image</span>}</div>
      <h3 className="mt-3 font-semibold">{name}</h3>
      <p className="text-lg font-bold">₹{price}</p>
      <button onClick={onAdd} className="mt-3 w-full py-2 rounded bg-indigo-600 text-white">Add to cart</button>
    </div>
  )
}
