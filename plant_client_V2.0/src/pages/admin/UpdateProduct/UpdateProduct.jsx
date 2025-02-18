import { Input, Radio, RadioGroup, Select } from "rizzui";
import JoditEditor from "jodit-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GiFruitTree } from "react-icons/gi";
import { toast, ToastContainer } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";
import { useEffect, useRef, useState } from "react";
import { useGetProductByIdQuery } from "../../../features/products/productsApi";
import { useParams } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { FaCartShopping } from "react-icons/fa6";
import { useUpdateProductInfoMutation } from "../../../features/adminControl/adminControlApi";
import { useDispatch } from "react-redux";

const PlantTypeOptions = [
  { label: "Epiphytic Plant 🌱🌲", value: "Epiphytic" },
  { label: "Desert Plant 🌵", value: "Desert" },
  { label: "Natural Plant 🌳", value: "Natural" },
  { label: "Artificial Plant 🎭", value: "Artificial" },
  { label: "Polythene Plant 🛍️", value: "Polythene" },
  { label: "Hydroponic Plant 💧🌱", value: "Hydroponic" },
  { label: "Aquatic Plant 🌿💦", value: "Aquatic" },
  { label: "Medicinal Plant 🌿", value: "Medicinal" },
  { label: "Bonsai Plant 🎋", value: "Bonsai" },
  { label: "Climbing Plant 🌿🧗", value: "Climbing" },
];

const validationSchema = Yup.object({
  plantName: Yup.string().required("Plant Name is required"),
  description: Yup.string().required("Description is required"),
  previousPrice: Yup.number().required("Previous price is required"),
  newPrice: Yup.number().required("New price is required"),
  stock: Yup.number().required("Stock is required"),
  plantType: Yup.string().required("Plant Type is required"),
  material: Yup.string().required("Material is required"),
  color: Yup.string().required("Plant Color is required"),
});

