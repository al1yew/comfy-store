import FormInput from "./FormInput";
import { Form, useLoaderData, Link } from "react-router-dom";
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
  const { meta, params } = useLoaderData();

  const { search, company, category, shipping, order, price } = params;

  return (
    <Form
      className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 
    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
    >
      <FormInput
        type="search"
        label="search product"
        name="search"
        size="input-sm"
        defaultValue={search}
      />
      <FormSelect
        label="Select category"
        name="category"
        size="select-sm"
        defaultValue={category}
        list={meta.categories}
      />
      <FormSelect
        label="Select company"
        name="company"
        size="select-sm"
        defaultValue={company}
        list={meta.companies}
      />
      <FormSelect
        label="Sort by"
        defaultValue={order}
        size="select-sm"
        name="order"
        list={["a-z", "z-a", "price to high", "price to low"]}
      />
      <FormRange
        label="Set max price"
        name="price"
        size="range-sm"
        price={price}
      />
      <FormCheckbox
        name="shipping"
        label="Free Shipping"
        size="checkbox-sm"
        defaultValue={shipping}
      />
      <button type="submit" className="btn btn-primary btn-sm">
        Search
      </button>
      <Link to="/products" className="btn btn-accent btn-sm">
        Reset
      </Link>
    </Form>
  );
};
export default Filters;
