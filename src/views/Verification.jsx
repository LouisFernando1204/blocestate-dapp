/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import profilePlaceholder from "../assets/profile_placeholder.jpg";
import identityPlaceholder from "../assets/identity_placeholder.jpg";
import LoadingScreen from "../components/ui/loading-screen";
import IDAnalyzer from 'idanalyzer';
import { PinataSDK } from "pinata-web3";
import Swal from 'sweetalert2'
import { addVerifiedUser } from "../service/participant";

const Verification = ({ principal }) => {
  const identityVideoRef = useRef(null);
  const faceVideoRef = useRef(null);
  const canvasIdentityRef = useRef(null);
  const canvasFaceRef = useRef(null);

  const [capturedIdentity, setCapturedIdentity] = useState(null);
  const [capturedFace, setCapturedFace] = useState(null);

  const [identityActive, setIdentityActive] = useState(false);
  const [faceActive, setFaceActive] = useState(false);

  const [verificationReady, setVerificationReady] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const CoreAPI = new IDAnalyzer.CoreAPI(`${import.meta.env.VITE_IDANALYZER_API_KEY}`, "US");
  const pinata = new PinataSDK({
    pinataJwt: `${import.meta.env.VITE_PINATA_JWT}`,
    pinataGateway: `${import.meta.env.VITE_PINATA_GATEWAY}`,
  });

  useEffect(() => {
    if (identityActive) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (identityVideoRef.current) {
            identityVideoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing camera: ", err));
    } else {
      if (identityVideoRef.current && identityVideoRef.current.srcObject) {
        identityVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    }
  }, [identityActive]);

  useEffect(() => {
    if (faceActive) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (faceVideoRef.current) {
            faceVideoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing camera: ", err));
    } else {
      if (faceVideoRef.current && faceVideoRef.current.srcObject) {
        faceVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    }
  }, [faceActive]);

  useEffect(() => {
    setVerificationReady(capturedIdentity && capturedFace);
  }, [capturedIdentity, capturedFace]);

  const captureImage = (type) => {
    const video = type === "identity" ? identityVideoRef.current : faceVideoRef.current;
    const canvas = type === "identity" ? canvasIdentityRef.current : canvasFaceRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      const file = new File([blob], `${principal}-${type}-image.jpg`, { type: "image/jpeg" });
      if (type === "identity") {
        setCapturedIdentity(file);
        setIdentityActive(false);
        video.srcObject.getTracks().forEach(track => track.stop());
      } else if (type === "face") {
        setCapturedFace(file);
        setFaceActive(false);
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    }, "image/jpeg");
  };

  const handleStartCamera = (type) => {
    if (type === "identity") {
      setCapturedIdentity(null);
      setIdentityActive(true);
      setFaceActive(false);
    } else {
      setCapturedFace(null);
      setFaceActive(true);
      setIdentityActive(false);
    }
    setVerificationReady(false);
  };

  const uploadToIPFS = async (file) => {
    try {
      const upload = await pinata.upload.file(file);
      return upload.IpfsHash;
    } catch (error) {
      console.log("Error uploading to IPFS:", error);
      return null;
    }
  };

  const verifyIdentity = async (identityImage, faceImage) => {
    try {
      setIsLoading(true);
      const identityHash = await uploadToIPFS(identityImage);
      const faceHash = await uploadToIPFS(faceImage);

      if (identityHash && faceHash) {
        const identityUrl = `https://gateway.pinata.cloud/ipfs/${identityHash}`;
        const faceUrl = `https://gateway.pinata.cloud/ipfs/${faceHash}`;

        CoreAPI.setBiometricThreshold(0.6);
        CoreAPI.enableAuthentication(true, 2);

        const response = await CoreAPI.scan({
          document_primary: identityUrl,
          biometric_photo: faceUrl,
        });

        if (!response.error) {
          console.log(response);
          let data_result = response['result'];
          let face_result = response['face'];

          if (data_result['nationality_full'] !== 'Indonesia') {
            Swal.fire({
              title: 'Nationality Verification Failed!',
              text: 'Your nationality must be Indonesia. Please verify again!',
              icon: 'error',
              confirmButtonText: 'Re-verify',
              customClass: {
                popup: 'swal-modal',
                confirmButton: 'swal-confirm-button swal-wide-button',
                actions: 'swal-one-buttons'
              },
              buttonsStyling: false
            });
            return;
          }

          if (face_result && face_result['isIdentical']) {
            setIsLoading(false);
            setCapturedIdentity(null);
            setCapturedFace(null);
            const result = await Swal.fire({
              title: 'Verification Successful!',
              html: `
                <div style="text-align: center;">
                  <p><strong>Name:</strong> ${data_result['fullName']}</p>
                  <p><strong>Date of Birth:</strong> ${data_result['dob']}</p>
                  <p><strong>City of Birth:</strong> ${data_result['placeOfBirth']}, ${data_result['issuerOrg_full']}</p>
                  <p><strong>Nationality:</strong> ${data_result['nationality_full']}</p>
                </div>
              `,
              icon: 'success',
              showCancelButton: true,
              confirmButtonText: 'Confirm',
              cancelButtonText: 'Re-verify',
              customClass: {
                popup: 'swal-modal',
                confirmButton: 'swal-confirm-button swal-wide-button',
                cancelButton: 'swal-cancel-button swal-wide-button',
                actions: 'swal-two-buttons'
              },
              buttonsStyling: false
            });

            if (result.isDismissed) {
              console.log("User chose to re-verify.");
            } else {
              console.log("User confirmed the details.");
              console.log(response['vaultid']);
              setIsLoading(true);
              await addVerifiedUser(response['vaultid']);
              setIsLoading(false);
              navigate('/auction');
            }
          } else {
            Swal.fire({
              title: 'Verification Failed!',
              text: 'The biometric data does not match. Please try verifying again!',
              icon: 'error',
              confirmButtonText: 'Re-verify',
              customClass: {
                popup: 'swal-modal',
                confirmButton: 'swal-confirm-button swal-wide-button',
                actions: 'swal-one-buttons'
              },
              buttonsStyling: false
            });
          }
        } else {
          console.log("Verification error:", response.error);
          Swal.fire({
            title: 'Error!',
            text: 'An error occurred during verification. Please try again!',
            icon: 'error',
            confirmButtonText: 'OK',
            customClass: {
              popup: 'swal-modal',
              confirmButton: 'swal-confirm-button swal-wide-button',
              actions: 'swal-one-buttons'
            },
            buttonsStyling: false
          });
        }
      } else {
        console.log("Image upload to IPFS failed.");
        Swal.fire({
          title: 'Image Upload Failed!',
          text: 'Failed to upload image. Please try again!',
          icon: 'error',
          confirmButtonText: 'OK',
          customClass: {
            popup: 'swal-modal',
            confirmButton: 'swal-confirm-button swal-wide-button',
            actions: 'swal-one-buttons'
          },
          buttonsStyling: false
        });
      }
    } catch (err) {
      console.log("Error during verification:", err.message);
      Swal.fire({
        title: 'An Error Occurred. Please try again!',
        text: `Error: ${err.message}`,
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'swal-modal',
          confirmButton: 'swal-confirm-button swal-wide-button',
          actions: 'swal-one-buttons'
        },
        buttonsStyling: false
      });
    } finally {
      setIsLoading(false);
      setCapturedIdentity(null);
      setCapturedFace(null);
    }
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="flex flex-col justify-center items-center space-y-6 p-8 h-full w-full">
      <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 justify-center items-center">

        <div data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="500"
          className="flex flex-col justify-center space-y-4 w-full p-5 mx-auto rounded-xl bg-white shadow-lg h-full">
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="500"
          >
            <h2 className="font-bold text-xl md:text-2xl text-left text-gray-900">
              Capture Your Identity Card
            </h2>
            <p className="font-normal text-gray-400 text-base md:text-lg text-left mt-2">
              Please position your camera towards your identity card, ensuring good lighting for a clear image. This image will be used for identity verification.
            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="500"
            className="relative justify-center items-center w-full h-full">
            {capturedIdentity ? (
              <img
                src={URL.createObjectURL(capturedIdentity)}
                alt="Captured Identity"
                className="w-full h-full object-cover rounded-xl"
              />
            ) : identityActive ? (
              <video ref={identityVideoRef} autoPlay className="w-full h-full object-cover rounded-xl" />
            ) : (
              <div className="flex justify-center items-center w-full h-full">
                <img src={identityPlaceholder} className="w-80 h-80 object-cover" alt="Profile Placeholder" />
              </div>
            )}
            <canvas
              ref={canvasIdentityRef}
              className={`absolute top-0 left-0 w-full h-full ${capturedIdentity ? "object-cover rounded-xl" : "hidden"}`}
            />
          </div>
          <button
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="500"
            onClick={() => {
              if (identityActive) {
                captureImage("identity");
              } else {
                handleStartCamera("identity");
              }
            }}
            className="text-base md:text-lg px-8 py-2.5 rounded-full bg-gradient-to-b from-orange-900 to-orange-950 text-white focus:ring-2 focus:ring-orange-800 hover:shadow-xl transition duration-200">
            {identityActive ? "Capture" : "Start Camera"}
          </button>
        </div>

        <div
          data-aos="fade-up"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="500"
          className="flex flex-col justify-center space-y-4 w-full p-5 mx-auto rounded-xl bg-white shadow-lg h-full">
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="500">
            <h2 className="font-bold text-xl md:text-2xl text-left text-gray-900">
              Capture Your Face
            </h2>
            <p className="font-normal text-gray-400 text-base md:text-lg text-left mt-2">
              Align your camera with your face, making sure nothing obstructs it. This image will help verify your identity.            </p>
          </div>
          <div
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="500"
            className="relative justify-center items-center w-full h-full">
            {capturedFace ? (
              <img src={URL.createObjectURL(capturedFace)} alt="Captured Face" className="w-full h-full object-cover rounded-xl" />
            ) : faceActive ? (
              <video ref={faceVideoRef} autoPlay className="w-full h-full object-cover rounded-xl" />
            ) : (
              <div className="flex justify-center items-center w-full h-full">
                <img src={profilePlaceholder} className="w-80 h-80 object-cover" alt="Identity Placeholder" />
              </div>
            )}
            <canvas
              ref={canvasFaceRef}
              className={`absolute top-0 left-0 w-full h-full ${capturedFace ? "object-cover rounded-xl" : "hidden"}`}
            />
          </div>
          <button
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="500"
            onClick={() => {
              if (faceActive) {
                captureImage("face");
              } else {
                handleStartCamera("face");
              }
            }}
            className="text-base md:text-lg px-8 py-2.5 rounded-full bg-gradient-to-b from-orange-900 to-orange-950 text-white focus:ring-2 focus:ring-orange-800 hover:shadow-xl transition duration-200">
            {faceActive ? "Capture" : "Start Camera"}
          </button>
        </div>
      </div>

      <div
        data-aos="fade-up"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="500"
        className="w-full flex justify-center">
        {verificationReady && (
          <button onClick={() => verifyIdentity(capturedIdentity, capturedFace)} className="text-base md:text-lg w-full px-8 py-2 rounded-lg bg-orange-900 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-orange-800">
            Verify Your Identity
          </button>
        )}
      </div>

    </div>
  );
};

export default Verification;
