export default function ReferralCard({
    code,
}) {

    const copyCode = () => {

        navigator.clipboard.writeText(code);

        alert("Referral Code Copied");
    };

    return (

        <div className="bg-white p-6 rounded shadow">

            <h2 className="text-xl font-bold">
                Your Referral Code
            </h2>

            <div className="flex items-center gap-4 mt-4">

                <h1 className="text-2xl">
                    {code}
                </h1>

                <button
                    onClick={copyCode}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Copy
                </button>

            </div>

        </div>
    );
}