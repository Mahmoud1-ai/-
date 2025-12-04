// =========================================================
// 1. مصفوفة السند (Sanad Sources Array) لأذكار المساء
// =========================================================
const ahadithSources = [
    "مقدمة تُقال قبل البدأ، ليس لها سند محدد.", // 1
    "آية الكرسي - سورة البقرة: 255. فضلها: حفظ قائلها من الشيطان حتى يصبح (رواه النسائي والطبراني).", // 2
    "المعوذات (الإخلاص، الفلق، الناس). فضلها: من قالها ثلاث مرات حين يصبح وحين يمسي كفته من كل شيء (رواه أبو داود والترمذي).", // 3-1 الإخلاص
    "المعوذات (الإخلاص، الفلق، الناس). فضلها: من قالها ثلاث مرات حين يصبح وحين يمسي كفته من كل شيء (رواه أبو داود والترمذي).", // 3-2 الفلق
    "المعوذات (الإخلاص، الفلق، الناس). فضلها: من قالها ثلاث مرات حين يصبح وحين يمسي كفته من كل شيء (رواه أبو داود والترمذي).", // 3-3 الناس
    "رواه مسلم. الصيغة مخصصة للمساء بكلمة (أمسينا).", // 4
    "رواه الترمذي. الصيغة مخصصة للمساء بكلمة (أمسينا).", // 5
    "سيد الاستغفار. رواه البخاري. فضلها: من قالها موقناً بها من الليل فمات قبل أن يصبح فهو من أهل الجنة.", // 6
    "رواه أبو داود. فضلها: من قالها أربع مرات أعتقه الله من النار. الصيغة معدلة للمساء (اللهم إني أمسيت).", // 7
    "رواه أبو داود والنسائي. فضلها: من قالها فقد أدى شكر ليلته. الصيغة معدلة للمساء.", // 8
    "رواه أبو داود.", // 9
    "رواه أبو داود. فضلها: من قالها سبع مرات كفاه الله ما أهمه من أمر الدنيا والآخرة.", // 10
    "رواه أبو داود وابن ماجه.", // 11
    "رواه أبو داود والترمذي.", // 12
    "رواه أبو داود والترمذي وابن ماجه. فضلها: من قالها ثلاث مرات لا يضره شيء حتى يصبح.", // 13
    "رواه أبو داود والترمذي.", // 14
    "رواه الحاكم وصححه الألباني.", // 15
    "رواه مسلم.", // 16
    "رواه أحمد.", // 17
    "رواه مسلم. فضلها: من قالها مائة مرة حين يصبح وحين يمسي لم يأت أحد يوم القيامة بأفضل مما جاء به، إلا أحد قال مثل ما قال أو زاد.", // 18
    "رواه البخاري ومسلم. فضلها: من قالها مائة مرة كانت له عدل عشر رقاب، وكتبت له مائة حسنة، ومحيت عنه مائة سيئة، وكانت له حرزاً من الشيطان يومه ذلك حتى يمسي.", // 19
    "لم يرد بلفظ تحديد العدد (مائة) في المساء، لكنه ورد مطلقاً في الاستغفار.", // 20
    "رواه مسلم وأبو داود والترمذي. فضلها: لم يضره شيء تلك الليلة (تقال عند النزول في منزل أو في المساء).", // 21
    "رواه الطبراني وغيره. فضلها: من صلى عليّ حين يصبح عشراً وحين يمسي عشراً أدركته شفاعتي يوم القيامة.", // 22
];

// =========================================================
// 2. دالة تشغيل التطبيق (DOM Content Loaded)
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    // نستخدم querySelectorAll('h4') لتحديد كل الأذكار
    const adhkarElements = document.querySelectorAll('h4');
    let dhikrCounts = {}; // لضمان تصفير العداد عند كل تحميل

    adhkarElements.forEach((dhikr, index) => {
        const dhikrId = `dhikr-${index + 1}`;
        dhikrCounts[dhikrId] = 0; 
        let currentCount = dhikrCounts[dhikrId];
        
        // =======================================
        // 1. إنشاء زر الاستفسار (Query Button)
        // يتم إضافته كأول عنصر داخل الـ h4 لوضعه في الزاوية اليسرى العليا (CSS مسؤول عن موقعه)
        // =======================================
        const queryButton = document.createElement('span');
        queryButton.classList.add('query-button');
        queryButton.textContent = ' ❓'; 
        dhikr.prepend(queryButton); 
        

        // =======================================
        // 2. إنشاء عنصر العداد (Counter)
        // =======================================
        const counterDiv = document.createElement('div');
        counterDiv.classList.add('counter-display');
        counterDiv.textContent = `العدد الحالي: ${currentCount}`;
        dhikr.appendChild(counterDiv);


        // =======================================
        // 3. إضافة السند (في النهاية ليظهر تحت العداد)
        // =======================================
        const sanadDiv = document.createElement('div');
        sanadDiv.classList.add('sanad');
        
        // التحقق من وجود السند قبل إضافته
        if (ahadithSources[index]) {
            sanadDiv.textContent = `السند/المصدر: ${ahadithSources[index]}`;
        } else {
            sanadDiv.textContent = `لا يوجد مصدر محدد في قاعدة البيانات الحالية لهذا الذكر (رقم ${index + 1}).`;
        }
        
        dhikr.appendChild(sanadDiv);
        
        
        // =======================================
        // 4. تحديد عدد التكرار المطلوب
        // =======================================
        const requiredCountElement = dhikr.querySelector('.العدد');
        const requiredCountText = requiredCountElement ? requiredCountElement.textContent.trim() : '';
        
        let requiredCount = 0;
        
        if (requiredCountText.includes('مرة واحدة')) requiredCount = 1;
        else if (requiredCountText.includes('ثلاث مرات')) requiredCount = 3;
        else if (requiredCountText.includes('أربع مرات')) requiredCount = 4;
        else if (requiredCountText.includes('سبع مرات')) requiredCount = 7;
        else if (requiredCountText.includes('مئة مرة')) requiredCount = 100;
        else if (requiredCountText.includes('عشر مرات')) requiredCount = 10;
        
        dhikr.setAttribute('data-required-count', requiredCount);


        // =======================================
        // 5. إضافة مستمع لزر الاستفسار لإظهار السند
        // =======================================
        queryButton.addEventListener('click', (event) => {
            // منع الحدث من الوصول إلى الـ h4 لكي لا يزيد العداد
            event.stopPropagation(); 
            
            // التبديل بين إظهار وإخفاء السند
            if (sanadDiv.style.display === 'block') {
                sanadDiv.style.display = 'none';
            } else {
                sanadDiv.style.display = 'block';
            }
        });
        
        // =======================================
        // 6. إضافة مستمع لجسم الذكر لزيادة العداد
        // =======================================
        dhikr.addEventListener('click', () => {
            
            // تحديث العداد
            dhikrCounts[dhikrId]++;
            currentCount = dhikrCounts[dhikrId];

            // تحديث عرض العداد
            counterDiv.textContent = `العدد الحالي: ${currentCount}`;
            
            // فحص حالة الإكمال
            if (currentCount >= requiredCount && requiredCount > 0 && !dhikr.classList.contains('completed')) {
                dhikr.classList.add('completed');
                counterDiv.textContent += " (تم الإكمال)";
            }
        });
    });
});
