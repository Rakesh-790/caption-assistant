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
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl 
            space-y-4 transition-colors duration-300"
        >

            {/* Caption */}
            <p className="text-zinc-900 dark:text-white text-lg leading-relaxed">
                {cleanCaption}
            </p>

            {/* Hashtags */}
            <div className="flex flex-wrap gap-2">

                {hashtags.map((tag: string) => (
                    <span
                        key={tag}
                        className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-blue-600 dark:text-blue-400 text-sm"
                    >
                        {tag}
                    </span>
                ))}

            </div>

            {/* Footer */}
            <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">

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