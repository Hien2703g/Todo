import { useEffect, useState } from "react";
import Modal from "react-modal";

function EditProduct(props) {
  const {item,onReload}=props;
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [data,setData]= useState(item);
  const [dataCategory, setDataCategory]=useState([]);

    useEffect(() => {
      const fetchApi = async () => {
        fetch("http://localhost:3000/Category")
          .then((res) => res.json())
          .then((data) => {
            setDataCategory(data);
            onReload();
          });
      };
      setTimeout(() => {
        fetchApi();
      }, 5000);
    }, []);
    // console.log(dataCategory);

  const openModal=()=> {
    setmodalIsOpen(true);
  }

  const closeModal=()=> {
    setmodalIsOpen(false);
  }
  const handleSubmit=( e)=>{
    e.preventDefault();
    // console.log(e);
    fetch(`http://localhost:3000/products/${item.id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setmodalIsOpen(false);
          onReload();
        }
      });
    
  };
  const handleChange=(e)=>{
    const name = e.target.name;
    const value = e.target.value;
    // console.log(value);
    
    setData({
      ...data,
      [name]: value
    });
  }
  console.log(data)
  return (
    <>
      <button onClick={openModal}> Chinh sua san pham</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Title: </td>
                <td>
                  <input
                    value={data.title}
                    type="text"
                    name="title"
                    onClick={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td> Category: </td>
                <td>
                  <select
                    name="Category"
                    onClick={handleChange}
                    value={data.category}
                  >
                    {dataCategory.map((item, index) => (
                      <option key={index} value={item.slug}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>

              <tr>
                <td>Price: </td>
                <td>
                  <input
                    value={data.price}
                    type="text"
                    name="price"
                    onClick={handleChange}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Discount: </td>
                <td>
                  <input
                    value={data.discountPercentage}
                    type="text"
                    name="discount"
                    onClick={handleChange}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Image: </td>
                <td>
                  <input
                  value={data.image}
                    type="text"
                    name="Image"
                    onClick={handleChange}
                    required
                  />
                </td>
              </tr>

              <tr>
                <td>Description</td>
                <td>
                  <textarea
                    rows={6}
                    value={data.description}
                    type="text"
                    name="description"
                    onClick={handleChange}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button onClick={closeModal}>Exit</button>
                </td>
                <td>
                  <input type="submit" value="Update"></input>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </Modal>
    </>
  );
}
export default EditProduct;
