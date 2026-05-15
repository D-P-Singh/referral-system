export function generateReferralCode(name, phone) {
    //console.log(name, phone);
    return (
        name.trim().slice(0, 3).toUpperCase() + phone.slice(0, 4)
    );
}