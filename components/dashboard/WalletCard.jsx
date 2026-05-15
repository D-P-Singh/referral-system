export default function WalletCard({
    title,
    amount,
}) {

    return (

        <div className="bg-white p-6 rounded shadow">

            <h3 className="text-gray-500">
                {title}
            </h3>

            <h1 className="text-3xl font-bold mt-2">
                ₹ {amount}
            </h1>

        </div>
    );
}