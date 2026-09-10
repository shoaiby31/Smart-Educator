import ImageUploader from "../../components/common/ImageUploader";

const SchoolLogoUploader = ({
  logoUrl,
  onUpload,
  loading,
}) => {
  return (
    <ImageUploader
      title="School Logo"
      buttonText="Upload Logo"
      imageUrl={logoUrl}
      onUpload={onUpload}
      loading={loading}
      size={120}
    />
  );
};

export default SchoolLogoUploader;