import { useDispatch } from "react-redux";
import { Input } from "rizzui/input";
import {
  filterByCategory,
  filterByPrice,
  searchByName,
} from "../../features/products/productsSlice";
import { RadioGroup } from "rizzui/radio-group";
import { Radio } from "rizzui/radio";
import { useState } from "react";

const SearchAndFilterProduct = () => {
  const dispatch = useDispatch();
  const [categoryValue, setCategoryValue] = useState("");
  const [price, setPrice] = useState(5);

  const handleSearch = (plantName) => {
    dispatch(searchByName(plantName));
  };
  const handleCategory = (category) => {
    // console.log(category);
    setCategoryValue(category);
    dispatch(filterByCategory(category));
  };
  const handlePriceChange = (price) => {
    setPrice(price);
    // console.log(price);
    dispatch(filterByPrice(price)); // Dispatch price filter action
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">Search Plants</h2>
        <Input
          type="text"
          placeholder="Enter plant name..."
          onChange={(e) => handleSearch(e.target.value)}
          inputClassName="border-emerald-200 bg-white/50 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-2xl p-4 outline-none transition-all shadow-sm"
        />
      </div>

      <div className="pt-4 border-t border-emerald-100/50">
        <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
          Category
        </h3>
        <RadioGroup
          onChange={(e) => handleCategory(e.target.value)}
          className="flex flex-col gap-3"
          value={categoryValue}
        >
          <Radio
            label="All Plants"
            value="all"
            inputClassName="text-emerald-600 ring-emerald-500/30 focus:ring-emerald-500"
            labelClassName="text-slate-600 font-medium"
          />
          <Radio
            label="Indoor"
            value="indoor"
            inputClassName="text-emerald-600 ring-emerald-500/30 focus:ring-emerald-500"
            labelClassName="text-slate-600 font-medium"
          />
          <Radio
            label="Outdoor"
            value="outdoor"
            inputClassName="text-emerald-600 ring-emerald-500/30 focus:ring-emerald-500"
            labelClassName="text-slate-600 font-medium"
          />
        </RadioGroup>
      </div>

      <div className="pt-4 border-t border-emerald-100/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
            Price Range
          </h3>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg shadow-sm">
            Max: ${price}
          </span>
        </div>
        <div className="px-1">
          <input
            type="range"
            min={0}
            max="100"
            value={price}
            className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            step="5"
            onChange={(e) => handlePriceChange(e.target.value)}
          />
          <div className="flex w-full justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
            <span>$0</span>
            <span>$25</span>
            <span>$50</span>
            <span>$75</span>
            <span>$100</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilterProduct;
