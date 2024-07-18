import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SearchBar(props) {
  const [searchTerm, setSearchTerm] = React.useState("");

  const {searchByStr: placeholder} = props;

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  function handleSearchClick() {
    props.searchCallback(searchTerm);
  }

  return (
    <div>

      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder={placeholder}
          className="me-2"
          aria-label="Search"
          onChange={handleChange}
          value={searchTerm}
          style={{ borderColor: "white" }}
          // size="sm"
        />
   
        <Button variant="outline-success"  onClick={handleSearchClick}>Search</Button>

      </Form>
    </div>
  );
}
