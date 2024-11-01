"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { TextArea } from "../components/ui/textarea";
import { BottomGradient } from "../components/ui/bottom-gradient";
import { FileUpload } from "../components/ui/file-upload";
import LabelInputContainer from "../components/ui/label-input-container";
import Swal from "sweetalert2";
import { PinataSDK } from "pinata-web3";
import { createAuction } from "../service/auction";
import { pdf } from "@react-pdf/renderer";
import Certificate from "./Certificate";
import LoadingScreen from "../components/ui/loading-screen";

export function CreateAuction() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("Jl. Mawar 123");
  const [province, setProvince] = useState("East Java");
  const [city, setCity] = useState("Surabaya");
  const [postalCode, setPostalCode] = useState("60116");
  const [category, setCategory] = useState("House");
  const [area, setArea] = useState("1000");
  const [builtYear, setBuiltYear] = useState("1952");
  const [description, setDescription] = useState("lorem ipsum dolor sit amet");
  const [image, setImage] = useState(null);

  const [certificateNumber, setCertificateNumber] = useState("6344238123");
  const [startAuction, setStartAuction] = useState("");
  const [endAuction, setEndAuction] = useState("");
  const [startPrice, setStartPrice] = useState("10");
  const [isLoading, setIsLoading] = useState(false);

  const pinata = new PinataSDK({
    pinataJwt: `${import.meta.env.VITE_JWT}`,
    pinataGateway: `${import.meta.env.VITE_GATEWAY}`,
  });

  const successAlert = () => {
    Swal.fire({
      text: "You've successfully created a new auction!",
      icon: "success",
      confirmButtonText: "Done",
      confirmButtonColor: "#1f6feb",
      customClass: {
        confirmButton: "w-full",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/auction");
      }
    });
  };

  const failedAlert = () => {
    Swal.fire({
      text: "Oops... There's something wrong while creating the auction. Please try again!",
      icon: "error",
      confirmButtonText: "Done",
      confirmButtonColor: "#cc0029",
    });
  };

  const generateCertificate = async () => {
    try {
      const blob = await pdf(
        <Certificate
          certificateNumber={certificateNumber}
          province={province}
          city={city}
        />
      ).toBlob();
      return blob;
    } catch (error) {
      console.error("Error generating PDF:", error);
      return;
    }
  };

  const uploadToPinata = async (file) => {
    try {
      const upload = await pinata.upload.file(file);
      return upload.IpfsHash;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const reset = () => {
    setAddress("");
    setProvince("");
    setCity("");
    setPostalCode("");
    setCategory("");
    setArea("");
    setBuiltYear("");
    setDescription("");
    setImage(null);
    setCertificateNumber("");
    setStartAuction("");
    setEndAuction("");
    setStartPrice("");
  }

  const handleSubmit = async () => {
    if (
      address &&
      province &&
      city &&
      postalCode &&
      category &&
      area &&
      builtYear &&
      description &&
      image &&
      certificateNumber &&
      startAuction &&
      endAuction &&
      startPrice
    ) {
      setIsLoading(true);
      const certificateFile = await generateCertificate();
      const certificateUploaded = await uploadToPinata(certificateFile);
      const imageUploaded = await uploadToPinata(image);
      if (certificateUploaded && imageUploaded) {
        console.log(certificateUploaded);
        console.log(imageUploaded);
        try {
          await createAuction(
            imageUploaded,
            address,
            province,
            city,
            parseInt(postalCode),
            category,
            parseInt(area),
            parseInt(builtYear),
            description,
            parseInt(startPrice),
            parseInt(Math.floor(new Date(startAuction).getTime() / 1000)),
            parseInt(Math.floor(new Date(endAuction).getTime() / 1000)),
            parseInt(certificateNumber),
            certificateUploaded
          );
        }
        catch (error) {
          console.log(error)
        }
        finally {
          setIsLoading(false);
          reset();
          successAlert();
        }
      }
    } else {
      console.log("Please fill in all required fields");
      failedAlert();
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="w-full h-full my-24 mx-auto p-4 md:p-6 shadow-input bg-gray-100 flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0">
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="500"
        className="bg-white w-full lg:w-1/2 p-8 rounded-md shadow-input"
      >
        <h2 className="font-bold text-xl text-neutral-800">
          Real Estate Details{" "}
        </h2>
        <p className="text-neutral-600 text-base w-full mt-2 mb-8">
          Provide essential details about the real estate, including location,
          type, etc. Ensure the information is accurate to attract potential
          bidders.
        </p>
        <div className="w-full flex flex-col space-y-4">
          <LabelInputContainer>
            <Label
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
            >
              Address
            </Label>
            <Input
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              placeholder="Ex : Northway Street No.50"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </LabelInputContainer>
          <div className="grid grid-cols-2 gap-3">
            <LabelInputContainer>
              <Label
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
              >
                Province
              </Label>
              <Input
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
                placeholder="Ex : East Java"
                type="text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
              >
                City
              </Label>
              <Input
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
                placeholder="Ex : Surabaya"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </LabelInputContainer>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <LabelInputContainer>
              <Label
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
              >
                Postal Code
              </Label>
              <Input
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
                placeholder="Ex : 60114"
                type="number"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
                htmlFor="description"
              >
                Built Year
              </Label>
              <Input
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
                placeholder="Ex : 1920"
                type="number"
                min={1}
                step={1}
                value={builtYear}
                onChange={(e) => setBuiltYear(e.target.value)}
              />
            </LabelInputContainer>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <LabelInputContainer>
              <Label
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
                htmlFor="description"
              >
                Category
              </Label>
              <Input
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
                placeholder="Ex : House"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
                htmlFor="description"
              >
                Area (m²)
              </Label>
              <Input
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="500"
                placeholder="Ex : 1500m²"
                type="number"
                min={1}
                value={area}
                onChange={(e) => setArea(e.target.value)}
              />
            </LabelInputContainer>
          </div>
          <LabelInputContainer>
            <Label
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              htmlFor="description"
            >
              Description
            </Label>
            <TextArea
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              rows={5}
              cols={30}
              placeholder="Ex : This charming 3-bedroom, 2-bathroom home boasts a spacious open floor plan with a modern kitchen featuring stainless steel appliances and a large island. "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              htmlFor="thumbnail"
            >
              Image
            </Label>
            <FileUpload
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              setImage={setImage}
              fileType={"image"}
            />
          </LabelInputContainer>

          <button
            onClick={() => handleSubmit()}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="500"
            className="bg-gradient-to-br relative group/btn bg-darkBrown block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
            type="submit"
          >
            Create
            <BottomGradient />
          </button>
        </div>
      </div>
      <div
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="500"
        className="bg-white w-full lg:w-1/2 p-8 rounded-md shadow-input flex flex-col space-y-4"
      >
        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="500"
          id="section-accordion-flush"
          data-accordion="collapse"
          data-active-classes="bg-white text-gray-900"
          data-inactive-classes="text-gray-500"
        >
          <h2
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="500"
            className="font-bold text-xl text-neutral-800"
          >
            Auction Details
          </h2>
          <p
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="500"
            className="text-neutral-600 text-base w-full mt-2 mb-4"
          >
            Define the auction terms, including the start and end dates,
            starting price, etc. These settings will guide the auction and
            inform participants of the rules and payment methods.
          </p>
        </div>
        <div className="w-full flex flex-col space-y-4">
          <LabelInputContainer>
            <Label
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              htmlFor="price"
            >
              Certificate Number
            </Label>
            <Input
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              placeholder="Ex : 512839132023"
              type="text"
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              htmlFor="price"
            >
              Start Auction
            </Label>
            <Input
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              placeholder="Ex: 21/10/2024 20:00"
              type="datetime-local"
              value={startAuction}
              onChange={(e) => setStartAuction(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              htmlFor="price"
            >
              End Auction
            </Label>
            <Input
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              placeholder="Ex: 21/10/2024 20:00"
              type="datetime-local"
              value={endAuction}
              onChange={(e) => setEndAuction(e.target.value)}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              htmlFor="price"
            >
              Start Price
            </Label>
            <Input
              data-aos="fade-up"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
              min="1"
              step="1"
              placeholder="Ex : 2500 ICP"
              type="number"
              value={startPrice}
              onChange={(e) => setStartPrice(e.target.value)}
            />
          </LabelInputContainer>
        </div>
      </div>
    </div>
  );
}
