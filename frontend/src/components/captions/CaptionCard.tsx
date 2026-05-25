import { extractHashtags } from "../../utils/extractUtils";

type Props = {
    caption: any;
};

function CaptionCard({ caption }: Props) {

    const {
        cleanCaption,
        hashtags,
    } = extractHashtags(caption.aiCaption);

    return (
        <div className="bg-zinc-900 p-5 rounded-xl space-y-4">

            {/* Caption */}
            <p className="text-white text-lg leading-relaxed">
                {cleanCaption}
            </p>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-2">

                {hashtags.map((tag: string) => (
                    <span
                        key={tag}
                        className="
                            px-3
                            py-1
                            bg-zinc-800
                            rounded-full
                            text-blue-400
                            text-sm
                        "
                    >
                        {tag}
                    </span>
                ))}

            </div>

            {/* Footer */}
            <div className="flex justify-between text-xs text-zinc-500">

                <span>
                    {caption.platform}
                </span>

                <span>
                    {caption.tone}
                </span>

                <span>
                    {new Date(caption.createdAt).toLocaleString()}
                </span>

            </div>

        </div>
    );
}

export default CaptionCard;