export const formatDate = (date) => {

    return new Date(date)
        .toLocaleString(
            "en-IN",
            {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,

                day: "numeric",
                month: "short",
                year: "numeric",
            }
        );

};