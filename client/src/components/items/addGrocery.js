import React, { useState } from "react";
import axios from "axios";
import { Form, FormGroup, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function CreateProduct(props) {
  const { productList, setProductList } = props;

  const [itemName, setItemName] = useState("");
  const [itemClass, setItemClass] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [groceryId, setGroceryId] = useState();
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/item", {
        itemName,
        itemClass,
        itemQuantity,
        itemDescription,
        itemPrice,
        groceryId,
      })
      .then((res) => {
        console.log(`result of create item L ${res}`);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.error);
        setErrors(err.response.data.error.errors);
      });
  };

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <h3>Add Groceries</h3>
        <FormGroup>
          <Form.Label>Grocery Title : </Form.Label>
          <Form.Control
            type="text"
            value={itemName}
            name="itemName"
            onchange={(e) => setItemName(e.target.value)}
          />
          {errors.itemName && (
            <Form.Text className="text-danger">
              {errors.itemName.message}
            </Form.Text>
          )}
          <br />
        </FormGroup>
        <FormGroup>
          <Form.Label>Grocery Class :</Form.Label>
          <Form.Select onChange={(e) => setItemClass(e.target.value)}>
            <option>Please Select The Item Class :</option>
            <option value="Vegetable"></option>
            <option value="Fruit"></option>
            <option value="Meat"></option>
            <option value="Canned Good"></option>
            <option value="Dry Food"></option>
            <option value="Misc."></option>
          </Form.Select>
        </FormGroup>
        <FormGroup>
          <Form.Label> Grocery Quantity : </Form.Label>
          <Form.Control
            type="number"
            value={itemQuantity}
            name="itemQuantity"
            onchange={(e) => setItemQuantity(e.target.value)}
          />
          {errors.itemQuantity && (
            <Form.Text className="text-danger">
              {errors.itemQuantity.message}
            </Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>Grocery Description : </Form.Label>
          <Form.Control
            as="textarea"
            id="itemDescription"
            name="itemDescription"
            rows="4"
            cols="50"
            onChange={(e) => setItemDescription(e.target.value)}
          />
          {errors.itemDescription && (
            <Form.Text className="text-danger">
              {errors.itemDescription.message}
            </Form.Text>
          )}
        </FormGroup>
        <FormGroup>
          <Form.Label>Grocery Price : </Form.Label>
          <Form.Control
            type="number"
            value={itemPrice}
            name="itemPrice"
            onChange={(e) => setItemPrice(e.target.value)}
          />
          {errors.itemPrice && (
            <Form.Text className="text-danger">
              {errors.itemPrice.message}
            </Form.Text>
          )}
        </FormGroup>

        {/* <label>Grocery Store ID</label>
        <input type = "number" value = {groceryId} name = "groceryId"
        onChange = {(e) => setGroceryId(e.target.value)} />
        {errors.groceryId && <p className = "text-danger"> {errors.groceryId.message}</p>} */}
        <Button type="submit">{props.buttonText}</Button>
      </Form>
    </Container>
  );
}
export default CreateProduct;
