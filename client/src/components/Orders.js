import React from "react";

function Orders(props) {
  const removeItem = () => {
    props.remove(props.item);
  };

  return (
    <tr>
      <td data-th="Product">
        <div className="row">
          <div className="col-sm-2 hidden-xs">
            <img
              src={props.item.foodurl}
              alt="..."
              className="img-responsive"
              style={{ height: "80px", maxWidth: "80px" }}
            />
          </div>
          <div className="col-sm-10">
            <h4 className="nomargin">{props.item.foodname}</h4>
            <p>{props.item.foodDesc}</p>
          </div>
        </div>
      </td>
      <td data-th="Price">
        <span>&#8377;</span>
        {props.item.foodprice}
      </td>
      <td data-th="Quantity">
        <input
          type="number"
          className="form-control text-center"
          value={props.item.foodquantity}
        />
      </td>
      <td data-th="Subtotal" className="text-center">
        <span>&#8377;</span>
        {props.item.total}
      </td>
      <td className="actions" data-th="">
        <button className="btn btn-info btn-sm mx-2">
          <i className="fa fa-refresh"></i>
        </button>
        <button className="btn btn-danger btn-sm mx-2" onClick={removeItem}>
          <i className="fa fa-trash-o"></i>
        </button>
      </td>
    </tr>
  );
}

export default Orders;
