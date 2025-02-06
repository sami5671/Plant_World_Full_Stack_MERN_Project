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
    setCategoryValue(category);
    dispatch(filterByCategory(category));
  };
  const handlePriceChange = (price) => {
    setPrice(price);
    console.log(price);
    dispatch(filterByPrice(price)); // Dispatch price filter action
  };

  return (
    <div>
      <div>
        <Input
          type="text"
          label="Name"
          placeholder="Search By Plant Name"
          onChange={(e) => handleSearch(e.target.value)}
          inputClassName="border-lime-500 bg-white opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2"
        />
      </div>
      <div>
        <h1 className="text-sm font-semibold mt-4 mb-2">Category</h1>
        <RadioGroup
          onChange={(e) => handleCategory(e.target.value)}
          className="flex gap-4"
          value={categoryValue}
        >
          <Radio
            label="Indoor"
            value="indoor"
            inputClassName="text-lime-600  ring-0 focus:ring-0 focus:outline-none "
          />
          <Radio
            label="Outdoor"
            value="outdoor"
            inputClassName="text-lime-600  ring-0 focus:ring-0 focus:outline-none "
          />
        </RadioGroup>
      </div>
      <div className="mt-6">
        <label htmlFor="price" className="text-sm font-semibold">
          Price: ${price}
        </label>
        <input
          type="range"
          min={0}
          max="100"
          value={price}
          className="range accent-lime-600"
          step="25"
          onChange={(e) => handlePriceChange(e.target.value)}
        />
        <div className="flex w-full justify-between px-2 text-xs">
          <span>$0</span>
          <span>$25</span>
          <span>$50</span>
          <span>$75</span>
          <span>$100</span>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilterProduct;
