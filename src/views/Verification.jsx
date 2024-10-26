import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedKTP, setCapturedKTP] = useState(null); // State for KTP image
  const [capturedFace, setCapturedFace] = useState(null); // State for face image
  const [ktpActive, setKtpActive] = useState(false);
  const [faceActive, setFaceActive] = useState(false);
  const [verificationEnabled, setVerificationEnabled] = useState(false); // State for showing the verification button
  const navigate = useNavigate();

  useEffect(() => {
    if (ktpActive || faceActive) {
      // Access user's webcam
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing camera: ", err));
    } else {
      // Stop the camera if both are inactive
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [ktpActive, faceActive]);

  // Capture the image and turn off the camera
  const captureImage = (type) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Save the image to the state
    canvas.toBlob((blob) => {
      const file = new File([blob], `${type}-image.jpg`, {
        type: "image/jpeg",
      });

      console.log("Captured File: ", file); // Log the file to see it in the console

      if (type === "ktp") {
        setCapturedKTP(file); // Save KTP image
        setKtpActive(false); // Turn off the KTP camera after capturing
      } else if (type === "face") {
        setCapturedFace(file); // Save face image
        setFaceActive(false); // Turn off the face camera after capturing
      }

      // Check if both images are captured
      if (capturedKTP && capturedFace) {
        setVerificationEnabled(true); // Enable verification button
      }
    }, "image/jpeg"); // Specify that the image should be in JPEG format
  };

  // Navigate to the next page if verification is clicked
  const handleVerification = () => {
    // Perform the verification process, then navigate
    navigate("/next-page");
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Face Capture */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4">
        {/* Rounded div for Face Capture */}
        <div className="relative w-full h-96 flex justify-center rounded-full border-4 border-blue-300 overflow-hidden mb-4">
          {/* If no face is captured, show the camera or a black screen */}
          {!capturedFace ? (
            faceActive ? (
              <video
                ref={videoRef}
                autoPlay
                className="w-96 h-full object-cover rounded-full" // Show the face capture
              />
            ) : (
              <div className="w-96 h-full bg-black rounded-full" /> // Black div when no image is captured
            )
          ) : (
            <img
              src={URL.createObjectURL(capturedFace)}
              alt="Captured Face"
              className="w-96 h-full object-cover rounded-full" // Show the captured face image
            />
          )}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>

        {faceActive && (
          <button
            onClick={() => captureImage("face")}
            className="bg-green-500 text-white py-2 px-4 rounded mb-4"
          >
            Capture Face Image
          </button>
        )}

        <button
          onClick={() => {
            setFaceActive(true);
            setKtpActive(false); // Ensure only one camera is active at a time
          }}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Toggle Face Camera
        </button>
      </div>

      {/* Right Side - KTP Capture */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4">
        {/* Rounded div for KTP Capture */}
        <div className="relative w-full h-96 flex justify-center rounded-lg border-4 border-red-300 overflow-hidden mb-4">
          {/* If no KTP is captured, show the camera or a black screen */}
          {!capturedKTP ? (
            ktpActive ? (
              <video
                ref={videoRef}
                autoPlay
                className="w-full h-full object-cover" // Show the KTP capture
              />
            ) : (
              <div className="w-full h-full bg-black" /> // Black div when no image is captured
            )
          ) : (
            <img
              src={URL.createObjectURL(capturedKTP)}
              alt="Captured KTP"
              className="w-full h-full object-cover" // Show the captured KTP image
            />
          )}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>

        {ktpActive && (
          <button
            onClick={() => captureImage("ktp")}
            className="bg-green-500 text-white py-2 px-4 rounded mb-4"
          >
            Capture KTP Image
          </button>
        )}

        <button
          onClick={() => {
            setKtpActive(true);
            setFaceActive(false); // Ensure only one camera is active at a time
          }}
          className="bg-red-500 text-white py-2 px-4 rounded"
        >
          Toggle KTP Camera
        </button>
      </div>

      {/* Show verification button if both images are captured */}
      {capturedKTP && capturedFace && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleVerification}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg"
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

export default Verification;
