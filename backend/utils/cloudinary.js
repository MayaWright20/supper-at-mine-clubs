import crypto from "crypto";

const getCloudinaryConfig = () => {
  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
    process.env;

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary environment variables are missing");
  }

  return {
    cloudName: CLOUDINARY_CLOUD_NAME,
    apiKey: CLOUDINARY_API_KEY,
    apiSecret: CLOUDINARY_API_SECRET,
  };
};

const createSignature = (params, apiSecret) => {
  const signaturePayload = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([firstKey], [secondKey]) => firstKey.localeCompare(secondKey))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  return crypto
    .createHash("sha1")
    .update(`${signaturePayload}${apiSecret}`)
    .digest("hex");
};

export const uploadImageToCloudinary = async ({ buffer, folder, mimetype }) => {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign = {
    folder,
    timestamp,
  };
  const signature = createSignature(paramsToSign, apiSecret);
  const formData = new FormData();

  formData.append(
    "file",
    new Blob([buffer], { type: mimetype || "image/jpeg" }),
    "avatar.jpg"
  );
  formData.append("api_key", apiKey);
  formData.append("folder", folder);
  formData.append("timestamp", `${timestamp}`);
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.error?.message || "Cloudinary upload failed");
  }

  return {
    publicId: result.public_id,
    secureUrl: result.secure_url,
  };
};

export const deleteImageFromCloudinary = async (publicId) => {
  if (!publicId) return;

  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
  const timestamp = Math.floor(Date.now() / 1000);
  const paramsToSign = {
    public_id: publicId,
    timestamp,
  };
  const signature = createSignature(paramsToSign, apiSecret);
  const body = new URLSearchParams({
    api_key: apiKey,
    public_id: publicId,
    signature,
    timestamp: `${timestamp}`,
  });

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    }
  );

  const result = await response.json();

  if (!response.ok || (result.result !== "ok" && result.result !== "not found")) {
    throw new Error(result?.error?.message || "Cloudinary delete failed");
  }
};
