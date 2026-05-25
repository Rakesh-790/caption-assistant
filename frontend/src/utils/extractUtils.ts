export const extractHashtags = (text: string) => {

    const hashtags = text.match(/#\w+/g) || [];

    const cleanCaption = text.replace(/#\w+/g, "").trim();

    return {
        cleanCaption,
        hashtags,
    };
};