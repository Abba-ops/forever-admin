import { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function Add({ token }) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [shortDesc, setShortDesc] = useState("");
  const [longDesc, setLongDesc] = useState("");
  const [subCategory, setSubcategory] = useState("Top wear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("longDesc", longDesc);
      formData.append("shortDesc", shortDesc);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setPrice("");
        setLongDesc("");
        setShortDesc("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2 font-semibold">Upload Images</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              alt="upload area"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
            />
            <input
              hidden
              type="file"
              id="image1"
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              alt="upload area"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
            />
            <input
              hidden
              type="file"
              id="image2"
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              alt="upload area"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
            />
            <input
              hidden
              type="file"
              id="image3"
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              alt="upload area"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
            />
            <input
              hidden
              type="file"
              id="image4"
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 font-semibold">Product Name</p>
        <input
          type="text"
          value={name}
          placeholder="Type here"
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>
      <div className="w-full">
        <p className="mb-2 font-semibold">Short Description</p>
        <input
          type="text"
          value={shortDesc}
          placeholder="Enter a brief description"
          onChange={(e) => setShortDesc(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>

      <div className="w-full">
        <p className="mb-2 font-semibold">Long Description</p>
        <textarea
          type="text"
          value={longDesc}
          placeholder="Enter a detailed description"
          onChange={(e) => setLongDesc(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2 font-semibold">Product Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2 font-semibold">Subcategory</p>
          <select
            value={subCategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-full px-3 py-2">
            <option value="Top wear">Top Wear</option>
            <option value="Bottom wear">Bottom Wear</option>
            <option value="Winter wear">Winter Wear</option>
          </select>
        </div>
        <div>
          <p className="mb-2 font-semibold">Product Price</p>
          <input
            type="number"
            value={price}
            placeholder="45"
            className="w-full px-3 py-2 sm:w-[120px]"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>

      <div>
        <p className="mb-2 font-semibold">Available Sizes</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"]
              )
            }>
            <p
              className={`${
                sizes.includes("S") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}>
              S
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"]
              )
            }>
            <p
              className={`${
                sizes.includes("M") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}>
              M
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"]
              )
            }>
            <p
              className={`${
                sizes.includes("L") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}>
              L
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"]
              )
            }>
            <p
              className={`${
                sizes.includes("XL") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}>
              XL
            </p>
          </div>
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"]
              )
            }>
            <p
              className={`${
                sizes.includes("XXL") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}>
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        <label htmlFor="bestseller" className="cursor-pointer font-semibold">
          Mark as Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="uppercase w-28 py-3 mt-4 bg-black text-white">
        Add
      </button>
    </form>
  );
}
