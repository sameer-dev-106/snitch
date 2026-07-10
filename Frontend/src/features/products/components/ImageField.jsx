import { TrashIcon } from "../utils/utils";

const ImageField = ({ props }) => {
  return (
    <div>
      <div className="flex justify-between items-end mb-3">
        <label className="block text-sm uppercase tracking-wider text-[#6e6258]">
          Image Upload (Max 7, Optional)
        </label>
        <span className="text-xs text-[#7f7668]">
          {props.newVariant.images.length}/7
        </span>
      </div>

      {props.newVariant.images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-4">
          {props.newVariant.images.map((img, index) => (
            <div key={index} className="relative aspect-4/5 bg-[#f5f3f0]">
              <img
                src={img.previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => props.handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-white/80 p-1 text-[#ba1a1a] hover:bg-white transition-colors cursor-pointer"
              >
                <TrashIcon />
              </button>
            </div>
          ))}
        </div>
      )}

      {props.newVariant.images.length < 7 && (
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={props.handleImageUpload}
            className="block w-full text-sm text-[#6e6258] file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-[#f5f3f0] file:text-[#1b1c1a] hover:file:bg-[#e4e2df] file:cursor-pointer file:uppercase file:text-xs file:tracking-wider file:font-serif cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default ImageField;
