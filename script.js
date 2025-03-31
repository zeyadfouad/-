 var button = document.getElementById("count");
        var delet = document.getElementById("delete");
        var zikrContainer = document.getElementById("zikrContainer");
        var popup = document.getElementById("popup");
        var overlay = document.getElementById("overlay");
        var splashScreen = document.getElementById("splashScreen");
        var verseElement = document.getElementById("verse");
        var verseInfoElement = document.getElementById("verseInfo");
        var zikrCount = 0;
        var totalTasbeeh = 0;
        var alertShown = false;

        var adhkar = [
            "سبحان الله", "الحمد لله", "الله أكبر", "لا إله إلا الله", 
            "سبحان الله وبحمده", "سبحان الله العظيم", "لا حول ولا قوة إلا بالله", 
            "أستغفر الله", "اللهم صل وسلم على نبينا محمد", "رضيت بالله ربا وبالإسلام دينا وبمحمد صلى الله عليه وسلم نبيا ورسولا", 
            "اللهم أنت السلام ومنك السلام تباركت يا ذا الجلال والإكرام", "يا حي يا قيوم برحمتك أستغيث", 
            "اللهم إني أعوذ بك من الهم والحزن", "اللهم ارزقني حسن الخاتمة", "لا إله إلا أنت سبحانك إني كنت من الظالمين"
        ];

        var verses = [
            { text: "وَذَكِّرْ فَإِنَّ الذِّكْرَى تَنْفَعُ الْمُؤْمِنِينَ", number: 55, surah: "الذاريات" },
            { text: "فَاذْكُرُونِي أَذْكُرْكُمْ", number: 152, surah: "البقرة" },
            { text: "وَلَذِكْرُ اللَّهِ أَكْبَرُ", number: 45, surah: "العنكبوت" },
            { text: "الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُمْ بِذِكْرِ اللَّهِ", number: 28, surah: "الرعد" },
            { text: "وَاذْكُرْ رَبَّكَ فِي نَفْسِكَ تَضَرُّعًا وَخِيفَةً", number: 205, surah: "الأعراف" },
            { text: "إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ لَآيَاتٍ لِأُولِي الْأَلْبَابِ", number: 190, surah: "آل عمران" },
            { text: "وَمَنْ يَتَّقِ اللَّهَ يَجْعَلْ لَهُ مَخْرَجًا", number: 2, surah: "الطلاق" },
            { text: "وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ", number: 3, surah: "الطلاق" },
            { text: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ", number: 153, surah: "البقرة" },
            { text: "وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ", number: 88, surah: "هود" },
            { text: "الَّذِينَ يَذْكُرُونَ اللَّهَ قِيَامًا وَقُعُودًا وَعَلَى جُنُوبِهِمْ", number: 191, surah: "آل عمران" },
            { text: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", number: 28, surah: "الرعد" },
            { text: "فَاذْكُرُوا اللَّهَ كَذِكْرِكُمْ آبَاءَكُمْ أَوْ أَشَدَّ ذِكْرًا", number: 200, surah: "البقرة" },
            { text: "فَاذْكُرِ اسْمَ رَبِّكَ وَتَبَتَّلْ إِلَيْهِ تَبْتِيلًا", number: 8, surah: "المزمل" },
            { text: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ", number: 186, surah: "البقرة" },
            { text: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ", number: 35, surah: "النور" },
            { text: "إِنَّ مَعَ الْعُسْرِ يُسْرًا", number: 6, surah: "الشرح" },
            { text: "وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ", number: 60, surah: "غافر" },
            { text: "إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ", number: 159, surah: "آل عمران" },
            { text: "إِنَّ اللَّهَ يُدَافِعُ عَنِ الَّذِينَ آمَنُوا", number: 38, surah: "الحج" }
        ];

        var countValue = 33;

        // عرض آية عشوائية عند تحميل الصفحة
        function showRandomVerse() {
            var randomVerse = verses[Math.floor(Math.random() * verses.length)];
            verseElement.textContent = randomVerse.text;
            verseInfoElement.textContent = `سورة ${randomVerse.surah} - الآية ${randomVerse.number}`;
        }

        // إخفاء شاشة التخطي مع تأثير التلاشي
        function hideSplashScreen() {
            splashScreen.classList.add("hide");
            setTimeout(() => {
                splashScreen.style.display = "none";
            }, 500); // الانتظار حتى تكتمل الحركة
        }

        showRandomVerse();

        function showCompletionPopup() {
            if (!alertShown) { 
                popup.style.display = "block";
                overlay.style.display = "block";
                alertShown = true; 
            }
        }

        function closePopup() {
            popup.style.display = "none";
            overlay.style.display = "none";
        }

        function updateZikr() {
            zikrContainer.innerHTML = "";
            var newZikr = document.createElement("p");
            newZikr.textContent = adhkar[zikrCount % adhkar.length];
            zikrContainer.appendChild(newZikr);
        }

        // إضافة الذكر الأول عند تحميل الصفحة
        updateZikr();

        button.addEventListener("click", function () {
            countValue--;
            totalTasbeeh++;
            button.textContent = countValue;
            
            if (totalTasbeeh >= 100) {
                showCompletionPopup();
            }

            if (countValue === 0) {
                countValue = 33;
                button.textContent = countValue;
                zikrCount++;
                updateZikr();
            }
        });

        delet.addEventListener("click", function () {
            countValue = 33;
            button.textContent = countValue;
            alertShown = false;
            totalTasbeeh = 0; // إعادة التعيين ولكن **لا يتم إعادة الذكر**
        });

        // وظائف التحكم بحجم الخط
        function increaseFontSize() {
            var currentSize = parseInt(window.getComputedStyle(button).fontSize);
            if (currentSize < 50) { // الحد الأقصى للتكبير: 100px
                button.style.fontSize = (currentSize + 10) + "px";
            }
        }

        function decreaseFontSize() {
            var currentSize = parseInt(window.getComputedStyle(button).fontSize);
            if (currentSize > 30) { // الحد الأدنى للتصغير: 40px
                button.style.fontSize = (currentSize - 10) + "px";
            }
        }