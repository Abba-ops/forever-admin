import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

export default function ProductList({ token }) {
  const [list, setList] = useState([]);

  const fetchProductList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to retrieve the product list.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching the product list.");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/product/remove/${id}`,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Product removed successfully.");
        fetchProductList();
      } else {
        toast.error("Product could not be found.");
      }
    } catch (error) {
      toast.error("An error occurred while removing the product.");
    }
  };

  useEffect(() => {
    fetchProductList();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <h4 className="mb-2 font-semibold">Product List</h4>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {list.map((item) => (
          <div
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
            key={item._id}>
            <img className="w-12" src={item.image[0]} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <p
              onClick={() => removeProduct(item._id)}
              className="text-right md:text-center cursor-pointer text-lg text-red-600">
              Remove
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
