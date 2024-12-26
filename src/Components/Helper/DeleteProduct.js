function DeleteProduct(props){
    const {item, onReload}=props;
    const handleDelete=()=>{
        fetch(`http://localhost:3000/products/${item.id}`, {
          method: "DELETE",
          
        })
          .then((res) => res.json())
          .then(() => {
            onReload();
          });
    }
    return (
        <>
            <button onClick={handleDelete}> Delete</button>
        </>
    );
}
export default DeleteProduct;