import ImageUploader from "../../components/common/ImageUploader";

const SchoolCoverUploader = ({
  coverUrl,
  onUpload,
 loading,
}) => {
  return (
    <ImageUploader
      title="School Cover"
      buttonText="Upload Cover"
      imageUrl={coverUrl}
      onUpload={onUpload}
      loading={loading}
      size={220}
      shape="square"
    />
  );
};

export default SchoolCoverUploader;