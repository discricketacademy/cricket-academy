export const translations = {
    en: {
        title: "Join DIS Cricket Academy",
        subtitle: "Start your professional cricket journey with expert coaching and world-class facilities.",
        benefits: [
            "🏆 Expert Professional Coaching",
            "🏏 Modern Training Facilities",
            "📊 Performance Tracking",
            "🌟 Pathway to Club Cricket"
        ],
        sections: {
            playerInfo: "PLAYER INFORMATION",
            parentDetails: "PARENT / GUARDIAN DETAILS",
            medicalInfo: "MEDICAL INFORMATION",
            agreements: "AGREEMENTS",
            signature: "SIGNATURE"
        },
        fields: {
            fullName: "Full Name",
            dob: "Date of Birth",
            age: "Age",
            address: "Home Address",
            parentName: "Parent / Guardian Name",
            contactMethod: "Preferred Contact Method",
            email: "Email Address",
            phone: "Mobile Number",
            emergencyPhone: "Emergency Contact Number",
            medicalConditions: "Medical Conditions (Illnesses / Special Conditions)",
            rulesAgreement: "I agree to follow all rules and regulations of DIS Cricket Academy",
            parentConsent: "I confirm I am the parent/guardian and give permission",
            signatureName: "Parent / Guardian Name (as signature)",
            signaturePad: "Draw your signature below (use finger or stylus)",
            clearSignature: "Clear Signature"
        },
        placeholders: {
            fullName: "Enter full name",
            address: "Enter home address",
            parentName: "Enter parent/guardian name",
            email: "example@mail.com",
            phone: "07X XXX XXXX",
            medical: "Any medical conditions we should know about?"
        },
        buttons: {
            submit: "Register Now",
            submitting: "Registering...",
            success: "Registration Successful!"
        },
        successMessage: "Thank you for joining DIS Cricket Academy! Your registration has been received and your PDF is downloading. We will contact you soon.",
        applyAnother: "Register Another Player",
        errors: {
            required: "This field is required",
            signatureRequired: "Signature is required"
        }
    },
    si: {
        title: "DIS ක්‍රිකට් ඇකඩමියට සම්බන්ධ වන්න",
        subtitle: "විශේෂඥ පුහුණුව සහ ලෝක මට්ටමේ පහසුකම් සමඟ ඔබේ වෘත්තීය ක්‍රිකට් ගමන ආරම්භ කරන්න.",
        benefits: [
            "🏆 විශේෂඥ වෘත්තීය පුහුණුව",
            "🏏 නවීන පුහුණු පහසුකම්",
            "📊 දක්ෂතා නිරීක්ෂණය",
            "🌟 ක්‍රීඩා සමාජ ක්‍රිකට් සඳහා මග පෙන්වීම"
        ],
        sections: {
            playerInfo: "ක්‍රීඩකයාගේ තොරතුරු",
            parentDetails: "දෙමාපිය / භාරකරුගේ විස්තර",
            medicalInfo: "වෛද්‍ය තොරතුරු",
            agreements: "ගිවිසුම්",
            signature: "අත්සන"
        },
        fields: {
            fullName: "සම්පූර්ණ නම",
            dob: "උපන් දිනය",
            age: "වයස",
            address: "ගෙදර ලිපිනය",
            parentName: "දෙමාපිය / භාරකරුගේ නම",
            contactMethod: "සම්බන්ධ කරගත යුතු ක්‍රමය",
            email: "ඊමේල් ලිපිනය",
            phone: "දුරකථන අංකය",
            emergencyPhone: "හදිසි අවස්ථාවකදී සම්බන්ධ කරගත යුතු අංකය",
            medicalConditions: "වෛද්‍ය තොරතුරු (අසනීප / විශේෂ තත්ත්ව)",
            rulesAgreement: "DIS ක්‍රිකට් ඇකඩමියේ සියලුම නීති රීති පිළිපැදීමට මම එකඟ වෙමි",
            parentConsent: "මම දෙමාපියන්/භාරකරු බව තහවුරු කරන අතර අවසර ලබා දෙමි",
            signatureName: "දෙමාපිය / භාරකරුගේ නම (අත්සන ලෙස)",
            signaturePad: "පහත ඔබේ අත්සන යොදන්න (ඇඟිල්ලෙන් හෝ පෑනකින්)",
            clearSignature: "අත්සන මකන්න"
        },
        placeholders: {
            fullName: "සම්පූර්ණ නම ඇතුළත් කරන්න",
            address: "නිවසේ ලිපිනය ඇතුළත් කරන්න",
            parentName: "දෙමාපිය/භාරකරුගේ නම ඇතුළත් කරන්න",
            email: "example@mail.com",
            phone: "07X XXX XXXX",
            medical: "අප දැනගත යුතු යම් සෞඛ්‍ය ගැටලු තිබේද?"
        },
        buttons: {
            submit: "දැන් ලියාපදිංචි වන්න",
            submitting: "ලියාපදිංචි වෙමින් පවතී...",
            success: "ලියාපදිංචිය සාර්ථකයි!"
        },
        successMessage: "DIS ක්‍රිකට් ඇකඩමියට සම්බන්ධ වීම පිළිබඳව ස්තූතියි! ඔබේ ලියාපදිංචිය ලැබී ඇති අතර PDF එක download වෙමින් පවතී. අපි ඉක්මනින් ඔබව සම්බන්ධ කර ගන්නෙමු.",
        applyAnother: "තවත් ක්‍රීඩකයෙකු ලියාපදිංචි කරන්න",
        errors: {
            required: "මෙම තීරුව පිරවීම අනිවාර්ය වේ",
            signatureRequired: "අත්සන අනිවාර්ය වේ"
        }
    }
};

export const getTranslation = (lang, key) => {
    const keys = key.split('.');
    let result = translations[lang];
    for (const k of keys) {
        if (result && result[k]) {
            result = result[k];
        } else {
            return key;
        }
    }
    return result;
};
