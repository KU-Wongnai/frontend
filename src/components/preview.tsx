import Image from "next/image";

const Previews = ({ files }: { files: File[] }) => (
  <div>
    <p className="text-sm text-gray-600">Uploaded files</p>
    <div className="flex flex-wrap gap-3 my-2">
      {files.length > 0 ? (
        <>
          {files.map((file: any) => (
            <div key={file.name}>
              <Image
                src={file.preview}
                alt={file.name}
                // Revoke data uri after image is loaded
                width={100}
                height={100}
                className="rounded-lg"
                // onLoad={() => {
                //   URL.revokeObjectURL(file.preview);
                // }}
              />
            </div>
          ))}
        </>
      ) : (
        <span className="text-xs text-gray-600">No file</span>
      )}
    </div>
  </div>
);

export default Previews;
