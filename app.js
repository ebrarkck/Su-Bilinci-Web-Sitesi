AOS.init();

const hesaplaBtn = document.getElementById('hesaplaBtn');
const sonucAlani = document.getElementById('sonucAlani');

const dusSuresiInput = document.getElementById('dusSuresi');
const sifonSayisiInput = document.getElementById('sifonSayisi');
const disFircalamaSelect = document.getElementById('disFircalama');
const bulasikYikamaSelect = document.getElementById('bulasikYikama');

const gunlukTuketimP = document.getElementById('gunlukTuketim');
const aylikTuketimP = document.getElementById('aylikTuketim');


hesaplaBtn.addEventListener('click', function() {
    // Formdaki inputların değerlerini alıyoruz.
    const dusSuresi = parseInt(dusSuresiInput.value) || 0;
    const sifonSayisi = parseInt(sifonSayisiInput.value) || 0;
    const disFircalama = disFircalamaSelect.value;
    const bulasikYikama = bulasikYikamaSelect.value;
    
    let toplamTuketim = 0;
    toplamTuketim += dusSuresi * 10;
    toplamTuketim += sifonSayisi * 8;
    toplamTuketim += (disFircalama === 'hayir') ? 10 : 1;
    toplamTuketim += (bulasikYikama === 'elde') ? 60 : 15;

    // Önceki renk sınıflarını temizle
    sonucAlani.classList.remove('sonuc-success', 'sonuc-warning', 'sonuc-danger');
    
    // Tüketim miktarına göre yeni renk sınıfını ekle
    if (toplamTuketim <= 100) {
        sonucAlani.classList.add('sonuc-success');
    } else if (toplamTuketim <= 200) {
        sonucAlani.classList.add('sonuc-warning');
    } else {
        sonucAlani.classList.add('sonuc-danger');
    }
    
    animateValue(gunlukTuketimP, 0, toplamTuketim, 1000);

    const aylikTuketim = toplamTuketim * 30;
    aylikTuketimP.textContent = `Yaklaşık ${aylikTuketim} Litre/Ay`;

    sonucAlani.style.display = 'block';
});

function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = `${Math.floor(progress * (end - start) + start)} Litre/Gün`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}