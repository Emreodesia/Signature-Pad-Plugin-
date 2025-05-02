//Bu Bölüm Update Bölümünde Yer Almalı 
//Verion 3.0

var canvas = document.getElementById("signatureCanvas");
var ctx = canvas.getContext("2d");
var isDrawing = false;
var colorPicker = document.getElementById("color-picker");
var saveMessage = document.getElementById("saveMessage");

// Başlangıç ayarları
ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = 2;

// Çizim başlat (Sadece fare basılıyken çizim yap)
canvas.addEventListener("mousedown", function(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

// Çizim devam ederken (Ama sadece isDrawing=true ise)
canvas.addEventListener("mousemove", function(e) {
    if (!isDrawing) return; // Eğer fare basılı değilse çizme
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
});

// Çizim bittiğinde
canvas.addEventListener("mouseup", function() {
    isDrawing = false; // Çizimi durdur
    ctx.closePath();
});

// Eğer fare canvas dışına çıkarsa çizimi durdur
canvas.addEventListener("mouseleave", function() {
    isDrawing = false;
});

// Renk değiştirme özelliği
colorPicker.addEventListener("input", function() {
    ctx.strokeStyle = this.value;
});

// Temizleme butonu
document.getElementById("clearBtn").addEventListener("click", function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Temizleme sonrası kullanıcıya bilgi ver
    //alert("The from has been cleared."); 
});


// Kaydetme butonu
document.getElementById("saveBtn").addEventListener("click", function() {
    var dataURL = canvas.toDataURL(); // Base64 formatında imza al
    saveToBubble(dataURL); // Bubble ile kaydetme işlemi

    saveMessage.style.display = "block"; // Kaydedildi mesajını göster
    setTimeout(() => {
        saveMessage.style.display = "none";
    }, 2000);
});


//  **Bubble'a veri gönderme fonksiyonu**
function saveToBubble(dataURL) {
    if (typeof window.bubble_fn_save_signature === "function") {
        window.bubble_fn_save_signature(dataURL); // Bubble'a veriyi gönder
        console.log("Signature data sent ", dataURL);
    } else {
        console.error("Signature data could not be sent ");
    }
}


// Mobil uyumlu imza atma özelliği
canvas.addEventListener("touchstart", function(e) {
    isDrawing = true;
    ctx.beginPath();


    // Koordinat ayarlama
    var rect = canvas.getBoundingClientRect();
    ctx.moveTo(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
});


canvas.addEventListener("touchmove", function(e) {
    if (!isDrawing) return; // Eğer fare basılı değilse çizme

    // Koordinat ayarlama
    var rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    ctx.stroke();
});

canvas.addEventListener("touchend", function() {
    isDrawing = false; // Çizimi durdur
    ctx.closePath();
});


/*
//Version 2.0

var canvas = document.getElementById("signatureCanvas");
var ctx = canvas.getContext("2d");
var isDrawing = false;
var colorPicker = document.getElementById("color-picker");
var saveMessage = document.getElementById("saveMessage");

// Başlangıç ayarları
ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = 2;

// Çizim başlat (Sadece fare basılıyken çizim yap)
canvas.addEventListener("mousedown", function(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
});

// Çizim devam ederken (Ama sadece isDrawing=true ise)
canvas.addEventListener("mousemove", function(e) {
    if (!isDrawing) return; // Eğer fare basılı değilse çizme
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
});

// Çizim bittiğinde
canvas.addEventListener("mouseup", function() {
    isDrawing = false; // Çizimi durdur
    ctx.closePath();
});

// Eğer fare canvas dışına çıkarsa çizimi durdur
canvas.addEventListener("mouseleave", function() {
    isDrawing = false;
});

// Renk değiştirme özelliği
colorPicker.addEventListener("input", function() {
    ctx.strokeStyle = this.value;
});

// Temizleme butonu
document.getElementById("clearBtn").addEventListener("click", function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Kaydetme butonu
document.getElementById("saveBtn").addEventListener("click", function() {
    var dataURL = canvas.toDataURL(); // Base64 formatında imza al
    saveToBubble(dataURL); // Bubble ile kaydetme işlemi

    saveMessage.style.display = "block"; // Kaydedildi mesajını göster
    setTimeout(() => {
        saveMessage.style.display = "none";
    }, 2000);
});

//  **Bubble'a veri gönderme fonksiyonu**
function saveToBubble(dataURL) {
    if (typeof window.bubble_fn_save_signature === "function") {
        window.bubble_fn_save_signature(dataURL); // Bubble'a veriyi gönder
        console.log("Signature data sent ", dataURL);
    } else {
        console.error("Signature data could not be sent ");
    }
}

// Mobil uyumlu imza atma özelliği
canvas.addEventListener("touchstart", function(e) {
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.touches[0].clientX, e.touches[0].clientY);
});

canvas.addEventListener("touchmove", function(e) {
    if (!isDrawing) return; // Eğer fare basılı değilse çizme
    ctx.lineTo(e.touches[0].clientX, e.touches[0].clientY);
    ctx.stroke();
});

canvas.addEventListener("touchend", function() {
    isDrawing = false; // Çizimi durdur
    ctx.closePath();
});

*/