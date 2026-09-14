import { Input, Radio, RadioGroup, Select } from "rizzui";
import { FaCirclePlus } from "react-icons/fa6";
import JoditEditor from "jodit-react";
import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRef, useState } from "react";
import { GiFruitTree } from "react-icons/gi";
import { uploadCloudinary } from "../../../api/utils";
import { useAddProductMutation } from "../../../features/adminControl/adminControlApi";
import { ToastContainer, toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";
import { useSelector } from "react-redux";

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

const AddProduct = () => {
  const initialValues = {
    plantName: "",
    description: "",
    previousPrice: "",
    newPrice: "",
    stock: "",
    plantType: "",
    material: "organic",
    color: "",
    category: "indoor",
  };

  const [addProduct, { isLoading, error: responseError }] =
    useAddProductMutation();
  const user = useSelector((state) => state?.auth?.user);
  const userId = user?._id;
  // console.log(userId);
  const editor = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event, setFieldValue) => {
    const files = event.target.files;
    const fileArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setSelectedImages((prevImages) => prevImages.concat(fileArray));
    setFieldValue("images", files);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // console.log(values);
    const images = values?.images;
    try {
      // upload images to Cloud Storage and get URL
      let arr = [];
      for (let i = 0; i < images.length; i++) {
        const data = await uploadCloudinary(images[i]);
        arr.push(data);
      }
      // console.log(arr);
      // add product using adminController API
      await addProduct({
        name: values.plantName,
        previousPrice: values.previousPrice,
        newPrice: values.newPrice,
        stock: values.stock,
        color: values.color,
        plantType: values.plantType,
        material: values.material,
        category: values.category,
        description: values.description,
        userId: userId,
        images: arr,
      });
      toast(`Product added successfully`);
      resetForm();
      setSelectedImages([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="px-4 py-4 lg:px-2 rounded-2xl relative z-10">
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
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="relative z-10">
            <div className="flex items-center justify-between mt-2 mb-6">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm flex items-center gap-3">
                Add New Product <GiFruitTree className="text-emerald-600" />
              </h1>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
              >
                {isLoading || isSubmitting ? (
                  <ImSpinner2 className="animate-spin w-5 h-5" />
                ) : (
                  "Publish Product"
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {/* Plant Name */}
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 px-4 py-6 lg:px-8 lg:py-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
                <Field
                  as={Input}
                  label="Plant Name"
                  name="plantName"
                  variant="outline"
                  inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3"
                />
                <ErrorMessage
                  name="plantName"
                  component="div"
                  className="text-red-500"
                />

                {/* Product Description */}
                <div className="mt-8">
                  <label className="font-semibold text-slate-700 mb-2 block">Product Description</label>
                  <div className="rounded-xl overflow-hidden border border-emerald-100 shadow-sm">
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
                      minHeight: 200,
                      maxHeight: 400,
                      style: { overflowY: "auto" },
                    }}
                  />
                  </div>
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 px-4 py-6 lg:px-8 lg:py-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm mb-6">
                  Upload Image
                </h1>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {selectedImages.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Selected ${index}`}
                      className="w-24 h-24 rounded-xl object-cover"
                    />
                  ))}
                </div>
                <label>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    onChange={(e) => handleImageChange(e, setFieldValue)}
                  />
                    <div className="w-full h-32 mt-8 flex flex-col items-center justify-center border-dashed bg-emerald-50/50 border-2 border-emerald-300 rounded-xl cursor-pointer text-emerald-600 hover:bg-emerald-100/50 hover:border-emerald-400 transition-colors">
                      <FaCirclePlus className="text-4xl mb-2" />
                      <span className="font-medium">Click to upload images</span>
                    </div>
                  </label>
              </div>

              {/* Pricing & Stock */}
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 px-4 py-6 lg:px-8 lg:py-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl flex flex-col gap-4">
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm mb-2">
                  Pricing & Stocks
                </h1>
                <Field
                  as={Input}
                  type="number"
                  label="Previous Price"
                  prefix={<CurrencyDollarIcon className="w-5" />}
                  name="previousPrice"
                  inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3"
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
                  prefix={<CurrencyDollarIcon className="w-5" />}
                  name="newPrice"
                  inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3"
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
                  inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3"
                />
                <ErrorMessage
                  name="stock"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* Plant Type & Category */}
              <div className="bg-white/70 backdrop-blur-xl border border-white/50 px-4 py-6 lg:px-8 lg:py-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl">
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent drop-shadow-sm mb-6">
                  Plant Type & Category
                </h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <Select
                      label="Select Plant Type"
                      options={PlantTypeOptions}
                      value={PlantTypeOptions.find(
                        (option) => option.value === values.plantType
                      )}
                      onChange={(selected) =>
                        setFieldValue("plantType", selected.value)
                      }
                      dropdownClassName="bg-white border-emerald-100 rounded-xl shadow-lg"
                      selectClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3"
                    />
                  </div>
                  <div>
                    <label htmlFor="material" className="font-semibold text-slate-700 mt-4 block">
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
                  </div>
                  <div>
                    <Field
                      as={Input}
                      label="Plant Color"
                      name="color"
                      variant="outline"
                      inputClassName="border-emerald-200 bg-white/80 text-slate-800 focus:border-emerald-500 focus:ring focus:ring-emerald-500/20 rounded-xl p-3"
                    />
                    <ErrorMessage
                      name="color"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="font-semibold text-slate-700 mt-4 block">
                      Category
                    </label>
                    <RadioGroup
                      value={values.category}
                      setValue={(val) => setFieldValue("category", val)}
                      className="flex gap-4 mt-2"
                    >
                      <Radio
                        label="indoor"
                        value="indoor"
                        inputClassName="text-lime-600  ring-0 focus:ring-0 focus:outline-none "
                      />
                      <Radio
                        label="outdoor"
                        value="outdoor"
                        inputClassName="text-lime-600  ring-0 focus:ring-0 focus:outline-none "
                      />
                    </RadioGroup>
                  </div>
                </div>
              </div>

              {/* Plant Type & Category */}
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default AddProduct;
