
const StockField = ({newVariant, setNewVariant}) => {
  return (
    <div className="flex gap-4">
      <div className="w-1/2">
        <label className="block text-sm uppercase tracking-wider text-[#6e6258] mb-2">
          Initial Stock
        </label>
        <input
          type="number"
          value={newVariant.stock}
          onChange={(e) =>
            setNewVariant({
              ...newVariant,
              stock: e.target.value,
            })
          }
          className="w-full bg-transparent border-b border-[#d0c5b5] py-2 focus:outline-none focus:border-[#745a27]"
        />
      </div>
      <div className="w-1/2">
        <label className="block text-sm uppercase tracking-wider text-[#6e6258] mb-2">
          Price Amount (Optional)
        </label>
        <input
          type="number"
          value={newVariant.price.amount}
          onChange={(e) =>
            setNewVariant({
              ...newVariant,
              price: {
                ...newVariant.price,
                amount: e.target.value,
              },
            })
          }
          placeholder="Default if empty"
          className="w-full bg-transparent border-b border-[#d0c5b5] py-2 focus:outline-none focus:border-[#745a27] placeholder:text-[#d0c5b5]"
        />
      </div>
    </div>
  );
}

export default StockField