const UpdateProduct = () => {
  const [initialValues, setInitialValues] = useState({
    plantName: "",
    description: "",
    previousPrice: "",
    newPrice: "",
    stock: "",
    plantType: "",
    material: "organic",
    color: "",
    category: "indoor",
  });
  const { id } = useParams();
  const editor = useRef(null);
  const dispatch = useDispatch();
  const { data: plants, isSuccess } = useGetProductByIdQuery(id);
  const [
    updateProductInfo,
    { isSuccess: isUpdateProductSuccess, isLoading: isUpdateProductLoading },
  ] = useUpdateProductInfoMutation();

  // Define state for form values

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    try {
      updateProductInfo({
        id: id,
        name: values.plantName,
        previousPrice: values.previousPrice,
        newPrice: values.newPrice,
        stock: values.stock,
        color: values.color,
        plantType: values.plantType,
        material: values.material,
        category: values.category,
        description: values.description,
      });
      toast(`${values?.plantName} updated successfully`);
      setSubmitting(false);
    } catch (error) {
      toast.error(error);
    }
  };
  // Update initialValues when data is fetched successfully
  useEffect(() => {
    if (isSuccess && plants?.data) {
      setInitialValues({
        plantName: plants.data.name || "",
        description: plants.data.description || "",
        previousPrice: plants.data.previousPrice || "",
        newPrice: plants.data.newPrice || "",
        stock: plants.data.stock || "",
        plantType: plants.data.plantType || "",
        material: plants.data.material || "organic",
        color: plants.data.color || "",
        category: plants.data.category || "indoor",
      });
    }
  }, [isSuccess, plants]);

  return (
    <>
      <section className="bg-white px-4 py-4 lg:px-12 lg:py-12 rounded-2xl">
        <ToastContainer
          position="bottom-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              <div className="flex items-center lg:justify-between mt-4">
                <h1 className="text-primary-dashboardPrimaryTextColor font-bold text-xl flex items-center gap-2">
                  Update Product <GiFruitTree />
                </h1>
                <button
                  type="submit"
                  className="bg-primary-dashboardPrimaryTextColor text-white lg:px-4 lg:py-2 rounded-full font-bold hover:bg-lime-500"
                >
                  {isUpdateProductLoading || isSubmitting ? (
                    <ImSpinner2 className="animate-spin" />
                  ) : (
                    "Update Product"
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 lg:my-8">
                <div className="bg-slate-50 px-3 py-3 lg:px-12 lg:py-12 shadow-xl rounded-2xl">
                  <Field
                    as={Input}
                    label="Plant Name"
                    name="plantName"
                    inputClassName="border-lime-500 bg-white opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2"
                  />
                  <ErrorMessage
                    name="plantName"
                    component="div"
                    className="text-red-500"
                  />

                  <div className="mt-6">
                    <label className="font-bold">Product Description</label>
                    <JoditEditor
                      ref={editor}
                      key={values.description}
                      value={values.description}
                      tabIndex={0}
                      onBlur={(newContent) =>
                        setFieldValue("description", newContent)
                      }
                      config={{
                        height: 300,
                        minHeight: 400,
                        maxHeight: 500,
                        style: { overflowY: "auto" },
                      }}
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>
                <div className="bg-slate-50 px-3 py-3 lg:px-12 lg:py-12 shadow-xl rounded-2xl">
                  <h1 className="text-primary-dashboardPrimaryColor font-bold text-xl mb-4">
                    Plant Type & Category
                  </h1>
                  <Select
                    label="Select Plant Type"
                    options={PlantTypeOptions}
                    value={PlantTypeOptions.find(
                      (option) => option.value === values.plantType
                    )}
                    onChange={(selected) =>
                      setFieldValue("plantType", selected.value)
                    }
                    dropdownClassName="bg-white"
                    selectClassName="border-lime-500 bg-white opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2"
                  />
                  <ErrorMessage
                    name="plantType"
                    component="div"
                    className="text-red-500"
                  />
                  <label htmlFor="material" className="font-semibold mt-4">
                    Material
                  </label>
                  <RadioGroup
                    value={values.material}
                    setValue={(val) => setFieldValue("material", val)}
                    className="flex gap-4 mt-2"
                  >
                    <Radio
                      label="Organic"
                      value="organic"
                      inputClassName="text-lime-600  ring-0 focus:ring-0 focus:outline-none "
                    />
                    <Radio
                      label="Non-Organic"
                      value="non-organic"
                      inputClassName="text-lime-600  ring-0 focus:ring-0 focus:outline-none "
                    />
                  </RadioGroup>

                  <Field
                    as={Input}
                    label="Plant Color"
                    name="color"
                    inputClassName="border-lime-500 bg-white opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2"
                  />
                  <ErrorMessage
                    name="color"
                    component="div"
                    className="text-red-500"
                  />

                  <RadioGroup
                    value={values.category}
                    setValue={(val) => setFieldValue("category", val)}
                    className="flex gap-4 mt-2"
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
                <div className="bg-slate-50 px-3 py-3 lg:px-12 lg:py-12 shadow-xl rounded-2xl">
                  <h1 className="text-primary-dashboardPrimaryColor font-bold text-xl mb-4">
                    Pricing & Stocks
                  </h1>
                  <Field
                    as={Input}
                    type="number"
                    label="Previous Price"
                    name="previousPrice"
                    prefix={<CurrencyDollarIcon className="w-5" />}
                    inputClassName="border-lime-500 bg-white opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2"
                  />
                  <ErrorMessage
                    name="previousPrice"
                    component="div"
                    className="text-red-500"
                  />

                  <Field
                    as={Input}
                    type="number"
                    label="New Price"
                    name="newPrice"
                    prefix={<CurrencyDollarIcon className="w-5" />}
                    inputClassName="border-lime-500 bg-white opacity-80 focus:border-lime-600 focus:ring focus:ring-lime-600 rounded-md p-2"
                  />
                  <ErrorMessage
                    name="newPrice"
                    component="div"
                    className="text-red-500"
                  />

                  <Field
                    as={Input}
                    type="number"
                    label="Stock"
                    name="stock"
                    prefix={<FaCartShopping className="w-5" />}
                  />
                  <ErrorMessage
                    name="stock"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
};

export default UpdateProduct;
