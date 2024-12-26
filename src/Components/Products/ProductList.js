import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import EditProduct from "../Helper/EditProduct copy";
import DeleteProduct from "../Helper/DeleteProduct";
function ProductList(props) {
  const {reload}=props;
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [editReload, setEditReload]=useState(false);
  const handleReload=()=>{
    setEditReload(!reload);
  }

  useEffect(() => {
    const fetchApi = async () => {
      fetch("http://localhost:3000/products")
        .then((res) => res.json())
        .then((data) => {
          setData(data.reverse());
          setLoading(false);
        });
    };
    setTimeout(() => {
      fetchApi();
    }, 10);
  }, [reload , editReload]);

  // console.log(Data);

  return (
    <>
      {Loading ? (
        <div className="product_list">
          {[...Array(12)].map((_, index) => (
            <div className="product_item" key={index}>
              <Skeleton className="product_image" />
              <Skeleton className="product_title" />
              <Skeleton className="product_title" />
              <Skeleton className="product_title" />
            </div>
          ))}
        </div>
      ) : (
        <div className="product_list">
          {Data.map((item) => (
            <div className="product_item" key={item.id}>
              <img
                className="product_image"
                src={item.thumbnail}
                alt={item.title}
              />
              <h4 className="product_title">{item.title}</h4>
              <p className="product_price">Price: {item.price} $</p>
              <p className="product_discount">
                Discount: {item.discountPercentage} %
              </p>

              <div className="Hooks">
                <EditProduct item={item} onReload={handleReload} />
                <DeleteProduct item={item} onReload={handleReload} />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
export default ProductList;
